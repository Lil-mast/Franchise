use actix_web::{web, HttpResponse, Responder};
use reqwest::Client;
use serde::{Deserialize, Serialize};
use std::env;

#[derive(Debug, Serialize, Deserialize)]
pub struct ChatRequest {
    message: String,
}

#[derive(Debug, Serialize, Deserialize)]
pub struct ChatResponse {
    response: String,
}

async fn chat(prompt: web::Json<ChatRequest>) -> impl Responder {
    let client = Client::new();
    let api_key = env::var("OPENAI_API_KEY").expect("OPENAI_API_KEY not set");
    
    let franchise_context = "You are an expert assistant for a franchise business. 
    Provide clear, concise answers about franchise opportunities, requirements, 
    and locations. Always be professional but friendly.";
    
    let response = client
        .post("https://api.openai.com/v1/chat/completions")
        .header("Authorization", format!("Bearer {}", api_key))
        .json(&serde_json::json!({
            "model": "gpt-3.5-turbo",
            "messages": [
                {"role": "system", "content": franchise_context},
                {"role": "user", "content": prompt.message}
            ],
            "temperature": 0.7
        }))
        .send()
        .await
        .unwrap()
        .json::<serde_json::Value>()
        .await
        .unwrap();
    
    let ai_response = response["choices"][0]["message"]["content"]
        .as_str()
        .unwrap_or("I couldn't generate a response. Please try again.");
    
    HttpResponse::Ok().json(ChatResponse {
        response: ai_response.to_string(),
    })
}

pub fn config(cfg: &mut web::ServiceConfig) {
    cfg.service(
        web::resource("/openai/chat")
            .route(web::post().to(chat))
    );
}