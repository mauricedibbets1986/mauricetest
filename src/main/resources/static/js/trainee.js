const traineeNaam = document.getElementById("trainee-naam");
const afgelopenFormulieren = document.getElementById("afgelopen-formulieren");
const tijdelijkeFormulieren = document.getElementById("tijdelijke-formulieren");
const formBody = document.getElementById("form-body");
const modalHeader = document.querySelector(".modal-title");
const klikbaarOogje = document.querySelector(".fa-eye");
const formulierItem = document.querySelector(".list-group-item");
const navlink = document.querySelector(".nav-link");
const profielpagina = document.getElementById("profielpagina");
const downloadFormulier = document.getElementById("download-formulier");


//haalt id uit huidige url
var url_string = window.location.href;
var url = new URL(url_string);
var idpf = url.searchParams.get("id");

//voegt ID toe aan formulierpaginaurl
function aanpassenurl() {
    let pfurl = document.getElementById('profielpaginaurl').href;
    pfurl = pfurl + "?id=" + idpf;
    var a = document.querySelector('a[href="/profielpagina"]'); if (a) { a.setAttribute('href', pfurl) }
}

const maandNummerNaarString = (maandNummer) => {
    switch (maandNummer) {
        case 1:
            return "Januari";
        case 2:
            return "Februari";
        case 3:
            return "Maart";
        case 4:
            return "April";
        case 5:
            return "Mei";
        case 6:
            return "Juni";
        case 7:
            return "Juli";
        case 8:
            return "Augustus";
        case 9:
            return "September";
        case 10:
            return "Oktober";
        case 11:
            return "November";
        case 12:
            return "December";
    }
}

window.onload = () => {
    traineeNaamFunction();
    aanpassenurl();
};

const traineeNaamFunction = () => {
    var urlString = window.location.href;
    var url = new URL(urlString);
    var urlId = url.searchParams.get("id");

    let xhr = new XMLHttpRequest();

    xhr.onreadystatechange = function () {
        if (xhr.readyState == 4) {
            trainee = JSON.parse(this.responseText);

            let archiefFormulierHTML = ``;
            let huidigMaandFormulier = ``;

            traineeNaam.innerHTML = `${trainee.naam}`;
            // traineeOpdrachtgever.innerHTML = `Opdrachtgever : ${trainee.leidingGevende}`;

            var formulieren = trainee.archief;
            var huidigFormulier = trainee.tijdelijkeFormulieren;

            console.log(trainee.archief);

            if (formulieren.length > 0) {
                // for loop voor archief

                for (let i = 0; i < formulieren.length; i++) {
                    maand = maandNummerNaarString(formulieren[i].maand);
                    var e = formulieren[i];

                        archiefFormulierHTML = `<li data-toggle="modal" data-target="#staticBackdrop" 
                         class="list-group-item list-group-item-action d-flex justify-content-between" id="${e.id}"><span id="${e.id}">${maand}</span><span id="${e.id}">${e.jaar}</span><span id="${e.id}">${e.adminStatus}</span><i id="${e.id}" class="far fa-eye"></i></li>`;

                        afgelopenFormulieren.insertAdjacentHTML('beforeend', archiefFormulierHTML);

                    

                }
            }

            // For loop voor huidig formulier
            if (huidigFormulier.length > 0) {
                for (let x = 0; x < huidigFormulier.length; x++) {

                    maand = maandNummerNaarString(huidigFormulier[x].maand);
                    var e = huidigFormulier[x];

                    let formulierLocatie;
                    let formulierBeoordeling;

                    if ((e.adminStatus === 'OPEN' && e.opdrachtgeverStatus === 'OPEN') && e.ingezondenFormulier == true) {
                        formulierLocatie = "Bij opdrachtgever";
                        formulierBeoordeling = "Nog niet beoordeeld";
                    } else if (e.adminStatus === "OPEN" && e.opdrachtgeverStatus === "GOEDGEKEURD") {
                        formulierLocatie = "Bij Qien HR";
                        formulierBeoordeling = "Goedgekeurd door opdrachtgever";
                    } else if (e.opdrachtgeverStatus === "AFGEKEURD") {
                        formulierLocatie = "Opnieuw invullen";
                        formulierBeoordeling = "Afgekeurd door opdrachtgever";
                    } else if (e.adminStatus === "AFGEKEURD") {
                        formulierLocatie = "Opnieuw invullen";
                        formulierBeoordeling = "Afgekeurd door Qien HR";
                    } else {
                        formulierLocatie = "Nog verzenden";
                        formulierBeoordeling = "Niet van toepassing";
                    }

                    huidigMaandFormulier = `<a href="./traineeformulier?id=${urlId}&formulierid=${e.id}" class="list-group-item list-group-item-action d-flex justify-content-between" id="${e.id}"><span id="${e.id}">${maand}</span><span id="${e.id}">${e.jaar}</span><span id="${e.id}">${formulierLocatie}</span><span id="${e.id}">${formulierBeoordeling}</span><i id="${e.id}" class="far fa-eye"></i></a>`;
                    tijdelijkeFormulieren.insertAdjacentHTML('beforeend', huidigMaandFormulier);

                }
            } else {
                inTeVoegenHTML = `<div class="alert alert-danger" role="alert"><h4 class="alert-heading">Sapristi, geen formulieren!</h4>
            <p>tekst - veel plezier</p>
            <hr>
            <p class="mb-0">text - nog meer plezier.</p>
            </div>`;

                tijdelijkeFormulieren.insertAdjacentHTML('beforeend', inTeVoegenHTML);
            }

        }

    }
    xhr.open("GET", `http://localhost:8082/api/trainee/${urlId}`, true);
    xhr.send();

}


const genereerFormulier = (formulier) => {
    formulier.maand = maandNummerNaarString(formulier.maand);
    modalHeader.innerHTML = `${trainee.naam} | ${formulier.maand}/${formulier.jaar}`
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
    formBody.innerHTML = "";
}

function getEventTarget(e) {
    e = e || window.event;
    return e.target || e.srcElement;
}

tijdelijkeFormulieren.onclick = function (event) {
    var target = getEventTarget(event);
    let id = target.id;
    let hetFormulier;
    var xhr = new XMLHttpRequest();
    xhr.onreadystatechange = function () {
        if (xhr.readyState == 4) {
            hetFormulier = JSON.parse(this.responseText);
            verwijderFormulier();
            //genereerFormulier(hetFormulier);
        }
    }

    xhr.open("GET", `http://localhost:8082/api/formulier/${id}`, true);
    xhr.send();

}

afgelopenFormulieren.onclick = function (event) {
    var target = getEventTarget(event);
    let id = target.id;
    let hetFormulier;
    var xhr = new XMLHttpRequest();
    xhr.onreadystatechange = function () {
        if (xhr.readyState == 4) {
            hetFormulier = JSON.parse(this.responseText);
            verwijderFormulier();
            genereerFormulier(hetFormulier);
        }
    }

    xhr.open("GET", `http://localhost:8082/api/formulier/${id}`, true);
    xhr.send();

    //Exporteer formulier naar CSV

    downloadFormulier.onclick = function(event ){

        console.log("nu in de csv download functie");
        window.location.href = "./api/formulier/export-users/" +  id + "/" + idpf;
    }

};

