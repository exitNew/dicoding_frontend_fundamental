const gambar = document.getElementById("gambar");

gambar.setAttribute("width", 300);
gambar.setAttribute("height", 215);


const button = document.querySelectorAll(".button");
const playButton = button[3];

const playButtonElement = playButton.children[0];
playButtonElement.setAttribute('type', 'submit');