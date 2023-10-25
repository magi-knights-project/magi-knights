/**
 * A helper Dialog subclass for rolling Hit Dice on short rest.
 *
 * @param {ActorMKA} actor           Actor that is taking the short rest.
 * @param {object} [dialogData={}]  An object of dialog data which configures how the modal window is rendered.
 * @param {object} [options={}]     Dialog rendering options.
 */
export default class ShortRestDialog extends Dialog {
  constructor(actor, dialogData={}, options={}) {
    super(dialogData, options);

    /**
     * Store a reference to the Actor document which is resting
     * @type {Actor}
     */
    this.actor = actor;

    /**
     * Track the most recently used HD denomination for re-rendering the form
     * @type {string}
     */
    this._denom = null;
  }

  /* -------------------------------------------- */

  /** @inheritDoc */
  static get defaultOptions() {
    return foundry.utils.mergeObject(super.defaultOptions, {
      template: "systems/mka/templates/apps/short-rest.hbs",
      classes: ["mka", "dialog"]
    });
  }

  /* -------------------------------------------- */

  /** @inheritDoc */
  getData() {
    const data = super.getData();

    // Determine Hit Dice
    data.availableHD = this.actor.items.reduce((hd, item) => {
      if ( item.type === "class" ) {
        const {levels, hitDice, hitDiceUsed} = item.system;
        const denom = hitDice ?? "d6";
        const available = parseInt(levels ?? 1) - parseInt(hitDiceUsed ?? 0);
        hd[denom] = denom in hd ? hd[denom] + available : available;
      }
      return hd;
    }, {});
    data.canRoll = this.actor.system.attributes.hd > 0;
    data.denomination = this._denom;

    // Determine rest type
    const variant = game.settings.get("mka", "restVariant");
    data.promptNewDay = variant !== "epic";     // It's never a new day when only resting 1 minute
    data.newDay = false;                        // It may be a new day, but not by default
    return data;
  }

  /* -------------------------------------------- */


  /** @inheritDoc */
  activateListeners(html) {
    super.activateListeners(html);
    let btn = html.find("#roll-hd");
    btn.click(this._onRollHitDie.bind(this));
  }

  /* -------------------------------------------- */

  /**
   * Handle rolling a Hit Die as part of a Short Rest action
   * @param {Event} event     The triggering click event
   * @protected
   */
  async _onRollHitDie(event) {
    event.preventDefault();
    const btn = event.currentTarget;
    this._denom = btn.form.hd.value;
    await this.actor.rollHitDie(this._denom);
    this.render();
  }

  /* -------------------------------------------- */

  /**
   * A helper constructor function which displays the Short Rest dialog and returns a Promise once it's workflow has
   * been resolved.
   * @param {object} [options={}]
   * @param {ActorMKA} [options.actor]  Actor that is taking the short rest.
   * @returns {Promise}                Promise that resolves when the rest is completed or rejects when canceled.
   */
  static async shortRestDialog({ actor }={}) {
    return new Promise((resolve, reject) => {
      const dlg = new this(actor, {
        title: `${game.i18n.localize("MKA.ShortRest")}: ${actor.name}`,
        buttons: {
          rest: {
            icon: '<i class="fas fa-bed"></i>',
            label: game.i18n.localize("MKA.Rest"),
            callback: html => {
              let newDay = false;
              if ( game.settings.get("mka", "restVariant") !== "epic" ) {
                newDay = html.find('input[name="newDay"]')[0].checked;
              }
              resolve(newDay);
            }
          },
          cancel: {
            icon: '<i class="fas fa-times"></i>',
            label: game.i18n.localize("Cancel"),
            callback: reject
          }
        },
        close: reject
      });
      dlg.render(true);
    });
  }
}
