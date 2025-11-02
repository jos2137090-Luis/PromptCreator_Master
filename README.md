Perfect. please reflect thru out your writing of the design of this that the coder and the coding should also not short change a single element and if it turns out to be impossible that the cider use of of the box thinking and engenuity in establishing an equal or very similar outcome. And that should be very rare if at all. And all that the cider considers in this Catagory that they state and also echo to me the particulars by doing what you do which is echo and check in prior to proceeding until all is approved.... I believe that you can integrate this without echoing back so please go ahead and create the code and coding using all free and no cost way.. Here is the design.  
Here is the final, complete design specification for the "Prompt Creator Master." 
 
Design Specification: The Prompt Creator Master 
Version: 1.0 Date: 10/25/2025 
A Note to the Developer 
This document outlines a "no-compromises" vision for the "Prompt Creator Master." Every feature, module, and UI element described herein is considered critical to the project's success. 
Your primary directive is to implement this specification exactly as written. 
Ingenuity and the "Echo-Check" Protocol: It is understood that technical challenges may arise. If a specific feature, as described, proves to be genuinely "impossible" with the chosen technology stack, you are not to abandon it. Instead, you are to use "out-of-the-box thinking and ingenuity" to design an alternative solution that achieves an equal or functionally similar outcome. 
However, you must not proceed with such a change unilaterally. Before implementing any deviation, you are instructed to adopt the following protocol: 
1.	Pause development on that specific feature. 
2.	Document the technical limitation in detail. 
3.	Propose your alternative, high-ingenuity solution, explaining how it meets the original requirement's intent. 
4.	Check in with the originator (the user) for approval, echoing the problem and your proposed solution. 
5.	Proceed only after receiving explicit approval. 
This "echo and check-in" protocol is non-negotiable for any changes that deviate from this document. 
1.	System Vision & Core Architecture 
1.1.	Project Goal 
To create the "ultimate prompt making machine"—a comprehensive, offline-first desktop application that guides a user through a specialized, context-aware process to build, refine, version, and store perfect prompts. 
1.2.	UI/UX Philosophy & Visual Design 
The application will have a clean, modern, and professional aesthetic designed to facilitate deep focus. 
●	Theme: Professional Dark Mode. 
○	Primary Background: A dark charcoal-blue (#1a1a2e). 
○ Secondary Background (Panels/Sidebars): A slightly lighter charcoal-blue (#1f1f3a). 
○ Text (Standard): A high-contrast, very light grey (#f0f0f5). 
○ Text (Headings): A clean white (#ffffff). 
●	Accent Colors: 
○	Primary Accent (Buttons, Links, Active States): A vibrant cyan (#00f0ff). 
○ Secondary Accent (Notifications, Highlights, Warnings): A vibrant magenta 
(#f000ff). 
●	Typography: A clean, highly-legible sans-serif font family (e.g., "Inter," "Roboto," or "SF Pro"). 
●	Button Style: Flat, minimalist design with rounded corners. No hard borders. 
○	Standard State: Solid primary background color (#1f1f3a) with cyan text (#00f0ff). 
○ Hover State: The button's background will emit a soft cyan "glow" (via box-shadow) and the text will brighten. 
○ Click State: The button will appear to "press in" slightly. 
1.3.	Technical Architecture 
●	Model: Offline-First. The application must be 100% functional for all core features (all creation, saving, editing, and vault management) without an internet connection. 
●	Framework: A cross-platform desktop application framework such as Tauri (preferred for its low-resource use) or Electron. This ensures it is a free-to-build, locally-run program. 
●	Database: A local, embedded database (e.g., SQLite or PouchDB) to store the "Prompt Vault" and "Abandoned Prompts" queue locally on the user's machine. 
●	Online-Only Functions: An internet connection is only required for two specific, userinitiated actions: 
1.	Image Fetching (Section 4.2) 
2.	A/B Testing Analysis (Section 8) 
2.	The Core Interaction Model: The Choice-Based Interface 
This is a universal UI component that must be used for every single question the program asks the user within the 9-Lens System. This design provides maximum flexibility, combining guided choice with total user freedom. 
For each question, the interface will present: 
1.	The Question: (e.g., "What specific role should the AI adopt?"). 
2.	Pre-made Checkboxes (Multi-select): A list of 3-5 common, pre-made choices. The user can select more than one. 
3.	The "Skip" Checkbox: A single checkbox labeled [ ] Not Applicable / Skip this step. When checked, this step's data will be omitted from the final prompt. 
4.	Custom Text Input Box: A free-text box labeled "Custom Answer" where the user can write their own answer from scratch, or add to the pre-made choices. 
Logic: The system will compile all checked boxes and the custom text into the final prompt component. 
3.	The 9-Lens System 
The program's main screen will ask the user to select one of the following 9 lenses. 
Lens 1: The Architect (Foundational Framework Creator) 
●	Philosophy: Methodical and comprehensive. Builds robust prompts from the ground up, ensuring no core component is missing. 
●	Core Instruction Set (Program's Q&A): 
○ 1. Role & Persona: "What specific role should the AI adopt?" 
■ [ ] Skeptical senior software architect 
■ [ ] Enthusiastic science teacher for 10-year-olds 
■ [ ] Supportive project manager 
■ [ ] Not Applicable / Skip 
■ [ Custom Answer: e.g., "A 15th-century historian"] 
○ 2. Core Task & Goal: "What is the single most important action you want performed?" 
■ [ ] Critique or review a piece of text/code 
■ [ ] Explain a complex concept 
■ [ ] Generate a list of ideas 
■ [ ] Summarize a long document 
■ [ ] Not Applicable / Skip 
■ [ Custom Answer: e.g., "Draft a 3-week project plan"] 
○ 3. Context & Background: "What key information does the AI need to know?" 
■ [ ] The target audience is [enter audience] 
■ [ ] The user's skill level is [Beginner/Intermediate/Expert] 
■ [ ] The key data is [paste data/text here] 
■ [ ] Not Applicable / Skip 
■ [ Custom Answer: e.g., "The project team has 3 developers"] 
○ 4. Constraints & Requirements: "What are the rules, boundaries, and nonnegotiables?" 
■ [ ] Output must be under [number] words 
■ [ ] Do not use technical jargon 
■ [ ] Format the response as a JSON object 
■ [ ] The budget is [number] 
■ [ ] Not Applicable / Skip 
■ [ Custom Answer: e.g., "Cite all sources"] 
○ 5. Exemplars & Format: "Describe the desired tone and structure." 
■ [ ] Formal report style 
■ [ ] Conversational, friendly tone 
■ [ ] A bulleted list with headings 
■ [ ] Not Applicable / Skip 
■ [ Custom Answer: e.g., "Here is a perfect example of the output I want: ..."] ● Example Crafting & Refinement (Internal Logic): 
○ After step 5, the program will ask, "Would you like me to generate a sample of the output format you just described (e.g., a sample of a formal report structure) so you can confirm the style?" 
○ Before finalizing, the program will ask, "Looking at the drafted prompt, is the sequence of instructions logical, or should we reorder them? For example, should the 'Constraints' come before the 'Core Task'?" 
Lens 2: The Maverick (Strategic Intent Creator) 
●	Philosophy: Goal-oriented and clever. Focuses on the psychology of the interaction to coax out nuanced, creative, or deeply reasoned responses. 
●	Core Instruction Set (Program's Q&A): 
○ 1. Choose a Strategy: "Welcome, Maverick. Let's engineer the AI's thinking process. Choose a primary strategy:" 
■ [ ] The Socratic Method (Force step-by-step reasoning) 
■ [ ] The Feynman Technique (Force extreme clarity/simplicity) 
■ [ ] The Devil's Advocate (Stress-test an idea) 
■ [ ] Not Applicable / Skip 
■ [ Custom Answer: e.g., "A 'reverse' prompt where I provide the answer"] 
○ 2. Define the Target: "What is the core idea, problem, or concept you want to apply this strategy to?" 
■ [ ] A business plan or idea 
■ [ ] A complex scientific topic 
■ [ ] A piece of code or logic 
■ [ ] A personal decision 
■ [ ] Not Applicable / Skip 
■ [ Custom Answer: e.g., "The plot of my novel"] 
○ 3. Refine the Strategy: "Based on your choice, let's add specifics." (This step is dynamic based on the answer to Q1). 
■ If "Socratic": [ ] Challenge all initial assumptions [ ] Present a chain of reasoning [ ] Ask me questions back 
■ If "Feynman": [ ] Explain to a 12-year-old [ ] Use a simple analogy [ ] Identify common misunderstandings 
■ If "Devil's Advocate": [ ] Find the top 3 reasons it will fail [ ] List all ethical concerns [ ] Provide evidence for counter-arguments ● Example Crafting & Refinement (Internal Logic): 
○ The program will offer, "For the 'Devil's Advocate' strategy you selected, shall I show you an example of how the AI might structure its critique? This helps set the level of rigor." 
○ Before finalizing, the program will ask, "Does the chosen strategy feel too confrontational, or is that the exact level of critical feedback you need?" 
Lens 3: The Storyteller (Persona & Scenario Weaver) 
● Philosophy: For immersion and role-playing. Builds a rich world and character for consistent, engaging multi-turn conversations, creative writing, or simulations. ● Core Instruction Set (Program's Q&A): 
○ 1. The Character: "Define the AI's character: Name, core identity, 3 key traits, 1 flaw." 
■ [ ] Name: [text box] 
■ [ ] Identity: [text box, e.g., "Cynical Mars commander"] 
■ [ ] Key Traits: [e.g., Resourceful, Protective, Secretive] 
■ [ ] Key Flaw: [e.g., Overly mistrustful] 
■ [ ] Not Applicable / Skip 
■ [ Custom Answer: "Use the attached character bio: ..."] 
○ 2. The Setting & Scenario: "Where and when is this taking place? What is the immediate problem?" 
■ [ ] Location: [text box] 
■ [ ] Time Period: [text box] 
■ [ ] Immediate Situation: [text box, e.g., "The life support system is failing"] ■ [ ] Not Applicable / Skip 
○ 3. The User's Role: "Who are you in this scenario? What is your relationship to the 
AI character?" 
■ [ ] The newly arrived, idealistic doctor 
■ [ ] A rival faction leader 
■ [ ] A subordinate asking for help 
■ [ ] Not Applicable / Skip 
■ [ Custom Answer: "I am a disembodied voice in its head"] 
○ 4. The Rules of the World: "What specific lore or physics must be respected?" 
■ [ ] Magic is powered by [text box] 
■ [ ] FTL travel is impossible 
■ [ ] The corporation is always listening 
■ [ ] Not Applicable / Skip 
■ [ Custom Answer: "All dialogue must be in iambic pentameter"] ● Example Crafting & Refinement (Internal Logic): 
○ The program will offer, "Based on your character description, would you like me to generate a sample of dialogue from this character so we can ensure the tone and voice are right?" 
○ Before finalizing: "Is the character's flaw ('overly mistrustful') strong enough to create interesting conflict, or should we make it more pronounced?" 
Lens 4: The Editor (Universal Prompt Refiner) 
●	Philosophy: Reactive and iterative. Takes a user's existing, flawed prompt and elevates it through a strict refinement protocol. 
●	Core Instruction Set (Program's Q&A): 
○	1. Paste Your Prompt: "Paste your current draft prompt in the box below." ■ [ Large Text Box for pasting ] 
○ (After pasting, the program analyzes and asks the following): 
○ 2. Clarity Check: "Your prompt includes vague terms like 'make it better.' Can you replace this with a concrete action?" 
■ [ ] Improve readability by using shorter sentences 
■ [ ] Add more technical detail 
■ [ ] Check for logical fallacies 
■ [ ] Not Applicable / Skip 
■ [ Custom Answer: "Rewrite it to be more persuasive"] 
○ 3. Role & Context Injection: "Your prompt doesn't assign a clear role. What persona would be most helpful?" 
■ [ ] A domain expert in [topic] 
■ [ ] A creative partner 
■ [ ] A simple data processor 
■ [ ] Not Applicable / Skip 
■ [ Custom Answer: "A supportive mentor"] 
○ 4. Constraint Audit: "I notice your prompt is missing output constraints. What should we add?" 
■ [ ] Add a word count: [number] 
■ [ ] Add a specific format: [e.g., email, JSON, memo] 
■ [ ] Add a tone: [e.g., professional, casual] 
■ [ ] Not Applicable / Skip 
○ 5. Strategic Enhancement: "Could we improve the reasoning?" 
■ [ ] Add 'Think step-by-step' 
■ [ ] Add 'Provide a one-sentence summary at the end' 
■ [ ] Add 'Explain your reasoning' 
■ [ ] Not Applicable / Skip 
●	Example Crafting & Refinement (Internal Logic): 
○	The program will offer, "Before we begin, would you like me to show you a 'before and after' example of a prompt I've refined using this method?" 
○ Before finalizing: "After my suggested revisions, does the new prompt capture every subtlety of your original intent, or did we lose anything you wanted to keep?" 
Lens 5: The Freemason Manufacturer (Tool & Function Creator) 
●	Philosophy: Precise and blueprint-oriented. Designed to create the perfect prompt for generating code, functions, or software tools. 
●	Core Instruction Set (Program's Q&A): 
○ 1. Core Utility: "In one sentence, what problem does this tool solve or what function does it perform?" 
■ [ ] It sanitizes user input in a web form 
■ [ ] It calculates a financial metric (e.g., compound interest) 
■ [ ] It parses data from one format to another 
■ [ ] Not Applicable / Skip 
■ [ Custom Answer: "It generates a unique avatar from a user ID"] 
○ 2. Inputs & Data Sources: "What exactly does the function take in? Be specific about data types." 
■ [ ] A single string 
■ [ ] A JSON object with keys [key1, key2, ...] 
■ [ ] An array of numbers 
■ [ ] Not Applicable / Skip 
■ [ Custom Answer: "A file path to a .csv file"] 
○ 3. Outputs & Deliverables: "What exactly does it return or produce?" 
■ [ ] A single boolean (true/false) 
■ [ ] A new JSON object 
■ [ ] A sanitized string 
■ [ ] Not Applicable / Skip 
■ [ Custom Answer: "A new file saved to /output"] 
○ 4. Processing Logic & Rules: "Describe the step-by-step algorithm or business logic." 
■ [ ] 1. Check for [pattern]. 2. Escape [characters]. 3. Return string. ■ [ ] Must handle [error type] gracefully 
■ [ ] Use the following formula: [formula] 
■ [ ] Not Applicable / Skip 
■ [ Custom Answer: "See the attached pseudocode..."] 
○ 5. Environment & Constraints: "What are the technical requirements?" 
■ [ ] Must be written in [Python 3.9 / JavaScript ES6 / etc.] 
■ [ ] Must not use external libraries 
■ [ ] Must be highly optimized for speed 
■ [ ] Not Applicable / Skip 
■ [ Custom Answer: "Include full docstrings and type hinting"] ● Example Crafting & Refinement (Internal Logic): 
○ The program will offer, "Based on your description, I can generate a sample function signature (e.g., def calculate_interest(principal, rate, time):) to ensure we're aligned on the inputs and function name." 
○ Before finalizing: "Have we considered all edge cases in the processing logic? For example, what should happen if the input is null or an unexpected data type?" 
Lens 6: The Goal-Maker (Objective & Achievement Lens) 
●	Philosophy: Action-oriented and strategic. Transforms vague ambitions into a clear, actionable plan with defined milestones and success metrics. 
●	Core Instruction Set (Program's Q&A): 
○ 1. The North Star: "What is the ultimate, inspiring goal?" 
■ [ ] Become a published author 
■ [ ] Launch a profitable side business 
■ [ ] Run a marathon 
■ [ ] Learn a new skill (e.g., coding, a language) 
■ [ ] Not Applicable / Skip 
■ [ Custom Answer: "Organize my entire digital life"] 
○ 2. Success Metrics: "How will you measurably know you've succeeded?" 
■ [ ] Achieve [number] in revenue/profit 
■ [ ] Complete a [e.g., 50,000-word manuscript, 26.2-mile race] 
■ [ ] Be certified at [level] 
■ [ ] Not Applicable / Skip 
■ [ Custom Answer: "Achieve $1,000/month in net profit within 12 months"] 
○ 3. Current Reality & Constraints: "Where are you now? What are your major limitations?" 
■ [ ] Time constraint: I can only dedicate [number] hours per week 
■ [ ] Budget constraint: I have $[number] to start 
■ [ ] Skill constraint: I am a beginner in [area] 
■ [ ] Not Applicable / Skip 
■ [ Custom Answer: "My main obstacle is procrastination"] 
○ 4. Key Milestones: "What are the 3-5 major phases or checkpoints on the path?" ■ [ ] 1. Research & Outline. 2. First Draft. 3. Edit & Revise. 
■ [ ] 1. Build MVP. 2. Acquire First 10 Users. 3. Monetize. 
■ [ ] Not Applicable / Skip 
■ [ Custom Answer: "1. Brainstorm. 2. Prototype. 3. Test. 4. Launch."] ● Example Crafting & Refinement (Internal Logic): 
○ The program will offer, "I can provide an example of a well-structured goal plan for 
'Learn to Play Guitar' to illustrate the level of detail we're aiming for in each step." 
○ Before finalizing: "Are your success metrics truly measurable and time-bound? 'Get in shape' is vague, but 'Run a 5k in under 30 minutes in 6 months' is excellent." 
Lens 7: The Wellness Guide (Health & Personal Growth Lens) 
●	Philosophy: Empathetic and holistic. Crafts prompts for physical health, mental wellbeing, and personal development, prioritizing safety, nuance, and a supportive tone. 
●	Core Instruction Set (Program's Q&A): 
○ 1. Area of Focus: "What aspect of well-being are we addressing?" 
■ [ ] Mental clarity / Focus 
■ [ ] Physical fitness / Energy levels 
■ [ ] Emotional resilience / Stress management 
■ [ ] Work-life balance 
■ [ ] Developing a new habit 
■ [ ] Not Applicable / Skip 
■ [ Custom Answer: "Improving my sleep quality"] 
○ 2. Desired Feeling & Outcome: "What do you want to feel or achieve?" 
■ [ ] Feel more energized throughout the day 
■ [ ] Develop techniques to manage anxiety 
■ [ ] Create a sustainable morning routine 
■ [ ] Not Applicable / Skip 
■ [ Custom Answer: "To feel less reactive to bad news"] 
○ 3. Philosophical Approach: "What is your preferred style for the AI's response?" 
■ [ ] Science-based and data-driven (e.g., citing studies) 
■ [ ] Mindful and spiritual (e.g., meditation, journaling) 
■ [ ] Practical and action-oriented (e.g., a simple checklist) 
■ [ ] A gentle, Socratic guide (e.g., asking me questions back) 
■ [ ] Not Applicable / Skip 
○ 4. Safety & Boundaries: "Are there any specific triggers, limitations, or preferences to avoid?" 
■ [ ] **Crucial: Instruct the AI to state 'I am not a medical professional'** 
■ [ ] Do not suggest intense cardio 
■ [ ] Focus on solutions, not just identifying problems 
■ [ ] Not Applicable / Skip 
■ [ Custom Answer: "Avoid any mention of dieting or weight"] ● Example Crafting & Refinement (Internal Logic): 
○ The program will offer, "I can generate a sample snippet of the 'Mindful and spiritual' supportive language you requested, so you can confirm the AI's tone is correct." 
○ Before finalizing: "Does this prompt feel supportive and actionable, without being overly prescriptive? We must ensure the AI is instructed to act as a guide, not a doctor." 
Lens 8: The Deep Researcher (Legal & Academic Lens) 
●	Philosophy: Meticulous and evidence-based. Designed for complex research tasks, legal analysis, academic writing, and any domain requiring high accuracy and citation. 
●	Core Instruction Set (Program's Q&A): 
○ 1. Core Research Question: "What is the specific, narrow question you are trying to answer?" 
■ [ ] What were the economic impacts of [event]? 
■ [ ] What is the current case law regarding [legal doctrine]? ■ [ ] Compare and contrast [theory 1] and [theory 2] 
■ [ ] Not Applicable / Skip 
■ [ Custom Answer: "What is the legal standard for 'fair use' in the 9th Circuit?"] 
○ 2. Domain & Scope: "What is the field of study and what are the boundaries?" 
■ [ ] Field: [e.g., U.S. economic history, 1930-1939] 
■ [ ] Field: [e.g., Current U.S. copyright case law] 
■ [ ] Do not include analysis from other countries/jurisdictions 
■ [ ] Not Applicable / Skip 
○ 3. Source Requirements: "What types of sources are required, and which should be prioritized?" 
■ [ ] Peer-reviewed academic journals 
■ [ ] Primary legal documents (statutes, case law) 
■ [ ] Government statistics and reports 
■ [ ] Do not use blogs, opinion pieces, or general web articles 
■ [ ] Not Applicable / Skip 
○ 4. Output Format & Citation: "What is the desired deliverable and citation style?" 
■ [ ] A literature review 
■ [ ] A legal briefing memo 
■ [ ] A summary table of key findings 
■ [ ] Citation Style: [APA 7th / Bluebook / MLA / Chicago] 
■ [ ] Not Applicable / Skip 
■ [ Custom Answer: "An annotated bibliography"] ● Example Crafting & Refinement (Internal Logic): 
○ The program will offer, "I can provide an example of how the AI might structure a response, including how it would introduce a counter-argument or format a key citation in Bluebook style." 
○ Before finalizing: "Is your research question narrow enough to be answered deeply? A broad question like 'Tell me about WWII' will produce a shallow summary. A narrow one like yours is excellent." 
Lens 9: The Presenter (Communication & Delivery Lens) 
●	Philosophy: Audience-aware and multi-format. Crafts prompts for any form of presentation—scripts, emails, slide decks, sales pitches, or difficult conversations. 
●	Core Instruction Set (Program's Q&A): 
○	1. Core Message & Call to Action (CTA): "What is the one thing you want your audience to know, feel, or do?" 
■ [ ] Core Message: [text box] 
■ [ ] Call to Action: [e.g., Sign up for a demo, Approve the budget] ■ [ ] Not Applicable / Skip 
○ 2. Audience Analysis: "Who are they? What are their likely objections?" 
■ [ ] Skeptical executives (Objection: cost) 
■ [ ] Non-technical managers (Objection: complexity) 
■ [ ] A busy hiring manager (Objection: time) 
■ [ ] Not Applicable / Skip 
■ [ Custom Answer: "An angry customer who wants a refund"] 
○ 3. Medium & Format: "How will this be delivered?" 
■ [ ] A professional email 
■ [ ] A 10-slide PowerPoint deck (outline only) 
■ [ ] A script for a phone call or 5-minute verbal pitch 
■ [ ] Not Applicable / Skip 
■ [ Custom Answer: "A single, compelling paragraph for a website"] 
○ 4. Desired Tone & Persona: "How do you want to sound?" 
■ [ ] Authoritative and data-driven 
■ [ ] Empathetic and collaborative 
■ [ ] Enthusiastic and inspiring 
■ [ ] Calm, firm, and de-escalating 
■ [ ] Not Applicable / Skip 
○ 5. Structure & Hook: "How should it begin and end?" 
■ [ ] Start with a surprising statistic 
■ [ ] Start with a personal story 
■ [ ] Use the 'Problem-Agitate-Solution' framework 
■ [ ] End with a clear, singular Call to Action 
■ [ ] Not Applicable / Skip 
●	Example Crafting & Refinement (Internal Logic): 
○	The program will offer, "I can generate an example 'Subject Line' for your email or an 'Opening Hook' for your verbal pitch, based on the chosen hook and tone." 
○ Before finalizing: "Does the Call to Action feel compelling and easy to execute for the specific audience we've defined? Is 'Sign up for a demo' the right ask, or should it be 'Reply for a 5-minute chat'?" 
4.	The "Prompt Workbench" (Refinement & Remix) 
This is the interactive module where a draft prompt from the Lens Engine is finalized. It will be a split-screen UI. 
4.1.	The "Remix" Function 
After a lens generates a draft prompt, the user can click a "Remix This Prompt" button (with the primary cyan accent). The system will then generate 3 alternative versions of the draft prompt and present them with rationales. 
●	Remix 1 (Tone Shift): "Rewrite this prompt, but make it more 
[Formal/Casual/Authoritative/Empathetic]." 
○	Rationale: "Choose this version for a more professional and direct response." 
●	Remix 2 (Perspective Shift): "Rewrite this prompt, but reframe it from a different perspective (e.g., change it from a command to a question; reframe it as a collaborative request)." 
○	Rationale: "Choose this version to encourage a more creative or exploratory answer." 
●	Remix 3 (Structural Shift): "Rewrite this prompt, but alter its structure (e.g., add a 'Chain of Thought' instruction; convert flat instructions to a numbered list)." 
○	Rationale: "Choose this version to force a more logical, step-by-step output." 
The user can then select their preferred version (Original, 1, 2, or 3) as the "Final Prompt." 
4.2.	The "Image Fetch" Module 
This is an online-only action. 
1.	Once a "Final Prompt" is selected, a button "Find Representative Image" will appear. 
2.	Clicking it will auto-extract key nouns and themes from the prompt. 
3.	These keywords will be used to query a free, open image API (e.g., Unsplash). 
4.	The UI will display 5-10 image results. The user will click one image to select it. 
5.	The final output (text + image) is now ready for the Vault or Export. 
5.	The "Prompt Vault" (Logging, Versioning & Export) 
This is the system's persistent, local database. 
5.1.	The "Save to Vault" Workflow 
1.	In the Workbench, the user clicks "Save to Vault." 
2.	A modal window will appear, prompting for: 
○ Title: (Auto-filled with the first line of the prompt). 
○ Tags: (User can enter comma-separated tags, e.g., code, python, utility, work). 
○ Category: (A dropdown to select/create a category, e.g., Software Development, Marketing Copy). 
○ Conclusion & Background (Purpose): A multi-line text box: "In a small section, please describe the background on how this prompt adds to your overall functionability or system. (Why was this created? What problem does it solve?)." 
5.2.	Full Version History (Core Feature) 
This is a critical feature. The vault must not simply overwrite. 
1.	Logic: When a user "saves" a prompt that was opened from the vault, the system saves it as a new version linked to the original prompt_id. It will store a diff of the text and log the date. 
2.	UI: When viewing a prompt in the vault, a "History" button will be visible. Clicking it opens a timeline view (similar to a 'git log') allowing the user to view, compare, and revert to any previous version of that prompt. 
5.3.	"Index / Table of Contents" Generator 
The Vault UI will have a button: "Generate Full Index." This will generate a new, printable document (HTML or PDF) that serves as a Table of Contents for the entire vault, organized by Category, and listing the Title and Purpose for each prompt. 
5.4.	Multi-Format Export Module 
From the Workbench or the Vault, the user must be able to export the Final Prompt Text and the Representative Image into the following formats: 
●	Microsoft Word (.docx) 
●	PDF (.pdf) 
●	Markdown (.md) 
●	HTML (.html) 
6.	The "Abandoned Prompts" Queue 
This component ensures no work is lost. 
●	Auto-Save Logic: The system will auto-save the user's progress through any Lens Q&A (every 10 seconds) to the local database in a special "incomplete" table. 
●	Resume Workflow: On the main "Lens Selection" screen, a section "Abandoned Prompts" will list all incomplete sessions, tagged with the Lens and date_started. Clicking one will re-launch the Lens Q&A, with all previously entered answers pre-filled, allowing 
the user to "continue at my choosing." 
7.	Advanced Creation Modes 
These modes will be available from the main menu as alternatives to the 9-Lens System. 
7.1.	The "Visual Node Editor" 
As an alternative to the linear Q&A, the user can select "Node Editor." 
●	UI: A blank canvas. The user can drag-and-drop "nodes" from a sidebar (e.g., Role Node, Task Node, Constraint Node, Context Node). 
●	Function: The user types their content into each node and then visually connects them with "wires" to build a prompt. This provides a non-linear, visual way to achieve the same result as "The Architect" lens. 
7.2.	The "Lens Stacker" 
This mode allows users to chain lenses for multi-stage prompt generation. 
●	UI: The user will see two columns: "Available Lenses" and "My Stack." They can drag lenses into the stack (e.g., 1. Goal-Maker, 2. Freemason, 3. Presenter). 
●	Workflow: The program will run the Q&A for the first lens, take its output, and use that output as the starting context for the Q&A of the second lens, and so on. This allows for complex workflows, like defining a goal, then creating a tool for that goal, then writing an email about that tool. 
8.	The "A/B Testing" Module 
This is an online-only action designed to test prompt effectiveness. 
● Workflow: 
1.	The user finalizes a prompt ("Prompt A"). 
2.	They create a variation ("Prompt B"), perhaps using the "Remix" function. 
3.	They click "A/B Test." 
4.	The UI presents two large, side-by-side text areas: "Response for A" and "Response for B." 
5.	The system instructs the user: "This is an online action. Please run both prompts in your target LLM. Then, paste the full, raw responses back into the boxes below." 
6.	After pasting both responses, the user clicks the "Analyze" button (cyan accent). 
7.	The system provides a simple comparative analysis (e.g., "Word Count: A=350, B=500," "Readability Score: A=10, B=8," "Constraint Adherence: A=Failed, B=Passed," "Key Themes," etc.). 
Conclusion of Specification 
This document details the complete vision for the "Prompt Creator Master." All elements are considered critical. All development must adhere to the "no-compromises" and "echo-check" protocols defined in the preamble. 
