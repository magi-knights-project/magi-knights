/**
 * A simple form to set save throw configuration for a given ability score.
 *
 * @param {ActorMKA} actor               The Actor instance being displayed within the sheet.
 * @param {ApplicationOptions} options  Additional application configuration options.
 * @param {string} abilityId            The ability key as defined in CONFIG.MKA.abilities.
 */
export default class ActorAbilityConfig extends DocumentSheet {
  constructor(actor, options, abilityId) {
    super(actor, options);
    this._abilityId = abilityId;
  }

  /* -------------------------------------------- */

  /** @override */
  static get defaultOptions() {
    return foundry.utils.mergeObject(super.defaultOptions, {
      classes: ["mka"],
      template: "systems/mka/templates/apps/ability-config.hbs",
      width: 500,
      height: "auto"
    });
  }

  /* -------------------------------------------- */

  /** @override */
  get title() {
    return `${game.i18n.format("MKA.AbilityConfigureTitle", {ability: CONFIG.MKA.abilities[this._abilityId]})}: ${this.document.name}`;
  }

  /* -------------------------------------------- */

  /** @override */
  getData(options) {
    const src = this.object.toObject();
    return {
      ability: src.system.abilities[this._abilityId] || {},
      labelSaves: game.i18n.format("MKA.AbilitySaveConfigure", {ability: CONFIG.MKA.abilities[this._abilityId]}),
      labelChecks: game.i18n.format("MKA.AbilityCheckConfigure", {ability: CONFIG.MKA.abilities[this._abilityId]}),
      abilityId: this._abilityId,
      proficiencyLevels: {
        0: CONFIG.MKA.proficiencyLevels[0],
        1: CONFIG.MKA.proficiencyLevels[1]
      },
      bonusGlobalSave: src.system.bonuses?.abilities?.save,
      bonusGlobalCheck: src.system.bonuses?.abilities?.check
    };
  }
}
