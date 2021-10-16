class Character  {
    name = "";
    classChar = "";
    race = "";
    lvl = 0;
    hp = -1;
    maxHP = -1;

    constructor(name, classChar, race, lvl){
      this.name= name;
      this.classChar = classChar;
      this.race = race;
      this.lvl = lvl;
    };
  
    get info() {
      return this.name + " " + this.classChar + " " + this.race + " " + this.lvl;
    };

    hitDie = 0;
    armorClass;
    skills= [];
    proficiencies;
    profBonus;
    saveThrows= [];
    inventory= [];
    speed;
    bonuses;
    languages;
    traits;

    str;
    dex;
    con;
    wis;
    int;
    cha;

    DetermineProfBonus() {
      if(this.lvl < 5){
        this.profBonus = 2;
        return;
      }
      if(this.lvl < 9){
        this.profBonus = 3;
        return;
      }
      if(this.lvl < 13){
        this.profBonus = 4;
        return;
        
      }
      if(this.lvl < 17){
        this.profBonus = 5;
        return;
      }
      if(this.lvl < 21){
        this.profBonus = 6;
        return;
      }
    }

    DetermineHitPoints() {
      this.maxHP = Math.floor(this.hitDie + this.con);
    }
  
  };