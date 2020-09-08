const profieltraineeNaam = document.getElementById("profieltrainee-naam");
const profieltraineeEmail = document.getElementById("profieltrainee-email");
const profieltraineeStartdatum = document.getElementById("profieltrainee-startdatum");
const profieltraineeRol = document.getElementById("profieltrainee-rol");
const profieltraineeTelnr = document.getElementById("profieltrainee-telnr");
const profieltraineeAdres = document.getElementById("profieltrainee-adres");
const profieltraineePostcode = document.getElementById("profieltrainee-postcode");
const profieltraineeWoonplaats = document.getElementById("profieltrainee-woonplaats");
const profieltraineeKCP = document.getElementById("profieltrainee-kcp");
const profieltraineeBedrijf = document.getElementById("profieltrainee-bedrijf");
const profieltraineeKCPtelnr = document.getElementById("profieltrainee-kcptelnr");
var urlId;


//haalt id uit huidige url
var url_string = window.location.href;
var url = new URL(url_string);
var idpf = url.searchParams.get("id");

//voegt ID toe aan profielpaginaurl
function aanpassenurl() {
    let pfurl = document.getElementById('profielpaginaurl').href;
    pfurl = pfurl + "?id=" + idpf;
    var a = document.querySelector('a[href="/profielpagina"]');
    if (a) {
        a.setAttribute('href', pfurl)
    }
}

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

    xhr.open("PUT", `http://localhost:8082/api/trainee/wachtwoordwijzigen/${urlId}`, true);
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

    xhr.open("POST", "http://localhost:8082/api/trainee/nieuwegegevens/" + urlId, true);
    xhr.setRequestHeader("Content-Type", "application/json");

    xhr.send(JSON.stringify(persoonJSON));

}

window.onload = () => {
    aanpassenurl();
    console.log("onload");

    // traineeNaamFunction();
    // console.log("onload");
};
const traineeNaamFunction = () => {
    var urlString = window.location.href;
    var url = new URL(urlString);
    urlId = url.searchParams.get("id");

    let xhr = new XMLHttpRequest();

    xhr.onreadystatechange = function() {
        if (xhr.readyState == 4) {
            trainee = JSON.parse(this.responseText);
            let welkomHtml = ``;
            console.log(trainee.leidingGevende);
            profieltraineeNaam.innerHTML = `${trainee.naam}`;
            profieltraineeEmail.innerHTML = `${trainee.email}`;
            profieltraineeStartdatum.innerHTML = `${trainee.startDatum}`;
            profieltraineeRol.innerHTML = `${trainee.roles}`;
            profieltraineeTelnr.innerHTML = `${trainee.telefoonnr}`;
            profieltraineeAdres.innerHTML = `${trainee.straatNaamNr}`;
            profieltraineePostcode.innerHTML = `${trainee.postcode}`;
            profieltraineeWoonplaats.innerHTML = `${trainee.woonplaats}`;
            profieltraineeKCP.innerHTML = `${trainee.leidingGevende.naam}`;
            profieltraineeBedrijf.innerHTML = `${trainee.leidingGevende.bedrijf.naam}`;
            profieltraineeKCPtelnr.innerHTML = `${trainee.leidingGevende.telefoonnr}`;
        }
    }
    xhr.open("GET", `http://localhost:8082/api/trainee/${urlId}` , true);
    xhr.send();
}

traineeNaamFunction();
wachtwoordWijzigen();