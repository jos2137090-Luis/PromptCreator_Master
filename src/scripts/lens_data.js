// src/scripts/lens_data.js

// This object holds the data for all 9 lenses.
const LENS_DATA = {
    
    architect: {
        title: "Lens 1: The Architect",
        questions: [
            {
                key: "Role & Persona",
                question: "What specific role should the AI adopt?",
                choices: [
                    "Skeptical senior software architect",
                    "Enthusiastic science teacher for 10-year-olds",
                    "Supportive project manager"
                ]
            },
            {
                key: "Core Task & Goal",
                question: "What is the single most important action you want performed?",
                choices: [
                    "Critique or review a piece of text/code",
                    "Explain a complex concept",
                    "Generate a list of ideas",
                    "Summarize a long document"
                ]
            },
            {
                key: "Context & Background",
                question: "What key information does the AI need to know?",
                choices: [
                    "The target audience is [enter audience]",
                    "The user's skill level is [Beginner/Intermediate/Expert]",
                    "The key data is [paste data/text here]"
                ]
            },
            {
                key: "Constraints & Requirements",
                question: "What are the rules, boundaries, and non-negotiables?",
                choices: [
                    "Output must be under [number] words",
                    "Do not use technical jargon",
                    "Format the response as a JSON object",
                    "The budget is [number]"
                ]
            },
            {
                key: "Exemplars & Format",
                question: "Describe the desired tone and structure.",
                choices: [
                    "Formal report style",
                    "Conversational, friendly tone",
                    "A bulleted list with headings"
                ]
            }
        ],
        refinement: [
            {
                key: "Refinement 1 (Example)",
                question: "Would you like me to generate a sample of the output format you just described (e.g., a sample of a formal report structure) so you can confirm the style?",
                choices: [
                    "Yes, add an instruction to provide a sample format.",
                    "No, that's not necessary."
                ]
            },
            {
                key: "Refinement 2 (Order)",
                question: "Looking at the drafted prompt, is the sequence of instructions logical, or should we reorder them? For example, should the 'Constraints' come before the 'Core Task'?",
                choices: [
                    "The order is fine as-is.",
                    "Yes, place 'Constraints' before the 'Core Task' for emphasis."
                ]
            }
        ]
    },

    maverick: {
        title: "Lens 2: The Maverick",
        questions: [
            {
                key: "Strategy",
                question: "Welcome, Maverick. Let's engineer the AI's thinking process. Choose a primary strategy:",
                choices: [
                    "The Socratic Method (Force step-by-step reasoning)",
                    "The Feynman Technique (Force extreme clarity/simplicity)",
                    "The Devil's Advocate (Stress-test an idea)"
                ],
                dynamic: true,
                subQuestions: {
                    "The Socratic Method": { 
                        key: "Strategy Refinement (Socratic)",
                        question: "Refine 'The Socratic Method':",
                        choices: [
                            "Challenge all initial assumptions",
                            "Present a chain of reasoning",
                            "Ask me questions back"
                        ]
                    },
                    "The Feynman Technique": {
                        key: "Strategy Refinement (Feynman)",
                        question: "Refine 'The Feynman Technique':",
                        choices: [
                            "Explain to a 12-year-old",
                            "Use a simple analogy",
                            "Identify common misunderstandings"
                        ]
                    },
                    "The Devil's Advocate": {
                        key: "Strategy Refinement (Devil's Advocate)",
                        question: "Refine 'The Devil's Advocate':",
                        choices: [
                            "Find the top 3 reasons it will fail",
                            "List all ethical concerns",
                            "Provide evidence for counter-arguments"
                        ]
                    },
                    "default": {
                        key: "Strategy Refinement",
                        question: "Please select a primary strategy above to see refinement options.",
                        choices: []
                    }
                }
            },
            {
                key: "Target",
                question: "What is the core idea, problem, or concept you want to apply this strategy to?",
                choices: [
                    "A business plan or idea",
                    "A complex scientific topic",
                    "A piece of code or logic",
                    "A personal decision"
                ]
            }
        ],
        refinement: [
            {
                key: "Refinement 1 (Rigor)",
                question: "Shall I show you an example of how the AI might structure its critique? This helps set the level of rigor.",
                choices: [
                    "Yes, add an instruction to provide an example critique.",
                    "No, that's not necessary."
                ]
            },
            {
                key: "Refinement 2 (Tone)",
                question: "Does the chosen strategy feel too confrontational, or is that the exact level of critical feedback you need?",
                choices: [
                    "The level of critique is appropriate.",
                    "Add a note to make the tone less confrontational.",
                    "Add a note to make the tone *more* confrontational."
                ]
            }
        ]
    },
    
    storyteller: {
        title: "Lens 3: The Storyteller",
        questions: [
            {
                key: "The Character",
                question: "Define the AI's character: Name, core identity, 3 key traits, 1 flaw.",
                choices: [
                    "Name: [text box]",
                    "Identity: [text box, e.g., 'Cynical Mars commander']",
                    "Key Traits: [e.g., Resourceful, Protective, Secretive]",
                    "Key Flaw: [e.g., Overly mistrustful]"
                ]
            },
            {
                key: "The Setting & Scenario",
                question: "Where and when is this taking place? What is the immediate problem?",
                choices: [
                    "Location: [text box]",
                    "Time Period: [text box]",
                    "Immediate Situation: [text box, e.g., 'The life support system is failing']"
                ]
            },
            {
                key: "The User's Role",
                question: "Who are you in this scenario? What is your relationship to the AI character?",
                choices: [
                    "The newly arrived, idealistic doctor",
                    "A rival faction leader",
                    "A subordinate asking for help"
                ]
            },
            {
                key: "The Rules of the World",
                question: "What specific lore or physics must be respected?",
                choices: [
                    "Magic is powered by [text box]",
                    "FTL travel is impossible",
                    "The corporation is always listening"
                ]
            }
        ],
        refinement: [
            {
                key: "Refinement 1 (Dialogue Sample)",
                question: "Would you like me to generate a sample of dialogue from this character so we can ensure the tone and voice are right?",
                choices: [
                    "Yes, add an instruction to generate a sample line of dialogue.",
                    "No, that's not necessary."
                ]
            },
            {
                key: "Refinement 2 (Conflict)",
                question: "Is the character's flaw ('overly mistrustful') strong enough to create interesting conflict, or should we make it more pronounced?",
                choices: [
                    "The flaw is sufficient.",
                    "Yes, add a note to make the flaw more pronounced in responses."
                ]
            }
        ]
    },
    
    editor: {
        title: "Lens 4: The Editor",
        questions: [
            {
                key: "Paste Prompt",
                question: "Paste your current draft prompt in the box below.",
                choices: []
            },
            {
                key: "Clarity Check",
                question: "Your prompt includes vague terms like 'make it better.' Can you replace this with a concrete action?",
                choices: [
                    "Improve readability by using shorter sentences",
                    "Add more technical detail",
                    "Check for logical fallacies"
                ]
            },
            {
                key: "Role & Context Injection",
                question: "Your prompt doesn't assign a clear role. What persona would be most helpful?",
                choices: [
                    "A domain expert in [topic]",
                    "A creative partner",
                    "A simple data processor"
                ]
            },
            {
                key: "Constraint Audit",
                question: "I notice your prompt is missing output constraints. What should we add?",
                choices: [
                    "Add a word count: [number]",
                    "Add a specific format: [e.g., email, JSON, memo]",
                    "Add a tone: [e.g., professional, casual]"
                ]
            },
            {
                key: "Strategic Enhancement",
                question: "Could we improve the reasoning?",
                choices: [
                    "Add 'Think step-by-step'",
                    "Add 'Provide a one-sentence summary at the end'",
                    "Add 'Explain your reasoning'"
                ]
            }
        ],
        refinement: [
            {
                key: "Refinement 1 (Before/After)",
                question: "Before we begin, would you like me to show you a 'before and after' example of a prompt I've refined using this method?",
                choices: [
                    "Yes, add an instruction to show a 'before/after' example.",
                    "No, proceed directly to the refinement."
                ]
            },
            {
                key: "Refinement 2 (Intent Check)",
                question: "After my suggested revisions, does the new prompt capture every subtlety of your original intent, or did we lose anything you wanted to keep?",
                choices: [
                    "Confirm the new prompt should capture all original subtleties.",
                    "It's okay to lose some subtlety for the sake of clarity."
                ]
            }
        ]
    },

    freemason: {
        title: "Lens 5: The Freemason Manufacturer",
        questions: [
            {
                key: "Core Utility",
                question: "In one sentence, what problem does this tool solve or what function does it perform?",
                choices: [
                    "It sanitizes user input in a web form",
                    "It calculates a financial metric (e.g., compound interest)",
                    "It parses data from one format to another"
                ]
            },
            {
                key: "Inputs & Data Sources",
                question: "What exactly does the function take in? Be specific about data types.",
                choices: [
                    "A single string",
                    "A JSON object with keys [key1, key2, ...]",
                    "An array of numbers"
                ]
            },
            {
                key: "Outputs & Deliverables",
                question: "What exactly does it return or produce?",
                choices: [
                    "A single boolean (true/false)",
                    "A new JSON object",
                    "A sanitized string"
                ]
            },
            {
                key: "Processing Logic & Rules",
                question: "Describe the step-by-step algorithm or business logic.",
                choices: [
                    "1. Check for [pattern]. 2. Escape [characters]. 3. Return string.",
                    "Must handle [error type] gracefully",
                    "Use the following formula: [formula]"
                ]
            },
            {
                key: "Environment & Constraints",
                question: "What are the technical requirements?",
                choices: [
                    "Must be written in [Python 3.9 / JavaScript ES6 / etc.]",
                    "Must not use external libraries",
                    "Must be highly optimized for speed"
                ]
            }
        ],
        refinement: [
            {
                key: "Refinement 1 (Signature)",
                question: "I can generate a sample function signature (e.g., def calculate_interest(principal, rate, time):) to ensure we're aligned on the inputs and function name. Shall I add that?",
                choices: [
                    "Yes, add an instruction to generate a sample function signature.",
                    "No, that's not necessary."
                ]
            },
            {
                key: "Refinement 2 (Edge Cases)",
                question: "Have we considered all edge cases in the processing logic? For example, what should happen if the input is null or an unexpected data type?",
                choices: [
                    "Yes, add a note to consider edge cases like null or unexpected data types.",
                    "No, I will define the edge cases myself."
                ]
            }
        ]
    },

    goalmaker: {
        title: "Lens 6: The Goal-Maker",
        questions: [
            {
                key: "The North Star",
                question: "What is the ultimate, inspiring goal?",
                choices: [
                    "Become a published author",
                    "Launch a profitable side business",
                    "Run a marathon",
                    "Learn a new skill (e.g., coding, a language)"
                ]
            },
            {
                key: "Success Metrics",
                question: "How will you measurably know you've succeeded?",
                choices: [
                    "Achieve [number] in revenue/profit",
                    "Complete a [e.g., 50,000-word manuscript, 26.2-mile race]",
                    "Be certified at [level]"
                ]
            },
            {
                key: "Current Reality & Constraints",
                question: "Where are you now? What are your major limitations?",
                choices: [
                    "Time constraint: I can only dedicate [number] hours per week",
                    "Budget constraint: I have $[number] to start",
                    "Skill constraint: I am a beginner in [area]"
                ]
            },
            {
                key: "Key Milestones",
                question: "What are the 3-5 major phases or checkpoints on the path?",
                choices: [
                    "1. Research & Outline. 2. First Draft. 3. Edit & Revise.",
                    "1. Build MVP. 2. Acquire First 10 Users. 3. Monetize.",
                    "1. Brainstorm. 2. Prototype. 3. Test. 4. Launch."
                ]
            }
        ],
        refinement: [
            {
                key: "Refinement 1 (Example Plan)",
                question: "I can provide an example of a well-structured goal plan for 'Learn to Play Guitar' to illustrate the level of detail. Would you like that added?",
                choices: [
                    "Yes, add an instruction to provide an example goal plan.",
                    "No, that's not necessary."
                ]
            },
            {
                key: "Refinement 2 (Metrics)",
                question: "Are your success metrics truly measurable and time-bound? 'Get in shape' is vague, but 'Run a 5k in under 30 minutes in 6 months' is excellent.",
                choices: [
                    "Yes, add a note to ensure all metrics are measurable and time-bound.",
                    "I will handle the metrics."
                ]
            }
        ]
    },

    wellness: {
        title: "Lens 7: The Wellness Guide",
        questions: [
            {
                key: "Area of Focus",
                question: "What aspect of well-being are we addressing?",
                choices: [
                    "Mental clarity / Focus",
                    "Physical fitness / Energy levels",
                    "Emotional resilience / Stress management",
                    "Work-life balance",
                    "Developing a new habit"
                ]
            },
            {
                key: "Desired Feeling & Outcome",
                question: "What do you want to feel or achieve?",
                choices: [
                    "Feel more energized throughout the day",
                    "Develop techniques to manage anxiety",
                    "Create a sustainable morning routine"
                ]
            },
            {
                key: "Philosophical Approach",
                question: "What is your preferred style for the AI's response?",
                choices: [
                    "Science-based and data-driven (e.g., citing studies)",
                    "Mindful and spiritual (e.g., meditation, journaling)",
                    "Practical and action-oriented (e.g., a simple checklist)",
                    "A gentle, Socratic guide (e.g., asking me questions back)"
                ]
            },
            {
                key: "Safety & Boundaries",
                question: "Are there any specific triggers, limitations, or preferences to avoid?",
                choices: [
                    "Crucial: Instruct the AI to state 'I am not a medical professional'",
                    "Do not suggest intense cardio",
                    "Focus on solutions, not just identifying problems"
                ]
            }
        ],
        refinement: [
            {
                key: "Refinement 1 (Tone Sample)",
                question: "I can generate a sample snippet of the 'Mindful and spiritual' supportive language you requested, so you can confirm the AI's tone is correct. Add this?",
                choices: [
                    "Yes, add an instruction to provide a sample of the tone.",
                    "No, that's not necessary."
                ]
            },
            {
                key: "Refinement 2 (Safety Check)",
                question: "We must ensure the AI is instructed to act as a guide, not a doctor. Is this correct?",
                choices: [
                    "Yes, reinforce that the AI must act as a guide, not a doctor.",
                    "I will set the safety boundaries myself."
                ]
            }
        ]
    },

    researcher: {
        title: "Lens 8: The Deep Researcher",
        questions: [
            {
                key: "Core Research Question",
                question: "What is the specific, narrow question you are trying to answer?",
                choices: [
                    "What were the economic impacts of [event]?",
                    "What is the current case law regarding [legal doctrine]?",
                    "Compare and contrast [theory 1] and [theory 2]"
                ]
            },
            {
                key: "Domain & Scope",
                question: "What is the field of study and what are the boundaries?",
                choices: [
                    "Field: [e.g., U.S. economic history, 1930-1939]",
                    "Field: [e.g., Current U.S. copyright case law]",
                    "Do not include analysis from other countries/jurisdictions"
                ]
            },
            {
                key: "Source Requirements",
                question: "What types of sources are required, and which should be prioritized?",
                choices: [
                    "Peer-reviewed academic journals",
                    "Primary legal documents (statutes, case law)",
                    "Government statistics and reports",
                    "Do not use blogs, opinion pieces, or general web articles"
                ]
            },
            {
                key: "Output Format & Citation",
                question: "What is the desired deliverable and citation style?",
                choices: [
                    "A literature review",
                    "A legal briefing memo",
                    "A summary table of key findings",
                    "Citation Style: [APA 7th / Bluebook / MLA / Chicago]"
                ]
            }
        ],
        refinement: [
            {
                key: "Refinement 1 (Example Structure)",
                question: "I can provide an example of how the AI might structure a response, including how it would introduce a counter-argument or format a key citation. Add this?",
                choices: [
                    "Yes, add an instruction to provide a sample response structure.",
                    "No, that's not necessary."
                ]
            },
            {
                key: "Refinement 2 (Question Narrowness)",
                question: "Is your research question narrow enough to be answered deeply? A broad question will produce a shallow summary.",
                choices: [
                    "Yes, add a note to focus on a deep, narrow answer.",
                    "The question's breadth is fine."
                ]
            }
        ]
    },

    presenter: {
        title: "Lens 9: The Presenter",
        questions: [
            {
                key: "Core Message & Call to Action (CTA)",
                question: "What is the one thing you want your audience to know, feel, or do?",
                choices: [
                    "Core Message: [text box]",
                    "Call to Action: [e.g., Sign up for a demo, Approve the budget]"
                ]
            },
            {
                key: "Audience Analysis",
                question: "Who are they? What are their likely objections?",
                choices: [
                    "Skeptical executives (Objection: cost)",
                    "Non-technical managers (Objection: complexity)",
                    "A busy hiring manager (Objection: time)"
                ]
            },
            {
                key: "Medium & Format",
                question: "How will this be delivered?",
                choices: [
                    "A professional email",
                    "A 10-slide PowerPoint deck (outline only)",
                    "A script for a phone call or 5-minute verbal pitch"
                ]
            },
            {
                key: "Desired Tone & Persona",
                question: "How do you want to sound?",
                choices: [
                    "Authoritative and data-driven",
                    "Empathetic and collaborative",
                    "Enthusiastic and inspiring",
                    "Calm, firm, and de-escalating"
                ]
            },
            {
                key: "Structure & Hook",
                question: "How should it begin and end?",
                choices: [
                    "Start with a surprising statistic",
                    "Start with a personal story",
                    "Use the 'Problem-Agitate-Solution' framework",
                    "End with a clear, singular Call to Action"
                ]
            }
        ],
        refinement: [
            {
                key: "Refinement 2 (CTA Check)",
                question: "Does the Call to Action feel compelling and easy to execute for the specific audience we've defined?",
                choices: [
                    "Yes, add a note to ensure the CTA is compelling and easy.",
                    "I will handle the CTA."
                ]
            }
        ]
    }
};