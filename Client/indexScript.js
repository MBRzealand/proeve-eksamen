async function login() {

    let getRequest = await fetch("https://tallboye.herokuapp.com/brugere").then(response => response.json());

    let user = getRequest.find( object => object.Navn === document.getElementById("brugerNavn").value)

    if(user.Kodeord === document.getElementById("kodeord").value){
        document.cookie = `username=${user.Navn}`;
        window.location.href = "beskeder.html";
    }

}