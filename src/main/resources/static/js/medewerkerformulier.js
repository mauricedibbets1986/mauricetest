// DOM Elementen selecteren
const formBody = document.getElementById("form-body");
const alertSuccess = document.querySelector(".alert-success");
const tableSelect = document.querySelector(".table-container");
const buttonSubmit = document.querySelector(".btn-success");
const buttonDownload = document.querySelector(".btn-danger");
const medewerkerNaam = document.getElementById("medewerker-naam");
const medewerkerOpdrachtgever = document.getElementById("medewerker-opdrachtgever");
const huidigeMaand = document.getElementById("huidige-maand");
const huidigJaar = document.getElementById("huidig-jaar");
const alertIngezonden = document.getElementById("alert-warning");
const downloadFormulier = document.getElementById("download-formulier");

//haalt id uit huidige url
var url_string = window.location.href; 
var url = new URL(url_string); 
var medewerkerId = url.searchParams.get("id"); 
var formulierId = url.searchParams.get("formulierid");
console.log("medewerkerId: " + medewerkerId + ", formulierId: " + formulierId)

function aanpassenurl() {
    let dashboardURL = document.getElementById("alert-link").href;
    dashboardURL = dashboardURL + "?id=" + medewerkerId;
    console.log(dashboardURL)
    var b = document.querySelector('a[href="/trainee"]'); if (b) { b.setAttribute('href', dashboardURL) }
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

const vulMedewerkerVelden = (medewerker) => {
    medewerkerNaam.innerHTML = medewerker.naam;
    if (medewerker.type !== "InterneMedewerker") {
        medewerkerOpdrachtgever.innerHTML = medewerker.leidingGevende.bedrijf.naam;
    } else {
        medewerkerOpdrachtgever.innerHTML = "Qien";
    }
}

const vulMaandEnJaar = (formulier) => {
    huidigeMaand.innerHTML = maandNummerNaarString(formulier.maand);
    huidigJaar.innerHTML = formulier.jaar;
}

{/* <p>Naam: <span id="trainee-naam"></p>
    <p>Opdrachtgever: <span id="trainee=opdrachtgever"></span></p>
    <p>Maand: <span id="huidige-maand"></span></p>
    <p>Jaar: <span id="huidig-jaar"></span></p> */}

const verwijderFormulier = () => {
    formBody.innerHTML = "";
}


// get klaargezet tijdelijk formulier voor Interne Medewerker

const haalMedewerkerFormulierOp = () => {
    var xhr = new XMLHttpRequest();

    xhr.onreadystatechange = function () {
        if (xhr.readyState == 4) {
            const formulier = JSON.parse(this.responseText);

                genereerMedewerkerFormulier(formulier);
                vulMaandEnJaar(formulier);
        }
    }

    xhr.open("GET", `http://localhost:8082/api/internemedewerker/formulier/${medewerkerId}/${formulierId}`, true);
    xhr.send();
}

// Verzend formulier voor Interne Medewerker 

const verzendMedewerkerFormulier = (formulierId) => {
    var xhr = new XMLHttpRequest();
    console.log(formulierId);

    xhr.onreadystatechange = function () {
        if (xhr.readyState == 4) {
            const formulier = JSON.parse(this.responseText);

            console.log("FORULIER: " + formulier);

            var nieuwFormulier = formulier;
            nieuwFormulier.ingezondenFormulier = true;
            nieuwFormulier.opdrachtgeverStatus = "GOEDGEKEURD";
            nieuwFormulier.adminStatus = "OPEN";
            console.log("nieuwformulier.id: " + nieuwFormulier.id);
            // formulieren.forEach(e => {
            //     genereerFormulier(e);
            //     vulMaandEnJaar(e);
            // })
            
            xhr2 = new XMLHttpRequest();
            xhr2.onreadystatechange = function () {
                if (xhr2.readyState == 4) {
                    location.reload();
                }
            }
            xhr2.open("PUT", `http://localhost:8082/api/internemedewerker/formulier/update/${nieuwFormulier.id}`, true);
            xhr2.setRequestHeader("Content-Type", "application/json");
            xhr2.send(JSON.stringify(nieuwFormulier));
        }
    }


    xhr.open("GET", `http://localhost:8082/api/formulier/${formulierId}`, true);
    xhr.send();
}

// Genereer Formulier voor Interne Medewerker

const genereerMedewerkerFormulier = (formulier) => {
    console.log(formulier.id);
    for (let i = 0; i < formulier.werkDagen.length; i++) {
        if(formulier.ingezondenFormulier === false){
            formBody.insertAdjacentHTML("beforeend",
                `<tr id="dag-${i}" class="formulier-rij">
                <th scope="row">${i + 1}</th>
                <td><input type="number" class="form-input" id="opdracht-uren-${i}" value="${formulier.werkDagen[i].opdrachtUren}"></td>
                <td><input type="number" class="form-input" id="overwerk-uren-${i}" value="${formulier.werkDagen[i].overwerkUren}"></td>
                <td><input type="number" class="form-input" id="verlof-uren-${i}" value="${formulier.werkDagen[i].verlofUren}"></td>
                <td><input type="number" class="form-input" id="ziekte-uren-${i}" value="${formulier.werkDagen[i].ziekteUren}"></td>
                <td><input type="number" class="form-input" id="training-uren-${i}" value="${formulier.werkDagen[i].trainingsUren}"></td>
                <td><input type="number" class="form-input" id="overig-uren-${i}" value="${formulier.werkDagen[i].overigeUren}"></td>
                <td class="form-verklaring"><input type="text" class="form-input" id="verklaring-overig-${i}" value="${(formulier.werkDagen[i].overigeUrenUitleg === null) ? "" : formulier.werkDagen[i].overigeUrenUitleg}"></td>
            </tr>`)


        }else{
            formBody.insertAdjacentHTML("beforeend",
                `<tr id="dag-${i}" class="formulier-rij">
                <th scope="row">${i + 1}</th>
                <td class="admin-opmaak" id="opdracht-uren-${i}" value="">${formulier.werkDagen[i].opdrachtUren}</td>
                <td class="admin-opmaak" id="overwerk-uren-${i}" value="">${formulier.werkDagen[i].overwerkUren}</td>
                <td class="admin-opmaak" id="verlof-uren-${i}" value="">${formulier.werkDagen[i].verlofUren}</td>
                <td class="admin-opmaak" id="ziekte-uren-${i}" value="">${formulier.werkDagen[i].ziekteUren}</td>
                <td class="admin-opmaak" id="training-uren-${i}" value="">${formulier.werkDagen[i].trainingsUren}</td>
                <td class="admin-opmaak" id="overig-uren-${i}" value="">${formulier.werkDagen[i].overigeUren}</td>
                <td class="form-verklaring" id="verklaring-overig-${i}" value="">${(formulier.werkDagen[i].overigeUrenUitleg === null) ? "" : formulier.werkDagen[i].overigeUrenUitleg}</td>
            </tr>`)

            alertIngezonden.style.display = "block";
            buttonSubmit.style.display = "none";
        }

    }

    const formInputs = document.querySelectorAll(".form-input");

    // Functionaliteit voor het opslaan van formulier
    formInputs.forEach(e => {
        e.addEventListener("change", () => {
            console.log("something changed again")
            var xhr = new XMLHttpRequest();

            var x = document.getElementsByClassName("formulier-rij");
            var dagen = [];

            for (var i = 0; i < x.length; i++) {
                var dag = {};
                // let j = i + 2;
                // let datum = new Date(selectJaar.value, selectMaand.value, j);
                dag.datum = i + 1;
                dag.opdrachtUren = document.getElementById(`opdracht-uren-${i}`).value;
                dag.overwerkUren = document.getElementById(`overwerk-uren-${i}`).value;
                dag.verlofUren = document.getElementById(`verlof-uren-${i}`).value;
                dag.ziekteUren = document.getElementById(`ziekte-uren-${i}`).value;
                dag.trainingsUren = document.getElementById(`training-uren-${i}`).value;
                dag.overigeUren = document.getElementById(`overig-uren-${i}`).value;
                dag.overigeUrenUitleg = document.getElementById(`verklaring-overig-${i}`).value;
                dagen.push(dag);
            }

            var nieuwFormulier = {};
            nieuwFormulier.jaar = formulier.jaar;
            nieuwFormulier.maand = formulier.maand;
            nieuwFormulier.id = formulier.id;
            nieuwFormulier.werkDagen = dagen;

            console.log(JSON.stringify(nieuwFormulier));

            xhr.open("PUT", `http://localhost:8082/api/internemedewerker/formulier/update/${nieuwFormulier.id}`, true);
            xhr.setRequestHeader("Content-Type", "application/json");
            xhr.send(JSON.stringify(nieuwFormulier));

        })
    })

    buttonSubmit.addEventListener("click", () => {
        verzendMedewerkerFormulier(formulier.id);      
    });

    //Exporteer formulier naar CSV

    downloadFormulier.onclick = function(event ){
        console.log("nu in de download functie index.js");
        window.location.href = "./api/formulier/export-users/" +  formulierId + "/" + medewerkerId;
    }

}

aanpassenurl();
haalMedewerkerFormulierOp();