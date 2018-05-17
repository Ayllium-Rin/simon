const green = document.getElementById('green'),
      red = document.getElementById('red'),
      blue= document.getElementById('blue'),
      yellow = document.getElementById('yellow'),
      greenSound = document.getElementById('greenSound'),
      redSound = document.getElementById('redSound'),
      blueSound = document.getElementById('blueSound'),
      yellowSound = document.getElementById('yellowSound'),
      title = document.getElementById('title'),
      start = document.getElementById('start'),
      strict = document.getElementById('strict'),
      onSwitch = document.getElementById('switch'),
      counter = document.getElementById('counter'),
      center = document.getElementById('center');

let count = 0,
    timer = 700,
    sequenceTimer = 1500,
    sequence = [],
    playerArray = [],
    strictOn = false,
    i = 0,
    on = false,
    x;

green.addEventListener('click', () => { active(0); playerArray.push(0); submitCheck(); });
red.addEventListener('click', () => { active(1); playerArray.push(1); submitCheck(); });
blue.addEventListener('click', () => { active(2); playerArray.push(2); submitCheck(); });
yellow.addEventListener('click', () => { active(3); playerArray.push(3); submitCheck(); });

start.addEventListener('click', startGame);
start.addEventListener('mousedown', ()=>{ buttonPush(start); });
start.addEventListener('mouseup', ()=> { buttonRelease(start); });

strict.addEventListener('click', pulse);
strict.addEventListener('mousedown', ()=>{ buttonPush(strict); });
strict.addEventListener('mouseup', ()=>{ buttonRelease(strict); });
// Animation functions to give the illusion of button depression.
function buttonPush(sos){
  sos.style.left = '2px';
  sos.style.top = '2px';
  sos.style.boxShadow = "none";
}
function buttonRelease(sos){
  sos.style.top = '0';
  sos.style.boxShadow = "3px 3px 2px #222";
  sos.style.left = '0';
}
// Animation function to signal strict mode engaged.
function pulse(){
  if(on===true){//Locks game if on switch is not engaged.
    if(!strictOn){
      x = setInterval( ()=>{
      strict.classList.add("animationPluseOn");//Adds CSS animation class.
      setTimeout(()=>{strict.classList.remove("animationPluseOn");}, 900);
      }, 1000); //Continually pulses the animation while strict mode is engaged.
      strictOn=true;
    }else{//Enables disengaging strict mode by clicking on the botton again.
      clearInterval(x);
      strictOn=false;
    }
  }
}
onSwitch.addEventListener('click', onOff);

function onOff(){
  if(!on){//Checks if game is on and turns it on.
    count = "0" + sequence.length//Adds a zero to the display for effect.
    counter.innerHTML = count;
    onSwitch.classList.add("animationOn");//Animates the switch.
    onSwitch.classList.remove("animationOff");//Allows the animation repeatedly.
    on=true;
  }else{
    start.addEventListener('click', startGame);//Reenables the start button
                                               //when game is turned back on.
    counter.innerHTML = "";
    onSwitch.classList.add("animationOff");//Animates the switch.
    onSwitch.classList.remove("animationOn");//Allows the animation repeatedly.
    //Clears / resets all values:
    i=0;
    playerArray=[];
    sequence=[];
    sequenceTimer=1500;
    timer=700;
    center.style.background = '#ededcc';
    if(window.innerWidth > 600){title.style.fontSize = '90px';}
    else{title.style.fontSize = '63px';}
    title.textContent = 'Simon';
    if(strictOn===true){ pulse(); }
    on=false;
  }
}
//Where the magic happens:
function active(x){
  if(on===true){
    switch(x){
      case 0:
        green.style.opacity = 1;//Brightens the corrosponding quadrant.
        setTimeout(()=>{ green.style.opacity = .5;}, timer);//Dims quadrant.
        greenSound.play();//Plays sound.
        i++;//Allows the sequence to iterate.
      break;
      case 1:
        red.style.opacity = 1;
        setTimeout(()=>{ red.style.opacity = .5;}, timer);
        redSound.play();
        i++;
      break;
      case 2:
        blue.style.opacity = 1;
        setTimeout(()=>{ blue.style.opacity = .5;}, timer);
        blueSound.play();
        i++;
      break;
      case 3:
        yellow.style.opacity = 1;
        setTimeout(()=>{ yellow.style.opacity = .5;}, timer);
        yellowSound.play();
        i++;
      break;
    }
//Checks the iteration of the sequence and calls the function after specificed time:
    if(i < sequence.length){ setTimeout(()=>{ active(sequence[i]) }, sequenceTimer); }
  }
}
//Also where the magic happens:
function startGame(){
  start.removeEventListener('click', startGame);
  if(on===true){//Locks game if on switch is not engaged.
    let element = Math.floor(Math.random() * 4);//Determines random number.
    sequence.push(element);//Adds random number to the sequence array.
//Intentionally allowed the game to continue past twenty,because who wants to quit when //they are on a roll.
    if(sequence.length >= 20){
      center.style.background = '#00aaff';
      if(window.innerWidth > 600){title.style.fontSize = '50px';}
      else{title.style.fontSize = '35px';}
      title.textContent = 'WINNER!!';
    }
    count = sequence.length < 10 ? "0" + sequence.length : sequence.length;
    counter.innerHTML = count;
    setTimeout(()=> { active(sequence[i]); }, sequenceTimer);
    //Speeds up the game with each successful completion:
    if(sequenceTimer > 500){ sequenceTimer = sequenceTimer - 75; }
    if(timer > 150){ timer = timer - 50; }
  }
}
//With each entry, the game checks for variations from the sequence:
function submitCheck(){
  if(on===true){//Locks game if on switch is not engaged.
    let check=0;
    for(let j=0;j<playerArray.length;j++){
      if(!strictOn){//The rules if strict mode disengaged.
        if(sequence[j] === playerArray[j]){ check++; }//Keeps running total of success.
        else{
          i=0;
          check=0;
          playerArray=[];
          center.style.background = 'red';//Mild red to signify a mistake.
          setTimeout(()=>{ center.style.background = '#ededcc'; }, 1000);
          setTimeout(()=>{ active(sequence[i]) }, 2000);
        }
      }else{//The rules if strict mode engaged.
        if(sequence[j] === playerArray[j]){ check++; }
        else{
          center.style.background = '#440000';//Angry red to signify complete failure.
          setTimeout(()=>{ center.style.background = '#ededcc'; }, 1000);
//Intentionally turn game off to up the stakes:
          setTimeout(()=>{ pulse(); onOff(); }, 1000);
        }
      }
    }
//Checks running total to determine if sequence completed:
    if(check === sequence.length){
      i=0;
      playerArray=[];
      startGame();
    }
  }
}
