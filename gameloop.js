/*
Stone Pile Class
*/
class StonePile{
  constructor(){
   this.numOfStones = 3;
   this.currentState = "";
  };
  numOfStones;
  stoneState = ["Images/no_Stone.png","Images/one_Stone.png","Images/two_Stone.png","Images/three_Stone.png"];
  currentState = this.stoneState[this.numOfStones];
  
  removeStone(num){
   if(this.numOfStones > 0 ){
      if(num > 0 && num <=this.numOfStones){
        this.numOfStones -= num;
      }
   } 
  }
 
  changeState(){
      if(this.numOfStones == 0){
          this.currentState = this.stoneState[0];
      }
      if(this.numOfStones == 1){
          this.currentState = this.stoneState[1];
      }
      if(this.numOfStones == 2){
          this.currentState = this.stoneState[2];
      }
      if(this.numOfStones == 3){
          this.currentState = this.stoneState[3];
      }
  }
  getNumStone() {
      return this.numOfStones;
  }
  getStoneState(){
    return this.currentState;
  }
  setNumStones(number){
   this.numOfStones = number;
  }
}
/*
 GobliAi
*/
class GoblinAi
{
    constructor(numpile){
      this.numpile = numpile;
    }
    messageList = ["That play is horrible and if that's all you've got you'll surely lose.",
    "I've seen better.", "That play sucks, you've only quickened your loss.",
    "Come on at least give us a bit of a challenge.","gloob says that play you've made has guaRanTee-Ed our victory!"];
    messageList2 = ["You see that there. We've got this game in the bag!",
    "tWo stoNes in stead of oNe, whAt you Gonna do NoW?", "Have you finally decide to give up?",
    "gloob says he'll buy you an icecream to cool you dOwn from your fIery L.","You still having fun or are you reAdY to thRough iN the stONe?",
    "gloob says: 'Times are changing' Then I said it's time to turn back the stoNe.", "StoNEY, BrO-NEY, its time for your Lonely. De-feat!"];

    isTurn = false;
    stonePile;
    numpile;

     
    makeAPlay(){
      let numPile = randomNum(3) - 1;
      let numOfStones = randomNum(3);
      let least;
       stonePiles.every(element =>{
       if(element.getNumStone() > 0 && element.getNumStone() <= 1)
       {
        least = element;
        return false;
       }
     });
      if(this.isTurn){
        console.log("Goblins Made A Play!");
        if(stonePiles[numPile].getNumStone() <= 0){
          stonePiles.every(v => {
             if(v.getNumStone() > 0 && v.getNumStone() < 2){
               v.removeStone(1);
               return false;
             }
          })
          
        } 
        else
        {
          if(least != null){
            least.removeStone(numOfStones);
          }
          else {
            stonePiles[numPile].removeStone(numOfStones);
          }
        }
       
         
      }
    }
    setTurn(turn){
      this.isTurn = turn;
    }
    taunt() {
      return this.messageList[randomNum(this.messageList.length - 1)];
    }
    taunt2() {
      return this.messageList2[randomNum(this.messageList2.length - 1)];
    }
}
/*
 Player Class
 */
class Player {
    isTurn = false;
    setTurn(isTurn){
        this.isTurn = isTurn;
    }
    makeAPlay(){
      console.log("Player Made a Play!");
    }
}

/*
 Main GameLoop 
*/
//Global Variables
const start = Math.floor(1 + Math.random()*2);
const player = new Player();
let stonePiles = [];
for(i = 0; i < 3; i++){
  stonePiles[i] = new StonePile();
}
let goblins;
let remainingPiles;
let totalStones;


//Functions
function switchTurn(){
  console.log("SwitchTurn")
    if(player.isTurn){
        player.setTurn(false);
        document.getElementById("goblinMessage").textContent = goblins.taunt();
        goblins.setTurn(true);     
    }
    if(goblins.isTurn){
      goblins.makeAPlay();
      document.getElementById("goblinMessage").textContent = goblins.taunt2();
      if(remainingPiles == 1 && goblins.numOfStones >= 1){
           alert("You've won!")
      }
      else{
        goblins.setTurn(false);
        player.setTurn(true);  
      }
      
    }
};
function updateDisplay()
{
     let count = 0;
     stonePiles.forEach(element => {
     console.log(element.numOfStones);
     count++;
     element.changeState();
     let state = element.getStoneState();
     document.getElementById(count).src = state;
     
     });
}
function randomNum(aNum){
  return Math.floor(1 + Math.random()*aNum);  
}   
function remove(numplie,numremove){
  stonePiles[numplie].removeStone(numremove);
}
function checkGameStatus(){
  remainingPiles = 0;
  stonePiles.forEach(element =>{
    if(element.getNumStone() > 0){
        remainingPiles++;
    }
  stonePiles.forEach(element => {
      totalStones += element.getNumStone();
   });  
  });
  determineEndCondition();
}
function determineEndCondition(){
  if(player.isTurn){
    if(remainingPiles ==  0 && totalStones == 0){
        alert("You have Lost!");
    }
  }
  else
  {
    if(goblins.isTurn){
      if(remainingPiles ==  0 && totalStones == 0){
        alert("You have Won!");
      }
    }
  }
}
function playerPlay(){
  player.makeAPlay();
  switchTurn();
}
function reset(){
  stonePiles.forEach(b => {
    b.setNumStones(3);
  });
  updateDisplay();
}

function startGame()
{   
    goblins = new GoblinAi(3);
    totalStones = 0;
    //Sum of all the stones in the stone piles.
    stonePiles.forEach(element => {
       totalStones += element.getNumStone();
    });
    //Chooses who starts first
    if(start == 1) {
      player.isTurn = true;
    }
    else{
      goblins.isTurn = true;
    }
   // let goblinsTurn = setInterval(goblinPlay,2000);
    let checkStatus = setInterval(checkGameStatus,500);
    let update = setInterval(updateDisplay,1000);
}





 

