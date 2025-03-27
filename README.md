# Dog Breeds Application

This project is a web application that allows users to search for dog breeds. It consists of a backend built with FastAPI and a frontend built with Next.js.

## Table of Contents

- [Features](#features)
- [Technologies](#technologies)
- [Setup](#setup)
- [Running the Application](#running-the-application)
- [Contributing](#contributing)
- [License](#license)

## Features

- Search for dog breeds by name.
- Displays loading and error messages with improved styling.
- Responsive design for various screen sizes.

## Technologies

- **Backend**: FastAPI
- **Frontend**: Next.js
- **Database**: (if applicable, specify the database used)
- **Styling**: Tailwind CSS (or any other styling framework used)

## Setup

1. Clone the repository:
   ```bash
   git clone https://github.com/scheung38/dog-breed.git
   cd dog-breed
   ```

2. Install `uv`, the Rust-based package manager:
   ```bash
   curl -LsSf https://astral.sh/uv/install.sh | sh
   ```

3. Create a virtual environment and sync with the `uv.lock` file:
   ```bash
   uv init
   uv sync
   ```

4. See the backend and frontend `README.md` files for further installation and instructions.

## Running the Application

1. Navigate to the backend directory:
   ```bash
   cd backend
   ```

2. Launch the FastAPI development server with the command 
   ```bash
   fastapi dev app/main.py
   ``` 
and you can access the FastAPI documentation at [http://127.0.0.1:8000/docs](http://127.0.0.1:8000/docs).

3. Start the frontend server:
   ```bash
   cd frontend
   npm install
   npm run dev
   ```

4. Open your browser and go to `http://localhost:3000` to view the application.

