import { SparseDataModel } from "../abstract.mjs";
import { MappingField } from "../fields.mjs";

/**
 * Data model for the Ability Score Improvement advancement configuration.
 *
 * @property {number} points                 Number of points that can be assigned to any score.
 * @property {Object<string, number>} fixed  Number of points automatically assigned to a certain score.
 */
export class AbilityScoreImprovementConfigurationData extends foundry.abstract.DataModel {
  /** @inheritdoc */
  static defineSchema() {
    return {
      // TODO: This should default to 2 if added to a class, or 0 if added to anything else
      points: new foundry.data.fields.NumberField({
        integer: true, min: 0, initial: 2,
        label: "MKA.AdvancementAbilityScoreImprovementPoints",
        hint: "MKA.AdvancementAbilityScoreImprovementPointsHint"
      }),
      fixed: new MappingField(
        new foundry.data.fields.NumberField({nullable: false, integer: true, initial: 0}),
        {label: "MKA.AdvancementAbilityScoreImprovementFixed"}
      )
    };
  }
}

/**
 * Data model for the Ability Score Improvement advancement value.
 *
 * @property {string} type  When on a class, whether the player chose ASI or a Feat.
 * @property {Object<string, number>}  Points assigned to individual scores.
 * @property {Object<string, string>}  Feat that was selected.
 */
export class AbilityScoreImprovementValueData extends SparseDataModel {
  /** @inheritdoc */
  static defineSchema() {
    return {
      type: new foundry.data.fields.StringField({
        required: true, initial: "asi", choices: ["asi", "feat"]
      }),
      assignments: new MappingField(new foundry.data.fields.NumberField({
        nullable: false, integer: true
      }), {required: false, initial: undefined}),
      feat: new MappingField(new foundry.data.fields.StringField(), {
        required: false, initial: undefined, label: "MKA.Feature.Feat"
      })
    };
  }
}
