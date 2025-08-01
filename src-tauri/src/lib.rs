// Learn more about Tauri commands at https://tauri.app/develop/calling-rust/
use std::time::{SystemTime, UNIX_EPOCH}; 
use tauri::{AppHandle, Manager, WebviewWindowBuilder, WebviewUrl};

#[tauri::command]
fn greet(name: &str) -> String {
    format!("Hello, {}! You've been greeted from Rust!", name)
}

#[tauri::command]
async fn create_window(app: tauri::AppHandle, params: String) {
    let url = format!("viewer.html?{}", params);
    
    let timestamp = SystemTime::now()
    .duration_since(UNIX_EPOCH)
    .unwrap()
    .as_millis();
    let label = format!("label-{}", timestamp);

    tauri::WebviewWindowBuilder::new(&app, &label, tauri::WebviewUrl::App(url.into()))
        .title("Viewer")
        .always_on_top(true)
        .build()
        .unwrap();
}

#[tauri::command]
fn open_app(app: AppHandle) {
    let label = "main";

    if let Some(window) = app.get_webview_window(label) {
        // Se a janela já existe, garantir que ela apareça
        let _ = window.show();        // mostra caso esteja invisível
        let _ = window.unminimize();  // desfaz a minimização
        let _ = window.set_focus();   // foca na janela
        return;
    }

    // Se não existe, criar nova
    let _ = WebviewWindowBuilder::new(
        &app,
        label,
        WebviewUrl::App("index.html".into()),
    )
    .title("Fixed Screen")
    .build();
}


#[tauri::command]
fn exit_app() {
    std::process::exit(0);
}

#[cfg_attr(mobile, tauri::mobile_entry_point)]
pub fn run() {
    tauri::Builder::default()
        .plugin(tauri_plugin_opener::init())
        .invoke_handler(tauri::generate_handler![greet, create_window, open_app, exit_app])
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}
