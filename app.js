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

  // --- 1. CONSTANTS & ROLES ---
  const ROLES = [
    { key: 'LEADER', name: 'Team Leader', icon: '👑', color: '#ffd166' },
    { key: 'FIGHTER', name: 'Fighter', icon: '⚔️', color: '#ff0054' },
    { key: 'MAGE', name: 'Mage', icon: '🔮', color: '#9d4edd' },
    { key: 'TANK', name: 'Tank', icon: '🛡️', color: '#3a86ff' },
    { key: 'HEALER', name: 'Healer', icon: '💚', color: '#06d6a0' },
    { key: 'SUPPORT', name: 'Support', icon: '✨', color: '#fca311' },
    { key: 'ASSASSIN', name: 'Assassin', icon: '🗡️', color: '#ec4899' }
  ];

  const DEFAULT_PLAYER_NAMES = [
    'Ahjin Guild (P1)',
    'White Tiger Guild (P2)',
    'Hunters Guild (P3)',
    'Draw Sword Guild (P4)',
    'Scavenger Guild (P5)',
    'Fiend Guild (P6)',
    'Knights Guild (P7)',
    'Fame Guild (P8)'
  ];

  const PLAYER_COLORS = [
    '#00d2ff', '#ff0054', '#ffd166', '#06d6a0',
    '#9d4edd', '#f97316', '#ec4899', '#14b8a6'
  ];

  // --- 2. GLOBAL APP STATE ---
  const state = {
    allCharacters: [],
    pool: [],
    archive: [], // { character, status: 'assigned'|'discarded', player: playerName, role: roleKey }
    players: [],
    activePlayerIndex: 0,
    drawnCard: null,
    maxPicksPerPlayer: 7,
    soundEnabled: true,
    bgmEnabled: false,
    theme: 'shadow'
  };

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
    let total = 0;
    const filledRoles = Object.keys(player.squad);

    filledRoles.forEach((roleKey) => {
      const char = player.squad[roleKey];
      if (char) {
        total += calculateCharacterCombatPower(char, roleKey);
      }
    });

    // Leader Synergy Bonus (+10% to whole squad if Leader is God Tier / Monarch / Ruler)
    const leader = player.squad['LEADER'];
    if (leader && (leader.tier_category === 'SSS' || leader.tier_category === 'SS')) {
      total = Math.round(total * 1.1);
    }

    return total;
  }

  // --- 7. INITIALIZATION & SETUP ---
  function initGame(playerCount = 2, customNames = null) {
    state.allCharacters = window.getStoredCharacters();
    state.pool = JSON.parse(JSON.stringify(state.allCharacters));
    state.archive = [];

    state.players = [];
    for (let i = 0; i < playerCount; i++) {
      const pName =
        (customNames && customNames[i]) ||
        DEFAULT_PLAYER_NAMES[i] ||
        `Player ${i + 1}`;
      state.players.push({
        id: `p${i + 1}`,
        name: pName,
        color: PLAYER_COLORS[i % PLAYER_COLORS.length],
        squad: {} // key: LEADER, FIGHTER, etc.
      });
    }
    state.activePlayerIndex = 0;
    state.drawnCard = null;

    updateHeaderStats();
    renderPlayersDock();
    updateTurnHUD();
  }

  function updateHeaderStats() {
    const totalCountEl = document.getElementById('btn-total-count');
    if (totalCountEl) totalCountEl.textContent = state.allCharacters.length;

    const pCountEl = document.getElementById('btn-player-count');
    if (pCountEl) pCountEl.textContent = `${state.players.length}P`;

    const remainingEl = document.getElementById('remaining-count');
    if (remainingEl) remainingEl.textContent = state.pool.length;

    const totalPoolEl = document.getElementById('total-pool-count');
    if (totalPoolEl) totalPoolEl.textContent = state.allCharacters.length;

    const vaultCountEl = document.getElementById('btn-vault-count');
    if (vaultCountEl) vaultCountEl.textContent = state.archive.length;
  }

  function updateTurnHUD() {
    const activePlayer = state.players[state.activePlayerIndex];
    const turnNameEl = document.getElementById('current-turn-name');
    if (turnNameEl && activePlayer) {
      turnNameEl.textContent = activePlayer.name;
      turnNameEl.style.color = activePlayer.color;
    }

    const dotEl = document.getElementById('turn-pulse-dot');
    if (dotEl && activePlayer) {
      dotEl.style.backgroundColor = activePlayer.color;
      dotEl.style.boxShadow = `0 0 12px ${activePlayer.color}`;
    }

    updateHeaderStats();

    state.players.forEach((p, idx) => {
      const cardEl = document.getElementById(`player-card-${p.id}`);
      if (cardEl) {
        if (idx === state.activePlayerIndex) {
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

    state.players.forEach((player, idx) => {
      const squadPower = calculateSquadPower(player);
      const filledCount = Object.keys(player.squad).length;

      const pCard = document.createElement('div');
      pCard.id = `player-card-${player.id}`;
      pCard.className = `player-card ${idx === state.activePlayerIndex ? 'active-turn' : ''}`;

      let rolesHTML = '';
      ROLES.forEach((role) => {
        const slotted = player.squad[role.key];

        if (slotted) {
          let tierClass = 'tier-a';
          if (slotted.tier_category === 'SSS') tierClass = 'tier-sss';
          else if (slotted.tier_category === 'SS') tierClass = 'tier-ss';
          else if (slotted.tier_category === 'S') tierClass = 'tier-s';
          else if (slotted.tier_category === 'A+') tierClass = 'tier-aplus';

          const effectivePower = calculateCharacterCombatPower(slotted, role.key);

          rolesHTML += `
            <div class="role-slot-row filled" style="cursor:default;" title="Locked: ${slotted.name} (${role.name})">
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
            <div class="role-slot-row" style="cursor:default;">
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
          </div>
          <div class="player-power-pill" data-player="${player.id}" title="Click to view power formula breakdown">
            ⚡ ${squadPower.toLocaleString()} PWR (${filledCount}/${state.maxPicksPerPlayer}) ℹ️
          </div>
        </div>
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

  // --- 9. DRAW CARD & REVEAL FLOW (NO REPLACEMENTS PERMITTED) ---
  function drawRandomCard() {
    if (state.pool.length === 0) {
      alert('⚡ The Dimensional Gate is empty! All hunters have been drafted.');
      return;
    }

    playSound('draw');

    const randomIndex = Math.floor(Math.random() * state.pool.length);
    const drawn = state.pool[randomIndex];
    state.drawnCard = drawn;

    openCharacterRevealModal(drawn);
  }

  function openCharacterRevealModal(char) {
    const modal = document.getElementById('character-modal');
    if (!modal) return;

    if (char.tier_category === 'SSS') playSound('rank_sss');

    const activePlayer = state.players[state.activePlayerIndex];

    const rankEl = document.getElementById('reveal-rank');
    rankEl.textContent = char.tier;
    rankEl.className = `reveal-rank-banner tier-${char.tier_category.toLowerCase().replace('+', 'plus')}`;

    document.getElementById('reveal-avatar-symbol').textContent = char.symbol || '⚔️';
    document.getElementById('reveal-name').textContent = char.name;
    document.getElementById('reveal-title').textContent = char.title || char.role;
    document.getElementById('reveal-power-num').textContent = `⚡ ${char.power_number.toLocaleString()} PWR (PL: ${char.power_level})`;

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

    document.getElementById('reveal-desc').textContent = char.description;
    document.getElementById('reveal-feats').textContent = `🏆 Feats: ${char.feats}`;
    document.getElementById('reveal-quote').textContent = `"${char.quote || 'Arise.'}"`;

    // Role assignment buttons for active player (STRICT NO REPLACEMENT RULE)
    const roleBtnsContainer = document.getElementById('reveal-role-buttons');
    roleBtnsContainer.innerHTML = '';

    const currentSquad = activePlayer.squad;

    ROLES.forEach((role) => {
      const isEligible = char.eligible_roles && char.eligible_roles.includes(role.key);
      const isSlotOccupied = !!currentSquad[role.key];

      const btn = document.createElement('button');
      btn.type = 'button';

      if (isSlotOccupied) {
        // Disabled: NO REPLACEMENT ALLOWED
        btn.disabled = true;
        btn.className = 'btn-assign-role';
        btn.style.opacity = '0.35';
        btn.style.cursor = 'not-allowed';
        btn.style.borderColor = 'rgba(255,255,255,0.1)';
        btn.innerHTML = `${role.icon} ${role.name} <span style="font-size:0.7rem; color:#94a3b8;">(Filled 🔒)</span>`;
      } else {
        // Open slot: can assign
        btn.className = `btn-assign-role ${isEligible ? 'recommended' : ''}`;
        btn.innerHTML = `${role.icon} ${role.name} ${isEligible ? '⭐ (Best Fit)' : ''}`;

        btn.addEventListener('click', () => {
          assignCardToRole(activePlayer, role.key, char);
        });
      }

      roleBtnsContainer.appendChild(btn);
    });

    modal.showModal();
  }

  function assignCardToRole(player, roleKey, char) {
    // Strict safeguard: cannot overwrite occupied slot
    if (player.squad[roleKey]) {
      alert('This slot is already filled! No replacements allowed.');
      return;
    }

    player.squad[roleKey] = char;

    // Permanently consume from active pool (Strict No-Repetition, No Backup)
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
    if (modal) modal.close();

    renderPlayersDock();
    updateTurnHUD();

    checkDraftCompletion();

    // Advance turn to next player
    state.activePlayerIndex = (state.activePlayerIndex + 1) % state.players.length;
    updateTurnHUD();
  }

  function discardCard() {
    if (!state.drawnCard) return;

    // Permanently remove from pool (No Backup)
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
    if (modal) modal.close();

    updateTurnHUD();

    state.activePlayerIndex = (state.activePlayerIndex + 1) % state.players.length;
    updateTurnHUD();
  }

  function checkDraftCompletion() {
    const allFilled = state.players.every(
      (p) => Object.keys(p.squad).length >= state.maxPicksPerPlayer
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
          + [15% Role Match Bonus] + [10% Monarch Leader Aura].
        </span>
      </div>
      <div style="display:flex; flex-direction:column; gap:0.5rem;">
    `;

    ROLES.forEach((r) => {
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

    const p1Leader = p1.squad['LEADER']?.name || 'Commander';
    const p2Leader = p2.squad['LEADER']?.name || 'Commander';
    const p1Mage = p1.squad['MAGE']?.name || 'Mage Artillery';
    const p2Mage = p2.squad['MAGE']?.name || 'Mage Artillery';
    const p1Assassin = p1.squad['ASSASSIN']?.name || 'Shadow Assassin';
    const p2Assassin = p2.squad['ASSASSIN']?.name || 'Shadow Assassin';

    const rounds = [
      {
        text: `🚩 <strong>ROUND 1 — VANGUARD & LEADER INITIATIVE:</strong> ${p1Leader} commands the frontline for ${p1.name}, clashing with ${p2Leader} of ${p2.name}!`,
        p1Dmg: Math.round(15 + Math.random() * 15 * (p2Pwr / (p1Pwr + p2Pwr))),
        p2Dmg: Math.round(15 + Math.random() * 15 * (p1Pwr / (p1Pwr + p2Pwr)))
      },
      {
        text: `🔮 <strong>ROUND 2 — ARCANE & ASSASSIN FLANKING:</strong> ${p1Mage} unleashes a devastating area spell while ${p2Assassin} executes a stealth ambush!`,
        p1Dmg: Math.round(20 + Math.random() * 15 * (p2Pwr / (p1Pwr + p2Pwr))),
        p2Dmg: Math.round(20 + Math.random() * 15 * (p1Pwr / (p1Pwr + p2Pwr)))
      },
      {
        text: `🛡️ <strong>ROUND 3 — HEALER CLUTCH & TANK BARRIER:</strong> Frontline shields absorb heavy shockwaves while healers activate emergency cellular recovery!`,
        p1Dmg: Math.round(10 + Math.random() * 10),
        p2Dmg: Math.round(10 + Math.random() * 10)
      },
      {
        text: `👑 <strong>ROUND 4 — MONARCH DOMAIN & ULTIMATE FINISHERS:</strong> Sovereign authority manifests across the entire battlefield in an apocalyptic clash!`,
        p1Dmg: Math.round(25 * (p2Pwr / (p1Pwr + 1))),
        p2Dmg: Math.round(25 * (p1Pwr / (p2Pwr + 1)))
      }
    ];

    let currentRound = 0;

    function playRound() {
      if (currentRound < rounds.length) {
        const r = rounds[currentRound];
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
        setTimeout(playRound, 900);
      } else {
        const finalP1Score = p1Pwr * (p1Hp + 20);
        const finalP2Score = p2Pwr * (p2Hp + 20);

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
        winEntry.style.background = 'rgba(255, 209, 102, 0.12)';
        winEntry.innerHTML = `🏆 <strong>VICTORY!</strong> <strong style="color:${winner.color}; font-size:1.05rem;">${winner.name}</strong> overpowers ${loser.name} through superior squad synergy and power!`;
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
          window.saveStoredCharacters(state.allCharacters);
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

    window.saveStoredCharacters(state.allCharacters);
    document.getElementById('character-edit-form').style.display = 'none';
    renderRosterTable();
    updateHeaderStats();
    playSound('assign');
  }

  function exportRosterJSON() {
    const dataStr = 'data:text/json;charset=utf-8,' + encodeURIComponent(JSON.stringify(state.allCharacters, null, 2));
    const dlAnchor = document.createElement('a');
    dlAnchor.setAttribute('href', dataStr);
    dlAnchor.setAttribute('download', 'solo_leveling_roster.json');
    dlAnchor.click();
    playSound('click');
  }

  // --- 14. GAME SETUP MODAL ---
  function initSetupModal() {
    const modal = document.getElementById('setup-modal');
    if (!modal) return;

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

  // --- 16. EVENT LISTENERS & BOOTSTRAP ---
  function setupEventListeners() {
    document.getElementById('summon-card-btn')?.addEventListener('click', drawRandomCard);
    document.getElementById('quick-random-btn')?.addEventListener('click', drawRandomCard);

    document.getElementById('reset-game-btn')?.addEventListener('click', () => {
      if (confirm('Start a fresh match? Squads and drafted cards will reset.')) {
        initGame(state.players.length);
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
      initGame(state.players.length);
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
      if (confirm('Reset character roster back to master default (34 canon legends)?')) {
        localStorage.removeItem('solo_leveling_custom_roster');
        state.allCharacters = window.getStoredCharacters();
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

    // Keyboard Shortcuts
    window.addEventListener('keydown', (e) => {
      if (e.target.tagName === 'INPUT' || e.target.tagName === 'TEXTAREA') return;

      if (e.key === '.' || e.code === 'Space') {
        const charModal = document.getElementById('character-modal');
        if (!charModal || !charModal.open) {
          e.preventDefault();
          drawRandomCard();
        }
      }
    });
  }

  // --- BOOTSTRAP ---
  window.addEventListener('DOMContentLoaded', () => {
    initParticleCanvas();
    setupEventListeners();
    initGame(2);
  });
})();
