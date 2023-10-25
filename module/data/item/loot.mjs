import SystemDataModel from "../abstract.mjs";
import ItemDescriptionTemplate from "./templates/item-description.mjs";
import PhysicalItemTemplate from "./templates/physical-item.mjs";

/**
 * Data definition for Loot items.
 * @mixes ItemDescriptionTemplate
 * @mixes PhysicalItemTemplate
 */
export default class LootData extends SystemDataModel.mixin(ItemDescriptionTemplate, PhysicalItemTemplate) {

  /* -------------------------------------------- */
  /*  Getters                                     */
  /* -------------------------------------------- */

  /**
   * Properties displayed in chat.
   * @type {string[]}
   */
  get chatProperties() {
    return [
      game.i18n.localize(CONFIG.Item.typeLabels.loot),
      this.weight ? `${this.weight} ${game.i18n.localize("MKA.AbbreviationLbs")}` : null
    ];
  }
}
