/**
 * Shared contents of the details schema between various actor types.
 */
export default class DetailsField {
  /**
   * Fields shared between characters, NPCs, and vehicles.
   *
   * @type {object}
   * @property {object} biography         Actor's biography data.
   * @property {string} biography.value   Full HTML biography information.
   * @property {string} biography.public  Biography that will be displayed to players with observer privileges.
   */
  static get common() {
    return {
      biography: new foundry.data.fields.SchemaField({
        value: new foundry.data.fields.HTMLField({label: "MKA.Biography"}),
        public: new foundry.data.fields.HTMLField({label: "MKA.BiographyPublic"})
      }, {label: "MKA.Biography"})
    };
  }

  /* -------------------------------------------- */

  /**
   * Fields shared between characters and NPCs.
   *
   * @type {object}
   * @property {string} alignment  Creature's alignment.
   * @property {string} race       Creature's race.
   */
  static get creature() {
    return {
      alignment: new foundry.data.fields.StringField({required: true, label: "MKA.Alignment"}),
      race: new foundry.data.fields.StringField({required: true, label: "MKA.Race"})
    };
  }
}
