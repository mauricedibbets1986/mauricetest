const formulierenLijst = document.getElementById("form-list");
const medewerkerLijst = document.getElementById("medewerker-list");
const bedrijvenLijst = document.getElementById("bedrijven-list");
const takenLijstTrainees = document.getElementById("taken-list");
const takenLijstMedewerkers = document.getElementById("taken-list");
const formulierItem = document.querySelector(".list-group-item");
const formBody = document.getElementById("form-body");
const modalHeader = document.querySelector(".modal-title");
const modalFooter = document.querySelector(".modal-footer");
const klikbaarOogje = document.querySelector(".fa-eye");
const goedkeurKnopje = document.getElementById("goedkeuren");

const downloadFormulier = document.getElementById("download-formulier");

const afkeurKnopje = document.getElementById("afkeuren");
const relatieAanmakenKnop = document.getElementById("knop-relatie-aanmaken");

const gegevensGoedkeurKnopje = document.getElementById("goedkeurknop-gegevens");
const gegevensAfkeurKnopje = document.getElementById("afkeurknop-gegevens");

const toevoegenGebruikerContainer = document.getElementById("toevoegen-gebruiker-container");
const takenTraineeNaam = document.getElementById("takenTrainee-naam");
const takenTraineeEmail = document.getElementById("takenTrainee-email");
const takenTraineeTelnr = document.getElementById("takenTrainee-telnr");
const takenTraineeAdres = document.getElementById("takenTrainee-adres");
const takenTraineePostcode = document.getElementById("takenTrainee-postcode");
const takenTraineeWoonplaats = document.getElementById("takenTrainee-woonplaats");

const takenTijdelijkeTraineeNaam = document.getElementById("takenTijdelijkeTrainee-naam");
const takenTijdelijkeTraineeEmail = document.getElementById("takenTijdelijkeTrainee-email");
const takenTijdelijkeTraineeTelnr = document.getElementById("takenTijdelijkeTrainee-telnr");
const takenTijdelijkeTraineeAdres = document.getElementById("takenTijdelijkeTrainee-adres");
const takenTijdelijkeTraineePostcode = document.getElementById("takenTijdelijkeTrainee-postcode");
const takenTijdelijkeTraineeWoonplaats = document.getElementById("takenTijdelijkeTrainee-woonplaats");

var selectTrainee = document.getElementById("trainee_select");
var selectContactPersoon = document.getElementById("contactpersoon_select");
var selectBedrijf = document.getElementById("bedrijf_select");
const relatieContainer = document.getElementById("relatiekoppel-container");
var selectTraineeId;
let deMedewerkers;
let alleTrainees;
let tijdelijkeTrainees;
let tijdelijkeMedewerkers;

/*
AANROEPEN VAN METHODES BIJ OPENEN PAGINA
*/


window.onload = function () {
    laatFormulierenZien();
    laatMedewerkersZien();
    // laatBedrijvenZien();
    updateTraineeSelector();
    updateContactPersoonSelector();
    laadAlleTrainees();
};


const maandNummerNaarString = (maandNummer) => {
    switch (maandNummer) {
        case 0:
            return "Januari";
        case 1:
            return "Februari";
        case 2:
            return "Maart";
        case 3:
            return "April";
        case 4:
            return "Mei";
        case 5:
            return "Juni";
        case 6:
            return "Juli";
        case 7:
            return "Augustus";
        case 8:
            return "September";
        case 9:
            return "Oktober";
        case 10:
            return "November";
        case 11:
            return "December";
    }
}


/*
TAKENLIJST
*/

const laatTakenZien = () => {

    let xhr = new XMLHttpRequest();
    xhr.onreadystatechange = function () {
        if (xhr.readyState == 4) {
            tijdelijkeTrainees = JSON.parse(this.responseText);
            let inTeVoegenHTML = ``;
            if (tijdelijkeTrainees.length > 0) {
                tijdelijkeTrainees.forEach((tt) => {

                    alleTrainees.forEach((t) => {
                        if(tt.oorspronkelijkeId === t.id) {

                            inTeVoegenHTML = `<li data-toggle="modal" data-target="#takenModal" 
                                class="list-group-item list-group-item-action d-flex justify-content-between" id="${t.id}"><span id="${t.id}">${t.naam}</span><span id="${t.id}">Gegevenswijziging</span><span id="${t.id}">Trainee</span>
                                <i id="${t.id}" class="far fa-eye" ></i></li>`;
                            takenLijstTrainees.insertAdjacentHTML('beforeend', inTeVoegenHTML);
                            console.log('ik ben in de takenlijst trainees')
                        }
                    })
                })
            }
        }
    }

    xhr.open("GET", "http://localhost:8082/api/admin/tijdelijkeTrainee/all", true);
    xhr.send();

    let xhr2 = new XMLHttpRequest();
    xhr2.onreadystatechange = function () {
        if (xhr2.readyState == 4) {
            tijdelijkeMedewerkers = JSON.parse(this.responseText);
            let inTeVoegenHTML = ``;
            if (tijdelijkeMedewerkers.length > 0) {
                tijdelijkeMedewerkers.forEach((tt) => {
                    deMedewerkers.forEach((t) => {
                        if(tt.oorspronkelijkeId === t.id) {
                            console.log(t)
                            inTeVoegenHTML = `<li data-toggle="modal" data-target="#takenModal" 
                                class="list-group-item list-group-item-action d-flex justify-content-between" id="${t.id}"><span id="${t.id}">${t.naam}</span><span id="${t.id}">Gegevenswijziging</span><span id="${t.id}">Interne Medewerker</span>
                                <i id="${t.id}" class="far fa-eye"></i></li>`;
                            takenLijstMedewerkers.insertAdjacentHTML('beforeend', inTeVoegenHTML);
                            console.log('ik ben in de takenlijst medewerkers')
                        }
                    })
                })
            }
        }
    }

    xhr2.open("GET", "http://localhost:8082/api/admin/tijdelijkeMedewerker/all", true);
    xhr2.send();
}



takenLijstTrainees.onclick = function(event ){
    var target = getEventTarget(event);
    let id = target.id;
    var xhr = new XMLHttpRequest();
    let gebruiker;
    xhr.onreadystatechange = function () {
        if (xhr.readyState == 4) {
            gebruiker = JSON.parse(this.responseText);

            takenTraineeNaam.innerHTML = `${gebruiker.naam}`;
            takenTraineeEmail.innerHTML = `${gebruiker.email}`;
            takenTraineeTelnr.innerHTML = `${gebruiker.telefoonnr}`;
            takenTraineeAdres.innerHTML = `${gebruiker.straatNaamNr}`;
            takenTraineePostcode.innerHTML = `${gebruiker.postcode}`;
            takenTraineeWoonplaats.innerHTML = `${gebruiker.woonplaats}`;
        }
    }

    xhr.open("GET", `http://localhost:8082/api/user/${id}`, true);
    xhr.send();

    var xhr2 = new XMLHttpRequest();
    let tijdelijkeGebruiker;
    xhr2.onreadystatechange = function () {
        if (xhr2.readyState == 4) {
            tijdelijkeGebruiker = JSON.parse(this.responseText);

            takenTijdelijkeTraineeNaam.innerHTML = (tijdelijkeGebruiker.naam == "" || tijdelijkeGebruiker == null) ? `<i>Geen Wijziging</i>` : `<b>${tijdelijkeGebruiker.naam}</b>`;
            takenTijdelijkeTraineeEmail.innerHTML = (tijdelijkeGebruiker.email == "" || tijdelijkeGebruiker == null) ? `<i>Geen Wijziging</i>` : `<b>${tijdelijkeGebruiker.email}</b>`;
            takenTijdelijkeTraineeTelnr.innerHTML = (tijdelijkeGebruiker.telefoonnr == "" || tijdelijkeGebruiker == null) ? `<i>Geen Wijziging</i>` : `<b>${tijdelijkeGebruiker.telefoonnr}</b>`;
            takenTijdelijkeTraineeAdres.innerHTML = (tijdelijkeGebruiker.straatNaamNr == "" || tijdelijkeGebruiker == null) ? `<i>Geen Wijziging</i>` : `<b>${tijdelijkeGebruiker.straatNaamNr}</b>`;
            takenTijdelijkeTraineePostcode.innerHTML = (tijdelijkeGebruiker.postcode == "" || tijdelijkeGebruiker == null) ? `<i>Geen Wijziging</i>` : `<b>${tijdelijkeGebruiker.postcode}</b>`;
            takenTijdelijkeTraineeWoonplaats.innerHTML = (tijdelijkeGebruiker.woonplaats == "" || tijdelijkeGebruiker == null) ? `<i>Geen Wijziging</i>` : `<b>${tijdelijkeGebruiker.woonplaats}</b>`;

        }
    }

    xhr2.open("GET", `http://localhost:8082/api/user/tijdelijkepersoon/${id}`, true);
    xhr2.send();

    gegevensGoedkeurKnopje.addEventListener('click', () => {
        var xhr3 = new XMLHttpRequest();

        xhr3.open("PUT", `http://localhost:8082/api/admin/goedkeurengegevens/persoon/${gebruiker.id}/${tijdelijkeGebruiker.id}`, true);
        xhr3.send();

        xhr3.onreadystatechange = function () {
            if (xhr3.readyState == 4) {
                location.reload();
            }
        }
    })
    gegevensAfkeurKnopje.addEventListener('click', () => {

        xhr.open("DELETE", `http://localhost:8082/api/user/tijdelijkepersoon/delete/${tijdelijkeGebruiker.id}`, true);
        xhr.send();

        xhr.onreadystatechange = function () {
            if (xhr.readyState == 4) {
                location.reload();
            }
        }
    })
}

/*
FORMULIEREN
*/

const laatFormulierenZien = () => {
    let xhr = new XMLHttpRequest();

    xhr.onreadystatechange = function () {
        if (xhr.readyState == 4) {
            deMedewerkers = JSON.parse(this.responseText);


            let inTeVoegenHTML = ``;

            if (deMedewerkers.length > 0) {
                deMedewerkers.forEach((mw) => {
                    mw.tijdelijkeFormulieren.forEach((tf) => {

                        //if (tf.ingezondenFormulier === true) {

                            tf.maand = maandNummerNaarString(tf.maand);
                            if((tf.adminStatus === 'OPEN' && tf.opdrachtgeverStatus === 'OPEN') && tf.ingezondenFormulier == true) {
                                tf.adminStatus = "Bij opdrachtgever";
                            } else if (tf.adminStatus === "OPEN" && tf.opdrachtgeverStatus === "GOEDGEKEURD")  {
                                tf.adminStatus = "Bij Qien HR";
                            } else if (tf.opdrachtgeverStatus === "AFGEKEURD") {
                                tf.adminStatus = "Afgekeurd door opdrachtgever";
                            } else if (tf.adminStatus === "AFGEKEURD") {
                                tf.adminStatus = "Afgekeurd door Qien HR";
                            } else if (tf.adminStatus === "GOEDGEKEURD") {
                                tf.adminStatus = "Goedgekeurd door Qien HQ";
                            }else {
                                tf.adminStatus = "Nog te verzenden";
                            }

                            inTeVoegenHTML = `<li data-toggle="modal" data-target="#staticBackdrop" 
                            class="list-group-item list-group-item-action d-flex justify-content-between" id="${tf.id}"><span id="verborgen-medewerker-id">${mw.id}</span><span class="medewerker-naam" id="${tf.id}">${mw.naam}</span><span id="${tf.id}">${tf.maand}</span><span id="${tf.id}">${tf.jaar}</span><span id="${tf.id}">${tf.adminStatus}</span><i id="${tf.id}" class="far fa-eye"></i></li>`;
                            formulierenLijst.insertAdjacentHTML('beforeend', inTeVoegenHTML);
                        //}
                    })

                    // inTeVoegenHTML = `<li data-toggle="modal" data-target="#staticBackdrop" href="./formulier.html?id=${e.id}"
                    // class="list-group-item list-group-item-action" id="${e.id}">${e.naam} | ${e.maand} | ${e.jaar} | ${e.formulierstatus}</li>`;
                    // inTeVoegenHTML = `<li data-toggle="modal" data-target="#staticBackdrop"
                    // class="list-group-item list-group-item-action d-flex justify-content-between" id="${e.id}"><span id="${e.id}">Rinse Willet</span><span id="${e.id}">${e.maand}</span><span id="${e.id}">${e.jaar}</span><span id="${e.id}">${e.adminStatus}</span><i id="${e.id}" class="far fa-eye"></i></li>`;
                    // formulierenLijst.insertAdjacentHTML('beforeend', inTeVoegenHTML);
                })
            } else {
                inTeVoegenHTML = `<div class="alert alert-danger" role="alert"><h4 class="alert-heading">Sapristi, geen formulieren!</h4>
                <p>tekst - veel plezier</p>
                <hr>
                <p class="mb-0">text - nog meer plezier.</p>
                </div>`;

                formulierenLijst.insertAdjacentHTML('beforeend', inTeVoegenHTML);
            }
        }
    }

    xhr.open("GET", "http://localhost:8082/api/admin/medewerker/all", true);
    xhr.send();
}

const genereerFormulier = (formulier, deMedewerker) => {
    if (formulier.opdrachtgeverStatus === "OPEN" || formulier.opdrachtgeverStatus === "AFGEKEURD") {
        modalFooter.style.display = "none";
    } else {
        modalFooter.style.display = "flex";
    }

    formulier.maand = maandNummerNaarString(formulier.maand);
    modalHeader.innerHTML = `<span class="pt-0">${deMedewerker.naam} | ${formulier.maand}/${formulier.jaar}</span><span class="pt-0">Status opdrachtgever: ${formulier.opdrachtgeverStatus}</span>`
    for (let i = 0; i < formulier.werkDagen.length; i++) {
        formBody.insertAdjacentHTML("beforeend",
            `<tr id="dag-${i + 1}" class="formulier-rij">
            <th scope="row">${i + 1}</th>
            <td class="admin-opmaak" id="opdracht-uren-${i + 1}">${formulier.werkDagen[i].opdrachtUren}</td>
            <td class="admin-opmaak"id="overwerk-uren-${i + 1}">${formulier.werkDagen[i].overwerkUren}</td>
            <td class="admin-opmaak"id="verlof-uren-${i + 1}">${formulier.werkDagen[i].verlofUren}</td>
            <td class="admin-opmaak" id="ziekte-uren-${i + 1}">${formulier.werkDagen[i].ziekteUren}</td>
            <td class="admin-opmaak"id="training-uren-${i + 1}">${formulier.werkDagen[i].trainingsUren}</td>
            <td class="admin-opmaak"id="overig-uren-${i + 1}">${formulier.werkDagen[i].overigeUren}</td>
            <td class="admin-opmaak form-verklaring"><class="form-input" id="verklaring-overig-${i + 1}">${(formulier.werkDagen[i].overigeUrenUitleg === null) ? "" : formulier.werkDagen[i].overigeUrenUitleg}</td>
        </tr>`)
    }
}

const verwijderFormulier = () => {
    modalHeader.innerHTML = "";
    formBody.innerHTML = "";
}

function getEventTarget(e) {
    e = e || window.event;
    return e.target || e.srcElement;
}

formulierenLijst.onclick = function (event) {
    var target = getEventTarget(event);
    let id = target.id;
    let hetFormulier;
    const medewerkerId = document.getElementById("verborgen-medewerker-id").innerHTML;
    var xhr = new XMLHttpRequest();

    console.log(id);

    xhr.onreadystatechange = function () {
        if (xhr.readyState == 4) {
            deMedewerker = JSON.parse(this.responseText);
            deMedewerker.tijdelijkeFormulieren.forEach((tf) => {
                    if (tf.id == id) {
                        hetFormulier = tf;
                        verwijderFormulier();
                        genereerFormulier(hetFormulier, deMedewerker);
                    }
                }
            );
        }
    }

    xhr.open("GET", `http://localhost:8082/api/admin/medewerker/${medewerkerId}`, true);
    xhr.send();

    goedkeurKnopje.addEventListener('click', () => {

        xhr.open("PUT", `http://localhost:8082/api/admin/update/statusgoed/${id}/${medewerkerId}`, true);
        xhr.send();

        xhr.onreadystatechange = function () {
            if (xhr.readyState == 4) {
                location.reload();
            }
        }
    })

    afkeurKnopje.addEventListener('click', () => {

        xhr.open("PUT", `http://localhost:8082/api/admin/update/statusfout/${id}/${medewerkerId}`, true);
        xhr.send();

        xhr.onreadystatechange = function () {
            if (xhr.readyState == 4) {
                location.reload();
            }
        }
    })

    //Exporteer formulier naar CSV

    downloadFormulier.onclick = function (event) {

        console.log("nu in de csv download functie");
        console.log("form id : " + id + " medewerkerid : " + medewerkerId);
        window.location.href = "./api/formulier/export-users/" + id + "/" + medewerkerId;
    }
};

/*
MEDEWERKERS
*/

const laatMedewerkersZien = () => {
    let xhr = new XMLHttpRequest();

    xhr.onreadystatechange = function () {
        if (xhr.readyState == 4) {

            deMedewerkers = JSON.parse(this.responseText);
            let inTeVoegenHTML = ``;

            if (deMedewerkers.length > 0) {
                deMedewerkers.forEach((e) => {
                    if (e.type === "Admin") return;
                    // Als trainee geen opdrachtgever heeft dan veranderen naar "Niet geplaatst"

                    if (e.type === "Trainee" && e.leidingGevende === null) {
                        e.leidingGevende = {
                            "naam": "Niet gekoppeld"
                        }
                        e.leidingGevende.bedrijf = {
                            "naam": "Niet geplaatst"
                        }
                    } else if (e.type === "InterneMedewerker") {
                        e.leidingGevende = {
                            "naam": "Niet gekoppeld"
                        }
                        e.type = "Interne Medewerker";
                        e.leidingGevende.bedrijf = {
                            "naam": "Qien"
                        }
                    }
                    // Als KCP niet gekoppeld is aan een bedrijf kan dit een probleem veroorzaken. Vandaar onderstaand if-statement
                    if (e.leidingGevende.bedrijf === null) {
                        e.leidingGevende.bedrijf = {
                            naam: "Niet geplaatst"
                        }
                    }
                    inTeVoegenHTML = `<li data-toggle="modal" data-target="#staticBackdrop" 
                    class="list-group-item list-group-item-action d-flex justify-content-between" id="${e.id}"><span id="${e.id}">${e.naam}</span><span id="${e.id}">${e.type}</span><span id="${e.id}">${e.leidingGevende.bedrijf.naam}</span><span id="${e.id}">${e.leidingGevende.naam}</span><i id="${e.id}" class="far fa-eye"></i></li>`;
                    medewerkerLijst.insertAdjacentHTML('beforeend', inTeVoegenHTML);
                })

            } else {
                inTeVoegenHTML = `<div class="alert alert-danger" role="alert"><h4 class="alert-heading">Sapristi, geen medewerkers!</h4>
                <p>tekst - veel plezier</p>
                <hr>
                <p class="mb-0">text - nog meer plezier.</p>
            </div>`;

                medewerkerLijst.insertAdjacentHTML('beforeend', inTeVoegenHTML);
            }
        }
    }

    xhr.open("GET", "http://localhost:8082/api/admin/medewerker/all", true);
    xhr.send();
}

/*
BEDRIJVEN
*/

const laatBedrijvenZien = () => {
    let xhr = new XMLHttpRequest();

    xhr.onreadystatechange = function () {
        if (xhr.readyState == 4) {
            deBedrijven = JSON.parse(this.responseText);
            let inTeVoegenHTML = ``;

            if (deBedrijven.length > 0) {
                deBedrijven.forEach((e) => {
                    // Als bedrijf geen contactpersoon heeft dan veranderen naar "Niet gekoppeld"
                    if (e.contactPersoon === null) {
                        e.contactPersoon = {
                            "naam": "Niet gekoppeld"
                        }
                    }

                    inTeVoegenHTML = `<li data-toggle="modal" data-target="#staticBackdrop" 
                    class="list-group-item list-group-item-action d-flex justify-content-between" id="${e.id}"><span id="${e.id}">${e.naam}</span><span id="${e.id}">${e.contactPersoon}</span><i id="${e.id}" class="far fa-eye"></i></li>`;
                    bedrijvenLijst.insertAdjacentHTML('beforeend', inTeVoegenHTML);
                })

            } else {
                inTeVoegenHTML = `<div class="alert alert-danger" role="alert"><h4 class="alert-heading">Sapristi, geen bedrijven!</h4>
                <p>tekst - veel plezier</p>
                <hr>
                <p class="mb-0">text - nog meer plezier.</p>
            </div>`;

                bedrijvenLijst.insertAdjacentHTML('beforeend', inTeVoegenHTML);
            }
        }
    }

    xhr.open("GET", "http://localhost:8082/api/admin/bedrijf/all", true);
    xhr.send();
}

/*
RELATIE AANMAKEN
*/

// RADIO buttons ophalen
const interneMedewerkerRadio = document.getElementById("radio-interne-mw");
const traineeRadio = document.getElementById("radio-trainee");
// const bedrijfRadio = document.getElementById("radio-bedrijf");
const contactPersoonRadio = document.getElementById("radio-contactpersoon");

const test = () => {

    document.getElementById("account-aanmaken").addEventListener("click", function (event) {
        event.preventDefault()
    });


    console.log("hieroo in de test");
    var xhr = new XMLHttpRequest();
    let dezeIdEmail;
    if (interneMedewerkerRadio.checked) {
        const interneMedewerkerType = interneMedewerkerRadio.value;
        const interneMedewerkerNaam = document.getElementById("interne-mw-naam").value;
        const interneMedewerkerEmail = document.getElementById("interne-mw-email").value;
        const interneMedewerkerTelefoon = document.getElementById("interne-mw-telefoon").value;
        const interneMedewerkerStraatNaamEnNr = document.getElementById("interne-mw-straatnaamennummer").value;
        const interneMedewerkerPostcode = document.getElementById("interne-mw-postcode").value;
        const interneMedewerkerWoonPlaats = document.getElementById("interne-mw-woonplaats").value;
        const interneMedewerkerStartDatum = document.getElementById("interne-mw-startdatum").value;
        const interneMedewerkerEindDatum = document.getElementById("interne-mw-einddatum").value;

        dezeIdEmail = null;

        let interneMedewerkerJSON = {};
        interneMedewerkerJSON.type = interneMedewerkerType;
        interneMedewerkerJSON.naam = interneMedewerkerNaam;
        interneMedewerkerJSON.email = interneMedewerkerEmail;
        interneMedewerkerJSON.telefoonnr = interneMedewerkerTelefoon;
        interneMedewerkerJSON.straatNaamNr = interneMedewerkerStraatNaamEnNr;
        interneMedewerkerJSON.postcode = interneMedewerkerPostcode;
        interneMedewerkerJSON.woonplaats = interneMedewerkerWoonPlaats;
        interneMedewerkerJSON.startDatum = interneMedewerkerStartDatum;
        interneMedewerkerJSON.eindDatum = interneMedewerkerEindDatum;

        xhr.open("POST", "http://localhost:8082/api/admin/internemedewerker/nieuw", false);
        xhr.setRequestHeader("Content-Type", "application/json");
        xhr.onreadystatechange = function () {

            if (xhr.readyState == 4) {
                console.log("regel 459");
                if (xhr.status === 200) {
                    alert("Interne medewerker is aangemaakt :D");
                } else if (xhr.status === 409) {
                    alert("emailadres bestaat al, voer een ander emailadres in");
                } else {
                    alert("Ik weet niet wat er mis ging, maar de http-status code is ......" + xhr.status + " oftewel " + xhr.statusText);
                }
            }
        }

        xhr.send(JSON.stringify(interneMedewerkerJSON));

    }

    if (traineeRadio.checked) {
        const traineeType = traineeRadio.value;
        const traineeNaam = document.getElementById("trainee-naam").value;
        const traineeEmail = document.getElementById("trainee-email").value;
        const traineeTelefoon = document.getElementById("trainee-telefoon").value;
        const traineeStraatNaamEnNr = document.getElementById("trainee-straatnaamennummer").value;
        const traineePostcode = document.getElementById("trainee-postcode").value;
        const traineeWoonPlaats = document.getElementById("trainee-woonplaats").value;
        const traineeStartDatum = document.getElementById("trainee-startdatum").value;
        const traineeEindDatum = document.getElementById("trainee-einddatum").value;

        dezeIdEmail = null;

        let traineeJSON = {};
        traineeJSON.type = traineeType;
        traineeJSON.naam = traineeNaam;
        traineeJSON.email = traineeEmail;
        traineeJSON.telefoonnr = traineeTelefoon;
        traineeJSON.straatNaamNr = traineeStraatNaamEnNr;
        traineeJSON.postcode = traineePostcode;
        traineeJSON.woonplaats = traineeWoonPlaats;
        traineeJSON.startDatum = traineeStartDatum;
        traineeJSON.eindDatum = traineeEindDatum;

        xhr.open("POST", "http://localhost:8082/api/admin/trainee/nieuw", false);
        xhr.setRequestHeader("Content-Type", "application/json");
        xhr.onreadystatechange = function () {

            if (xhr.readyState == 4) {
                console.log("regel 459");
                if (xhr.status === 200) {
                    alert("Trainee is aangemaakt :D");
                } else if (xhr.status === 409) {
                    alert("Dit is wat je volgens mij van de backend krijgt :) :" + xhr.responseText);
                    alert("emailadres bestaat al, voer een ander emailadres in");
                } else {
                    alert("Ik weet niet wat er mis ging, maar de http-status code is ......" + xhr.status + " oftewel " + xhr.statusText);
                }
            }
        }
        xhr.send(JSON.stringify(traineeJSON));
        //alert(this.responseText); //geeft een lege melding terug, zonder deze alert werkte de andere ook ineens niet meer.
    }

    if (contactPersoonRadio.checked) {

        var bedrijfgeselecteerd = bedrijf_select[bedrijf_select.selectedIndex].id

        if (bedrijfgeselecteerd === "") {
            alert("geen bedrijf geselecteerd");
        } else if (!(bedrijfgeselecteerd === "")) {
            ContactPersoonAanmaken(bedrijfgeselecteerd);
        }
    }

}

/*
methode om ContactPersoon aan te maken
*/

const ContactPersoonAanmaken = (bedrijfsID) => {

    var xhr = new XMLHttpRequest();
    const contactPersoonType = contactPersoonRadio.value;
    const contactPersoonNaam = document.getElementById("contactpersoon-naam").value;
    const contactPersoonEmail = document.getElementById("contactpersoon-email").value;
    const contactPersoonTelefoon = document.getElementById("contactpersoon-telefoon").value;

    let contactPersoonJSON = {};
    contactPersoonJSON.type = contactPersoonType;
    contactPersoonJSON.naam = contactPersoonNaam;
    contactPersoonJSON.email = contactPersoonEmail;
    contactPersoonJSON.telefoonnr = contactPersoonTelefoon;

    xhr.open("POST", "http://localhost:8082/api/admin/klantcontactpersoon/nieuw?bedrijfsId=" + bedrijfsID, false);
    xhr.setRequestHeader("Content-Type", "application/json");
    xhr.onreadystatechange = function () {

        if (xhr.readyState == 4) {
            console.log("regel 459");
            if (xhr.status === 200) {
                alert("klantcontactpersoon is aangemaakt");
            } else if (xhr.status === 409) {
                alert("emailadres bestaat al, voer een ander emailadres in");
            } else {
                alert("Ik weet niet wat er mis ging, maar de http-status code is ......" + xhr.status + " oftewel " + xhr.statusText);
            }
        }
    }
    xhr.send(JSON.stringify(contactPersoonJSON));
}

const radios = document.querySelectorAll(".form-check-input")
var prev = null;
for (var i = 0; i < radios.length; i++) {
    radios[i].addEventListener('change', function () {
        (prev) ? prev.value : null;
        if (this !== prev) {
            prev = this;
        }
        if (this.value == "Trainee") {
            toevoegenGebruikerContainer.innerHTML = `<div class="interne-mw-form">
            <div class="row">
                <div class="col-4">
                    <div class="form-group">
                        <label for="trainee-naam">Naam</label>
                        <input type="text" class="form-control"
                            id="trainee-naam"
                            placeholder="Naam trainee" required="true">
                    </div>
                </div>
                <div class="col-4">
                    <div class="form-group">
                        <label for="trainee-email">Email</label>
                        <input type="email" class="form-control"
                            id="trainee-email"
                            placeholder="trainee@mail.com" required="true">
                    </div>
                </div>
                <div class="col-4">
                    <div class="form-group">
                        <label
                            for="trainee-telefoon">Telefoonnummer</label>
                        <input type="telnum" class="form-control"
                            id="trainee-telefoon"
                            placeholder="+31 6 00000000" pattern="^((\\+)31(\\(0\\)[\\-\\s]?)?)[1-9]((-)?[0-9])((-)?[0-9])((-)?[0-9])[0-9][0-9][0-9][0-9][0-9]$"
                            required="true">
                    </div>
                </div>
            </div>

            <div class="row">
                <div class="col-4">
                    <div class="form-group">
                        <label
                            for="trainee-straatnaamennummer">Adres</label>
                        <input type="text" class="form-control"
                            id="trainee-straatnaamennummer"
                            placeholder="Atoomweg 350B" pattern="^([1-9][e][\\s])*([a-zA-Z]+(([\\.][\\s])|([\\s]))?)+[1-9][0-9]*(([-][1-9][0-9]*)|([\\s]?[a-zA-Z]+))?$" required="true">
                    </div>
                </div>
                <div class="col-4">
                    <div class="form-group">
                        <label for="trainee-postcode">Postcode</label>
                        <input type="text" class="form-control"
                            id="trainee-postcode" placeholder="3542AB" pattern="[1-9][0-9]{3}([A-RT-Z][A-Z]|[S][BCE-RT-Z])" required="true">
                    </div>
                </div>
                <div class="col-4">
                    <div class="form-group">
                        <label
                            for="trainee-woonplaats">Woonplaats</label>
                        <input type="text" class="form-control"
                            id="trainee-woonplaats"
                            placeholder="Utrecht" pattern="^([a-zA-Z\u0080-\u024F]+(?:. |-| |'))*[a-zA-Z\u0080-\u024F]*$" required="true">
                    </div>
                </div>
            </div>

            <div class="row">
                <div class="col-4">
                    <div class="form-group">
                        <label
                            for="trainee-startdatum">Startdatum</label>
                        <input type="date" class="form-control"
                            id="trainee-startdatum" min="01-01-2020" required="true">
                    </div>
                </div>
                <div class="col-4">
                    <div class="form-group">
                        <label for="trainee-einddatum">Einddatum</label>
                        <input type="date" class="form-control"
                            id="trainee-einddatum" min="01-01-2020" required="true">
                    </div>
                </div>
            </div>
        </div>`
        } else if (this.value == "Bedrijf") {
            toevoegenGebruikerContainer.innerHTML = `<div class="bedrijf-form">
            <div class="row">
                <div class="col-4">
                    <div class="form-group">
                        <label for="bedrijf-naam">Naam</label>
                        <input type="text" class="form-control" id="bedrijf-naam"
                            placeholder="Naam bedrijf">
                    </div>
                </div>
                <div class="col-4">
                    <div class="form-group">
                        <label for="bedrijf-email">Email</label>
                        <input type="email" class="form-control" id="bedrijf-email"
                            placeholder="info@bedrijf.nl">
                    </div>
                </div>
                <div class="col-4">
                    <div class="form-group">
                        <label for="bedrijf-telefoon">Telefoonnummer</label>
                        <input type="telnum" class="form-control"
                            id="bedrijf-telefoon" placeholder="+31 6 00000000" pattern="^((\\+)31(\\(0\\)[\\-\\s]?)?)[1-9]((-)?[0-9])((-)?[0-9])((-)?[0-9])[0-9][0-9][0-9][0-9][0-9]$"
                            required="true">
                    </div>
                </div>
            </div>
            <div class="row">
                <div class="col-4">
                    <div class="form-group">
                        <label for="bedrijf-straatnaamennummer">Adres</label>
                        <input type="text" class="form-control"
                            id="bedrijf-straatnaamennummer"
                            placeholder="Atoomweg 350B" pattern="^([1-9][e][\\s])*([a-zA-Z]+(([\\.][\\s])|([\\s]))?)+[1-9][0-9]*(([-][1-9][0-9]*)|([\\s]?[a-zA-Z]+))?$" required="true">
                    </div>
                </div>
                <div class="col-4">
                    <div class="form-group">
                        <label for="bedrijf-postcode">Postcode</label>
                        <input type="text" class="form-control"
                            id="bedrijf-postcode" placeholder="3542AB" pattern="[1-9][0-9]{3}([A-RT-Z][A-Z]|[S][BCE-RT-Z])" required="true">
                    </div>
                </div>
                <div class="col-4">
                    <div class="form-group">
                        <label for="bedrijf-woonplaats">Vestigingsplaats</label>
                        <input type="text" class="form-control"
                            id="bedrijf-woonplaats" placeholder="Utrecht" pattern="^([a-zA-Z\u0080-\u024F]+(?:. |-| |'))*[a-zA-Z\u0080-\u024F]*$" required="true">
                    </div>
                </div>
            </div>
        </div>`
        } else if (this.value == "ContactPersoon") {
            toevoegenGebruikerContainer.innerHTML = `<div class="contactpersoon-form">
            <div class="row">
                <div class="col-4">
                    <div class="form-group">
                        <label for="contactpersoon-naam">Naam</label>
                        <input type="text" class="form-control"
                            id="contactpersoon-naam"
                            placeholder="Naam contactpersoon" required="true">
                    </div>
                </div>
                <div class="col-4">
                    <div class="form-group">
                        <label for="contactpersoon-email">Email</label>
                        <input type="email" class="form-control"
                            id="contactpersoon-email"
                            placeholder="contactpersoon@bedrijf.com" required="true">
                    </div>
                </div>
                <div class="col-4">
                    <div class="form-group">
                        <label for="contactpersoon-telefoon">Telefoonnummer</label>
                        <input type="telnum" class="form-control"
                            id="contactpersoon-telefoon"
                            placeholder="+31 6 00000000" pattern="^((\\+)31(\\(0\\)[\\-\\s]?)?)[1-9]((-)?[0-9])((-)?[0-9])((-)?[0-9])[0-9][0-9][0-9][0-9][0-9]$"
                            required="true">
                    </div>
                </div>
                <div class="col-4">
                    <div class="form-group text-muted">
                        <select class="form-control" id="bedrijf_select" required>
                            <option value="">--Bedrijf--</option>
                        </select>
                    </div>
                </div>
            </div>`
            updateBedrijfSelector();
        } else {
            toevoegenGebruikerContainer.innerHTML = `<div class="interne-mw-form">
            <div class="row">
                <div class="col-4">
                    <div class="form-group">
                        <label for="interne-mw-naam">Naam</label>
                        <input type="text" class="form-control"
                            id="interne-mw-naam"
                            placeholder="Naam medewerker" required="true">
                    </div>
                </div>
                <div class="col-4">
                    <div class="form-group">
                        <label for="interne-mw-email">Email</label>
                        <input type="email" class="form-control"
                            id="interne-mw-email"
                            placeholder="naam@qien.nl" required="true">
                    </div>
                </div>
                <div class="col-4">
                    <div class="form-group">
                        <label
                            for="interne-mw-telefoon">Telefoonnummer</label>
                        <input type="telnum" class="form-control"
                            id="interne-mw-telefoon"
                            placeholder="+31 6 00000000" pattern="^((\\+)31(\\(0\\)[\\-\\s]?)?)[1-9]((-)?[0-9])((-)?[0-9])((-)?[0-9])[0-9][0-9][0-9][0-9][0-9]$"
                            required="true">
                    </div>
                </div>
            </div>

            <div class="row">
                <div class="col-4">
                    <div class="form-group">
                        <label
                            for="interne-mw-straatnaamennummer">Adres</label>
                        <input type="text" class="form-control"
                            id="interne-mw-straatnaamennummer"
                            placeholder="Atoomweg 350B" pattern="^([1-9][e][\\s])*([a-zA-Z]+(([\\.][\\s])|([\\s]))?)+[1-9][0-9]*(([-][1-9][0-9]*)|([\\s]?[a-zA-Z]+))?$" required="true">
                    </div>
                </div>
                <div class="col-4">
                    <div class="form-group">
                        <label for="interne-mw-postcode">Postcode</label>
                        <input type="text" class="form-control"
                            id="interne-mw-postcode" placeholder="3542AB" pattern="[1-9][0-9]{3}([A-RT-Z][A-Z]|[S][BCE-RT-Z])" required="true">
                    </div>
                </div>
                <div class="col-4">
                    <div class="form-group">
                        <label
                            for="interne-mw-woonplaats">Woonplaats</label>
                        <input type="text" class="form-control"
                            id="interne-mw-woonplaats"
                            placeholder="Utrecht" pattern="^([a-zA-Z\u0080-\u024F]+(?:. |-| |'))*[a-zA-Z\u0080-\u024F]*$" required="true">
                    </div>
                </div>
            </div>

            <div class="row">
                <div class="col-4">
                    <div class="form-group">
                        <label
                            for="interne-mw-startdatum">Startdatum</label>
                        <input type="date" class="form-control"
                            id="interne-mw-startdatum" min="01-01-2020" required="true">
                    </div>
                </div>
                <div class="col-4">
                    <div class="form-group">
                        <label for="interne-mw-einddatum">Einddatum</label>
                        <input type="date" class="form-control"
                            id="interne-mw-einddatum" min="01-01-2020">
                    </div>
                </div>
            </div>
        </div>`
        }
    });
}

/*
Alle Trainees ophalen uit de database en in 'alleTrainees' stoppen
*/

function laadAlleTrainees() {

    let xhr = new XMLHttpRequest();

    xhr.onreadystatechange = function () {
        if (xhr.readyState == 4) {
            alleTrainees = JSON.parse(this.responseText);
            laatTakenZien();
        }
    }
    xhr.open("GET", "http://localhost:8082/api/admin/trainee/all", true);
    xhr.send();
}


/*
trainees laden selectorknop relatie koppelen
*/

const updateTraineeSelector = () => {
    let xhr = new XMLHttpRequest();

    xhr.onreadystatechange = function () {
        if (xhr.readyState == 4) {
            deTrainees = JSON.parse(this.responseText);
            let inTeVoegenHTML = ``;
            if (deTrainees.length > 0) {
                deTrainees.forEach((e) => {
                    inTeVoegenHTML = `<option id=${e.id}>${e.naam}</option>`;
                    selectTrainee = document.getElementById("trainee_select");
                    selectTrainee.insertAdjacentHTML('beforeend', inTeVoegenHTML);
                })
            }
        }
    }
    xhr.open("GET", "http://localhost:8082/api/admin/trainee/all", true);
    xhr.send();
}

/*
contactpersonen laden selectorknop relatie koppelen
*/

const updateContactPersoonSelector = () => {
    let xhr = new XMLHttpRequest();

    xhr.onreadystatechange = function () {
        if (xhr.readyState == 4) {
            deContactPersonen = JSON.parse(this.responseText);

            let inTeVoegenHTML = ``;

            if (deContactPersonen.length > 0) {
                deContactPersonen.forEach((e) => {

                    inTeVoegenHTML = `<option id=${e.id}>${e.naam}</option>`;
                    selectContactPersoon = document.getElementById("contactpersoon_select");
                    selectContactPersoon.insertAdjacentHTML('beforeend', inTeVoegenHTML);
                });
            }

        }
    }

    xhr.open("GET", "http://localhost:8082/api/admin/klantcontactpersoon/all", true);
    xhr.send();
}

/*
bedrijven laden selectorknop contactpersoon koppelen
*/

const updateBedrijfSelector = () => {
    let xhr = new XMLHttpRequest();

    xhr.onreadystatechange = function () {
        if (xhr.readyState == 4) {
            deBedrijven = JSON.parse(this.responseText);
            let inTeVoegenHTML = ``;

            if (deBedrijven.length > 0) {
                deBedrijven.forEach((e) => {

                    // inTeVoegenHTML = `<li data-toggle="modal" data-target="#staticBackdrop" href="./formulier.html?id=${e.id}"
                    // class="list-group-item list-group-item-action" id="${e.id}">${e.naam} | ${e.maand} | ${e.jaar} | ${e.formulierstatus}</li>`;
                    inTeVoegenHTML = `<option id=${e.id}>${e.naam}</option>`;
                    selectBedrijf = document.getElementById("bedrijf_select");
                    selectBedrijf.insertAdjacentHTML('beforeend', inTeVoegenHTML);
                })
            }
        }
    }

    xhr.open("GET", "http://localhost:8082/api/admin/bedrijf/all", true);
    xhr.send();
}


/*
Trainee aan Contactpersoon koppelen
 */

function koppelTraineeContactpersoon(s, d) {

    var xhr = new XMLHttpRequest();
    var traineeId = s[s.selectedIndex].id;
    var ContactPersoonId = d[d.selectedIndex].id;
    // if (traineeId === "" || ContactPersoonId === "") {
    //     console.log("hierrrro");
    //     alert("Graag een trainee en een contactpersoon selecteren");
    // } else {
    xhr.onreadystatechange = function () {
        console.log("nieuwe koppeling gemaakt")
        if (xhr.readyState == 4) {
            location.reload();
        }
    }
    xhr.open("PUT", `http://localhost:8082/api/admin/trainee/koppelContactPersoon/${traineeId}/${ContactPersoonId}`, true);
    xhr.send();
    //}
}

/*
Bedrijf aanmaken
*/

const bedrijfAanmaken = () => {
    var xhr = new XMLHttpRequest();
    const bedrijfNaam = document.getElementById("bedrijf-naam").value;
    const bedrijfEmail = document.getElementById("bedrijf-email").value;
    const bedrijfTelefoon = document.getElementById("bedrijf-telefoon").value;
    const bedrijfStraatNaamEnNr = document.getElementById("bedrijf-straatnaamennummer").value;
    const bedrijfPostCode = document.getElementById("bedrijf-postcode").value;
    const bedrijfWoonplaats = document.getElementById("bedrijf-woonplaats").value;

    dezeIdEmail = null;
    let bedrijfJSON = {};
    bedrijfJSON.naam = bedrijfNaam;
    bedrijfJSON.email = bedrijfEmail;
    bedrijfJSON.telefoonnr = bedrijfTelefoon;
    bedrijfJSON.straatNaamNr = bedrijfStraatNaamEnNr;
    bedrijfJSON.postcode = bedrijfPostCode;
    bedrijfJSON.woonplaats = bedrijfWoonplaats;

    xhr.onreadystatechange = function () {
        if (xhr.readyState == 4) {
            location.reload();
        }
    }

    xhr.open("POST", "http://localhost:8082/api/admin/bedrijf/nieuw", false);
    xhr.setRequestHeader("Content-Type", "application/json");
    xhr.onreadystatechange = function () {

        if (xhr.readyState == 4) {
            console.log("regel 459");
            if (xhr.status === 200) {
                alert("bedrijf is aangemaakt :D");
            } else if (xhr.status === 409) {
                alert("emailadres bestaat al, voer een ander emailadres in");
            } else {
                alert("Ik weet niet wat er mis ging, maar de http-status code is ......" + xhr.status + " oftewel " + xhr.statusText);
            }
        }
    }

    xhr.send(JSON.stringify(bedrijfJSON));

}

/*
radio selectorknop relaties
*/

const radiosKoppelen = document.querySelectorAll(".form-check-input1")
var prev = null;
for (var i = 0; i < radiosKoppelen.length; i++) {
    radiosKoppelen[i].addEventListener('change', function () {
        (prev) ? prev.value : null;
        if (this !== prev) {
            prev = this;
        }
        if (this.value == "trainee-kcp") {
            relatieContainer.innerHTML = `<div class="col mb-3">            

            <select id="trainee_select" required="true">
                <option value="">--Trainee--</option>               
            </select>
        </div>
        <div class="col">            
            <select id="contactpersoon_select" required="true">
                <option value="">--ContactPersoon--</option>
               
            </select>
        </div>`
            updateTraineeSelector();
            updateContactPersoonSelector();
        } else {
            relatieContainer.innerHTML = `<div class="col mb-3">
           
            <select id="bedrijf_select" required>
                <option>--Bedrijf--</option>
               
            </select>
        </div>
        <div class="col">
           
            <select id="contactpersoon_select" required>
                <option>--ContactPersoon--</option>
               
            </select>
        </div>`
            updateContactPersoonSelector();
            updateBedrijfSelector();
        }
    });
}