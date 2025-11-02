// Prevents additional console window on Windows in release, DO NOT REMOVE!!
#![cfg_attr(not(debug_assertions), windows_subsystem = "windows")]

// The vault command we agreed to skip for now
#[tauri::command]
fn save_prompt(title: String, category: String, tags: String, purpose: String, prompt_text: String) -> Result<String, String> {
    // This mocks the function so the frontend doesn't crash if it's called.
    println!("--- SAVE PROMPT CALLED (SKIPPED) ---");
    Ok(format!("Prompt '{}' saved successfully (Mocked Result)!", title))
}

// --- NEW FUNCTIONS FOR SESSION 11: EXPORT SYSTEM ---

// 1. Export as TXT
#[tauri::command]
fn export_as_txt(text_content: String) -> Result<String, String> {
    println!("[BACKEND]: Export as TXT requested. Content length: {}", text_content.len());
    Ok("Success: File content ready for TXT export.".to_string())
}

// 2. Export as Markdown
#[tauri::command]
fn export_as_markdown(text_content: String) -> Result<String, String> {
    println!("[BACKEND]: Export as Markdown requested. Content length: {}", text_content.len());
    Ok("Success: File content ready for Markdown export.".to_string())
}

// 3. Export as PDF
#[tauri::command]
fn export_as_pdf(text_content: String) -> Result<String, String> {
    println!("[BACKEND]: Export as PDF requested. Content length: {}", text_content.len());
    Ok("Success: File content ready for PDF export.".to_string())
}

// 4. Export as DOCX
#[tauri::command]
fn export_as_docx(text_content: String) -> Result<String, String> {
    println!("[BACKEND]: Export as DOCX requested. Content length: {}", text_content.len());
    Ok("Success: File content ready for DOCX export.".to_string())
}

// --- END NEW FUNCTIONS ---


fn main() {
    tauri::Builder::default()
        .invoke_handler(tauri::generate_handler![
            save_prompt,
            
            // Registering new export commands
            export_as_txt,
            export_as_markdown,
            export_as_pdf,
            export_as_docx
        ])
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}