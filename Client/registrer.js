async function postRequest() {

    const button = document.getElementById("register");
    button.setAttribute('disabled', 'disabled');
    button.setAttribute('opacity', '0.5');


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
        window.location.href = "https://tallboye.com/chat/index.html";
    } else {
        button.removeAttribute('disabled');
        button.setAttribute('opacity', '0.5');
    }


}