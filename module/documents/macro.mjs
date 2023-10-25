/**
 * Attempt to create a macro from the dropped data. Will use an existing macro if one exists.
 * @param {object} dropData     The dropped data
 * @param {number} slot         The hotbar slot to use
 */
export async function createMKAMacro(dropData, slot) {
  const macroData = { type: "script", scope: "actor" };
  switch ( dropData.type ) {
    case "Item":
      const itemData = await Item.implementation.fromDropData(dropData);
      if ( !itemData ) return ui.notifications.warn(game.i18n.localize("MACRO.MKAUnownedWarn"));
      foundry.utils.mergeObject(macroData, {
        name: itemData.name,
        img: itemData.img,
        command: `mka.documents.macro.rollItem("${itemData.name}")`,
        flags: {"mka.itemMacro": true}
      });
      break;
    case "ActiveEffect":
      const effectData = await ActiveEffect.implementation.fromDropData(dropData);
      if ( !effectData ) return ui.notifications.warn(game.i18n.localize("MACRO.MKAUnownedWarn"));
      foundry.utils.mergeObject(macroData, {
        name: effectData.label,
        img: effectData.icon,
        command: `mka.documents.macro.toggleEffect("${effectData.label}")`,
        flags: {"mka.effectMacro": true}
      });
      break;
    default:
      return;
  }

  // Assign the macro to the hotbar
  const macro = game.macros.find(m => {
    return (m.name === macroData.name) && (m.command === macroData.command) && m.isAuthor;
  }) || await Macro.create(macroData);
  game.user.assignHotbarMacro(macro, slot);
}

/* -------------------------------------------- */

/**
 * Find a document of the specified name and type on an assigned or selected actor.
 * @param {string} name          Document name to locate.
 * @param {string} documentType  Type of embedded document (e.g. "Item" or "ActiveEffect").
 * @returns {Document}           Document if found, otherwise nothing.
 */
function getMacroTarget(name, documentType) {
  let actor;
  const speaker = ChatMessage.getSpeaker();
  if ( speaker.token ) actor = game.actors.tokens[speaker.token];
  actor ??= game.actors.get(speaker.actor);
  if ( !actor ) return ui.notifications.warn(game.i18n.localize("MACRO.MKANoActorSelected"));

  const collection = (documentType === "Item") ? actor.items : actor.effects;
  const nameKeyPath = (documentType === "Item") ? "name" : "label";

  // Find item in collection
  const documents = collection.filter(i => foundry.utils.getProperty(i, nameKeyPath) === name);
  const type = game.i18n.localize(`DOCUMENT.${documentType}`);
  if ( documents.length === 0 ) {
    return ui.notifications.warn(game.i18n.format("MACRO.MKAMissingTargetWarn", { actor: actor.name, type, name }));
  }
  if ( documents.length > 1 ) {
    ui.notifications.warn(game.i18n.format("MACRO.MKAMultipleTargetsWarn", { actor: actor.name, type, name }));
  }
  return documents[0];
}

/* -------------------------------------------- */

/**
 * Trigger an item to roll when a macro is clicked.
 * @param {string} itemName                Name of the item on the selected actor to trigger.
 * @returns {Promise<ChatMessage|object>}  Roll result.
 */
export function rollItem(itemName) {
  return getMacroTarget(itemName, "Item")?.use();
}

/* -------------------------------------------- */

/**
 * Toggle an effect on and off when a macro is clicked.
 * @param {string} effectName        Name of the effect to be toggled.
 * @returns {Promise<ActiveEffect>}  The effect after it has been toggled.
 */
export function toggleEffect(effectName) {
  const effect = getMacroTarget(effectName, "ActiveEffect");
  return effect?.update({disabled: !effect.disabled});
}
