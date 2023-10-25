/**
 * Data definition for Class Summary journal entry pages.
 *
 * @property {string} item                             UUID of the class item included.
 * @property {object} description
 * @property {string} description.value                Introductory description for the class.
 * @property {string} description.additionalHitPoints  Additional text displayed beneath the hit points section.
 * @property {string} description.additionalTraits     Additional text displayed beneath the traits section.
 * @property {string} description.additionalEquipment  Additional text displayed beneath the equipment section.
 * @property {string} description.subclass             Introduction to the subclass section.
 * @property {string} subclassHeader                   Subclass header to replace the default.
 * @property {Set<string>} subclassItems               UUIDs of all subclasses to display.
 */
export default class ClassJournalPageData extends foundry.abstract.DataModel {
  static defineSchema() {
    return {
      item: new foundry.data.fields.StringField({required: true, label: "JOURNALENTRYPAGE.MKA.Class.Item"}),
      description: new foundry.data.fields.SchemaField({
        value: new foundry.data.fields.HTMLField({
          label: "JOURNALENTRYPAGE.MKA.Class.Description",
          hint: "JOURNALENTRYPAGE.MKA.Class.DescriptionHint"
        }),
        additionalHitPoints: new foundry.data.fields.HTMLField({
          label: "JOURNALENTRYPAGE.MKA.Class.AdditionalHitPoints",
          hint: "JOURNALENTRYPAGE.MKA.Class.AdditionalHitPointsHint"
        }),
        additionalTraits: new foundry.data.fields.HTMLField({
          label: "JOURNALENTRYPAGE.MKA.Class.AdditionalTraits",
          hint: "JOURNALENTRYPAGE.MKA.Class.AdditionalTraitsHint"
        }),
        additionalEquipment: new foundry.data.fields.HTMLField({
          label: "JOURNALENTRYPAGE.MKA.Class.AdditionalEquipment",
          hint: "JOURNALENTRYPAGE.MKA.Class.AdditionalEquipmentHint"
        }),
        subclass: new foundry.data.fields.HTMLField({
          label: "JOURNALENTRYPAGE.MKA.Class.SubclassDescription",
          hint: "JOURNALENTRYPAGE.MKA.Class.SubclassDescriptionHint"
        })
      }),
      subclassHeader: new foundry.data.fields.StringField({
        label: "JOURNALENTRYPAGE.MKA.Class.SubclassHeader"
      }),
      subclassItems: new foundry.data.fields.SetField(new foundry.data.fields.StringField(), {
        label: "JOURNALENTRYPAGE.MKA.Class.SubclassItems"
      })
    };
  }
}
