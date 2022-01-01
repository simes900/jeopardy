

let questions = [];
let questionBank = [];
let numberBank = [200,400,600,800]
let clueNumber = 0
let offse= Math.floor(Math.random() * 9000);
//1
async function getCatagory(offset){
    
    let response = await fetch(`https://jservice.io/api/categories?count=4&offset=${offset}`);
    let catagories = await response.json();
    return catagories;
}


function buildBoard(catagories){
   
    document.getElementsByClassName("board")[0].innerHTML =`
        ${catagories.map(createIndividualC).join('')}
    `
    
    catagories.map(catagory=>{
        
        questions.push(catagory.id)

        })
    
    return catagories;
}



function createClues(category){
    let clueBox= ``
    let cash = 200;
    for (let i = 0; i < 4; i++){
        clueBox+=`
        <div class="money" id="${clueNumber}" style="grid-row-start:${i+2}">${cash}</div>
        `
        cash+=200;
        clueNumber+=1
    }
    return clueBox
}
function createIndividualC(m){
    return `
    <div class="catagory-title">${m.title}</div>
    ${createClues(m)}
    `
    
}

async function generateClues(id){
    let response = await fetch(`https://jservice.io/api/clues?category=${id}`)
    let data = await response.json();
    return data
}
async function getClues(){
   
    const result = questions.reduce((prevPr, currArg)=>{
    return prevPr
        .then((acc)=> generateClues(currArg)
            .then((resp)=>[...acc, resp])
        );
}, Promise.resolve([]));
    return result;
}

(async ()=> {
   let catagories = await Promise.resolve(getCatagory(offse)) //fetch catagories
   await Promise.resolve(console.log(buildBoard(catagories))) // build board with topics/numbers
   let result = await Promise.resolve(getClues())
   await buildQuestions(result)
})();

function buildQuestions(res){
    
    res.map(ques=>{
        for(let i =0; i< 4; i++){
            
            let tempObj = {
            "value": ques[i].value,
            "question": ques[i].question,
            "answer": ques[i].answer,
            "category_id": ques[i].category_id
        }
        questionBank.push(tempObj)
        }
        
    })
   

    
}

//////////////////////////

let board = document.getElementsByClassName("board")[0]
let questionBoard = document.getElementById("question")
let answerBoard = document.getElementById("answer")
board.addEventListener("click", function( event ) {
           let gold = "rgb(255, 215, 0)"
           var color = window.getComputedStyle(event.target).getPropertyValue("color");
          
           if(color == gold){
               getTheQuestion(event.target.id)
               event.target.style.color = "#060CE9";
               board.style.display ="none";
               questionBoard.style.display = "flex"
           }
            
           
        
        
  })
function getTheQuestion(value){
    questionBoard.innerHTML = `
      <p id="${value}">
     ${questionBank[value].question}
     </p>
    `
}

function getTheAnswer(value){
    answerBoard.innerHTML = `
      <p id="${value}">
     ${questionBank[value].answer}
     </p>
    `
}
questionBoard.addEventListener("click", function( event ) {
  //event.target.style.background = "orange";
        getTheAnswer(event.target.id)
        questionBoard.style.display = "none"
        answerBoard.style.display ="flex"
  })

answerBoard.addEventListener("click", function( event ) {
  //event.target.style.background = "orange";
        board.style.display ="grid";
        answerBoard.style.display="none"
  })


btn.addEventListener("click",function(event){
    questions = [];
    questionBank = [];
    numberBank = [200,400,600,800]
    clueNumber = 0
    offse= Math.floor(Math.random() * 9000);
    
    let myNode = document.getElementsByClassName("board")[0];
    myNode.innerHTML = '';
    (async ()=> {
        let catagories = await Promise.resolve(getCatagory(offse)) //fetch catagories
        await Promise.resolve(console.log(buildBoard(catagories))) // build board with topics/numbers
        let result = await Promise.resolve(getClues())
        await buildQuestions(result)
    })();
    
})