// Prevents additional console window on Windows in release, DO NOT REMOVE!!
#![cfg_attr(not(debug_assertions), windows_subsystem = "windows")]

// Learn more about Tauri commands at https://tauri.app/v1/guides/features/command
#[tauri::command]
fn greet(name: &str) -> String {
    format!("Hello, {}! You've been greeted from Rust!", name)
}

#[tauri::command]
fn post_msg(msg: &str) -> String {
    let str = format!("received: {}", msg);
    println!("{}", str);
    return str;
}

fn main() {
    tauri::Builder::default()
        .invoke_handler(tauri::generate_handler![greet, post_msg])
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}
