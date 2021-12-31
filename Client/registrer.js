async function postRequest() {

    const button = document.getElementById("register");
    button.disabled = true;
    button.style.opacity = "0.5";


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

    if(postRequest.ok){
        window.location.href = "index.html";
    } else {
        button.disabled = false;
        button.style.opacity = "1.0";
    }


}