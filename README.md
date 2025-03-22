
# Vikash Vatika Decoration

A flower and balloon decoration company website built with React and Django.

## Prerequisites

Before you begin, ensure you have the following installed:
- Node.js (v16 or later)
- Python (3.8 or later)
- MongoDB (Install from [MongoDB website](https://www.mongodb.com/try/download/community))

## Setup Instructions

### Step 1: Start MongoDB

Make sure MongoDB service is running on your system. The default connection URL is `mongodb://localhost:27017`.

### Step 2: Set up the Django Backend

1. Navigate to the backend directory:
   ```
   cd backend
   ```

2. Create a virtual environment (optional but recommended):
   ```
   python -m venv venv
   ```

3. Activate the virtual environment:
   - On Windows:
     ```
     venv\Scripts\activate
     ```
   - On macOS/Linux:
     ```
     source venv/bin/activate
     ```

4. Install required packages:
   ```
   pip install -r requirements.txt
   ```

5. Run migrations:
   ```
   python manage.py makemigrations
   python manage.py migrate
   ```

6. Create a superuser to access the admin panel:
   ```
   python manage.py createsuperuser
   ```

7. Run the development server:
   ```
   python manage.py runserver
   ```

8. The Django backend will be running at:
   ```
   http://localhost:8000/
   ```

9. Access the Django admin panel at:
   ```
   http://localhost:8000/admin/
   ```

### Step 3: Set up the React Frontend

1. Open a new terminal and navigate to the project root

2. Install required packages:
   ```
   npm install
   ```

3. Run the development server:
   ```
   npm run dev
   ```

4. The React frontend will be running at:
   ```
   http://localhost:8080/
   ```

## Accessing the Admin Interface

There are two admin interfaces:

1. **Django Admin**: Access at `http://localhost:8000/admin/` using the superuser credentials you created.

2. **React Admin Dashboard**: Access at `http://localhost:8080/admin` using:
   - Email: admin@vikashvatika.com
   - Password: admin123

## Important Notes

- The API endpoints are available at `http://localhost:8000/api/`
- Make sure both the frontend and backend servers are running simultaneously
- Upload product images through the Django admin interface
