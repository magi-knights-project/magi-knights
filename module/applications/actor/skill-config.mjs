/**
 * A simple form to set skill configuration for a given skill.
 *
 * @param {Actor} actor                 The Actor instance being displayed within the sheet.
 * @param {ApplicationOptions} options  Additional application configuration options.
 * @param {string} skillId              The skill key as defined in CONFIG.MKA.skills.
 */
export default class ActorSkillConfig extends DocumentSheet {
  constructor(actor, options, skillId) {
    super(actor, options);
    this._skillId = skillId;
  }

  /* -------------------------------------------- */

  /** @inheritdoc */
  static get defaultOptions() {
    return foundry.utils.mergeObject(super.defaultOptions, {
      classes: ["mka"],
      template: "systems/mka/templates/apps/skill-config.hbs",
      width: 500,
      height: "auto"
    });
  }

  /* -------------------------------------------- */

  /** @inheritdoc */
  get title() {
    const label = CONFIG.MKA.skills[this._skillId].label;
    return `${game.i18n.format("MKA.SkillConfigureTitle", {skill: label})}: ${this.document.name}`;
  }

  /* -------------------------------------------- */

  /** @inheritdoc */
  getData(options) {
    const src = this.document.toObject();
    return {
      skill: src.system.skills?.[this._skillId] || {},
      skillId: this._skillId,
      proficiencyLevels: CONFIG.MKA.proficiencyLevels,
      bonusGlobal: src.system.bonuses?.skill
    };
  }

  /* -------------------------------------------- */

  /** @inheritdoc */
  _updateObject(event, formData) {
    const passive = formData[`system.skills.${this._skillId}.bonuses.passive`];
    const passiveRoll = new Roll(passive);
    if ( !passiveRoll.isDeterministic ) {
      const message = game.i18n.format("MKA.FormulaCannotContainDiceError", {
        name: game.i18n.localize("MKA.SkillBonusPassive")
      });
      ui.notifications.error(message);
      throw new Error(message);
    }
    super._updateObject(event, formData);
  }
}
