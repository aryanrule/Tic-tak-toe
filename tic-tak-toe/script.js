 // lets add js now 
 const boxes = document.querySelectorAll(".box");   //yha mene boxes ko fetch kiya joo saare ke saare boxes ko fetch krlega taaki mein sbb pe khuch functionality add krsku 
 const  gameInfo = document.querySelector(".game-info");
 const newGameBtn = document.querySelector(".btn");

 let currentPlayer;   //this will actually track you O and X
 let gameGrid ;   



 const winningPositions = [  
 //these are these are the probabilites through which i can win   through which  we can     
 [0,1,2],
 [3,4,5],
 [6,7,8],
 [0,3,6],
 [1,4,7],
 [2,5,8],
 [0,4,8],
 [2,4,6]

 ]; 
 

 // now step 2 
 // lets create a function to initialize the game 
 function initGame(){
     currentPlayer = "X";    // initilize the current player to be at X

     gameGrid = ["","","","","","","","",""]; //initilized thevalue to be in my grid to be zero 
     //grid game ko toh empty kre ho but UI pr nhi 
     //UI pr empty krna pdega 
     boxes.forEach((box , index) => {
         box.innerText = "";
         boxes[index].style.pointerEvents = "all";

         //green color ko bhi remove krna hai   //jo bhi default properties thi css ki unhi ko vps se apply krdo 
         box.classList = `box box${index+1}`;
         

     });
     newGameBtn.classList.remove("active"); //initialy mein new bttn hai mein usse empty krana chchata huuu means  i dont want to display it  
     gameInfo.innerText = `Current Player - ${currentPlayer}`;   // yeh mere current playere ko display kradega  syntax ko mdn krlena rk baar 
      
     
 }

 initGame();  // calling the function 


 

 function swapTurn(){
     if(currentPlayer === "X"){
         currentPlayer = "O";
     }
     else {
         currentPlayer = "X";
     }

     //UI update 
     gameInfo.innerText = `Current Player - ${currentPlayer}`;
     
 }
 

 //step-5 
 //most important logic 
 function checkGameOver(){

let answer = "";

winningPositions.forEach((position) => {

 //all three boxes should be non empty and exactly same in value 
 if( (gameGrid[position[0]] !== "" || gameGrid[position[1]] !== "" || gameGrid[position[2]] !== "") 
 && (gameGrid[position[0]] === gameGrid[position[1]] ) && (gameGrid[position[1]] === gameGrid[position[2]])) {

     //check if x is winner 
     if(gameGrid[position[0]] === "X")
         answer = "X";
     
     else 
         answer = "O";

     //disable pointer event jaise hi winner miljaye toh tum aage click krvao hi mtt 
     boxes.forEach((box) => {
         box.style.pointerEvents = "none";
     })

     //now we know X or O is a winner 
     //hume unn particular boxes pr green mark krna hoga 
     //mene yeh win class ko css mein active kiya hua hai 
     boxes[position[0]].classList.add("win");
     boxes[position[1]].classList.add("win");
     boxes[position[2]].classList.add("win");

 }


});

//writing logic for new btn 
//it means we have a winner 
if(answer !== ""){
 gameInfo.innerText = `Winner Player - ${answer}`;
 newGameBtn.classList.add("active");

 return ;

}


//what if there is no winner //tie 
//agr saare boxes bhre hue hai means tie hogya matter 


//check weather is there any tie 
let fillCount =  0;
gameGrid.forEach((box) => {
 if(box !== "")
 fillCount++;

});

//board is filled , game is tie 
if(fillCount === 9){
 gameInfo.innertext = "Game Tied !";
 newGameBtn.classList.add("active");
}

}
 

 //step-4  -- creating a function handle click which actually perform some task to like 
 /*
 1) unclickable 
 2) khuch value daaldena O or X 
 3) players change krdo 
 4) swap turn() b/w the players 
 5) check krlo koi jit gya ?
 */
 function handleClick(index){

     //yeh code sirf clickable material ko handle krega not unclickability  
     if(gameGrid[index]===""){  //agr jis box pe khuch click kiya hai vo empty hai tbhi yeh task perform kro 
         boxes[index].innerText = currentPlayer;  //UI pe currentPlayer daaldo
         gameGrid[index] = currentPlayer;  //and js mein currentPlayer k inner logic ko update krod 
         boxes[index].style.pointerEvents = "none";
         
         
         //swap karo turn ko 
         swapTurn();

         //check kro koi jit toh nhi gya 
         checkGameOver();
     }
     
 }


 //step -3 adding eventlistener to each box foreach ka mtlb saare boxes ko access kraa hu and khuch functionality add kraa hu 
 //harr ek box ke upr mein yeh vala code chlaunga 
 boxes.forEach((box,index) => {
     box.addEventListener("click" , ()=> {
          handleClick(index) ; //yha handle click naam ke ek function ko call krdiya 
     })
 });
 


 
 

 //new game pr jaise hi mein click krunga vps se sabb new show hoga UI pr 
 newGameBtn.addEventListener("click" , initGame);
 

