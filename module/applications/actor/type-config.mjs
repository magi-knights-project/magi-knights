import ActorMKA from "../../documents/actor/actor.mjs";

/**
 * A specialized form used to select from a checklist of attributes, traits, or properties
 */
export default class ActorTypeConfig extends FormApplication {

  /** @inheritDoc */
  static get defaultOptions() {
    return foundry.utils.mergeObject(super.defaultOptions, {
      classes: ["mka", "actor-type", "trait-selector"],
      template: "systems/mka/templates/apps/actor-type.hbs",
      width: 280,
      height: "auto",
      choices: {},
      allowCustom: true,
      minimum: 0,
      maximum: null
    });
  }

  /* -------------------------------------------- */

  /** @inheritDoc */
  get title() {
    return `${game.i18n.localize("MKA.CreatureTypeTitle")}: ${this.object.name}`;
  }

  /* -------------------------------------------- */

  /** @override */
  get id() {
    return `actor-type-${this.object.id}`;
  }

  /* -------------------------------------------- */

  /** @override */
  getData(options={}) {

    // Get current value or new default
    let attr = foundry.utils.getProperty(this.object.system, "details.type");
    if ( foundry.utils.getType(attr) !== "Object" ) attr = {
      value: (attr in CONFIG.MKA.creatureTypes) ? attr : "humanoid",
      subtype: "",
      swarm: "",
      custom: ""
    };

    // Populate choices
    const types = {};
    for ( let [k, v] of Object.entries(CONFIG.MKA.creatureTypes) ) {
      types[k] = {
        label: game.i18n.localize(v),
        chosen: attr.value === k
      };
    }

    // Return data for rendering
    return {
      types: types,
      custom: {
        value: attr.custom,
        label: game.i18n.localize("MKA.CreatureTypeSelectorCustom"),
        chosen: attr.value === "custom"
      },
      subtype: attr.subtype,
      swarm: attr.swarm,
      sizes: Array.from(Object.entries(CONFIG.MKA.actorSizes)).reverse().reduce((obj, e) => {
        obj[e[0]] = e[1];
        return obj;
      }, {}),
      preview: ActorMKA.formatCreatureType(attr) || "–"
    };
  }

  /* -------------------------------------------- */

  /** @override */
  async _updateObject(event, formData) {
    const typeObject = foundry.utils.expandObject(formData);
    return this.object.update({"system.details.type": typeObject});
  }

  /* -------------------------------------------- */
  /*  Event Listeners and Handlers                */
  /* -------------------------------------------- */

  /** @inheritdoc */
  activateListeners(html) {
    super.activateListeners(html);
    html.find("input[name='custom']").focusin(this._onCustomFieldFocused.bind(this));
  }

  /* -------------------------------------------- */

  /** @inheritdoc */
  _onChangeInput(event) {
    super._onChangeInput(event);
    const typeObject = foundry.utils.expandObject(this._getSubmitData());
    this.form.preview.value = ActorMKA.formatCreatureType(typeObject) || "—";
  }

  /* -------------------------------------------- */

  /**
   * Select the custom radio button when the custom text field is focused.
   * @param {FocusEvent} event      The original focusin event
   * @private
   */
  _onCustomFieldFocused(event) {
    this.form.querySelector("input[name='value'][value='custom']").checked = true;
    this._onChangeInput(event);
  }
}
