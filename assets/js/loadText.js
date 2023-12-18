// Load text from external files


function loadText() {
    // read text from URL location
    fetch('assets/text/intro.txt')
        .then(response => response.text())
        .then(data => {
            intro_p.innerHTML = data;
        })
        .catch(error => console.log(error));
}

intro_p = document.getElementById('intro-p');
loadText();