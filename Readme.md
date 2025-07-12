# Sarthi - Emotion Analysis Application

A full-stack application for emotion analysis with a Next.js frontend and FastAPI backend.

## Project Structure

```
sarthi/
├── client/          # Next.js frontend application
├── server/          # FastAPI backend application
└── Readme.md        # This file
```

## Prerequisites

- **Node.js** (v18 or higher)
- **npm** or **yarn**
- **Python** (v3.8 or higher)
- **pip** (Python package manager)

## Setup Instructions

### 🖥️ Backend Setup (FastAPI)

1. **Navigate to the server directory:**

   ```bash
   cd server
   ```

2. **Create and activate a virtual environment:**

   ```bash
   # Create virtual environment
   python3 -m venv env

   # Activate virtual environment
   # On Linux/Mac:
   source env/bin/activate

   # On Windows:
   # env\Scripts\activate
   ```

3. **Install dependencies:**

   ```bash
   pip install fastapi uvicorn python-multipart
   ```

4. **Run the FastAPI server:**

   ```bash
   uvicorn main:app --reload --host 0.0.0.0 --port 8000
   ```

   The API will be available at:

   - **Server URL:** http://localhost:8000

### 🌐 Frontend Setup (Next.js)

1. **Navigate to the client directory:**

   ```bash
   cd client
   ```

2. **Install dependencies:**

   ```bash
   npm install
   # or
   yarn install
   ```

3. **Run the development server:**

   ```bash
   npm run dev
   # or
   yarn dev
   ```

   The application will be available at:

   - **Client URL:** http://localhost:3000
