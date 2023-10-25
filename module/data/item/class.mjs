import SystemDataModel from "../abstract.mjs";
import { AdvancementField, IdentifierField } from "../fields.mjs";
import ItemDescriptionTemplate from "./templates/item-description.mjs";

/**
 * Data definition for Class items.
 * @mixes ItemDescriptionTemplate
 *
 * @property {string} identifier        Identifier slug for this class.
 * @property {number} levels            Current number of levels in this class.
 * @property {string} hitDice           Denomination of hit dice available as defined in `MKA.hitDieTypes`.
 * @property {number} hitDiceUsed       Number of hit dice consumed.
 * @property {object[]} advancement     Advancement objects for this class.
 * @property {string[]} saves           Savings throws in which this class grants proficiency.
 * @property {object} skills            Available class skills and selected skills.
 * @property {number} skills.number     Number of skills selectable by the player.
 * @property {string[]} skills.choices  List of skill keys that are valid to be chosen.
 * @property {string[]} skills.value    List of skill keys the player has chosen.
 * @property {object} spellcasting      Details on class's spellcasting ability.
 * @property {string} spellcasting.progression  Spell progression granted by class as from `MKA.spellProgression`.
 * @property {string} spellcasting.ability      Ability score to use for spellcasting.
 */
export default class ClassData extends SystemDataModel.mixin(ItemDescriptionTemplate) {
  /** @inheritdoc */
  static defineSchema() {
    return this.mergeSchema(super.defineSchema(), {
      identifier: new IdentifierField({required: true, label: "MKA.Identifier"}),
      levels: new foundry.data.fields.NumberField({
        required: true, nullable: false, integer: true, min: 0, initial: 1, label: "MKA.ClassLevels"
      }),
      hitDice: new foundry.data.fields.StringField({
        required: true, initial: "d6", blank: false, label: "MKA.HitDice",
        validate: v => /d\d+/.test(v), validationError: "must be a dice value in the format d#"
      }),
      hitDiceUsed: new foundry.data.fields.NumberField({
        required: true, nullable: false, integer: true, initial: 0, min: 0, label: "MKA.HitDiceUsed"
      }),
      advancement: new foundry.data.fields.ArrayField(new AdvancementField(), {label: "MKA.AdvancementTitle"}),
      saves: new foundry.data.fields.ArrayField(new foundry.data.fields.StringField(), {label: "MKA.ClassSaves"}),
      skills: new foundry.data.fields.SchemaField({
        number: new foundry.data.fields.NumberField({
          required: true, nullable: false, integer: true, min: 0, initial: 2, label: "MKA.ClassSkillsNumber"
        }),
        choices: new foundry.data.fields.ArrayField(
          new foundry.data.fields.StringField(), {label: "MKA.ClassSkillsEligible"}
        ),
        value: new foundry.data.fields.ArrayField(
          new foundry.data.fields.StringField(), {label: "MKA.ClassSkillsChosen"}
        )
      }),
      spellcasting: new foundry.data.fields.SchemaField({
        progression: new foundry.data.fields.StringField({
          required: true, initial: "none", blank: false, label: "MKA.SpellProgression"
        }),
        ability: new foundry.data.fields.StringField({required: true, label: "MKA.SpellAbility"})
      }, {label: "MKA.Spellcasting"})
    });
  }

  /* -------------------------------------------- */
  /*  Migrations                                  */
  /* -------------------------------------------- */

  /** @inheritdoc */
  static migrateData(source) {
    super.migrateData(source);
    ClassData.#migrateLevels(source);
    ClassData.#migrateSpellcastingData(source);
  }

  /* -------------------------------------------- */

  /**
   * Migrate the class levels.
   * @param {object} source  The candidate source data from which the model will be constructed.
   */
  static #migrateLevels(source) {
    if ( typeof source.levels !== "string" ) return;
    if ( source.levels === "" ) source.levels = 1;
    else if ( Number.isNumeric(source.levels) ) source.levels = Number(source.levels);
  }

  /* -------------------------------------------- */

  /**
   * Migrate the class's spellcasting string to object.
   * @param {object} source  The candidate source data from which the model will be constructed.
   */
  static #migrateSpellcastingData(source) {
    if ( source.spellcasting?.progression === "" ) source.spellcasting.progression = "none";
    if ( typeof source.spellcasting !== "string" ) return;
    source.spellcasting = {
      progression: source.spellcasting,
      ability: ""
    };
  }
}
