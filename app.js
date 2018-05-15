const green = document.getElementById('green'),
      red = document.getElementById('red'),
      blue= document.getElementById('blue'),
      yellow = document.getElementById('yellow'),
      start = document.getElementById('start');

let timer = 800,
    sequence = [],
    i = 0;

green.addEventListener('click', () => active(0));
red.addEventListener('click', () => active(1));
blue.addEventListener('click', () => active(2));
yellow.addEventListener('click', () => active(3));
start.addEventListener('click', startGame);

function active(x){

  switch (x) {
    case 0:
      green.style.opacity = 1;
      setTimeout(()=>{ green.style.opacity = .5;}, timer);
    break;
    case 1:
      red.style.opacity = 1;
      setTimeout(()=>{ red.style.opacity = .5;}, timer);
    break;
    case 2:
      blue.style.opacity = 1;
      setTimeout(()=>{ blue.style.opacity = .5;}, timer);
    break;case 3:
      yellow.style.opacity = 1;
      setTimeout(()=>{ yellow.style.opacity = .5;}, timer);
    break;
  }
  if(i < sequence.length){
    for(i=0;i<sequence.length; i++){ setTimeout(()=>startGame(), timer); }
  }
}

function startGame(){
  let element = Math.floor(Math.random() * 4);

  sequence.push(element);
  setTimeout(()=> playing(), 2000);
  console.log(sequence);
}

function playing(){

  active(sequence[i]);

  // sequence.forEach((val)=> { setTimeout(()=> { active(val) }, timer); });
}
