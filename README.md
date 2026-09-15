# ⚡ SOLO LEVELING: RANDOM CARD TEAM BUILDING GAME (ONLINE EDITION)

A standalone, online-ready card game set strictly within the canon **Solo Leveling universe**.

---

## 🚀 Instant Online Deployment (GitHub Pages)

This project contains a self-contained `index.html` file designed to be hosted for free on **GitHub Pages** with zero setup or build steps.

### How to Host on GitHub:

1. **Create a GitHub Repository**:
   - Go to [github.com/new](https://github.com/new) and create a repository (e.g., `solo-leveling-card-game`).

2. **Push or Upload these files**:
   ```powershell
   cd C:\Users\Saikr\.gemini\antigravity\scratch\solo_leveling_card_game
   git init
   git add .
   git commit -m "Solo Leveling Card Edition"
   git branch -M main
   git remote add origin https://github.com/<YOUR_USERNAME>/solo-leveling-card-game.git
   git push -u origin main
   ```
   *(Or simply drag & drop `index.html` and `.nojekyll` directly into your GitHub repository in your browser!)*

3. **Enable GitHub Pages**:
   - In your GitHub repo, go to **Settings** > **Pages** (in the left sidebar).
   - Under **Build and deployment** -> **Source**, select **Deploy from a branch**.
   - Select the `main` branch and `/ (root)` folder, then click **Save**.

4. **Play Online**:
   - Your game will be live instantly at:
     `https://<YOUR_USERNAME>.github.io/solo-leveling-card-game/`

---

## 📁 Local Files

Location: `C:\Users\Saikr\.gemini\antigravity\scratch\solo_leveling_card_game\`

| File | Description |
|---|---|
| [`index.html`](file:///C:/Users/Saikr/.gemini/antigravity/scratch/solo_leveling_card_game/index.html) | **Main Online Entry Point**: Fully self-contained card edition with embedded canon database, particle effects, sound synthesis, and real-time team evaluation. |
| [`.nojekyll`](file:///C:/Users/Saikr/.gemini/antigravity/scratch/solo_leveling_card_game/.nojekyll) | Config file ensuring GitHub Pages serves all static assets directly. |
| [`cards_data.json`](file:///C:/Users/Saikr/.gemini/antigravity/scratch/solo_leveling_card_game/cards_data.json) | Standalone JSON database of all 34 prime canon characters with lore, feats, and stats. |
| [`game.py`](file:///C:/Users/Saikr/.gemini/antigravity/scratch/solo_leveling_card_game/game.py) | Python CLI game engine. |

---

## 🎮 Game Rules & Controls

- **Draw**: Press **`.`** (period) key or click **🎴 DRAW CARD**.
- **Inspect**: Review power tier, lore description, main abilities, canon feats, and recommended roles.
- **Keep**: Assign to any of the 7 vacant positions:
  1. 👑 **TEAM LEADER**
  2. ⚔️ **FIGHTER**
  3. 🔮 **MAGE**
  4. 🛡️ **TANK**
  5. 💚 **HEALER** *(Min Byung-Gyu, Lee Joohee, Akari Shimizu, Han Semi, Jung Yerim)*
  6. 💚 **SUPPORT**
  7. 🗡️ **ASSASSIN**
- **Discard**: Discard permanently (card cannot be redrawn).
- **Final Rating**: Once all 7 positions are filled, the system calculates your squad's power score out of 100, displays stat gauges, and gives a battle verdict with your hardest enemy matchup!
