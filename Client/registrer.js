async function postRequest() {

    let data = {
        "Navn": document.getElementById("Navn").value,
        "Email": document.getElementById("Email").value,
        "Foedselsdato": document.getElementById("Foedselsdato").value,
        "Kodeord": document.getElementById("Kodeord").value
    }

    let postRequest = await fetch("https://tallboye.herokuapp.com/bruger", {
        method: 'POST',
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
    });

}