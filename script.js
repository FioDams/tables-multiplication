// Variables globales
let selectedTables = [];
let currentQuestion = null;
let score = 0;
let questionCount = 0;
const MAX_QUESTIONS = 10;
let mistakesList = []; // Tracker les erreurs
let isRetryMode = false; // Flag pour le mode retesting
let retryQuestionIndex = 0; // Index pour le retesting

// Éléments du DOM
const welcomeScreen = document.getElementById('welcome-screen');
const gameScreen = document.getElementById('game-screen');
const endScreen = document.getElementById('end-screen');
const retryScreen = document.getElementById('retry-screen');
const startBtn = document.getElementById('start-btn');
const submitBtn = document.getElementById('submit-btn');
const restartBtn = document.getElementById('restart-btn');
const retryErrorsBtn = document.getElementById('retry-errors-btn');
const retrySubmitBtn = document.getElementById('retry-submit-btn');
const answerInput = document.getElementById('answer-input');
const retryAnswerInput = document.getElementById('retry-answer-input');
const questionElement = document.getElementById('question');
const retryQuestionElement = document.getElementById('retry-question');
const feedbackElement = document.getElementById('feedback');
const retryFeedbackElement = document.getElementById('retry-feedback');
const scoreElement = document.getElementById('score');
const retryScoreElement = document.getElementById('retry-score');
const finalScoreElement = document.getElementById('final-score');
const endTitleElement = document.getElementById('end-title');
const endMessageElement = document.getElementById('end-message');
const progressFill = document.getElementById('progress');
const retryProgressFill = document.getElementById('retry-progress');
const errorSummaryElement = document.getElementById('error-summary');

// Écouteurs d'événements
startBtn.addEventListener('click', startGame);
submitBtn.addEventListener('click', checkAnswer);
restartBtn.addEventListener('click', restartGame);
retryErrorsBtn.addEventListener('click', retryErrors);
retrySubmitBtn.addEventListener('click', checkRetryAnswer);
answerInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
        checkAnswer();
    }
});
retryAnswerInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
        checkRetryAnswer();
    }
});

function startGame() {
    // Récupérer les tables sélectionnées
    const checkboxes = document.querySelectorAll('.table-selection input[type="checkbox"]:checked');
    
    if (checkboxes.length === 0) {
        alert('Sélectionne au moins une table ! 😊');
        return;
    }

    selectedTables = Array.from(checkboxes).map(cb => parseInt(cb.value));
    
    // Réinitialiser le jeu
    score = 0;
    questionCount = 0;
    mistakesList = [];
    isRetryMode = false;
    
    // Afficher l'écran de jeu
    showScreen(gameScreen);
    
    // Générer la première question
    generateQuestion();
}

function generateQuestion() {
    // Choisir une table aléatoire
    const table = selectedTables[Math.floor(Math.random() * selectedTables.length)];
    
    // Choisir un nombre aléatoire entre 1 et 10
    const number = Math.floor(Math.random() * 10) + 1;
    
    currentQuestion = {
        table: table,
        number: number,
        answer: table * number
    };

    // Afficher la question
    questionElement.textContent = `${table} × ${number} = ?`;
    
    // Réinitialiser le feedback et l'input
    feedbackElement.textContent = '';
    feedbackElement.className = 'feedback';
    answerInput.value = '';
    answerInput.disabled = false;
    answerInput.focus();
}

function checkAnswer() {
    const userAnswer = parseInt(answerInput.value);
    
    if (isNaN(userAnswer)) {
        feedbackElement.textContent = '⚠️ Écris un nombre !';
        feedbackElement.className = 'feedback incorrect';
        return;
    }

    // Désactiver l'input
    answerInput.disabled = true;

    questionCount++;
    
    if (userAnswer === currentQuestion.answer) {
        score++;
        feedbackElement.textContent = '✅ Bravo ! C\'est correct !';
        feedbackElement.className = 'feedback correct';
    } else {
        feedbackElement.textContent = `❌ Oups ! La réponse était ${currentQuestion.answer}`;
        feedbackElement.className = 'feedback incorrect';
        // Enregistrer l'erreur
        mistakesList.push(JSON.parse(JSON.stringify(currentQuestion)));
    }

    // Mettre à jour le score
    scoreElement.textContent = score;
    updateProgressBar();

    // Si on a atteint 10 questions, afficher l'écran de fin
    if (questionCount >= MAX_QUESTIONS) {
        setTimeout(showEndScreen, 1500);
    } else {
        // Générer une nouvelle question après 1.5 secondes
        setTimeout(generateQuestion, 1500);
    }
}

function updateProgressBar() {
    const percentage = (questionCount / MAX_QUESTIONS) * 100;
    progressFill.style.width = percentage + '%';
}

function showEndScreen() {
    showScreen(endScreen);
    
    finalScoreElement.textContent = score;
    
    if (score === 10) {
        endTitleElement.textContent = '🌟 Extraordinaire ! 🌟';
        endMessageElement.textContent = 'Tu es un champion des tables de multiplication !';
    } else if (score >= 8) {
        endTitleElement.textContent = '🎉 Très bien ! 🎉';
        endMessageElement.textContent = 'Beau travail ! Continue comme ça !';
    } else if (score >= 6) {
        endTitleElement.textContent = '👍 Pas mal ! 👍';
        endMessageElement.textContent = 'Tu progresses ! Encore un peu de pratique et ce sera parfait !';
    } else if (score >= 4) {
        endTitleElement.textContent = '💪 C\'est un début ! 💪';
        endMessageElement.textContent = 'Réessaye ! Tu vas t\'améliorer avec la pratique !';
    } else {
        endTitleElement.textContent = '🚀 Continue tes efforts ! 🚀';
        endMessageElement.textContent = 'N\'abandonne pas ! Chaque tentative te rend meilleur !';
    }
    
    // Afficher les erreurs et le bouton de retesting
    if (mistakesList.length > 0) {
        const errorText = mistakesList.map(err => 
            `${err.table} × ${err.number} = ${err.answer}`
        ).join('<br>');
        
        errorSummaryElement.innerHTML = `
            <p><strong>❌ Tes erreurs (${mistakesList.length}) :</strong></p>
            <p>${errorText}</p>
        `;
        retryErrorsBtn.style.display = 'block';
    } else {
        errorSummaryElement.innerHTML = '';
        retryErrorsBtn.style.display = 'none';
    }
}

function restartGame() {
    // Réinitialiser et retourner à l'écran de bienvenue
    score = 0;
    questionCount = 0;
    selectedTables = [];
    mistakesList = [];
    isRetryMode = false;
    
    // Décocher tous les checkboxes
    document.querySelectorAll('.table-selection input[type="checkbox"]').forEach(cb => {
        cb.checked = false;
    });
    
    showScreen(welcomeScreen);
}

function retryErrors() {
    // Vérifier qu'il y a des erreurs
    if (mistakesList.length === 0) {
        alert('Pas d\'erreurs à refaire !');
        return;
    }

    // Passer en mode retrying
    isRetryMode = true;
    retryQuestionIndex = 0;
    
    // Réinitialiser le score de retesting
    scoreElement.textContent = '0';
    
    // Afficher l'écran de retesting
    showScreen(retryScreen);
    
    // Afficher les infos
    document.getElementById('retry-total').textContent = mistakesList.length;
    
    // Générer la première question de retesting
    generateRetryQuestion();
}

function generateRetryQuestion() {
    if (retryQuestionIndex >= mistakesList.length) {
        showRetryEndScreen();
        return;
    }

    currentQuestion = mistakesList[retryQuestionIndex];
    retryQuestionElement.textContent = `${currentQuestion.table} × ${currentQuestion.number} = ?`;
    
    // Réinitialiser le feedback et l'input
    retryFeedbackElement.textContent = '';
    retryFeedbackElement.className = 'feedback';
    retryAnswerInput.value = '';
    retryAnswerInput.disabled = false;
    retryAnswerInput.focus();
}

function checkRetryAnswer() {
    const userAnswer = parseInt(retryAnswerInput.value);
    
    if (isNaN(userAnswer)) {
        retryFeedbackElement.textContent = '⚠️ Écris un nombre !';
        retryFeedbackElement.className = 'feedback incorrect';
        return;
    }

    // Désactiver l'input
    retryAnswerInput.disabled = true;

    if (userAnswer === currentQuestion.answer) {
        score++;
        retryFeedbackElement.textContent = '✅ Bravo ! C\'est correct cette fois !';
        retryFeedbackElement.className = 'feedback correct';
    } else {
        retryFeedbackElement.textContent = `❌ Oups ! La réponse était ${currentQuestion.answer}`;
        retryFeedbackElement.className = 'feedback incorrect';
    }

    // Mettre à jour le score
    retryScoreElement.textContent = score;
    
    // Mettre à jour la barre de progression
    retryQuestionIndex++;
    const percentage = (retryQuestionIndex / mistakesList.length) * 100;
    retryProgressFill.style.width = percentage + '%';

    // Générer la question suivante après 1.5 secondes
    setTimeout(generateRetryQuestion, 1500);
}

function showRetryEndScreen() {
    showScreen(endScreen);
    
    finalScoreElement.textContent = score;
    endTitleElement.textContent = '🎯 Retesting Terminé ! 🎯';
    
    if (score === mistakesList.length) {
        endMessageElement.textContent = '🌟 Parfait ! Tu as corrigé toutes tes erreurs !';
    } else if (score >= mistakesList.length * 0.8) {
        endMessageElement.textContent = '✨ Très bon ! Tu as fait de gros progrès !';
    } else {
        endMessageElement.textContent = '💪 Continue à t\'entraîner, tu vas y arriver !';
    }
    
    errorSummaryElement.innerHTML = '';
    retryErrorsBtn.style.display = 'none';
}

function showScreen(screen) {
    // Masquer tous les écrans
    document.querySelectorAll('.screen').forEach(s => {
        s.classList.remove('active');
    });
    
    // Afficher l'écran voulu
    screen.classList.add('active');
}

// Initialiser l'application
console.log('✅ Application prête !');
