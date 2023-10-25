/**
 * The MKA game system for Foundry Virtual Tabletop
 * A system for playing Magi-Knights Awakening.
 * Author: 
 * Software License: MIT
 * Content License: https://www.dndbeyond.com/attachments/39j2li89/SRD5.1-CCBY4.0License.pdf
 * Repository: https://github.com/magi-knights-project/magi-knights
 * Issue Tracker: https://github.com/magi-knights-project/magi-knights/issues
 */

// Import Configuration
import MKA from "./module/config.mjs";
import registerSystemSettings from "./module/settings.mjs";

// Import Submodules
import * as applications from "./module/applications/_module.mjs";
import * as canvas from "./module/canvas/_module.mjs";
import * as dataModels from "./module/data/_module.mjs";
import * as dice from "./module/dice/_module.mjs";
import * as documents from "./module/documents/_module.mjs";
import * as migrations from "./module/migration.mjs";
import * as utils from "./module/utils.mjs";
import {ModuleArt} from "./module/module-art.mjs";

/* -------------------------------------------- */
/*  Define Module Structure                     */
/* -------------------------------------------- */

globalThis.mka = {
  applications,
  canvas,
  config: MKA,
  dataModels,
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
  CONFIG.MeasuredTemplate.defaults.angle = 53.13; // 5e cone RAW should be 53.13 degrees
  CONFIG.ui.combat = applications.combat.CombatTracker5e;
  CONFIG.compatibility.excludePatterns.push(/\bActiveEffect5e#label\b/); // backwards compatibility with v10
  game.mka.isV10 = game.release.generation < 11;

  // Register System Settings
  registerSystemSettings();

  // Validation strictness.
  if ( game.mka.isV10 ) _determineValidationStrictness();

  // Configure module art.
  game.mka.moduleArt = new ModuleArt();

  // Remove honor & sanity from configuration if they aren't enabled
  if ( !game.settings.get("mka", "honorScore") ) delete MKA.abilities.hon;
  if ( !game.settings.get("mka", "sanityScore") ) delete MKA.abilities.san;

  // Configure trackable & consumable attributes.
  _configureTrackableAttributes();
  _configureConsumableAttributes();

  // Patch Core Functions
  Combatant.prototype.getInitiativeRoll = documents.combat.getInitiativeRoll;

  // Register Roll Extensions
  CONFIG.Dice.rolls.push(dice.D20Roll);
  CONFIG.Dice.rolls.push(dice.DamageRoll);

  // Hook up system data types
  const modelType = game.mka.isV10 ? "systemDataModels" : "dataModels";
  CONFIG.Actor[modelType] = dataModels.actor.config;
  CONFIG.Item[modelType] = dataModels.item.config;
  CONFIG.JournalEntryPage[modelType] = dataModels.journal.config;

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
  Actors.registerSheet("mka", applications.actor.GroupActorSheet, {
    types: ["group"],
    makeDefault: true,
    label: "MKA.SheetClassGroup"
  });

  Items.unregisterSheet("core", ItemSheet);
  Items.registerSheet("mka", applications.item.ItemSheetMKA, {
    makeDefault: true,
    label: "MKA.SheetClassItem"
  });
  DocumentSheetConfig.registerSheet(JournalEntryPage, "mka", applications.journal.JournalClassPageSheet, {
    label: "MKA.SheetClassClassSummary",
    types: ["class"]
  });

  // Preload Handlebars helpers & partials
  utils.registerHandlebarsHelpers();
  utils.preloadHandlebarsTemplates();
});

/**
 * Determine if this is a 'legacy' world with permissive validation, or one where strict validation is enabled.
 * @internal
 */
function _determineValidationStrictness() {
  dataModels.SystemDataModel._enableV10Validation = game.settings.get("mka", "strictValidation");
}

/**
 * Update the world's validation strictness setting based on whether validation errors were encountered.
 * @internal
 */
async function _configureValidationStrictness() {
  if ( !game.user.isGM ) return;
  const invalidDocuments = game.actors.invalidDocumentIds.size + game.items.invalidDocumentIds.size
    + game.scenes.invalidDocumentIds.size;
  const strictValidation = game.settings.get("mka", "strictValidation");
  if ( invalidDocuments && strictValidation ) {
    await game.settings.set("mka", "strictValidation", false);
    game.socket.emit("reload");
    foundry.utils.debouncedReload();
  }
}

/**
 * Configure explicit lists of attributes that are trackable on the token HUD and in the combat tracker.
 * @internal
 */
function _configureTrackableAttributes() {
  const common = {
    bar: [],
    value: [
      ...Object.keys(MKA.abilities).map(ability => `abilities.${ability}.value`),
      ...Object.keys(MKA.movementTypes).map(movement => `attributes.movement.${movement}`),
      "attributes.ac.value", "attributes.init.total"
    ]
  };

  const creature = {
    bar: [...common.bar, "attributes.hp", "spells.pact"],
    value: [
      ...common.value,
      ...Object.keys(MKA.skills).map(skill => `skills.${skill}.passive`),
      ...Object.keys(MKA.senses).map(sense => `attributes.senses.${sense}`),
      "attributes.spelldc"
    ]
  };

  CONFIG.Actor.trackableAttributes = {
    character: {
      bar: [...creature.bar, "resources.primary", "resources.secondary", "resources.tertiary", "details.xp"],
      value: [...creature.value]
    },
    npc: {
      bar: [...creature.bar, "resources.legact", "resources.legres"],
      value: [...creature.value, "details.cr", "details.spellLevel", "details.xp.value"]
    },
    vehicle: {
      bar: [...common.bar, "attributes.hp"],
      value: [...common.value]
    },
    group: {
      bar: [],
      value: []
    }
  };
}

/**
 * Configure which attributes are available for item consumption.
 * @internal
 */
function _configureConsumableAttributes() {
  CONFIG.MKA.consumableResources = [
    ...Object.keys(MKA.abilities).map(ability => `abilities.${ability}.value`),
    "attributes.ac.flat",
    "attributes.hp.value",
    ...Object.keys(MKA.senses).map(sense => `attributes.senses.${sense}`),
    ...Object.keys(MKA.movementTypes).map(type => `attributes.movement.${type}`),
    ...Object.keys(MKA.currencies).map(denom => `currency.${denom}`),
    "details.xp.value",
    "resources.primary.value", "resources.secondary.value", "resources.tertiary.value",
    "resources.legact.value", "resources.legres.value",
    "spells.pact.value",
    ...Array.fromRange(Object.keys(MKA.spellLevels).length - 1, 1).map(level => `spells.spell${level}.value`)
  ];
}

/* -------------------------------------------- */
/*  Foundry VTT Setup                           */
/* -------------------------------------------- */

/**
 * Prepare attribute lists.
 */
Hooks.once("setup", function() {
  CONFIG.MKA.trackableAttributes = expandAttributeList(CONFIG.MKA.trackableAttributes);
  game.mka.moduleArt.registerModuleArt();

  // Apply custom compendium styles to the SRD rules compendium.
  if ( !game.mka.isV10 ) {
    const rules = game.packs.get("mka.rules");
    rules.applicationClass = applications.journal.SRDCompendium;
  }
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
  if ( game.mka.isV10 ) {
    // Configure validation strictness.
    _configureValidationStrictness();

    // Apply custom compendium styles to the SRD rules compendium.
    const rules = game.packs.get("mka.rules");
    rules.apps = [new applications.journal.SRDCompendium(rules)];
  }

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
  applications,
  canvas,
  dataModels,
  dice,
  documents,
  migrations,
  utils,
  MKA
};
