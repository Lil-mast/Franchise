use actix_web::{web, HttpResponse, Responder};
use reqwest::Client;
use serde::{Deserialize, Serialize};
use base64::encode;
use chrono::Utc;
use std::env;

#[derive(Debug, Serialize, Deserialize)]
pub struct MpesaPaymentRequest {
    phone: String,
    amount: f64,
    account_ref: String,
}

#[derive(Debug, Serialize, Deserialize)]
struct MpesaResponse {
    checkout_request_id: String,
    response_code: String,
    message: String,
}

pub async fn initiate_payment(payment: web::Json<MpesaPaymentRequest>) -> impl Responder {
    let consumer_key = env::var("MPESA_CONSUMER_KEY").expect("MPESA_CONSUMER_KEY not set");
    let consumer_secret = env::var("MPESA_CONSUMER_SECRET").expect("MPESA_CONSUMER_SECRET not set");
    let passkey = env::var("MPESA_PASSKEY").expect("MPESA_PASSKEY not set");
    let shortcode = env::var("MPESA_SHORTCODE").expect("MPESA_SHORTCODE not set");
    
    // Generate access token
    let auth_string = format!("{}:{}", consumer_key, consumer_secret);
    let encoded_auth = encode(auth_string);
    
    let client = Client::new();
    let token_response = client
        .get("https://sandbox.safaricom.co.ke/oauth/v1/generate?grant_type=client_credentials")
        .header("Authorization", format!("Basic {}", encoded_auth))
        .send()
        .await
        .unwrap()
        .json::<serde_json::Value>()
        .await
        .unwrap();
    
    let access_token = token_response["access_token"].as_str().unwrap();
    
    // Prepare payment request
    let timestamp = Utc::now().format("%Y%m%d%H%M%S").to_string();
    let password = encode(format!("{}{}{}", shortcode, passkey, timestamp));
    
    let payment_data = serde_json::json!({
        "BusinessShortCode": shortcode,
        "Password": password,
        "Timestamp": timestamp,
        "TransactionType": "CustomerPayBillOnline",
        "Amount": payment.amount,
        "PartyA": payment.phone,
        "PartyB": shortcode,
        "PhoneNumber": payment.phone,
        "CallBackURL": env::var("MPESA_CALLBACK_URL").expect("CALLBACK_URL not set"),
        "AccountReference": payment.account_ref,
        "TransactionDesc": "Franchise Payment"
    });
    
    let payment_response = client
        .post("https://sandbox.safaricom.co.ke/mpesa/stkpush/v1/processrequest")
        .header("Authorization", format!("Bearer {}", access_token))
        .json(&payment_data)
        .send()
        .await
        .unwrap()
        .json::<serde_json::Value>()
        .await
        .unwrap();
    
    HttpResponse::Ok().json(MpesaResponse {
        checkout_request_id: payment_response["CheckoutRequestID"].as_str().unwrap().to_string(),
        response_code: payment_response["ResponseCode"].as_str().unwrap().to_string(),
        message: payment_response["ResponseDescription"].as_str().unwrap().to_string(),
    })
}

pub fn config(cfg: &mut web::ServiceConfig) {
    cfg.service(
        web::resource("/mpesa/payment")
            .route(web::post().to(initiate_payment))
    );
}