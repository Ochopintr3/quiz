document.addEventListener("DOMContentLoaded", function () {
  fetch("info.json")
      .then((response) => response.json())
      .then((data) => {
          populateQuiz(data.questions);
      })
      .catch((error) => console.error("Error fetching JSON:", error));

  function populateQuiz(questions) {
      const questionContainer = document.querySelector(".questionContainer");
      const scorePoint = document.querySelector(".point");

      let currentQuestionIndex = 0;
      let score = 0;

      function displayQuestion() {
          const currentQuestion = questions[currentQuestionIndex];
          const questionElement = document.querySelector(".question");
          const answerContainer = document.querySelector(".answerContainer");

          questionElement.textContent = currentQuestion.questionText;

          answerContainer.innerHTML = "";

          currentQuestion.answers.forEach((answer, index) => {
              const answerElement = document.createElement("a");
              answerElement.href = "#";
              answerElement.textContent = answer;
              answerElement.addEventListener("click", () => checkAnswer(index));
              answerContainer.appendChild(answerElement);
          });
      }

      function checkAnswer(selectedIndex) {
          const currentQuestion = questions[currentQuestionIndex];

          if (currentQuestion.correctAnswer === currentQuestion.answers[selectedIndex]) {
              score++;
          }

          scorePoint.textContent = score;
          currentQuestionIndex++;

          if (currentQuestionIndex < questions.length) {
              displayQuestion();
          } else {
              displayPopUp(score);
          }
      }

      function displayPopUp(score) {
          const popUp = document.querySelector(".pop-up");
          const popUpScore = document.querySelector(".pop-up-score");

          popUpScore.textContent = score;

          popUp.style.display = "flex";

          const restartButton = document.querySelector(".restart-button");
          restartButton.addEventListener("click", restartQuiz);
      }

      function restartQuiz() {
          const popUp = document.querySelector(".pop-up");

          popUp.style.display = "none";

          currentQuestionIndex = 0;
          score = 0;
          scorePoint.textContent = score;
          displayQuestion();
      }

      displayQuestion();
  }
});
