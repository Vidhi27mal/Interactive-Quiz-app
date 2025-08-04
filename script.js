const questions =[
    {
        question: "I speak without a mouth and hear without ears. I have nobody, but I come alive with wind. What am I?",
        answers:[
            { text : "Shadow ", correct : false},
            { text : "echo ", correct : true},
            { text : "cloud", correct : false},
            { text : "SoundWave", correct : false}

            
        ]
    },{
        question: "I’m tall when I’m young, and I’m short when I’m old. What am I?",
        answers:[
            { text : "Pencil ", correct : false},
            { text : "Tree", correct : false},
            { text : "CAndle ", correct : true},
            { text : "Iceberg ", correct : false}
           
        ]
    },
    {
        question: "What has keys but can’t open locks?",
        answers:[
            { text : "keyboard ", correct : false},
            { text : "Treasure chest ", correct : false},
            { text : "Piano ", correct : true},
            { text : "Map ", correct : false}
            
        ]
    },
    {
        question: "What can travel around the world while staying in the same corner?",
        answers:[
            { text : "Satellite ", correct : false},
            { text : "Compass", correct : false},
            { text : "Postage Stamp ", correct : true},
            { text : "Map ", correct : false}
            
        ]
    },
    {
        question: "I have branches, but no fruit, trunk or leaves. What am I?",
        answers:[
            { text : "family tree", correct : false},
            { text : "Library", correct : false},
            { text : "Bank", correct : true},
            { text : "Goverment ", correct : false}
            
        ]
    },
    
]
const timerEl = document.querySelector(".timer")
const timebar = document.getElementById("timebar")

let questionNumber = document.getElementById("question-number")
let questionElement = document.getElementById("questions")
let answerButtons = document.getElementById("answer-buttons")
const playagainbtn = document.getElementById("playagainbtn")

let currentQuestionIndex = 0;
let score = 0;
timeInterval = null;
isAnswered = false;

function showAnswer(){
    Array.from(answerButtons.children).forEach(button =>{
        if(button.dataset.correct ==="true"){
            button.classList.add("correct")
        }
        button.disabled = true;
    })

}


function startTimer(){
    let timeLeft = 20;
    const totalTime = 20;

    timerEl.innerText = timeLeft;
    timebar.style.transition = 'none'
    timebar.style.width = '100%'

    void timebar.offsetWidth;
    timebar.style.transition =`width ${totalTime}s linear`
    timebar.style.width = '0%'

   timeInterval =  setInterval(()=>{
        timeLeft--;
        timerEl.innerText = timeLeft;
        if(timeLeft <= 0){
            clearInterval(timeInterval)
            timerEl.innerText=0
            
            showNextQuestions()

            if(isAnswered){
                showAnswer()
                setTimeout(showNextQuestions, 800)
            }
        
    }


}, 1000)
}
  
function selectAnswer(e){
    const selectedBtn = e.target;
    const isCorrect = selectedBtn.dataset.correct == "true"
    if (isCorrect){
        selectedBtn.classList.add("correct")
        score++;

    }else{
        selectedBtn.classList.add("incorrect")
        }
        showAnswer()
   
    
    isAnswered = true;
    setTimeout( showNextQuestions , 1000)
   
}


function showOptions(currentQuestion){
    currentQuestion.answers.forEach(answer => {
        const button = document.createElement("button")
        button.innerHTML = answer.text
        button.classList.add("btn")
        answerButtons.appendChild(button)


        if(answer.correct){
            button.dataset.correct = answer.correct;

        }
        button.addEventListener("click", selectAnswer)

    })
}
function resetstate(){
    while(answerButtons.firstChild){
        answerButtons.removeChild(answerButtons.firstChild)
    }

}
function showQuestions(){
    startTimer()
    resetstate()
    let currentQuestion = questions[currentQuestionIndex];
    let questionNo = currentQuestionIndex + 1;
    questionNumber.innerHTML = `Q.${questionNo} of ${questions.length}`
    questionElement.innerHTML = currentQuestion.question
    showOptions(currentQuestion)
}
function showScore(){
    timerEl.style.visibility = "hidden"
    timebar.style.visibility = "hidden"
    questionNumber.style.visibility = "hidden"
    clearInterval(timeInterval)
    resetstate()
    questionElement.innerHTML = `Score : ${score}`
    playagainbtn.style.display = 'block'

}
function showNextQuestions(){
    clearInterval(timeInterval)
    
    if(currentQuestionIndex < questions.length){
        showQuestions()


    }else{
        showScore()
    }
    currentQuestionIndex++;
}

function startQuiz(){
    timerEl.style.visibility = "none"
    timebar.style.visibility = "visible"
    questionNumber.style.visibility = "visible"
    playagainbtn.style.display = 'visible'
    currentQuestionIndex =0;
    score = 0;
    showNextQuestions()


}
playagainbtn.addEventListener("click" , startQuiz)



const startScreen =  document.querySelector(".start-Screen")
const startBtn = document.getElementById("start-btn")
const quiz = document.querySelector(".app")

startBtn.addEventListener("click" , ()=>{
    startScreen.style.display = "none";
    quiz.style.display ="block";
    startQuiz()
})
