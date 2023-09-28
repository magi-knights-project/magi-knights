/**
 * The MKA game system for Foundry Virtual Tabletop
 * A system for playing Magi-Knights Awakening.
 * Author: Atropos
 * Software License: MIT
 * Content License: https://media.wizards.com/2016/downloads/DND/SRD-OGL_V5.1.pdf
 * Repository: https://github.com/magi-knights-project/magi-knights
 * Issue Tracker: https://github.com/magi-knights-project/magi-knights/issues
 */

// Import Configuration
import MKA from "./module/config.mjs";
import registerSystemSettings from "./module/settings.mjs";

// Import Submodules
import * as advancement from "./module/advancement/_module.mjs";
import * as applications from "./module/applications/_module.mjs";
import * as canvas from "./module/canvas/_module.mjs";
import * as dice from "./module/dice/_module.mjs";
import * as documents from "./module/documents/_module.mjs";
import * as migrations from "./module/migration.mjs";
import * as utils from "./module/utils.mjs";

/* -------------------------------------------- */
/*  Define Module Structure                     */
/* -------------------------------------------- */

globalThis.mka = {
  advancement,
  applications,
  canvas,
  config: MKA,
  dice,
  documents,
  migrations,
  utils
};

/* -------------------------------------------- */
/*  Foundry VTT Initialization                  */
/* -------------------------------------------- */

Hooks.once("init", function() {
  globalThis.mka = game.mka = Object.assign(game.system, globalThis.mka);
  console.log(`MKA | Initializing the MKA Game System - Version ${mka.version}\n${MKA.ASCII}`);

  /** @deprecated */
  Object.defineProperty(mka, "entities", {
    get() {
      foundry.utils.logCompatibilityWarning(
        "You are referencing the 'mka.entities' property which has been deprecated and renamed to "
        + "'mka.documents'. Support for this old path will be removed in a future version.",
        { since: "MKA 2.0", until: "MKA 2.2" }
      );
      return mka.documents;
    }
  });

  /** @deprecated */
  Object.defineProperty(mka, "rollItemMacro", {
    get() {
      foundry.utils.logCompatibilityWarning(
        "You are referencing the 'mka.rollItemMacro' method which has been deprecated and renamed to "
        + "'mka.documents.macro.rollItem'. Support for this old path will be removed in a future version.",
        { since: "MKA 2.0", until: "MKA 2.2" }
      );
      return mka.documents.macro.rollItem;
    }
  });

  /** @deprecated */
  Object.defineProperty(mka, "macros", {
    get() {
      foundry.utils.logCompatibilityWarning(
        "You are referencing the 'mka.macros' property which has been deprecated and renamed to "
        + "'mka.documents.macro'. Support for this old path will be removed in a future version.",
        { since: "MKA 2.0", until: "MKA 2.2" }
      );
      return mka.documents.macro;
    }
  });

  // Record Configuration Values
  CONFIG.MKA = MKA;
  CONFIG.ActiveEffect.documentClass = documents.ActiveEffectMKA;
  CONFIG.Actor.documentClass = documents.ActorMKA;
  CONFIG.Item.documentClass = documents.ItemMKA;
  CONFIG.Token.documentClass = documents.TokenDocumentMKA;
  CONFIG.Token.objectClass = canvas.TokenMKA;
  CONFIG.time.roundTime = 6;
  CONFIG.Dice.DamageRoll = dice.DamageRoll;
  CONFIG.Dice.D20Roll = dice.D20Roll;
  CONFIG.MeasuredTemplate.defaults.angle = 53.13; // MKA cone RAW should be 53.13 degrees

  // Register System Settings
  registerSystemSettings();

  // Remove honor & sanity from configuration if they aren't enabled
  if ( !game.settings.get("mka", "honorScore") ) {
    delete MKA.abilities.hon;
    delete MKA.abilityAbbreviations.hon;
  }
  if ( !game.settings.get("mka", "sanityScore") ) {
    delete MKA.abilities.san;
    delete MKA.abilityAbbreviations.san;
  }

  // Patch Core Functions
  CONFIG.Combat.initiative.formula = "1d20 + @attributes.init.mod + @attributes.init.prof + @attributes.init.bonus + @abilities.dex.bonuses.check + @bonuses.abilities.check";
  Combatant.prototype._getInitiativeFormula = documents.combat._getInitiativeFormula;

  // Register Roll Extensions
  CONFIG.Dice.rolls.push(dice.D20Roll);
  CONFIG.Dice.rolls.push(dice.DamageRoll);

  // Register sheet application classes
  Actors.unregisterSheet("core", ActorSheet);
  Actors.registerSheet("mka", applications.actor.ActorSheetMKACharacter, {
    types: ["character"],
    makeDefault: true,
    label: "MKA.SheetClassCharacter"
  });
  Actors.registerSheet("mka", applications.actor.ActorSheetMKANPC, {
    types: ["npc"],
    makeDefault: true,
    label: "MKA.SheetClassNPC"
  });
  Actors.registerSheet("mka", applications.actor.ActorSheetMKAVehicle, {
    types: ["vehicle"],
    makeDefault: true,
    label: "MKA.SheetClassVehicle"
  });
  Items.unregisterSheet("core", ItemSheet);
  Items.registerSheet("mka", applications.item.ItemSheetMKA, {
    makeDefault: true,
    label: "MKA.SheetClassItem"
  });

  // Preload Handlebars helpers & partials
  utils.registerHandlebarsHelpers();
  utils.preloadHandlebarsTemplates();
});


/* -------------------------------------------- */
/*  Foundry VTT Setup                           */
/* -------------------------------------------- */

/**
 * Prepare attribute lists.
 */
Hooks.once("setup", function() {
  CONFIG.MKA.trackableAttributes = expandAttributeList(CONFIG.MKA.trackableAttributes);
  CONFIG.MKA.consumableResources = expandAttributeList(CONFIG.MKA.consumableResources);
});

/* --------------------------------------------- */

/**
 * Expand a list of attribute paths into an object that can be traversed.
 * @param {string[]} attributes  The initial attributes configuration.
 * @returns {object}  The expanded object structure.
 */
function expandAttributeList(attributes) {
  return attributes.reduce((obj, attr) => {
    foundry.utils.setProperty(obj, attr, true);
    return obj;
  }, {});
}

/* --------------------------------------------- */

/**
 * Perform one-time pre-localization and sorting of some configuration objects
 */
Hooks.once("i18nInit", () => utils.performPreLocalization(CONFIG.MKA));

/* -------------------------------------------- */
/*  Foundry VTT Ready                           */
/* -------------------------------------------- */

/**
 * Once the entire VTT framework is initialized, check to see if we should perform a data migration
 */
Hooks.once("ready", function() {
  // Apply custom compendium styles to the SRD rules compendium.
  const rules = game.packs.get("mka.rules");
  rules.apps = [new applications.SRDCompendium(rules)];

  // Wait to register hotbar drop hook on ready so that modules could register earlier if they want to
  Hooks.on("hotbarDrop", (bar, data, slot) => {
    if ( ["Item", "ActiveEffect"].includes(data.type) ) {
      documents.macro.createMKAMacro(data, slot);
      return false;
    }
  });

  // Determine whether a system migration is required and feasible
  if ( !game.user.isGM ) return;
  const cv = game.settings.get("mka", "systemMigrationVersion") || game.world.flags.mka?.version;
  const totalDocuments = game.actors.size + game.scenes.size + game.items.size;
  if ( !cv && totalDocuments === 0 ) return game.settings.set("mka", "systemMigrationVersion", game.system.version);
  if ( cv && !isNewerVersion(game.system.flags.needsMigrationVersion, cv) ) return;

  // Perform the migration
  if ( cv && isNewerVersion(game.system.flags.compatibleMigrationVersion, cv) ) {
    ui.notifications.error(game.i18n.localize("MIGRATION.MKAVersionTooOldWarning"), {permanent: true});
  }
  migrations.migrateWorld();
});

/* -------------------------------------------- */
/*  Canvas Initialization                       */
/* -------------------------------------------- */

Hooks.on("canvasInit", gameCanvas => {
  gameCanvas.grid.diagonalRule = game.settings.get("mka", "diagonalMovement");
  SquareGrid.prototype.measureDistances = canvas.measureDistances;
});

/* -------------------------------------------- */
/*  Other Hooks                                 */
/* -------------------------------------------- */

Hooks.on("renderChatMessage", documents.chat.onRenderChatMessage);
Hooks.on("getChatLogEntryContext", documents.chat.addChatMessageContextOptions);

Hooks.on("renderChatLog", (app, html, data) => documents.ItemMKA.chatListeners(html));
Hooks.on("renderChatPopout", (app, html, data) => documents.ItemMKA.chatListeners(html));
Hooks.on("getActorDirectoryEntryContext", documents.ActorMKA.addDirectoryContextOptions);

/* -------------------------------------------- */
/*  Bundled Module Exports                      */
/* -------------------------------------------- */

export {
  advancement,
  applications,
  canvas,
  dice,
  documents,
  migrations,
  utils,
  MKA
};
