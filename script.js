document.getElementById("submit").addEventListener("click", function(event){
    event.preventDefault();
    console.log("clicker");
    
    const charClass = document.getElementById("classSearch").value;
    const charRace = document.getElementById("raceSearch").value;
    if (charClass === ""){
      return;
    }
    if (charRace === ""){
        return;
      }

    const urlClass = 'https://www.dnd5eapi.co/api/classes/' + charClass;
    const urlRace = 'https://www.dnd5eapi.co/api/races/' + charRace;
    const temp = 'https://www.dnd5eapi.co/api/classes';

    fetch(temp)
    .then(function(response) {
        return response.json();
    }).then(function(json) {
        console.log(json);
    });

    fetch(urlClass)
      .then(function(response) {
        return response.json();
      }).then(function(json) {
        console.log(json);
      });

    fetch(urlRace)
    .then(function(response) {
        return response.json();
    }).then(function(json) {
        console.log(json);
    });
});


//68150a document.getElementByID('submit').style.backgroundColor = '#68150a';