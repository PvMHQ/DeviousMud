exports.getSkillName = function(id) {
    let skillNames = [
      'Overall',
      'Attack',
      'Defence',
      'Strength',
      'Hitpoints',
      'Ranged',
      'Prayer',
      'Magic',
      'Cooking',
      'Woodcutting',
      'Fletching',
      'Fishing',
      'Firemaking',
      'Crafting',
      'Smithing',
      'Mining',
      'Herblore',
      'Agility',
      'Thieving',
      'Slayer',
      'Farming',
      'Runecrafting',
      'Hunter',
      'Construction'
    ]; 
    return skillNames[id];
  };
  exports.getBossName = function(id) {
    let bossNames = [
      {"name":"Abyssal Sire"},
      {"name":"Alchemcal Hydra"},
      {"name":"Barrows Chests"},
      {"name":"Bryophyta"},
      {"name":"Chambers of Xeric"},
      {"name":"Chambers of Xeric:Challenge"},
      {"name":"Chaos Elemental"},
      {"name":"Chaos Fanatic"},
      {"name":"Commander Zilyana"},
      {"name":"Corporeal Beast"},
      {"name":"Crazy Archaeologist"},
      {"name":"Dagannoth Prime"},
      {"name":"Dagannoth Rex"},
      {"name":"Dagannoth Supreme"},
      {"name":"Deranged Archaeologist"},
      {"name":"General Graardor"},
      {"name":"Giant Mole"},
      {"name":"Grotesque Guardians"},
      {"name":"Hespori"},
      {"name":"Kalphite Queen"},
      {"name":"King Black Dragon"},
      {"name":"Kraken"},
      {"name":"Kree'Arra"},
      {"name":"K'ril Tsutsaroth"},
      {"name":"Mimic"},
      {"name":"Obor"},
      {"name":"Sarachnis"},
      {"name":"Scorpia"},
      {"name":"Skotizo"},
      {"name":"The Gauntlet"},
      {"name":"The Corrupted Gauntlet"},
      {"name":"Theatre of Blood"},
      {"name":"Thermonuclear Smoke Devil"},
      {"name":"TzKal-Zuk"},
      {"name":"TzTok-Jad"},
      {"name":"Venenatis"},
      {"name":"Vet'ion"},
      {"name":"Vorkath"},
      {"name":"Wintertodt"},
      {"name":"Zalcano"},
      {"name":"Zulrah"}
    ]; 
    return bossNames[id];
  };

exports.combatLevel = function({ Defence, Strength, Attack, Ranged, Magic, Prayer, Hitpoints }) {
    let	base = 0.25 * (Defence.level + Hitpoints.level + Math.floor(Prayer.level / 2));
    let	melee = 0.325 * (Attack.level + Strength.level);
    let	range = 0.325 * (Math.floor(Ranged.level / 2) + Ranged.level);
    let	mage = 0.325 * (Math.floor(Magic.level / 2) + Magic.level);
    return Math.floor(base + Math.max(melee, range, mage));
  };

  exports.efficentHoursBossed = function(Bosses) {
      console.log(Bosses['Abyssal Sire'].kills)
    return "Soon";
  };