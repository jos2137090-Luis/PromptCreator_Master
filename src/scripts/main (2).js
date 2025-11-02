// src/scripts/main.js

document.addEventListener("DOMContentLoaded", () => {
    
    // --- 1. Get all our HTML elements ---
    const lensSelectionScreen = document.getElementById("lens-selection");
    const qaScreen = document.getElementById("qa-screen");
    const workbenchScreen = document.getElementById("workbench-screen"); 
    const vaultScreen = document.getElementById("vault-screen"); // New

    const lensCards = document.querySelectorAll(".lens-card");

    const qaBackBtn = document.getElementById("qa-back-btn");
    const qaNextBtn = document.getElementById("qa-next-btn");
    const qaProgressFill = document.getElementById("qa-progress-fill");
    const qaQuestionTitle = document.getElementById("qa-question-title");
    const qaChoicesContainer = document.getElementById("qa-choices-container");
    const qaCustomText = document.getElementById("qa-custom-text");
    const qaSkipCheckbox = document.getElementById("qa-skip-checkbox");
    const qaPreviewText = document.getElementById("qa-preview-text");

    const wbBtnStartOver = document.getElementById("wb-btn-start-over");
    const workbenchPromptText = document.getElementById("workbench-prompt-text");
    const wbBtnCopy = document.getElementById("wb-btn-copy");
    const wbBtnRemix = document.getElementById("wb-btn-remix");
    const remixContainer = document.getElementById("remix-container");
    const remixOptions = document.getElementById("remix-options");
    const wbBtnConfirmRemix = document.getElementById("wb-btn-confirm-remix");
    const wbBtnSave = document.getElementById("wb-btn-save"); // New Save button

    // --- NEW FOR SESSION 10: Vault & Save Modal elements ---
    const saveModal = document.getElementById("save-modal");
    const closeSaveModalBtn = document.getElementById("close-save-modal");
    const cancelSaveBtn = document.getElementById("btn-cancel-save");
    const confirmSaveBtn = document.getElementById("btn-confirm-save");
    const saveTitleInput = document.getElementById("save-title");
    const saveCategorySelect = document.getElementById("save-category");
    const newCategoryBtn = document.getElementById("btn-new-category");
    const newCategoryInput = document.getElementById("new-category-name");
    const saveTagsInput = document.getElementById("save-tags");
    const savePurposeTextarea = document.getElementById("save-purpose");
    const vaultBtnBackToLenses = document.getElementById("vault-btn-back-to-lenses"); // Vault nav
    const vaultBtnNewPrompt = document.getElementById("vault-btn-new-prompt");     // Vault nav
    // --- END NEW ---

    // --- 2. Define our data and state ---
    let currentLensData = {}; 
    let allQuestions = []; 
    let currentQuestionIndex = 0;
    let answers = {}; 
    let finalPromptText = ""; 
    let mockCategories = ["General", "Software Development", "Marketing Copy"]; // Temporary

    // --- 3. Define Core Functions ---

    function startLens(lensId) {
        if (typeof LENS_DATA === 'undefined' || !LENS_DATA[lensId]) {
            console.error("LENS_DATA is not loaded or lensId is invalid:", lensId);
            alert("Error: Lens data could not be loaded. Check console.");
            return;
        }

        if (LENS_DATA[lensId].questions.length > 0) {
            currentLensData = LENS_DATA[lensId];
            buildQuestionList(); 
            currentQuestionIndex = 0;
            answers = {}; 
            remixContainer.style.display = "none";
            loadQuestion(currentQuestionIndex);
            
            // Switch screens
            showScreen("qa"); 
        } else {
            alert(`Lens "${lensId}" is not implemented yet.`);
        }
    }
    
    function buildQuestionList() {
        allQuestions = []; 
        currentLensData.questions.forEach((q, index) => {
            allQuestions.push(q); 
            if (q.dynamic && q.subQuestions) {
                const savedAnswer = answers[index] ? answers[index].answer : "";
                let subQuestionInjected = false;
                for (const choiceKey in q.subQuestions) {
                    if (savedAnswer.includes(choiceKey)) {
                        allQuestions.push(q.subQuestions[choiceKey]);
                        subQuestionInjected = true;
                        break; 
                    }
                }
                if (!subQuestionInjected && q.subQuestions.default) {
                     allQuestions.push(q.subQuestions.default);
                }
            }
        });
        allQuestions.push(...currentLensData.refinement);
    }

    function loadQuestion(index) {
        buildQuestionList();
        if (index >= allQuestions.length) {
            index = allQuestions.length - 1;
            currentQuestionIndex = index;
        }
        if (index < 0) return; // Should not happen, but safety check

        const questionData = allQuestions[index];
        qaQuestionTitle.textContent = "";
        qaChoicesContainer.innerHTML = "";
        qaCustomText.value = "";
        qaSkipCheckbox.checked = false;
        qaQuestionTitle.textContent = `(${index + 1}/${allQuestions.length}) ${questionData.question}`;

        questionData.choices.forEach((choice, i) => {
            const choiceId = `choice-${index}-${i}`;
            const choiceElement = document.createElement("div");
            choiceElement.classList.add("qa-choice");
            const choiceKey = questionData.dynamic ? (choice.split('(')[0].trim()) : ''; 
            choiceElement.innerHTML = `
                <input type="checkbox" id="${choiceId}" value="${choice}" data-choice-key="${choiceKey}">
                <label for="${choiceId}">${choice}</label>
            `;
            qaChoicesContainer.appendChild(choiceElement);
        });
        
        if (answers[index]) { // Restore answers
            const savedAnswer = answers[index].answer;
            if (savedAnswer === "") { qaSkipCheckbox.checked = true; } 
            else {
                qaChoicesContainer.querySelectorAll('input[type="checkbox"]').forEach(box => {
                    if (savedAnswer.includes(box.value)) { box.checked = true; }
                });
                if (savedAnswer.includes("CUSTOM:")) {
                    const customPart = savedAnswer.split("CUSTOM:")[1];
                    if (customPart) { qaCustomText.value = customPart.trim(); }
                }
            }
        }
        const progressPercent = ((index + 1) / allQuestions.length) * 100;
        qaProgressFill.style.width = `${progressPercent}%`;
        qaNextBtn.textContent = (index === allQuestions.length - 1) ? "Finish" : "Next →";
        qaBackBtn.textContent = (index === 0) ? "Back to Lenses" : "← Previous"; 
        addInputListeners(questionData.dynamic); 
        updatePreview(); 
    }
    
    function handleDynamicChoice() {
        saveCurrentAnswer();
        buildQuestionList();
        const progressPercent = ((currentQuestionIndex + 1) / allQuestions.length) * 100;
        qaProgressFill.style.width = `${progressPercent}%`;
        qaNextBtn.textContent = (currentQuestionIndex === allQuestions.length - 1) ? "Finish" : "Next →";
        updatePreview();
    }

    function updatePreview() {
        saveCurrentAnswer();
        let previewString = "";
        for (let i = 0; i < allQuestions.length; i++) {
            if (answers[i]) {
                const questionKey = allQuestions[i].key;
                const answer = answers[i].answer;
                if (answer && answer.trim() !== "") {
                    previewString += `--- ${questionKey.toUpperCase()} ---\n${answer}\n\n`;
                }
            }
        }
        qaPreviewText.textContent = previewString.trim() || "Your prompt will appear here...";
    }
    
    function saveCurrentAnswer() {
        if (!allQuestions || allQuestions.length === 0 || !allQuestions[currentQuestionIndex]) return;
        let compiledAnswer = "";
        const questionKey = allQuestions[currentQuestionIndex].key;
        if (qaSkipCheckbox.checked) {
            answers[currentQuestionIndex] = { key: questionKey, answer: "" }; 
            return;
        }
        const checkedBoxes = qaChoicesContainer.querySelectorAll('input[type="checkbox"]:checked');
        checkedBoxes.forEach(box => { compiledAnswer += `- ${box.value}\n`; });
        if (qaCustomText.value.trim() !== "") {
            compiledAnswer += `${compiledAnswer.length > 0 ? "\n" : ""}CUSTOM:\n${qaCustomText.value.trim()}\n`;
        }
        answers[currentQuestionIndex] = { key: questionKey, answer: compiledAnswer.trim() };
    }

    function addInputListeners(isDynamic = false) {
        const inputs = qaScreen.querySelectorAll('input[type="checkbox"], textarea');
        inputs.forEach(input => {
            input.removeEventListener('change', updatePreview);
            input.addEventListener('change', updatePreview); 
            if (isDynamic && input.type === 'checkbox') {
                input.removeEventListener('change', handleDynamicChoice);
                input.addEventListener('change', handleDynamicChoice);
            }
        });
        qaCustomText.removeEventListener('input', updatePreview);
        qaCustomText.addEventListener('input', updatePreview);
    }
    
    function goToNextQuestion() {
        saveCurrentAnswer();
        updatePreview(); 
        if (currentQuestionIndex < allQuestions.length - 1) {
            currentQuestionIndex++;
            loadQuestion(currentQuestionIndex);
        } else {
            finishLens();
        }
    }

    function goToPrevious() {
        if (currentQuestionIndex > 0) {
            saveCurrentAnswer();
            currentQuestionIndex--;
            loadQuestion(currentQuestionIndex);
        } else {
            goBackToLensesConfirm(); // Changed confirmation logic
        }
    }
    
    function finishLens() {
        finalPromptText = `### PROMPT CREATED BY: ${currentLensData.title.toUpperCase()} ###\n\n`;
        for (let i = 0; i < allQuestions.length; i++) {
            if (answers[i]) {
                const key = answers[i].key;
                const answer = answers[i].answer;
                if (answer && answer.trim() !== "") {
                    finalPromptText += `\n--- ${key.includes("Refinement") ? "REFINEMENT: " : ""}${key.toUpperCase()} ---\n${answer}\n`;
                }
            }
        }
        workbenchPromptText.textContent = finalPromptText;
        showScreen("workbench");
    }

    function goBackToLensesConfirm() {
        if (confirm("Are you sure? Your current progress will be lost.")) {
            showScreen("lensSelection"); // Go back to lens selection
        }
    }

    function startOver() { // From Workbench
        showScreen("lensSelection");
    }
    
    function copyToClipboard() {
        if (navigator.clipboard) {
            navigator.clipboard.writeText(finalPromptText).then(() => {
                wbBtnCopy.textContent = "Copied!";
                setTimeout(() => { wbBtnCopy.textContent = "Copy to Clipboard"; }, 2000);
            }).catch(err => { console.error("Failed to copy text: ", err); alert("Failed to copy text."); });
        } else { alert("Copy feature needs a secure context (https/localhost)."); }
    }
    
    function generateRemixes() {
        console.log("Generating remixes...");
        remixOptions.innerHTML = ""; 
        const originalPrompt = finalPromptText;
        const remixes = [
            { title: "Remix 1 (Tone Shift: More Formal)", rationale: "Rationale: 'Choose for a more professional response.'", text: "--- TONE SHIFT: FORMAL ---\n" + originalPrompt },
            { title: "Remix 2 (Perspective Shift: Collaborative)", rationale: "Rationale: 'Choose for a more creative answer.'", text: "--- PERSPECTIVE SHIFT: COLLABORATIVE ---\nLet's work together:\n" + originalPrompt },
            { title: "Remix 3 (Structural Shift: Chain of Thought)", rationale: "Rationale: 'Choose for more logical output.'", text: "--- STRUCTURAL SHIFT: CHAIN OF THOUGHT ---\nPlease think step-by-step:\n" + originalPrompt }
        ];
        remixes.forEach((remix, index) => {
            const remixId = `remix-${index}`;
            const option = document.createElement("div");
            option.classList.add("remix-option");
            option.innerHTML = `<input type="radio" id="${remixId}" name="remix-choice" value="${index}"><label for="${remixId}"><strong>${remix.title}</strong><small>${remix.rationale}</small></label>`;
            option.dataset.remixText = remix.text;
            remixOptions.appendChild(option);
        });
        remixContainer.style.display = "block";
    }
    
    function acceptRemix() {
        const selectedRemix = remixOptions.querySelector('input[name="remix-choice"]:checked');
        if (selectedRemix) {
            finalPromptText = selectedRemix.parentElement.dataset.remixText;
            workbenchPromptText.textContent = finalPromptText;
            remixContainer.style.display = "none";
            remixOptions.innerHTML = "";
        } else { alert("Please select a remix to accept."); }
    }

    // --- NEW FUNCTIONS FOR SESSION 10 ---

    /**
     * Shows/Hides the main application screens.
     */
    function showScreen(screenId) {
        lensSelectionScreen.style.display = "none";
        lensSelectionScreen.classList.remove("active", "hidden");
        qaScreen.style.display = "none";
        qaScreen.classList.remove("active", "hidden");
        workbenchScreen.style.display = "none";
        workbenchScreen.classList.remove("active", "hidden");
        vaultScreen.style.display = "none"; 
        vaultScreen.classList.remove("active", "hidden");

        let screenElement;
        switch (screenId) {
            case "lensSelection": screenElement = lensSelectionScreen; screenElement.style.display = "block"; break;
            case "qa": screenElement = qaScreen; screenElement.style.display = "flex"; break;
            case "workbench": screenElement = workbenchScreen; screenElement.style.display = "flex"; break;
            case "vault": screenElement = vaultScreen; screenElement.style.display = "flex"; loadVaultPrompts(); break;
            default: console.error("Unknown screen ID:", screenId); return;
        }
        screenElement.classList.add("active");
        [lensSelectionScreen, qaScreen, workbenchScreen, vaultScreen].forEach(scr => {
            if (scr !== screenElement) { scr.classList.add("hidden"); }
        });
    }

    /**
     * Opens the Save Prompt modal. (SIMPLIFIED FOR TESTING)
     */
    function openSaveModal() {
        console.log("openSaveModal function called!"); // For testing
        
        /* --- TEMPORARILY COMMENT OUT THESE LINES --- */
        /*
        const firstLine = finalPromptText.split('\n')[2]?.trim() || "Untitled Prompt"; 
        saveTitleInput.value = firstLine.replace(/^---.*---/,'').trim().substring(0, 50); 
        loadCategoriesForSave(); 
        newCategoryInput.classList.add("hidden"); 
        saveTagsInput.value = "";
        savePurposeTextarea.value = "";
        */
        /* --- END OF TEMPORARY COMMENTS --- */

        console.log("Attempting to set display to block for:", saveModal); // For testing
        saveModal.style.display = "block"; // <<< This is the important line
    } // <<< This is the correct closing brace for the function

    /**
     * Closes the Save Prompt modal.
     */
    function closeSaveModal() {
        saveModal.style.display = "none";
    }
    
    /**
     * Loads categories into the save modal dropdown.
     */
    function loadCategoriesForSave() {
        saveCategorySelect.innerHTML = ""; 
        mockCategories.forEach(cat => {
            const option = document.createElement("option");
            option.value = cat; option.textContent = cat;
            saveCategorySelect.appendChild(option);
        });
    }
    
    /**
     * Shows the input field for adding a new category.
     */
    function showNewCategoryInput() {
        newCategoryInput.classList.remove("hidden");
        newCategoryInput.focus();
    }
    
    /**
     * Gathers data from the modal and calls the (mock) save function.
     */
    function handleConfirmSave() {
        const title = saveTitleInput.value.trim();
        let category = saveCategorySelect.value;
        const tags = saveTagsInput.value.trim();
        const purpose = savePurposeTextarea.value.trim();
        const newCategoryName = newCategoryInput.value.trim();

        if (!title) { alert("Please enter a title for the prompt."); return; }
        
        if (!newCategoryInput.classList.contains("hidden") && newCategoryName) {
            category = newCategoryName;
            if (!mockCategories.includes(category)) { mockCategories.push(category); }
        }
        
        const promptData = { title, category, tags, purpose, promptText: finalPromptText };
        savePromptToVault(promptData); 
        closeSaveModal();
    }
    
    /**
     * MOCK FUNCTION: Simulates saving the prompt.
     */
    function savePromptToVault(promptData) {
        console.log("--- MOCK SAVE ---");
        console.log("Saving prompt data:", promptData);
        alert("Prompt data logged to console (mock save).");
    }
    
    /**
      * MOCK FUNCTION: Simulates loading prompts for the vault view.
      */
    function loadVaultPrompts() {
        const vaultList = document.getElementById("vault-prompt-list");
        vaultList.innerHTML = ""; 
        const mockPrompts = [
            { id: 1, title: "Sample Prompt 1", category: "General", tags: "test, sample", purpose: "Just a test." },
            { id: 2, title: "Code Generator Prompt", category: "Software Development", tags: "python, code", purpose: "Generates Python functions." }
        ];
        if (mockPrompts.length === 0) {
            vaultList.innerHTML = '<li class="vault-list-item"><h4>No prompts saved yet.</h4></li>'; return;
        }
        mockPrompts.forEach(p => {
            const li = document.createElement("li");
            li.classList.add("vault-list-item"); li.dataset.promptId = p.id; 
            li.innerHTML = `<h4>${p.title}</h4><p>Category: ${p.category}</p><p class="tags">Tags: ${p.tags}</p>`;
            vaultList.appendChild(li);
        });
    }

    // --- 4. Attach Initial Event Listeners ---
    lensCards.forEach(card => card.addEventListener("click", () => startLens(card.getAttribute("data-lens"))));
    qaBackBtn.addEventListener("click", goToPrevious); 
    qaNextBtn.addEventListener("click", goToNextQuestion);
    wbBtnStartOver.addEventListener("click", startOver);
    wbBtnCopy.addEventListener("click", copyToClipboard);
    wbBtnRemix.addEventListener("click", generateRemixes);
    wbBtnConfirmRemix.addEventListener("click", acceptRemix);
    
    // --- NEW LISTENERS FOR SESSION 10 ---
    wbBtnSave.addEventListener("click", openSaveModal); // Open modal
    closeSaveModalBtn.addEventListener("click", closeSaveModal); // Close X
    cancelSaveBtn.addEventListener("click", closeSaveModal);     // Close Cancel
    confirmSaveBtn.addEventListener("click", handleConfirmSave); // Save action
    newCategoryBtn.addEventListener("click", showNewCategoryInput); // Show new category input
    vaultBtnBackToLenses.addEventListener("click", () => showScreen("lensSelection"));
    vaultBtnNewPrompt.addEventListener("click", () => showScreen("lensSelection")); 
    
    // --- Initial Setup ---
    showScreen("lensSelection"); 
    
}); // End of DOMContentLoaded