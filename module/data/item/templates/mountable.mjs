/**
 * Data model template for equipment that can be mounted on a vehicle.
 *
 * @property {object} armor          Equipment's armor class.
 * @property {number} armor.value    Armor class value for equipment.
 * @property {object} hp             Equipment's hit points.
 * @property {number} hp.value       Current hit point value.
 * @property {number} hp.max         Max hit points.
 * @property {number} hp.dt          Damage threshold.
 * @property {string} hp.conditions  Conditions that are triggered when this equipment takes damage.
 * @mixin
 */
export default class MountableTemplate extends foundry.abstract.DataModel {
  /** @inheritdoc */
  static defineSchema() {
    return {
      armor: new foundry.data.fields.SchemaField({
        value: new foundry.data.fields.NumberField({
          required: true, integer: true, min: 0, label: "MKA.ArmorClass"
        })
      }, {label: "MKA.ArmorClass"}),
      hp: new foundry.data.fields.SchemaField({
        value: new foundry.data.fields.NumberField({
          required: true, integer: true, min: 0, label: "MKA.HitPointsCurrent"
        }),
        max: new foundry.data.fields.NumberField({
          required: true, integer: true, min: 0, label: "MKA.HitPointsMax"
        }),
        dt: new foundry.data.fields.NumberField({
          required: true, integer: true, min: 0, label: "MKA.DamageThreshold"
        }),
        conditions: new foundry.data.fields.StringField({required: true, label: "MKA.HealthConditions"})
      }, {label: "MKA.HitPoints"})
    };
  }
}
