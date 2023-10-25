/**
 * Data model template with information on items that can be attuned and equipped.
 *
 * @property {number} attunement  Attunement information as defined in `MKA.attunementTypes`.
 * @property {boolean} equipped   Is this item equipped on its owning actor.
 * @mixin
 */
export default class EquippableItemTemplate extends foundry.abstract.DataModel {
  /** @inheritdoc */
  static defineSchema() {
    return {
      attunement: new foundry.data.fields.NumberField({
        required: true, integer: true, initial: CONFIG.MKA.attunementTypes.NONE, label: "MKA.Attunement"
      }),
      equipped: new foundry.data.fields.BooleanField({required: true, label: "MKA.Equipped"})
    };
  }

  /* -------------------------------------------- */
  /*  Migrations                                  */
  /* -------------------------------------------- */

  /** @inheritdoc */
  static migrateData(source) {
    EquippableItemTemplate.#migrateAttunement(source);
    EquippableItemTemplate.#migrateEquipped(source);
  }

  /* -------------------------------------------- */

  /**
   * Migrate the item's attuned boolean to attunement string.
   * @param {object} source  The candidate source data from which the model will be constructed.
   */
  static #migrateAttunement(source) {
    if ( (source.attuned === undefined) || (source.attunement !== undefined) ) return;
    source.attunement = source.attuned ? CONFIG.MKA.attunementTypes.ATTUNED : CONFIG.MKA.attunementTypes.NONE;
  }

  /* -------------------------------------------- */

  /**
   * Migrate the equipped field.
   * @param {object} source  The candidate source data from which the model will be constructed.
   */
  static #migrateEquipped(source) {
    if ( !("equipped" in source) ) return;
    if ( (source.equipped === null) || (source.equipped === undefined) ) source.equipped = false;
  }

  /* -------------------------------------------- */
  /*  Getters                                     */
  /* -------------------------------------------- */

  /**
   * Chat properties for equippable items.
   * @type {string[]}
   */
  get equippableItemChatProperties() {
    const req = CONFIG.MKA.attunementTypes.REQUIRED;
    return [
      this.attunement === req ? CONFIG.MKA.attunements[req] : null,
      game.i18n.localize(this.equipped ? "MKA.Equipped" : "MKA.Unequipped"),
      ("proficient" in this) ? CONFIG.MKA.proficiencyLevels[this.prof?.multiplier || 0] : null
    ];
  }
}
