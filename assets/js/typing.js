const questions = [
    'Let\'s play a game!',
    'The most similar word to "England" among [..., English language, Equatorial_Guinea, Eritrea, Ethiopia, Europe, Famine, Flute, Fossil, France, ...] is:',
    'The most similar word to "England" among [..., Czech Republic, Dark Ages, Democracy, Denmark, Dolphin, Dublin, Earth, England, Estonia, European Union, ...] is:',
    'You reached the end of the game!'
];
const answers = [
    'You have to reach "England" starting from "Africa".',
    'Europe',
    'England',
    'Well done!'
];

const debounceInterval = 1000;

let lastCall = 0;
let currentPair = 0;
let animating = false;
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
    animating = true;
    
    typeWriter(questions[currentPair], 'anim', () => {
        setTimeout(() => {
            typeWriter(answers[currentPair], 'anim', () => {
                currentPair = (currentPair + 1) % questions.length;
                showQuestionAnswerPair();
            });
        }, 1000);
    });
}

function stopAnimation() {
    const element = document.getElementById('anim');
    element.textContent = '';
    clearTimeout(animationFrameRequest);
    currentPair = 0;
    animating = false;
}

let observer = new IntersectionObserver((entries) => {
    let now = Date.now();
    if (now - lastCall < debounceInterval) {
        return;
    }    

    entries.every(entry => {
        if (!entry.isIntersecting && animating) {
            stopAnimation();
            return false;
        } else {
            showQuestionAnswerPair();
            return true;
        }
    });
}, { threshold: 0.0 });

window.onbeforeunload = function () {
    window.scrollTo(0, 0);
}

observer.observe(document.getElementById('intro'));
