/**
 * SOLO LEVELING — RANDOM CARD DRAFT & BATTLE ENGINE (STRICT PERMANENT DRAFT EDITION)
 * Rules:
 * - Strict No-Repetition: Once drawn, a card is permanently drafted or discarded.
 * - NO REPLACEMENTS & NO BACKUPS: Once a character is assigned to a squad position,
 *   that position is permanently locked. Existing characters cannot be replaced,
 *   swapped, or returned to the pool.
 * - 100% Offline Web Audio Synthesizer + Procedural Ambient BGM Drone
 * - 3D Holographic Card Summons with Animated Stat Meters
 * - Guild Squad Battle Arena with 1v1 & Grand Championship Tournament Bracket
 * - Dimensional Archive & Graveyard Vault
 */

(function () {
  'use strict';

  // --- 1. UNIVERSE CONFIGURATIONS & DYNAMIC 7-ROLE SQUADS ---
  const UNIVERSE_CONFIGS = {
    sololeveling: {
      id: 'sololeveling',
      name: 'Solo Leveling',
      title: 'SOLO LEVELING',
      subtitle: 'RANDOM CARD DRAFT',
      rulePill: '⚡ 7 Hunter Positions • 🛡️ Strict No Duplicates • 🏆 Guild Battle Arena',
      deckLabel: 'SOLO LEVELING',
      deckSub: 'DIMENSIONAL DECK',
      deckIcon: '⚡',
      summonBtnText: '⚡ SUMMON HUNTER CARD 🃏',
      runes: 'ᛟ ✦ ᚱ ✦ ᛁ ✦ ᛋ ✦ ᛖ ✦ ᛟ ✦ ᛗ ✦ ᛟ ✦ ᚾ ✦ ᚨ ✦ ᚱ ✦ ᚲ ✦ ᚺ ✦',
      defaultTheme: 'shadow',
      defaultPlayerNames: [
        'Ahjin Guild (P1)',
        'White Tiger Guild (P2)',
        'Hunters Guild (P3)',
        'Draw Sword Guild (P4)',
        'Scavenger Guild (P5)',
        'Fiend Guild (P6)',
        'Knights Guild (P7)',
        'Fame Guild (P8)'
      ],
      roles: [
        { key: 'LEADER', name: 'Guild Leader', icon: '👑', color: '#ffd166' },
        { key: 'FIGHTER', name: 'Fighter', icon: '⚔️', color: '#ff0054' },
        { key: 'MAGE', name: 'Mage', icon: '🔮', color: '#9d4edd' },
        { key: 'TANK', name: 'Tank', icon: '🛡️', color: '#3a86ff' },
        { key: 'HEALER', name: 'Healer', icon: '💚', color: '#06d6a0' },
        { key: 'SUPPORT', name: 'Support', icon: '✨', color: '#fca311' },
        { key: 'ASSASSIN', name: 'Assassin', icon: '🗡️', color: '#ec4899' }
      ]
    },
    naruto: {
      id: 'naruto',
      name: 'Naruto Shippuden',
      title: 'NARUTO SHIPPUDEN',
      subtitle: 'SHINOBI CARD DRAFT',
      rulePill: '🍥 7 Shinobi Positions • 🛡️ Strict No Duplicates • 🏆 Ninja World War Arena',
      deckLabel: 'NARUTO SHIPPUDEN',
      deckSub: 'MASTER SHINOBI DECK',
      deckIcon: '🍥',
      summonBtnText: '🍥 SUMMON SHINOBI CARD 🃏',
      runes: '忍 ✦ 術 ✦ 影 ✦ 查 ✦ 克 ✦ 拉 ✦ 輪 ✦ 迴 ✦ 眼 ✦ 仙 ✦ 人 ✦ 萬 ✦ 象 ✦',
      defaultTheme: 'leaf',
      defaultPlayerNames: [
        'Hidden Leaf Squad (P1)',
        'Uchiha Clan (P2)',
        'Akatsuki Syndicate (P3)',
        'Hidden Sand Elite (P4)',
        'Hidden Cloud Vanguard (P5)',
        'Hidden Mist Assassins (P6)',
        'Hidden Stone Guard (P7)',
        'Sage Realm (P8)'
      ],
      roles: [
        { key: 'LEADER', name: 'Kage / Leader', icon: '👑', color: '#ffd166' },
        { key: 'FIGHTER', name: 'Taijutsu Fighter', icon: '⚔️', color: '#f97316' },
        { key: 'MAGE', name: 'Ninjutsu / Sage', icon: '🔮', color: '#a855f7' },
        { key: 'TANK', name: 'Susanoo / Tank', icon: '🛡️', color: '#3b82f6' },
        { key: 'HEALER', name: 'Medical Ninja', icon: '💚', color: '#10b981' },
        { key: 'SUPPORT', name: 'Genjutsu / Support', icon: '✨', color: '#eab308' },
        { key: 'ASSASSIN', name: 'Anbu / Assassin', icon: '🗡️', color: '#ec4899' }
      ]
    },
    onepiece: {
      id: 'onepiece',
      name: 'One Piece',
      title: 'ONE PIECE',
      subtitle: 'PIRATE CARD DRAFT',
      rulePill: '🏴‍☠️ 7 Crew Positions • 🛡️ Strict No Duplicates • 🏆 Grand Line Clash Arena',
      deckLabel: 'ONE PIECE',
      deckSub: 'PIRATE KING DECK',
      deckIcon: '🏴‍☠️',
      summonBtnText: '🏴‍☠️ SUMMON PIRATE CARD 🃏',
      runes: '海 ✦ 賊 ✦ 王 ✦ 覇 ✦ 気 ✦ 悪 ✦ 魔 ✦ の ✦ 実 ✦ 解 ✦ 放 ✦ 鼓 ✦ 動 ✦',
      defaultTheme: 'ocean',
      defaultPlayerNames: [
        'Straw Hat Grand Fleet (P1)',
        'Red Hair Pirates (P2)',
        'Whitebeard Fleet (P3)',
        'Marine Headquarters (P4)',
        'Beast Pirates (P5)',
        'Big Mom Family (P6)',
        'Blackbeard Armada (P7)',
        'Revolutionary Army (P8)'
      ],
      roles: [
        { key: 'LEADER', name: 'Captain / Leader', icon: '👑', color: '#ffd166' },
        { key: 'FIGHTER', name: 'Combatant / Swordsman', icon: '⚔️', color: '#ef4444' },
        { key: 'MAGE', name: 'Devil Fruit Master', icon: '🔮', color: '#8b5cf6' },
        { key: 'TANK', name: 'Iron Body / Tank', icon: '🛡️', color: '#2563eb' },
        { key: 'HEALER', name: 'Doctor / Healer', icon: '💚', color: '#06d6a0' },
        { key: 'SUPPORT', name: 'Navigator / Musician', icon: '✨', color: '#f59e0b' },
        { key: 'ASSASSIN', name: 'Sniper / Assassin', icon: '🗡️', color: '#ec4899' }
      ]
    },
    multiverse: {
      id: 'multiverse',
      name: 'Multiverse All-Stars',
      title: 'MULTIVERSE ALL-STARS',
      subtitle: 'ULTIMATE ANIME DRAFT',
      rulePill: '🌌 7 Supreme Positions • 🛡️ Strict No Duplicates • 🏆 Omni Multiverse Tournament',
      deckLabel: 'MULTIVERSE',
      deckSub: 'OMNI NEXUS DECK',
      deckIcon: '🌌',
      summonBtnText: '🌌 SUMMON LEGEND CARD 🃏',
      runes: '✦ DIMENSIONAL GATE ✦ INFINITE MULTIVERSE ✦ OMNI NEXUS ✦ COSMIC NEXUS ✦',
      defaultTheme: 'cosmic',
      defaultPlayerNames: [
        'Team Shadow Monarchs (P1)',
        'Team Hokage Shinobi (P2)',
        'Team Pirate Kings (P3)',
        'Team God Tiers (P4)',
        'Team Transcendent (P5)',
        'Team Chaos Rulers (P6)',
        'Team Dimension Walkers (P7)',
        'Team Omni Apex (P8)'
      ],
      roles: [
        { key: 'LEADER', name: 'Supreme Leader', icon: '👑', color: '#ffd166' },
        { key: 'FIGHTER', name: 'Primary Fighter', icon: '⚔️', color: '#ff0054' },
        { key: 'MAGE', name: 'Arcane / Power', icon: '🔮', color: '#9d4edd' },
        { key: 'TANK', name: 'Frontline Tank', icon: '🛡️', color: '#3a86ff' },
        { key: 'HEALER', name: 'Healer / Recovery', icon: '💚', color: '#06d6a0' },
        { key: 'SUPPORT', name: 'Synergy Support', icon: '✨', color: '#fca311' },
        { key: 'ASSASSIN', name: 'Stealth Assassin', icon: '🗡️', color: '#ec4899' }
      ]
    }
  };

  function getCurrentUniverseConfig() {
    return UNIVERSE_CONFIGS[state.universe] || UNIVERSE_CONFIGS.sololeveling;
  }

  function getRoles() {
    return getCurrentUniverseConfig().roles;
  }

  const PLAYER_COLORS = [
    '#00d2ff', '#ff0054', '#ffd166', '#06d6a0',
    '#9d4edd', '#f97316', '#ec4899', '#14b8a6'
  ];

  function formatINR(val) {
    if (val === undefined || val === null || isNaN(val)) return '₹0';
    return '₹' + Number(val).toLocaleString('en-IN');
  }

  function ensureArray(val) {
    if (!val) return [];
    if (Array.isArray(val)) return val;
    if (typeof val === 'object') return Object.values(val);
    return [];
  }

  // --- 2. GLOBAL APP STATE ---
  const state = {
    universe: (typeof window.getActiveUniverse === 'function' ? window.getActiveUniverse() : 'sololeveling'),
    allCharacters: [],
    pool: [],
    archive: [], // { character, status: 'assigned'|'discarded', player: playerName, role: roleKey }
    players: [],
    activePlayerIndex: 0,
    drawnCard: null,
    maxPicksPerPlayer: 7,
    soundEnabled: true,
    bgmEnabled: false,
    theme: 'shadow',
    isAuctionMode: false,
    startingBudget: 200000,
    bidTimerDuration: 15,
    offlineActiveBidderIndex: 0,
    offlineTimerInterval: null,
    currentAuction: null
  };

  // --- 2.5 FIREBASE REALTIME MULTIPLAYER STATE ---
  const firebaseConfig = {
    apiKey: "AIzaSyDMi8s9teCm49wx4gLN0BTFDT0cJy59AfM",
    authDomain: "anime-auction-22897.firebaseapp.com",
    databaseURL: "https://anime-auction-22897-default-rtdb.asia-southeast1.firebasedatabase.app",
    projectId: "anime-auction-22897",
    storageBucket: "anime-auction-22897.firebasestorage.app",
    messagingSenderId: "801239974207",
    appId: "1:801239974207:web:61e413fa5ec33846b0d38a"
  };

  const mpState = {
    db: null,
    roomCode: null,
    roomRef: null,
    isHost: false,
    localPlayerId: null,
    localPlayerName: 'Player',
    isOnline: false,
    roomData: null,
    listenerAttached: false,
    isAuctionMode: false,
    startingBudget: 200000,
    bidTimerDuration: 15,
    myBudget: 200000,
    auctionLocalTimerInterval: null,
    myFolded: false
  };

  function initFirebase() {
    if (!mpState.db && typeof window.firebase !== 'undefined') {
      try {
        if (!firebase.apps || !firebase.apps.length) {
          firebase.initializeApp(firebaseConfig);
        }
        mpState.db = firebase.database();
      } catch (err) {
        console.warn('Firebase init error:', err);
      }
    }
    return mpState.db;
  }

  function getOrSetLocalPlayerId() {
    let id = sessionStorage.getItem('sl_player_id');
    if (!id) {
      id = 'p_' + Date.now() + '_' + Math.random().toString(36).substring(2, 6);
      sessionStorage.setItem('sl_player_id', id);
    }
    mpState.localPlayerId = id;
    return id;
  }

  // --- 3. WEB AUDIO SYNTHESIZER & PROCEDURAL BGM DRONE ---
  let audioCtx = null;
  let bgmOsc1 = null;
  let bgmOsc2 = null;
  let bgmGain = null;

  function getAudioContext() {
    if (!audioCtx) {
      const AudioContext = window.AudioContext || window.webkitAudioContext;
      if (AudioContext) {
        audioCtx = new AudioContext();
      }
    }
    if (audioCtx && audioCtx.state === 'suspended') {
      audioCtx.resume();
    }
    return audioCtx;
  }

  function playSound(type) {
    if (!state.soundEnabled) return;
    try {
      const ctx = getAudioContext();
      if (!ctx) return;

      const now = ctx.currentTime;
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.connect(gain);
      gain.connect(ctx.destination);

      if (type === 'click') {
        osc.type = 'sine';
        osc.frequency.setValueAtTime(600, now);
        osc.frequency.exponentialRampToValueAtTime(200, now + 0.06);
        gain.gain.setValueAtTime(0.2, now);
        gain.gain.exponentialRampToValueAtTime(0.01, now + 0.06);
        osc.start(now);
        osc.stop(now + 0.06);
      } else if (type === 'draw') {
        osc.type = 'triangle';
        osc.frequency.setValueAtTime(260, now);
        osc.frequency.exponentialRampToValueAtTime(880, now + 0.25);
        gain.gain.setValueAtTime(0.25, now);
        gain.gain.exponentialRampToValueAtTime(0.01, now + 0.25);
        osc.start(now);
        osc.stop(now + 0.25);
      } else if (type === 'rank_sss') {
        osc.type = 'sawtooth';
        osc.frequency.setValueAtTime(120, now);
        osc.frequency.exponentialRampToValueAtTime(45, now + 0.6);
        gain.gain.setValueAtTime(0.4, now);
        gain.gain.exponentialRampToValueAtTime(0.01, now + 0.6);
        osc.start(now);
        osc.stop(now + 0.6);
      } else if (type === 'assign') {
        osc.type = 'sine';
        osc.frequency.setValueAtTime(440, now);
        osc.frequency.exponentialRampToValueAtTime(880, now + 0.15);
        gain.gain.setValueAtTime(0.25, now);
        gain.gain.exponentialRampToValueAtTime(0.01, now + 0.15);
        osc.start(now);
        osc.stop(now + 0.15);
      } else if (type === 'discard') {
        osc.type = 'sawtooth';
        osc.frequency.setValueAtTime(350, now);
        osc.frequency.exponentialRampToValueAtTime(90, now + 0.2);
        gain.gain.setValueAtTime(0.2, now);
        gain.gain.exponentialRampToValueAtTime(0.01, now + 0.2);
        osc.start(now);
        osc.stop(now + 0.2);
      } else if (type === 'bid_placed') {
        osc.type = 'triangle';
        osc.frequency.setValueAtTime(523.25, now);
        osc.frequency.exponentialRampToValueAtTime(880, now + 0.12);
        gain.gain.setValueAtTime(0.3, now);
        gain.gain.exponentialRampToValueAtTime(0.01, now + 0.12);
        osc.start(now);
        osc.stop(now + 0.12);
      } else if (type === 'outbid_alert') {
        osc.type = 'sawtooth';
        osc.frequency.setValueAtTime(659.25, now);
        osc.frequency.exponentialRampToValueAtTime(440, now + 0.18);
        gain.gain.setValueAtTime(0.25, now);
        gain.gain.exponentialRampToValueAtTime(0.01, now + 0.18);
        osc.start(now);
        osc.stop(now + 0.18);
      } else if (type === 'gavel_sold') {
        osc.type = 'square';
        osc.frequency.setValueAtTime(220, now);
        osc.frequency.exponentialRampToValueAtTime(60, now + 0.35);
        gain.gain.setValueAtTime(0.45, now);
        gain.gain.exponentialRampToValueAtTime(0.01, now + 0.35);
        osc.start(now);
        osc.stop(now + 0.35);
      } else if (type === 'clash') {
        osc.type = 'square';
        osc.frequency.setValueAtTime(150, now);
        osc.frequency.exponentialRampToValueAtTime(40, now + 0.18);
        gain.gain.setValueAtTime(0.35, now);
        gain.gain.exponentialRampToValueAtTime(0.01, now + 0.18);
        osc.start(now);
        osc.stop(now + 0.18);
      } else if (type === 'victory') {
        const notes = [523.25, 659.25, 783.99, 1046.5]; // C5, E5, G5, C6
        notes.forEach((freq, idx) => {
          const nOsc = ctx.createOscillator();
          const nGain = ctx.createGain();
          nOsc.connect(nGain);
          nGain.connect(ctx.destination);
          nOsc.type = 'triangle';
          nOsc.frequency.setValueAtTime(freq, now + idx * 0.12);
          nGain.gain.setValueAtTime(0.3, now + idx * 0.12);
          nGain.gain.exponentialRampToValueAtTime(0.01, now + idx * 0.12 + 0.3);
          nOsc.start(now + idx * 0.12);
          nOsc.stop(now + idx * 0.12 + 0.3);
        });
      }
    } catch (e) {
      console.warn('Audio error:', e);
    }
  }

  function toggleBGM() {
    state.bgmEnabled = !state.bgmEnabled;
    const btn = document.getElementById('bgm-btn');
    if (btn) {
      btn.style.borderColor = state.bgmEnabled ? 'var(--neon-blue)' : 'rgba(255,255,255,0.2)';
      btn.style.boxShadow = state.bgmEnabled ? '0 0 15px var(--neon-glow)' : 'none';
    }

    const ctx = getAudioContext();
    if (!ctx) return;

    if (state.bgmEnabled) {
      if (!bgmOsc1) {
        bgmGain = ctx.createGain();
        bgmGain.gain.setValueAtTime(0.05, ctx.currentTime);
        bgmGain.connect(ctx.destination);

        bgmOsc1 = ctx.createOscillator();
        bgmOsc1.type = 'sine';
        bgmOsc1.frequency.setValueAtTime(65.41, ctx.currentTime); // C2

        bgmOsc2 = ctx.createOscillator();
        bgmOsc2.type = 'triangle';
        bgmOsc2.frequency.setValueAtTime(98.0, ctx.currentTime); // G2

        bgmOsc1.connect(bgmGain);
        bgmOsc2.connect(bgmGain);

        bgmOsc1.start();
        bgmOsc2.start();
      }
    } else {
      if (bgmOsc1) {
        try {
          bgmOsc1.stop();
          bgmOsc2.stop();
          bgmOsc1.disconnect();
          bgmOsc2.disconnect();
        } catch (e) {}
        bgmOsc1 = null;
        bgmOsc2 = null;
      }
    }
  }

  // --- 4. PARTICLE CANVAS ENGINE ---
  function initParticleCanvas() {
    const canvas = document.getElementById('particleCanvas');
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    window.addEventListener('resize', () => {
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    });

    const particles = [];
    const particleCount = 45;

    for (let i = 0; i < particleCount; i++) {
      particles.push({
        x: Math.random() * width,
        y: Math.random() * height,
        radius: Math.random() * 2.5 + 1,
        speedY: Math.random() * 0.7 + 0.2,
        speedX: (Math.random() - 0.5) * 0.4,
        opacity: Math.random() * 0.6 + 0.2
      });
    }

    function renderParticles() {
      ctx.clearRect(0, 0, width, height);

      let color = '0, 210, 255';
      if (state.theme === 'ruler') color = '255, 209, 102';
      else if (state.theme === 'redgate') color = '255, 0, 84';
      else if (state.theme === 'frost') color = '0, 240, 255';

      particles.forEach((p) => {
        p.y -= p.speedY;
        p.x += p.speedX;
        if (p.y < -10) {
          p.y = height + 10;
          p.x = Math.random() * width;
        }

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(${color}, ${p.opacity})`;
        ctx.shadowBlur = 8;
        ctx.shadowColor = `rgba(${color}, 0.8)`;
        ctx.fill();
      });

      requestAnimationFrame(renderParticles);
    }
    renderParticles();
  }

  // --- 5. CONFETTI ENGINE ---
  function triggerConfetti() {
    const canvas = document.getElementById('confetti-canvas');
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    const width = (canvas.width = window.innerWidth);
    const height = (canvas.height = window.innerHeight);

    const confetti = [];
    const colors = ['#00d2ff', '#ffd166', '#ff0054', '#9d4edd', '#06d6a0', '#ffffff'];

    for (let i = 0; i < 140; i++) {
      confetti.push({
        x: width / 2,
        y: height / 2,
        vx: (Math.random() - 0.5) * 22,
        vy: (Math.random() - 0.75) * 22,
        size: Math.random() * 8 + 4,
        color: colors[Math.floor(Math.random() * colors.length)],
        rotation: Math.random() * 360,
        rotationSpeed: (Math.random() - 0.5) * 10,
        alpha: 1
      });
    }

    let frames = 0;
    function renderConfetti() {
      ctx.clearRect(0, 0, width, height);
      let alive = false;

      confetti.forEach((c) => {
        c.x += c.vx;
        c.y += c.vy;
        c.vy += 0.4;
        c.vx *= 0.98;
        c.rotation += c.rotationSpeed;
        c.alpha -= 0.008;

        if (c.alpha > 0) {
          alive = true;
          ctx.save();
          ctx.translate(c.x, c.y);
          ctx.rotate((c.rotation * Math.PI) / 180);
          ctx.fillStyle = c.color;
          ctx.globalAlpha = Math.max(0, c.alpha);
          ctx.fillRect(-c.size / 2, -c.size / 2, c.size, c.size);
          ctx.restore();
        }
      });

      frames++;
      if (alive && frames < 180) {
        requestAnimationFrame(renderConfetti);
      } else {
        ctx.clearRect(0, 0, width, height);
      }
    }
    renderConfetti();
  }

  // --- 5.5 UNIVERSE ATMOSPHERIC THEMES & CANON SYNERGIES ENGINE ---
  const UNIVERSE_THEMES = {
    sololeveling: [
      { id: 'shadow', label: '🌑 Shadow Monarch' },
      { id: 'ruler', label: "👑 Ruler's Light" },
      { id: 'redgate', label: '⚔️ Red Gate / Castle' },
      { id: 'frost', label: '❄️ Frost Gate' }
    ],
    naruto: [
      { id: 'leaf', label: '🍃 Hidden Leaf Will' },
      { id: 'akatsuki', label: '☁️ Akatsuki Crimson' },
      { id: 'sage', label: '🐸 Six Paths Sage' },
      { id: 'tsukuyomi', label: '🌙 Infinite Tsukuyomi' }
    ],
    onepiece: [
      { id: 'ocean', label: '🌊 Grand Line Azure' },
      { id: 'wano', label: '🌸 Wano Kuni' },
      { id: 'nika', label: '☀️ Sun God Nika' },
      { id: 'marineford', label: '🔥 Marineford War' }
    ],
    multiverse: [
      { id: 'cosmic', label: '🌌 Cosmic Void' },
      { id: 'void', label: '🌀 Dimension Void' },
      { id: 'rift', label: '⚡ Multiverse Rift' },
      { id: 'astral', label: '✨ Astral Nexus' }
    ]
  };

  const CANON_SYNERGIES = [
    // --- SOLO LEVELING SYNERGIES ---
    {
      id: 'sl_shadow_legion',
      universe: 'sololeveling',
      name: 'Shadow Monarch Legion',
      icon: '🌑',
      boostPercent: 20,
      description: 'Sung Jinwoo + (Beru, Igris, or Bellion)',
      check: (chars) => {
        const hasJinwoo = chars.some(c => c.name.includes('Jinwoo') || c.id === 'sl_jinwoo_monarch' || c.id === 'sl_jinwoo_shadow');
        const hasShadow = chars.some(c => c.name.includes('Beru') || c.name.includes('Igris') || c.name.includes('Bellion') || c.name.includes('Tusk'));
        return hasJinwoo && hasShadow;
      }
    },
    {
      id: 'sl_national_vanguard',
      universe: 'sololeveling',
      name: 'National Level Vanguard',
      icon: '🛡️',
      boostPercent: 25,
      description: 'Thomas Andre + Liu Zhigang (National-Level Titans)',
      check: (chars) => {
        const hasAndre = chars.some(c => c.name.includes('Thomas Andre') || c.id === 'sl_thomas_andre');
        const hasLiu = chars.some(c => c.name.includes('Liu Zhigang') || c.id === 'sl_liu_zhigang');
        return hasAndre && hasLiu;
      }
    },
    {
      id: 'sl_korean_srank',
      universe: 'sololeveling',
      name: 'Korean S-Rank Elite',
      icon: '⚔️',
      boostPercent: 20,
      description: '2+ Korean S-Rank Guild Leaders (Cha Hae-In, Choi Jong-In, Baek Yoonho, Go Gunhee)',
      check: (chars) => {
        const matches = chars.filter(c => 
          c.name.includes('Cha Hae-In') || c.name.includes('Choi Jong-In') || c.name.includes('Baek Yoonho') || c.name.includes('Go Gunhee') || c.name.includes('Lim Tae-Gyu')
        );
        return matches.length >= 2;
      }
    },
    {
      id: 'sl_monarch_apex',
      universe: 'sololeveling',
      name: 'Absolute Being & Monarchs',
      icon: '👑',
      boostPercent: 30,
      description: 'Absolute Being + (Antares or Ashborn or Sung Jinwoo)',
      check: (chars) => {
        const hasAB = chars.some(c => c.name.includes('Absolute Being') || c.id === 'sl_absolute_being');
        const hasApex = chars.some(c => c.name.includes('Antares') || c.name.includes('Ashborn') || c.name.includes('Jinwoo'));
        return hasAB && hasApex;
      }
    },
    {
      id: 'sl_marshals',
      universe: 'sololeveling',
      name: 'Shadow Marshals Brotherhood',
      icon: '🗡️',
      boostPercent: 25,
      description: '2+ Shadow Marshals (Bellion, Beru, Igris, Iron, Greed)',
      check: (chars) => {
        const matches = chars.filter(c => c.name.includes('Bellion') || c.name.includes('Beru') || c.name.includes('Igris') || c.name.includes('Iron') || c.name.includes('Greed'));
        return matches.length >= 2;
      }
    },

    // --- NARUTO SYNERGIES ---
    {
      id: 'naruto_indra_asura',
      universe: 'naruto',
      name: 'Indra & Asura Reincarnation',
      icon: '☯️',
      boostPercent: 25,
      description: 'Naruto Uzumaki + Sasuke Uchiha (Six Paths Reincarnates)',
      check: (chars) => {
        const hasNaruto = chars.some(c => c.name.includes('Naruto'));
        const hasSasuke = chars.some(c => c.name.includes('Sasuke'));
        return hasNaruto && hasSasuke;
      }
    },
    {
      id: 'naruto_team7',
      universe: 'naruto',
      name: 'Team 7 Legends',
      icon: '🍥',
      boostPercent: 30,
      description: 'Naruto + Sasuke + (Sakura Haruno or Kakashi Hatake)',
      check: (chars) => {
        const hasNaruto = chars.some(c => c.name.includes('Naruto'));
        const hasSasuke = chars.some(c => c.name.includes('Sasuke'));
        const hasSupport = chars.some(c => c.name.includes('Sakura') || c.name.includes('Kakashi'));
        return hasNaruto && hasSasuke && hasSupport;
      }
    },
    {
      id: 'naruto_sannin',
      universe: 'naruto',
      name: 'Legendary Sannin',
      icon: '🍃',
      boostPercent: 35,
      description: 'Jiraiya + Tsunade + Orochimaru (Leaf Sannin Trio)',
      check: (chars) => {
        const hasJiraiya = chars.some(c => c.name.includes('Jiraiya'));
        const hasTsunade = chars.some(c => c.name.includes('Tsunade'));
        const hasOrochi = chars.some(c => c.name.includes('Orochimaru'));
        return (hasJiraiya && hasTsunade && hasOrochi) || ((hasJiraiya && hasTsunade) || (hasJiraiya && hasOrochi) || (hasTsunade && hasOrochi));
      }
    },
    {
      id: 'naruto_akatsuki',
      universe: 'naruto',
      name: 'Akatsuki Syndicate',
      icon: '☁️',
      boostPercent: 25,
      description: '2+ Akatsuki Syndicate Operatives (Pain, Itachi, Obito, Kisame, Konan, etc.)',
      check: (chars) => {
        const matches = chars.filter(c => 
          c.name.includes('Pain') || c.name.includes('Itachi') || c.name.includes('Obito') || 
          c.name.includes('Kisame') || c.name.includes('Konan') || c.name.includes('Deidara') || 
          c.name.includes('Sasori') || c.name.includes('Hidan') || c.name.includes('Kakuzu') || c.name.includes('Nagato')
        );
        return matches.length >= 2;
      }
    },
    {
      id: 'naruto_uchiha_susanoo',
      universe: 'naruto',
      name: 'Uchiha Susanoo Lineage',
      icon: '👁️',
      boostPercent: 25,
      description: 'Madara Uchiha + (Sasuke, Itachi, Obito, or Shisui)',
      check: (chars) => {
        const hasMadara = chars.some(c => c.name.includes('Madara'));
        const hasOtherUchiha = chars.some(c => (c.name.includes('Sasuke') || c.name.includes('Itachi') || c.name.includes('Obito') || c.name.includes('Shisui')) && !c.name.includes('Madara'));
        return hasMadara && hasOtherUchiha;
      }
    },
    {
      id: 'naruto_hokage_legacy',
      universe: 'naruto',
      name: 'Hokage Will of Fire',
      icon: '🔥',
      boostPercent: 30,
      description: 'Hashirama Senju + (Tobirama Senju, Minato Namikaze, or Hiruzen Sarutobi)',
      check: (chars) => {
        const hasHashirama = chars.some(c => c.name.includes('Hashirama'));
        const hasOtherKage = chars.some(c => (c.name.includes('Tobirama') || c.name.includes('Minato') || c.name.includes('Hiruzen') || c.name.includes('Tsunade')) && !c.name.includes('Hashirama'));
        return hasHashirama && hasOtherKage;
      }
    },
    {
      id: 'naruto_otsutsuki',
      universe: 'naruto',
      name: 'Otsutsuki Progenitors',
      icon: '🌕',
      boostPercent: 35,
      description: 'Kaguya Otsutsuki + (Hagoromo, Isshiki, or Momoshiki)',
      check: (chars) => {
        const hasKaguya = chars.some(c => c.name.includes('Kaguya'));
        const hasOtsu = chars.some(c => (c.name.includes('Hagoromo') || c.name.includes('Isshiki') || c.name.includes('Momoshiki') || c.name.includes('Hamura')) && !c.name.includes('Kaguya'));
        return hasKaguya && hasOtsu;
      }
    },
    {
      id: 'naruto_eight_gates',
      universe: 'naruto',
      name: 'Eight Gates of Youth',
      icon: '💥',
      boostPercent: 25,
      description: 'Might Guy + Rock Lee (Taijutsu Masters)',
      check: (chars) => {
        const hasGuy = chars.some(c => c.name.includes('Might Guy') || c.name.includes('Guy'));
        const hasLee = chars.some(c => c.name.includes('Rock Lee') || c.name.includes('Lee'));
        return hasGuy && hasLee;
      }
    },

    // --- ONE PIECE SYNERGIES ---
    {
      id: 'op_monster_trio',
      universe: 'onepiece',
      name: 'Straw Hat Monster Trio',
      icon: '🏴‍☠️',
      boostPercent: 35,
      description: 'Monkey D. Luffy + Roronoa Zoro + Vinsmoke Sanji',
      check: (chars) => {
        const hasLuffy = chars.some(c => c.name.includes('Luffy'));
        const hasZoro = chars.some(c => c.name.includes('Zoro'));
        const hasSanji = chars.some(c => c.name.includes('Sanji'));
        return (hasLuffy && hasZoro && hasSanji) || ((hasLuffy && hasZoro) || (hasZoro && hasSanji) || (hasLuffy && hasSanji));
      }
    },
    {
      id: 'op_yonko',
      universe: 'onepiece',
      name: 'Four Emperors (Yonko)',
      icon: '👑',
      boostPercent: 30,
      description: '2+ Emperors of the Sea (Luffy, Shanks, Whitebeard, Kaido, Big Mom, Blackbeard)',
      check: (chars) => {
        const matches = chars.filter(c => 
          c.name.includes('Shanks') || c.name.includes('Whitebeard') || c.name.includes('Newgate') || 
          c.name.includes('Kaido') || c.name.includes('Big Mom') || c.name.includes('Linlin') || 
          c.name.includes('Teach') || c.name.includes('Blackbeard') || (c.name.includes('Luffy') && c.tier_category === 'SSS')
        );
        return matches.length >= 2;
      }
    },
    {
      id: 'op_old_era',
      universe: 'onepiece',
      name: 'Old Era Titans',
      icon: '⚓',
      boostPercent: 35,
      description: 'Gol D. Roger + (Whitebeard, Silvers Rayleigh, or Monkey D. Garp)',
      check: (chars) => {
        const hasRoger = chars.some(c => c.name.includes('Roger'));
        const hasOther = chars.some(c => (c.name.includes('Whitebeard') || c.name.includes('Newgate') || c.name.includes('Rayleigh') || c.name.includes('Garp')) && !c.name.includes('Roger'));
        return hasRoger && hasOther;
      }
    },
    {
      id: 'op_brothers_sake',
      universe: 'onepiece',
      name: "Brothers' Sake Bond",
      icon: '🍶',
      boostPercent: 30,
      description: '2+ Sworn Brothers (Luffy, Portgas D. Ace, Sabo)',
      check: (chars) => {
        const matches = chars.filter(c => c.name.includes('Luffy') || c.name.includes('Ace') || c.name.includes('Sabo'));
        return matches.length >= 2;
      }
    },
    {
      id: 'op_marine_admirals',
      universe: 'onepiece',
      name: 'Absolute Justice Admirals',
      icon: '⚖️',
      boostPercent: 25,
      description: '2+ Marine Admirals / Fleet Admirals (Akainu, Aokiji, Kizaru, Fujitora, Sengoku, Garp)',
      check: (chars) => {
        const matches = chars.filter(c => 
          c.name.includes('Akainu') || c.name.includes('Sakazuki') || c.name.includes('Aokiji') || 
          c.name.includes('Kuzan') || c.name.includes('Kizaru') || c.name.includes('Borsalino') || 
          c.name.includes('Fujitora') || c.name.includes('Sengoku') || c.name.includes('Garp')
        );
        return matches.length >= 2;
      }
    },
    {
      id: 'op_worst_generation',
      universe: 'onepiece',
      name: 'Worst Generation Supernovas',
      icon: '⚡',
      boostPercent: 20,
      description: '2+ Worst Generation Captains (Luffy, Zoro, Law, Kid, Blackbeard)',
      check: (chars) => {
        const matches = chars.filter(c => 
          c.name.includes('Luffy') || c.name.includes('Zoro') || c.name.includes('Law') || 
          c.name.includes('Kid') || c.name.includes('Teach') || c.name.includes('Blackbeard')
        );
        return matches.length >= 2;
      }
    },
    {
      id: 'op_joyboy',
      universe: 'onepiece',
      name: 'Drums of Liberation & Joy Boy',
      icon: '☀️',
      boostPercent: 40,
      description: 'Luffy (Gear 5) + Joy Boy (Sun God Incarnations)',
      check: (chars) => {
        const hasLuffy = chars.some(c => c.name.includes('Luffy'));
        const hasJoyBoy = chars.some(c => c.name.includes('Joy Boy') || c.name.includes('Nika'));
        return hasLuffy && hasJoyBoy;
      }
    },

    // --- MULTIVERSE CROSS-UNIVERSE SYNERGIES ---
    {
      id: 'multi_deity_trinity',
      universe: 'multiverse',
      name: 'Omni Multiverse Deity Trinity',
      icon: '🌌',
      boostPercent: 50,
      description: '(Absolute Being or Jinwoo) + (Kaguya or Hagoromo) + (Joy Boy or Imu)',
      check: (chars) => {
        const hasSL = chars.some(c => c.name.includes('Absolute Being') || c.name.includes('Jinwoo') || c.name.includes('Ashborn'));
        const hasNaruto = chars.some(c => c.name.includes('Kaguya') || c.name.includes('Hagoromo') || c.name.includes('Madara'));
        const hasOP = chars.some(c => c.name.includes('Joy Boy') || c.name.includes('Imu') || c.name.includes('Roger') || c.name.includes('Luffy'));
        return hasSL && hasNaruto && hasOP;
      }
    },
    {
      id: 'multi_protagonists',
      universe: 'multiverse',
      name: 'Shonen Protagonist Awakening',
      icon: '🔥',
      boostPercent: 45,
      description: 'Sung Jinwoo + Naruto Uzumaki + Monkey D. Luffy',
      check: (chars) => {
        const hasJinwoo = chars.some(c => c.name.includes('Jinwoo'));
        const hasNaruto = chars.some(c => c.name.includes('Naruto'));
        const hasLuffy = chars.some(c => c.name.includes('Luffy'));
        return (hasJinwoo && hasNaruto && hasLuffy) || ((hasJinwoo && hasNaruto) || (hasNaruto && hasLuffy) || (hasJinwoo && hasLuffy));
      }
    },
    {
      id: 'multi_bladesmen',
      universe: 'multiverse',
      name: 'Supreme Bladesmen of Legend',
      icon: '⚔️',
      boostPercent: 35,
      description: '2+ Master Swordsmen (Igris, Sasuke Uchiha, Roronoa Zoro, Mihawk, Shanks)',
      check: (chars) => {
        const matches = chars.filter(c => 
          c.name.includes('Igris') || c.name.includes('Sasuke') || c.name.includes('Zoro') || 
          c.name.includes('Mihawk') || c.name.includes('Shanks') || c.name.includes('Law')
        );
        return matches.length >= 2;
      }
    },
    {
      id: 'multi_shadows_darkness',
      universe: 'multiverse',
      name: 'Shadows & Crimson Void',
      icon: '🌑',
      boostPercent: 35,
      description: 'Sung Jinwoo + (Madara Uchiha or Marshall D. Teach)',
      check: (chars) => {
        const hasJinwoo = chars.some(c => c.name.includes('Jinwoo'));
        const hasDark = chars.some(c => c.name.includes('Madara') || c.name.includes('Teach') || c.name.includes('Blackbeard') || c.name.includes('Pain'));
        return hasJinwoo && hasDark;
      }
    },
    {
      id: 'multi_titan_tanks',
      universe: 'multiverse',
      name: 'Titan Frontline Aegis',
      icon: '🛡️',
      boostPercent: 30,
      description: '2+ Unbreakable Tanks (Thomas Andre, Hashirama Senju, Kaido, Edward Newgate, Iron)',
      check: (chars) => {
        const matches = chars.filter(c => 
          c.name.includes('Thomas Andre') || c.name.includes('Hashirama') || c.name.includes('Kaido') || 
          c.name.includes('Whitebeard') || c.name.includes('Newgate') || c.name.includes('Iron')
        );
        return matches.length >= 2;
      }
    }
  ];

  function evaluateSquadSynergies(player) {
    if (!player || !player.squad) return [];
    const squadChars = Object.values(player.squad).filter(Boolean);
    if (squadChars.length < 2) return [];

    const activeSynergies = [];
    CANON_SYNERGIES.forEach((syn) => {
      // Check if synergy applies to current universe or is cross-universe
      if (syn.universe === 'multiverse' || syn.universe === state.universe || state.universe === 'multiverse') {
        try {
          if (syn.check(squadChars)) {
            activeSynergies.push(syn);
          }
        } catch (e) {
          console.warn('Synergy check error:', syn.id, e);
        }
      }
    });

    return activeSynergies;
  }

  function showSynergyToast(synergy) {
    const container = document.getElementById('synergy-toast-container');
    if (!container) return;

    const toast = document.createElement('div');
    toast.className = 'synergy-toast';
    toast.innerHTML = `
      <span class="synergy-toast-icon">${synergy.icon || '✨'}</span>
      <div class="synergy-toast-content">
        <div class="synergy-toast-title">CANON SYNERGY UNLOCKED!</div>
        <div class="synergy-toast-name">${synergy.name} (+${synergy.boostPercent}% PWR)</div>
        <div class="synergy-toast-desc">${synergy.description}</div>
      </div>
    `;
    container.appendChild(toast);
    playSound('rank_sss');

    setTimeout(() => {
      toast.style.opacity = '0';
      toast.style.transform = 'translateX(50px)';
      toast.style.transition = 'all 0.4s ease';
      setTimeout(() => toast.remove(), 400);
    }, 4500);
  }

  function renderUniverseThemeTabs() {
    const container = document.getElementById('theme-selector-container');
    if (!container) return;

    const themes = UNIVERSE_THEMES[state.universe] || UNIVERSE_THEMES.sololeveling;
    container.innerHTML = '';

    themes.forEach((t) => {
      const btn = document.createElement('button');
      btn.type = 'button';
      btn.className = `theme-tab ${state.theme === t.id ? 'active' : ''}`;
      btn.dataset.theme = t.id;
      btn.textContent = t.label;
      btn.addEventListener('click', () => {
        container.querySelectorAll('.theme-tab').forEach((tb) => tb.classList.remove('active'));
        btn.classList.add('active');
        state.theme = t.id;
        document.body.className = `theme-${state.theme}`;
        playSound('click');
      });
      container.appendChild(btn);
    });
  }

  // --- 6. POWER & SYNERGY CALCULATOR ---
  function calculateCharacterCombatPower(char, roleKey) {
    if (!char) return 0;
    let power = char.power_number || 100000;

    if (char.stats) {
      const statMultiplier =
        (char.stats.raw_power * 0.3 +
          char.stats.hax * 0.2 +
          char.stats.speed * 0.15 +
          char.stats.durability * 0.1 +
          char.stats.synergy * 0.15 +
          char.stats.battle_iq * 0.1) /
        10;
      power = Math.round(power * (0.7 + statMultiplier * 0.3));
    }

    // Role Match Eligibility Bonus (15%)
    if (char.eligible_roles && char.eligible_roles.includes(roleKey)) {
      power = Math.round(power * 1.15);
    }

    return power;
  }

  function calculateSquadPower(player) {
    if (!player || !player.squad) return 0;
    let baseSum = 0;
    const currentRoles = getRoles();

    currentRoles.forEach((role) => {
      const char = player.squad[role.key];
      if (char) {
        baseSum += calculateCharacterCombatPower(char, role.key);
      }
    });

    // Leader Synergy Bonus (+10% to whole squad if Leader is God Tier / Monarch / Ruler)
    const leader = player.squad['LEADER'];
    let leaderMult = 1.0;
    if (leader && (leader.tier_category === 'SSS' || leader.tier_category === 'SS')) {
      leaderMult = 1.10;
    }

    // Canon Squad Synergies Multiplier
    const activeSynergies = evaluateSquadSynergies(player);
    let synergyBoostTotal = 0;
    activeSynergies.forEach((s) => {
      synergyBoostTotal += (s.boostPercent || 0);
    });

    const synergyMult = 1 + (synergyBoostTotal / 100);
    const total = Math.round(baseSum * leaderMult * synergyMult);

    return total;
  }

  // --- 7. INITIALIZATION, UNIVERSE ENGINE & SETUP ---
  function updateUniverseUI(switchTheme = false) {
    const uniConfig = getCurrentUniverseConfig();

    // Update active tab in header
    document.querySelectorAll('.uni-tab').forEach((tab) => {
      if (tab.dataset.universe === state.universe) {
        tab.classList.add('active');
      } else {
        tab.classList.remove('active');
      }
    });

    // Update active tab in setup modal
    document.querySelectorAll('.uni-setup-btn').forEach((btn) => {
      if (btn.dataset.universe === state.universe) {
        btn.classList.add('active');
      } else {
        btn.classList.remove('active');
      }
    });

    // Update header title & rule pill
    const titleEl = document.getElementById('main-title');
    if (titleEl) {
      titleEl.innerHTML = `${uniConfig.title} <span class="highlight">${uniConfig.subtitle}</span>`;
    }
    const rulePill = document.getElementById('main-rule-pill');
    if (rulePill) {
      rulePill.textContent = uniConfig.rulePill;
    }

    // Update summon button text
    const summonBtn = document.getElementById('summon-card-btn');
    if (summonBtn) {
      summonBtn.textContent = uniConfig.summonBtnText;
    }

    // Update 3D Deck back & Runes
    const deckBrandTitle = document.getElementById('deck-brand-title');
    if (deckBrandTitle) deckBrandTitle.textContent = uniConfig.deckLabel;
    const deckBrandSub = document.getElementById('deck-brand-sub');
    if (deckBrandSub) deckBrandSub.textContent = uniConfig.deckSub;
    const deckGateIcon = document.getElementById('deck-gate-icon');
    if (deckGateIcon) deckGateIcon.textContent = uniConfig.deckIcon;
    const deckHint = document.getElementById('deck-summon-hint');
    if (deckHint) deckHint.innerHTML = `<span class="sparkle-icon">✨</span> Tap Deck to Summon ${uniConfig.name} Card <span class="sparkle-icon">🃏</span>`;
    const portalRunes = document.getElementById('portal-ring-runes');
    if (portalRunes) portalRunes.textContent = uniConfig.runes;

    // Render universe-specific themes in top bar
    renderUniverseThemeTabs();

    // Switch theme if requested
    if (switchTheme && uniConfig.defaultTheme) {
      state.theme = uniConfig.defaultTheme;
      document.body.className = `theme-${state.theme}`;
      renderUniverseThemeTabs();
    }
  }

  function setUniverse(universe, switchTheme = true) {
    if (!UNIVERSE_CONFIGS[universe]) return;
    state.universe = universe;
    if (typeof window.setActiveUniverse === 'function') {
      window.setActiveUniverse(universe);
    }
    const pCount = state.players.length || 2;
    initGame(pCount, null, universe);
    updateUniverseUI(switchTheme);
    playSound('assign');
  }

  function initGame(playerCount = 2, customNames = null, universe = null) {
    if (universe && UNIVERSE_CONFIGS[universe]) {
      state.universe = universe;
      if (typeof window.setActiveUniverse === 'function') {
        window.setActiveUniverse(universe);
      }
    } else if (!state.universe) {
      state.universe = typeof window.getActiveUniverse === 'function' ? window.getActiveUniverse() : 'sololeveling';
    }

    const uniConfig = getCurrentUniverseConfig();
    state.allCharacters = typeof window.getStoredCharacters === 'function'
      ? window.getStoredCharacters(state.universe)
      : (window.DEFAULT_SOLO_CHARACTERS || []);
    state.pool = JSON.parse(JSON.stringify(state.allCharacters));
    state.archive = [];

    state.players = [];
    const defaultNames = uniConfig.defaultPlayerNames;
    const startingBudget = state.startingBudget || 200000;
    for (let i = 0; i < playerCount; i++) {
      const pName =
        (customNames && customNames[i]) ||
        defaultNames[i] ||
        `Player ${i + 1}`;
      state.players.push({
        id: `p${i + 1}`,
        name: pName,
        color: PLAYER_COLORS[i % PLAYER_COLORS.length],
        budget: startingBudget,
        folded: false,
        squad: {} // key: LEADER, FIGHTER, etc.
      });
    }
    state.activePlayerIndex = 0;
    state.drawnCard = null;

    updateUniverseUI();
    updateHeaderStats();
    updateAuctionUIState();
    renderPlayersDock();
    updateTurnHUD();
  }

  function updateAuctionUIState() {
    const statusText = document.getElementById('offline-auction-status-text');
    const toggleBtn = document.getElementById('offline-auction-btn');
    const setupToggle = document.getElementById('setup-offline-auction-toggle');
    const setupLabel = document.getElementById('setup-offline-auction-label');
    const setupOptions = document.getElementById('setup-offline-auction-options');
    const setupBudget = document.getElementById('setup-offline-starting-budget');
    const setupTimer = document.getElementById('setup-offline-bid-timer');

    if (statusText) statusText.textContent = state.isAuctionMode ? 'ON 🔥' : 'OFF';
    if (toggleBtn) {
      if (state.isAuctionMode) {
        toggleBtn.classList.add('active-mode');
        toggleBtn.title = 'Offline Auction Mode is Active (Click to Turn OFF)';
      } else {
        toggleBtn.classList.remove('active-mode');
        toggleBtn.title = 'Offline Auction Mode is Inactive (Click to Turn ON)';
      }
    }
    if (setupToggle) setupToggle.checked = state.isAuctionMode;
    if (setupLabel) {
      setupLabel.textContent = state.isAuctionMode ? 'ON' : 'OFF';
      setupLabel.style.color = state.isAuctionMode ? 'var(--gold)' : 'var(--text-muted)';
    }
    if (setupOptions) setupOptions.style.display = state.isAuctionMode ? 'grid' : 'none';
    if (setupBudget && state.startingBudget) setupBudget.value = state.startingBudget.toString();
    if (setupTimer && state.bidTimerDuration !== undefined) setupTimer.value = state.bidTimerDuration.toString();
  }

  function toggleOfflineAuctionMode(forcedValue = null) {
    if (forcedValue !== null) {
      state.isAuctionMode = !!forcedValue;
    } else {
      state.isAuctionMode = !state.isAuctionMode;
    }

    if (state.isAuctionMode) {
      const budget = state.startingBudget || 200000;
      state.players.forEach((p) => {
        if (p.budget === undefined || p.budget === 0) {
          p.budget = budget;
        }
      });
      playSound('rank_sss');
    } else {
      playSound('click');
    }

    updateAuctionUIState();
    renderPlayersDock();
    updateTurnHUD();
  }

  function updateHeaderStats() {
    const totalCountEl = document.getElementById('btn-total-count');
    if (totalCountEl) totalCountEl.textContent = (state.allCharacters || []).length;

    const pCountEl = document.getElementById('btn-player-count');
    if (pCountEl) pCountEl.textContent = `${(state.players || []).length}P`;

    const remainingEl = document.getElementById('remaining-count');
    if (remainingEl) remainingEl.textContent = ensureArray(state.pool).length;

    const totalPoolEl = document.getElementById('total-pool-count');
    if (totalPoolEl) totalPoolEl.textContent = (state.allCharacters || []).length;

    const vaultCountEl = document.getElementById('btn-vault-count');
    if (vaultCountEl) vaultCountEl.textContent = ensureArray(state.archive).length;
  }

  function updateTurnHUD() {
    const playersList = ensureArray(state.players);
    const activePlayer = playersList[state.activePlayerIndex] || playersList[0];
    const turnNameEl = document.getElementById('current-turn-name');
    const localId = getOrSetLocalPlayerId();

    if (turnNameEl && activePlayer) {
      if (mpState.isOnline) {
        if (mpState.isAuctionMode) {
          if (mpState.isHost) {
            turnNameEl.innerHTML = `<span style="color:var(--gold);">👑 HOST PRIVILEGE</span> — Tap Deck to Summon Card to Auction Block!`;
          } else {
            turnNameEl.innerHTML = `<span style="color:var(--gold);">🔥 LIVE AUCTION ARENA</span> — Waiting for Host to Summon Next Card...`;
          }
        } else {
          if (activePlayer.id === localId) {
            turnNameEl.innerHTML = `<span style="color:var(--neon-blue);">⚡ YOUR TURN TO SUMMON</span> (${activePlayer.name})`;
          } else {
            turnNameEl.innerHTML = `⏳ <span style="color:${activePlayer.color};">${activePlayer.name}'s Turn</span> to Summon...`;
          }
        }
      } else if (state.isAuctionMode) {
        turnNameEl.innerHTML = `<span style="color:var(--gold);">🔥 OFFLINE AUCTION BLOCK</span> — All Players Bid! Tap Deck to Summon.`;
      } else {
        turnNameEl.textContent = activePlayer.name;
        turnNameEl.style.color = activePlayer.color;
      }
    }

    const dotEl = document.getElementById('turn-pulse-dot');
    if (dotEl && activePlayer) {
      const isAuction = (state.isAuctionMode || (mpState.isOnline && mpState.isAuctionMode));
      dotEl.style.backgroundColor = isAuction ? '#ffd166' : activePlayer.color;
      dotEl.style.boxShadow = `0 0 12px ${isAuction ? '#ffd166' : activePlayer.color}`;
    }

    // Update summon button text & hint
    const summonBtn = document.getElementById('summon-card-btn');
    if (summonBtn) {
      const uniConfig = getCurrentUniverseConfig();
      if (mpState.isOnline) {
        if (mpState.isAuctionMode) {
          if (mpState.isHost) {
            summonBtn.innerHTML = `🔥 SUMMON TO AUCTION BLOCK 🃏`;
            summonBtn.style.opacity = '1';
            summonBtn.title = 'Summon a random card onto the live auction block for all players to bid!';
          } else {
            summonBtn.innerHTML = `⏳ WAITING FOR HOST TO SUMMON 🃏`;
            summonBtn.style.opacity = '0.75';
            summonBtn.title = 'In Online Auction Mode, the Room Host summons the cards onto the bidding block.';
          }
        } else {
          if (activePlayer && activePlayer.id === localId) {
            summonBtn.innerHTML = `⚡ YOUR TURN: SUMMON CARD 🃏`;
            summonBtn.style.opacity = '1';
          } else {
            summonBtn.innerHTML = `⏳ WAITING FOR ${activePlayer ? activePlayer.name.toUpperCase() : 'PLAYER'}...`;
            summonBtn.style.opacity = '0.75';
          }
        }
      } else if (state.isAuctionMode) {
        summonBtn.innerHTML = `🔥 SUMMON TO AUCTION BLOCK 🃏`;
        summonBtn.style.opacity = '1';
      } else {
        summonBtn.innerHTML = uniConfig.summonBtnText;
        summonBtn.style.opacity = '1';
      }
    }

    updateHeaderStats();

    playersList.forEach((p, idx) => {
      const cardEl = document.getElementById(`player-card-${p.id}`);
      if (cardEl) {
        if (!mpState.isOnline && state.isAuctionMode) {
          cardEl.classList.remove('active-turn');
        } else if (idx === state.activePlayerIndex) {
          cardEl.classList.add('active-turn');
        } else {
          cardEl.classList.remove('active-turn');
        }
      }
    });
  }

  // --- 8. RENDER PLAYERS DOCK (PERMANENT LOCKED SLOTS — NO REPLACEMENT / NO REMOVAL) ---
  function renderPlayersDock() {
    const dock = document.getElementById('players-dock');
    if (!dock) return;

    dock.innerHTML = '';
    const currentRoles = getRoles();

    state.players.forEach((player, idx) => {
      const squadPower = calculateSquadPower(player);
      const filledCount = Object.keys(player.squad).length;
      const activeSynergies = evaluateSquadSynergies(player);

      const playerBudget = mpState.isOnline
        ? (mpState.roomData?.budgets?.[player.id] !== undefined ? mpState.roomData.budgets[player.id] : (mpState.startingBudget || 200000))
        : (player.budget !== undefined ? player.budget : (state.startingBudget || 200000));

      const isAuctionActive = (mpState.isOnline && mpState.isAuctionMode) || (!mpState.isOnline && state.isAuctionMode);
      const budgetHTML = isAuctionActive
        ? `<span class="budget-pill" title="Remaining Treasury Budget">💰 ${formatINR(playerBudget)}</span>`
        : '';

      const pCard = document.createElement('div');
      pCard.id = `player-card-${player.id}`;
      pCard.className = `player-card ${(idx === state.activePlayerIndex && !state.isAuctionMode) ? 'active-turn' : ''}`;

      let synergiesHTML = '';
      if (activeSynergies.length > 0) {
        synergiesHTML = `
          <div class="active-synergies-row">
            ${activeSynergies.map((s) => `<span class="synergy-chip" title="${s.description}">${s.icon} ${s.name} (+${s.boostPercent}%)</span>`).join('')}
          </div>
        `;
      }

      let rolesHTML = '';
      currentRoles.forEach((role) => {
        const slotted = player.squad[role.key];

        if (slotted) {
          let tierClass = 'tier-a';
          if (slotted.tier_category === 'SSS') tierClass = 'tier-sss';
          else if (slotted.tier_category === 'SS') tierClass = 'tier-ss';
          else if (slotted.tier_category === 'S') tierClass = 'tier-s';
          else if (slotted.tier_category === 'A+') tierClass = 'tier-aplus';

          const effectivePower = calculateCharacterCombatPower(slotted, role.key);

          rolesHTML += `
            <div class="role-slot-row filled" data-role="${role.key}" style="cursor:default;" title="Locked: ${slotted.name} (${role.name})">
              <div class="role-tag-name">
                <span>${role.icon}</span> ${role.name}
              </div>
              <div class="role-slot-content">
                <span class="slotted-hunter-tier ${tierClass}">${slotted.tier_category}</span>
                <span class="slotted-hunter-info">${slotted.name}</span>
                <span class="slotted-hunter-power">⚡ ${(effectivePower / 1000).toFixed(0)}k</span>
                <span style="font-size:0.8rem; color:#94a3b8; margin-left:4px;" title="Permanently Locked">🔒</span>
              </div>
            </div>
          `;
        } else {
          rolesHTML += `
            <div class="role-slot-row" data-role="${role.key}" style="cursor:default;">
              <div class="role-tag-name">
                <span>${role.icon}</span> ${role.name}
              </div>
              <div class="role-slot-content">
                <span class="slot-empty-label">+ Open Slot</span>
              </div>
            </div>
          `;
        }
      });

      pCard.innerHTML = `
        <div class="player-header">
          <div class="player-title-row">
            <span class="player-badge-num" style="background:${player.color}22; color:${player.color}; border:1px solid ${player.color}66;">P${idx + 1}</span>
            <span class="player-name-text" style="color:${player.color};">${player.name}</span>
            ${budgetHTML}
          </div>
          <div class="player-power-pill" data-player="${player.id}" title="Click to view power formula breakdown">
            ⚡ ${squadPower.toLocaleString()} PWR (${filledCount}/${state.maxPicksPerPlayer}) ℹ️
          </div>
        </div>
        ${synergiesHTML}
        <div class="squad-roles-grid">
          ${rolesHTML}
        </div>
      `;

      dock.appendChild(pCard);
    });

    // Attach power breakdown click
    dock.querySelectorAll('.player-power-pill').forEach((pill) => {
      pill.addEventListener('click', () => {
        const pId = pill.dataset.player;
        const player = state.players.find((p) => p.id === pId);
        if (player) openPowerDetailsModal(player);
      });
    });
  }

  // --- 9. DRAW CARD & REVEAL FLOW (STRICT PERMANENT DRAFT + ONLINE REAL-TIME SYNC) ---
  function drawRandomCard() {
    if (mpState.isOnline) {
      if (mpState.isAuctionMode) {
        if (!mpState.isHost) {
          alert('⏳ In Online Auction Mode, only the Room Host can summon cards onto the auction block!');
          return;
        }
      } else {
        const activePlayer = ensureArray(state.players)[state.activePlayerIndex];
        const localId = getOrSetLocalPlayerId();
        if (activePlayer && activePlayer.id !== localId && !mpState.isHost) {
          alert(`⏳ It is currently ${activePlayer.name}'s turn to summon a card!`);
          return;
        }
      }
    }

    // Ensure pool has valid cards
    let poolList = ensureArray(state.pool);
    if (poolList.length === 0) {
      const activeUni = (mpState.isOnline && mpState.roomData?.universe) ? mpState.roomData.universe : state.universe;
      const freshList = typeof window.getStoredCharacters === 'function'
        ? window.getStoredCharacters(activeUni)
        : (state.allCharacters && state.allCharacters.length ? state.allCharacters : (window.DEFAULT_SOLO_CHARACTERS || []));
      state.pool = JSON.parse(JSON.stringify(freshList));
      poolList = state.pool;
    }

    if (poolList.length === 0) {
      alert('⚡ The Dimensional Gate is empty! All characters have been drafted or auctioned.');
      return;
    }

    // Trigger 3D Summoning Card Launch Animation from Deck
    const topCard = document.getElementById('deck-top-card');
    if (topCard) {
      topCard.classList.remove('summoning-active');
      void topCard.offsetWidth; // Force reflow
      topCard.classList.add('summoning-active');
      setTimeout(() => {
        topCard.classList.remove('summoning-active');
      }, 750);
    }

    // Trigger Magic Summoning Circle Overdrive
    const magicCircle = document.getElementById('magic-summon-circle');
    if (magicCircle) {
      magicCircle.classList.remove('circle-overdrive');
      void magicCircle.offsetWidth;
      magicCircle.classList.add('circle-overdrive');
      setTimeout(() => magicCircle.classList.remove('circle-overdrive'), 800);
    }

    // Trigger Fullscreen Shockwave Flash
    const shockwave = document.getElementById('summon-shockwave-overlay');
    if (shockwave) {
      shockwave.classList.remove('active');
      void shockwave.offsetWidth;
      shockwave.classList.add('active');
      setTimeout(() => shockwave.classList.remove('active'), 600);
    }

    playSound('draw');

    const randomIndex = Math.floor(Math.random() * poolList.length);
    const drawn = poolList[randomIndex];
    if (!drawn) {
      alert('Error summoning card. Please try again.');
      return;
    }
    state.drawnCard = drawn;

    if (mpState.isOnline && mpState.roomRef) {
      if (mpState.isAuctionMode) {
        const duration = mpState.bidTimerDuration || 15;
        const startingBid = 5000;
        setTimeout(() => {
          mpState.roomRef.update({
            currentAuction: {
              active: true,
              status: 'bidding',
              char: drawn,
              currentBid: startingBid,
              highestBidderId: null,
              highestBidderName: 'Starting Price (No Bids)',
              highestBidderColor: '#ffd166',
              expiresAt: Date.now() + duration * 1000,
              duration: duration,
              feed: [`⚡ ${drawn.name} (${drawn.tier_category}) presented on auction block at ${formatINR(startingBid)}!`]
            }
          });
        }, 350);
      } else {
        const activeP = state.players[state.activePlayerIndex] || { id: mpState.localPlayerId, name: mpState.localPlayerName };
        setTimeout(() => {
          mpState.roomRef.update({
            currentDraft: {
              isOpen: true,
              char: drawn,
              drawerId: activeP.id,
              drawerName: activeP.name
            }
          });
        }, 350);
      }
    } else {
      if (state.isAuctionMode) {
        state.players.forEach((p) => { p.folded = false; });
        const firstEligibleIdx = state.players.findIndex(
          (p) => Object.keys(p.squad || {}).length < state.maxPicksPerPlayer
        );
        state.offlineActiveBidderIndex = firstEligibleIdx >= 0 ? firstEligibleIdx : 0;
        const duration = state.bidTimerDuration !== undefined ? state.bidTimerDuration : 15;
        const startingBid = 5000;
        state.currentAuction = {
          active: true,
          status: 'bidding',
          char: drawn,
          currentBid: startingBid,
          highestBidderId: null,
          highestBidderName: 'Starting Price (No Bids)',
          highestBidderColor: '#ffd166',
          highestBidderIndex: null,
          expiresAt: duration > 0 ? (Date.now() + duration * 1000) : null,
          duration: duration,
          feed: [`⚡ ${drawn.name} (${drawn.tier_category}) presented on auction block at ${formatINR(startingBid)}!`]
        };
        setTimeout(() => {
          syncOfflineAuctionModal();
        }, 350);
      } else {
        setTimeout(() => {
          openCharacterRevealModal(drawn);
        }, 350);
      }
    }
  }

  function openCharacterRevealModal(char, drawerId = null, drawerName = null) {
    const modal = document.getElementById('character-modal');
    if (!modal) return;

    const isGodTier = char.tier_category === 'SSS' || char.tier_category === 'SS';
    if (isGodTier) playSound('rank_sss');

    const activePlayer = state.players[state.activePlayerIndex] || { squad: {}, name: 'Active Player', id: 'p1' };
    const currentDrawerId = drawerId || activePlayer.id;
    const currentDrawerName = drawerName || activePlayer.name;

    const localId = getOrSetLocalPlayerId();
    const isMyTurn = !mpState.isOnline || (localId === currentDrawerId);

    // Monarch Aura & System Tag Update
    const flamesEl = document.getElementById('monarch-aura-flames');
    if (flamesEl) {
      if (isGodTier) flamesEl.classList.add('active-monarch');
      else flamesEl.classList.remove('active-monarch');
    }

    const sysTag = document.getElementById('reveal-system-tag');
    if (sysTag) {
      if (char.tier_category === 'SSS') sysTag.textContent = '👑 [ SYSTEM: GOD TIER ENTITY DETECTED ]';
      else if (char.tier_category === 'SS') sysTag.textContent = '⚔️ [ SYSTEM: MONARCH / RULER DETECTED ]';
      else sysTag.textContent = '✨ [ SYSTEM: HUNTER SUMMON REVEALED ]';
    }

    const rankEl = document.getElementById('reveal-rank');
    rankEl.textContent = char.tier;
    rankEl.className = `reveal-rank-banner tier-${(char.tier_category || 'A').toLowerCase().replace('+', 'plus')}`;

    const avatarImg = document.getElementById('reveal-avatar-img');
    const symbolEl = document.getElementById('reveal-avatar-symbol');

    if (avatarImg) {
      if (char.image) {
        avatarImg.src = char.image;
        avatarImg.alt = char.name;
        avatarImg.style.display = 'block';
        avatarImg.onerror = () => {
          avatarImg.style.display = 'none';
          if (symbolEl) symbolEl.style.display = 'block';
        };
        if (symbolEl) symbolEl.style.display = 'none';
      } else {
        avatarImg.style.display = 'none';
        if (symbolEl) symbolEl.style.display = 'block';
      }
    }
    if (symbolEl && !char.image) {
      symbolEl.textContent = char.symbol || '⚔️';
      symbolEl.style.display = 'block';
    }

    document.getElementById('reveal-name').textContent = char.name;
    document.getElementById('reveal-title').textContent = char.title || char.role || 'Hunter';

    // 3D Interactive Mouse Tilt & Holographic Foil Reflection
    const innerCard = document.getElementById('hologram-card-inner');
    const foilOverlay = document.getElementById('hologram-foil-overlay');
    if (innerCard) {
      innerCard.onmousemove = (e) => {
        const rect = innerCard.getBoundingClientRect();
        const x = e.clientX - rect.left - rect.width / 2;
        const y = e.clientY - rect.top - rect.height / 2;
        const rotateX = (-y / rect.height) * 18;
        const rotateY = (x / rect.width) * 18;
        innerCard.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale(1.02)`;
        if (foilOverlay) {
          const bgX = (e.clientX - rect.left) / rect.width * 100;
          const bgY = (e.clientY - rect.top) / rect.height * 100;
          foilOverlay.style.backgroundPosition = `${bgX}% ${bgY}%`;
          foilOverlay.style.opacity = '0.75';
        }
      };
      innerCard.onmouseleave = () => {
        innerCard.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg) scale(1)';
        if (foilOverlay) foilOverlay.style.opacity = '0.45';
      };
    }

    // Animated rolling counter for power number
    const targetPower = char.power_number || 100000;
    const powerNumEl = document.getElementById('reveal-power-num');
    if (powerNumEl) {
      const startTime = performance.now();
      const duration = 650;
      function animatePower(now) {
        const elapsed = now - startTime;
        const progress = Math.min(1, elapsed / duration);
        const easeOut = 1 - Math.pow(1 - progress, 3);
        const currentVal = Math.round(targetPower * easeOut);
        powerNumEl.textContent = `⚡ ${currentVal.toLocaleString()} PWR (PL: ${char.power_level || 50})`;
        if (progress < 1) {
          requestAnimationFrame(animatePower);
        }
      }
      requestAnimationFrame(animatePower);
    }

    const stats = char.stats || {
      raw_power: 8,
      hax: 8,
      speed: 8,
      durability: 8,
      synergy: 8,
      battle_iq: 8
    };

    document.getElementById('stat-raw-power').textContent = `${stats.raw_power}`;
    document.getElementById('stat-hax').textContent = `${stats.hax}`;
    document.getElementById('stat-speed').textContent = `${stats.speed}`;
    document.getElementById('stat-durability').textContent = `${stats.durability}`;
    document.getElementById('stat-synergy').textContent = `${stats.synergy}`;
    document.getElementById('stat-battle-iq').textContent = `${stats.battle_iq}`;

    setTimeout(() => {
      document.getElementById('bar-raw-power').style.width = `${stats.raw_power * 10}%`;
      document.getElementById('bar-hax').style.width = `${stats.hax * 10}%`;
      document.getElementById('bar-speed').style.width = `${stats.speed * 10}%`;
      document.getElementById('bar-durability').style.width = `${stats.durability * 10}%`;
      document.getElementById('bar-synergy').style.width = `${stats.synergy * 10}%`;
      document.getElementById('bar-battle-iq').style.width = `${stats.battle_iq * 10}%`;
    }, 50);

    document.getElementById('reveal-desc').textContent = char.description || '';
    document.getElementById('reveal-feats').textContent = `🏆 Feats: ${char.feats || 'Canon combat achievements.'}`;
    document.getElementById('reveal-quote').textContent = `"${char.quote || 'Arise.'}"`;

    // Role assignment buttons for active player (STRICT NO REPLACEMENT RULE)
    const roleBtnsContainer = document.getElementById('reveal-role-buttons');
    roleBtnsContainer.innerHTML = '';

    const drawerPlayer = (mpState.isOnline
      ? state.players.find(p => p.id === currentDrawerId)
      : activePlayer) || activePlayer;
    const currentSquad = (drawerPlayer && drawerPlayer.squad) ? drawerPlayer.squad : {};

    let availableSlotsCount = 0;
    const currentRoles = getRoles();

    currentRoles.forEach((role) => {
      const isEligible = char.eligible_roles && char.eligible_roles.includes(role.key);
      const isSlotOccupied = !!currentSquad[role.key];

      const btn = document.createElement('button');
      btn.type = 'button';

      if (!isMyTurn) {
        btn.disabled = true;
        btn.className = 'btn-assign-role';
        btn.style.opacity = '0.45';
        btn.style.cursor = 'not-allowed';
        btn.style.pointerEvents = 'none';
        btn.innerHTML = `${role.icon} ${role.name} ${isSlotOccupied ? '🔒' : ''}`;
      } else if (isSlotOccupied) {
        // Disabled & locked: NO REPLACEMENT ALLOWED
        btn.disabled = true;
        btn.className = 'btn-assign-role';
        btn.style.opacity = '0.35';
        btn.style.cursor = 'not-allowed';
        btn.style.pointerEvents = 'none';
        btn.style.borderColor = 'rgba(255,255,255,0.1)';
        btn.innerHTML = `${role.icon} ${role.name} <span style="font-size:0.7rem; color:#94a3b8;">(Occupied 🔒)</span>`;
      } else {
        // Open slot: can assign
        availableSlotsCount++;
        btn.className = `btn-assign-role ${isEligible ? 'recommended' : ''}`;
        btn.innerHTML = `${role.icon} ${role.name} ${isEligible ? '⭐ (Best Fit)' : ''}`;

        btn.addEventListener('click', () => {
          assignCardToRole(drawerPlayer, role.key, char);
        });
      }

      roleBtnsContainer.appendChild(btn);
    });

    const discardBtn = document.getElementById('btn-discard-card');
    if (discardBtn) {
      if (!isMyTurn) {
        discardBtn.disabled = true;
        discardBtn.style.opacity = '0.4';
        discardBtn.style.pointerEvents = 'none';
        discardBtn.textContent = `⏳ Spectating: Waiting for ${currentDrawerName} to choose...`;
      } else {
        discardBtn.disabled = false;
        discardBtn.style.opacity = '1';
        discardBtn.style.pointerEvents = 'auto';
        discardBtn.textContent = '🗑️ Discard / Disperse to Void (Cannot Be Drawn Again)';
      }
    }

    if (isMyTurn && availableSlotsCount === 0) {
      const notice = document.createElement('div');
      notice.style.gridColumn = '1 / -1';
      notice.style.color = '#ffd166';
      notice.style.fontSize = '0.85rem';
      notice.style.padding = '0.4rem';
      notice.innerHTML = '⚠️ All 7 squad positions are filled! You must discard this card.';
      roleBtnsContainer.prepend(notice);
    } else if (!isMyTurn) {
      const notice = document.createElement('div');
      notice.style.gridColumn = '1 / -1';
      notice.style.color = 'var(--neon-blue)';
      notice.style.fontSize = '0.85rem';
      notice.style.padding = '0.4rem';
      notice.innerHTML = `👁️ Spectator Mode: Live reveal for <strong>${currentDrawerName}</strong>`;
      roleBtnsContainer.prepend(notice);
    }

    modal.showModal();
  }

  function assignCardToRole(player, roleKey, char) {
    if (player.squad && player.squad[roleKey]) {
      alert('This slot is already filled! No replacements allowed.');
      return;
    }

    const prevSynergies = evaluateSquadSynergies(player).map(s => s.id);

    if (mpState.isOnline && mpState.roomRef) {
      const localId = getOrSetLocalPlayerId();
      if (player.id !== localId && !mpState.isHost) {
        alert("Only the active summoner can assign this card!");
        return;
      }

      // Clone players and update target squad
      const updatedPlayers = JSON.parse(JSON.stringify(ensureArray(state.players)));
      const targetP = updatedPlayers.find(p => p.id === player.id);
      if (targetP) {
        if (!targetP.squad) targetP.squad = {};
        targetP.squad[roleKey] = char;
      }

      const updatedPool = ensureArray(state.pool).filter(c => c.id !== char.id);
      const updatedArchive = [...ensureArray(state.archive), {
        character: char,
        status: 'assigned',
        player: player.name,
        role: roleKey
      }];

      const nextPlayerIndex = (state.activePlayerIndex + 1) % (updatedPlayers.length || 1);
      const allFilled = updatedPlayers.every(
        p => Object.keys(p.squad || {}).length >= state.maxPicksPerPlayer
      );

      playSound('assign');
      const modal = document.getElementById('character-modal');
      if (modal && modal.open) modal.close();

      mpState.roomRef.update({
        players: updatedPlayers,
        pool: updatedPool,
        archive: updatedArchive,
        currentDraft: null,
        currentPlayerIndex: nextPlayerIndex,
        status: allFilled ? 'completed' : 'drafting'
      });
      return;
    }

    // Offline mode
    if (!player.squad) player.squad = {};
    player.squad[roleKey] = char;

    const pIdx = state.pool.findIndex((c) => c.id === char.id);
    if (pIdx !== -1) {
      state.pool.splice(pIdx, 1);
    }

    state.archive.push({
      character: char,
      status: 'assigned',
      player: player.name,
      role: roleKey
    });

    playSound('assign');

    const modal = document.getElementById('character-modal');
    if (modal && modal.open) modal.close();

    // Check newly unlocked synergies and show celebratory toast
    const newSynergies = evaluateSquadSynergies(player);
    newSynergies.forEach((syn) => {
      if (!prevSynergies.includes(syn.id)) {
        showSynergyToast(syn);
      }
    });

    renderPlayersDock();
    updateTurnHUD();

    // Trigger visual slot lock animation
    setTimeout(() => {
      const slotRow = document.querySelector(`#player-card-${player.id} [data-role="${roleKey}"]`);
      if (slotRow) {
        slotRow.classList.add('slot-just-assigned');
        setTimeout(() => slotRow.classList.remove('slot-just-assigned'), 1000);
      }
    }, 50);

    checkDraftCompletion();

    state.activePlayerIndex = (state.activePlayerIndex + 1) % state.players.length;
    updateTurnHUD();
  }

  function discardCard() {
    if (!state.drawnCard) return;

    if (mpState.isOnline && mpState.roomRef) {
      const activePlayer = state.players[state.activePlayerIndex];
      const localId = getOrSetLocalPlayerId();
      if (activePlayer && activePlayer.id !== localId && !mpState.isHost) {
        alert("Only the active summoner can discard this card!");
        return;
      }

      const char = state.drawnCard;
      const updatedPool = ensureArray(state.pool).filter(c => c.id !== char.id);
      const updatedArchive = [...ensureArray(state.archive), {
        character: char,
        status: 'discarded',
        player: activePlayer ? activePlayer.name : mpState.localPlayerName,
        role: 'None'
      }];
      const playersList = ensureArray(state.players);
      const nextPlayerIndex = (state.activePlayerIndex + 1) % (playersList.length || 1);

      playSound('discard');
      const modal = document.getElementById('character-modal');
      if (modal && modal.open) modal.close();

      mpState.roomRef.update({
        pool: updatedPool,
        archive: updatedArchive,
        currentDraft: null,
        currentPlayerIndex: nextPlayerIndex
      });
      return;
    }

    // Offline mode
    state.pool = ensureArray(state.pool);
    state.archive = ensureArray(state.archive);
    const pIdx = state.pool.findIndex((c) => c.id === state.drawnCard.id);
    if (pIdx !== -1) {
      state.pool.splice(pIdx, 1);
    }

    const activePlayer = state.players[state.activePlayerIndex];
    state.archive.push({
      character: state.drawnCard,
      status: 'discarded',
      player: activePlayer.name,
      role: 'None'
    });

    playSound('discard');

    const modal = document.getElementById('character-modal');
    if (modal && modal.open) modal.close();

    updateTurnHUD();

    state.activePlayerIndex = (state.activePlayerIndex + 1) % state.players.length;
    updateTurnHUD();
  }

  function checkDraftCompletion() {
    const allFilled = state.players.every(
      (p) => Object.keys(p.squad || {}).length >= state.maxPicksPerPlayer
    );

    if (allFilled) {
      setTimeout(() => {
        openVictoryModal();
      }, 500);
    }
  }

  // --- 10. POWER DETAILS MODAL ---
  function openPowerDetailsModal(player) {
    const modal = document.getElementById('power-details-modal');
    if (!modal) return;

    document.getElementById('power-details-title').textContent = `⚡ ${player.name} Power Breakdown`;
    const body = document.getElementById('power-details-body');

    let html = `
      <div style="background:rgba(0,0,0,0.3); padding:0.8rem; border-radius:8px; margin-bottom:0.8rem;">
        <strong style="color:var(--neon-blue);">Power Formula:</strong><br>
        <span style="font-size:0.78rem; color:#94a3b8;">
          [Base Power] × [Stat Multiplier: Raw(30%) + Hax(20%) + Spd(15%) + Dur(10%) + Syn(15%) + BIQ(10%)]
          + [15% Role Match Bonus] + [10% Monarch Leader Aura] × [Canon Synergy Multipliers].
        </span>
      </div>
      <div style="display:flex; flex-direction:column; gap:0.5rem;">
    `;

    const currentRoles = getRoles();
    currentRoles.forEach((r) => {
      const char = player.squad[r.key];
      if (char) {
        const isRoleMatch = char.eligible_roles && char.eligible_roles.includes(r.key);
        const effective = calculateCharacterCombatPower(char, r.key);
        html += `
          <div style="display:flex; justify-content:space-between; border-bottom:1px solid rgba(255,255,255,0.08); padding-bottom:0.3rem;">
            <span>${r.icon} <strong>${r.name}:</strong> ${char.name} ${isRoleMatch ? '<span style="color:#06d6a0;">(+15% Match)</span>' : ''}</span>
            <strong style="color:var(--gold);">⚡ ${effective.toLocaleString()} PWR</strong>
          </div>
        `;
      } else {
        html += `
          <div style="display:flex; justify-content:space-between; opacity:0.4;">
            <span>${r.icon} ${r.name}: Empty</span>
            <span>0 PWR</span>
          </div>
        `;
      }
    });

    const leader = player.squad['LEADER'];
    if (leader && (leader.tier_category === 'SSS' || leader.tier_category === 'SS')) {
      html += `
        <div style="margin-top:0.6rem; color:var(--monarch-purple); font-weight:800;">
          👑 Monarch / Ruler Leader Synergy Active: +10% Total Squad Multiplier!
        </div>
      `;
    }

    const activeSynergies = evaluateSquadSynergies(player);
    if (activeSynergies.length > 0) {
      html += `
        <div style="margin-top:0.8rem; background:rgba(255, 209, 102, 0.08); padding:0.6rem; border-radius:6px; border:1px solid rgba(255, 209, 102, 0.25);">
          <strong style="color:var(--gold); font-size:0.85rem;">✨ Active Canon Synergies:</strong>
          <div style="display:flex; flex-direction:column; gap:0.3rem; margin-top:0.4rem;">
            ${activeSynergies.map((s) => `
              <div style="font-size:0.8rem; color:#f0f4f8; display:flex; justify-content:space-between;">
                <span>${s.icon} <strong>${s.name}:</strong> <span style="color:#94a3b8;">${s.description}</span></span>
                <strong style="color:#06d6a0;">+${s.boostPercent}%</strong>
              </div>
            `).join('')}
          </div>
        </div>
      `;
    }

    html += `
      </div>
      <div style="margin-top:1rem; text-align:right; font-size:1.1rem; font-weight:900; color:var(--gold);">
        TOTAL SQUAD COMBAT POWER: ⚡ ${calculateSquadPower(player).toLocaleString()} PWR
      </div>
    `;

    body.innerHTML = html;
    modal.showModal();
  }

  // --- 11. DIMENSIONAL ARCHIVE & VAULT MODAL ---
  function openArchiveModal() {
    const modal = document.getElementById('archive-modal');
    if (!modal) return;

    document.getElementById('archive-count-display').textContent = state.archive.length;
    const grid = document.getElementById('archive-grid');
    grid.innerHTML = '';

    if (state.archive.length === 0) {
      grid.innerHTML = `<div style="grid-column: 1/-1; text-align:center; color:var(--text-muted); padding:2rem;">No characters drafted or discarded yet in this match.</div>`;
    } else {
      state.archive.forEach((item) => {
        const char = item.character;
        const card = document.createElement('div');
        card.className = 'archive-card';
        card.innerHTML = `
          <div style="display:flex; justify-content:space-between; align-items:center;">
            <strong>${char.symbol || '⚔️'} ${char.name}</strong>
            <span class="slotted-hunter-tier tier-${char.tier_category.toLowerCase().replace('+', 'plus')}">${char.tier_category}</span>
          </div>
          <div style="font-size:0.75rem; color:var(--gold);">⚡ ${char.power_number.toLocaleString()} PWR</div>
          <div style="font-size:0.78rem; margin-top:0.3rem;">
            ${item.status === 'assigned' ? `<span style="color:#06d6a0;">✅ Drafted by ${item.player} (${item.role})</span>` : `<span style="color:#ff0054;">🗑️ Discarded by ${item.player} (No Backup)</span>`}
          </div>
        `;
        grid.appendChild(card);
      });
    }

    modal.showModal();
  }

  // --- 12. BATTLE ARENA & GRAND TOURNAMENT BRACKET ---
  function initBattleArena() {
    const modal = document.getElementById('battle-modal');
    if (!modal) return;

    const p1Select = document.getElementById('battle-p1-select');
    const p2Select = document.getElementById('battle-p2-select');

    p1Select.innerHTML = '';
    p2Select.innerHTML = '';

    state.players.forEach((p, idx) => {
      const opt1 = document.createElement('option');
      opt1.value = p.id;
      opt1.textContent = `${p.name} (⚡ ${calculateSquadPower(p).toLocaleString()} PWR)`;
      if (idx === 0) opt1.selected = true;
      p1Select.appendChild(opt1);

      const opt2 = document.createElement('option');
      opt2.value = p.id;
      opt2.textContent = `${p.name} (⚡ ${calculateSquadPower(p).toLocaleString()} PWR)`;
      if (idx === 1 || (state.players.length === 1 && idx === 0)) opt2.selected = true;
      p2Select.appendChild(opt2);
    });

    updateBattleStagePreview();
    modal.showModal();
  }

  function updateBattleStagePreview() {
    const p1Id = document.getElementById('battle-p1-select').value;
    const p2Id = document.getElementById('battle-p2-select').value;

    const p1 = state.players.find((p) => p.id === p1Id);
    const p2 = state.players.find((p) => p.id === p2Id);

    if (p1) {
      document.getElementById('battle-name-p1').textContent = p1.name;
      document.getElementById('battle-name-p1').style.color = p1.color;
      document.getElementById('battle-power-p1').textContent = `⚡ ${calculateSquadPower(p1).toLocaleString()} PWR`;
      document.getElementById('battle-hp-p1').style.width = '100%';
    }
    if (p2) {
      document.getElementById('battle-name-p2').textContent = p2.name;
      document.getElementById('battle-name-p2').style.color = p2.color;
      document.getElementById('battle-power-p2').textContent = `⚡ ${calculateSquadPower(p2).toLocaleString()} PWR`;
      document.getElementById('battle-hp-p2').style.width = '100%';
    }

    const feed = document.getElementById('battle-combat-feed');
    feed.innerHTML = `<div class="battle-log-entry">⚔️ Matchup Selected: <strong>${p1?.name || 'Player 1'}</strong> vs <strong>${p2?.name || 'Player 2'}</strong>. Click 'SIMULATE SQUAD BATTLE' to commence combat!</div>`;
  }

  function simulateBattle() {
    const p1Id = document.getElementById('battle-p1-select').value;
    const p2Id = document.getElementById('battle-p2-select').value;

    if (p1Id === p2Id) {
      alert('Please select two different guild squads to battle!');
      return;
    }

    const p1 = state.players.find((p) => p.id === p1Id);
    const p2 = state.players.find((p) => p.id === p2Id);
    if (!p1 || !p2) return;

    const feed = document.getElementById('battle-combat-feed');
    feed.innerHTML = '';

    const p1Pwr = calculateSquadPower(p1);
    const p2Pwr = calculateSquadPower(p2);

    let p1Hp = 100;
    let p2Hp = 100;

    const currentRoles = getRoles();
    const clashRounds = [];

    // Construct 7 Role-vs-Role Duel Rounds
    currentRoles.forEach((role, idx) => {
      const c1 = p1.squad[role.key];
      const c2 = p2.squad[role.key];

      const c1Name = c1 ? c1.name : `Open ${role.name}`;
      const c2Name = c2 ? c2.name : `Open ${role.name}`;
      const c1Pwr = c1 ? calculateCharacterCombatPower(c1, role.key) : 10000;
      const c2Pwr = c2 ? calculateCharacterCombatPower(c2, role.key) : 10000;

      const c1Skill = c1?.abilities?.[0] || 'Standard Technique';
      const c2Skill = c2?.abilities?.[0] || 'Standard Technique';

      // Critical hit chances
      const isCrit1 = Math.random() < 0.28;
      const isCrit2 = Math.random() < 0.28;
      const ratio1 = c1Pwr / (c1Pwr + c2Pwr + 1);
      const ratio2 = c2Pwr / (c1Pwr + c2Pwr + 1);

      const p1DmgTaken = Math.round((7 + ratio2 * 12) * (isCrit2 ? 1.4 : 1.0));
      const p2DmgTaken = Math.round((7 + ratio1 * 12) * (isCrit1 ? 1.4 : 1.0));

      const winnerTag = c1Pwr >= c2Pwr
        ? `<span style="color:${p1.color}; font-weight:bold;">${c1Name}</span> gains upper hand (+${(c1Pwr/1000).toFixed(0)}k PWR)`
        : `<span style="color:${p2.color}; font-weight:bold;">${c2Name}</span> gains upper hand (+${(c2Pwr/1000).toFixed(0)}k PWR)`;

      clashRounds.push({
        text: `
          <div style="margin-bottom:0.2rem;">
            <strong>ROUND ${idx + 1} — ${role.icon} ${role.name.toUpperCase()} DUEL:</strong>
          </div>
          <div style="font-size:0.83rem; line-height:1.45;">
            <strong style="color:${p1.color}">${c1Name}</strong> <em>[${c1Skill}]</em> vs 
            <strong style="color:${p2.color}">${c2Name}</strong> <em>[${c2Skill}]</em><br>
            ➔ ${winnerTag} ${isCrit1 ? '🔥 CRITICAL HIT!' : ''} ${isCrit2 ? '⚡ COUNTER CRIT!' : ''}
          </div>
        `,
        p1Dmg: p1DmgTaken,
        p2Dmg: p2DmgTaken
      });
    });

    // Grand Finale: Sovereign Domain & Ultimate Synergy Clash
    const p1Syns = evaluateSquadSynergies(p1);
    const p2Syns = evaluateSquadSynergies(p2);
    const p1SynText = p1Syns.length ? p1Syns.map(s => s.name).join(' & ') : 'Squad Resonance';
    const p2SynText = p2Syns.length ? p2Syns.map(s => s.name).join(' & ') : 'Squad Resonance';

    clashRounds.push({
      text: `
        <div style="margin-bottom:0.2rem; color:var(--gold);">
          <strong>👑 FINAL ROUND 8 — TOTAL SQUAD DOMAIN OVERDRIVE:</strong>
        </div>
        <div style="font-size:0.85rem; line-height:1.45;">
          <strong style="color:${p1.color}">${p1.name}</strong> unleashes <em>${p1SynText}</em> against 
          <strong style="color:${p2.color}">${p2.name}</strong>'s <em>${p2SynText}</em> in an apocalyptic battlefield climax!
        </div>
      `,
      p1Dmg: Math.round(14 * (p2Pwr / (p1Pwr + p2Pwr + 1))),
      p2Dmg: Math.round(14 * (p1Pwr / (p1Pwr + p2Pwr + 1)))
    });

    let currentRound = 0;

    function playRound() {
      if (currentRound < clashRounds.length) {
        const r = clashRounds[currentRound];
        playSound('clash');

        p1Hp = Math.max(0, p1Hp - r.p1Dmg);
        p2Hp = Math.max(0, p2Hp - r.p2Dmg);

        document.getElementById('battle-hp-p1').style.width = `${p1Hp}%`;
        document.getElementById('battle-hp-p2').style.width = `${p2Hp}%`;

        const logEntry = document.createElement('div');
        logEntry.className = 'battle-log-entry';
        logEntry.innerHTML = r.text;
        feed.appendChild(logEntry);
        feed.scrollTop = feed.scrollHeight;

        currentRound++;
        setTimeout(playRound, 750);
      } else {
        const finalP1Score = p1Pwr * (p1Hp + 15);
        const finalP2Score = p2Pwr * (p2Hp + 15);

        const winner = finalP1Score >= finalP2Score ? p1 : p2;
        const loser = finalP1Score >= finalP2Score ? p2 : p1;

        if (winner === p1) {
          document.getElementById('battle-hp-p2').style.width = '0%';
        } else {
          document.getElementById('battle-hp-p1').style.width = '0%';
        }

        playSound('victory');
        triggerConfetti();

        const winEntry = document.createElement('div');
        winEntry.className = 'battle-log-entry';
        winEntry.style.borderLeftColor = 'var(--gold)';
        winEntry.style.background = 'rgba(255, 209, 102, 0.14)';
        winEntry.innerHTML = `
          🏆 <strong>VICTORY DECLARED!</strong><br>
          <strong style="color:${winner.color}; font-size:1.1rem;">${winner.name}</strong> (⚡${calculateSquadPower(winner).toLocaleString()} PWR) triumphs over ${loser.name} through superior squad power and tactical synergy!
        `;
        feed.appendChild(winEntry);
        feed.scrollTop = feed.scrollHeight;
      }
    }

    playRound();
  }

  function runGrandTournament() {
    if (state.players.length < 2) {
      alert('Need at least 2 players to run a tournament!');
      return;
    }

    const feed = document.getElementById('battle-combat-feed');
    feed.innerHTML = `<div class="battle-log-entry" style="color:var(--gold);">🏆 <strong>COMMENCING GRAND GUILD TOURNAMENT BRACKET...</strong></div>`;

    const bracket = [...state.players].sort(
      (a, b) => calculateSquadPower(b) - calculateSquadPower(a)
    );

    let contenders = [...bracket];

    function runTournamentRound() {
      if (contenders.length > 1) {
        const nextRound = [];
        for (let i = 0; i < contenders.length; i += 2) {
          if (i + 1 < contenders.length) {
            const pA = contenders[i];
            const pB = contenders[i + 1];
            const pAPwr = calculateSquadPower(pA);
            const pBPwr = calculateSquadPower(pB);
            const winner = pAPwr >= pBPwr ? pA : pB;

            const entry = document.createElement('div');
            entry.className = 'battle-log-entry';
            entry.innerHTML = `⚔️ <strong>Match ${Math.floor(i / 2) + 1}:</strong> <strong style="color:${pA.color}">${pA.name}</strong> (⚡${(pAPwr / 1000).toFixed(0)}k) vs <strong style="color:${pB.color}">${pB.name}</strong> (⚡${(pBPwr / 1000).toFixed(0)}k) ➔ <strong style="color:var(--gold);">Winner: ${winner.name}</strong>`;
            feed.appendChild(entry);
            feed.scrollTop = feed.scrollHeight;

            nextRound.push(winner);
          } else {
            nextRound.push(contenders[i]);
          }
        }
        contenders = nextRound;
        setTimeout(runTournamentRound, 1000);
      } else {
        const champion = contenders[0];
        playSound('victory');
        triggerConfetti();

        const champEntry = document.createElement('div');
        champEntry.className = 'battle-log-entry';
        champEntry.style.borderLeftColor = 'var(--gold)';
        champEntry.style.background = 'rgba(255, 209, 102, 0.18)';
        champEntry.innerHTML = `👑 <strong>TOURNAMENT CHAMPION:</strong> <strong style="color:${champion.color}; font-size:1.15rem;">${champion.name}</strong> has conquered the Sovereign Arena with ⚡ ${calculateSquadPower(champion).toLocaleString()} PWR!`;
        feed.appendChild(champEntry);
        feed.scrollTop = feed.scrollHeight;
      }
    }

    runTournamentRound();
  }

  // --- 13. ROSTER MANAGER & EXPORT/IMPORT ---
  function initRosterModal() {
    const modal = document.getElementById('roster-modal');
    if (!modal) return;

    renderRosterTable();
    modal.showModal();
  }

  function renderRosterTable() {
    const tbody = document.getElementById('roster-table-body');
    const searchInput = document.getElementById('roster-search-input');
    const filterSelect = document.getElementById('roster-universe-filter');
    const totalTag = document.getElementById('editor-total-count');

    if (!tbody) return;

    const query = (searchInput?.value || '').toLowerCase().trim();
    const filterTier = filterSelect?.value || 'all';

    const filtered = state.allCharacters.filter((c) => {
      const matchesQuery =
        !query ||
        c.name.toLowerCase().includes(query) ||
        (c.title && c.title.toLowerCase().includes(query)) ||
        (c.role && c.role.toLowerCase().includes(query));

      const matchesTier = filterTier === 'all' || c.tier_category === filterTier;
      return matchesQuery && matchesTier;
    });

    if (totalTag) totalTag.textContent = filtered.length;

    tbody.innerHTML = '';

    filtered.forEach((c, idx) => {
      const tr = document.createElement('tr');
      tr.innerHTML = `
        <td>${idx + 1}</td>
        <td><span style="font-size:1.3rem;">${c.symbol || '⚔️'}</span></td>
        <td><strong>${c.name}</strong><br><span style="font-size:0.75rem; color:var(--text-muted);">${c.title || ''}</span></td>
        <td><span class="slotted-hunter-tier tier-${c.tier_category.toLowerCase().replace('+', 'plus')}">${c.tier_category}</span></td>
        <td><strong style="color:var(--gold);">⚡ ${c.power_number.toLocaleString()}</strong></td>
        <td>${(c.eligible_roles || []).join(', ')}</td>
        <td>${(c.abilities || []).slice(0, 2).join(' • ')}</td>
        <td>
          <button class="btn-sm btn-edit btn-edit-char" data-id="${c.id}">✏️</button>
          <button class="btn-sm btn-del btn-del-char" data-id="${c.id}">🗑️</button>
        </td>
      `;
      tbody.appendChild(tr);
    });

    tbody.querySelectorAll('.btn-edit-char').forEach((btn) => {
      btn.addEventListener('click', () => {
        const charId = btn.dataset.id;
        const char = state.allCharacters.find((c) => c.id === charId);
        if (char) openEditForm(char);
      });
    });

    tbody.querySelectorAll('.btn-del-char').forEach((btn) => {
      btn.addEventListener('click', () => {
        const charId = btn.dataset.id;
        if (confirm('Delete this character card?')) {
          state.allCharacters = state.allCharacters.filter((c) => c.id !== charId);
          window.saveStoredCharacters(state.universe, state.allCharacters);
          renderRosterTable();
          updateHeaderStats();
        }
      });
    });
  }

  function openEditForm(char = null) {
    const form = document.getElementById('character-edit-form');
    if (!form) return;

    form.style.display = 'grid';

    document.getElementById('edit-char-id').value = char ? char.id : '';
    document.getElementById('form-char-name').value = char ? char.name : '';
    document.getElementById('form-char-title').value = char ? char.title : '';
    document.getElementById('form-char-tier').value = char ? char.tier_category : 'A';
    document.getElementById('form-char-power').value = char ? char.power_number : 500000;
    document.getElementById('form-char-abilities').value = char ? (char.abilities || []).join(', ') : '';
    document.getElementById('form-char-feats').value = char ? char.feats : '';
    document.getElementById('form-char-quote').value = char ? char.quote : '';
  }

  function saveCharacterForm() {
    const id = document.getElementById('edit-char-id').value;
    const name = document.getElementById('form-char-name').value.trim();
    if (!name) {
      alert('Character Name is required.');
      return;
    }

    const title = document.getElementById('form-char-title').value.trim();
    const tier = document.getElementById('form-char-tier').value;
    const powerNumber = parseInt(document.getElementById('form-char-power').value, 10) || 500000;
    const abilities = document.getElementById('form-char-abilities').value.split(',').map((s) => s.trim()).filter(Boolean);
    const feats = document.getElementById('form-char-feats').value.trim();
    const quote = document.getElementById('form-char-quote').value.trim();

    if (id) {
      const target = state.allCharacters.find((c) => c.id === id);
      if (target) {
        target.name = name;
        target.title = title;
        target.tier_category = tier;
        target.tier = `${tier} — CUSTOM TIER`;
        target.power_number = powerNumber;
        target.abilities = abilities;
        target.feats = feats;
        target.quote = quote;
      }
    } else {
      const newChar = {
        id: 'custom_' + Date.now(),
        name,
        title,
        universe: 'sololeveling',
        tier: `${tier} — CUSTOM TIER`,
        tier_category: tier,
        power_number: powerNumber,
        eligible_roles: ['LEADER', 'FIGHTER', 'MAGE', 'TANK', 'HEALER', 'SUPPORT', 'ASSASSIN'],
        description: `Custom hunter card: ${name}.`,
        abilities,
        power_level: Math.min(100, Math.round(powerNumber / 100000)),
        stats: { raw_power: 8.5, hax: 8.5, speed: 8.5, durability: 8.5, synergy: 8.5, battle_iq: 8.5 },
        feats,
        best_function: 'Custom versatile team combatant.',
        quote,
        symbol: '⭐'
      };
      state.allCharacters.push(newChar);
    }

    window.saveStoredCharacters(state.universe, state.allCharacters);
    document.getElementById('character-edit-form').style.display = 'none';
    renderRosterTable();
    updateHeaderStats();
    playSound('assign');
  }

  function exportRosterJSON() {
    const dataStr = 'data:text/json;charset=utf-8,' + encodeURIComponent(JSON.stringify(state.allCharacters, null, 2));
    const dlAnchor = document.createElement('a');
    dlAnchor.setAttribute('href', dataStr);
    dlAnchor.setAttribute('download', `${state.universe}_card_roster.json`);
    dlAnchor.click();
    playSound('click');
  }

  // --- 14. GAME SETUP MODAL ---
  function initSetupModal() {
    const modal = document.getElementById('setup-modal');
    if (!modal) return;

    updateAuctionUIState();
    renderSetupPlayerInputs();
    modal.showModal();
  }

  function renderSetupPlayerInputs() {
    const container = document.getElementById('player-names-inputs');
    if (!container) return;

    container.innerHTML = '';
    state.players.forEach((p, idx) => {
      const row = document.createElement('div');
      row.className = 'p-name-row';
      row.innerHTML = `
        <span class="player-badge-num" style="background:${p.color}22; color:${p.color}; border:1px solid ${p.color};">P${idx + 1}</span>
        <input type="text" class="setup-player-name-input" data-index="${idx}" value="${p.name}">
      `;
      container.appendChild(row);
    });

    document.getElementById('setup-player-count-display').textContent = state.players.length;

    document.querySelectorAll('.p-count-btn').forEach((btn) => {
      if (parseInt(btn.dataset.count, 10) === state.players.length) {
        btn.classList.add('active');
      } else {
        btn.classList.remove('active');
      }
    });
  }

  function applySetup() {
    const nameInputs = document.querySelectorAll('.setup-player-name-input');
    const customNames = [];
    nameInputs.forEach((inp) => {
      customNames.push(inp.value.trim() || `Player ${customNames.length + 1}`);
    });

    const setupToggle = document.getElementById('setup-offline-auction-toggle');
    const isAuction = setupToggle ? setupToggle.checked : state.isAuctionMode;
    const budgetVal = parseInt(document.getElementById('setup-offline-starting-budget')?.value, 10) || 200000;
    const timerVal = parseInt(document.getElementById('setup-offline-bid-timer')?.value, 10);

    state.isAuctionMode = isAuction;
    state.startingBudget = budgetVal;
    state.bidTimerDuration = isNaN(timerVal) ? 15 : timerVal;

    initGame(customNames.length, customNames);

    const modal = document.getElementById('setup-modal');
    if (modal) modal.close();
    playSound('click');
  }

  // --- 15. VICTORY MODAL ---
  function openVictoryModal() {
    playSound('victory');
    triggerConfetti();

    const modal = document.getElementById('victory-modal');
    if (!modal) return;

    const ranked = [...state.players].sort(
      (a, b) => calculateSquadPower(b) - calculateSquadPower(a)
    );

    const board = document.getElementById('victory-leaderboard');
    board.innerHTML = '';

    ranked.forEach((p, idx) => {
      const pwr = calculateSquadPower(p);
      const row = document.createElement('div');
      row.className = `victory-podium-row ${idx === 0 ? 'rank-1' : ''}`;
      row.innerHTML = `
        <div style="display:flex; align-items:center; gap:0.6rem;">
          <span style="font-size:1.4rem;">${idx === 0 ? '👑 🥇' : idx === 1 ? '🥈' : idx === 2 ? '🥉' : '🎖️'}</span>
          <strong style="color:${p.color}; font-size:1.1rem;">${p.name}</strong>
        </div>
        <div style="font-size:1.15rem; font-weight:900; color:var(--gold);">
          ⚡ ${pwr.toLocaleString()} PWR
        </div>
      `;
      board.appendChild(row);
    });

    modal.showModal();
  }

  // --- 15.5 ONLINE MULTIPLAYER ROOM & AUCTION ENGINE ---
  function openMultiplayerModal() {
    const modal = document.getElementById('multiplayer-modal');
    if (!modal) return;

    initFirebase();
    getOrSetLocalPlayerId();

    if (mpState.isOnline && mpState.roomData && mpState.roomData.status === 'lobby') {
      showMpTab('mp-lobby-panel');
    } else {
      showMpTab('mp-main-panel');
    }

    modal.showModal();
    playSound('click');
  }

  function showMpTab(panelId) {
    document.querySelectorAll('.mp-tab-panel').forEach((panel) => {
      panel.classList.remove('active');
    });
    const target = document.getElementById(panelId);
    if (target) target.classList.add('active');
  }

  function generateRoomCode() {
    const chars = '23456789ABCDEFGHJKLMNPQRSTUVWXYZ';
    let code = '';
    for (let i = 0; i < 4; i++) {
      code += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    return `SL-${code}`;
  }

  function createOnlineRoom() {
    const db = initFirebase();
    if (!db) {
      alert('Unable to connect to Firebase Realtime Database. Please check your internet connection.');
      return;
    }

    const hostNameInput = document.getElementById('mp-host-name-input');
    const hostName = (hostNameInput && hostNameInput.value.trim()) || 'Ahjin Guild Master (Host)';
    const maxPlayers = parseInt(document.getElementById('mp-host-max-players')?.value, 10) || 4;
    const hostUniverse = document.getElementById('mp-host-universe')?.value || state.universe || 'sololeveling';
    
    const isAuctionMode = document.getElementById('mp-create-auction-toggle')?.checked !== false;
    const startingBudget = parseInt(document.getElementById('mp-create-starting-budget')?.value, 10) || 200000;
    const bidTimerDuration = parseInt(document.getElementById('mp-create-bid-timer')?.value, 10) || 15;

    state.universe = hostUniverse;
    if (typeof window.setActiveUniverse === 'function') {
      window.setActiveUniverse(hostUniverse);
    }

    const localId = getOrSetLocalPlayerId();
    mpState.localPlayerName = hostName;
    mpState.isAuctionMode = isAuctionMode;
    mpState.startingBudget = startingBudget;
    mpState.bidTimerDuration = bidTimerDuration;

    const roomCode = generateRoomCode();
    const charsList = typeof window.getStoredCharacters === 'function'
      ? window.getStoredCharacters(hostUniverse)
      : (state.allCharacters && state.allCharacters.length ? state.allCharacters : window.getStoredCharacters());

    const initialRoomData = {
      code: roomCode,
      universe: hostUniverse,
      status: 'lobby',
      createdAt: Date.now(),
      hostId: localId,
      maxPlayers: maxPlayers,
      currentPlayerIndex: 0,
      isAuctionMode: isAuctionMode,
      startingBudget: startingBudget,
      bidTimerDuration: bidTimerDuration,
      budgets: {
        [localId]: startingBudget
      },
      players: [
        {
          id: localId,
          name: hostName,
          color: PLAYER_COLORS[0],
          squad: {},
          isHost: true
        }
      ],
      pool: JSON.parse(JSON.stringify(charsList)),
      archive: [],
      currentDraft: null,
      currentAuction: null,
      battleState: null
    };

    const roomRef = db.ref(`rooms/${roomCode}`);
    roomRef.set(initialRoomData).then(() => {
      attachRoomListener(roomCode, true);
      showMpTab('mp-lobby-panel');
      playSound('rank_sss');
    }).catch((err) => {
      alert('Failed to create room: ' + err.message);
    });
  }

  function joinOnlineRoom(rawCode, rawName) {
    const db = initFirebase();
    if (!db) {
      alert('Unable to connect to Firebase Realtime Database. Please check your internet connection.');
      return;
    }

    const code = (rawCode || '').trim().toUpperCase();
    const errorEl = document.getElementById('mp-join-error');
    if (errorEl) errorEl.style.display = 'none';

    if (!code) {
      if (errorEl) {
        errorEl.textContent = 'Please enter a valid room code (e.g. SL-8849).';
        errorEl.style.display = 'block';
      }
      return;
    }

    const localId = getOrSetLocalPlayerId();
    const joinName = (rawName || '').trim() || `Hunter ${Math.floor(Math.random() * 899 + 100)}`;
    mpState.localPlayerName = joinName;

    const roomRef = db.ref(`rooms/${code}`);
    roomRef.once('value').then((snapshot) => {
      const room = snapshot.val();
      if (!room) {
        if (errorEl) {
          errorEl.textContent = `Room ${code} was not found. Please verify the code.`;
          errorEl.style.display = 'block';
        }
        return;
      }

      const players = room.players || [];
      const existingIdx = players.findIndex((p) => p.id === localId);

      if (room.status !== 'lobby' && existingIdx === -1) {
        if (errorEl) {
          errorEl.textContent = 'This match is already in progress and not accepting new players.';
          errorEl.style.display = 'block';
        }
        return;
      }

      if (existingIdx === -1) {
        if (players.length >= (room.maxPlayers || 8)) {
          if (errorEl) {
            errorEl.textContent = `Room is already full (${players.length}/${room.maxPlayers} players).`;
            errorEl.style.display = 'block';
          }
          return;
        }

        players.push({
          id: localId,
          name: joinName,
          color: PLAYER_COLORS[players.length % PLAYER_COLORS.length],
          squad: {},
          isHost: false
        });

        const budgets = room.budgets || {};
        budgets[localId] = room.startingBudget || 200000;

        roomRef.update({
          players: players,
          budgets: budgets
        });
      }

      attachRoomListener(code, room.hostId === localId);
      showMpTab('mp-lobby-panel');
      playSound('click');
    }).catch((err) => {
      if (errorEl) {
        errorEl.textContent = 'Join error: ' + err.message;
        errorEl.style.display = 'block';
      }
    });
  }

  function attachRoomListener(code, isHost) {
    if (mpState.roomRef) {
      mpState.roomRef.off();
    }

    mpState.roomCode = code;
    mpState.isHost = isHost;
    mpState.isOnline = true;
    mpState.roomRef = mpState.db.ref(`rooms/${code}`);

    // Update URL bar
    const url = new URL(window.location.href);
    url.searchParams.set('room', code);
    window.history.replaceState({}, '', url.toString());

    // Update Header status dot
    const dot = document.getElementById('mp-header-status-dot');
    if (dot) dot.classList.add('online');

    mpState.roomRef.on('value', handleRemoteRoomUpdate);
  }

  function handleRemoteRoomUpdate(snapshot) {
    const data = snapshot.val();
    if (!data) {
      if (mpState.isOnline) {
        alert('The room has ended or was closed by the host.');
        leaveOnlineRoom(false);
      }
      return;
    }

    mpState.roomData = data;
    const localId = getOrSetLocalPlayerId();
    const isLocalHost = (data.hostId === localId);
    mpState.isHost = isLocalHost;
    mpState.isAuctionMode = !!data.isAuctionMode;
    mpState.startingBudget = data.startingBudget || 200000;
    mpState.bidTimerDuration = data.bidTimerDuration || 15;

    // Sync Universe / Edition across all joined peers
    if (data.universe && data.universe !== state.universe) {
      state.universe = data.universe;
      if (typeof window.setActiveUniverse === 'function') {
        window.setActiveUniverse(data.universe);
      }
      state.allCharacters = typeof window.getStoredCharacters === 'function'
        ? window.getStoredCharacters(data.universe)
        : (window.DEFAULT_SOLO_CHARACTERS || []);
      updateUniverseUI(true);
    }

    // --- A. LOBBY STATE ---
    if (data.status === 'lobby') {
      document.getElementById('mp-lobby-code-text').textContent = data.code;
      const countEl = document.getElementById('mp-lobby-player-count');
      if (countEl) countEl.textContent = `${(data.players || []).length} / ${data.maxPlayers || 4} Players`;

      // Update mode badge
      const modeBadge = document.getElementById('mp-lobby-mode-badge');
      if (modeBadge) {
        if (data.isAuctionMode) {
          modeBadge.textContent = `🔥 AUCTION ON (${formatINR(data.startingBudget || 200000)})`;
          modeBadge.style.display = 'inline-block';
        } else {
          modeBadge.textContent = '⚡ TURN DRAFT MODE';
          modeBadge.style.display = 'inline-block';
        }
      }

      // Host In-Lobby Settings Editor
      const hostEditControls = document.getElementById('mp-lobby-host-edit-controls');
      if (hostEditControls) {
        if (isLocalHost) {
          hostEditControls.style.display = 'grid';
          const auctionToggle = document.getElementById('mp-lobby-auction-toggle');
          if (auctionToggle) auctionToggle.value = data.isAuctionMode ? 'true' : 'false';
          const budgetSelect = document.getElementById('mp-lobby-budget-select');
          if (budgetSelect) budgetSelect.value = data.startingBudget || 200000;
          const uniSelect = document.getElementById('mp-lobby-universe-select');
          if (uniSelect) uniSelect.value = data.universe || 'sololeveling';
        } else {
          hostEditControls.style.display = 'none';
        }
      }

      const grid = document.getElementById('mp-lobby-players-grid');
      if (grid) {
        grid.innerHTML = '';
        (data.players || []).forEach((p, idx) => {
          const chip = document.createElement('div');
          chip.className = 'lobby-player-chip';
          chip.innerHTML = `
            <div class="lobby-player-info">
              <span class="player-color-dot" style="background:${p.color}; box-shadow:0 0 8px ${p.color};"></span>
              <span>${p.name} ${p.isHost ? '👑 (Host)' : ''}</span>
              ${p.id === localId ? '<span class="lobby-player-tag-you">YOU</span>' : ''}
            </div>
            <span style="font-size:0.75rem; color:var(--text-muted);">Slot #${idx + 1}</span>
          `;
          grid.appendChild(chip);
        });
      }

      const startBtn = document.getElementById('mp-lobby-start-btn');
      const waitMsg = document.getElementById('mp-lobby-waiting-msg');
      if (isLocalHost) {
        if (startBtn) startBtn.style.display = 'block';
        if (waitMsg) waitMsg.style.display = 'none';
      } else {
        if (startBtn) startBtn.style.display = 'none';
        if (waitMsg) waitMsg.style.display = 'inline-block';
      }
      return;
    }

    // --- B. DRAFTING / AUCTIONING STATE ---
    if (data.status === 'drafting') {
      const mpModal = document.getElementById('multiplayer-modal');
      if (mpModal && mpModal.open) mpModal.close();

      const activeBar = document.getElementById('active-room-bar');
      if (activeBar) activeBar.style.display = 'flex';

      document.getElementById('active-room-code-display').textContent = data.code;
      const myPlayer = (data.players || []).find((p) => p.id === localId);
      document.getElementById('active-room-player-name').textContent = myPlayer ? myPlayer.name : 'You';
      document.getElementById('active-room-role-badge').textContent = isLocalHost ? '👑 HOST' : '⚔️ GUILD';
      document.getElementById('active-room-player-count').textContent = `${(data.players || []).length} Players Online`;

      // Update room mode badge & budget indicator
      const activeModeBadge = document.getElementById('active-room-mode-badge');
      const activeBudgetPill = document.getElementById('active-room-budget-pill');
      if (data.isAuctionMode) {
        if (activeModeBadge) {
          activeModeBadge.style.display = 'inline-block';
          activeModeBadge.textContent = '🔥 AUCTION MODE';
        }
        if (activeBudgetPill) {
          activeBudgetPill.style.display = 'inline-block';
          const myBal = (data.budgets && data.budgets[localId] !== undefined)
            ? data.budgets[localId]
            : (data.startingBudget || 200000);
          activeBudgetPill.textContent = `💰 ${formatINR(myBal)}`;
        }
      } else {
        if (activeModeBadge) activeModeBadge.style.display = 'none';
        if (activeBudgetPill) activeBudgetPill.style.display = 'none';
      }

      // Sync state
      state.players = data.players || [];
      state.pool = data.pool || [];
      state.archive = data.archive || [];
      state.activePlayerIndex = data.currentPlayerIndex || 0;

      renderPlayersDock();
      updateTurnHUD();

      // Handle Auction vs Turn Draft
      if (data.isAuctionMode) {
        syncAuctionModal(data.currentAuction, data.budgets);
      } else {
        // Synchronize Standard 3D Card Reveal Modal
        const charModal = document.getElementById('character-modal');
        if (data.currentDraft && data.currentDraft.isOpen && data.currentDraft.char) {
          state.drawnCard = data.currentDraft.char;
          openCharacterRevealModal(data.currentDraft.char, data.currentDraft.drawerId, data.currentDraft.drawerName);
        } else {
          if (charModal && charModal.open) {
            charModal.close();
          }
        }
      }
      return;
    }

    // --- C. COMPLETED STATE ---
    if (data.status === 'completed') {
      state.players = data.players || [];
      state.archive = data.archive || [];
      renderPlayersDock();
      updateTurnHUD();

      const charModal = document.getElementById('character-modal');
      if (charModal && charModal.open) charModal.close();

      const aucModal = document.getElementById('auction-modal');
      if (aucModal && aucModal.open) aucModal.close();

      const vicModal = document.getElementById('victory-modal');
      if (vicModal && !vicModal.open) {
        openVictoryModal();
      }
    }
  }

  // --- 15.6 LIVE AUCTION / BIDDING SYSTEM ENGINE ---
  function populateAuctionCardPreview(char) {
    if (!char) return;

    // Basic Header
    const nameEl = document.getElementById('auction-card-name');
    if (nameEl) nameEl.textContent = char.name;

    const titleEl = document.getElementById('auction-card-title');
    if (titleEl) titleEl.textContent = char.title || char.role || 'Hunter';

    const powerEl = document.getElementById('auction-card-power');
    if (powerEl) powerEl.textContent = `⚡ ${(char.power_number || 100000).toLocaleString()} PWR`;

    const rankBanner = document.getElementById('auction-rank-banner');
    if (rankBanner) {
      rankBanner.textContent = char.tier || `${char.tier_category} — TIER`;
      rankBanner.className = `reveal-rank-banner tier-${(char.tier_category || 'A').toLowerCase().replace('+', 'plus')}`;
    }

    const avatarImg = document.getElementById('auction-avatar-img');
    const symbolEl = document.getElementById('auction-avatar-symbol');
    if (avatarImg) {
      if (char.image) {
        avatarImg.src = char.image;
        avatarImg.style.display = 'block';
        if (symbolEl) symbolEl.style.display = 'none';
      } else {
        avatarImg.style.display = 'none';
        if (symbolEl) symbolEl.style.display = 'block';
      }
    }
    if (symbolEl && !char.image) {
      symbolEl.textContent = char.symbol || '⚔️';
      symbolEl.style.display = 'block';
    }

    // Best Fit / Recommended Roles Tags
    const bestFitTagsContainer = document.getElementById('auction-best-fit-tags');
    if (bestFitTagsContainer) {
      bestFitTagsContainer.innerHTML = '';
      const currentRoles = getRoles();
      const eligible = char.eligible_roles || [];
      if (eligible.length === 0) {
        bestFitTagsContainer.innerHTML = `<span style="font-size:0.75rem; color:var(--text-muted);">All Squad Positions (+15% PWR)</span>`;
      } else {
        eligible.forEach((rKey) => {
          const roleMeta = currentRoles.find((r) => r.key === rKey) || { icon: '⭐', name: rKey };
          const chip = document.createElement('span');
          chip.className = 'best-fit-tag-chip';
          chip.innerHTML = `${roleMeta.icon} ${roleMeta.name} <strong style="color:#06d6a0;">+15%</strong>`;
          bestFitTagsContainer.appendChild(chip);
        });
      }
    }

    // 6 Stat Meters
    const statsGrid = document.getElementById('auction-stats-grid');
    if (statsGrid) {
      const stats = char.stats || {
        raw_power: 8.5,
        hax: 8.0,
        speed: 8.5,
        durability: 8.0,
        synergy: 8.5,
        battle_iq: 8.5
      };
      const statConfigs = [
        { label: '💥 Power', val: stats.raw_power },
        { label: '🔮 Hax', val: stats.hax },
        { label: '⚡ Speed', val: stats.speed },
        { label: '🛡️ Armor', val: stats.durability },
        { label: '🤝 Synergy', val: stats.synergy },
        { label: '🧠 IQ', val: stats.battle_iq }
      ];
      statsGrid.innerHTML = statConfigs.map(s => `
        <div class="auction-stat-pill">
          <div class="auction-stat-pill-header">
            <span>${s.label}</span>
            <strong style="color:var(--gold); font-size:0.7rem;">${(s.val || 8).toFixed(1)}</strong>
          </div>
          <div class="auction-stat-bar-track">
            <div class="auction-stat-bar-fill" style="width: ${Math.min(100, ((s.val || 8) / 10) * 100)}%;"></div>
          </div>
        </div>
      `).join('');
    }

    // Abilities, Feats, and Quote
    const abilitiesEl = document.getElementById('auction-card-abilities');
    if (abilitiesEl) {
      const abs = Array.isArray(char.abilities) ? char.abilities.join(' • ') : (char.abilities || char.best_function || 'Master combat technique.');
      abilitiesEl.textContent = abs;
    }

    const featsEl = document.getElementById('auction-card-feats');
    if (featsEl) {
      featsEl.textContent = char.feats || char.description || 'Legendary feats achieved across dimensional wars.';
    }

    const quoteEl = document.getElementById('auction-card-quote');
    if (quoteEl) {
      quoteEl.textContent = char.quote ? `"${char.quote}"` : `"${char.name}"`;
    }
  }

  function renderAuctionWinnerRoleButtons(char, winningSquad, onSelectRole) {
    const roleBtns = document.getElementById('auction-winner-role-buttons');
    if (!roleBtns) return;
    roleBtns.innerHTML = '';

    const bestFitBanner = document.getElementById('auction-winner-best-fit-banner');
    const currentRoles = getRoles();
    const eligibleKeys = char.eligible_roles || [];

    if (bestFitBanner) {
      const bestFitNames = eligibleKeys.map(k => {
        const r = currentRoles.find(cr => cr.key === k);
        return r ? `${r.icon} ${r.name}` : k;
      });
      bestFitBanner.innerHTML = `⭐ <strong>RECOMMENDED BEST FIT (+15% PWR BOOST):</strong> ${bestFitNames.length ? bestFitNames.join(', ') : 'All Positions'}`;
    }

    currentRoles.forEach((r) => {
      const isFilled = !!winningSquad[r.key];
      const isEligible = eligibleKeys.includes(r.key);

      const btn = document.createElement('button');
      btn.type = 'button';
      btn.className = `btn-assign-role ${isEligible ? 'recommended' : ''}`;

      if (isFilled) {
        btn.disabled = true;
        btn.style.opacity = '0.35';
        btn.style.cursor = 'not-allowed';
        btn.innerHTML = `${r.icon} ${r.name} 🔒 (Filled)`;
      } else {
        btn.innerHTML = `${r.icon} ${r.name} ${isEligible ? '⭐ (Best Fit: +15% Boost)' : ''}`;
        btn.addEventListener('click', () => {
          onSelectRole(r.key);
        });
      }
      roleBtns.appendChild(btn);
    });
  }

  function syncAuctionModal(auctionData, budgets) {
    const modal = document.getElementById('auction-modal');
    if (!modal) return;

    if (!auctionData || !auctionData.active) {
      if (mpState.auctionLocalTimerInterval) {
        clearInterval(mpState.auctionLocalTimerInterval);
        mpState.auctionLocalTimerInterval = null;
      }
      if (modal.open) modal.close();
      return;
    }

    if (!modal.open) modal.showModal();

    const char = auctionData.char;
    const localId = getOrSetLocalPlayerId();

    // Hide offline bidder section in online mode
    const offlineSection = document.getElementById('auction-offline-bidder-section');
    if (offlineSection) offlineSection.style.display = 'none';
    const budgetPillLabel = document.querySelector('#auction-my-budget-pill span');
    if (budgetPillLabel) budgetPillLabel.textContent = 'My Budget:';

    // Populate Detailed Holographic Card Preview with Best Fit & Stats
    populateAuctionCardPreview(char);

    // Populate Current Leading Bid
    const bidNumEl = document.getElementById('auction-current-bid-num');
    if (bidNumEl) bidNumEl.textContent = `💰 ${formatINR(auctionData.currentBid || 5000)}`;

    const bidderNameEl = document.getElementById('auction-highest-bidder-name');
    if (bidderNameEl) {
      bidderNameEl.textContent = auctionData.highestBidderName || 'No Bids Yet';
      bidderNameEl.style.color = auctionData.highestBidderColor || '#ffd166';
    }

    // Populate My Remaining Budget
    const myBudgetVal = (budgets && budgets[localId] !== undefined)
      ? budgets[localId]
      : (mpState.startingBudget || 200000);
    const myBudgetElement = document.getElementById('auction-my-budget-val');
    if (myBudgetElement) myBudgetElement.textContent = formatINR(myBudgetVal);

    // Live Countdown Timer
    if (mpState.auctionLocalTimerInterval) {
      clearInterval(mpState.auctionLocalTimerInterval);
      mpState.auctionLocalTimerInterval = null;
    }

    function updateTimerDisplay() {
      const remainingMs = Math.max(0, (auctionData.expiresAt || 0) - Date.now());
      const remainingSec = (remainingMs / 1000).toFixed(1);
      const timerSecEl = document.getElementById('auction-timer-sec');
      const timerBarEl = document.getElementById('auction-timer-bar');

      if (timerSecEl) timerSecEl.textContent = `${remainingSec}s`;
      if (timerBarEl) {
        const totalDurationMs = (auctionData.duration || 15) * 1000;
        const pct = Math.min(100, (remainingMs / totalDurationMs) * 100);
        timerBarEl.style.width = `${pct}%`;
      }

      if (remainingMs === 0 && auctionData.status === 'bidding' && mpState.isHost) {
        if (mpState.auctionLocalTimerInterval) {
          clearInterval(mpState.auctionLocalTimerInterval);
          mpState.auctionLocalTimerInterval = null;
        }
        resolveAuction();
      }
    }
    updateTimerDisplay();
    if (auctionData.status === 'bidding') {
      mpState.auctionLocalTimerInterval = setInterval(updateTimerDisplay, 100);
    }

    // Live Bid Feed
    const feedEl = document.getElementById('auction-bid-feed');
    if (feedEl) {
      feedEl.innerHTML = '';
      (auctionData.feed || []).forEach((msg, idx) => {
        const entry = document.createElement('div');
        entry.className = `bid-feed-entry ${idx === (auctionData.feed.length - 1) ? 'bid-lead' : ''}`;
        entry.textContent = msg;
        feedEl.appendChild(entry);
      });
      feedEl.scrollTop = feedEl.scrollHeight;
    }

    // Host Controls Visibility
    const hostControls = document.getElementById('auction-host-controls');
    if (hostControls) {
      hostControls.style.display = (mpState.isHost && auctionData.status === 'bidding') ? 'block' : 'none';
    }

    // Handle Sold vs Bidding State
    const controlsSection = document.getElementById('bidding-controls-section');
    const winnerSlotPanel = document.getElementById('auction-winner-slotting-panel');

    if (auctionData.status === 'sold') {
      if (controlsSection) controlsSection.style.display = 'none';
      if (winnerSlotPanel) {
        winnerSlotPanel.style.display = 'block';
        document.getElementById('auction-final-winner-name').textContent = auctionData.highestBidderName;
        document.getElementById('auction-final-sold-price').textContent = formatINR(auctionData.currentBid);

        if (localId === auctionData.highestBidderId) {
          document.getElementById('auction-slot-instruction').innerHTML = '🎉 <strong>You won this card!</strong> Select which open squad position to permanently lock it into:';

          const myPlayer = state.players.find(p => p.id === localId) || { squad: {} };
          const mySquad = myPlayer.squad || {};
          renderAuctionWinnerRoleButtons(char, mySquad, (roleKey) => {
            assignAuctionWonCard(roleKey);
          });
        } else {
          document.getElementById('auction-slot-instruction').innerHTML = `⏳ Waiting for <strong style="color:${auctionData.highestBidderColor};">${auctionData.highestBidderName}</strong> to assign this card to their squad...`;
          const roleBtns = document.getElementById('auction-winner-role-buttons');
          if (roleBtns) roleBtns.innerHTML = '';
        }
      }
    } else {
      if (controlsSection) controlsSection.style.display = 'block';
      if (winnerSlotPanel) winnerSlotPanel.style.display = 'none';
    }
  }

  function placeAuctionBid(increment, isCustom = false) {
    if (!mpState.isOnline || !mpState.roomRef || !mpState.roomData) return;

    const auctionData = mpState.roomData.currentAuction;
    if (!auctionData || auctionData.status !== 'bidding') {
      alert('No active auction in progress!');
      return;
    }

    const localId = getOrSetLocalPlayerId();
    const myBudget = (mpState.roomData.budgets && mpState.roomData.budgets[localId] !== undefined)
      ? mpState.roomData.budgets[localId]
      : (mpState.startingBudget || 200000);

    let newBid = 0;
    if (isCustom) {
      const customInput = document.getElementById('auction-custom-bid-input');
      newBid = parseInt(customInput?.value, 10) || 0;
    } else {
      newBid = (auctionData.currentBid || 0) + increment;
    }

    if (newBid <= auctionData.currentBid) {
      alert(`Your bid must be higher than the current leading bid (${formatINR(auctionData.currentBid)})!`);
      return;
    }

    if (newBid > myBudget) {
      alert(`Insufficient treasury funds! You have ${formatINR(myBudget)} remaining.`);
      return;
    }

    const myPlayer = (mpState.roomData.players || []).find(p => p.id === localId) || {
      name: mpState.localPlayerName,
      color: '#00d2ff'
    };

    // Anti-snipe: extend expiration by 5 seconds if bid arrives near the end
    const newExpiresAt = Math.max(auctionData.expiresAt, Date.now() + 5000);
    const newFeed = [...(auctionData.feed || []), `💰 ${myPlayer.name} placed bid of ${formatINR(newBid)}!`].slice(-10);

    playSound('bid_placed');

    mpState.roomRef.child('currentAuction').update({
      currentBid: newBid,
      highestBidderId: localId,
      highestBidderName: myPlayer.name,
      highestBidderColor: myPlayer.color || '#00d2ff',
      expiresAt: newExpiresAt,
      feed: newFeed
    });
  }

  function resolveAuction(manualSold = false, manualPass = false) {
    if (!mpState.isOnline || !mpState.roomRef || !mpState.isHost) return;

    const auctionData = mpState.roomData?.currentAuction;
    if (!auctionData) return;

    // Case 1: High Bidder Wins Card
    if (auctionData.highestBidderId && !manualPass) {
      playSound('gavel_sold');
      const newFeed = [...(auctionData.feed || []), `🔨 GAVEL STRIKE: Sold to ${auctionData.highestBidderName} for ${formatINR(auctionData.currentBid)}!`];

      mpState.roomRef.child('currentAuction').update({
        status: 'sold',
        feed: newFeed
      });
      return;
    }

    // Case 2: Unsold / Discarded to Void
    playSound('discard');
    const curPool = ensureArray(mpState.roomData?.pool || state.pool);
    const updatedPool = curPool.filter(c => c.id !== auctionData.char.id);
    const curArchive = ensureArray(mpState.roomData?.archive || state.archive);
    const updatedArchive = [...curArchive, {
      character: auctionData.char,
      status: 'discarded',
      player: 'Auction Block (Unsold)',
      role: 'None'
    }];

    mpState.roomRef.update({
      pool: updatedPool,
      archive: updatedArchive,
      currentAuction: null
    });
  }

  function assignAuctionWonCard(roleKey) {
    if (!mpState.isOnline || !mpState.roomRef || !mpState.roomData) return;

    const auctionData = mpState.roomData.currentAuction;
    if (!auctionData || !auctionData.char) return;

    const localId = getOrSetLocalPlayerId();
    if (localId !== auctionData.highestBidderId) {
      alert('Only the winning bidder can slot this card!');
      return;
    }

    const updatedPlayers = JSON.parse(JSON.stringify(ensureArray(mpState.roomData.players || state.players)));
    const targetPlayer = updatedPlayers.find(p => p.id === localId);
    if (targetPlayer) {
      if (!targetPlayer.squad) targetPlayer.squad = {};
      targetPlayer.squad[roleKey] = auctionData.char;
    }

    const updatedBudgets = JSON.parse(JSON.stringify(mpState.roomData.budgets || {}));
    updatedBudgets[localId] = Math.max(0, (updatedBudgets[localId] || 0) - auctionData.currentBid);

    const curPool = ensureArray(mpState.roomData?.pool || state.pool);
    const updatedPool = curPool.filter(c => c.id !== auctionData.char.id);
    const curArchive = ensureArray(mpState.roomData?.archive || state.archive);
    const updatedArchive = [...curArchive, {
      character: auctionData.char,
      status: 'assigned',
      player: targetPlayer ? targetPlayer.name : mpState.localPlayerName,
      role: roleKey
    }];

    const allFilled = updatedPlayers.every(
      p => Object.keys(p.squad || {}).length >= state.maxPicksPerPlayer
    );

    playSound('assign');

    mpState.roomRef.update({
      players: updatedPlayers,
      budgets: updatedBudgets,
      pool: updatedPool,
      archive: updatedArchive,
      currentAuction: null,
      status: allFilled ? 'completed' : 'drafting'
    });
  }

  // --- 15.7 OFFLINE AUCTION / BIDDING SYSTEM ENGINE ---
  function syncOfflineAuctionModal() {
    const modal = document.getElementById('auction-modal');
    if (!modal) return;

    const auctionData = state.currentAuction;
    if (!auctionData || !auctionData.active) {
      if (state.offlineTimerInterval) {
        clearInterval(state.offlineTimerInterval);
        state.offlineTimerInterval = null;
      }
      if (modal.open) modal.close();
      return;
    }

    if (!modal.open) modal.showModal();

    const char = auctionData.char;

    // Populate Detailed Holographic Card Preview with Best Fit & Stats
    populateAuctionCardPreview(char);

    // Populate Current Leading Bid
    const bidNumEl = document.getElementById('auction-current-bid-num');
    if (bidNumEl) bidNumEl.textContent = `💰 ${formatINR(auctionData.currentBid || 5000)}`;

    const bidderNameEl = document.getElementById('auction-highest-bidder-name');
    if (bidderNameEl) {
      bidderNameEl.textContent = auctionData.highestBidderName || 'Starting Price (No Bids)';
      bidderNameEl.style.color = auctionData.highestBidderColor || '#ffd166';
    }

    // Show and Populate Offline Bidder Selector Tabs
    const offlineSection = document.getElementById('auction-offline-bidder-section');
    const playerTabsContainer = document.getElementById('auction-offline-player-tabs');
    const activeBidderIndicator = document.getElementById('auction-offline-active-bidder-indicator');

    if (offlineSection) offlineSection.style.display = 'block';
    if (playerTabsContainer) {
      playerTabsContainer.innerHTML = '';
      state.players.forEach((p, idx) => {
        const isSelected = (state.offlineActiveBidderIndex === idx);
        const isFolded = !!p.folded;
        const isFull = Object.keys(p.squad || {}).length >= state.maxPicksPerPlayer;

        const tab = document.createElement('button');
        tab.type = 'button';
        tab.className = `offline-player-bid-tab ${isSelected ? 'active' : ''} ${isFolded ? 'folded' : ''} ${isFull ? 'full' : ''}`;
        tab.style.borderColor = isSelected ? 'var(--gold)' : `${p.color}55`;

        let statusBadge = '';
        if (isFull) statusBadge = ' 🔒 Full';
        else if (isFolded) statusBadge = ' 🏳️ Pass';

        tab.innerHTML = `
          <span style="color:${p.color}; font-weight:800;">${p.name.split(' ')[0]}</span>
          <span style="color:#06d6a0;">${formatINR(p.budget || 0)}</span>
          ${statusBadge}
        `;

        if (!isFull && !isFolded) {
          tab.addEventListener('click', () => {
            state.offlineActiveBidderIndex = idx;
            playSound('click');
            syncOfflineAuctionModal();
          });
        }
        playerTabsContainer.appendChild(tab);
      });
    }

    const currentBidder = state.players[state.offlineActiveBidderIndex] || state.players[0] || { name: 'Player', budget: 200000 };
    if (activeBidderIndicator) {
      activeBidderIndicator.textContent = `Selected: ${currentBidder.name}`;
      activeBidderIndicator.style.color = currentBidder.color || 'var(--neon-blue)';
    }

    // Populate Active Selected Player's Remaining Budget in header
    const myBudgetElement = document.getElementById('auction-my-budget-val');
    if (myBudgetElement) myBudgetElement.textContent = formatINR(currentBidder.budget || 0);
    const budgetPillLabel = document.querySelector('#auction-my-budget-pill span');
    if (budgetPillLabel) budgetPillLabel.textContent = `${currentBidder.name.split(' ')[0]} Budget:`;

    // Live Countdown Timer
    if (state.offlineTimerInterval) {
      clearInterval(state.offlineTimerInterval);
      state.offlineTimerInterval = null;
    }

    function updateOfflineTimerDisplay() {
      const timerSecEl = document.getElementById('auction-timer-sec');
      const timerBarEl = document.getElementById('auction-timer-bar');

      if (!auctionData.expiresAt) {
        if (timerSecEl) timerSecEl.textContent = 'Untimed 🔨';
        if (timerBarEl) timerBarEl.style.width = '100%';
        return;
      }

      const remainingMs = Math.max(0, (auctionData.expiresAt || 0) - Date.now());
      const remainingSec = (remainingMs / 1000).toFixed(1);

      if (timerSecEl) timerSecEl.textContent = `${remainingSec}s`;
      if (timerBarEl) {
        const totalDurationMs = (auctionData.duration || 15) * 1000;
        const pct = Math.min(100, (remainingMs / totalDurationMs) * 100);
        timerBarEl.style.width = `${pct}%`;
      }

      if (remainingMs === 0 && auctionData.status === 'bidding') {
        if (state.offlineTimerInterval) {
          clearInterval(state.offlineTimerInterval);
          state.offlineTimerInterval = null;
        }
        resolveOfflineAuction();
      }
    }
    updateOfflineTimerDisplay();
    if (auctionData.status === 'bidding' && auctionData.expiresAt) {
      state.offlineTimerInterval = setInterval(updateOfflineTimerDisplay, 100);
    }

    // Live Bid Feed
    const feedEl = document.getElementById('auction-bid-feed');
    if (feedEl) {
      feedEl.innerHTML = '';
      (auctionData.feed || []).forEach((msg, idx) => {
        const entry = document.createElement('div');
        entry.className = `bid-feed-entry ${idx === (auctionData.feed.length - 1) ? 'bid-lead' : ''}`;
        entry.textContent = msg;
        feedEl.appendChild(entry);
      });
      feedEl.scrollTop = feedEl.scrollHeight;
    }

    // Host Controls Visibility (Always available offline so players can strike hammer or pass manually)
    const hostControls = document.getElementById('auction-host-controls');
    if (hostControls) {
      hostControls.style.display = (auctionData.status === 'bidding') ? 'block' : 'none';
    }

    // Reset status message
    const statusMsg = document.getElementById('auction-bid-status-msg');
    if (statusMsg) statusMsg.textContent = '';

    // Handle Sold vs Bidding State
    const controlsSection = document.getElementById('bidding-controls-section');
    const winnerSlotPanel = document.getElementById('auction-winner-slotting-panel');

    if (auctionData.status === 'sold') {
      if (controlsSection) controlsSection.style.display = 'none';
      if (winnerSlotPanel) {
        winnerSlotPanel.style.display = 'block';
        document.getElementById('auction-final-winner-name').textContent = auctionData.highestBidderName;
        document.getElementById('auction-final-sold-price').textContent = formatINR(auctionData.currentBid);

        const winningPlayer = state.players.find(p => p.id === auctionData.highestBidderId) || state.players[0];
        document.getElementById('auction-slot-instruction').innerHTML = `🎉 <strong>${winningPlayer.name} won this card!</strong> Select which squad position to permanently lock it into:`;

        const winningSquad = winningPlayer.squad || {};
        renderAuctionWinnerRoleButtons(char, winningSquad, (roleKey) => {
          assignOfflineAuctionWonCard(roleKey);
        });
      }
    } else {
      if (controlsSection) controlsSection.style.display = 'block';
      if (winnerSlotPanel) winnerSlotPanel.style.display = 'none';
    }
  }

  function placeOfflineAuctionBid(increment, isCustom = false) {
    const auctionData = state.currentAuction;
    if (!auctionData || auctionData.status !== 'bidding') {
      alert('No active auction in progress!');
      return;
    }

    const currentBidder = state.players[state.offlineActiveBidderIndex];
    if (!currentBidder) return;

    if (currentBidder.folded) {
      alert(`${currentBidder.name} has folded from this auction round!`);
      return;
    }

    if (Object.keys(currentBidder.squad || {}).length >= state.maxPicksPerPlayer) {
      alert(`${currentBidder.name}'s squad is already 7/7 full!`);
      return;
    }

    let newBid = 0;
    if (isCustom) {
      const customInput = document.getElementById('auction-custom-bid-input');
      newBid = parseInt(customInput?.value, 10) || 0;
    } else {
      newBid = (auctionData.currentBid || 0) + increment;
    }

    if (newBid <= auctionData.currentBid) {
      alert(`Your bid must be higher than the current leading bid (${formatINR(auctionData.currentBid)})!`);
      return;
    }

    if (newBid > (currentBidder.budget || 0)) {
      alert(`Insufficient treasury funds for ${currentBidder.name}! Remaining: ${formatINR(currentBidder.budget || 0)}`);
      return;
    }

    // Anti-snipe: extend timer by 5 seconds if bid arrives near the end
    if (auctionData.expiresAt) {
      auctionData.expiresAt = Math.max(auctionData.expiresAt, Date.now() + 5000);
    }

    auctionData.currentBid = newBid;
    auctionData.highestBidderId = currentBidder.id;
    auctionData.highestBidderName = currentBidder.name;
    auctionData.highestBidderColor = currentBidder.color || '#ffd166';
    auctionData.highestBidderIndex = state.offlineActiveBidderIndex;
    auctionData.feed = [...(auctionData.feed || []), `💰 ${currentBidder.name} placed bid of ${formatINR(newBid)}!`].slice(-10);

    playSound('bid_placed');

    // Auto-advance active bidder tab to next eligible player for smooth local turn-passing
    const eligibleIndices = state.players
      .map((p, i) => (!p.folded && Object.keys(p.squad || {}).length < state.maxPicksPerPlayer && i !== state.offlineActiveBidderIndex) ? i : -1)
      .filter(i => i !== -1);
    if (eligibleIndices.length > 0) {
      const nextIdx = eligibleIndices.find(i => i > state.offlineActiveBidderIndex) ?? eligibleIndices[0];
      state.offlineActiveBidderIndex = nextIdx;
    }

    syncOfflineAuctionModal();
  }

  function foldOfflineAuctionBid() {
    const auctionData = state.currentAuction;
    if (!auctionData || auctionData.status !== 'bidding') return;

    const currentBidder = state.players[state.offlineActiveBidderIndex];
    if (!currentBidder) return;

    currentBidder.folded = true;
    auctionData.feed = [...(auctionData.feed || []), `🏳️ ${currentBidder.name} folded from this auction.`].slice(-10);
    playSound('click');

    const statusMsg = document.getElementById('auction-bid-status-msg');
    if (statusMsg) statusMsg.textContent = `${currentBidder.name} Folded 🏳️`;

    // Check if only one non-folded player remains and they have highest bid
    const remainingEligible = state.players.filter(
      p => !p.folded && Object.keys(p.squad || {}).length < state.maxPicksPerPlayer
    );

    if (remainingEligible.length === 0) {
      // Everyone folded
      resolveOfflineAuction();
      return;
    }

    // Switch active bidder tab to next available player
    const nextEligible = remainingEligible[0];
    state.offlineActiveBidderIndex = state.players.indexOf(nextEligible);

    syncOfflineAuctionModal();
  }

  function resolveOfflineAuction(manualSold = false, manualPass = false) {
    const auctionData = state.currentAuction;
    if (!auctionData) return;

    if (state.offlineTimerInterval) {
      clearInterval(state.offlineTimerInterval);
      state.offlineTimerInterval = null;
    }

    // Case 1: High Bidder Wins Card
    if (auctionData.highestBidderId && !manualPass) {
      playSound('gavel_sold');
      auctionData.status = 'sold';
      auctionData.feed = [...(auctionData.feed || []), `🔨 GAVEL STRIKE: Sold to ${auctionData.highestBidderName} for ${formatINR(auctionData.currentBid)}!`];
      syncOfflineAuctionModal();
      return;
    }

    // Case 2: Unsold / Discarded to Void
    playSound('discard');
    state.pool = ensureArray(state.pool).filter(c => c.id !== auctionData.char.id);
    state.archive = ensureArray(state.archive);
    state.archive.push({
      character: auctionData.char,
      status: 'discarded',
      player: 'Auction Block (Unsold)',
      role: 'None'
    });
    state.currentAuction = null;

    const modal = document.getElementById('auction-modal');
    if (modal && modal.open) modal.close();

    updateHeaderStats();
    renderPlayersDock();
    updateTurnHUD();
  }

  function assignOfflineAuctionWonCard(roleKey) {
    const auctionData = state.currentAuction;
    if (!auctionData || !auctionData.char) return;

    const targetPlayer = state.players.find(p => p.id === auctionData.highestBidderId);
    if (!targetPlayer) return;

    if (!targetPlayer.squad) targetPlayer.squad = {};
    targetPlayer.squad[roleKey] = auctionData.char;
    targetPlayer.budget = Math.max(0, (targetPlayer.budget || 0) - auctionData.currentBid);

    state.pool = ensureArray(state.pool).filter(c => c.id !== auctionData.char.id);
    state.archive = ensureArray(state.archive);
    state.archive.push({
      character: auctionData.char,
      status: 'assigned',
      player: targetPlayer.name,
      role: roleKey
    });

    state.currentAuction = null;

    const modal = document.getElementById('auction-modal');
    if (modal && modal.open) modal.close();

    playSound('assign');
    renderPlayersDock();
    updateHeaderStats();
    updateTurnHUD();

    // Check Victory
    const allFilled = state.players.every(
      p => Object.keys(p.squad || {}).length >= state.maxPicksPerPlayer
    );
    if (allFilled) {
      setTimeout(() => {
        openVictoryModal();
      }, 500);
    }
  }

  function launchOnlineMatch() {
    if (!mpState.isOnline || !mpState.roomRef || !mpState.isHost) return;

    const activeUni = mpState.roomData?.universe || state.universe || 'sololeveling';
    const charsList = typeof window.getStoredCharacters === 'function'
      ? window.getStoredCharacters(activeUni)
      : (state.allCharacters && state.allCharacters.length ? state.allCharacters : (window.DEFAULT_SOLO_CHARACTERS || []));

    const cleanPlayers = ensureArray(mpState.roomData?.players || state.players).map((p) => ({
      ...p,
      squad: {}
    }));

    const startingBudget = mpState.roomData?.startingBudget || 200000;
    const initialBudgets = {};
    cleanPlayers.forEach((p) => {
      initialBudgets[p.id] = startingBudget;
    });

    mpState.roomRef.update({
      status: 'drafting',
      pool: JSON.parse(JSON.stringify(charsList)),
      archive: [],
      currentDraft: null,
      currentAuction: null,
      currentPlayerIndex: 0,
      players: cleanPlayers,
      budgets: initialBudgets
    });

    playSound('victory');
  }

  function leaveOnlineRoom(removeFromDb = true) {
    if (mpState.roomRef) {
      mpState.roomRef.off();

      if (removeFromDb) {
        const localId = getOrSetLocalPlayerId();
        if (mpState.isHost) {
          mpState.roomRef.remove();
        } else if (mpState.roomData && mpState.roomData.players) {
          const remainingPlayers = ensureArray(mpState.roomData.players).filter((p) => p.id !== localId);
          mpState.roomRef.child('players').set(remainingPlayers);
        }
      }

      mpState.roomRef = null;
    }

    if (mpState.auctionLocalTimerInterval) {
      clearInterval(mpState.auctionLocalTimerInterval);
      mpState.auctionLocalTimerInterval = null;
    }

    mpState.isOnline = false;
    mpState.roomCode = null;
    mpState.roomData = null;

    const activeBar = document.getElementById('active-room-bar');
    if (activeBar) activeBar.style.display = 'none';

    const dot = document.getElementById('mp-header-status-dot');
    if (dot) dot.classList.remove('online');

    const mpModal = document.getElementById('multiplayer-modal');
    if (mpModal && mpModal.open) mpModal.close();

    const aucModal = document.getElementById('auction-modal');
    if (aucModal && aucModal.open) aucModal.close();

    // Clean URL
    const url = new URL(window.location.href);
    url.searchParams.delete('room');
    window.history.replaceState({}, '', url.pathname);

    initGame(2);
    playSound('click');
  }

  function copyRoomLink() {
    if (!mpState.roomCode) return;
    const url = `${window.location.origin}${window.location.pathname}?room=${mpState.roomCode}`;
    navigator.clipboard.writeText(url).then(() => {
      const btn = document.getElementById('mp-copy-link-btn');
      if (btn) {
        const orig = btn.textContent;
        btn.textContent = 'Copied Link! ✅';
        setTimeout(() => (btn.textContent = orig), 2000);
      }
      playSound('click');
    }).catch(() => {
      prompt('Copy this invite link:', url);
    });
  }

  function copyRoomCode() {
    if (!mpState.roomCode) return;
    navigator.clipboard.writeText(mpState.roomCode).then(() => {
      const btn = document.getElementById('mp-copy-code-btn');
      if (btn) {
        const orig = btn.textContent;
        btn.textContent = 'Copied Code! ✅';
        setTimeout(() => (btn.textContent = orig), 2000);
      }
      playSound('click');
    }).catch(() => {
      prompt('Room Code:', mpState.roomCode);
    });
  }

  function checkUrlRoomParam() {
    const params = new URLSearchParams(window.location.search);
    const roomParam = params.get('room');
    if (roomParam) {
      const joinCodeInput = document.getElementById('mp-join-code-input');
      if (joinCodeInput) joinCodeInput.value = roomParam.trim().toUpperCase();

      openMultiplayerModal();
      showMpTab('mp-join-panel');
    }
  }

  // --- 16. EVENT LISTENERS & BOOTSTRAP ---
  function setupEventListeners() {
    // Offline Auction Toggle in Top Bar
    document.getElementById('offline-auction-btn')?.addEventListener('click', () => {
      toggleOfflineAuctionMode();
    });

    // Offline Auction Setup Controls
    document.getElementById('setup-offline-auction-toggle')?.addEventListener('change', (e) => {
      const isChecked = e.target.checked;
      const label = document.getElementById('setup-offline-auction-label');
      if (label) {
        label.textContent = isChecked ? 'ON' : 'OFF';
        label.style.color = isChecked ? 'var(--gold)' : 'var(--text-muted)';
      }
      const optionsBox = document.getElementById('setup-offline-auction-options');
      if (optionsBox) optionsBox.style.display = isChecked ? 'grid' : 'none';
      state.isAuctionMode = isChecked;
    });

    document.getElementById('setup-offline-starting-budget')?.addEventListener('change', (e) => {
      const budget = parseInt(e.target.value, 10) || 200000;
      state.startingBudget = budget;
    });

    document.getElementById('setup-offline-bid-timer')?.addEventListener('change', (e) => {
      const timer = parseInt(e.target.value, 10);
      state.bidTimerDuration = isNaN(timer) ? 15 : timer;
    });

    // Universe Edition Switchers (Header)
    document.querySelectorAll('.uni-tab').forEach((tab) => {
      tab.addEventListener('click', () => {
        const uni = tab.dataset.universe;
        if (uni && uni !== state.universe) {
          setUniverse(uni, true);
        }
      });
    });

    // Universe Edition Switchers (Setup Modal)
    document.querySelectorAll('.uni-setup-btn').forEach((btn) => {
      btn.addEventListener('click', () => {
        const uni = btn.dataset.universe;
        if (uni) {
          document.querySelectorAll('.uni-setup-btn').forEach((b) => b.classList.remove('active'));
          btn.classList.add('active');
          setUniverse(uni, true);
          renderSetupPlayerInputs();
        }
      });
    });

    document.getElementById('summon-card-btn')?.addEventListener('click', drawRandomCard);
    document.getElementById('interactive-deck')?.addEventListener('click', drawRandomCard);
    document.getElementById('quick-random-btn')?.addEventListener('click', drawRandomCard);

    document.getElementById('reset-game-btn')?.addEventListener('click', () => {
      if (confirm('Start a fresh match? Squads and drafted cards will reset.')) {
        if (mpState.isOnline && mpState.isHost) {
          launchOnlineMatch();
        } else {
          initGame(state.players.length);
        }
        playSound('click');
      }
    });

    document.getElementById('sound-btn')?.addEventListener('click', () => {
      state.soundEnabled = !state.soundEnabled;
      document.getElementById('sound-btn').textContent = state.soundEnabled ? '🔊' : '🔇';
      playSound('click');
    });

    document.getElementById('bgm-btn')?.addEventListener('click', toggleBGM);

    document.querySelectorAll('.theme-tab').forEach((tab) => {
      tab.addEventListener('click', () => {
        document.querySelectorAll('.theme-tab').forEach((t) => t.classList.remove('active'));
        tab.classList.add('active');
        state.theme = tab.dataset.theme;
        document.body.className = `theme-${state.theme}`;
        playSound('click');
      });
    });

    document.getElementById('btn-discard-card')?.addEventListener('click', discardCard);

    document.querySelectorAll('.close-modal-btn').forEach((btn) => {
      btn.addEventListener('click', () => {
        btn.closest('dialog')?.close();
        playSound('click');
      });
    });

    // Multiplayer Modal & Lobby Controls
    document.getElementById('open-multiplayer-btn')?.addEventListener('click', openMultiplayerModal);
    document.getElementById('mp-show-create-btn')?.addEventListener('click', () => showMpTab('mp-create-panel'));
    document.getElementById('mp-show-join-btn')?.addEventListener('click', () => showMpTab('mp-join-panel'));
    document.getElementById('mp-back-to-main-btn1')?.addEventListener('click', () => showMpTab('mp-main-panel'));
    document.getElementById('mp-back-to-main-btn2')?.addEventListener('click', () => showMpTab('mp-main-panel'));
    document.getElementById('mp-confirm-create-btn')?.addEventListener('click', createOnlineRoom);
    document.getElementById('mp-confirm-join-btn')?.addEventListener('click', () => {
      const code = document.getElementById('mp-join-code-input')?.value;
      const name = document.getElementById('mp-join-name-input')?.value;
      joinOnlineRoom(code, name);
    });
    document.getElementById('mp-lobby-start-btn')?.addEventListener('click', launchOnlineMatch);
    document.getElementById('mp-lobby-leave-btn')?.addEventListener('click', () => leaveOnlineRoom(true));
    document.getElementById('leave-room-btn')?.addEventListener('click', () => {
      if (confirm('Are you sure you want to leave the online room?')) {
        leaveOnlineRoom(true);
      }
    });
    document.getElementById('mp-copy-code-btn')?.addEventListener('click', copyRoomCode);
    document.getElementById('mp-copy-link-btn')?.addEventListener('click', copyRoomLink);
    document.getElementById('active-room-copy-btn')?.addEventListener('click', copyRoomLink);

    // Create panel auction toggle change listener
    document.getElementById('mp-create-auction-toggle')?.addEventListener('change', (e) => {
      const isChecked = e.target.checked;
      const label = document.getElementById('mp-create-auction-label');
      if (label) label.textContent = isChecked ? 'ON' : 'OFF';
      const optionsBox = document.getElementById('mp-create-auction-options');
      if (optionsBox) optionsBox.style.display = isChecked ? 'grid' : 'none';
    });

    // Lobby In-Room Settings Controls (Host live edits)
    document.getElementById('mp-lobby-auction-toggle')?.addEventListener('change', (e) => {
      if (mpState.isOnline && mpState.isHost && mpState.roomRef) {
        const isAuction = (e.target.value === 'true');
        mpState.roomRef.update({ isAuctionMode: isAuction });
        playSound('click');
      }
    });
    document.getElementById('mp-lobby-budget-select')?.addEventListener('change', (e) => {
      if (mpState.isOnline && mpState.isHost && mpState.roomRef) {
        const budget = parseInt(e.target.value, 10) || 200000;
        mpState.roomRef.update({ startingBudget: budget });
        playSound('click');
      }
    });
    document.getElementById('mp-lobby-universe-select')?.addEventListener('change', (e) => {
      if (mpState.isOnline && mpState.isHost && mpState.roomRef) {
        const uni = e.target.value;
        const charsList = typeof window.getStoredCharacters === 'function'
          ? window.getStoredCharacters(uni)
          : (state.allCharacters && state.allCharacters.length ? state.allCharacters : window.getStoredCharacters());
        mpState.roomRef.update({
          universe: uni,
          pool: JSON.parse(JSON.stringify(charsList))
        });
        playSound('click');
      }
    });

    // Auction Arena Bidding Controls
    document.querySelectorAll('.btn-quick-bid').forEach((btn) => {
      btn.addEventListener('click', () => {
        const inc = parseInt(btn.dataset.inc, 10);
        if (inc) {
          if (mpState.isOnline) placeAuctionBid(inc, false);
          else placeOfflineAuctionBid(inc, false);
        }
      });
    });
    document.getElementById('auction-place-custom-bid-btn')?.addEventListener('click', () => {
      if (mpState.isOnline) placeAuctionBid(0, true);
      else placeOfflineAuctionBid(0, true);
    });
    document.getElementById('auction-fold-btn')?.addEventListener('click', () => {
      if (mpState.isOnline) {
        const msg = document.getElementById('auction-bid-status-msg');
        if (msg) msg.textContent = '🏳️ Folded this round';
        playSound('click');
      } else {
        foldOfflineAuctionBid();
      }
    });
    document.getElementById('auction-host-sold-btn')?.addEventListener('click', () => {
      if (confirm('Strike gavel and sell now to the highest bidder?')) {
        if (mpState.isOnline) resolveAuction(true, false);
        else resolveOfflineAuction(true, false);
      }
    });
    document.getElementById('auction-host-pass-btn')?.addEventListener('click', () => {
      if (confirm('Pass and discard this card to the void?')) {
        if (mpState.isOnline) resolveAuction(false, true);
        else resolveOfflineAuction(false, true);
      }
    });

    // Modals
    document.getElementById('open-battle-btn')?.addEventListener('click', initBattleArena);
    document.getElementById('open-archive-btn')?.addEventListener('click', openArchiveModal);
    document.getElementById('open-roster-btn')?.addEventListener('click', initRosterModal);
    document.getElementById('open-setup-btn')?.addEventListener('click', initSetupModal);

    // Battle Arena
    document.getElementById('battle-p1-select')?.addEventListener('change', updateBattleStagePreview);
    document.getElementById('battle-p2-select')?.addEventListener('change', updateBattleStagePreview);
    document.getElementById('start-battle-sim-btn')?.addEventListener('click', simulateBattle);
    document.getElementById('start-tournament-btn')?.addEventListener('click', runGrandTournament);

    // Victory Modal
    document.getElementById('victory-battle-btn')?.addEventListener('click', () => {
      document.getElementById('victory-modal')?.close();
      initBattleArena();
    });
    document.getElementById('close-victory-btn')?.addEventListener('click', () => {
      document.getElementById('victory-modal')?.close();
    });
    document.getElementById('restart-victory-btn')?.addEventListener('click', () => {
      document.getElementById('victory-modal')?.close();
      if (mpState.isOnline && mpState.isHost) {
        launchOnlineMatch();
      } else {
        initGame(state.players.length);
      }
    });

    // Roster Editor
    document.getElementById('roster-search-input')?.addEventListener('input', renderRosterTable);
    document.getElementById('roster-universe-filter')?.addEventListener('change', renderRosterTable);
    document.getElementById('toggle-add-form-btn')?.addEventListener('click', () => openEditForm(null));
    document.getElementById('cancel-edit-btn')?.addEventListener('click', () => {
      document.getElementById('character-edit-form').style.display = 'none';
    });
    document.getElementById('save-char-form-btn')?.addEventListener('click', saveCharacterForm);
    document.getElementById('export-roster-btn')?.addEventListener('click', exportRosterJSON);
    document.getElementById('reset-default-roster-btn')?.addEventListener('click', () => {
      const uniConfig = getCurrentUniverseConfig();
      if (confirm(`Reset character roster back to master default for ${uniConfig.name}?`)) {
        if (typeof window.resetUniverseRoster === 'function') {
          state.allCharacters = window.resetUniverseRoster(state.universe);
        } else {
          state.allCharacters = window.getStoredCharacters(state.universe);
        }
        state.pool = JSON.parse(JSON.stringify(state.allCharacters));
        renderRosterTable();
        updateHeaderStats();
        playSound('assign');
      }
    });

    // Setup Presets
    document.querySelectorAll('.p-count-btn').forEach((btn) => {
      btn.addEventListener('click', () => {
        const count = parseInt(btn.dataset.count, 10);
        if (count) {
          initGame(count);
          renderSetupPlayerInputs();
          playSound('click');
        }
      });
    });

    document.getElementById('start-game-btn')?.addEventListener('click', applySetup);
    document.getElementById('reset-new-game-btn')?.addEventListener('click', () => {
      initGame(state.players.length);
      document.getElementById('setup-modal')?.close();
      playSound('click');
    });

    // Keyboard Shortcuts (Speed Drafting Engine)
    window.addEventListener('keydown', (e) => {
      if (e.target.tagName === 'INPUT' || e.target.tagName === 'TEXTAREA') return;

      const charModal = document.getElementById('character-modal');
      const isModalOpen = charModal && charModal.open;

      if (isModalOpen) {
        // Hotkeys 1-7 for assigning to role
        if (['1', '2', '3', '4', '5', '6', '7'].includes(e.key)) {
          e.preventDefault();
          const roleIndex = parseInt(e.key, 10) - 1;
          const currentRoles = getRoles();
          if (roleIndex >= 0 && roleIndex < currentRoles.length) {
            const targetRole = currentRoles[roleIndex];
            const activePlayer = state.players[state.activePlayerIndex];
            if (activePlayer && !activePlayer.squad[targetRole.key] && state.drawnCard) {
              assignCardToRole(activePlayer, targetRole.key, state.drawnCard);
            }
          }
        } else if (e.key === 'd' || e.key === 'D' || e.key === 'Backspace') {
          e.preventDefault();
          discardCard();
        }
      } else {
        if (e.key === '.' || e.code === 'Space' || e.key === 'Enter') {
          e.preventDefault();
          drawRandomCard();
        }
      }
    });
  }

  function initDeckParallax() {
    const deck = document.getElementById('interactive-deck');
    if (!deck) return;
    deck.addEventListener('mousemove', (e) => {
      const rect = deck.getBoundingClientRect();
      const x = e.clientX - rect.left - rect.width / 2;
      const y = e.clientY - rect.top - rect.height / 2;
      const rotateX = (-y / rect.height) * 22;
      const rotateY = (x / rect.width) * 22;
      deck.style.transform = `translateY(-12px) scale(1.08) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
    });
    deck.addEventListener('mouseleave', () => {
      deck.style.transform = '';
    });
  }

  // --- BOOTSTRAP ---
  window.addEventListener('DOMContentLoaded', () => {
    initParticleCanvas();
    setupEventListeners();
    initDeckParallax();
    initGame(2);
    checkUrlRoomParam();
  });
})();
