import ClassFeatures from "./advancement/class-features.mjs";
import { preLocalize } from "./utils.mjs";

// Namespace Configuration Values
const MKA = {};

// ASCII Artwork
MKA.ASCII = ` .----------------.  .----------------.  .----------------. 
| .--------------. || .--------------. || .--------------. |
| | ____    ____ | || |  ___  ____   | || |      __      | |
| ||_   \  /   _|| || | |_  ||_  _|  | || |     /  \     | |
| |  |   \/   |  | || |   | |_/ /    | || |    / /\ \    | |
| |  | |\  /| |  | || |   |  __'.    | || |   / ____ \   | |
| | _| |_\/_| |_ | || |  _| |  \ \_  | || | _/ /    \ \_ | |
| ||_____||_____|| || | |____||____| | || ||____|  |____|| |
| |              | || |              | || |              | |
| '--------------' || '--------------' || '--------------' |
 '----------------'  '----------------'  '----------------'`;


/**
 * The set of Ability Scores used within the system.
 * @enum {string}
 */
MKA.abilities = {
  str: "MKA.AbilityStr",
  dex: "MKA.AbilityDex",
  con: "MKA.AbilityCon",
  int: "MKA.AbilityInt",
  wis: "MKA.AbilityWis",
  cha: "MKA.AbilityCha",
  hon: "MKA.AbilityHon",
  san: "MKA.AbilitySan"
};
preLocalize("abilities");

/**
 * Localized abbreviations for Ability Scores.
 * @enum {string}
 */
MKA.abilityAbbreviations = {
  str: "MKA.AbilityStrAbbr",
  dex: "MKA.AbilityDexAbbr",
  con: "MKA.AbilityConAbbr",
  int: "MKA.AbilityIntAbbr",
  wis: "MKA.AbilityWisAbbr",
  cha: "MKA.AbilityChaAbbr",
  hon: "MKA.AbilityHonAbbr",
  san: "MKA.AbilitySanAbbr"
};
preLocalize("abilityAbbreviations");

/* -------------------------------------------- */

/**
 * Configuration data for skills.
 *
 * @typedef {object} SkillConfiguration
 * @property {string} label    Localized label.
 * @property {string} ability  Key for the default ability used by this skill. MKEDIT: Fallback.
 * @property {Array} abilitylist  MKEDIT: List of default abilities.
 */

/**
 * The set of skill which can be trained with their default ability scores.
 * @enum {SkillConfiguration}
 */
MKA.skills = {
  art: { label: "MKA.SkillArt", ability: "int", abilitylist: ["int", "wis"] },
  acr: { label: "MKA.SkillAcr", ability: "dex", abilitylist: ["dex"] },
  ath: { label: "MKA.SkillAth", ability: "str", abilitylist: ["str"] },
  crd: { label: "MKA.SkillCrd", ability: "dex", abilitylist: ["dex"] },
  dec: { label: "MKA.SkillDec", ability: "cha", abilitylist: ["int", "cha"] },
  inf: { label: "MKA.SkillInf", ability: "cha", abilitylist: ["str", "cha"] },
  ins: { label: "MKA.SkillIns", ability: "wis", abilitylist: ["wis"] },
  inv: { label: "MKA.SkillInv", ability: "int", abilitylist: ["int", "wis"] },
  ldr: { label: "MKA.SkillLdr", ability: "cha", abilitylist: ["cha"] },
  med: { label: "MKA.SkillMed", ability: "wis", abilitylist: ["int", "wis"] },
  mst: { label: "MKA.SkillMst", ability: "int", abilitylist: ["int"] },
  prc: { label: "MKA.SkillPrc", ability: "wis", abilitylist: ["wis"] },
  prf: { label: "MKA.SkillPrf", ability: "cha", abilitylist: ["str", "dex", "con", "int", "wis", "cha"] },
  per: { label: "MKA.SkillPer", ability: "wis", abilitylist: ["wis"] },
  pur: { label: "MKA.SkillPur", ability: "wis", abilitylist: ["int", "wis", "cha"] },
  ste: { label: "MKA.SkillSte", ability: "dex", abilitylist: ["dex"] },
  stm: { label: "MKA.SkillSTM", ability: "int", abilitylist: ["int"] }
};
preLocalize("skills", { key: "label", sort: true });
patchConfig("skills", "label", { since: 2.0, until: 2.2 });

/* -------------------------------------------- */

/**
 * Character alignment options.
 * @enum {string}
 */
MKA.alignments = {
  lg: "MKA.AlignmentLG",
  ng: "MKA.AlignmentNG",
  cg: "MKA.AlignmentCG",
  ln: "MKA.AlignmentLN",
  tn: "MKA.AlignmentTN",
  cn: "MKA.AlignmentCN",
  le: "MKA.AlignmentLE",
  ne: "MKA.AlignmentNE",
  ce: "MKA.AlignmentCE"
};
preLocalize("alignments");

/* -------------------------------------------- */

/**
 * An enumeration of item attunement types.
 * @enum {number}
 */
MKA.attunementTypes = {
  NONE: 0,
  REQUIRED: 1,
  ATTUNED: 2
};

/**
 * An enumeration of item attunement states.
 * @type {{"0": string, "1": string, "2": string}}
 */
MKA.attunements = {
  0: "MKA.AttunementNone",
  1: "MKA.AttunementRequired",
  2: "MKA.AttunementAttuned"
};
preLocalize("attunements");

/* -------------------------------------------- */

/**
 * General weapon categories.
 * @enum {string}
 */
MKA.weaponProficiencies = {
  sim: "MKA.WeaponSimpleProficiency",
  sle: "MKA.WeaponSoulProficiency"
};
preLocalize("weaponProficiencies");

/**
 * A mapping between `MKA.weaponTypes` and `MKA.weaponProficiencies` that
 * is used to determine if character has proficiency when adding an item.
 * @enum {(boolean|string)}
 */
MKA.weaponProficienciesMap = {
  natural: true,
  simpleM: "sim",
  simpleR: "sim",
  soulM: "sle",
  soulR: "sle",
  soulI: "sle"
};

/**
 * The basic weapon types in MKA. This enables specific weapon proficiencies or
 * starting equipment provided by classes and backgrounds.
 * @enum {string}
 */
MKA.weaponIds = {
  battleaxe: "I0WocDSuNpGJayPb",
  blowgun: "wNWK6yJMHG9ANqQV",
  club: "nfIRTECQIG81CvM4",
  dagger: "0E565kQUBmndJ1a2",
  dart: "3rCO8MTIdPGSW6IJ",
  flail: "UrH3sMdnUDckIHJ6",
  glaive: "rOG1OM2ihgPjOvFW",
  greataxe: "1Lxk6kmoRhG8qQ0u",
  greatclub: "QRCsxkCwWNwswL9o",
  greatsword: "xMkP8BmFzElcsMaR",
  halberd: "DMejWAc8r8YvDPP1",
  handaxe: "eO7Fbv5WBk5zvGOc",
  handcrossbow: "qaSro7kFhxD6INbZ",
  heavycrossbow: "RmP0mYRn2J7K26rX",
  javelin: "DWLMnODrnHn8IbAG",
  lance: "RnuxdHUAIgxccVwj",
  lightcrossbow: "ddWvQRLmnnIS0eLF",
  lighthammer: "XVK6TOL4sGItssAE",
  longbow: "3cymOVja8jXbzrdT",
  longsword: "10ZP2Bu3vnCuYMIB",
  mace: "Ajyq6nGwF7FtLhDQ",
  maul: "DizirD7eqjh8n95A",
  morningstar: "dX8AxCh9o0A9CkT3",
  net: "aEiM49V8vWpWw7rU",
  pike: "tC0kcqZT9HHAO0PD",
  quarterstaff: "g2dWN7PQiMRYWzyk",
  rapier: "Tobce1hexTnDk4sV",
  scimitar: "fbC0Mg1a73wdFbqO",
  shortsword: "osLzOwQdPtrK3rQH",
  sickle: "i4NeNZ30ycwPDHMx",
  spear: "OG4nBBydvmfWYXIk",
  shortbow: "GJv6WkD7D2J6rP6M",
  sling: "3gynWO9sN4OLGMWD",
  trident: "F65ANO66ckP8FDMa",
  warpick: "2YdfjN1PIIrSHZii",
  warhammer: "F0Df164Xv1gWcYt0",
  whip: "QKTyxoO0YDnAsbYe"
};

/* -------------------------------------------- */

/**
 * The categories into which Tool items can be grouped.
 *
 * @enum {string}
 */
MKA.toolTypes = {
  art: "MKA.ToolArtisans",
  game: "MKA.ToolGamingSet",
  music: "MKA.ToolMusicalInstrument"
};
preLocalize("toolTypes", { sort: true });

/**
 * The categories of tool proficiencies that a character can gain.
 *
 * @enum {string}
 */
MKA.toolProficiencies = {
  ...MKA.toolTypes,
  vehicle: "MKA.ToolVehicle"
};
preLocalize("toolProficiencies", { sort: true });

/**
 * The basic tool types in MKA. This enables specific tool proficiencies or
 * starting equipment provided by classes and backgrounds.
 * @enum {string}
 */
MKA.toolIds = {
  alchemist: "SztwZhbhZeCqyAes",
  bagpipes: "yxHi57T5mmVt0oDr",
  brewer: "Y9S75go1hLMXUD48",
  calligrapher: "jhjo20QoiD5exf09",
  card: "YwlHI3BVJapz4a3E",
  carpenter: "8NS6MSOdXtUqD7Ib",
  cartographer: "fC0lFK8P4RuhpfaU",
  chess: "23y8FvWKf9YLcnBL",
  cobbler: "hM84pZnpCqKfi8XH",
  cook: "Gflnp29aEv5Lc1ZM",
  dice: "iBuTM09KD9IoM5L8",
  disg: "IBhDAr7WkhWPYLVn",
  drum: "69Dpr25pf4BjkHKb",
  dulcimer: "NtdDkjmpdIMiX7I2",
  flute: "eJOrPcAz9EcquyRQ",
  forg: "cG3m4YlHfbQlLEOx",
  glassblower: "rTbVrNcwApnuTz5E",
  herb: "i89okN7GFTWHsvPy",
  horn: "aa9KuBy4dst7WIW9",
  jeweler: "YfBwELTgPFHmQdHh",
  leatherworker: "PUMfwyVUbtyxgYbD",
  lute: "qBydtUUIkv520DT7",
  lyre: "EwG1EtmbgR3bM68U",
  mason: "skUih6tBvcBbORzA",
  navg: "YHCmjsiXxZ9UdUhU",
  painter: "ccm5xlWhx74d6lsK",
  panflute: "G5m5gYIx9VAUWC3J",
  pois: "il2GNi8C0DvGLL9P",
  potter: "hJS8yEVkqgJjwfWa",
  shawm: "G3cqbejJpfB91VhP",
  smith: "KndVe2insuctjIaj",
  thief: "woWZ1sO5IUVGzo58",
  tinker: "0d08g1i5WXnNrCNA",
  viol: "baoe3U5BfMMMxhCU",
  weaver: "ap9prThUB2y9lDyj",
  woodcarver: "xKErqkLo4ASYr5EP"
};

/* -------------------------------------------- */

/**
 * The various lengths of time over which effects can occur.
 * @enum {string}
 */
MKA.timePeriods = {
  inst: "MKA.TimeInst",
  turn: "MKA.TimeTurn",
  round: "MKA.TimeRound",
  minute: "MKA.TimeMinute",
  hour: "MKA.TimeHour",
  day: "MKA.TimeDay",
  month: "MKA.TimeMonth",
  year: "MKA.TimeYear",
  perm: "MKA.TimePerm",
  spec: "MKA.Special"
};
preLocalize("timePeriods");

/* -------------------------------------------- */

/**
 * Various ways in which an item or ability can be activated.
 * @enum {string}
 */
MKA.abilityActivationTypes = {
  none: "MKA.None",
  action: "MKA.Action",
  bonus: "MKA.BonusAction",
  reaction: "MKA.Reaction",
  minute: MKA.timePeriods.minute,
  hour: MKA.timePeriods.hour,
  day: MKA.timePeriods.day,
  special: MKA.timePeriods.spec,
  legendary: "MKA.LegendaryActionLabel",
  lair: "MKA.LairActionLabel",
  crew: "MKA.VehicleCrewAction"
};
preLocalize("abilityActivationTypes", { sort: true });

/* -------------------------------------------- */

/**
 * Different things that an ability can consume upon use.
 * @enum {string}
 */
MKA.abilityConsumptionTypes = {
  ammo: "MKA.ConsumeAmmunition",
  attribute: "MKA.ConsumeAttribute",
  hitDice: "MKA.ConsumeHitDice",
  material: "MKA.ConsumeMaterial",
  charges: "MKA.ConsumeCharges"
};
preLocalize("abilityConsumptionTypes", { sort: true });

/* -------------------------------------------- */

/**
 * Creature sizes.
 * @enum {string}
 */
MKA.actorSizes = {
  tiny: "MKA.SizeTiny",
  sm: "MKA.SizeSmall",
  med: "MKA.SizeMedium",
  lg: "MKA.SizeLarge",
  huge: "MKA.SizeHuge",
  grg: "MKA.SizeGargantuan"
};
preLocalize("actorSizes");

/**
 * Default token image size for the values of `MKA.actorSizes`.
 * @enum {number}
 */
MKA.tokenSizes = {
  tiny: 0.5,
  sm: 1,
  med: 1,
  lg: 2,
  huge: 3,
  grg: 4
};

/**
 * Colors used to visualize temporary and temporary maximum HP in token health bars.
 * @enum {number}
 */
MKA.tokenHPColors = {
  damage: 0xFF0000,
  healing: 0x00FF00,
  temp: 0x66CCFF,
  tempmax: 0x440066,
  negmax: 0x550000
};

/* -------------------------------------------- */

/**
 * Default types of creatures.
 * *Note: Not pre-localized to allow for easy fetching of pluralized forms.*
 * @enum {string}
 */
MKA.creatureTypes = {
  aberration: "MKA.CreatureAberration",
  beast: "MKA.CreatureBeast",
  celestial: "MKA.CreatureCelestial",
  construct: "MKA.CreatureConstruct",
  dragon: "MKA.CreatureDragon",
  elemental: "MKA.CreatureElemental",
  fey: "MKA.CreatureFey",
  fiend: "MKA.CreatureFiend",
  giant: "MKA.CreatureGiant",
  humanoid: "MKA.CreatureHumanoid",
  monstrosity: "MKA.CreatureMonstrosity",
  ooze: "MKA.CreatureOoze",
  plant: "MKA.CreaturePlant",
  undead: "MKA.CreatureUndead"
};

/* -------------------------------------------- */

/**
 * Classification types for item action types.
 * @enum {string}
 */
MKA.itemActionTypes = {
  mwak: "MKA.ActionMWAK",
  rwak: "MKA.ActionRWAK",
  msak: "MKA.ActionMSAK",
  rsak: "MKA.ActionRSAK",
  save: "MKA.ActionSave",
  heal: "MKA.ActionHeal",
  abil: "MKA.ActionAbil",
  util: "MKA.ActionUtil",
  other: "MKA.ActionOther"
};
preLocalize("itemActionTypes");

/* -------------------------------------------- */

/**
 * Different ways in which item capacity can be limited.
 * @enum {string}
 */
MKA.itemCapacityTypes = {
  items: "MKA.ItemContainerCapacityItems",
  weight: "MKA.ItemContainerCapacityWeight"
};
preLocalize("itemCapacityTypes", { sort: true });

/* -------------------------------------------- */

/**
 * List of various item rarities.
 * @enum {string}
 */
MKA.itemRarity = {
  soul: "MKA.ItemRaritySoul",
  r1: "MKA.ItemRarity1",
  r2: "MKA.ItemRarity2",
  r3: "MKA.ItemRarity3",
  r4: "MKA.ItemRarity4",
  r5: "MKA.ItemRarity5",
  r6: "MKA.ItemRarity6",
  r7: "MKA.ItemRarity7",
  r8: "MKA.ItemRarity8",
  r9: "MKA.ItemRarity9",
  r10: "MKA.ItemRarity10",
  cheap: "MKA.ItemRarityCheap",
  standard: "MKA.ItemRarityStandard",
  valuable: "MKA.ItemRarityValuable",
  luxurious: "MKA.ItemRarityLuxurious",
  common: "MKA.ItemRarityCommon",
  uncommon: "MKA.ItemRarityUncommon",
  rare: "MKA.ItemRarityRare",
  veryRare: "MKA.ItemRarityVeryRare",
  legendary: "MKA.ItemRarityLegendary",
  artifact: "MKA.ItemRarityArtifact"
};
preLocalize("itemRarity");

/* -------------------------------------------- */

/**
 * Enumerate the lengths of time over which an item can have limited use ability.
 * @enum {string}
 */
MKA.limitedUsePeriods = {
  sr: "MKA.ShortRest",
  lr: "MKA.LongRest",
  day: "MKA.Day",
  charges: "MKA.Charges"
};
preLocalize("limitedUsePeriods");

/* -------------------------------------------- */

/**
 * Specific equipment types that modify base AC.
 * @enum {string}
 */
MKA.armorTypes = {
  light: "MKA.EquipmentLight",
  medium: "MKA.EquipmentMedium",
  heavy: "MKA.EquipmentHeavy",
  natural: "MKA.EquipmentNatural",
  studentA: "MKA.EquipmentStudArm",
  elementalA: "MKA.EquipmentElemArm",
  shield: "MKA.EquipmentShield"
};
preLocalize("armorTypes");

/* -------------------------------------------- */

/**
 * Equipment types that aren't armor.
 * @enum {string}
 */
MKA.miscEquipmentTypes = {
  soul: "MKA.EquipmentSoul",
  clothing: "MKA.EquipmentClothing",
  trinket: "MKA.EquipmentTrinket",
  rune: "MKA.EquipmentRune",
  weave: "MKA.EquipmentWeave",
  vehicle: "MKA.EquipmentVehicle"
};
preLocalize("miscEquipmentTypes", { sort: true });

/* -------------------------------------------- */

/**
 * The set of equipment types for armor, clothing, and other objects which can be worn by the character.
 * @enum {string}
 */
MKA.equipmentTypes = {
  ...MKA.miscEquipmentTypes,
  ...MKA.armorTypes
};
preLocalize("equipmentTypes", { sort: true });

/* -------------------------------------------- */

/**
 * The various types of vehicles in which characters can be proficient.
 * @enum {string}
 */
MKA.vehicleTypes = {
  air: "MKA.VehicleTypeAir",
  land: "MKA.VehicleTypeLand",
  space: "MKA.VehicleTypeSpace",
  water: "MKA.VehicleTypeWater"
};
preLocalize("vehicleTypes", { sort: true });

/* -------------------------------------------- */

/**
 * The set of Armor Proficiencies which a character may have.
 * @type {object}
 */
MKA.armorProficiencies = {
  lgt: MKA.equipmentTypes.light,
  med: MKA.equipmentTypes.medium,
  hvy: MKA.equipmentTypes.heavy,
  shl: "MKA.EquipmentShieldProficiency"
};
preLocalize("armorProficiencies");

/**
 * A mapping between `MKA.equipmentTypes` and `MKA.armorProficiencies` that
 * is used to determine if character has proficiency when adding an item.
 * @enum {(boolean|string)}
 */
MKA.armorProficienciesMap = {
  natural: true,
  clothing: true,
  light: "lgt",
  medium: "med",
  heavy: "hvy",
  shield: "shl"
};

/**
 * The basic armor types in MKA. This enables specific armor proficiencies,
 * automated AC calculation in NPCs, and starting equipment.
 * @enum {string}
 */
MKA.armorIds = {
  breastplate: "SK2HATQ4abKUlV8i",
  chainmail: "rLMflzmxpe8JGTOA",
  chainshirt: "p2zChy24ZJdVqMSH",
  halfplate: "vsgmACFYINloIdPm",
  hide: "n1V07puo0RQxPGuF",
  leather: "WwdpHLXGX5r8uZu5",
  padded: "GtKV1b5uqFQqpEni",
  plate: "OjkIqlW2UpgFcjZa",
  ringmail: "nsXZejlmkalj4he9",
  scalemail: "XmnlF5fgIO3tg6TG",
  splint: "cKpJmsJmU8YaiuqG",
  studded: "TIV3B1vbrVHIhQAm"
};

/**
 * The basic shield in MKA.
 * @enum {string}
 */
MKA.shieldIds = {
  shield: "sSs3hSzkKBMNBgTs"
};

/**
 * Common armor class calculations.
 * @enum {{ label: string, [formula]: string }}
 */
MKA.armorClasses = {
  flat: {
    label: "MKA.ArmorClassFlat",
    formula: "@attributes.ac.flat"
  },
  studentArmor: {
    label: "MKA.ArmorClassStudentArmor",
    formula: "10 + @abilities.dex.mod + @abilities.con.mod"
  },
  natural: {
    label: "MKA.ArmorClassNatural",
    formula: "@attributes.ac.flat"
  },
  default: {
    label: "MKA.ArmorClassEquipment",
    formula: "@attributes.ac.armor + @attributes.ac.dex"
  },
  mage: {
    label: "MKA.ArmorClassMage",
    formula: "13 + @abilities.dex.mod"
  },
  draconic: {
    label: "MKA.ArmorClassDraconic",
    formula: "13 + @abilities.dex.mod"
  },
  unarmoredMonk: {
    label: "MKA.ArmorClassUnarmoredMonk",
    formula: "10 + @abilities.dex.mod + @abilities.wis.mod"
  },
  unarmoredBarb: {
    label: "MKA.ArmorClassUnarmoredBarbarian",
    formula: "10 + @abilities.dex.mod + @abilities.con.mod"
  },
  custom: {
    label: "MKA.ArmorClassCustom"
  }
};
preLocalize("armorClasses", { key: "label" });

/* -------------------------------------------- */

/**
 * Enumerate the valid consumable types which are recognized by the system.
 * @enum {string}
 */
MKA.consumableTypes = {
  ammo: "MKA.ConsumableAmmunition",
  potion: "MKA.ConsumablePotion",
  shard: "MKA.ConsumableShard",
  poison: "MKA.ConsumablePoison",
  food: "MKA.ConsumableFood",
  scroll: "MKA.ConsumableScroll",
  wand: "MKA.ConsumableWand",
  rod: "MKA.ConsumableRod",
  trinket: "MKA.ConsumableTrinket"
};
preLocalize("consumableTypes", { sort: true });

/* -------------------------------------------- */

/**
 * The valid currency denominations with localized labels, abbreviations, and conversions.
 * @enum {{
 *   label: string,
 *   abbreviation: string,
 *   [conversion]: {into: string, each: number}
 * }}
 */
MKA.currencies = {
  gg: {
    label: "MKA.CurrencyGG",
    abbreviation: "MKA.CurrencyAbbrGG"
  },
  bt: {
    label: "MKA.CurrencyBT",
    abbreviation: "MKA.CurrencyAbbrBT"
  }
};
preLocalize("currencies", { keys: ["label", "abbreviation"] });

/* -------------------------------------------- */

/**
 * Types of damage the can be caused by abilities.
 * @enum {string}
 */
MKA.damageTypes = {
  acid: "MKA.DamageAcid",
  bludgeoning: "MKA.DamageBludgeoning",
  cold: "MKA.DamageCold",
  fire: "MKA.DamageFire",
  force: "MKA.DamageForce",
  lightning: "MKA.DamageLightning",
  necrotic: "MKA.DamageNecrotic",
  piercing: "MKA.DamagePiercing",
  poison: "MKA.DamagePoison",
  psychic: "MKA.DamagePsychic",
  radiant: "MKA.DamageRadiant",
  slashing: "MKA.DamageSlashing",
  thunder: "MKA.DamageThunder"
};
preLocalize("damageTypes", { sort: true });

/**
 * Types of damage to which an actor can possess resistance, immunity, or vulnerability.
 * @enum {string}
 */
MKA.damageResistanceTypes = {
  ...MKA.damageTypes,
  physical: "MKA.DamagePhysical"
};
preLocalize("damageResistanceTypes", { sort: true });

/* -------------------------------------------- */

/**
 * The valid units of measure for movement distances in the game system.
 * By default this uses the imperial units of feet and miles.
 * @enum {string}
 */
MKA.movementTypes = {
  burrow: "MKA.MovementBurrow",
  climb: "MKA.MovementClimb",
  fly: "MKA.MovementFly",
  swim: "MKA.MovementSwim",
  walk: "MKA.MovementWalk"
};
preLocalize("movementTypes", { sort: true });

/**
 * The valid units of measure for movement distances in the game system.
 * By default this uses the imperial units of feet and miles.
 * @enum {string}
 */
MKA.movementUnits = {
  ft: "MKA.DistFt",
  mi: "MKA.DistMi",
  m: "MKA.DistM",
  km: "MKA.DistKm"
};
preLocalize("movementUnits");

/**
 * The valid units of measure for the range of an action or effect.
 * This object automatically includes the movement units from `MKA.movementUnits`.
 * @enum {string}
 */
MKA.distanceUnits = {
  none: "MKA.None",
  self: "MKA.DistSelf",
  touch: "MKA.DistTouch",
  spec: "MKA.Special",
  any: "MKA.DistAny",
  ...MKA.movementUnits
};
preLocalize("distanceUnits");

/* -------------------------------------------- */

/**
 * Configure aspects of encumbrance calculation so that it could be configured by modules.
 * @enum {{ imperial: number, metric: number }}
 */
MKA.encumbrance = {
  currencyPerWeight: {
    imperial: 50,
    metric: 110
  },
  strMultiplier: {
    imperial: 15,
    metric: 6.8
  },
  vehicleWeightMultiplier: {
    imperial: 2000, // 2000 lbs in an imperial ton
    metric: 1000 // 1000 kg in a metric ton
  }
};

/* -------------------------------------------- */

/**
 * The types of single or area targets which can be applied to abilities.
 * @enum {string}
 */
MKA.targetTypes = {
  none: "MKA.None",
  self: "MKA.TargetSelf",
  creature: "MKA.TargetCreature",
  ally: "MKA.TargetAlly",
  enemy: "MKA.TargetEnemy",
  object: "MKA.TargetObject",
  space: "MKA.TargetSpace",
  radius: "MKA.TargetRadius",
  sphere: "MKA.TargetSphere",
  cylinder: "MKA.TargetCylinder",
  cone: "MKA.TargetCone",
  square: "MKA.TargetSquare",
  cube: "MKA.TargetCube",
  line: "MKA.TargetLine",
  wall: "MKA.TargetWall"
};
preLocalize("targetTypes", { sort: true });

/* -------------------------------------------- */

/**
 * Mapping between `MKA.targetTypes` and `MeasuredTemplate` shape types to define
 * which templates are produced by which area of effect target type.
 * @enum {string}
 */
MKA.areaTargetTypes = {
  cone: "cone",
  cube: "rect",
  cylinder: "circle",
  line: "ray",
  radius: "circle",
  sphere: "circle",
  square: "rect",
  wall: "ray"
};

/* -------------------------------------------- */

/**
 * Different types of healing that can be applied using abilities.
 * @enum {string}
 */
MKA.healingTypes = {
  healing: "MKA.Healing",
  temphp: "MKA.HealingTemp"
};
preLocalize("healingTypes");

/* -------------------------------------------- */

/**
 * Denominations of hit dice which can apply to classes.
 * @type {string[]}
 */
MKA.hitDieTypes = ["d6", "d8", "d10", "d12"];

/* -------------------------------------------- */

/**
 * The set of possible sensory perception types which an Actor may have.
 * @enum {string}
 */
MKA.senses = {
  blindsight: "MKA.SenseBlindsight",
  darkvision: "MKA.SenseDarkvision",
  tremorsense: "MKA.SenseTremorsense",
  truesight: "MKA.SenseTruesight"
};
preLocalize("senses", { sort: true });

/* -------------------------------------------- */

/**
 * Various different ways a spell can be prepared.
 */
MKA.spellPreparationModes = {
  prepared: "MKA.SpellPrepPrepared",
  pact: "MKA.PactMagic",
  always: "MKA.SpellPrepAlways",
  atwill: "MKA.SpellPrepAtWill",
  innate: "MKA.SpellPrepInnate"
};
preLocalize("spellPreparationModes");

/**
 * Subset of `MKA.spellPreparationModes` that consume spell slots.
 * @type {boolean[]}
 */
MKA.spellUpcastModes = ["always", "pact", "prepared"];

/**
 * Ways in which a class can contribute to spellcasting levels.
 * @enum {string}
 */
MKA.spellProgression = {
  none: "MKA.SpellNone",
  full: "MKA.SpellProgFull",
  half: "MKA.SpellProgHalf",
  third: "MKA.SpellProgThird",
  pact: "MKA.SpellProgPact",
  artificer: "MKA.SpellProgArt"
};
preLocalize("spellProgression");

/* -------------------------------------------- */

/**
 * The available choices for how spell damage scaling may be computed.
 * @enum {string}
 */
MKA.spellScalingModes = {
  none: "MKA.SpellNone",
  cantrip: "MKA.SpellCantrip",
  level: "MKA.SpellLevel"
};
preLocalize("spellScalingModes", { sort: true });

/* -------------------------------------------- */

/**
 * The set of types which a weapon item can take.
 * @enum {string}
 */
MKA.weaponTypes = {
  simpleM: "MKA.WeaponSimpleM",
  simpleR: "MKA.WeaponSimpleR",
  soulM: "MKA.WeaponSoulM",
  soulR: "MKA.WeaponSoulR",
  soulI: "MKA.WeaponSoulI",
  natural: "MKA.WeaponNatural",
  improv: "MKA.WeaponImprov"
};
preLocalize("weaponTypes");

/* -------------------------------------------- */

/**
 * The set of weapon property flags which can exist on a weapon.
 * @enum {string}
 */
MKA.weaponProperties = {
  not: "MKA.WeaponPropertiesNot",
  acc: "MKA.WeaponPropertiesAcc",
  cou: "MKA.WeaponPropertiesCou",
  dis: "MKA.WeaponPropertiesDis",
  ens: "MKA.WeaponPropertiesEns",
  fin: "MKA.WeaponPropertiesFin",
  mas: "MKA.WeaponPropertiesMas",
  stg: "MKA.WeaponPropertiesStg",
  vlp: "MKA.WeaponPropertiesVlp",
  vcu: "MKA.WeaponPropertiesVcu",
  two: "MKA.WeaponPropertiesTwo",
  crd: "MKA.WeaponPropertiesCrd",
  emb: "MKA.WeaponPropertiesEmb",
  foc: "MKA.WeaponPropertiesFoc",
  lgt: "MKA.WeaponPropertiesLgt",
  con: "MKA.WeaponPropertiesCon",
  rad: "MKA.WeaponPropertiesRad",
  wrd: "MKA.WeaponPropertiesWrd",
  fir: "MKA.WeaponPropertiesFir",
  aki: "MKA.WeaponPropertiesAki",
  mus: "MKA.WeaponPropertiesMus",
  mob: "MKA.WeaponPropertiesMob",
  hil: "MKA.WeaponPropertiesHil",
  sgt: "MKA.WeaponPropertiesSgt",
  spr: "MKA.WeaponPropertiesSpr",
  blk: "MKA.WeaponPropertiesBlk",
  rec: "MKA.WeaponPropertiesRec",
  qrl: "MKA.WeaponPropertiesQrl",
  col: "MKA.WeaponPropertiesCol"
};
preLocalize("weaponProperties", { sort: true });

/**
 * Types of components that can be required when casting a spell.
 * @enum {object}
 */
MKA.spellComponents = {
  vocal: {
    label: "MKA.ComponentVerbal",
    abbr: "MKA.ComponentVerbalAbbr"
  },
  somatic: {
    label: "MKA.ComponentSomatic",
    abbr: "MKA.ComponentSomaticAbbr"
  },
  material: {
    label: "MKA.ComponentMaterial",
    abbr: "MKA.ComponentMaterialAbbr"
  }
};
preLocalize("spellComponents", {keys: ["label", "abbr"]});

/**
 * Supplementary rules keywords that inform a spell's use.
 * @enum {object}
 */
MKA.spellTags = {
  concentration: {
    label: "MKA.Concentration",
    abbr: "MKA.ConcentrationAbbr"
  },
  ritual: {
    label: "MKA.Ritual",
    abbr: "MKA.RitualAbbr"
  }
};
preLocalize("spellTags", {keys: ["label", "abbr"]});

/**
 * MK Edit: Spell paths.
 * @enum {string}
 */
MKA.spellPaths = {
  bem: "MKA.PathBeam",
  exp: "MKA.PathExplosion",
  cur: "MKA.PathCuring",
  res: "MKA.PathRestoration",
  amp: "MKA.PathAmplify",
  man: "MKA.PathManipulate",
  bar: "MKA.PathBarrier",
  trs: "MKA.PathTransformation",
  sum: "MKA.PathSummoning",
  csm: "MKA.PathCompanionSummoning",
  div: "MKA.PathDivination",
  chr: "MKA.PathChronomancy"
};
preLocalize("spellPaths", { sort: true });

/**
 * Valid spell levels.
 * @enum {string}
 */
MKA.spellLevels = {
  0: "MKA.SpellLevel0",
  1: "MKA.SpellLevel1",
  2: "MKA.SpellLevel2",
  3: "MKA.SpellLevel3",
  4: "MKA.SpellLevel4",
  5: "MKA.SpellLevel5",
  6: "MKA.SpellLevel6",
  7: "MKA.SpellLevel7",
  8: "MKA.SpellLevel8",
  9: "MKA.SpellLevel9"
};
preLocalize("spellLevels");

/**
 * Spell scroll item ID within the `MKA.sourcePacks` compendium for each level.
 * @enum {string}
 */
MKA.spellScrollIds = {
  0: "rQ6sO7HDWzqMhSI3",
  1: "9GSfMg0VOA2b4uFN",
  2: "XdDp6CKh9qEvPTuS",
  3: "hqVKZie7x9w3Kqds",
  4: "DM7hzgL836ZyUFB1",
  5: "wa1VF8TXHmkrrR35",
  6: "tI3rWx4bxefNCexS",
  7: "mtyw4NS1s7j2EJaD",
  8: "aOrinPg7yuDZEuWr",
  9: "O4YbkJkLlnsgUszZ"
};

/**
 * Compendium packs used for localized items.
 * @enum {string}
 */
MKA.sourcePacks = {
  ITEMS: "mka.items"
};

/**
 * Define the standard slot progression by character level.
 * The entries of this array represent the spell slot progression for a full spell-caster.
 * @type {number[][]}
 */
MKA.SPELL_SLOT_TABLE = [
  [2],
  [3],
  [4, 2],
  [4, 3],
  [4, 3, 2],
  [4, 3, 3],
  [4, 3, 3, 1],
  [4, 3, 3, 2],
  [4, 3, 3, 3, 1],
  [4, 3, 3, 3, 2],
  [4, 3, 3, 3, 2, 1],
  [4, 3, 3, 3, 2, 1],
  [4, 3, 3, 3, 2, 1, 1],
  [4, 3, 3, 3, 2, 1, 1],
  [4, 3, 3, 3, 2, 1, 1, 1],
  [4, 3, 3, 3, 2, 1, 1, 1],
  [4, 3, 3, 3, 2, 1, 1, 1, 1],
  [4, 3, 3, 3, 3, 1, 1, 1, 1],
  [4, 3, 3, 3, 3, 2, 1, 1, 1],
  [4, 3, 3, 3, 3, 2, 2, 1, 1]
];

/* -------------------------------------------- */

/**
 * Settings to configure how actors are merged when polymorphing is applied.
 * @enum {string}
 */
MKA.polymorphSettings = {
  keepPhysical: "MKA.PolymorphKeepPhysical",
  keepMental: "MKA.PolymorphKeepMental",
  keepSaves: "MKA.PolymorphKeepSaves",
  keepSkills: "MKA.PolymorphKeepSkills",
  mergeSaves: "MKA.PolymorphMergeSaves",
  mergeSkills: "MKA.PolymorphMergeSkills",
  keepClass: "MKA.PolymorphKeepClass",
  keepFeats: "MKA.PolymorphKeepFeats",
  keepSpells: "MKA.PolymorphKeepSpells",
  keepItems: "MKA.PolymorphKeepItems",
  keepBio: "MKA.PolymorphKeepBio",
  keepVision: "MKA.PolymorphKeepVision"
};
preLocalize("polymorphSettings", { sort: true });

/* -------------------------------------------- */

/**
 * Skill, ability, and tool proficiency levels.
 * The key for each level represents its proficiency multiplier.
 * @enum {string}
 */
MKA.proficiencyLevels = {
  0: "MKA.NotProficient",
  1: "MKA.Proficient",
  0.5: "MKA.HalfProficient",
  2: "MKA.Expertise"
};
preLocalize("proficiencyLevels");

/* -------------------------------------------- */

/**
 * The amount of cover provided by an object. In cases where multiple pieces
 * of cover are in play, we take the highest value.
 * @enum {string}
 */
MKA.cover = {
  0: "MKA.None",
  .5: "MKA.CoverHalf",
  .75: "MKA.CoverThreeQuarters",
  1: "MKA.CoverTotal"
};
preLocalize("cover");

/* -------------------------------------------- */

/**
 * A selection of actor attributes that can be tracked on token resource bars.
 * @type {string[]}
 */
MKA.trackableAttributes = [
  "attributes.ac.value", "attributes.init.value", "attributes.movement", "attributes.senses", "attributes.spelldc",
  "attributes.spellLevel", "details.cr", "details.spellLevel", "details.xp.value", "skills.*.passive",
  "abilities.*.value"
];

/* -------------------------------------------- */

/**
 * A selection of actor and item attributes that are valid targets for item resource consumption.
 * @type {string[]}
 */
MKA.consumableResources = [
  "item.quantity", "item.weight", "item.duration.value", "currency", "details.xp.value", "abilities.*.value",
  "attributes.senses", "attributes.movement", "attributes.ac.flat", "item.armor.value", "item.target", "item.range",
  "item.save.dc"
];

/* -------------------------------------------- */

/**
 * Conditions that can effect an actor.
 * @enum {string}
 */
MKA.conditionTypes = {
  blinded: "MKA.ConBlinded",
  charmed: "MKA.ConCharmed",
  deafened: "MKA.ConDeafened",
  diseased: "MKA.ConDiseased",
  exhaustion: "MKA.ConExhaustion",
  frightened: "MKA.ConFrightened",
  grappled: "MKA.ConGrappled",
  incapacitated: "MKA.ConIncapacitated",
  invisible: "MKA.ConInvisible",
  paralyzed: "MKA.ConParalyzed",
  petrified: "MKA.ConPetrified",
  poisoned: "MKA.ConPoisoned",
  prone: "MKA.ConProne",
  restrained: "MKA.ConRestrained",
  stunned: "MKA.ConStunned",
  unconscious: "MKA.ConUnconscious"
};
preLocalize("conditionTypes", { sort: true });

/**
 * Languages a character can learn.
 * @enum {string}
 */
MKA.languages = {
  common: "MKA.LanguagesCommon",
  aarakocra: "MKA.LanguagesAarakocra",
  abyssal: "MKA.LanguagesAbyssal",
  aquan: "MKA.LanguagesAquan",
  auran: "MKA.LanguagesAuran",
  celestial: "MKA.LanguagesCelestial",
  deep: "MKA.LanguagesDeepSpeech",
  draconic: "MKA.LanguagesDraconic",
  druidic: "MKA.LanguagesDruidic",
  dwarvish: "MKA.LanguagesDwarvish",
  elvish: "MKA.LanguagesElvish",
  giant: "MKA.LanguagesGiant",
  gith: "MKA.LanguagesGith",
  gnomish: "MKA.LanguagesGnomish",
  goblin: "MKA.LanguagesGoblin",
  gnoll: "MKA.LanguagesGnoll",
  halfling: "MKA.LanguagesHalfling",
  ignan: "MKA.LanguagesIgnan",
  infernal: "MKA.LanguagesInfernal",
  orc: "MKA.LanguagesOrc",
  primordial: "MKA.LanguagesPrimordial",
  sylvan: "MKA.LanguagesSylvan",
  terran: "MKA.LanguagesTerran",
  cant: "MKA.LanguagesThievesCant",
  undercommon: "MKA.LanguagesUndercommon"
};
preLocalize("languages", { sort: true });

/**
 * Maximum allowed character level.
 * @type {number}
 */
MKA.maxLevel = 20;

/**
 * XP required to achieve each character level.
 * @type {number[]}
 */
MKA.CHARACTER_EXP_LEVELS = [
  0, 300, 900, 2700, 6500, 14000, 23000, 34000, 48000, 64000, 85000, 100000,
  120000, 140000, 165000, 195000, 225000, 265000, 305000, 355000
];

/**
 * XP granted for each challenge rating.
 * @type {number[]}
 */
MKA.CR_EXP_LEVELS = [
  10, 200, 450, 700, 1100, 1800, 2300, 2900, 3900, 5000, 5900, 7200, 8400, 10000, 11500, 13000, 15000, 18000,
  20000, 22000, 25000, 33000, 41000, 50000, 62000, 75000, 90000, 105000, 120000, 135000, 155000
];

/**
 * Character features automatically granted by classes & subclasses at certain levels.
 * @type {object}
 * @deprecated since 1.6.0, targeted for removal in 2.1
 */
MKA.classFeatures = ClassFeatures;

/**
 * Special character flags.
 * @enum {{
 *   name: string,
 *   hint: string,
 *   [abilities]: string[],
 *   [choices]: object<string, string>,
 *   [skills]: string[],
 *   section: string,
 *   type: any,
 *   placeholder: any
 * }}
 */
MKA.characterFlags = {
  diamondSoul: {
    name: "MKA.FlagsDiamondSoul",
    hint: "MKA.FlagsDiamondSoulHint",
    section: "MKA.Feats",
    type: Boolean
  },
  elvenAccuracy: {
    name: "MKA.FlagsElvenAccuracy",
    hint: "MKA.FlagsElvenAccuracyHint",
    section: "MKA.RacialTraits",
    abilities: ["dex", "int", "wis", "cha"],
    type: Boolean
  },
  halflingLucky: {
    name: "MKA.FlagsHalflingLucky",
    hint: "MKA.FlagsHalflingLuckyHint",
    section: "MKA.RacialTraits",
    type: Boolean
  },
  initiativeAdv: {
    name: "MKA.FlagsInitiativeAdv",
    hint: "MKA.FlagsInitiativeAdvHint",
    section: "MKA.Feats",
    type: Boolean
  },
  initiativeAlert: {
    name: "MKA.FlagsAlert",
    hint: "MKA.FlagsAlertHint",
    section: "MKA.Feats",
    type: Boolean
  },
  jackOfAllTrades: {
    name: "MKA.FlagsJOAT",
    hint: "MKA.FlagsJOATHint",
    section: "MKA.Feats",
    type: Boolean
  },
  observantFeat: {
    name: "MKA.FlagsObservant",
    hint: "MKA.FlagsObservantHint",
    skills: ["prc", "inv"],
    section: "MKA.Feats",
    type: Boolean
  },
  powerfulBuild: {
    name: "MKA.FlagsPowerfulBuild",
    hint: "MKA.FlagsPowerfulBuildHint",
    section: "MKA.RacialTraits",
    type: Boolean
  },
  reliableTalent: {
    name: "MKA.FlagsReliableTalent",
    hint: "MKA.FlagsReliableTalentHint",
    section: "MKA.Feats",
    type: Boolean
  },
  remarkableAthlete: {
    name: "MKA.FlagsRemarkableAthlete",
    hint: "MKA.FlagsRemarkableAthleteHint",
    abilities: ["str", "dex", "con"],
    section: "MKA.Feats",
    type: Boolean
  },
  weaponCriticalThreshold: {
    name: "MKA.FlagsWeaponCritThreshold",
    hint: "MKA.FlagsWeaponCritThresholdHint",
    section: "MKA.Feats",
    type: Number,
    placeholder: 20
  },
  spellCriticalThreshold: {
    name: "MKA.FlagsSpellCritThreshold",
    hint: "MKA.FlagsSpellCritThresholdHint",
    section: "MKA.Feats",
    type: Number,
    placeholder: 20
  },
  meleeCriticalDamageDice: {
    name: "MKA.FlagsMeleeCriticalDice",
    hint: "MKA.FlagsMeleeCriticalDiceHint",
    section: "MKA.Feats",
    type: Number,
    placeholder: 0
  }
};
preLocalize("characterFlags", { keys: ["name", "hint", "section"] });

/**
 * Flags allowed on actors. Any flags not in the list may be deleted during a migration.
 * @type {string[]}
 */
MKA.allowedActorFlags = ["isPolymorphed", "originalActor"].concat(Object.keys(MKA.characterFlags));

/* -------------------------------------------- */

/**
 * Patch an existing config enum to allow conversion from string values to object values without
 * breaking existing modules that are expecting strings.
 * @param {string} key          Key within MKA that has been replaced with an enum of objects.
 * @param {string} fallbackKey  Key within the new config object from which to get the fallback value.
 * @param {object} [options]    Additional options passed through to logCompatibilityWarning.
 */
function patchConfig(key, fallbackKey, options) {
  /** @override */
  function toString() {
    const message = `The value of CONFIG.MKA.${key} has been changed to an object.`
      +` The former value can be acccessed from .${fallbackKey}.`;
    foundry.utils.logCompatibilityWarning(message, options);
    return this[fallbackKey];
  }

  Object.values(MKA[key]).forEach(o => o.toString = toString);
}

/* -------------------------------------------- */

export default MKA;
