async function postRequest() {

    const button = document.getElementById("register");
    button.setAttribute('disabled', 'disabled');
    button.setAttribute('opacity', '0.5');



    let getRequest = await fetch("https://tallboye.herokuapp.com/brugere").then(response => response.json());
    let user = getRequest.find( object => object.Navn === document.getElementById("Navn").value)

    if (user === undefined) {
        let data = {
            "Navn": document.getElementById("Navn").value,
            "Kodeord": document.getElementById("Kodeord").value
        }

        let postRequest = await fetch("https://tallboye.herokuapp.com/bruger", {
            method: 'POST',
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify(data),
        });

        if(postRequest.ok){
            window.location.href = "https://tallboye.com/chat/index.html";
        }

    } else {
        document.getElementById("warning").innerText = "Username already exists"
        button.removeAttribute('disabled');
        button.setAttribute('opacity', '0.5');
    }



}