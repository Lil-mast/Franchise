use actix_web::{web, App, HttpServer, HttpResponse, Responder};
use serde::{Deserialize, Serialize};
use reqwest::Client;
use dotenv::dotenv;
use std::env;

mod mpesa;
mod openai;

#[derive(Debug, Serialize, Deserialize)]
struct CalculationRequest {
    num1: i32,
    num2: i32,
}

#[derive(Debug, Serialize, Deserialize)]
struct CalculationResponse {
    addition: i32,
    multiplication: i32,
    subtraction: i32,
    division: f64,
    incremented: i32,
    decremented: i32,
}

async fn calculate(data: web::Json<CalculationRequest>) -> impl Responder {
    let num1 = data.num1;
    let num2 = data.num2;

    let division = if num2 != 0 {
        num1 as f64 / num2 as f64
    } else {
        f64::NAN
    };

    HttpResponse::Ok().json(CalculationResponse {
        addition: num1 + num2,
        multiplication: num1 * num2,
        subtraction: num1 - num2,
        division,
        incremented: num1 + 1,
        decremented: num1 - 1,
    })
}

#[actix_web::main]
async fn main() -> std::io::Result<()> {
    dotenv().ok();
    
    HttpServer::new(|| {
        App::new()
            .route("/calculate", web::post().to(calculate))
            .service(
                web::scope("/api")
                    .configure(mpesa::config)
                    .configure(openai::config)
            )
    })
    .bind("127.0.0.1:8080")?
    .run()
    .await
}