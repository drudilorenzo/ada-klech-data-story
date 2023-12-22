const questions = [
    'Let\'s play a game!',
    'Prompt: The most similar word to "England" among the links in the "Africa" Wikipedia page is:',
    'Prompt: The most similar word to "England" among the links in the "England" Wikipedia page is:',
    'You reached the end of the game!'
];
const answers = [
    'Instruction: You have to reach "England" starting from "Africa".',
    'LLM: Europe',
    'LLM: England',
    'Well done!'
];


let currentPair = 0;
let animationFrameRequest; 

function typeWriter(text, elementId, callback) {
    let i = 0;
    const element = document.getElementById(elementId);
    element.textContent = '';
    
    function typing() {
        if (i < text.length) {
            element.textContent += text.charAt(i);
            i++;
            animationFrameRequest = setTimeout(typing, 100);
        } else if (callback) {
            animationFrameRequest = setTimeout(callback, 1000);
        }
    }
    
    typing();
}

function showQuestionAnswerPair() {    
    typeWriter(questions[currentPair], 'anim', () => {
        setTimeout(() => {
            typeWriter(answers[currentPair], 'anim', () => {
                currentPair = (currentPair + 1) % questions.length;
                showQuestionAnswerPair();
            });
        }, 1000);
    });
}

window.onbeforeunload = function () {
    window.scrollTo(0, 0);
}

showQuestionAnswerPair();
