(() => {
    "use strict";

    // =========================================================================
    // 1. QUICK CONFIGURATION (EDIT TIMER DURATION HERE)
    // =========================================================================
    const STAGE_DURATION_MS = 210 * 1000; // 210 seconds = 3 minutes 30 seconds
    const STATE_KEY = "hackoverse_mindmaze_state";

    // Coordinator password lockout (stops players guessing 4-digit passwords)
    const MAX_WRONG_ATTEMPTS = 3;          // wrong tries allowed...
    const LOCKOUT_MS = 30 * 1000;          // ...then Unlock is disabled for 30 seconds

    // Cheat code is stored as a SHA-256 HASH so nobody can read it from the code.
    // Current cheat code: #007
    // To change it, put the SHA-256 hash of your new code here
    // (search "sha256 online" and hash the exact text, e.g. "#007").
    const CHEAT_CODE_HASH = "9f6258911f9ea951cb3cd710dc2653fe45ed40a836a3165055e9038da2fead64";

    // =========================================================================
    // 2. QUESTION DATABASE (9 STAGES TOTAL)
    //
    // HOW TO EDIT:
    // - Answer matching is CASE-INSENSITIVE (e.g., "mars" === "Mars").
    // - You can give ONE answer as a string:    answer: "Mars"
    // - Or MULTIPLE accepted answers as a list: answer: ["New Delhi", "Delhi"]
    // - You can add/remove stages anytime; the counter updates automatically.
    //
    // COORDINATOR PASSWORDS ARE STORED AS SHA-256 HASHES (not plain text),
    // so players can't read them from the code. Real passwords are written
    // in the comment next to each hash. DELETE THOSE COMMENTS before you push
    // to GitHub (or keep your own private copy with the passwords).
    // To change a password: hash the new password with any SHA-256 tool
    // and paste the 64-character hash.
    //
    // ORDER: stages are shuffled for every player. A stage with
    // position: "last" always comes last (used for the final gathering riddle).
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
                    question: "A. What is the capital of India?",
                    answer: ["New Delhi", "Delhi"]
                },
                {
                    question: "B. What is the national animal of India?",
                    answer: ["Tiger", "Bengal Tiger", "Royal Bengal Tiger"]
                },
                {
                    question: "C. Who wrote India's national anthem?",
                    answer: ["Rabindranath Tagore", "Tagore", "R N Tagore", "R. N. Tagore", "Rabindra Nath Tagore"]
                }
            ],
            riddle: "Not every entrance is in the front.",
            coordinatorPasswordHash: "db2e7f1bd5ab9968ae76199b7cc74795ca7404d5a08d78567715ce532f9d2669" // 4567
        },

        // ---------------------------------------------------------------------
        // STAGE 2 | GENERAL KNOWLEDGE - PAGE 2 (3 Questions)
        // ---------------------------------------------------------------------
        {
            type: "gk",
            title: "GENERAL KNOWLEDGE - PAGE 2",
            questions: [
                {
                    question: "A. Which planet is known as the Red Planet?",
                    answer: "Mars"
                },
                {
                    question: "B. At what temperature does water boil in Celsius at standard atmospheric pressure?",
                    answer: [
                        "100", "100c", "100 c", "100°c", "100 °c",
                        "100 degree", "100 degrees", "100 degree c", "100 degrees c",
                        "100 degree celsius", "100 degrees celsius", "100 celsius", "hundred"
                    ]
                },
                {
                    question: "C. Which part of a plant mainly performs photosynthesis?",
                    answer: ["Leaves", "Leaf"]
                }
            ],
            riddle: "Where greetings begin and visitors arrive.",
            coordinatorPasswordHash: "6a95bbab63d587b596398c4bd7e91a132f24032d2007d107e5ea71967724b092" // 7890
        },

        // ---------------------------------------------------------------------
        // STAGE 3 | GENERAL KNOWLEDGE - PAGE 3 (3 Questions)
        // ---------------------------------------------------------------------
        {
            type: "gk",
            title: "GENERAL KNOWLEDGE - PAGE 3",
            questions: [
                {
                    question: "A. Which is the largest planet in our solar system?",
                    answer: "Jupiter"
                },
                {
                    question: "B. How many days are there in a week?",
                    answer: ["7", "Seven"]
                },
                {
                    question: "C. Which is the largest ocean in the world?",
                    answer: ["Pacific Ocean", "Pacific"]
                }
            ],
            riddle: "Where clothes come out fresh and clean.",
            coordinatorPasswordHash: "b9f24b9a4aba14556f8b8d0f1c3a47b569a7c2982cd28d6bc711624b69431fa1" // 7865
        },

        // ---------------------------------------------------------------------
        // STAGE 4 | GENERAL KNOWLEDGE - PAGE 4 (3 Questions)
        // ---------------------------------------------------------------------
        {
            type: "gk",
            title: "GENERAL KNOWLEDGE - PAGE 4",
            questions: [
                {
                    question: "A. What is the brain of a computer called?",
                    answer: ["CPU", "Central Processing Unit"]
                },
                {
                    question: "B. What does HTML stand for?",
                    answer: ["HyperText Markup Language", "Hyper Text Markup Language"]
                },
                {
                    question: "C. Which device is commonly used to type text into a computer?",
                    answer: ["Keyboard", "Keyboards"]
                }
            ],
            riddle: "Where students rest after a long day.",
            coordinatorPasswordHash: "4ca58879ca37e84160e833b875298e0b6b413cf9baab5e90a2bfe9f65d9bfa58" // 7632
        },

        // ---------------------------------------------------------------------
        // STAGE 5 | GENERAL KNOWLEDGE - PAGE 5 (Single Question)
        // ---------------------------------------------------------------------
        {
            type: "gk",
            title: "GENERAL KNOWLEDGE - PAGE 5",
            question: "Which is the hardest natural substance on Earth?",
            answer: ["Diamond", "Diamonds"],
            riddle: "Where players run, shout, and play games.",
            coordinatorPasswordHash: "5c29bb6d691728a1addd3820fd92b05748447525b8ba9518852512789ab7e7ab" // 8975
        },

        // ---------------------------------------------------------------------
        // STAGE 6 | GENERAL LOGIC - QUESTION 1
        // ---------------------------------------------------------------------
        {
            type: "logic",
            title: "GENERAL LOGIC - QUESTION 1",
            question: "I am an odd number. Remove one letter and I become even. What number am I?",
            answer: ["seven", "7"],
            riddle: "Where classes, laughter, and learning meet.",
            coordinatorPasswordHash: "cc1426618cb6931b719e39d5d1c5d88fc2139c8fac986824a40f2e5c169f86e2" // 7854
        },

        // ---------------------------------------------------------------------
        // STAGE 7 | PROGRAMMING OUTPUT - QUESTION 1
        // ---------------------------------------------------------------------
        {
            type: "programming",
            title: "PROGRAMMING OUTPUT - QUESTION 1",
            code: `age = 20

if age >= 18:
    print("You are eligible to vote.")
else:
    print("You are not eligible to vote.")`,
            answer: ["You are eligible to vote.", "You are eligible to vote"],
            riddle: "Where food gives energy for the next challenge.",
            coordinatorPasswordHash: "cad6ddf10c7f185baa569652306063313da25e747d9c7c2ce29f5b1d3bd216cb" // 7896
        },

        // ---------------------------------------------------------------------
        // STAGE 8 | PROGRAMMING OUTPUT - QUESTION 2
        // ---------------------------------------------------------------------
        {
            type: "programming",
            title: "PROGRAMMING OUTPUT - QUESTION 2",
            code: `x = 10
y = 5

print(x + y)
print(x * y)`,
            answer: ["15\n50", "15 50"],
            riddle: "Look for the place where knowledge is kept.",
            coordinatorPasswordHash: "ceaa28bba4caba687dc31b1bbe79eca3c70c33f871f1ce8f528cf9ab5cfd76dd" // 3456
        },

        // ---------------------------------------------------------------------
        // STAGE 9 | PROGRAMMING OUTPUT - QUESTION 3 (ALWAYS LAST)
        // ---------------------------------------------------------------------
        {
            type: "programming",
            title: "PROGRAMMING OUTPUT - QUESTION 3",
            code: `for i in range(1, 4):
    print(i * 2)`,
            answer: ["2\n4\n6", "2 4 6"],
            riddle: "Find the place where everyone gathers for the final challenge.",
            coordinatorPasswordHash: "f8638b979b2f4f793ddb6dbd197e0ee25a7a6ea32b0ae22f5e3c5d119d839e75", // 5678
            position: "last"
        }

    ];

    const TOTAL_STAGES = stages.length;

    // =========================================================================
    // 3. SAFE STORAGE HELPERS (NO CRASHES IN STRICT PRIVATE/INCOGNITO MODE)
    // =========================================================================
    function safeGet(storage, key) {
        try { return storage.getItem(key); } catch { return null; }
    }
    function safeSet(storage, key, val) {
        try { storage.setItem(key, val); } catch { /* ignore */ }
    }

    // =========================================================================
    // 4. REGISTRATION CHECK (main.html can't be played without registering)
    // =========================================================================
    const storedName = (safeGet(localStorage, "playerName") || "").trim();
    if (!storedName) {
        window.location.replace("index.html");
        return;
    }
    const playerName = storedName;

    // =========================================================================
    // 5. SHA-256 HELPER (built-in crypto, with a fallback for plain-HTTP testing)
    // =========================================================================
    function sha256Fallback(text) {
        const rightRotate = (v, n) => (v >>> n) | (v << (32 - n));
        const bytes = Array.from(new TextEncoder().encode(text));
        const bitLen = bytes.length * 8;

        const H = [];
        const K = [];
        const isComposite = {};
        for (let c = 2; K.length < 64; c++) {
            if (!isComposite[c]) {
                for (let i = c * c; i < 313; i += c) isComposite[i] = true;
                if (H.length < 8) H.push((Math.pow(c, 1 / 2) * 4294967296) | 0);
                K.push((Math.pow(c, 1 / 3) * 4294967296) | 0);
            }
        }

        bytes.push(0x80);
        while (bytes.length % 64 !== 56) bytes.push(0);
        for (let i = 7; i >= 0; i--) {
            bytes.push(i >= 4 ? 0 : (bitLen >>> (i * 8)) & 0xff);
        }

        for (let off = 0; off < bytes.length; off += 64) {
            const w = new Array(64);
            for (let i = 0; i < 16; i++) {
                w[i] = (bytes[off + i * 4] << 24) | (bytes[off + i * 4 + 1] << 16) |
                       (bytes[off + i * 4 + 2] << 8) | bytes[off + i * 4 + 3];
            }
            for (let i = 16; i < 64; i++) {
                const s0 = rightRotate(w[i - 15], 7) ^ rightRotate(w[i - 15], 18) ^ (w[i - 15] >>> 3);
                const s1 = rightRotate(w[i - 2], 17) ^ rightRotate(w[i - 2], 19) ^ (w[i - 2] >>> 10);
                w[i] = (w[i - 16] + s0 + w[i - 7] + s1) | 0;
            }
            let [a, b, c, d, e, f, g, h] = H;
            for (let i = 0; i < 64; i++) {
                const S1 = rightRotate(e, 6) ^ rightRotate(e, 11) ^ rightRotate(e, 25);
                const ch = (e & f) ^ (~e & g);
                const t1 = (h + S1 + ch + K[i] + w[i]) | 0;
                const S0 = rightRotate(a, 2) ^ rightRotate(a, 13) ^ rightRotate(a, 22);
                const maj = (a & b) ^ (a & c) ^ (b & c);
                const t2 = (S0 + maj) | 0;
                h = g; g = f; f = e; e = (d + t1) | 0;
                d = c; c = b; b = a; a = (t1 + t2) | 0;
            }
            H[0] = (H[0] + a) | 0; H[1] = (H[1] + b) | 0;
            H[2] = (H[2] + c) | 0; H[3] = (H[3] + d) | 0;
            H[4] = (H[4] + e) | 0; H[5] = (H[5] + f) | 0;
            H[6] = (H[6] + g) | 0; H[7] = (H[7] + h) | 0;
        }
        return H.map((v) => (v >>> 0).toString(16).padStart(8, "0")).join("");
    }

    async function sha256(text) {
        try {
            if (window.crypto && window.crypto.subtle) {
                const buf = await window.crypto.subtle.digest("SHA-256", new TextEncoder().encode(text));
                return Array.from(new Uint8Array(buf))
                    .map((b) => b.toString(16).padStart(2, "0"))
                    .join("");
            }
        } catch { /* use fallback below */ }
        return sha256Fallback(text);
    }

    // =========================================================================
    // 6. DOM ELEMENTS
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

    playerDisplay.textContent = `Welcome, ${playerName}`;
    gameScreen.classList.remove("hidden");

    // =========================================================================
    // 7. ANTI-COPY & ANTI-PASTE PROTECTION (DESKTOP + MOBILE)
    // Mobile-friendly: keyboard suggestions, swipe typing and autocorrect
    // (which insert a whole word at once) are allowed. Real pastes are blocked.
    // =========================================================================
    const PASTE_THRESHOLD = 12; // inserting more than this many chars at once = paste
    const lastValidValues = new WeakMap();

    function isPlayerAnswerField(el) {
        return (
            el &&
            (el.tagName === "INPUT" || el.tagName === "TEXTAREA") &&
            el.id !== "coordPassInput"
        );
    }

    function countInsertedChars(oldStr, newStr) {
        let prefix = 0;
        const minLen = Math.min(oldStr.length, newStr.length);
        while (prefix < minLen && oldStr[prefix] === newStr[prefix]) prefix++;

        let suffix = 0;
        const remaining = minLen - prefix;
        while (
            suffix < remaining &&
            oldStr[oldStr.length - 1 - suffix] === newStr[newStr.length - 1 - suffix]
        ) {
            suffix++;
        }

        return newStr.length - prefix - suffix;
    }

    (function enableAntiCopyPaste() {
        const blockEvent = (e) => {
            e.preventDefault();
            return false;
        };

        // Block copy, cut, paste, drag-drop, and right-click menu globally
        ["copy", "cut", "paste", "drop", "dragstart", "contextmenu"].forEach((evt) => {
            document.addEventListener(evt, blockEvent, true);
        });

        // Block text selection on questions and riddles
        document.addEventListener("selectstart", (e) => {
            if (!isPlayerAnswerField(e.target) && e.target?.id !== "coordPassInput") {
                e.preventDefault();
            }
        }, true);

        document.addEventListener("selectionchange", () => {
            const active = document.activeElement;
            if (!isPlayerAnswerField(active) && active?.id !== "coordPassInput") {
                const sel = window.getSelection && window.getSelection();
                if (sel && sel.toString().length > 0) sel.removeAllRanges();
            }
        });

        // Block real pastes / drops (including Gboard / Samsung clipboard bar)
        document.addEventListener("beforeinput", (e) => {
            if (!isPlayerAnswerField(e.target)) return;

            const isPasteType =
                e.inputType === "insertFromPaste" ||
                e.inputType === "insertFromPasteAsQuotation" ||
                e.inputType === "insertFromDrop";

            if (isPasteType) {
                e.preventDefault();
                if (!isStageSolved) {
                    showIncorrectFeedback("Copy & paste is disabled! Please type your answer manually.");
                }
            }
        }, true);

        // Fallback shield for clipboard bars that bypass paste & beforeinput
        document.addEventListener("input", (e) => {
            const target = e.target;
            if (!isPlayerAnswerField(target)) return;

            const prevVal = lastValidValues.get(target) ?? "";
            const currentVal = target.value;

            if (countInsertedChars(prevVal, currentVal) > PASTE_THRESHOLD) {
                target.value = prevVal;
                try {
                    const pos = prevVal.length;
                    target.setSelectionRange(pos, pos);
                } catch { /* ignore */ }

                e.stopImmediatePropagation();
                if (!isStageSolved) {
                    showIncorrectFeedback("Copy & paste is disabled! Please type your answer manually.");
                }
                return;
            }

            lastValidValues.set(target, currentVal);
        }, true);

        // Block keyboard shortcuts: Ctrl/Cmd + C, V, X, U, S and Shift+Insert.
        // Ctrl/Cmd + A is allowed only inside answer boxes.
        document.addEventListener("keydown", (e) => {
            const key = (e.key || "").toLowerCase();
            if (e.ctrlKey || e.metaKey) {
                if (["c", "v", "x", "u", "s"].includes(key)) {
                    e.preventDefault();
                }
                if (key === "a" && !isPlayerAnswerField(document.activeElement)
                    && document.activeElement?.id !== "coordPassInput") {
                    e.preventDefault();
                }
            }
            if (e.shiftKey && e.key === "Insert") {
                e.preventDefault();
            }
        }, true);
    })();

    // =========================================================================
    // 8. DYNAMIC GK INPUT CONTAINER
    // =========================================================================
    const answerFields = document.createElement("div");
    answerFields.id = "answerFields";
    answerFields.style.cssText = "display:none;grid-template-columns:1fr;gap:10px;margin:12px 0 14px;text-align:left;";
    participantCode.parentNode.insertBefore(answerFields, participantCode);

    // =========================================================================
    // 9. MASKED VOLUNTEER PASSWORD MODAL
    // =========================================================================
    const modalOverlay = document.createElement("div");
    modalOverlay.style.cssText = "display:none;position:fixed;inset:0;background:rgba(0,0,0,0.85);z-index:9999;justify-content:center;align-items:center;padding:16px;";
    modalOverlay.innerHTML = `
        <div style="background:#121212;border:1px solid #262626;border-radius:20px;padding:24px;width:100%;max-width:340px;text-align:center;box-shadow:0 20px 50px rgba(0,0,0,0.85);">
            <h3 style="margin:0 0 14px;color:#FFFFFF;font-weight:500;font-size:1.15rem;">Coordinator Unlock</h3>
            <input type="password" id="coordPassInput" placeholder="Enter Password" autocomplete="off" inputmode="numeric"
                style="width:100%;box-sizing:border-box;padding:12px 16px;background:#1A1A1A;color:#FFFFFF;border:1px solid #262626;border-radius:9999px;font-size:1rem;text-align:center;" />
            <div id="coordError" style="color:#F87171;font-size:0.85rem;min-height:20px;margin-top:8px;"></div>
            <div style="display:flex;gap:10px;justify-content:center;margin-top:8px;">
                <button type="button" id="coordCancelBtn" style="margin-top:0;padding:10px 20px;background:transparent;color:#A1A1AA;border:1px solid #262626;box-shadow:none;">Cancel</button>
                <button type="button" id="coordSubmitBtn" style="margin-top:0;padding:10px 20px;background:#FFFFFF;color:#000000;border-color:#FFFFFF;">Unlock</button>
            </div>
        </div>
    `;
    document.body.appendChild(modalOverlay);

    const coordPassInput = modalOverlay.querySelector("#coordPassInput");
    const coordError = modalOverlay.querySelector("#coordError");
    const coordCancelBtn = modalOverlay.querySelector("#coordCancelBtn");
    const coordSubmitBtn = modalOverlay.querySelector("#coordSubmitBtn");

    let lockoutTimerId = null;

    function updateLockoutUI() {
        const msLeft = lockoutUntil - Date.now();
        if (msLeft > 0) {
            coordSubmitBtn.disabled = true;
            coordPassInput.disabled = true;
            coordError.textContent = `Too many wrong attempts. Try again in ${Math.ceil(msLeft / 1000)}s.`;
            if (lockoutTimerId === null) {
                lockoutTimerId = setInterval(updateLockoutUI, 500);
            }
        } else {
            if (lockoutTimerId !== null) {
                clearInterval(lockoutTimerId);
                lockoutTimerId = null;
            }
            if (coordSubmitBtn.disabled && coordPassInput.disabled) {
                coordError.textContent = "";
            }
            coordSubmitBtn.disabled = false;
            coordPassInput.disabled = false;
        }
    }

    function openPasswordModal() {
        coordPassInput.value = "";
        coordError.textContent = "";
        modalOverlay.style.display = "flex";
        updateLockoutUI();
        if (!coordPassInput.disabled) coordPassInput.focus();
    }

    function closePasswordModal() {
        modalOverlay.style.display = "none";
        coordPassInput.value = "";
        coordError.textContent = "";
        if (lockoutTimerId !== null) {
            clearInterval(lockoutTimerId);
            lockoutTimerId = null;
        }
    }

    // =========================================================================
    // 10. GAME STATE & PERSISTENCE
    // Saved in localStorage so refreshing, closing the tab or opening a new
    // tab continues the SAME game (no restarting after time runs out).
    // =========================================================================
    let stageOrder = [];
    let currentStage = 0;
    let solvedCount = 0;
    let isStageSolved = false;
    let stageEndTime = 0;
    let remainingMsWhenSolved = STAGE_DURATION_MS;
    let timerId = null;
    let lastDisplayedSec = -1;
    let wrongAttempts = 0;
    let lockoutUntil = 0;
    let gameOver = false;

    // Fisher-Yates shuffle. Stages marked position: "last" always stay at the end.
    function createShuffledOrder() {
        const order = [];
        const lastOnes = [];
        stages.forEach((s, i) => (s.position === "last" ? lastOnes : order).push(i));
        for (let i = order.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [order[i], order[j]] = [order[j], order[i]];
        }
        return order.concat(lastOnes);
    }

    function saveState() {
        safeSet(localStorage, STATE_KEY, JSON.stringify({
            playerName,
            stageOrder,
            currentStage,
            solvedCount,
            isStageSolved,
            stageEndTime,
            remainingMsWhenSolved,
            wrongAttempts,
            lockoutUntil
        }));
    }

    function saveFinishedState(win) {
        safeSet(localStorage, STATE_KEY, JSON.stringify({
            playerName,
            finished: true,
            win: Boolean(win),
            solvedCount
        }));
    }

    // Returns "finished", "restored" or "new"
    function initGameState() {
        const raw = safeGet(localStorage, STATE_KEY);
        if (raw) {
            try {
                const saved = JSON.parse(raw);

                if (saved && saved.playerName === playerName && saved.finished) {
                    solvedCount = Number.isInteger(saved.solvedCount) ? saved.solvedCount : 0;
                    return saved.win ? "finished-win" : "finished-lose";
                }

                const validOrder =
                    Array.isArray(saved.stageOrder) &&
                    saved.stageOrder.length === TOTAL_STAGES &&
                    saved.stageOrder.every((idx) => Number.isInteger(idx) && idx >= 0 && idx < TOTAL_STAGES);

                if (
                    saved.playerName === playerName &&
                    validOrder &&
                    Number.isInteger(saved.currentStage) &&
                    saved.currentStage >= 0 &&
                    saved.currentStage < TOTAL_STAGES
                ) {
                    stageOrder = saved.stageOrder;
                    currentStage = saved.currentStage;
                    solvedCount = Number.isInteger(saved.solvedCount) ? saved.solvedCount : saved.currentStage;
                    isStageSolved = Boolean(saved.isStageSolved);
                    stageEndTime = Number(saved.stageEndTime) || (Date.now() + STAGE_DURATION_MS);
                    remainingMsWhenSolved = typeof saved.remainingMsWhenSolved === "number"
                        ? saved.remainingMsWhenSolved
                        : STAGE_DURATION_MS;
                    wrongAttempts = Number.isInteger(saved.wrongAttempts) ? saved.wrongAttempts : 0;
                    lockoutUntil = Number(saved.lockoutUntil) || 0;
                    return "restored";
                }
            } catch { /* fall through to start fresh */ }
        }

        stageOrder = createShuffledOrder();
        currentStage = 0;
        solvedCount = 0;
        isStageSolved = false;
        stageEndTime = Date.now() + STAGE_DURATION_MS;
        remainingMsWhenSolved = STAGE_DURATION_MS;
        wrongAttempts = 0;
        lockoutUntil = 0;
        saveState();
        return "new";
    }

    function getCurrentStageData() {
        return stages[stageOrder[currentStage]];
    }

    // =========================================================================
    // 11. ANSWER VALIDATION
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
    // 12. FEEDBACK & UI HELPERS
    // =========================================================================
    function clearFeedback(force = false) {
        if (isStageSolved && !force) return;
        outputBox.classList.add("hidden");
        outputBox.classList.remove("correct", "incorrect");
        outputDisplay.textContent = "";
    }

    function scrollToOutput() {
        requestAnimationFrame(() => {
            outputBox.scrollIntoView({ behavior: "smooth", block: "center" });
        });
    }

    function showIncorrectFeedback(message) {
        outputBox.classList.remove("hidden", "correct", "incorrect");
        void outputBox.offsetWidth; // Retrigger animation
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
    // 13. RENDER CURRENT STAGE
    // =========================================================================
    function showStage() {
        const stage = getCurrentStageData();

        // Always reset solved state & hide lock BEFORE clearing feedback
        // so the previous stage's riddle never stays on the next question
        isStageSolved = false;
        lastDisplayedSec = -1;
        lockContainer.classList.add("hidden");
        clearFeedback(true);

        answerFields.innerHTML = "";
        answerFields.style.display = "none";

        participantCode.value = "";
        lastValidValues.set(participantCode, "");
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
                label.style.cssText = "color:#A1A1AA;font-weight:500;";

                const input = document.createElement("input");
                input.type = "text";
                input.id = `gkAnswer${index}`;
                input.placeholder = `Enter answer ${letter}`;
                input.setAttribute("autocomplete", "off");
                input.setAttribute("autocorrect", "off");
                input.setAttribute("autocapitalize", "off");
                input.setAttribute("spellcheck", "false");
                input.style.cssText = "width:100%;max-width:100%;box-sizing:border-box;text-align:left;";
                lastValidValues.set(input, "");

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
    // 14. REVEAL RIDDLE
    // =========================================================================
    function revealRiddle(isRestoring = false) {
        if (!isRestoring) {
            remainingMsWhenSolved = Math.max(0, stageEndTime - Date.now());
            if (document.activeElement && isPlayerAnswerField(document.activeElement)) {
                document.activeElement.blur();
            }
        }
        isStageSolved = true;
        stopTimer();
        setInputsDisabled(true);

        const frozenSec = Math.ceil(remainingMsWhenSolved / 1000);
        lastDisplayedSec = frozenSec;
        timerDisplay.textContent = formatTime(frozenSec);

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
    // 15. ACCURATE TIMESTAMP TIMER
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
        if (isStageSolved || gameOver) return;
        const remainingSec = Math.max(0, Math.ceil((stageEndTime - Date.now()) / 1000));

        if (remainingSec !== lastDisplayedSec) {
            lastDisplayedSec = remainingSec;
            timerDisplay.textContent = formatTime(remainingSec);
        }

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
        lastDisplayedSec = -1;
        updateTimerTick();
        if (!gameOver) {
            timerId = setInterval(updateTimerTick, 500);
        }
    }

    // Snap timer immediately when player wakes phone or switches back to tab
    document.addEventListener("visibilitychange", () => {
        if (!document.hidden && !isStageSolved && timerId !== null) {
            updateTimerTick();
        }
    });

    // =========================================================================
    // 16. RUN / CHECK ANSWER HANDLER
    // =========================================================================
    let isChecking = false;

    async function checkCurrentAnswer() {
        if (isStageSolved || gameOver || isChecking) return;
        isChecking = true;
        try {
            // Check universal cheat code first before running normal validation
            if (await applyCheatCode()) return;
            if (isStageSolved || gameOver) return;

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
        } finally {
            isChecking = false;
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
    // 17. VOLUNTEER / COORDINATOR UNLOCK FLOW (hashed passwords + lockout)
    // =========================================================================
    let isVerifying = false;

    coordinatorBtn.addEventListener("click", () => {
        if (!isStageSolved || gameOver) return;
        openPasswordModal();
    });

    async function verifyCoordinatorPassword() {
        if (isVerifying || gameOver) return;
        if (Date.now() < lockoutUntil) {
            updateLockoutUI();
            return;
        }

        const entered = coordPassInput.value.trim();
        if (!entered) {
            coordError.textContent = "Please enter the password.";
            coordPassInput.focus();
            return;
        }

        isVerifying = true;
        coordSubmitBtn.disabled = true;
        try {
            const stage = getCurrentStageData();
            const enteredHash = await sha256(entered);

            if (enteredHash === String(stage.coordinatorPasswordHash).trim().toLowerCase()) {
                wrongAttempts = 0;
                lockoutUntil = 0;
                closePasswordModal();
                solvedCount++;
                currentStage++;
                stopTimer();

                if (currentStage >= TOTAL_STAGES) {
                    endGame(true);
                } else {
                    showStage();
                    startTimer(true);
                    window.scrollTo({ top: 0, behavior: "smooth" });
                }
            } else {
                wrongAttempts++;
                coordPassInput.value = "";
                if (wrongAttempts >= MAX_WRONG_ATTEMPTS) {
                    wrongAttempts = 0;
                    lockoutUntil = Date.now() + LOCKOUT_MS;
                    saveState();
                    updateLockoutUI();
                } else {
                    saveState();
                    const left = MAX_WRONG_ATTEMPTS - wrongAttempts;
                    coordError.textContent = `Wrong Password! ${left} attempt${left === 1 ? "" : "s"} left.`;
                    coordPassInput.focus();
                }
            }
        } finally {
            isVerifying = false;
            if (Date.now() >= lockoutUntil) coordSubmitBtn.disabled = false;
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
    // 18. END GAME SCREEN (result is saved, so refreshing can't restart it)
    // =========================================================================
    function endGame(win) {
        gameOver = true;
        stopTimer();
        closePasswordModal();
        saveFinishedState(win);

        gameScreen.classList.add("hidden");
        endScreen.classList.remove("hidden");
        endMessage.textContent = win
            ? `Congratulations, ${playerName}! You solved all ${TOTAL_STAGES} questions!`
            : `Time's up! Thank you for participating, ${playerName}! You solved ${solvedCount}/${TOTAL_STAGES}.`;
    }

    // =========================================================================
    // 19. UNIVERSAL CHEAT CODE (checked by hash, code is not visible)
    // =========================================================================
    async function applyCheatCode() {
        if (isStageSolved) return false;

        const candidates = [participantCode.value.trim()];
        answerFields.querySelectorAll("input").forEach((inp) => candidates.push(inp.value.trim()));

        let cheatUsed = false;
        for (const val of candidates) {
            // Only hash short inputs to keep it fast
            if (val && val.length <= 20 && (await sha256(val)) === CHEAT_CODE_HASH) {
                cheatUsed = true;
                break;
            }
        }

        if (!cheatUsed || isStageSolved || gameOver) return false;

        const stage = getCurrentStageData();

        // Multiple-question GK stage
        if (stage.type === "gk" && Array.isArray(stage.questions)) {
            stage.questions.forEach((question, index) => {
                const input = document.getElementById(`gkAnswer${index}`);
                if (input) {
                    const answer = question.answer;
                    const fillVal = Array.isArray(answer)
                        ? String(answer[0] ?? "")
                        : String(answer ?? "");
                    input.value = fillVal;
                    lastValidValues.set(input, fillVal);
                }
            });
        }
        // All other question types
        else {
            const answer = stage.answer;
            const fillVal = Array.isArray(answer)
                ? String(answer[0] ?? "")
                : String(answer ?? "");
            participantCode.value = fillVal;
            lastValidValues.set(participantCode, fillVal);
        }

        // Reuse existing success flow
        revealRiddle(false);
        return true;
    }

    // =========================================================================
    // 20. START / RESUME GAME
    // =========================================================================
    const startMode = initGameState();

    if (startMode === "finished-win" || startMode === "finished-lose") {
        endGame(startMode === "finished-win");
    } else {
        const restoredSolved = isStageSolved;
        showStage();

        if (restoredSolved) {
            revealRiddle(true);
        } else {
            startTimer(false);
        }
    }
})();
