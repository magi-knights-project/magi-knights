import SystemDataModel from "../abstract.mjs";
import { FormulaField } from "../fields.mjs";
import EquippableItemTemplate from "./templates/equippable-item.mjs";
import ItemDescriptionTemplate from "./templates/item-description.mjs";
import PhysicalItemTemplate from "./templates/physical-item.mjs";

/**
 * Data definition for Tool items.
 * @mixes ItemDescriptionTemplate
 * @mixes PhysicalItemTemplate
 * @mixes EquippableItemTemplate
 *
 * @property {string} toolType    Tool category as defined in `MKA.toolTypes`.
 * @property {string} baseItem    Base tool as defined in `MKA.toolIds` for determining proficiency.
 * @property {string} ability     Default ability when this tool is being used.
 * @property {string} chatFlavor  Additional text added to chat when this tool is used.
 * @property {number} proficient  Level of proficiency in this tool as defined in `MKA.proficiencyLevels`.
 * @property {string} bonus       Bonus formula added to tool rolls.
 */
export default class ToolData extends SystemDataModel.mixin(
  ItemDescriptionTemplate, PhysicalItemTemplate, EquippableItemTemplate
) {
  /** @inheritdoc */
  static defineSchema() {
    return this.mergeSchema(super.defineSchema(), {
      toolType: new foundry.data.fields.StringField({required: true, label: "MKA.ItemToolType"}),
      baseItem: new foundry.data.fields.StringField({required: true, label: "MKA.ItemToolBase"}),
      ability: new foundry.data.fields.StringField({
        required: true, blank: true, label: "MKA.DefaultAbilityCheck"
      }),
      chatFlavor: new foundry.data.fields.StringField({required: true, label: "MKA.ChatFlavor"}),
      proficient: new foundry.data.fields.NumberField({
        required: true, initial: null, min: 0, max: 2, step: 0.5, label: "MKA.ItemToolProficiency"
      }),
      bonus: new FormulaField({required: true, label: "MKA.ItemToolBonus"})
    });
  }

  /* -------------------------------------------- */
  /*  Migrations                                  */
  /* -------------------------------------------- */

  /** @inheritdoc */
  static migrateData(source) {
    super.migrateData(source);
    ToolData.#migrateAbility(source);
  }

  /* -------------------------------------------- */

  /**
   * Migrate the ability field.
   * @param {object} source  The candidate source data from which the model will be constructed.
   */
  static #migrateAbility(source) {
    if ( Array.isArray(source.ability) ) source.ability = source.ability[0];
  }

  /* -------------------------------------------- */
  /*  Getters                                     */
  /* -------------------------------------------- */

  /**
   * Properties displayed in chat.
   * @type {string[]}
   */
  get chatProperties() {
    return [CONFIG.MKA.abilities[this.ability]?.label];
  }

  /* -------------------------------------------- */

  /**
   * Which ability score modifier is used by this item?
   * @type {string|null}
   */
  get abilityMod() {
    return this.ability || "int";
  }

  /* -------------------------------------------- */

  /**
   * The proficiency multiplier for this item.
   * @returns {number}
   */
  get proficiencyMultiplier() {
    if ( Number.isFinite(this.proficient) ) return this.proficient;
    const actor = this.parent.actor;
    if ( !actor ) return 0;
    if ( actor.type === "npc" ) return 1;
    const baseItemProf = actor.system.tools?.[this.baseItem];
    const categoryProf = actor.system.tools?.[this.toolType];
    return Math.max(baseItemProf?.value ?? 0, categoryProf?.value ?? 0);
  }
}
