import BaseConfigSheet from "./base-config.mjs";

/**
 * A simple sub-application of the ActorSheet which is used to configure properties related to initiative.
 */
export default class ActorInitiativeConfig extends BaseConfigSheet {

  /** @override */
  static get defaultOptions() {
    return foundry.utils.mergeObject(super.defaultOptions, {
      classes: ["mka"],
      template: "systems/mka/templates/apps/initiative-config.hbs",
      width: 360,
      height: "auto"
    });
  }

  /* -------------------------------------------- */

  /** @override */
  get title() {
    return `${game.i18n.localize("MKA.InitiativeConfig")}: ${this.document.name}`;
  }

  /* -------------------------------------------- */

  /** @override */
  getData(options={}) {
    const source = this.document.toObject();
    const init = source.system.attributes.init || {};
    const flags = source.flags.mka || {};
    return {
      ability: init.ability,
      abilities: CONFIG.MKA.abilities,
      bonus: init.bonus,
      initiativeAlert: flags.initiativeAlert,
      initiativeAdv: flags.initiativeAdv
    };
  }

  /* -------------------------------------------- */

  /** @inheritDoc */
  _getSubmitData(updateData={}) {
    const formData = super._getSubmitData(updateData);
    formData.flags = {mka: {}};
    for ( const flag of ["initiativeAlert", "initiativeAdv"] ) {
      const k = `flags.mka.${flag}`;
      if ( formData[k] ) formData.flags.mka[flag] = true;
      else formData.flags.mka[`-=${flag}`] = null;
      delete formData[k];
    }
    return formData;
  }
}
