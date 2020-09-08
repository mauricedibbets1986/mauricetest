const kcpNaam = document.getElementById("kcp-naam");
const kcpEmail = document.getElementById("kcp-email");
const kcpTel = document.getElementById("kcp-telefoonnummer");
var urlId;


//haalt id uit huidige url
var url_string = window.location.href;
var url = new URL(url_string);
var idpf = url.searchParams.get("id");
console.log(idpf)

function aanpassenurl() {
    let pfurl = document.getElementById('profielpaginaurlkcp').href;
    pfurl = pfurl + "?id=" + idpf;
    var a = document.querySelector('a[href="/profielpaginakcp"]'); if (a) { a.setAttribute('href', pfurl) }
}

window.onload = () => {
    aanpassenurl();
};

function wachtwoordWijzigen(){
    var urlString = window.location.href;
    var url = new URL(urlString);
    urlId = url.searchParams.get("id");
    var xhr = new XMLHttpRequest();

    const kcpWachtwoord = document.getElementById("nieuwWachtwoord").value;
    console.log(kcpWachtwoord)
    let kcpJSON = {};
    kcpJSON.password = kcpWachtwoord;
    xhr.onreadystatechange = function () {
        if (xhr.readyState === 4) {
        }
    }

    xhr.open("PUT", `http://localhost:8082/api/opdrachtgever/wachtwoordwijzigen/${urlId}`, true);
    xhr.setRequestHeader("Content-Type", "application/json");
    xhr.send(JSON.stringify(kcpJSON));
}


const kcpFunction = () => {
    var urlString = window.location.href;
    var url = new URL(urlString);
    urlId = url.searchParams.get("id");
    let xhr = new XMLHttpRequest();

    xhr.onreadystatechange = function() {
        if (xhr.readyState == 4) {
            kcp = JSON.parse(this.responseText);
            kcpNaam.innerHTML = `${kcp.naam}`;
            kcpEmail.innerHTML = `${kcp.email}`;
            kcpTel.innerHTML = `${kcp.telefoonnr}`;
        }
    }
    xhr.open("GET", `http://localhost:8082/api/opdrachtgever/${urlId}` , true);
    xhr.send();
}

kcpFunction();
wachtwoordWijzigen();