var possibleProficiencies;
var max;
var equipmentChoices = [];

var newCharacter;

function generateClassAndRace(event){
    event.preventDefault();
    
    

    let charName = document.getElementById("nameInput").value;
    const charClass = document.getElementById("classSearch").value;
    const charRace = document.getElementById("raceSearch").value;
    let charLevel = document.getElementById("levelSelect").value;

    if(charName === ""){
      charName = "Greg";
    }
    if (charClass === ""){
      return;
    }
    
    if (charRace === ""){
        return;
      }

    document.getElementById("nameInput").value = charName;

    document.getElementById("submit").disabled = true;
    document.getElementById("nameInput").disabled = true;
    document.getElementById("levelSelect").disabled = true;
    document.getElementById("classSearch").disabled = true;
    document.getElementById("raceSearch").disabled = true;


    const urlClass = 'https://www.dnd5eapi.co/api/classes/' + charClass;
    const urlRace = 'https://www.dnd5eapi.co/api/races/' + charRace;
    const temp = 'https://www.dnd5eapi.co/api/classes';

    newCharacter = new Character(charName, charClass, charRace, charLevel);

    newCharacter.DetermineProfBonus();
    document.getElementById("profBonus").value = newCharacter.profBonus;


    fetch(urlClass)
      .then(function(response) {
        return response.json();
      })
      .then(function(json) {
        possibleProficiencies = json.proficiency_choices[0];
        max = json.proficiency_choices[0].choose;
        document.getElementById("chooseMax").textContent += "Choose " + max;
        for(let i = 0; i < possibleProficiencies.from.length; i++){
          document.getElementById(possibleProficiencies.from[i].index).disabled = false;
        }

        for(let i = 0; i < json.starting_equipment_options.length; i++){
          let temp = [];
          for(let j = 0; j < json.starting_equipment_options[i].from.length; j++){
            if(json.starting_equipment_options[i].from[j].hasOwnProperty('equipment')){
              let optItem = new item;
              optItem.name = json.starting_equipment_options[i].from[j].equipment.name;
              optItem.quantity = 1;
              temp.push(optItem);
            } else if (json.starting_equipment_options[i].from[j].hasOwnProperty('equipment_option')){
              let choices = "https://www.dnd5eapi.co" + json.starting_equipment_options[i].from[j].equipment_option.from.equipment_category.url;
              GetMoreWeapons(choices, temp);
            } else if (json.starting_equipment_options[i].from[j].hasOwnProperty('equipment_category')){
              let choices = "https://www.dnd5eapi.co" + json.starting_equipment_options[i].from[j].equipment_category.url;
              GetMoreWeapons(choices, temp);
            } 
          } 
          equipmentChoices.push(temp);
       }




        newCharacter.hitDie = json.hit_die;
        newCharacter.proficiencies = json.proficiencies;
        newCharacter.saveThrows = json.saving_throws;

        for(let i = 0; i < json.starting_equipment.length; i++){
          let newItem = new item;
          newItem.name = json.starting_equipment[i].equipment.name;
          newItem.quantity = json.starting_equipment[i].quantity;
          newCharacter.inventory.push(newItem);
        }
        
        document.getElementById("hitDieValue").value = newCharacter.hitDie;

        let inventory = "<ul>";
        for(let i = 0; i < newCharacter.inventory.length; i++){
          inventory += "<li>" + newCharacter.inventory[i].name + " x" + newCharacter.inventory[i].quantity + "</li>";
        }
        inventory += "</ul>";
        document.getElementById("inventory").innerHTML = inventory;

        for(let i = 0; i < newCharacter.saveThrows.length; i++){
          document.getElementById(newCharacter.saveThrows[i].index).checked = true;
        }

      });

    fetch(urlRace)
    .then(function(response) {
        return response.json();
    }).then(function(json) {
      newCharacter.speed = json.speed;
      newCharacter.profBonus = json.ability_bonuses.bonus
      newCharacter.bonuses = json.ability_bonuses;

      for(let i = 0; i < json.starting_proficiencies.length; i++){
        newCharacter.skills.push(json.starting_proficiencies[i]);
      }

      newCharacter.languages = json.languages;
      newCharacter.traits = json.traits;

      document.getElementById("speed").value = newCharacter.speed;  
      
    });

    
    
    
};


function populateForm(){
  let strength = document.getElementById("strengthValue").value;
  let dexterity = document.getElementById("dexterityValue").value;
  let constitution = document.getElementById("constitutionValue").value;
  let wisdom = document.getElementById("wisdomValue").value;
  let intelligence = document.getElementById("intelligenceValue").value;
  let charisma = document.getElementById("charismaValue").value;

  newCharacter.str = (strength - 10)/2;
  newCharacter.dex = (dexterity - 10)/2;
  newCharacter.con = (constitution - 10)/2;
  newCharacter.wis = (wisdom - 10)/2;
  newCharacter.int = (intelligence - 10)/2;
  newCharacter.cha = (charisma - 10)/2;

  newCharacter.DetermineHitPoints();
  document.getElementById("maxHP").value = newCharacter.maxHP;

}

var checks = document.querySelectorAll(".skill");


for (var i = 0; i < checks.length; i++)
  checks[i].onclick = selectiveCheck;
function selectiveCheck (event) {
  var checkedChecks = document.querySelectorAll(".skill:checked");
  if (checkedChecks.length >= max + 1){
    return false;
  }
}



function GetMoreWeapons(url, array){
  fetch(url)
  .then(function(response){
    return response.json();
  }).then(function(json){
    for(let i = 0; i < json.equipment.length; i++){
      let tempItem = new item;
      tempItem.name = json.equipment[i].name;
      tempItem.quantity = 1;
      array.push(tempItem);
    }
  }).then(function(json){
    CreateOptionalInventory(array);
    return;
  })
}

function CreateOptionalInventory(array){

  let optionalEquipment = "";

  for(let i = 0; i < equipmentChoices.length; i++){
    optionalEquipment += "<h6>Choose " + 1 + "</h6>"
    for(let j = 0; j < equipmentChoices[i].length; j++){
      optionalEquipment += '<input class= "extraequip' + i + '" id= "extraequip' + i + '" type= "checkbox"><label>' + equipmentChoices[i][j].name + '</label> <br>'
    }
    optionalEquipment += "<br>";
  }
  document.getElementById("chooseInventory").innerHTML = optionalEquipment;

}

document.getElementById("submit").addEventListener("click", generateClassAndRace)
document.getElementById("finalize").addEventListener("click", populateForm)


