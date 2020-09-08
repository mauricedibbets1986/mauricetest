const formulierenLijst = document.getElementById("form-list");
const formBody = document.getElementById("form-body");
const modalHeader = document.querySelector(".modal-title");
const klikbaarOogje = document.querySelector(".fa-eye");
const goedkeurKnopje = document.getElementById("goedkeuren");
const afkeurKnopje = document.getElementById("afkeuren");
const downloadFormulier = document.getElementById("download-formulier");

//haalt id uit huidige url
var url_string = window.location.href;
var url = new URL(url_string);
var idpf = url.searchParams.get("id");
console.log(idpf)

function aanpassenurl() {
    let pfurl = document.getElementById('profielpaginaurlkcp').href;
    pfurl = pfurl + "?id=" + idpf;
    var a = document.querySelector('a[href="/profielpaginakcp"]');
    if (a) {
        a.setAttribute('href', pfurl)
    }
}

window.onload = () => {
    aanpassenurl();
};

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


/*
FORMULIEREN
*/

// const laatFormulierenZien = () => {
//     let xhr = new XMLHttpRequest();

//     xhr.onreadystatechange = function () {
//         if (xhr.readyState == 4) {
//             deFormulieren = JSON.parse(this.responseText);
//             let inTeVoegenHTML = ``;

//             if (deFormulieren.length > 0) {
//                 deFormulieren.forEach((e) => {
//                     e.maand = maandNummerNaarString(e.maand);

//                     // inTeVoegenHTML = `<li data-toggle="modal" data-target="#staticBackdrop" href="./formulier.html?id=${e.id}" 
//                     // class="list-group-item list-group-item-action" id="${e.id}">${e.naam} | ${e.maand} | ${e.jaar} | ${e.formulierstatus}</li>`;
//                     inTeVoegenHTML = `<li data-toggle="modal" data-target="#staticBackdrop" 
//                     class="list-group-item list-group-item-action d-flex justify-content-between" id="${e.id}"><span id="${e.id}">Jan Doedel</span><span id="${e.id}">${e.maand}</span><span id="${e.id}">${e.jaar}</span><span id="${e.id}">${e.opdrachtgeverStatus}</span><i id="${e.id}" class="far fa-eye"></i></li>`;
//                     formulierenLijst.insertAdjacentHTML('beforeend', inTeVoegenHTML);
//                 })
//             } else {
//                 inTeVoegenHTML = `<div class="alert alert-danger" role="alert"><h4 class="alert-heading">Sapristi, geen formulieren!</h4>
//                 <p>tekst - veel plezier</p>
//                 <hr>
//                 <p class="mb-0">text - nog meer plezier.</p>
//             </div>`;

//                 formulierenLijst.insertAdjacentHTML('beforeend', inTeVoegenHTML);
//             }
//         }
//     }

//     xhr.open("GET", "http://localhost:8082/api/opdrachtgever/formulieren/all", true);
//     xhr.send();
// }

const laatFormulierenZien = () => {
    let xhr = new XMLHttpRequest();

    xhr.onreadystatechange = function () {
        if (xhr.readyState == 4) {
            deMedewerkers = JSON.parse(this.responseText);


            let inTeVoegenHTML = ``;

            if (deMedewerkers.length > 0) {
                deMedewerkers.forEach((mw) => {
                    mw.tijdelijkeFormulieren.forEach((tf) => {
                        console.log("======> " + mw.naam);
                        console.log("======> " + tf.id);

                        // if (tf.ingezondenFormulier === true) {

                            tf.maand = maandNummerNaarString(tf.maand);

                            if (tf.opdrachtgeverStatus === "OPEN") {
                                tf.adminStatus = "Bij Klant";
                            } else if (tf.opdrachtgeverStatus === "AFGEKEURD") {
                                tf.adminStatus = "Afgekeurd door klant";
                            }

                            inTeVoegenHTML = `<li data-toggle="modal" data-target="#staticBackdrop" 
                            class="list-group-item list-group-item-action d-flex justify-content-between" id="${tf.id}"><span id="verborgen-medewerker-id">${mw.id}</span><span id="${tf.id}">${mw.naam}</span><span id="${tf.id}">${tf.maand}</span><span id="${tf.id}">${tf.jaar}</span><span id="${tf.id}">${tf.opdrachtgeverStatus}</span><i id="${tf.id}" class="far fa-eye"></i></li>`;
                            formulierenLijst.insertAdjacentHTML('beforeend', inTeVoegenHTML);
                        // }
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

    xhr.open("GET", "http://localhost:8082/api/opdrachtgever/trainees/" + idpf, true);
    xhr.send();
}

const genereerFormulier = (formulier, trainee) => {
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

formulierenLijst.onclick = function (event) {
    var target = getEventTarget(event);
    let id = target.id;
    let hetFormulier;
    const medewerkerid = document.getElementById("verborgen-medewerker-id").innerHTML;

    var xhr = new XMLHttpRequest();
    xhr.onreadystatechange = function () {
        if (xhr.readyState === 4) {
            // console.log(" de response " + this.responseText);
            deTrainee = JSON.parse(this.responseText);
            console.log("de trainee : " + deTrainee);
            deTrainee.tijdelijkeFormulieren.forEach((tf) => {
                    console.log(" per formulier " + id);
                    if (tf.id == id) {
                        console.log("in de if " + tf.id + " en de normale id : " + id);
                        hetFormulier = tf;
                        verwijderFormulier();
                        genereerFormulier(hetFormulier, deTrainee);
                    }
                }
            );
        }
    }

    xhr.open("GET", `http://localhost:8082/api/trainee/${medewerkerId}`, true);
    xhr.send();

    goedkeurKnopje.addEventListener('click', () => {

        xhr.open("PUT", `http://localhost:8082/api/opdrachtgever/update/statusgoed/${id}/${medewerkerid}`, true);
        xhr.send();

        xhr.onreadystatechange = function () {
            if (xhr.readyState == 4) {
                location.reload();
            }
        }
    })

    afkeurKnopje.addEventListener('click', () => {

        xhr.open("PUT", `http://localhost:8082/api/opdrachtgever/update/statusfout/${id}/${medewerkerid}`, true);
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

laatFormulierenZien();
