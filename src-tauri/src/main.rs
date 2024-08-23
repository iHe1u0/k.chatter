// Prevents additional console window on Windows in release, DO NOT REMOVE!!
#![cfg_attr(not(debug_assertions), windows_subsystem = "windows")]

#[tauri::command]
fn post_msg(msg: &str) -> String {
    let str = format!("received: {}", msg);
    println!("{}", str);
    return str;
}

#[tauri::command]
fn login(account: &str, password: &str) -> bool {
    if account.is_empty() || password.is_empty() {
        return false;
    }
    true
}

fn main() {
    tauri::Builder::default()
        .invoke_handler(tauri::generate_handler![login, post_msg])
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}
