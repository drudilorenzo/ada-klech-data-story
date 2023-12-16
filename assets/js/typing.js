const questions = [
    "Question 1?",
    "Question 2?",
    "Question 3?"
];
const answers = [
    "Answer 1.",
    "Answer 2.",
    "Answer 3!"
];

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
    console.log('Animation stopped');
    currentPair = 0;
    animating = false;
}

let observer = new IntersectionObserver((entries) => {
    entries.every(entry => {
        if (entry.isIntersecting && !animating) {
            showQuestionAnswerPair();
            return true;
        } else {
            stopAnimation();
            return false;
        }
    });
}, { threshold: 0.0 });

observer.observe(document.getElementById('intro'));
