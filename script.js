// Variables globales
let selectedTables = [];
let currentQuestion = null;
let score = 0;
let questionCount = 0;
const MAX_QUESTIONS = 10;

// Éléments du DOM
const welcomeScreen = document.getElementById('welcome-screen');
const gameScreen = document.getElementById('game-screen');
const endScreen = document.getElementById('end-screen');
const startBtn = document.getElementById('start-btn');
const submitBtn = document.getElementById('submit-btn');
const restartBtn = document.getElementById('restart-btn');
const answerInput = document.getElementById('answer-input');
const questionElement = document.getElementById('question');
const feedbackElement = document.getElementById('feedback');
const scoreElement = document.getElementById('score');
const finalScoreElement = document.getElementById('final-score');
const endTitleElement = document.getElementById('end-title');
const endMessageElement = document.getElementById('end-message');
const progressFill = document.getElementById('progress');

// Écouteurs d'événements
startBtn.addEventListener('click', startGame);
submitBtn.addEventListener('click', checkAnswer);
restartBtn.addEventListener('click', restartGame);
answerInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
        checkAnswer();
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
    answerInput.focus();
}

function checkAnswer() {
    const userAnswer = parseInt(answerInput.value);
    
    if (isNaN(userAnswer)) {
        feedbackElement.textContent = '⚠️ Écris un nombre !';
        feedbackElement.className = 'feedback incorrect';
        return;
    }

    questionCount++;
    
    if (userAnswer === currentQuestion.answer) {
        score++;
        feedbackElement.textContent = '✅ Bravo ! C\'est correct !';
        feedbackElement.className = 'feedback correct';
    } else {
        feedbackElement.textContent = `❌ Oups ! La réponse était ${currentQuestion.answer}`;
        feedbackElement.className = 'feedback incorrect';
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
}

function restartGame() {
    // Réinitialiser et retourner à l'écran de bienvenue
    score = 0;
    questionCount = 0;
    selectedTables = [];
    
    // Décocher tous les checkboxes
    document.querySelectorAll('.table-selection input[type="checkbox"]').forEach(cb => {
        cb.checked = false;
    });
    
    showScreen(welcomeScreen);
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
