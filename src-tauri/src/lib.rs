// Learn more about Tauri commands at https://tauri.app/develop/calling-rust/
use notify_rust::Notification;

#[tauri::command]
fn trigger_alarm(task: String) {
    Notification::new()
        .summary("Widget Alert")
        .body(&format!("Time to {}", task))
        .show()
        .unwrap();
}

#[cfg_attr(mobile, tauri::mobile_entry_point)]
pub fn run() {
    tauri::Builder::default()
        .invoke_handler(tauri::generate_handler![trigger_alarm])
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}
