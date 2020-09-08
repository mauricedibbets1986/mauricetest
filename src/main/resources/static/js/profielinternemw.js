const internemedewerkerNaam = document.getElementById("internemedewerker-naam");
const internemedewerkerEmail = document.getElementById("internemedewerker-email");
const internemedewerkerStartdatum = document.getElementById("internemedewerker-startdatum");
const internemedewerkerRol = document.getElementById("internemedewerker-rol");
const internemedewerkerTelNr = document.getElementById("internemedewerker-telnr");
const internemedewerkerAdres = document.getElementById("internemedewerker-adres");
const internemedewerkerPostcode = document.getElementById("internemedewerker-postcode");
const internemedewerkerWoonplaats = document.getElementById("internemedewerker-woonplaats");

var urlId;


//haalt id uit huidige url
var url_string = window.location.href;
var url = new URL(url_string);
var idpf = url.searchParams.get("id");
console.log(idpf)

//voegt ID toe aan profielpaginaurl
function aanpassenurl() {
    let pfurl = document.getElementById('profielpaginainternemw').href;
    pfurl = pfurl + "?id=" + idpf;
    console.log(idpf)
    var a = document.querySelector('a[href="/profielpaginainternemw"]');
    if (a) {
        a.setAttribute('href', pfurl)
    }
}

window.onload = () => {
    aanpassenurl();
    console.log("onload");

};

function wachtwoordWijzigen(){
    var urlString = window.location.href;
    var url = new URL(urlString);
    urlId = url.searchParams.get("id");
    var xhr = new XMLHttpRequest();

    const persoonWachtwoord = document.getElementById("nieuwWachtwoord").value;
    console.log(persoonWachtwoord)
    let persoonJSON = {};
    persoonJSON.password = persoonWachtwoord;
    xhr.onreadystatechange = function () {
        if (xhr.readyState === 4) {
        }
    }

    xhr.open("PUT", `http://localhost:8082/api/internemedewerker/wachtwoordwijzigen/${urlId}`, true);
    xhr.setRequestHeader("Content-Type", "application/json");
    xhr.send(JSON.stringify(persoonJSON));
}

function gegevensPersoonAanpassen() {

    var xhr = new XMLHttpRequest();
    console.log("je bent er dude");
    const persoonNaam = document.getElementById("persoonNaam").value;
    const persoonEmail = document.getElementById("persoonEmail").value;
    const persoonTelefoon = document.getElementById("persoonTelefoonnummer").value;
    const persoonAdres = document.getElementById("persoonAdres").value;
    const persoonPostcode = document.getElementById("persoonPostcode").value;
    const persoonWoonplaats = document.getElementById("persoonWoonplaats").value;

    let persoonJSON = {};
    persoonJSON.naam = persoonNaam;
    persoonJSON.email = persoonEmail;
    persoonJSON.telefoonnr = persoonTelefoon;
    persoonJSON.straatNaamNr = persoonAdres;
    persoonJSON.postcode = persoonPostcode;
    persoonJSON.woonplaats = persoonWoonplaats;

    xhr.onreadystatechange = function () {        
        if (xhr.readyState == 4) {
            location.reload();
        }
    }

    xhr.open("POST", `http://localhost:8082/api/internemedewerker/nieuwegegevens/${urlId}`, true);
    xhr.setRequestHeader("Content-Type", "application/json");

    xhr.send(JSON.stringify(persoonJSON));

}


const traineeNaamFunction = () => {
    var urlString = window.location.href;
    var url = new URL(urlString);
    urlId = url.searchParams.get("id");

    let xhr = new XMLHttpRequest();

    xhr.onreadystatechange = function() {
        if (xhr.readyState == 4) {
            trainee = JSON.parse(this.responseText);

            console.log(trainee.leidingGevende);
            internemedewerkerNaam.innerHTML = `${trainee.naam}`;
            internemedewerkerEmail.innerHTML = `${trainee.email}`;
            internemedewerkerStartdatum.innerHTML = `${trainee.startDatum}`;
            internemedewerkerTelNr.innerHTML = `${trainee.telefoonnr}`;
            internemedewerkerAdres.innerHTML = `${trainee.straatNaamNr}`;
            internemedewerkerPostcode.innerHTML = `${trainee.postcode}`;
            internemedewerkerWoonplaats.innerHTML = `${trainee.woonplaats}`;
        }
    }
    xhr.open("GET", `http://localhost:8082/api/internemedewerker/${urlId}` , true);
    xhr.send();
}

traineeNaamFunction();
wachtwoordWijzigen();