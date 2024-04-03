const allMetrics = {
  skills: {
    overall: {
      metric: 'overall',
    },
    attack: {
      metric: 'attack',
    },
    defence: {
      metric: 'defence',
    },
    strength: {
      metric: 'strength',
    },
    hitpoints: {
      metric: 'hitpoints',
    },
    ranged: {
      metric: 'ranged',
    },
    prayer: {
      metric: 'prayer',
    },
    magic: {
      metric: 'magic',
    },
    cooking: {
      metric: 'cooking',
    },
    woodcutting: {
      metric: 'woodcutting',
    },
    fletching: {
      metric: 'fletching',
    },
    fishing: {
      metric: 'fishing',
    },
    firemaking: {
      metric: 'firemaking',
    },
    crafting: {
      metric: 'crafting',
    },
    smithing: {
      metric: 'smithing',
    },
    mining: {
      metric: 'mining',
    },
    herblore: {
      metric: 'herblore',
    },
    agility: {
      metric: 'agility',
    },
    thieving: {
      metric: 'thieving',
    },
    slayer: {
      metric: 'slayer',
    },
    farming: {
      metric: 'farming',
    },
    runecrafting: {
      metric: 'runecrafting',
      link: 'https://oldschool.runescape.wiki/images/Runecraft_icon.png?c278c'
    },
    hunter: {
      metric: 'hunter',
    },
    construction: {
      metric: 'construction',
    }
  },
  bosses: {
    abyssal_sire: {
      metric: 'abyssal_sire',
      link: 'https://oldschool.runescape.wiki/images/Abyssal_Sire_%28phase_1%29.png?0db8f'
    },
    alchemical_hydra: {
      metric: 'alchemical_hydra',
      link: 'https://oldschool.runescape.wiki/images/Alchemical_Hydra_%28serpentine%29.png?925dd'
    },    
    artio: { 
    metric: 'artio',
    },
    barrows_chests: {
      metric: 'barrows_chests',
      link: 'https://oldschool.runescape.wiki/images/Chest_%28Barrows%29.png?e2ddc'
    },
    bryophyta: {
      metric: 'bryophyta',
    },
    callisto: {
      metric: 'callisto',
    },    
    calvarion: {
      metric: 'calvarion',
      link: 'https://oldschool.runescape.wiki/images/Calvar%27ion.png?e2ddc'
    },
    cerberus: {
      metric: 'cerberus',
    },
    chambers_of_xeric: {
      metric: 'chambers_of_xeric',
      link: 'https://oldschool.runescape.wiki/images/Great_Olm.png?e2ddc'
    },    
    chambers_of_xeric_challenge_mode: {
      metric: 'chambers_of_xeric_challenge_mode',
      link: 'https://oldschool.runescape.wiki/images/Great_Olm.png?e2ddc'
    },
    chaos_elemental: {
      metric: 'chaos_elemental',
    },
    chaos_fanatic: {
      metric: 'chaos_fanatic',
    },    
    commander_zilyana: {
      metric: 'commander_zilyana',
    },
    corporeal_beast: {
      metric: 'corporeal_beast',
    },
    crazy_archaeologist: {
      metric: 'crazy_archaeologist',
    },    
    dagannoth_prime: {
      metric: 'dagannoth_prime',
    },
    dagannoth_rex: {
      metric: 'dagannoth_rex',
    },
    dagannoth_supreme: {
      metric: 'dagannoth_supreme',
    },    
    deranged_archaeologist: {
      metric: 'deranged_archaeologist',
    },
    duke_sucellus: {
      metric: 'duke_sucellus',
    },
    general_graardor: {
      metric: 'general_graardor',
    },    
    giant_mole: {
      metric: 'giant_mole',
      link: 'https://oldschool.runescape.wiki/images/Giant_Mole.png?3f58a'
    },
    grotesque_guardians: {
      metric: 'grotesque_guardians',
      link: 'https://oldschool.runescape.wiki/images/Dusk_%282nd_form%29.png?e2ddc'
    },
    hespori: {
      metric: 'hespori',
    },    
    kalphite_queen: {
      metric: 'kalphite_queen',
    },
    king_black_dragon: {
      metric: 'king_black_dragon',
    },
    kraken: {
      metric: 'kraken',
    },    
    kreearra: {
      metric: 'kreearra',
    },
    kril_tsutsaroth: {
      metric: 'kril_tsutsaroth',
    },
    mimic: { 
      metric: 'mimic',
      link: 'https://oldschool.runescape.wiki/images/The_Mimic.png?e2ddc'
    },
    nex: { 
      metric: 'nex',
    },
    nightmare: {
      metric: 'nightmare',
      link: 'https://oldschool.runescape.wiki/images/The_Nightmare.png?e2ddc'
    },
    phosanis_nightmare: {
      metric: 'phosanis_nightmare',
      link: 'https://oldschool.runescape.wiki/images/The_Nightmare.png?e2ddc'
    },    
    obor: { 
      metric: 'obor',
    },
    phantom_muspah: {
      metric: 'phantom_muspah',
      link: 'https://oldschool.runescape.wiki/images/Phantom_Muspah_%28ranged%29.png?e2ddc'
    },
    sarachnis: {      
      metric: 'sarachnis',
    },
    scorpia: {
      metric: 'scorpia',
    },
    scurrius: {
      metric: 'scurrius',
    },
    skotizo: {      
      metric: 'skotizo',
    },
    spindel: {
      metric: 'spindel',
    },
    tempoross: {
      metric: 'tempoross',
    },
    the_gauntlet: {      
      metric: 'the_gauntlet',
      link: 'https://oldschool.runescape.wiki/images/Crystalline_Hunllef.png?e2ddc'
    },
    the_corrupted_gauntlet: {
      metric: 'the_corrupted_gauntlet',
      link: 'https://oldschool.runescape.wiki/images/Corrupted_Hunllef.png?e2ddc'
    },
    the_leviathan: {
      metric: 'the_leviathan',
    },
    the_whisperer: {      
      metric: 'the_whisperer',
    },
    theatre_of_blood: {
      metric: 'theatre_of_blood',
      link: 'https://oldschool.runescape.wiki/images/Verzik_Vitur.png?e2ddc'
    },
    theatre_of_blood_hard_mode: {      
      metric: 'theatre_of_blood_hard_mode',
      link: 'https://oldschool.runescape.wiki/images/Verzik_Vitur.png?e2ddc'
    },
    thermonuclear_smoke_devil: {
      metric: 'thermonuclear_smoke_devil',
    },
    tombs_of_amascut: {
      metric: 'tombs_of_amascut',
      link: 'https://oldschool.runescape.wiki/images/Tumeken%27s_Warden_%28level-489%29.png?e2ddc'
    },
    tombs_of_amascut_expert: {
      metric: 'tombs_of_amascut_expert',
      link: 'https://oldschool.runescape.wiki/images/Tumeken%27s_Warden_%28level-544%29.png?e2ddc'
    },
    tzkal_zuk: {
      metric: 'tzkal_zuk',
      link: 'https://oldschool.runescape.wiki/images/TzKal-Zuk.png?e2ddc'
    },    
    tztok_jad: {
      metric: 'tztok_jad',
      link: 'https://oldschool.runescape.wiki/images/TzTok-Jad.png?e2ddc'
    },
    vardorvis: {
      metric: 'vardorvis',
    },
    venenatis: {
      metric: 'venenatis',
    },    
    vetion: {
      metric: 'vetion',
    },
    vorkath: {
      metric: 'vorkath',
    },
    wintertodt: {
      metric: 'wintertodt',
      link: 'https://oldschool.runescape.wiki/images/Doors_of_Dinh.png?e2ddc'
    },    
    zalcano: {
      metric: 'zalcano',
    },
    zulrah: {
      metric: 'zulrah',
    }
  },
  activities: {
    league_points: { 
      metric: 'league_points',
    },
    bounty_hunter_hunter: { 
      metric: 'bounty_hunter_hunter',
    },    
    bounty_hunter_rogue: { 
      metric: 'bounty_hunter_rogue',
    },
    clue_scrolls_all: { 
      metric: 'clue_scrolls_all',
    },
    clue_scrolls_beginner: {
      metric: 'clue_scrolls_beginner',  
    },
    clue_scrolls_easy: { 
      metric: 'clue_scrolls_easy',
    },
    clue_scrolls_medium: { 
      metric: 'clue_scrolls_medium',
    },
    clue_scrolls_hard: { 
      metric: 'clue_scrolls_hard',
    },
    clue_scrolls_elite: { 
      metric: 'clue_scrolls_elite',
    },
    clue_scrolls_master: { 
      metric: 'clue_scrolls_master',
    },    
    last_man_standing: { 
      metric: 'last_man_standing',
    },
    pvp_arena: { 
      metric: 'pvp_arena',
    },
  soul_wars_zeal: { 
    metric: 'soul_wars_zeal',
  },
    guardians_of_the_rift: {
      metric: 'guardians_of_the_rift',
    }
  },
  computed: {
    ehp: { 
      metric: 'ehp', 
    },
    ehb: { 
      metric: 'ehb', 
    }  
  }
}

export default allMetrics