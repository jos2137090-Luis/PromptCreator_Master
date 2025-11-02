// src/scripts/main.js

document.addEventListener("DOMContentLoaded", () => {
    
    // --- 1. Get all our HTML elements ---
    const lensSelectionScreen = document.getElementById("lens-selection");
    const qaScreen = document.getElementById("qa-screen");
    const workbenchScreen = document.getElementById("workbench-screen"); 
    const vaultScreen = document.getElementById("vault-screen"); 
    const abandonedPromptsContainer = document.getElementById("abandoned-prompts-container"); 
    const abandonedList = document.getElementById("abandoned-list");             

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
    const wbBtnSave = document.getElementById("wb-btn-save"); 
    const wbBtnExport = document.getElementById("wb-btn-export");
    const exportFormatSelect = document.getElementById("export-format");

    // --- NEW FOR SESSION 13 ---
    const wbBtnFetchImage = document.getElementById("wb-btn-fetch-image");
    const imageFetchContainer = document.getElementById("image-fetch-container");
    const imageKeywordsSpan = document.getElementById("image-keywords");
    const imageGalleryThumbnails = document.getElementById("image-gallery-thumbnails");
    const wbBtnConfirmImage = document.getElementById("wb-btn-confirm-image");
    // --- END NEW ---

    // Vault & Save Modal elements
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
    const vaultBtnBackToLenses = document.getElementById("vault-btn-back-to-lenses"); 
    const vaultBtnNewPrompt = document.getElementById("vault-btn-new-prompt");     

    // --- 2. Define our data and state ---
    const AUTO_SAVE_INTERVAL = 5000; // 5 seconds
    let autoSaveTimer = null; // Timer instance
    let currentLensData = {}; 
    let allQuestions = []; 
    let currentQuestionIndex = 0;
    let answers = {}; 
    let finalPromptText = ""; 
    let mockCategories = ["General", "Software Development", "Marketing Copy"]; 
    let selectedImageUrl = null; // Stores the selected image URL

    // Mock storage for abandoned prompts (Initial State)
    let abandonedSessions = [
        { id: 101, lensId: 'maverick', lensTitle: 'The Maverick', date: '4:20 PM', step: 1, answers: [] },
        { id: 102, lensId: 'storyteller', lensTitle: 'The Storyteller', date: '4:22 PM', step: 3, answers: [] }
    ]; 
    // --- END Mock storage ---
    
    // --- 3. Define Core Functions ---

    function startLens(lensId) {
        if (typeof LENS_DATA === 'undefined' || !LENS_DATA[lensId]) {
            console.error("LENS_DATA is not loaded or lensId is invalid:", lensId);
            return;
        }

        if (LENS_DATA[lensId].questions.length > 0) {
            currentLensData = LENS_DATA[lensId];
            buildQuestionList(); 
            currentQuestionIndex = 0;
            answers = {}; 
            
            // Safety check for remix container
            if (remixContainer) {
                remixContainer.style.display = "none";
            }
            
            loadQuestion(currentQuestionIndex);
            
            // Start auto-save timer
            startAutoSave();
            
            showScreen("qa"); 
        } 
    }
    
    function resumeSession(session) {
        console.log(`Resuming session ID: ${session.id} for ${session.lensTitle}`);
        currentLensData = LENS_DATA[session.lensId];
        buildQuestionList();
        session.answers.forEach((ans, index) => { answers[index] = ans; });
        currentQuestionIndex = session.step;
        loadQuestion(currentQuestionIndex);
        startAutoSave();
        showScreen("qa");
        abandonedSessions = abandonedSessions.filter(s => s.id !== session.id);
        renderAbandonedList();
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
        if (index >= allQuestions.length) { index = allQuestions.length - 1; currentQuestionIndex = index; }
        if (index < 0) return; 

        const questionData = allQuestions[index];
        qaQuestionTitle.textContent = ""; qaChoicesContainer.innerHTML = ""; qaCustomText.value = ""; qaSkipCheckbox.checked = false;
        qaQuestionTitle.textContent = `(${index + 1}/${allQuestions.length}) ${questionData.question}`;

        questionData.choices.forEach((choice, i) => {
            const choiceId = `choice-${index}-${i}`;
            const choiceElement = document.createElement("div");
            choiceElement.classList.add("qa-choice");
            const choiceKey = questionData.dynamic ? (choice.split('(')[0].trim()) : ''; 
            choiceElement.innerHTML = `<input type="checkbox" id="${choiceId}" value="${choice}" data-choice-key="${choiceKey}"><label for="${choiceId}">${choice}</label>`;
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
        saveCurrentAnswer(); buildQuestionList();
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
                const key = answers[i].key;
                const answer = answers[i].answer;
                if (answer && answer.trim() !== "") {
                    previewString += `\n--- ${key.toUpperCase()} ---\n${answer}\n`;
                }
            }
        }
        qaPreviewText.textContent = finalPromptText.trim() || "Your prompt will appear here..."; 
    }
    
    function saveCurrentAnswer() {
        if (!allQuestions || allQuestions.length === 0 || !allQuestions[currentQuestionIndex]) return;
        let compiledAnswer = "";
        const questionKey = allQuestions[currentQuestionIndex].key;
        if (qaSkipCheckbox.checked) { answers[currentQuestionIndex] = { key: questionKey, answer: "" }; return; }
        const checkedBoxes = qaChoicesContainer.querySelectorAll('input[type="checkbox"]:checked');
        checkedBoxes.forEach(box => { compiledAnswer += `- ${box.value}\n`; });
        if (qaCustomText.value.trim() !== "") { compiledAnswer += `${compiledAnswer.length > 0 ? "\n" : ""}CUSTOM:\n${qaCustomText.value.trim()}\n`; }
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
        saveCurrentAnswer(); stopAutoSave(); 
        updatePreview(); 
        if (currentQuestionIndex < allQuestions.length - 1) { currentQuestionIndex++; loadQuestion(currentQuestionIndex); } else { finishLens(); }
    }

    function goToPrevious() {
        if (currentQuestionIndex > 0) { saveCurrentAnswer(); stopAutoSave(); currentQuestionIndex--; loadQuestion(currentQuestionIndex); } else { goBackToLensesConfirm(); }
    }
    
    function finishLens() {
        stopAutoSave(); 
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
        clearImageSelection(); 
        showScreen("workbench");
    }

    function goBackToLensesConfirm() {
        if (confirm("Are you sure? Your current progress will be lost. (This will be saved to Abandoned Prompts in the next step).")) { 
            saveAbandonedSession(); 
            showScreen("lensSelection"); 
        }
    }

    function startOver() { showScreen("lensSelection"); }
    
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

    // --- SESSION 13: IMAGE FETCH FUNCTIONS ---

    /**
     * Clears image selection and UI state.
     */
    function clearImageSelection() {
        // Only run if elements exist
        if (!imageKeywordsSpan) return;
        selectedImageUrl = null;
        imageKeywordsSpan.textContent = '';
        imageGalleryThumbnails.innerHTML = '';
        imageFetchContainer.style.display = 'none';
        wbBtnConfirmImage.disabled = true;
    }

    /**
     * Extracts mock keywords from the prompt text and simulates search.
     */
    function fetchAndDisplayImages() {
        // Only run if elements exist
        if (!imageKeywordsSpan) return;

        // MOCK: Simple keyword extraction
        const keywords = finalPromptText
            .toLowerCase()
            .split(/\W+/)
            .filter(word => word.length > 4 && !['prompt', 'created', 'remix', 'formal', 'collaborative', 'think', 'step', 'example', 'architect', 'storyteller', 'maverick'].includes(word))
            .slice(0, 3); // Get top 3 meaningful words
        
        const searchTerms = keywords.join(', ');

        if (!searchTerms) {
            imageKeywordsSpan.textContent = 'No suitable keywords found.';
            return;
        }

        // 1. Update UI with keywords
        imageKeywordsSpan.textContent = searchTerms;
        imageFetchContainer.style.display = 'block';
        imageGalleryThumbnails.innerHTML = '';
        wbBtnConfirmImage.disabled = true;

        // 2. MOCK: Simulate image search results (using placeholder URLs)
        const mockImages = [
            { url: 'mock_img_1_focus', src: 'https://via.placeholder.com/60x60/00f0ff/1a1a2e?text=1' },
            { url: 'mock_img_2_context', src: 'https://via.placeholder.com/60x60/f000ff/1a1a2e?text=2' },
            { url: 'mock_img_3_style', src: 'https://via.placeholder.com/60x60/ffffff/1a1a2e?text=3' }
        ];

        // 3. Render thumbnails
        mockImages.forEach((imgData, index) => {
            const img = document.createElement('img');
            img.src = imgData.src;
            img.dataset.fullUrl = `https://mock.unsplash.com/full_res_${imgData.url}`;
            img.classList.add('thumbnail');
            
            // Attach selection handler
            img.addEventListener('click', () => selectImage(img, imgData.url));
            imageGalleryThumbnails.appendChild(img);
        });

        console.log(`MOCK IMAGE FETCH: Searching Unsplash for: ${searchTerms}`);
    }

    /**
     * Selects an image and enables the attachment button.
     */
    function selectImage(selectedElement, imageUrl) {
        // Clear previous selections
        document.querySelectorAll('.thumbnail').forEach(thumb => {
            thumb.style.border = 'none';
        });

        // Highlight selected image
        selectedElement.style.border = '3px solid #00f0ff'; 
        
        // Store URL and enable button
        selectedImageUrl = selectedElement.dataset.fullUrl;
        wbBtnConfirmImage.disabled = false;
    }

    /**
     * Attaches the selected image URL to the final prompt data.
     */
    function attachSelectedImage() {
        if (selectedImageUrl) {
            console.log("ATTACHED IMAGE URL:", selectedImageUrl);
            alert(`Image attached! URL: ${selectedImageUrl.substring(0, 40)}...`);
        }
        clearImageSelection();
    }


    // --- SESSION 12: AUTO-SAVE FUNCTIONS ---

    function startAutoSave() {
        if (autoSaveTimer) { clearInterval(autoSaveTimer); }
        autoSaveTimer = setInterval(saveAbandonedSession, AUTO_SAVE_INTERVAL);
        console.log(`Auto-save started. Saving every ${AUTO_SAVE_INTERVAL / 1000} seconds.`);
    }

    function stopAutoSave() {
        if (autoSaveTimer) {
            clearInterval(autoSaveTimer);
            autoSaveTimer = null;
            console.log("Auto-save stopped.");
        }
    }

    function saveAbandonedSession() {
        if (!currentLensData || allQuestions.length === 0) return;
        
        // Final Fix for crash: Ensure lensId is set before using it to find existing sessions
        if (!currentLensData.lensId) { 
            currentLensData.lensId = currentLensData.title.toLowerCase().replace(/\s/g, ''); 
        } 
        
        const sessionData = {
            lensId: currentLensData.lensId, 
            lensTitle: currentLensData.title,
            date: new Date().toLocaleTimeString(),
            step: currentQuestionIndex,
            answers: Object.values(answers)
        };
        
        let existingIndex = abandonedSessions.findIndex(s => s.lensId === currentLensData.lensId);
        
        if (existingIndex !== -1) {
            abandonedSessions[existingIndex] = { ...abandonedSessions[existingIndex], ...sessionData };
            console.log("Auto-Saved: Updated existing session.", sessionData.date);
        } else {
            sessionData.id = Date.now(); 
            abandonedSessions.push(sessionData);
            console.log("Auto-Saved: Created new session.", sessionData.date);
        }
        
        if (lensSelectionScreen.classList.contains("active")) {
             renderAbandonedList();
        }
    }
    
    /**
     * Renders the abandoned session list on the main screen.
     */
    function renderAbandonedList() {
        // Only run if list element exists
        if (!abandonedList) return; 

        abandonedList.innerHTML = ""; // Clear list
        
        if (abandonedSessions.length === 0) {
            abandonedList.innerHTML = '<li class="abandoned-item">No abandoned sessions found.</li>';
            if (abandonedPromptsContainer) abandonedPromptsContainer.style.display = 'none'; // Hide container if empty
            return;
        }
        
        if (abandonedPromptsContainer) abandonedPromptsContainer.style.display = 'block'; // Show container if items exist
        
        abandonedSessions.forEach(session => {
            const li = document.createElement("li");
            li.classList.add("abandoned-item");
            li.innerHTML = `
                <div class="abandoned-details">
                    <strong>${session.lensTitle}</strong>
                    <small>(Step ${session.step + 1} / Last saved: ${session.date})</small>
                </div>
                <button class="qa-nav-btn resume-btn" data-session-id="${session.id}">Resume</button>
                <button class="delete-btn" data-session-id="${session.id}">&times;</button>
            `;
            
            // Attach resume listener
            li.querySelector('.resume-btn').addEventListener('click', () => resumeSession(session));
            
            // Attach delete listener
            li.querySelector('.delete-btn').addEventListener('click', (e) => {
                e.stopPropagation(); // Prevent resume from also triggering
                if (confirm("Are you sure you want to delete this abandoned session?")) {
                    deleteAbandonedSession(session.id);
                }
            });
            
            abandonedList.appendChild(li);
        });
    }

    function deleteAbandonedSession(id) {
        abandonedSessions = abandonedSessions.filter(s => s.id !== id);
        console.log(`Deleted session ID: ${id}`);
        renderAbandonedList();
    }


    // --- General App Flow Functions ---
    
    function showScreen(screenId) {
        // Clear timer if we are leaving Q&A screen
        if (screenId !== 'qa') { stopAutoSave(); }
        if (screenId === 'lensSelection') { renderAbandonedList(); } // Refresh list on main screen

        lensSelectionScreen.style.display = "none"; lensSelectionScreen.classList.remove("active", "hidden");
        qaScreen.style.display = "none"; qaScreen.classList.remove("active", "hidden");
        workbenchScreen.style.display = "none"; workbenchScreen.classList.remove("active", "hidden");
        vaultScreen.style.display = "none"; vaultScreen.classList.remove("active", "hidden");

        let screenElement;
        switch (screenId) {
            case "lensSelection": screenElement = lensSelectionScreen; screenElement.style.display = "block"; break;
            case "qa": screenElement = qaScreen; screenElement.style.display = "flex"; break;
            case "workbench": screenElement = workbenchScreen; screenElement.style.display = "flex"; break;
            case "vault": screenElement = vaultScreen; screenElement.style.display = "flex"; loadVaultPrompts(); break;
            default: console.error("Unknown screen ID:", screenId); return;
        }
        screenElement.classList.add("active");
        [lensSelectionScreen, qaScreen, workbenchScreen, vaultScreen].forEach(scr => { if (scr !== screenElement) { scr.classList.add("hidden"); } });
    }

    // --- Export and Vault Functions (Simplified) ---

    function handleExport() {
        const format = exportFormatSelect.value;
        const title = finalPromptText.split('\n')[2]?.trim().replace(/[^a-zA-Z0-9_]/g, '_').substring(0, 30) || "Exported_Prompt";
        const exportData = { prompt_text: finalPromptText, format: format, title: title, image_url: selectedImageUrl }; 
        console.log("--- MOCK EXPORT COMMAND ---");
        console.log(`Sending data to Python for ${format} export:`, exportData);
        alert(`MOCK EXPORT: Attempting to create a .${format} file. Check console for data sent to backend.`);
    }

    function openSaveModal() {
        // Re-enable pre-fill logic now that the modal appears
        const firstLine = finalPromptText.split('\n')[2]?.trim() || "Untitled Prompt"; 
        saveTitleInput.value = firstLine.replace(/^---.*---/,'').trim().substring(0, 50); 
        loadCategoriesForSave(); 
        newCategoryInput.classList.add("hidden"); 
        saveTagsInput.value = "";
        savePurposeTextarea.value = ""; 

        saveModal.style.display = "block"; 
    } 

    function closeSaveModal() { saveModal.style.display = "none"; }
    function loadCategoriesForSave() {
        saveCategorySelect.innerHTML = ""; 
        mockCategories.forEach(cat => {
            const option = document.createElement("option"); option.value = cat; option.textContent = cat; saveCategorySelect.appendChild(option);
        });
    }
    function showNewCategoryInput() { newCategoryInput.classList.remove("hidden"); newCategoryInput.focus(); }
    function handleConfirmSave() {
        const title = saveTitleInput.value.trim(); let category = saveCategorySelect.value;
        const tags = saveTagsInput.value.trim(); const purpose = savePurposeTextarea.value.trim();
        const newCategoryName = newCategoryInput.value.trim();
        if (!title) { alert("Please enter a title for the prompt."); return; }
        if (!newCategoryInput.classList.contains("hidden") && newCategoryName) { category = newCategoryName; if (!mockCategories.includes(category)) { mockCategories.push(category); } }
        const promptData = { title, category, tags, purpose, promptText: finalPromptText, image_url: selectedImageUrl }; 
        savePromptToVault(promptData); closeSaveModal();
    }
    function savePromptToVault(promptData) { console.log("--- MOCK SAVE ---"); console.log("Saving prompt data:", promptData); alert("Prompt data logged to console (mock save)."); }
    function loadVaultPrompts() {
        const vaultList = document.getElementById("vault-prompt-list"); vaultList.innerHTML = "";
        const mockPrompts = [
            { id: 1, title: "Sample Prompt 1", category: "General", tags: "test, sample", purpose: "Just a test." },
            { id: 2, title: "Code Generator Prompt", category: "Software Development", tags: "python, code", purpose: "Generates Python functions." }
        ];
        if (mockPrompts.length === 0) { vaultList.innerHTML = '<li class="vault-list-item"><h4>No prompts saved yet.</h4></li>'; return; }
        mockPrompts.forEach(p => {
            const li = document.createElement("li"); li.classList.add("vault-list-item"); li.dataset.promptId = p.id; 
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
    
    // --- NEW LISTENERS FOR SESSION 13 ---
    // Safely check for button existence before attaching listener
    if (wbBtnFetchImage) wbBtnFetchImage.addEventListener("click", fetchAndDisplayImages);
    if (wbBtnConfirmImage) wbBtnConfirmImage.addEventListener("click", attachSelectedImage);
    // --- END NEW LISTENERS ---

    // Vault and Modal Listeners
    wbBtnExport.addEventListener("click", handleExport);
    wbBtnSave.addEventListener("click", openSaveModal); 
    closeSaveModalBtn.addEventListener("click", closeSaveModal); 
    cancelSaveBtn.addEventListener("click", closeSaveModal);     
    confirmSaveBtn.addEventListener("click", handleConfirmSave); 
    newCategoryBtn.addEventListener("click", showNewCategoryInput); 
    vaultBtnBackToLenses.addEventListener("click", () => showScreen("lensSelection"));
    vaultBtnNewPrompt.addEventListener("click", () => showScreen("lensSelection")); 
    
    // --- Initial Setup ---
    renderAbandonedList(); 
    showScreen("lensSelection"); 
    
});