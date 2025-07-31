let userScore = 0;
let compScore = 0;
let click = 0;
const validChoices = ["rock", "paper", "scissors"];
let userChoices = [];
let compChoices = [];

const choices = document.querySelectorAll(".choice");
const msg = document.querySelector("#msg");

const userScorePara = document.querySelector("#user-score");
const compScorePara = document.querySelector("#comp-score");


const show2Choices = (userChoices, compChoices) => {
    document.querySelector("#minus-one").setAttribute("class", "visible");


    const userContainer = document.querySelector('.user');


    const userOriginals = ['rock', 'paper', 'scissors'];
    [...userContainer.children].forEach(child => {
        if (!userOriginals.includes(child.id)) {
            userContainer.removeChild(child);
        }
    });


    userOriginals.forEach(id => {
        const original = userContainer.querySelector(`#${id}`);
        if (original) {
            original.style.display = 'none';
        }
    });


    userChoices.forEach(choiceId => {
        const source = userContainer.querySelector(`#${choiceId}`);
        if (source) {
            const clone = source.cloneNode(true);
            clone.style.display = 'block';
            clone.id = choiceId;
            userContainer.appendChild(clone);
        }
    });


    const compContainer = document.querySelector('.comp');


    const originals = ['rock', 'paper', 'scissors'];
    [...compContainer.children].forEach(child => {
        if (!originals.includes(child.id)) {
            compContainer.removeChild(child);
        }
    });


    originals.forEach(id => {
        const original = compContainer.querySelector(`#${id}`);
        if (original) {
            original.style.display = 'none';
        }
    });


    compChoices.forEach(choiceId => {
        const source = compContainer.querySelector(`#${choiceId}`);
        if (source) {
            const clone = source.cloneNode(true);
            clone.style.display = 'block';
            clone.id = choiceId;
            compContainer.appendChild(clone);
        }
    });

    const message = document.createElement('p');
    message.textContent = 'Select an image to make it your final choice.';
    message.style.marginTop = '10px';
    message.style.fontWeight = 'bold';
    message.style.fontSize = '16px';
    userContainer.appendChild(message);

    enableFinalUserChoice();
}


// === Step 1: Enable final selection from user's two images ===
function enableFinalUserChoice() {
    const userContainer = document.querySelector('.user');
    const imageDivs = userContainer.querySelectorAll('div');

    imageDivs.forEach(div => {
        div.onclick = () => {
            const userFinalChoice = div.id;
            finalizeUserChoice(userFinalChoice);
        };
    });

}

// === Step 2: Finalize and compare choices ===
function finalizeUserChoice(userFinalChoice) {
    // Computer randomly picks its final choice
    const compFinalChoice = getRandomChoice(compChoices);

    // Step 3: Show final images by unhiding them
    showFinalChoice(userFinalChoice, compFinalChoice);

    // Step 4: Calculate and display result
    const resultText = decideWinner(userFinalChoice, compFinalChoice);
    displayResult(resultText);
}

// === Utility: Randomly pick from array ===
function getRandomChoice(choices) {
    const index = Math.floor(Math.random() * choices.length);
    return choices[index];
}

// === Step 3: Show final selected images by unhiding ===
function showFinalChoice(userFinal, compFinal) {
    document.querySelectorAll('.user-1 .user-choice-1').forEach(div => {
        div.style.visibility = 'hidden';
    });
    document.querySelectorAll('.comp-1 .comp-choice-1').forEach(div => {
        div.style.visibility = 'hidden';
    });

    document.querySelector('.user-1').classList.remove('hidden');
    document.querySelector('.comp-1').classList.remove('hidden');

    const userDiv = document.querySelector(`.user-1 #${userFinal}`);
    const compDiv = document.querySelector(`.comp-1 #${compFinal}`);
    if (userDiv) userDiv.style.visibility = 'visible';
    if (compDiv) compDiv.style.visibility = 'visible';

    const resultBox = document.getElementById('result-message');
    const resultData = getResultText(userFinal, compFinal);

    resultBox.className = 'result-message'; // Reset classes
    resultBox.classList.add('show');
    resultBox.classList.add(resultData.class); // Add win/lose/draw color
    resultBox.textContent = resultData.message;

    if (resultData.result === 'win') {
        userScore++;
    } else if (resultData.result === 'lose') {
        compScore++;
    }

    document.getElementById('user-score').textContent = userScore;
    document.getElementById('comp-score').textContent = compScore;
}

function getResultText(user, comp) {
    const emoji = {
        rock: '✊ Rock',
        paper: '✋ Paper',
        scissors: '✌️ Scissors'
    };

    if (user === comp) {
        return {
            message: `You both picked ${emoji[user]} — It's a Draw!`,
            class: 'result-draw',
            result: 'draw'
        };
    }

    const winConditions = {
        rock: 'scissors',
        paper: 'rock',
        scissors: 'paper'
    };

    if (winConditions[user] === comp) {
        return {
            message: `You picked ${emoji[user]}, Computer picked ${emoji[comp]} — You Win!`,
            class: 'result-win',
            result: 'win'
        };
    } else {
        return {
            message: `You picked ${emoji[user]}, Computer picked ${emoji[comp]} — Computer Wins!`,
            class: 'result-lose',
            result: 'lose'
        };
    }
}



// === Step 4: Decide winner ===
function decideWinner(user, comp) {
    if (user === comp) return "It's a draw!";
    if (
        (user === 'rock' && comp === 'scissors') ||
        (user === 'paper' && comp === 'rock') ||
        (user === 'scissors' && comp === 'paper')
    ) {
        return "You win!";
    }
    return "Computer wins!";
}

// === Step 5: Display result ===
function displayResult(resultText) {
    const resultDiv = document.querySelector('.result');
    if (resultDiv) {
        resultDiv.textContent = resultText;
        resultDiv.style.fontWeight = 'bold';
        resultDiv.style.marginTop = '1em';
    }
}




choices.forEach((choice) => {
    choice.addEventListener("click", () => {
        click++;
        if (click == 1) {
            const userChoice = choice.getAttribute("id");
            userChoices.push(userChoice);
        }
        if (click == 2) {
            const userChoice = choice.getAttribute("id");
            userChoices.push(userChoice);

            for (let i = 0; i < 2; i++) {
                const compChoice = validChoices[Math.floor(Math.random() * 3)];
                compChoices.push(compChoice);
            }

            show2Choices(userChoices, compChoices);

        }
    });
});



function resetForNextRound() {
    userChoices = [];
    compChoices = [];
    click = 0;

    // Hide result display areas
    const user1 = document.querySelector('.user-1');
    const comp1 = document.querySelector('.comp-1');
    if (user1) user1.classList.add('hidden');
    if (comp1) comp1.classList.add('hidden');

    // Hide all visible final choice images
    document.querySelectorAll('.user-1 .user-choice-1').forEach(div => {
        div.style.visibility = 'hidden';
    });
    document.querySelectorAll('.comp-1 .comp-choice-1').forEach(div => {
        div.style.visibility = 'hidden';
    });

    // Reset minus-one section
    const minusOne = document.getElementById('minus-one');
    if (minusOne) {
        minusOne.classList.remove('visible');
        minusOne.classList.add('hidden');
    }

    // Clear dynamically added choices in user section
    const userContainer = document.querySelector('.user');
    const baseIds = ['rock', 'paper', 'scissors'];

    [...userContainer.children].forEach(child => {
        if (!baseIds.includes(child.id)) {
            child.remove();  // Remove extra clones
        } else {
            child.style.display = 'none';  // Restore base choices
        }
    });

    // Remove instructional message
    const message = userContainer.querySelector('p');
    if (message) message.remove();

    // Clear dynamically added choices in comp section
    const compContainer = document.querySelector('.comp');

    [...compContainer.children].forEach(child => {
        if (!baseIds.includes(child.id)) {
            child.remove();  // Remove extra clones
        } else {
            child.style.display = 'none';  // Restore base choices
        }
    });

    // Clear result message (if present)
    const resultBox = document.getElementById('result-message');
    if (resultBox) {
        resultBox.textContent = '';
        resultBox.className = 'result-message';
    }

    const resultDiv = document.querySelector('.result');
    if (resultDiv) resultDiv.textContent = '';
}

function resetForNewGame() {
    resetForNextRound();

    userScore = 0;
    compScore = 0;

    document.getElementById('user-score').textContent = userScore;
    document.getElementById('comp-score').textContent = compScore;
}

document.getElementById("next-round").addEventListener("click", resetForNextRound);
document.getElementById("new-game").addEventListener("click", resetForNewGame);

 