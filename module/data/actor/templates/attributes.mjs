import { FormulaField } from "../../fields.mjs";

/**
 * Shared contents of the attributes schema between various actor types.
 */
export default class AttributesFields {
  /**
   * Fields shared between characters, NPCs, and vehicles.
   *
   * @type {object}
   * @property {object} init
   * @property {number} init.value       Calculated initiative modifier.
   * @property {number} init.bonus       Fixed bonus provided to initiative rolls.
   * @property {object} movement
   * @property {number} movement.burrow  Actor burrowing speed.
   * @property {number} movement.climb   Actor climbing speed.
   * @property {number} movement.fly     Actor flying speed.
   * @property {number} movement.swim    Actor swimming speed.
   * @property {number} movement.walk    Actor walking speed.
   * @property {string} movement.units   Movement used to measure the various speeds.
   * @property {boolean} movement.hover  Is this flying creature able to hover in place.
   */
  static get common() {
    return {
      init: new foundry.data.fields.SchemaField({
        ability: new foundry.data.fields.StringField({label: "MKA.AbilityModifier"}),
        bonus: new FormulaField({label: "MKA.InitiativeBonus"})
      }, { label: "MKA.Initiative" }),
      movement: new foundry.data.fields.SchemaField({
        burrow: new foundry.data.fields.NumberField({
          nullable: false, min: 0, step: 0.1, initial: 0, label: "MKA.MovementBurrow"
        }),
        climb: new foundry.data.fields.NumberField({
          nullable: false, min: 0, step: 0.1, initial: 0, label: "MKA.MovementClimb"
        }),
        fly: new foundry.data.fields.NumberField({
          nullable: false, min: 0, step: 0.1, initial: 0, label: "MKA.MovementFly"
        }),
        swim: new foundry.data.fields.NumberField({
          nullable: false, min: 0, step: 0.1, initial: 0, label: "MKA.MovementSwim"
        }),
        walk: new foundry.data.fields.NumberField({
          nullable: false, min: 0, step: 0.1, initial: 30, label: "MKA.MovementWalk"
        }),
        units: new foundry.data.fields.StringField({initial: "ft", label: "MKA.MovementUnits"}),
        hover: new foundry.data.fields.BooleanField({label: "MKA.MovementHover"})
      }, {label: "MKA.Movement"})
    };
  }

  /* -------------------------------------------- */

  /**
   * Fields shared between characters and NPCs.
   *
   * @type {object}
   * @property {object} attunement
   * @property {number} attunement.max      Maximum number of attuned items.
   * @property {object} senses
   * @property {number} senses.darkvision   Creature's darkvision range.
   * @property {number} senses.blindsight   Creature's blindsight range.
   * @property {number} senses.tremorsense  Creature's tremorsense range.
   * @property {number} senses.truesight    Creature's truesight range.
   * @property {string} senses.units        Distance units used to measure senses.
   * @property {string} senses.special      Description of any special senses or restrictions.
   * @property {string} spellcasting        Primary spellcasting ability.
   */
  static get creature() {
    return {
      attunement: new foundry.data.fields.SchemaField({
        max: new foundry.data.fields.NumberField({
          required: true, nullable: false, integer: true, min: 0, initial: 3, label: "MKA.AttunementMax"
        })
      }, {label: "MKA.Attunement"}),
      senses: new foundry.data.fields.SchemaField({
        darkvision: new foundry.data.fields.NumberField({
          required: true, nullable: false, integer: true, min: 0, initial: 0, label: "MKA.SenseDarkvision"
        }),
        blindsight: new foundry.data.fields.NumberField({
          required: true, nullable: false, integer: true, min: 0, initial: 0, label: "MKA.SenseBlindsight"
        }),
        tremorsense: new foundry.data.fields.NumberField({
          required: true, nullable: false, integer: true, min: 0, initial: 0, label: "MKA.SenseTremorsense"
        }),
        truesight: new foundry.data.fields.NumberField({
          required: true, nullable: false, integer: true, min: 0, initial: 0, label: "MKA.SenseTruesight"
        }),
        units: new foundry.data.fields.StringField({required: true, initial: "ft", label: "MKA.SenseUnits"}),
        special: new foundry.data.fields.StringField({required: true, label: "MKA.SenseSpecial"})
      }, {label: "MKA.Senses"}),
      spellcasting: new foundry.data.fields.StringField({
        required: true, blank: true, initial: "int", label: "MKA.SpellAbility"
      })
    };
  }

  /* -------------------------------------------- */

  /**
   * Migrate the old init.value and incorporate it into init.bonus.
   * @param {object} source  The source attributes object.
   * @internal
   */
  static _migrateInitiative(source) {
    const init = source?.init;
    if ( !init?.value || (typeof init?.bonus === "string") ) return;
    if ( init.bonus ) init.bonus += init.value < 0 ? ` - ${init.value * -1}` : ` + ${init.value}`;
    else init.bonus = `${init.value}`;
  }
}
