const links = document.getElementById('links');
links.innerHTML;
links.innerText;


const dicoding = document.getElementById('dicodingLink');
dicoding.innerText = 'Belajar Programming di Dicoding';


const buttons = document.getElementsByClassName('button');
for(const button of buttons){
  console.log(button.children[0]);
}

for (const button of buttons) {
  button.children[0].style.borderRadius = '6px';
}

// CSS is border-radius for javascript it was broderRadius