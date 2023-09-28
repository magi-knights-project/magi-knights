/**
 * Register all of the system's settings.
 */
export default function registerSystemSettings() {
  // Internal System Migration Version
  game.settings.register("mka", "systemMigrationVersion", {
    name: "System Migration Version",
    scope: "world",
    config: false,
    type: String,
    default: ""
  });

  // Rest Recovery Rules
  game.settings.register("mka", "restVariant", {
    name: "SETTINGS.MKARestN",
    hint: "SETTINGS.MKARestL",
    scope: "world",
    config: true,
    default: "normal",
    type: String,
    choices: {
      normal: "SETTINGS.MKARestPHB",
      gritty: "SETTINGS.MKARestGritty",
      epic: "SETTINGS.MKARestEpic"
    }
  });

  // Diagonal Movement Rule
  game.settings.register("mka", "diagonalMovement", {
    name: "SETTINGS.MKADiagN",
    hint: "SETTINGS.MKADiagL",
    scope: "world",
    config: true,
    default: "555",
    type: String,
    choices: {
      555: "SETTINGS.MKADiagPHB",
      5105: "SETTINGS.MKADiagDMG",
      EUCL: "SETTINGS.MKADiagEuclidean"
    },
    onChange: rule => canvas.grid.diagonalRule = rule
  });

  // Proficiency modifier type
  game.settings.register("mka", "proficiencyModifier", {
    name: "SETTINGS.MKAProfN",
    hint: "SETTINGS.MKAProfL",
    scope: "world",
    config: true,
    default: "bonus",
    type: String,
    choices: {
      bonus: "SETTINGS.MKAProfBonus",
      dice: "SETTINGS.MKAProfDice"
    }
  });

  // Use Honor ability score
  game.settings.register("mka", "honorScore", {
    name: "SETTINGS.MKAHonorN",
    hint: "SETTINGS.MKAHonorL",
    scope: "world",
    config: true,
    default: false,
    type: Boolean,
    requiresReload: true
  });

  // Use Sanity ability score
  game.settings.register("mka", "sanityScore", {
    name: "SETTINGS.MKASanityN",
    hint: "SETTINGS.MKASanityL",
    scope: "world",
    config: true,
    default: false,
    type: Boolean,
    requiresReload: true
  });

  // Apply Dexterity as Initiative Tiebreaker
  game.settings.register("mka", "initiativeDexTiebreaker", {
    name: "SETTINGS.MKAInitTBN",
    hint: "SETTINGS.MKAInitTBL",
    scope: "world",
    config: true,
    default: false,
    type: Boolean
  });

  // Record Currency Weight
  game.settings.register("mka", "currencyWeight", {
    name: "SETTINGS.MKACurWtN",
    hint: "SETTINGS.MKACurWtL",
    scope: "world",
    config: true,
    default: true,
    type: Boolean
  });

  // Disable Experience Tracking
  game.settings.register("mka", "disableExperienceTracking", {
    name: "SETTINGS.MKANoExpN",
    hint: "SETTINGS.MKANoExpL",
    scope: "world",
    config: true,
    default: false,
    type: Boolean
  });

  // Disable Advancements
  game.settings.register("mka", "disableAdvancements", {
    name: "SETTINGS.MKANoAdvancementsN",
    hint: "SETTINGS.MKANoAdvancementsL",
    scope: "world",
    config: true,
    default: false,
    type: Boolean
  });

  // Collapse Item Cards (by default)
  game.settings.register("mka", "autoCollapseItemCards", {
    name: "SETTINGS.MKAAutoCollapseCardN",
    hint: "SETTINGS.MKAAutoCollapseCardL",
    scope: "client",
    config: true,
    default: false,
    type: Boolean,
    onChange: s => {
      ui.chat.render();
    }
  });

  // Allow Polymorphing
  game.settings.register("mka", "allowPolymorphing", {
    name: "SETTINGS.MKAAllowPolymorphingN",
    hint: "SETTINGS.MKAAllowPolymorphingL",
    scope: "world",
    config: true,
    default: false,
    type: Boolean
  });

  // Polymorph Settings
  game.settings.register("mka", "polymorphSettings", {
    scope: "client",
    default: {
      keepPhysical: false,
      keepMental: false,
      keepSaves: false,
      keepSkills: false,
      mergeSaves: false,
      mergeSkills: false,
      keepClass: false,
      keepFeats: false,
      keepSpells: false,
      keepItems: false,
      keepBio: false,
      keepVision: true,
      transformTokens: true
    }
  });

  // Metric Unit Weights
  game.settings.register("mka", "metricWeightUnits", {
    name: "SETTINGS.MKAMetricN",
    hint: "SETTINGS.MKAMetricL",
    scope: "world",
    config: true,
    type: Boolean,
    default: false
  });

  // Critical Damage Modifiers
  game.settings.register("mka", "criticalDamageModifiers", {
    name: "SETTINGS.MKACriticalModifiersN",
    hint: "SETTINGS.MKACriticalModifiersL",
    scope: "world",
    config: true,
    type: Boolean,
    default: false
  });

  // Critical Damage Maximize
  game.settings.register("mka", "criticalDamageMaxDice", {
    name: "SETTINGS.MKACriticalMaxDiceN",
    hint: "SETTINGS.MKACriticalMaxDiceL",
    scope: "world",
    config: true,
    type: Boolean,
    default: false
  });
}
