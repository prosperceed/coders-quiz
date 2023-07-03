const startBtn = document.querySelector(".start-btn")
const nextBtn = document.querySelector(".next")
const prevBtn = document.querySelector(".prev")
const closeDiv = document.querySelector(".close")
const questionElement = document.querySelector(".qst")
const answerDiv = document.querySelector(".answer-btns")
const controls = document.querySelector(".controls")
const questionHeader = document.querySelector(".qst")
const msg = document.querySelector(".message")

startBtn.addEventListener("click", startQuiz)
nextBtn.addEventListener("click", ()=>{
    currentQuestion++
    nextQuestion()
})

prevBtn.addEventListener("click", ()=>{
    currentQuestion--
    PreviousQuestion()
})

let shuffleQuestion, currentQuestion;
let score = []


closeDiv.classList.add("hide")
questionHeader.classList.add("hide")
controls.classList.add("hide")


function startQuiz(){
    startBtn.classList.add("hide")
    questionHeader.classList.remove("hide")
    closeDiv.classList.remove("hide")
    controls.classList.remove("hide")
    shuffleQuestion = questions.sort(()=> Math.random() - 0.5)
     currentQuestion = 0
     nextQuestion()
     PreviousQuestion()
}

function nextQuestion(){
    clearState()
    showQuestion(shuffleQuestion[currentQuestion])
    nextBtn.classList.remove("hide")
    prevBtn.classList.remove("hide")
}
  

function PreviousQuestion(){
    clearState()
    showQuestion(shuffleQuestion[currentQuestion])
    if(currentQuestion < 1){

        prevBtn.classList.add("hide")
    }
    else{
        prevBtn.classList.remove("hide")
        nextBtn.classList.remove("hide")
    }
}

function showQuestion(question){
    questionElement.innerText = question.question
    question.answers.forEach(answer =>{
        const answerBtn = document.createElement("button")
        answerBtn.classList.add("answer")
        answerBtn.innerHTML = answer.text
        answerDiv.appendChild(answerBtn)
        if(answer.correct){
            answerBtn.dataset.correct = answer.correct
        }
        answerBtn.addEventListener("click", selectAnswer)
    })
}

function clearState(){
    clearStatus(document.body)
    nextBtn.classList.add("hide")
    prevBtn.classList.add("hide")
    while(answerDiv.firstChild){
        answerDiv.firstChild.remove(answerDiv)
    }
}
function selectAnswer(e){
    const selected = e.target
    const correct = selected.dataset.correct
    if(correct){
        score.push(correct)
    }
    else{
        score;
    }
    console.log(score);
    setStatus(document.body, correct)
    Array.from(answerDiv.children).forEach(button =>{
        setStatus(button, button.dataset.correct)
    })
    if(shuffleQuestion.length > currentQuestion + 1){
        nextBtn.classList.remove("hide")
        prevBtn.classList.remove("hide")
    }
 
    else{   
        clearState()
        controls.classList.add("hide")
        closeDiv.classList.add("hide")
        startBtn.classList.remove("hide")
        // msg.innerText = `You scored ${score.length}`
        questionHeader.innerHTML="The quiz just ended. Kindly click on the button to restart"
        startBtn.innerHTML = "Restart"
        alert("You scored" + score.length)
    }
}



function setStatus(element, correct){
    clearStatus(element)
    if (correct){
        element.classList.add("correct")
    } else{
        element.classList.add("wrong")
    }
}

function clearStatus(element){
    element.classList.remove("correct")
    element.classList.remove("wrong")
}

const questions = [
{
    question: "What is the sum of 3 and 5?",
    answers:[
        {text:"8", correct: true},
        {text:"3", correct: false},
        {text:"810", correct: false},
        {text:"9", correct: false},
    ]
    
},
{
    question: "What is the best programming language?",
    answers:[
        {text:"Basic", correct: false},
        {text:"Python", correct: false},
        {text:"JavaScript", correct: true},
        {text:"C++", correct: false},
    ]
    
},
{
    question: "Who is the best Youtuber?",
    answers:[
        {text:"Dev Ed", correct: true},
        {text:"Mosh", correct: true},
        {text:"Angela Yu", correct: true},
        {text:"Web Dev Simplified", correct: true},
    ]
    
},
{
    question: "What is an Array?",
    answers:[
        {text:"A container that receives variables", correct: false},
        {text:"Elements with similar datatype", correct: false},
        {text:"A list of items which are related", correct: true},
        {text:"Objects that change overtime", correct: false},
    ]
    
}
]