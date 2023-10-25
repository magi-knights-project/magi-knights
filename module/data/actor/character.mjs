import { FormulaField } from "../fields.mjs";
import AttributesFields from "./templates/attributes.mjs";
import CreatureTemplate from "./templates/creature.mjs";
import DetailsFields from "./templates/details.mjs";
import TraitsFields from "./templates/traits.mjs";

/**
 * System data definition for Characters.
 *
 * @property {object} attributes
 * @property {object} attributes.ac
 * @property {number} attributes.ac.flat                  Flat value used for flat or natural armor calculation.
 * @property {string} attributes.ac.calc                  Name of one of the built-in formulas to use.
 * @property {string} attributes.ac.formula               Custom formula to use.
 * @property {object} attributes.hp
 * @property {number} attributes.hp.value                 Current hit points.
 * @property {number} attributes.hp.max                   Override for maximum HP.
 * @property {number} attributes.hp.temp                  Temporary HP applied on top of value.
 * @property {number} attributes.hp.tempmax               Temporary change to the maximum HP.
 * @property {object} attributes.hp.bonuses
 * @property {string} attributes.hp.bonuses.level         Bonus formula applied for each class level.
 * @property {string} attributes.hp.bonuses.overall       Bonus formula applied to total HP.
 * @property {object} attributes.death
 * @property {number} attributes.death.success            Number of successful death saves.
 * @property {number} attributes.death.failure            Number of failed death saves.
 * @property {number} attributes.exhaustion               Number of levels of exhaustion.
 * @property {number} attributes.inspiration              Does this character have inspiration?
 * @property {object} details
 * @property {string} details.background                  Name of character's background.
 * @property {string} details.originalClass               ID of first class taken by character.
 * @property {XPData} details.xp                          Experience points gained.
 * @property {number} details.xp.value                    Total experience points earned.
 * @property {string} details.appearance                  Description of character's appearance.
 * @property {string} details.trait                       Character's personality traits.
 * @property {string} details.ideal                       Character's ideals.
 * @property {string} details.bond                        Character's bonds.
 * @property {string} details.flaw                        Character's flaws.
 * @property {object} traits
 * @property {SimpleTraitData} traits.weaponProf          Character's weapon proficiencies.
 * @property {SimpleTraitData} traits.armorProf           Character's armor proficiencies.
 * @property {object} resources
 * @property {CharacterResourceData} resources.primary    Resource number one.
 * @property {CharacterResourceData} resources.secondary  Resource number two.
 * @property {CharacterResourceData} resources.tertiary   Resource number three.
 */
export default class CharacterData extends CreatureTemplate {

  /** @inheritdoc */
  static _systemType = "character";

  /* -------------------------------------------- */

  /** @inheritdoc */
  static defineSchema() {
    return this.mergeSchema(super.defineSchema(), {
      attributes: new foundry.data.fields.SchemaField({
        ...AttributesFields.common,
        ...AttributesFields.creature,
        ac: new foundry.data.fields.SchemaField({
          flat: new foundry.data.fields.NumberField({integer: true, min: 0, label: "MKA.ArmorClassFlat"}),
          calc: new foundry.data.fields.StringField({initial: "default", label: "MKA.ArmorClassCalculation"}),
          formula: new FormulaField({deterministic: true, label: "MKA.ArmorClassFormula"})
        }, {label: "MKA.ArmorClass"}),
        hp: new foundry.data.fields.SchemaField({
          value: new foundry.data.fields.NumberField({
            nullable: false, integer: true, min: 0, initial: 0, label: "MKA.HitPointsCurrent"
          }),
          max: new foundry.data.fields.NumberField({
            nullable: true, integer: true, min: 0, initial: null, label: "MKA.HitPointsOverride"
          }),
          temp: new foundry.data.fields.NumberField({integer: true, initial: 0, min: 0, label: "MKA.HitPointsTemp"}),
          tempmax: new foundry.data.fields.NumberField({integer: true, initial: 0, label: "MKA.HitPointsTempMax"}),
          bonuses: new foundry.data.fields.SchemaField({
            level: new FormulaField({deterministic: true, label: "MKA.HitPointsBonusLevel"}),
            overall: new FormulaField({deterministic: true, label: "MKA.HitPointsBonusOverall"})
          })
        }, {label: "MKA.HitPoints"}),
        death: new foundry.data.fields.SchemaField({
          success: new foundry.data.fields.NumberField({
            required: true, nullable: false, integer: true, min: 0, initial: 0, label: "MKA.DeathSaveSuccesses"
          }),
          failure: new foundry.data.fields.NumberField({
            required: true, nullable: false, integer: true, min: 0, initial: 0, label: "MKA.DeathSaveFailures"
          })
        }, {label: "MKA.DeathSave"}),
        exhaustion: new foundry.data.fields.NumberField({
          required: true, nullable: false, integer: true, min: 0, initial: 0, label: "MKA.Exhaustion"
        }),
        inspiration: new foundry.data.fields.BooleanField({required: true, label: "MKA.Inspiration"})
      }, {label: "MKA.Attributes"}),
      details: new foundry.data.fields.SchemaField({
        ...DetailsFields.common,
        ...DetailsFields.creature,
        background: new foundry.data.fields.StringField({required: true, label: "MKA.Background"}),
        originalClass: new foundry.data.fields.StringField({required: true, label: "MKA.ClassOriginal"}),
        xp: new foundry.data.fields.SchemaField({
          value: new foundry.data.fields.NumberField({
            required: true, nullable: false, integer: true, min: 0, initial: 0, label: "MKA.ExperiencePointsCurrent"
          })
        }, {label: "MKA.ExperiencePoints"}),
        appearance: new foundry.data.fields.StringField({required: true, label: "MKA.Appearance"}),
        trait: new foundry.data.fields.StringField({required: true, label: "MKA.PersonalityTraits"}),
        ideal: new foundry.data.fields.StringField({required: true, label: "MKA.Ideals"}),
        bond: new foundry.data.fields.StringField({required: true, label: "MKA.Bonds"}),
        flaw: new foundry.data.fields.StringField({required: true, label: "MKA.Flaws"})
      }, {label: "MKA.Details"}),
      traits: new foundry.data.fields.SchemaField({
        ...TraitsFields.common,
        ...TraitsFields.creature,
        weaponProf: TraitsFields.makeSimpleTrait({label: "MKA.TraitWeaponProf"}),
        armorProf: TraitsFields.makeSimpleTrait({label: "MKA.TraitArmorProf"})
      }, {label: "MKA.Traits"}),
      resources: new foundry.data.fields.SchemaField({
        primary: makeResourceField({label: "MKA.ResourcePrimary"}),
        secondary: makeResourceField({label: "MKA.ResourceSecondary"}),
        tertiary: makeResourceField({label: "MKA.ResourceTertiary"})
      }, {label: "MKA.Resources"})
    });
  }

  /* -------------------------------------------- */

  /** @inheritdoc */
  static migrateData(source) {
    super.migrateData(source);
    AttributesFields._migrateInitiative(source.attributes);
  }
}

/* -------------------------------------------- */

/**
 * Data structure for character's resources.
 *
 * @typedef {object} ResourceData
 * @property {number} value  Available uses of this resource.
 * @property {number} max    Maximum allowed uses of this resource.
 * @property {boolean} sr    Does this resource recover on a short rest?
 * @property {boolean} lr    Does this resource recover on a long rest?
 * @property {string} label  Displayed name.
 */

/**
 * Produce the schema field for a simple trait.
 * @param {object} schemaOptions  Options passed to the outer schema.
 * @returns {ResourceData}
 */
function makeResourceField(schemaOptions={}) {
  return new foundry.data.fields.SchemaField({
    value: new foundry.data.fields.NumberField({
      required: true, integer: true, initial: 0, labels: "MKA.ResourceValue"
    }),
    max: new foundry.data.fields.NumberField({
      required: true, integer: true, initial: 0, labels: "MKA.ResourceMax"
    }),
    sr: new foundry.data.fields.BooleanField({required: true, labels: "MKA.ShortRestRecovery"}),
    lr: new foundry.data.fields.BooleanField({required: true, labels: "MKA.LongRestRecovery"}),
    label: new foundry.data.fields.StringField({required: true, labels: "MKA.ResourceLabel"})
  }, schemaOptions);
}
