import AdvancementConfig from "./advancement-config.mjs";

/**
 * Configuration application for item choices.
 */
export default class ItemChoiceConfig extends AdvancementConfig {

  /** @inheritdoc */
  static get defaultOptions() {
    return foundry.utils.mergeObject(super.defaultOptions, {
      classes: ["mka", "advancement", "item-choice", "two-column"],
      dragDrop: [{ dropSelector: ".drop-target" }],
      dropKeyPath: "pool",
      template: "systems/mka/templates/advancement/item-choice-config.hbs",
      width: 540
    });
  }

  /* -------------------------------------------- */

  /** @inheritdoc */
  getData(options={}) {
    const context = {
      ...super.getData(options),
      showSpellConfig: this.advancement.configuration.type === "spell",
      validTypes: this.advancement.constructor.VALID_TYPES.reduce((obj, type) => {
        obj[type] = game.i18n.localize(CONFIG.Item.typeLabels[type]);
        return obj;
      }, {})
    };
    if ( this.advancement.configuration.type === "feat" ) {
      const selectedType = CONFIG.MKA.featureTypes[this.advancement.configuration.restriction.type];
      context.typeRestriction = {
        typeLabel: game.i18n.localize("MKA.ItemFeatureType"),
        typeOptions: CONFIG.MKA.featureTypes,
        subtypeLabel: game.i18n.format("MKA.ItemFeatureSubtype", {category: selectedType?.label}),
        subtypeOptions: selectedType?.subtypes
      };
    }
    return context;
  }

  /* -------------------------------------------- */

  /** @inheritdoc */
  async prepareConfigurationUpdate(configuration) {
    if ( configuration.choices ) configuration.choices = this.constructor._cleanedObject(configuration.choices);

    // Ensure items are still valid if type restriction or spell restriction are changed
    const pool = [];
    for ( const uuid of (configuration.pool ?? this.advancement.configuration.pool) ) {
      if ( this.advancement._validateItemType(await fromUuid(uuid), {
        type: configuration.type, restriction: configuration.restriction ?? {}, strict: false
      }) ) pool.push(uuid);
    }
    configuration.pool = pool;

    return configuration;
  }

  /* -------------------------------------------- */

  /** @inheritdoc */
  _validateDroppedItem(event, item) {
    this.advancement._validateItemType(item);
  }
}
