# Franchise

A modern web application for managing a franchise business, built with Next.js, Rust, and integrated with M-Pesa and OpenAI services. This project includes features for product management, shopping cart, checkout, team management, and more.

## Features

- **Product Catalog**: Browse and manage franchise products
- **Shopping Cart & Checkout**: Seamless e-commerce experience
- **Team Management**: Display team members and information
- **M-Pesa Integration**: Payment processing via M-Pesa
- **OpenAI Integration**: AI-powered features
- **Responsive Design**: Built with Tailwind CSS for mobile-first design


## Tech Stack

- **Frontend**: Next.js, React, TypeScript, Tailwind CSS
- **Backend**: Python Flask
- **Integrations**: M-Pesa API, OpenAI API
- **UI Components**: Shadcn/ui
- **Package Manager**: pnpm (frontend), pip (backend) (frontend), pip (backend)

## Setup Instructions

### Prerequisites

- Node.js (version 18 or higher)
- Python 3.8 or higher
- pnpm

### Installation

1. **Clone the repository**:
   ```bash
   git clone <repository-url>
   cd franchise
   ```

2. **Install Node.js dependencies**:
   ```bash
   pnpm install
   ```

3. **Install Python dependencies**:
   ```bash
   pip install -r backend/requirements.txt
   ```

4. **Set up environment variables**:
   Create a `.env.local` file in the root directory and add your API keys:
   ```
   MPESA_CONSUMER_KEY=your_mpesa_consumer_key
   MPESA_CONSUMER_SECRET=your_mpesa_consumer_secret
   MPESA_PASSKEY=your_mpesa_passkey
   MPESA_SHORTCODE=your_mpesa_shortcode
   MPESA_CALLBACK_URL=https://your-callback-url.com
   OPENAI_API_KEY=your_openai_api_key
   ```

### Running the Application

1. **Start the Python backend**:
   ```bash
   python backend/backend.py
   ```
   The backend will be available at `http://127.0.0.1:8080`

2. **Start the Next.js development server** (in a new terminal):
   ```bash
   pnpm dev
   ```
   The frontend will be available at `http://localhost:3000`

3. **Build for production**:
   ```bash
   # Backend
   # No build needed for development, use python backend.py

   # Frontend
   pnpm build
   pnpm start
   ```

### Project Structure

- `app/`: Next.js app router pages
- `components/`: React components
- `lib/`: Utility functions and types
- `backend/`: Python Flask backend
  - `backend.py`: Main Flask server
  - `mpesa_integrations.py`: M-Pesa integration functions
  - `openai_integrations.py`: OpenAI integration functions
  - `requirements.txt`: Python dependencies

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Run tests and linting
5. Submit a pull request

## License

This project is licensed under the MIT License.
