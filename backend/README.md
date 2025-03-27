# Dog Breeds Backend

This is the backend for the Dog Breeds application, built using FastAPI.

## Running the Application

1. Start the FastAPI server:
   ```bash
   cd backend
   fastapi dev app/main.py
   ```

2. Access the API:
   Open your browser and go to `http://localhost:8000/docs` to view the API documentation.

## Endpoints

- **GET /api/breeds**: Retrieve all dog breeds. Optionally, you can filter by name using a query parameter.

## Notes

- Ensure that you have Python 3.7 or higher installed.
- You may need to adjust CORS settings in `main.py` if you are accessing the API from a different origin.