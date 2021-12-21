async function postRequest() {

    let data = {
        "Navn": document.getElementById("Navn").value.toString(),
        "Email": document.getElementById("Email").value.toString(),
        "Foedselsdato": document.getElementById("Foedselsdato").value.toString()
    }

    let postRequest = await fetch("http://localhost:3000/bruger", {
        method: 'POST',
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
    });

}