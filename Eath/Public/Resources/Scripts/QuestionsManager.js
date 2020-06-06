// -----JS CODE-----
// QuestionsManager.js

// Do not Edit Below

//@input string firstPageTitle
//@input int maxQuestions

//@input vec4 correctColor  = {0.122,0.545,0.098,.85} {"widget":"color"}
//@input vec4 falseColor  = {0.565,0.031,0.039,.85} {"widget":"color"}
//@input vec4 disableColor  = {0,0,0,.85} {"widget":"color"}

//@input bool advance = false
//@ui {"widget":"group_start", "label":"Do not edit only if missing", "showIf": "advance"}
//@input Component.Text questionTitle

//@input Component.Text question
//@input Component.Text ans1
//@input Component.Text ans2
//@input Component.Text ans3
//@input Component.Text ans4

//@input Component.Text scoreText

//@input Component.ScriptComponent ansScript1
//@input Component.ScriptComponent ansScript2
//@input Component.ScriptComponent ansScript3
//@input Component.ScriptComponent ansScript4

//@input SceneObject thisPanel
//@input SceneObject endPanel

//@input Component.Text finalScore
//@input Component.Text finalQuestionTitle

//@input Component.ScriptComponent questionsFile
//@ui {"widget":"group_end"}

title = script.firstPageTitle
myQuestions = script.questionsFile.api.myQuestions


script.api.answer1 = answer1
script.api.answer2 = answer2
script.api.answer3 = answer3
script.api.answer4 = answer4

questionNumber = 0
correctAnswers = 0


function init(){
    script.questionTitle.text = title
    refreshQuestions()
    
}


function refreshQuestions(){

    if (questionNumber < Math.min(myQuestions.length,script.maxQuestions)){
        q = myQuestions[questionNumber].question
        a1 = myQuestions[questionNumber].answers.a
        a2 = myQuestions[questionNumber].answers.b
        a3 = myQuestions[questionNumber].answers.c
        a4 = myQuestions[questionNumber].answers.d
        
        script.question.text = q
        script.ans1.text = a1
        script.ans2.text = a2
        script.ans3.text = a3
        script.ans4.text = a4
        quest = questionNumber  + 1
        script.scoreText.text = "Question: " + quest + "/" + Math.min(myQuestions.length,script.maxQuestions)

    } else {
        script.finalQuestionTitle.text = "In " + title
        script.finalScore.text = "You got \n" + correctAnswers + "/" + Math.min(myQuestions.length,script.maxQuestions)
        script.endPanel.enabled = true
 
        script.thisPanel.enabled = false

    }
}


var stopbuttons = script.createEvent("DelayedCallbackEvent");
stopbuttons.bind(function(eventData)
{
    script.ansScript1.api.disableInteractable()
    script.ansScript2.api.disableInteractable()
    script.ansScript3.api.disableInteractable()
    script.ansScript4.api.disableInteractable()
});


var startbuttons = script.createEvent("DelayedCallbackEvent");
startbuttons.bind(function(eventData)
{
    script.ansScript1.api.enableInteractable()
    script.ansScript2.api.enableInteractable()
    script.ansScript3.api.enableInteractable()
    script.ansScript4.api.enableInteractable()
    script.ansScript1.api.changeAnimationType("Bounce")
    script.ansScript2.api.changeAnimationType("Bounce")
    script.ansScript3.api.changeAnimationType("Bounce")
    script.ansScript4.api.changeAnimationType("Bounce")
    
    
    questionNumber = questionNumber + 1
refreshQuestions()
});


function setCorrectAnswer(ans){
        color = script.correctColor
    if (ans == "a"){
        script.ansScript1.api.changeStateValue("disabled","Color",color)
        script.ansScript1.api.changeAnimationType("None") //this is to fix a bug
    } else if (ans == "b") {
        script.ansScript2.api.changeStateValue("disabled","Color",color)
        script.ansScript2.api.changeAnimationType("None") //this is to fix a bug

    } else if (ans == "c") {
        script.ansScript3.api.changeStateValue("disabled","Color",color)
        script.ansScript3.api.changeAnimationType("None") //this is to fix a bug

    } else if (ans == "d") {
        script.ansScript4.api.changeStateValue("disabled","Color",color)
        script.ansScript4.api.changeAnimationType("None") //this is to fix a bug
    }
    
}

function setFalseAnswer(ans){
        color = script.falseColor
    if (ans == "a"){
        script.ansScript1.api.changeStateValue("disabled","Color",color)
        script.ansScript1.api.changeAnimationType("None") //this is to fix a bug 
    } else if (ans == "b") {
        script.ansScript2.api.changeStateValue("disabled","Color",color)
        script.ansScript2.api.changeAnimationType("None") //this is to fix a bug

    } else if (ans == "c") {
        script.ansScript3.api.changeStateValue("disabled","Color",color)
        script.ansScript3.api.changeAnimationType("None") //this is to fix a bug

    } else if (ans == "d") {
        script.ansScript4.api.changeStateValue("disabled","Color",color)
        script.ansScript4.api.changeAnimationType("None") //this is to fix a bug
    }
    
}

var resetColors = script.createEvent("DelayedCallbackEvent");
resetColors.bind(function(eventData){
    color = script.disableColor
    script.ansScript1.api.changeStateValue("disabled","Color",color)
    script.ansScript2.api.changeStateValue("disabled","Color",color)
    script.ansScript3.api.changeStateValue("disabled","Color",color)
    script.ansScript4.api.changeStateValue("disabled","Color",color)

});




function checkAnswer(currentAnswer){
    normalColor = script.ansScript1.api.getColor()
    blueColor = {x: 0, y: 0.427451, z: 1, w: 0.8}

    if (currentAnswer == myQuestions[questionNumber].correctAnswer){
        setCorrectAnswer(currentAnswer)
        correctAnswers = correctAnswers + 1
//        script.scoreText.text = "Score: " + correctAnswers + "/" + myQuestions.length
    } else{
        setCorrectAnswer(myQuestions[questionNumber].correctAnswer)
        setFalseAnswer(currentAnswer)
    }
    stopbuttons.reset(0.2)
    startbuttons.reset(2);
    resetColors.reset(2)
}

function answer1(){
    checkAnswer("a")
}

function answer2(){
    checkAnswer("b")
}

function answer3(){
    checkAnswer("c")
}

function answer4(){
    checkAnswer("d")
}

init()