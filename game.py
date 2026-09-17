#!/usr/bin/env python3
"""
SOLO LEVELING — RANDOM CARD TEAM BUILDING GAME
Console Engine & Battle Simulation
"""

import json
import random
import sys
import os

SCRIPT_DIR = os.path.dirname(os.path.abspath(__file__))
DATA_FILE = os.path.join(SCRIPT_DIR, "cards_data.json")

ROLES = [
    ("LEADER", "👑 TEAM LEADER"),
    ("FIGHTER", "⚔️ FIGHTER"),
    ("MAGE", "🔮 MAGE"),
    ("TANK", "🛡️ TANK"),
    ("HEALER", "💚 HEALER"),
    ("SUPPORT", "💚 SUPPORT"),
    ("ASSASSIN", "🗡️ ASSASSIN")
]

WEIGHTS = {
    "raw_power": 0.30,
    "hax": 0.20,
    "speed": 0.15,
    "durability": 0.10,
    "synergy": 0.15,
    "battle_iq": 0.10
}

def load_cards():
    with open(DATA_FILE, "r", encoding="utf-8") as f:
        return json.load(f)

def format_card_display(card):
    abilities_str = "\n".join(f"• {a}" for a in card['abilities'])
    return f"""━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
🎴 RANDOM CARD DRAW
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

**Character:** {card['name']}
**Role:** {card['role']}
**Rank/Tier:** {card['tier']}

**Details:**
{card['description']}

**Main abilities:**
{abilities_str}

**Important feats:**
{card['feats']}

**Best team function:**
{card['best_function']}

**Team value:** {card['team_value']}
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"""

def evaluate_team(team_assignments):
    # Calculate weighted stats across the 7 assigned cards
    stat_totals = {"raw_power": 0.0, "hax": 0.0, "speed": 0.0, "durability": 0.0, "synergy": 0.0, "battle_iq": 0.0}
    
    for role_key, card in team_assignments.items():
        for stat, val in card['stats'].items():
            stat_totals[stat] += val
            
    num_members = len(team_assignments)
    avg_stats = {k: round(v / num_members, 2) for k, v in stat_totals.items()}
    
    # Synergies and Bonuses
    names = [c['name'] for c in team_assignments.values()]
    synergy_bonus = 0.0
    
    # Special Synergies
    has_jinwoo = "Sung Jinwoo" in names
    has_ashborn = "Ashborn" in names
    has_shadows = any(c['name'] in ["Bellion", "Beru", "Igris", "Tusk", "Greed", "Iron", "Tank", "Kaisel", "Jima"] for c in team_assignments.values())
    has_monarchs = sum(1 for c in team_assignments.values() if "Monarch" in c['role'] or "Monarch" in c['tier'])
    has_rulers = sum(1 for c in team_assignments.values() if "Ruler" in c['role'] or "Ruler" in c['title'] or "Ruler" in c['description'])
    has_healer = any(c['name'] in ["Min Byung-Gyu", "Lee Joohee", "Akari Shimizu", "Han Semi", "Jung Yerim"] for c in team_assignments.values())
    
    notes = []
    if (has_jinwoo or has_ashborn) and has_shadows:
        synergy_bonus += 0.5
        notes.append("⚡ [Monarch's Dominion]: Shadow Monarch + Shadow Army synergy activates (+5% all-around cohesion)!")
        
    if has_healer and "Min Byung-Gyu" in names:
        synergy_bonus += 0.4
        notes.append("✨ [S-Rank Divine Blessing]: Min Byung-Gyu amplifies entire team's recovery and battle longevity!")

    if "Thomas Andre" in names and ("Sung Jinwoo" in names or "Liu Zhigang" in names):
        synergy_bonus += 0.3
        notes.append("🛡️ [Apex Hunter Coalition]: Frontline physical dominance established!")

    avg_stats['synergy'] = min(10.0, round(avg_stats['synergy'] + synergy_bonus, 2))
    
    # Overall Power calculation (/100)
    final_score = (
        avg_stats['raw_power'] * WEIGHTS['raw_power'] +
        avg_stats['hax'] * WEIGHTS['hax'] +
        avg_stats['speed'] * WEIGHTS['speed'] +
        avg_stats['durability'] * WEIGHTS['durability'] +
        avg_stats['synergy'] * WEIGHTS['synergy'] +
        avg_stats['battle_iq'] * WEIGHTS['battle_iq']
    ) * 10.0
    
    final_score = round(final_score, 1)
    
    if final_score >= 93.0:
        verdict = "WIN (SUPREME VICTORY)"
        analysis = "This team possesses godly reality-warping might, immense Monarch/Ruler command, and unstoppable sustain. Virtually no army in the dimensional multiverse can withstand this lineup."
        hardest_matchup = "Primordial War Incursion (Simultaneous assault by Absolute Being constructs & full Monarch Coalition)"
    elif final_score >= 87.0:
        verdict = "WIN"
        analysis = "Exceptional power output, high-tier S/SS-Rank composition, and supreme tactical adaptability. The team easily clears planetary-level S-Rank gates and high Monarch threats."
        hardest_matchup = "Full Power Antares leading an army of Ancient Berserk Dragons with Monarch of White Flames"
    elif final_score >= 80.0:
        verdict = "EXTREMELY CLOSE"
        analysis = "Formidable raid team capable of conquering Jeju Island or S-Rank Gates, but lacks sufficient God-Tier hax to guarantee survival against dual Monarch assaults."
        hardest_matchup = "Monarch of Frost (Sillad) and Monarch of Fangs (Rakan) coordinated ambush"
    else:
        verdict = "LOSS / HIGH CASUALTY RISK"
        analysis = "The team lacks either sufficient high-tier hax, godly durability, or pure raw destructive output to conquer apocalyptic dimensional invasions."
        hardest_matchup = "Any high-tier Monarch awakening or Monarch-level gate boss"

    return avg_stats, final_score, verdict, analysis, hardest_matchup, notes

def main():
    print("""
================================================================================
⚡ SOLO LEVELING — RANDOM CARD TEAM BUILDING GAME ⚡
================================================================================
Build your ultimate 7-member Solo Leveling squad!
Command Monarchs, Rulers, National-Level Hunters, S-Ranks, and Shadow Marshals.

Rules:
• Type '.' to draw a random character card.
• Choose KEEP to add them to your squad, or REJECT to discard them permanently.
• If you keep a card, assign them to one of the 7 available positions.
• Each character and position can only be chosen once.
================================================================================
""")
    all_cards = load_cards()
    available_cards = list(all_cards)
    
    # Track assignments
    team_slots = {k: None for k, _ in ROLES}
    used_card_ids = set()
    
    while any(v is None for v in team_slots.values()):
        # Show remaining slots
        empty_slots = [label for key, label in ROLES if team_slots[key] is None]
        print(f"\nRemaining Slots to Fill ({len(empty_slots)}/7):")
        for key, label in ROLES:
            status = team_slots[key]['name'] if team_slots[key] else "[ EMPTY ]"
            print(f"  {label.ljust(20)}: {status}")
            
        cmd = input("\nEnter '.' to draw a card (or 'q' to quit): ").strip()
        if cmd.lower() == 'q':
            print("Exiting game.")
            sys.exit(0)
            
        if cmd != ".":
            print("Invalid input. Please enter '.' to draw a card.")
            continue
            
        remaining_deck = [c for c in available_cards if c['id'] not in used_card_ids]
        if not remaining_deck:
            print("No more cards remaining in the deck!")
            break
            
        drawn = random.choice(remaining_deck)
        print("\n" + format_card_display(drawn))
        
        # Ask to keep or reject
        while True:
            choice = input("\nDo you want to KEEP this card? (y/n / keep/reject): ").strip().lower()
            if choice in ['y', 'yes', 'keep']:
                # Select position
                valid_empty_roles = [k for k, _ in ROLES if team_slots[k] is None]
                print("\nAvailable positions for this card:")
                for idx, r_key in enumerate(valid_empty_roles, 1):
                    role_name = next(name for key, name in ROLES if key == r_key)
                    is_rec = " ⭐ [Recommended for character]" if r_key in drawn.get('eligible_roles', []) else ""
                    print(f"  {idx}. {role_name}{is_rec}")
                    
                while True:
                    try:
                        pos_choice = input(f"\nSelect position number (1-{len(valid_empty_roles)}): ").strip()
                        pos_idx = int(pos_choice) - 1
                        if 0 <= pos_idx < len(valid_empty_roles):
                            chosen_role = valid_empty_roles[pos_idx]
                            team_slots[chosen_role] = drawn
                            used_card_ids.add(drawn['id'])
                            print(f"\n✅ Assigned {drawn['name']} to {chosen_role}!")
                            break
                        else:
                            print("Invalid number selection.")
                    except ValueError:
                        print("Please enter a valid number.")
                break
            elif choice in ['n', 'no', 'reject', 'discard']:
                used_card_ids.add(drawn['id'])
                print(f"\n❌ Discarded {drawn['name']}. This card will not appear again.")
                break
            else:
                print("Please enter 'y' to keep or 'n' to reject.")

    # Final Team Evaluation
    if all(v is not None for v in team_slots.values()):
        avg_stats, final_score, verdict, analysis, hardest_matchup, notes = evaluate_team(team_slots)
        
        print("\n" + "=" * 60)
        print("🏆 FINAL TEAM EVALUATION & POWER LEVEL")
        print("=" * 60)
        
        for key, label in ROLES:
            c = team_slots[key]
            print(f"{label.ljust(18)}: {c['name']} ({c['tier_category']}-Tier)")
            
        print("\n--- STATISTICAL BREAKDOWN ---")
        print(f"Raw Power (30%)    : {avg_stats['raw_power']}/10")
        print(f"Abilities/Hax (20%): {avg_stats['hax']}/10")
        print(f"Speed (15%)        : {avg_stats['speed']}/10")
        print(f"Durability (10%)   : {avg_stats['durability']}/10")
        print(f"Team Synergy (15%) : {avg_stats['synergy']}/10")
        print(f"Battle IQ (10%)    : {avg_stats['battle_iq']}/10")
        
        if notes:
            print("\n--- SYNERGY ACTIVATIONS ---")
            for note in notes:
                print(f"  {note}")
                
        print("\n" + "═" * 40)
        print(f"⚡ FINAL POWER LEVEL: {final_score}/100")
        print(f"🎖️ VERDICT: {verdict}")
        print("═" * 40)
        
        print("\n📖 BATTLE ANALYSIS:")
        print(analysis)
        
        print(f"\n⚠️ HARDEST ENEMY MATCHUP:\n{hardest_matchup}")
        print("\n" + "=" * 60)

if __name__ == "__main__":
    main()
