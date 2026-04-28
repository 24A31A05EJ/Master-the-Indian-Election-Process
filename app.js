// Data
const timelineData = [
    { title: "Delimitation", desc: "Redrawing boundaries of constituencies based on population." },
    { title: "Electoral Rolls", desc: "Preparation and revision of voter lists to include all eligible citizens." },
    { title: "Announcement", desc: "ECI announces the election schedule and dates." },
    { title: "Notification", desc: "Formal calling of constituencies to elect representatives." },
    { title: "Nominations", desc: "Candidates file papers and deposit security amounts." },
    { title: "Scrutiny", desc: "Returning Officers verify candidate eligibility and papers." },
    { title: "Campaigning", desc: "Political parties reach out to voters (ends 48hrs before polling)." },
    { title: "Polling Day", desc: "Voters cast their votes using EVMs and VVPATs." },
    { title: "Counting", desc: "Votes are counted under strict supervision." },
    { title: "Results", desc: "Declaration of winners and formation of the house." }
];

const flashcardsData = [
    { front: "EVM", back: "Electronic Voting Machine used to record votes electronically since 1999." },
    { front: "VVPAT", back: "Voter Verifiable Paper Audit Trail - allows you to verify your vote was cast correctly." },
    { front: "NOTA", back: "None Of The Above - option to reject all candidates in your constituency." },
    { front: "Model Code of Conduct", back: "Guidelines for political parties to ensure fair elections." },
    { front: "Indelible Ink", back: "Purple ink applied to the finger to prevent double voting." },
    { front: "EPIC", back: "Electoral Photo Identity Card - your official voter ID." }
];

const quizQuestions = [
    { q: "What is the minimum age to vote in India?", a: ["16", "18", "21", "25"], c: 1 },
    { q: "Who appoints the Chief Election Commissioner?", a: ["Prime Minister", "President", "Chief Justice", "Parliament"], c: 1 },
    { q: "What is the full form of VVPAT?", a: ["Voter Verified Paper Audit Trail", "Voter Validated Paper Account Tool", "Visual Voter Paper Access Trail", "None"], c: 0 },
    { q: "How many Lok Sabha constituencies are there?", a: ["540", "543", "545", "550"], c: 1 },
    { q: "When was the first general election held in India?", a: ["1947", "1950", "1951-52", "1955"], c: 2 }
];

// State
let currentQuestionIndex = 0;
let score = 0;

// Initialization
document.addEventListener('DOMContentLoaded', () => {
    renderTimeline();
    renderFlashcards();
    renderQuiz();
});

function renderTimeline() {
    const container = document.getElementById('election-timeline');
    timelineData.forEach((item, index) => {
        const div = document.createElement('div');
        div.className = 'timeline-item';
        div.innerHTML = `
            <div class="timeline-dot"></div>
            <div class="timeline-content">
                <h3 style="color: var(--secondary); margin-bottom: 0.5rem;">${item.title}</h3>
                <p style="font-size: 0.9rem; color: var(--text-muted);">${item.desc}</p>
            </div>
        `;
        container.appendChild(div);
    });
}

function renderFlashcards() {
    const container = document.getElementById('flashcards-container');
    flashcardsData.forEach(item => {
        const div = document.createElement('div');
        div.className = 'flashcard';
        div.onclick = () => div.classList.toggle('flipped');
        div.innerHTML = `
            <div class="flashcard-inner">
                <div class="flashcard-front">
                    <h3 style="font-family: 'Outfit';">${item.front}</h3>
                    <p style="font-size: 0.8rem; margin-top: 1rem; color: var(--text-muted);">Tap to flip</p>
                </div>
                <div class="flashcard-back">
                    <p>${item.back}</p>
                </div>
            </div>
        `;
        container.appendChild(div);
    });
}

function renderQuiz() {
    const q = quizQuestions[currentQuestionIndex];
    document.getElementById('question-text').innerText = q.q;
    const optionsContainer = document.getElementById('options-container');
    optionsContainer.innerHTML = '';
    
    q.a.forEach((option, index) => {
        const btn = document.createElement('button');
        btn.className = 'quiz-option';
        btn.innerText = option;
        btn.onclick = () => handleAnswer(index, btn);
        optionsContainer.appendChild(btn);
    });
}

function handleAnswer(index, btn) {
    const q = quizQuestions[currentQuestionIndex];
    const options = document.querySelectorAll('.quiz-option');
    options.forEach(opt => opt.style.pointerEvents = 'none');

    if (index === q.c) {
        btn.classList.add('correct');
        score++;
    } else {
        btn.classList.add('wrong');
        options[q.c].classList.add('correct');
    }

    document.getElementById('score-text').innerText = `Score: ${score}`;
    document.getElementById('next-btn').style.display = 'block';
}

document.getElementById('next-btn').onclick = () => {
    currentQuestionIndex++;
    if (currentQuestionIndex < quizQuestions.length) {
        renderQuiz();
        document.getElementById('next-btn').style.display = 'none';
    } else {
        document.getElementById('quiz-content').innerHTML = `
            <div style="text-align: center; padding: 2rem;">
                <h2 style="color: var(--secondary);">Quiz Completed!</h2>
                <p style="font-size: 1.5rem; margin: 1rem 0;">Your Final Score: ${score} / ${quizQuestions.length}</p>
                <button class="btn btn-primary" onclick="location.reload()">Restart Quiz</button>
            </div>
        `;
    }
};

function addMessage(text, sender) {
    const chatWindow = document.getElementById('chat-window');
    const bubble = document.createElement('div');
    bubble.className = `chat-bubble ${sender}`;
    bubble.innerHTML = text;
    chatWindow.appendChild(bubble);
    chatWindow.scrollTop = chatWindow.scrollHeight;
}

function startChat(topic) {
    // Clear previous controls if needed, but here we just append messages
    const chatControls = document.getElementById('chat-controls');
    
    if (topic === 'registration') {
        addMessage("I want to know about Voter Registration.", "user");
        setTimeout(() => {
            addMessage("Excellent! To vote in India, you must first be registered. The primary way is through the <strong>Voter's Service Portal (voters.eci.gov.in)</strong>. You'll need to fill <strong>Form 6</strong> for a new registration.", "assistant");
            updateChatControls([
                { text: "What documents are needed?", action: "docs" },
                { text: "How long does it take?", action: "time" },
                { text: "Back to topics", action: "reset" }
            ]);
        }, 600);
    } else if (topic === 'docs') {
        addMessage("What documents are needed?", "user");
        setTimeout(() => {
            addMessage("You generally need three things:<br>1. <strong>Passport-sized photo</strong><br>2. <strong>Age proof</strong> (Aadhar, Birth Cert, etc.)<br>3. <strong>Address proof</strong> (Electricity bill, Aadhar, etc.)", "assistant");
            updateChatControls([
                { text: "What's the next step?", action: "roll" },
                { text: "Back to topics", action: "reset" }
            ]);
        }, 600);
    } else if (topic === 'roll') {
        addMessage("Tell me about the Electoral Roll.", "user");
        setTimeout(() => {
            addMessage("Even if you have a Voter ID, your name <strong>must</strong> be in the Electoral Roll for your specific constituency. You can check this online at the ECI website using your EPIC number.", "assistant");
            updateChatControls([
                { text: "Found it! How do I vote?", action: "polling" },
                { text: "Back to topics", action: "reset" }
            ]);
        }, 600);
    } else if (topic === 'polling') {
        addMessage("What happens on Polling Day?", "user");
        setTimeout(() => {
            addMessage("On voting day, go to your designated booth. There are 4 main steps:<br>1. First officer checks your ID against the roll.<br>2. Second officer marks your finger with <strong>indelible ink</strong>.<br>3. Third officer records your details.<br>4. You enter the booth to cast your vote on the EVM.", "assistant");
            updateChatControls([
                { text: "How to use the EVM?", action: "evm" },
                { text: "What is VVPAT?", action: "vvpat" },
                { text: "Back to topics", action: "reset" }
            ]);
        }, 600);
    } else if (topic === 'evm') {
        addMessage("How do I use the EVM?", "user");
        setTimeout(() => {
            addMessage("It's simple! Press the blue button next to the candidate/symbol of your choice. A red light will glow, and you'll hear a long beep. That's your vote cast!", "assistant");
            updateChatControls([
                { text: "Back to topics", action: "reset" }
            ]);
        }, 600);
    } else if (topic === 'results') {
        addMessage("How are results declared?", "user");
        setTimeout(() => {
            addMessage("After all phases of voting end, all EVMs are moved to strongrooms. On counting day, votes are counted under the supervision of the Returning Officer. The candidate with the highest votes in a constituency is declared the winner!", "assistant");
            updateChatControls([
                { text: "Back to topics", action: "reset" }
            ]);
        }, 600);
    } else if (topic === 'reset') {
        addMessage("I have more questions.", "user");
        setTimeout(() => {
            addMessage("Of course! What else would you like to explore?", "assistant");
            updateChatControls([
                { text: "Voter Registration", action: "registration" },
                { text: "Electoral Roll", action: "roll" },
                { text: "Voting Day Process", action: "polling" },
                { text: "Checking Results", action: "results" }
            ]);
        }, 600);
    }
}

function updateChatControls(options) {
    const chatControls = document.getElementById('chat-controls');
    chatControls.innerHTML = '';
    options.forEach(opt => {
        const btn = document.createElement('button');
        btn.className = 'btn btn-primary';
        btn.innerText = opt.text;
        btn.onclick = () => startChat(opt.action);
        chatControls.appendChild(btn);
    });
}

function scrollToSection(id) {
    document.getElementById(id).scrollIntoView({ behavior: 'smooth' });
}
