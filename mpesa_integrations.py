import httpx
import base64
from datetime import datetime
import os
from dotenv import load_dotenv

load_dotenv()

def get_mpesa_access_token(consumer_key, consumer_secret):
    """
    This function authenticates the application and returns an access token.
    """
    auth_url = "https://sandbox.safaricom.co.ke/oauth/v1/generate?grant_type=client_credentials"

    # The consumer key and secret are combined and base64 encoded
    credentials = f"{consumer_key}:{consumer_secret}"
    encoded_credentials = base64.b64encode(credentials.encode()).decode('utf-8')

    headers = {
        "Authorization": f"Basic {encoded_credentials}",
        "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/58.0.3029.110 Safari/537.3"
    }

    with httpx.Client() as client:
        response = client.get(auth_url, headers=headers)
        if response.status_code == 200:
            access_token = response.json()["access_token"]
            return access_token
        else:
            return None

def initiate_stk_push(consumer_key, consumer_secret, passkey, shortcode, phone_number, amount, callback_url, account_reference, transaction_desc):
    """
    This function initiates an STK push to the user's phone.
    """
    access_token = get_mpesa_access_token(consumer_key, consumer_secret)
    if not access_token:
        return None

    stk_push_url = "https://sandbox.safaricom.co.ke/mpesa/stkpush/v1/processrequest"

    timestamp = datetime.now().strftime("%Y%m%d%H%M%S")

    # The password is a base64 encoded string of the shortcode, passkey and timestamp
    password = base64.b64encode(f"{shortcode}{passkey}{timestamp}".encode()).decode()

    payload = {
        "BusinessShortCode": shortcode,
        "Password": password,
        "Timestamp": timestamp,
        "TransactionType": "CustomerPayBillOnline",
        "Amount": amount,
        "PartyA": phone_number,
        "PartyB": shortcode,
        "PhoneNumber": phone_number,
        "CallBackURL": callback_url,
        "AccountReference": account_reference,
        "TransactionDesc": transaction_desc
    }

    headers = {
        "Authorization": f"Bearer {access_token}",
        "Content-Type": "application/json",
        "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/58.0.3029.110 Safari/537.3"
    }

    with httpx.Client() as client:
        response = client.post(stk_push_url, json=payload, headers=headers)
        print(f"STK push response: {response.text}")
        return response.json()
