

var timeInMinutes = 10;

var currentTime = Date.parse(new Date());

var deadline = new Date(currentTime + timeInMinutes*60*1000);

var correctAnswers = 0;

var incorrectAnswers = 0;

var unansweredQuestions = 0;

var questionsAndAnswers = [
	
	{
		
		question: "question 1",
		answer: ["answer 1", "answer 2", "answer 3"],
		buttonClass: ["b11","b12","b13"],
		correctAnswer: ".b11",
		class: "q1"

	},
	
	{
		
		question: "question 2",
		answer: ["answer 1", "answer 2", "answer 3"],
		buttonClass: ["b21","b22","b23"],
		correctAnswer: ".b23",
		class: "q2"

	},
	
	{

		question: "question 3",
		answer: ["answer 1", "answer 2", "answer 3"],
		buttonClass: ["b31","b32","b33"],
		correctAnswer: ".b33",
		class: "q3"

	}
];

var populateQuiz = function(){

	for(var x = 0; x < questionsAndAnswers.length; x++){

		var question = $("<div>");

		question.addClass("questionDiv")

		var allAnswersContainer = $("<div>");

		question.html(questionsAndAnswers[x].question);

		for(var y = 0; y < questionsAndAnswers[x].answer.length; y++){
			var button = $("<input type='radio'>");
			button.addClass(questionsAndAnswers[x].class);
			button.addClass(questionsAndAnswers[x].buttonClass[y]);
			var oneAnswerContainer = $("<div>");
			oneAnswerContainer.addClass("answersDiv")
			oneAnswerContainer.append(button);
			oneAnswerContainer.append(questionsAndAnswers[x].answer[y]);
			allAnswersContainer.append(oneAnswerContainer);

		}


		$("#superContainer").append(question);
		$("#superContainer").append(allAnswersContainer);
		

	}
// 	var submit = $("<button>");

// 	submit.html("Submit Answers");

// 	$(".submitBtn").append(submit);
}


var getTimeRemaining = function(endtime){

	//time remaining in milliseconds between now and the end
	var t = Date.parse(endtime) - Date.parse(new Date());


	//convert milliseconds to minutes. Whatever is cut out from using the floor method, will be displayed in seconds
	var minutes = Math.floor(t/1000/60);

	//convert milliseconds remaining to seconds
	var seconds = Math.floor((t/1000)%60);

	//make a reusable object that give us easy access to the values of minutes and seconds at any point in time
	return {

		"total": t,
		"minutes": minutes,
		"seconds": seconds

	};

}

var timeInterval;

var startTimer = function(id,endtime){

	function updateClock(){
		var time = getTimeRemaining(endtime);
			
		$(id).html("Time remaining: " + time.minutes + ":" + ('0'+time.seconds).slice(-2));

		if(time.total <= 0){
			displayResults();
			clearInterval(timeInterval);
		}
	}

	updateClock();

	timeInterval = setInterval(updateClock,1000);

}

var displayResults = function (){

	for(var x = 0; x < questionsAndAnswers.length; x++){
		
		if($(questionsAndAnswers[x].correctAnswer).is(":checked")){
			correctAnswers++
		}

		else{

			var leftBlank = 0;
			for(var y = 0; y < questionsAndAnswers[x].answer.length; y++){
				if($("." + questionsAndAnswers[x].buttonClass[y]).is(":checked")){
					
					incorrectAnswers++;

				}
				else {
					leftBlank++;
				}
			}
			
			if(leftBlank === 3){
				unansweredQuestions++;
			}

		}

	}

	var result_correct = $("<div style='clear:both'>");
	var result_incorrect = $("<div style='clear:both'>");
	var result_unanswered = $("<div style='clear:both'>");
	result_correct.html("your number of correct answers is " + correctAnswers + " out of 3");
	result_incorrect.html("your number of incorrect answers is " + incorrectAnswers + " out of 3");
	result_unanswered.html("your number of unanswered questions is " + unansweredQuestions + " out of 3");
		
	$("#superContainer").append(result_correct);
	$("#superContainer").append(result_incorrect);
	$("#superContainer").append(result_unanswered);
	$(".questionDiv").hide();
	$(".answersDiv").hide();

}

var stillUnanswered = function(){
	for(var x = 0; x < questionsAndAnswers.length; x++){

		var leftBlank = 0;
		for(var y = 0; y < questionsAndAnswers[x].answer.length; y++){
			if($("." + questionsAndAnswers[x].buttonClass[y]).is(":checked")){
				
				return false

			}
			else {
				leftBlank++;
			}
		}
		
		if(leftBlank === 3){
			return true
		}

	}
}

$(document).ready(function(){

populateQuiz();


$(".q1").on("click",function(){

	$(".q1").prop("checked",false);
	$(this).prop("checked",true);
});

$(".q2").on("click",function(){

	$(".q2").prop("checked",false);
	$(this).prop("checked",true);
});

$(".q3").on("click",function(){

	$(".q3").prop("checked",false);
	$(this).prop("checked",true);
});

$("#submitBtn").on("click",function(){

	if(stillUnanswered()){

		alert("please try to answer all questions before time runs up")

	}
	else{
		clearInterval(timeInterval);
		displayResults();
	}

});

startTimer("#timer",deadline);


});