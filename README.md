# School Management API

This is a simple API for managing a school system. It handles classes, teachers, students, attendance, and admin authentication. Here's an overview of the setup process, API endpoints, and demo data.

## Overview

Our API offers comprehensive endpoints for school management through:
- Admin authentication and authorization
- Class and course management
- Student attendance tracking
- Teacher and student relationship management

## Getting Started

### Installation

```bash
# Clone the repository
git clone https://github.com/hyemiie/schoolManagement.git

# Navigate to project directory
cd school-management-system

# Install dependencies
npm install
```

### Configuration

Set up your `.env` file in the root directory:

```
JWT_SECRET_KEY=your-secret-key
MONGO_URI=mongodb://your-connection-string
PORT=3000
```

### Launch

```bash
npm start
```

You can access the server at `http://localhost:3000` (or your specified port).

## API Endpoints

### Authentication

```json
POST /api/admin/login
{
    "email": "youradmin@mail.com",
    "password": "your-password"
}

You will receive:
{
    "message": "Authentication successful",
    "token": "access-token"
}
```

### Class Management

```json
// Create Class
POST /api/classes
{
    "name": "Geography",
    "teacherId": "teacher-id"
}

// List Classes
GET /api/classes?page=1&limit=10

// Update Class
PUT /api/classes/:id
{
    "name": "Social Economics",
    "teacherId": "teacher-id"
}

// Delete Class
DELETE /api/classes/:id
```

### Attendance Management

```json
// Record Attendance
POST /api/attendance
{
    "studentId": "student-id",
    "classId": "class-id",
    "status": "Present"
}

// View Class Attendance
GET /api/attendance/class/:classId

// View Student Attendance
GET /api/attendance/student/:studentId
```

## Data Models

### Teacher
```json
{
    "name": "John Smith",
    "email": "john.smith@education.org",
    "subjects": ["Mathematics", "Physics"],
    "active": true
}
```

### Student
```json
{
    "name": "Sarah Johnson",
    "email": "sarah.j@student.org",
    "enrollmentDate": "2024-01-15",
    "classId": "class-id"
}
```

### Class
```json
{
    "name": "Mathematics 101",
    "teacherId": "teacher-id",
    "schedule": {
        "day": "Monday",
        "time": "09:00"
    },
    "capacity": 30
}
```

## Security

We implement:
- JWT-based authentication
- Request validation
- Rate limiting
- Secure password hashing
- MongoDB injection protection

## Error Handling

We return consistent error responses:
```json
{
    "status": "error",
    "code": 400,
    "message": "Invalid input",
    "details": "Specific error details"
}
```

## Best Practices

We recommend you:
1. Include the JWT token in all requests
2. Handle errors appropriately
3. Follow our request/response formats
4. Monitor your rate limits and API usage
5. Protect your security credentials

## Technical Stack

We use:
- Node.js
- Express.js
- MongoDB
- JWT Authentication
- Express Middleware
- Input Validation

## Support

When you need help:
1. Check our documentation
2. Review existing GitHub issues
3. Create new issues with detailed descriptions

## Contribution

We welcome contributions. Follow these steps:
1. Fork our repository
2. Create your feature branch
3. Submit your pull request with detailed changes
4. Run and pass all tests

---

Visit our GitHub repository for detailed technical documentation and updates.