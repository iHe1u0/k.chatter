// Prevents additional console window on Windows in release, DO NOT REMOVE!!
#![cfg_attr(not(debug_assertions), windows_subsystem = "windows")]

mod model;

use model::response::ApiResponse;

#[tauri::command]
fn post_msg(msg: &str) -> String {
    let str = format!("received: {}", msg);
    println!("{}", str);
    return str;
}
#[tauri::command]
async fn login(account: &str, password: &str) -> Result<String, String> {
    // Check if account or password is empty
    if account.is_empty() || password.is_empty() {
        return Ok("Account or password is empty!".to_string());
    }

    // Create an HTTP client
    let client = reqwest::Client::new();

    // Target URL
    let url = "http://chat.catcompany.cn/login";

    // Create JSON body
    let body = serde_json::json!({
        "account": account,
        "password": password
    });

    // Send login request
    let response_result = client
        .post(url)
        .json(&body) // Send JSON data
        .send()
        .await;

    // Process response
    match response_result {
        Ok(response) => {
            let status = response.status();

            if status.is_success() {
                let response_text = response
                    .text()
                    .await
                    .unwrap_or_else(|_| "Failed to get response body text".to_string());
                match serde_json::from_str::<ApiResponse>(&response_text) {
                    Ok(parsed) if parsed.code == 0 => Ok("true".to_string()),
                    Ok(parsed) => Ok(format!("login failed, error code: {}", parsed.code)),
                    Err(_) => Ok("Failed to parse JSON response".to_string()),
                }
            } else {
                Ok("Failed to process response".to_string())
            }
        }
        Err(_) => Ok("Error sending POST request".to_string()),
    }
}

fn main() {
    tauri::Builder::default()
        .invoke_handler(tauri::generate_handler![login, post_msg])
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}
