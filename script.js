(() => {
    "use strict";

    // =========================================================================
    // 1. QUICK CONFIGURATION (EDIT TIMER DURATION HERE)
    // =========================================================================
    const STAGE_DURATION_MS = 210 * 1000; // 210 seconds = 3 minutes 30 seconds
    const STATE_KEY = "hackoverse_mindmaze_state";

    // =========================================================================
    // 2. QUESTION DATABASE (9 STAGES TOTAL)
    //
    // HOW TO EDIT:
    // - Answer matching is CASE-INSENSITIVE (e.g., "mars" === "Mars").
    // - You can give ONE answer as a string:    answer: "Mars"
    // - Or MULTIPLE accepted answers as a list: answer: ["New Delhi", "Delhi"]
    // - You can add/remove stages anytime; the counter updates automatically.
    // =========================================================================
    const stages = [

        // ---------------------------------------------------------------------
        // STAGE 1 | GENERAL KNOWLEDGE - PAGE 1 (3 Questions)
        // ---------------------------------------------------------------------
        {
            type: "gk",
            title: "GENERAL KNOWLEDGE - PAGE 1",
            questions: [
                {
                    question: "A. What is the capital of India?",       // <-- EDIT QUESTION 1A
                    answer: ["New Delhi", "Delhi"]                      // <-- EDIT ANSWER 1A
                },
                {
                    question: "B. What is the national animal of India?", // <-- EDIT QUESTION 1B
                    answer: ["Tiger", "Bengal Tiger"]                     // <-- EDIT ANSWER 1B
                },
                {
                    question: "C. Who wrote India's national anthem?",  // <-- EDIT QUESTION 1C
                    answer: "Rabindranath Tagore"                       // <-- EDIT ANSWER 1C
                }
            ],
            riddle: "Not every entrance is in the front.",              // <-- EDIT RIDDLE 1
            coordinatorPassword: "4567"                                  // <-- EDIT PASSWORD 1
        },

        // ---------------------------------------------------------------------
        // STAGE 2 | GENERAL KNOWLEDGE - PAGE 2 (3 Questions)
        // ---------------------------------------------------------------------
        {
            type: "gk",
            title: "GENERAL KNOWLEDGE - PAGE 2",
            questions: [
                {
                    question: "A. Which planet is known as the Red Planet?", // <-- EDIT QUESTION 2A
                    answer: "Mars"                                           // <-- EDIT ANSWER 2A
                },
                {
                    question: "B. At what temperature does water boil in Celsius at standard atmospheric pressure?", // <-- EDIT QUESTION 2B
                    answer: ["100", "100c", "100 c", "100°c", "100 °c"]                                              // <-- EDIT ANSWER 2B
                },
                {
                    question: "C. Which part of a plant mainly performs photosynthesis?", // <-- EDIT QUESTION 2C
                    answer: ["Leaves", "Leaf"]                                            // <-- EDIT ANSWER 2C
                }
            ],
            riddle: "Where greetings begin and journeys start.",        // <-- EDIT RIDDLE 2
            coordinatorPassword: "7890"                                  // <-- EDIT PASSWORD 2
        },

        // ---------------------------------------------------------------------
        // STAGE 3 | GENERAL KNOWLEDGE - PAGE 3 (3 Questions)
        // ---------------------------------------------------------------------
        {
            type: "gk",
            title: "GENERAL KNOWLEDGE - PAGE 3",
            questions: [
                {
                    question: "A. Which is the largest planet in our solar system?", // <-- EDIT QUESTION 3A
                    answer: "Jupiter"                                                // <-- EDIT ANSWER 3A
                },
                {
                    question: "B. How many days are there in a week?",  // <-- EDIT QUESTION 3B
                    answer: ["7", "Seven"]                              // <-- EDIT ANSWER 3B
                },
                {
                    question: "C. Which is the largest ocean in the world?", // <-- EDIT QUESTION 3C
                    answer: ["Pacific Ocean", "Pacific"]                     // <-- EDIT ANSWER 3C
                }
            ],
            riddle: "Where clothes come out fresh and clean.",          // <-- EDIT RIDDLE 3
            coordinatorPassword: "7865"                                  // <-- EDIT PASSWORD 3
        },

        // ---------------------------------------------------------------------
        // STAGE 4 | GENERAL KNOWLEDGE - PAGE 4 (3 Questions)
        // ---------------------------------------------------------------------
        {
            type: "gk",
            title: "GENERAL KNOWLEDGE - PAGE 4",
            questions: [
                {
                    question: "A. What is the brain of a computer called?", // <-- EDIT QUESTION 4A
                    answer: ["CPU", "Central Processing Unit"]              // <-- EDIT ANSWER 4A
                },
                {
                    question: "B. What does HTML stand for?",                             // <-- EDIT QUESTION 4B
                    answer: ["HyperText Markup Language", "Hyper Text Markup Language"]   // <-- EDIT ANSWER 4B
                },
                {
                    question: "C. Which device is commonly used to type text into a computer?", // <-- EDIT QUESTION 4C
                    answer: "Keyboard"                                                          // <-- EDIT ANSWER 4C
                }
            ],
            riddle: "Where students rest after a long day.",            // <-- EDIT RIDDLE 4
            coordinatorPassword: "5678"                                  // <-- EDIT PASSWORD 4
        },

        // ---------------------------------------------------------------------
        // STAGE 5 | GENERAL KNOWLEDGE - PAGE 5 (Single Question)
        // ---------------------------------------------------------------------
        {
            type: "gk",
            title: "GENERAL KNOWLEDGE - PAGE 5",
            question: "Which is the hardest natural substance on Earth?", // <-- EDIT QUESTION 5
            answer: ["Diamond", "Diamonds"],                              // <-- EDIT ANSWER 5
            riddle: "Where players run, shout, and play games.",          // <-- EDIT RIDDLE 5
            coordinatorPassword: "8975"                                    // <-- EDIT PASSWORD 5
        },

        // ---------------------------------------------------------------------
        // STAGE 6 | GENERAL LOGIC - QUESTION 1
        // ---------------------------------------------------------------------
        {
            type: "logic",
            title: "GENERAL LOGIC - QUESTION 1",
            question: "I am an odd number. Remove one letter and I become even. What number am I?", // <-- EDIT QUESTION 6
            answer: ["seven", "7"],                                                                 // <-- EDIT ANSWER 6
            riddle: "Where classes, laughter, and learning meet.",                                  // <-- EDIT RIDDLE 6
            coordinatorPassword: "7854"                                                              // <-- EDIT PASSWORD 6
        },

        // ---------------------------------------------------------------------
        // STAGE 7 | PROGRAMMING OUTPUT - QUESTION 1
        // ---------------------------------------------------------------------
        {
            type: "programming",
            title: "PROGRAMMING OUTPUT - QUESTION 1",
            // <-- EDIT CODE 7
            code: `age = 20

if age >= 18:
    print("You are eligible to vote.")
else:
    print("You are not eligible to vote.")`,
            answer: ["You are eligible to vote.", "You are eligible to vote"], // <-- EDIT EXPECTED OUTPUT 7
            riddle: "Where food gives energy for the next challenge.",         // <-- EDIT RIDDLE 7
            coordinatorPassword: "7896"                                         // <-- EDIT PASSWORD 7
        },

        // ---------------------------------------------------------------------
        // STAGE 8 | PROGRAMMING OUTPUT - QUESTION 2
        // ---------------------------------------------------------------------
        {
            type: "programming",
            title: "PROGRAMMING OUTPUT - QUESTION 2",
            // <-- EDIT CODE 8
            code: `x = 10
y = 5

print(x + y)
print(x * y)`,
            answer: "15\n50",                                           // <-- EDIT EXPECTED OUTPUT 8
            riddle: "Look for the place where knowledge is kept.",      // <-- EDIT RIDDLE 8
            coordinatorPassword: "3456"                                  // <-- EDIT PASSWORD 8
        },

        // ---------------------------------------------------------------------
        // STAGE 9 | PROGRAMMING OUTPUT - QUESTION 3
        // ---------------------------------------------------------------------
        {
            type: "programming",
            title: "PROGRAMMING OUTPUT - QUESTION 3",
            // <-- EDIT CODE 9
            code: `for i in range(1, 4):
    print(i * 2)`,
            answer: "2\n4\n6",                                                           // <-- EDIT EXPECTED OUTPUT 9
            riddle: "Find the place where everyone gathers for the final challenge.",    // <-- EDIT RIDDLE 9
            coordinatorPassword: "5678"                                                   // <-- EDIT PASSWORD 9
        }

    ];

    const TOTAL_STAGES = stages.length;

    // =========================================================================
    // 3. DOM ELEMENTS
    // =========================================================================
    const gameScreen = document.getElementById("gameScreen");
    const endScreen = document.getElementById("endScreen");
    const endMessage = document.getElementById("endMessage");

    const playerDisplay = document.getElementById("playerDisplay");
    const timerDisplay = document.getElementById("timer");
    const codeProblem = document.getElementById("codeProblem");
    const participantCode = document.getElementById("participantCode");
    const runBtn = document.getElementById("runBtn");

    const outputBox = document.getElementById("outputBox");
    const outputDisplay = document.getElementById("outputDisplay");

    const lockContainer = document.getElementById("lockContainer");
    const coordinatorBtn = document.getElementById("coordinatorBtn");
    const solvedCountDisplay = document.getElementById("solvedCount");

    // =========================================================================
    // 4. SAFE STORAGE HELPERS (NO CRASHES IN STRICT PRIVATE/INCOGNITO MODE)
    // =========================================================================
    function safeGet(storage, key) {
        try { return storage.getItem(key); } catch { return null; }
    }
    function safeSet(storage, key, val) {
        try { storage.setItem(key, val); } catch { /* ignore */ }
    }
    function safeRemove(storage, key) {
        try { storage.removeItem(key); } catch { /* ignore */ }
    }

    // =========================================================================
    // 5. PLAYER INITIALIZATION
    // =========================================================================
    const playerName = (safeGet(localStorage, "playerName") || "Player").trim() || "Player";
    playerDisplay.textContent = `Welcome, ${playerName}`;
    gameScreen.classList.remove("hidden");

    // =========================================================================
    // 6. ANTI-COPY & ANTI-PASTE PROTECTION (DESKTOP + MOBILE)
    // =========================================================================
    (function enableAntiCopyPaste() {
        const blockEvent = (e) => {
            e.preventDefault();
            return false;
        };

        // Block copy, cut, paste, drag-drop, and right-click menu globally
        ["copy", "cut", "paste", "drop", "dragstart", "contextmenu"].forEach((evt) => {
            document.addEventListener(evt, blockEvent, true);
        });

        // Block mobile clipboard bar pastes (e.g., Gboard / Samsung Keyboard clipboard)
        document.addEventListener("beforeinput", (e) => {
            if (
                e.inputType === "insertFromPaste" ||
                e.inputType === "insertFromPasteAsQuotation" ||
                e.inputType === "insertFromDrop"
            ) {
                e.preventDefault();
            }
        }, true);

        // Block keyboard shortcuts: Ctrl/Cmd + C, V, X, A, U, S and Shift+Insert
        document.addEventListener("keydown", (e) => {
            const key = e.key.toLowerCase();
            if ((e.ctrlKey || e.metaKey) && ["c", "v", "x", "a", "u", "s"].includes(key)) {
                e.preventDefault();
            }
            if (e.shiftKey && e.key === "Insert") {
                e.preventDefault();
            }
        }, true);
    })();

    // =========================================================================
    // 7. DYNAMIC GK INPUT CONTAINER
    // =========================================================================
    const answerFields = document.createElement("div");
    answerFields.id = "answerFields";
    answerFields.style.cssText = "display:none;grid-template-columns:1fr;gap:12px;margin:15px 0;text-align:left;";
    participantCode.parentNode.insertBefore(answerFields, participantCode);

    // =========================================================================
    // 8. MASKED VOLUNTEER PASSWORD MODAL
    // =========================================================================
    const modalOverlay = document.createElement("div");
    modalOverlay.style.cssText = "display:none;position:fixed;inset:0;background:rgba(0,0,0,0.85);z-index:9999;justify-content:center;align-items:center;padding:16px;";
    modalOverlay.innerHTML = `
        <div style="background:#111;border:2px solid #FF3366;border-radius:12px;padding:24px;width:100%;max-width:340px;text-align:center;box-shadow:0 0 25px rgba(255,51,102,0.5);">
            <h3 style="margin:0 0 12px;color:#FF3366;">Coordinator Unlock</h3>
            <input type="password" id="coordPassInput" placeholder="Enter Password" autocomplete="off"
                style="width:100%;box-sizing:border-box;padding:12px;background:#000;color:#39FF14;border:1px solid #FF3366;border-radius:6px;font-size:1rem;text-align:center;" />
            <div id="coordError" style="color:#FF3366;font-size:0.85rem;min-height:20px;margin-top:8px;"></div>
            <div style="display:flex;gap:10px;justify-content:center;margin-top:8px;">
                <button type="button" id="coordCancelBtn" style="margin-top:0;padding:10px 20px;background:#222;color:#EAEAEA;border-color:#555;box-shadow:none;">Cancel</button>
                <button type="button" id="coordSubmitBtn" style="margin-top:0;padding:10px 20px;">Unlock</button>
            </div>
        </div>
    `;
    document.body.appendChild(modalOverlay);

    const coordPassInput = modalOverlay.querySelector("#coordPassInput");
    const coordError = modalOverlay.querySelector("#coordError");
    const coordCancelBtn = modalOverlay.querySelector("#coordCancelBtn");
    const coordSubmitBtn = modalOverlay.querySelector("#coordSubmitBtn");

    function openPasswordModal() {
        coordPassInput.value = "";
        coordError.textContent = "";
        modalOverlay.style.display = "flex";
        coordPassInput.focus();
    }

    function closePasswordModal() {
        modalOverlay.style.display = "none";
        coordPassInput.value = "";
        coordError.textContent = "";
    }

    // =========================================================================
    // 9. GAME STATE & SESSION PERSISTENCE
    // =========================================================================
    let stageOrder = [];
    let currentStage = 0;
    let solvedCount = 0;
    let isStageSolved = false;
    let stageEndTime = 0;
    let remainingMsWhenSolved = STAGE_DURATION_MS;
    let timerId = null;

    // Fisher-Yates shuffle so every player gets a unique randomized order
    function createShuffledOrder() {
        const order = Array.from({ length: TOTAL_STAGES }, (_, i) => i);
        for (let i = order.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [order[i], order[j]] = [order[j], order[i]];
        }
        return order;
    }

    function saveState() {
        safeSet(sessionStorage, STATE_KEY, JSON.stringify({
            playerName,
            stageOrder,
            currentStage,
            solvedCount,
            isStageSolved,
            stageEndTime,
            remainingMsWhenSolved
        }));
    }

    function initGameState() {
        const raw = safeGet(sessionStorage, STATE_KEY);
        if (raw) {
            try {
                const saved = JSON.parse(raw);
                if (
                    saved.playerName === playerName &&
                    Array.isArray(saved.stageOrder) &&
                    saved.stageOrder.length === TOTAL_STAGES &&
                    saved.currentStage >= 0 &&
                    saved.currentStage < TOTAL_STAGES
                ) {
                    stageOrder = saved.stageOrder;
                    currentStage = saved.currentStage;
                    solvedCount = saved.solvedCount;
                    isStageSolved = Boolean(saved.isStageSolved);
                    stageEndTime = saved.stageEndTime;
                    remainingMsWhenSolved = typeof saved.remainingMsWhenSolved === "number"
                        ? saved.remainingMsWhenSolved
                        : STAGE_DURATION_MS;
                    return;
                }
            } catch { /* fall through to start fresh */ }
        }

        stageOrder = createShuffledOrder();
        currentStage = 0;
        solvedCount = 0;
        isStageSolved = false;
        stageEndTime = Date.now() + STAGE_DURATION_MS;
        remainingMsWhenSolved = STAGE_DURATION_MS;
        saveState();
    }

    function getCurrentStageData() {
        return stages[stageOrder[currentStage]];
    }

    // =========================================================================
    // 10. ANSWER VALIDATION
    // =========================================================================
    function normalizeAnswer(val) {
        return String(val)
            .trim()
            .replace(/\s+/g, " ")
            .toLowerCase();
    }

    function isAnswerMatch(userInput, expected) {
        const cleaned = normalizeAnswer(userInput);
        if (!cleaned) return false;

        if (Array.isArray(expected)) {
            return expected.some((ans) => normalizeAnswer(ans) === cleaned);
        }
        return cleaned === normalizeAnswer(expected);
    }

    // =========================================================================
    // 11. FEEDBACK & UI HELPERS
    // =========================================================================
    function clearFeedback(force = false) {
        if (isStageSolved && !force) return;
        outputBox.classList.add("hidden");
        outputBox.classList.remove("correct", "incorrect");
        outputDisplay.textContent = "";
    }

    function scrollToOutput() {
        outputBox.scrollIntoView({ behavior: "smooth", block: "center" });
    }

    function showIncorrectFeedback(message) {
        outputBox.classList.remove("hidden", "correct", "incorrect");
        void outputBox.offsetWidth; // Retrigger pulse animation
        outputBox.classList.add("incorrect");
        outputDisplay.textContent = message;
        scrollToOutput();
    }

    function setInputsDisabled(disabled) {
        runBtn.disabled = disabled;
        participantCode.disabled = disabled;
        const gkInputs = answerFields.querySelectorAll("input");
        for (let i = 0; i < gkInputs.length; i++) {
            gkInputs[i].disabled = disabled;
        }
    }

    // =========================================================================
    // 12. RENDER CURRENT STAGE
    // =========================================================================
    function showStage() {
        const stage = getCurrentStageData();

        // Always reset solved state & hide lock BEFORE clearing feedback
        // so the previous stage's riddle never stays on the next question
        isStageSolved = false;
        lockContainer.classList.add("hidden");
        clearFeedback(true);

        answerFields.innerHTML = "";
        answerFields.style.display = "none";

        participantCode.value = "";
        participantCode.disabled = false;
        runBtn.disabled = false;

        solvedCountDisplay.textContent = `${solvedCount}/${TOTAL_STAGES}`;

        // Multi-question GK page
        if (stage.type === "gk" && Array.isArray(stage.questions)) {
            const count = stage.questions.length;
            codeProblem.textContent =
                `${stage.title}\n\nAnswer all ${count} questions correctly:\n\n` +
                stage.questions.map((q) => q.question).join("\n\n");

            participantCode.style.display = "none";
            answerFields.style.display = "grid";

            const fragment = document.createDocumentFragment();
            stage.questions.forEach((_, index) => {
                const letter = String.fromCharCode(65 + index);

                const label = document.createElement("label");
                label.htmlFor = `gkAnswer${index}`;
                label.textContent = `Answer ${letter}:`;
                label.style.cssText = "color:#FF3366;font-weight:bold;";

                const input = document.createElement("input");
                input.type = "text";
                input.id = `gkAnswer${index}`;
                input.placeholder = `Enter answer ${letter}`;
                input.autocomplete = "off";
                input.spellcheck = false;
                input.autocorrect = "off";
                input.autocapitalize = "off";
                input.style.cssText = "width:100%;max-width:100%;box-sizing:border-box;text-align:left;";

                fragment.appendChild(label);
                fragment.appendChild(input);
            });
            answerFields.appendChild(fragment);
        }
        // Single-question GK or Logic page
        else if (stage.type === "gk" || stage.type === "logic") {
            codeProblem.textContent = `${stage.title}\n\n${stage.question}`;
            participantCode.style.display = "block";
            participantCode.placeholder = "Enter your answer here";
        }
        // Programming Output page
        else if (stage.type === "programming") {
            codeProblem.textContent =
                `${stage.title}\n\nPredict the output of this program:\n\n${stage.code}\n\nEnter ONLY the correct output below.`;
            participantCode.style.display = "block";
            participantCode.placeholder = "Type the correct program output here";
        }
    }

    // =========================================================================
    // 13. REVEAL RIDDLE
    // =========================================================================
    function revealRiddle(isRestoring = false) {
        if (!isRestoring) {
            remainingMsWhenSolved = Math.max(0, stageEndTime - Date.now());
        }
        isStageSolved = true;
        stopTimer();
        setInputsDisabled(true);

        timerDisplay.textContent = formatTime(Math.ceil(remainingMsWhenSolved / 1000));

        const stage = getCurrentStageData();
        outputBox.classList.remove("hidden", "incorrect");
        outputBox.classList.add("correct");
        outputDisplay.textContent = stage.riddle;
        lockContainer.classList.remove("hidden");

        saveState();

        if (!isRestoring) {
            scrollToOutput();
        }
    }

    // =========================================================================
    // 14. ACCURATE TIMESTAMP TIMER
    // =========================================================================
    function formatTime(sec) {
        const clamped = Math.max(0, sec);
        const m = String(Math.floor(clamped / 60)).padStart(2, "0");
        const s = String(clamped % 60).padStart(2, "0");
        return `${m}:${s}`;
    }

    function stopTimer() {
        if (timerId !== null) {
            clearInterval(timerId);
            timerId = null;
        }
    }

    function updateTimerTick() {
        if (isStageSolved) return;
        const remainingSec = Math.ceil((stageEndTime - Date.now()) / 1000);
        timerDisplay.textContent = formatTime(remainingSec);

        if (remainingSec <= 0) {
            stopTimer();
            endGame(false);
        }
    }

    function startTimer(resetDuration = true) {
        stopTimer();
        if (resetDuration) {
            stageEndTime = Date.now() + STAGE_DURATION_MS;
            remainingMsWhenSolved = STAGE_DURATION_MS;
            saveState();
        }
        updateTimerTick();
        timerId = setInterval(updateTimerTick, 500);
    }

    // Snap timer immediately when player wakes phone or switches back to tab
    document.addEventListener("visibilitychange", () => {
        if (!document.hidden && !isStageSolved && timerId !== null) {
            updateTimerTick();
        }
    });

    // =========================================================================
    // 15. RUN / CHECK ANSWER HANDLER
    // =========================================================================
    function checkCurrentAnswer() {
        if (isStageSolved) return;

        const stage = getCurrentStageData();
        clearFeedback(false);

        if (stage.type === "gk" && Array.isArray(stage.questions)) {
            let allCorrect = true;
            const feedback = [];

            stage.questions.forEach((q, index) => {
                const input = document.getElementById(`gkAnswer${index}`);
                const letter = String.fromCharCode(65 + index);
                if (input && isAnswerMatch(input.value, q.answer)) {
                    feedback.push(`${letter}: CORRECT`);
                } else {
                    allCorrect = false;
                    feedback.push(`${letter}: INCORRECT - Try again!`);
                }
            });

            if (allCorrect) {
                revealRiddle(false);
            } else {
                showIncorrectFeedback(
                    `${feedback.join("\n")}\n\nCorrect all ${stage.questions.length} answers to reveal the riddle.`
                );
            }
        } else if (stage.type === "gk" || stage.type === "logic") {
            if (isAnswerMatch(participantCode.value, stage.answer)) {
                revealRiddle(false);
            } else {
                showIncorrectFeedback("Incorrect answer! Try again.");
            }
        } else if (stage.type === "programming") {
            if (isAnswerMatch(participantCode.value, stage.answer)) {
                revealRiddle(false);
            } else {
                showIncorrectFeedback("Incorrect output! Predict again and try.");
            }
        }
    }

    // Clear error feedback immediately when player edits their input
    participantCode.addEventListener("input", () => clearFeedback(false));
    answerFields.addEventListener("input", () => clearFeedback(false));

    // Smooth Enter-key navigation across GK input fields
    answerFields.addEventListener("keydown", (e) => {
        if (e.key !== "Enter") return;
        e.preventDefault();
        const inputs = Array.from(answerFields.querySelectorAll("input"));
        const idx = inputs.indexOf(e.target);
        if (idx > -1 && idx < inputs.length - 1) {
            inputs[idx + 1].focus();
        } else {
            checkCurrentAnswer();
        }
    });

    runBtn.addEventListener("click", checkCurrentAnswer);

    // =========================================================================
    // 16. VOLUNTEER / COORDINATOR UNLOCK FLOW
    // =========================================================================
    coordinatorBtn.addEventListener("click", () => {
        if (!isStageSolved) return;
        openPasswordModal();
    });

    function verifyCoordinatorPassword() {
        const stage = getCurrentStageData();
        const entered = coordPassInput.value.trim();

        if (entered === String(stage.coordinatorPassword).trim()) {
            closePasswordModal();
            solvedCount++;
            currentStage++;
            stopTimer();

            if (currentStage >= TOTAL_STAGES) {
                endGame(true);
            } else {
                showStage();
                startTimer(true);
            }
        } else {
            coordError.textContent = "Wrong Password! Please try again.";
            coordPassInput.value = "";
            coordPassInput.focus();
        }
    }

    coordSubmitBtn.addEventListener("click", verifyCoordinatorPassword);
    coordCancelBtn.addEventListener("click", closePasswordModal);
    modalOverlay.addEventListener("click", (e) => {
        if (e.target === modalOverlay) closePasswordModal();
    });
    coordPassInput.addEventListener("keydown", (e) => {
        if (e.key === "Enter") verifyCoordinatorPassword();
        if (e.key === "Escape") closePasswordModal();
    });

    // =========================================================================
    // 17. END GAME SCREEN
    // =========================================================================
    function endGame(win) {
        stopTimer();
        closePasswordModal();
        safeRemove(sessionStorage, STATE_KEY);

        gameScreen.classList.add("hidden");
        endScreen.classList.remove("hidden");
        endMessage.textContent = win
            ? `Congratulations, ${playerName}! You solved all ${TOTAL_STAGES} questions!`
            : "Time's up! Thank you for participating!";
    }

    // =========================================================================
    // 18. START / RESUME GAME
    // =========================================================================
    initGameState();
    const restoredSolved = isStageSolved;
    showStage();

    if (restoredSolved) {
        revealRiddle(true);
    } else {
        startTimer(false);
    }
})();
