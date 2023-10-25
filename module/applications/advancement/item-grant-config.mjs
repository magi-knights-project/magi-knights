import AdvancementConfig from "./advancement-config.mjs";

/**
 * Configuration application for item grants.
 */
export default class ItemGrantConfig extends AdvancementConfig {

  /** @inheritdoc */
  static get defaultOptions() {
    return foundry.utils.mergeObject(super.defaultOptions, {
      classes: ["mka", "advancement", "item-grant"],
      dragDrop: [{ dropSelector: ".drop-target" }],
      dropKeyPath: "items",
      template: "systems/mka/templates/advancement/item-grant-config.hbs"
    });
  }

  /* -------------------------------------------- */

  /** @inheritdoc */
  getData(options={}) {
    const context = super.getData(options);
    context.showSpellConfig = context.configuration.items.map(uuid => fromUuidSync(uuid)).some(i => i?.type === "spell");
    return context;
  }

  /* -------------------------------------------- */

  /** @inheritdoc */
  _validateDroppedItem(event, item) {
    this.advancement._validateItemType(item);
  }
}
