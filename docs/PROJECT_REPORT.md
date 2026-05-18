# Project Report: AI-Based Employee Performance Analytics & Recommendation System

## 1. Title

AI-Based Employee Performance Analytics & Recommendation System using MERN Stack and OpenRouter AI.

## 2. Objective

The objective of this project is to build a secure full-stack application that helps HR/Admin users manage employees, track skills and performance metrics, and generate AI-powered recommendations for promotions, training, rankings, and feedback.

## 3. Technology Stack

- Frontend: React, Vite, CSS, Recharts
- Backend: Node.js, Express.js
- Database: MongoDB, Mongoose
- Authentication: JWT, bcrypt
- AI Integration: OpenRouter/OpenAI-compatible chat completion API
- Deployment: Render
- API Testing: Postman/Thunder Client

## 4. Main Modules

### Authentication

- Signup API
- Login API
- JWT token generation
- bcrypt password hashing
- Protected routes

### Employee Management

- Add employee
- Get all employees
- Search and filter employees
- Update employee performance score/details
- Delete employee

### AI Recommendation

- Promotion recommendation
- Employee ranking
- Training suggestions
- AI feedback generation

### Analytics

- Employee count
- Average performance score
- Top performer
- Performance score chart

## 5. Database Schema

```js
const EmployeeSchema = new mongoose.Schema({
  name: String,
  email: String,
  department: String,
  skills: [String],
  performanceScore: Number,
  experience: Number
});
```

```js
const UserSchema = new mongoose.Schema({
  name: String,
  email: String,
  password: String,
  role: String
});
```

## 6. API Endpoints

| Method | Endpoint | Description |
| --- | --- | --- |
| POST | `/api/auth/signup` | Register HR/Admin user |
| POST | `/api/auth/login` | Login and receive JWT |
| GET | `/api/auth/me` | Verify protected auth |
| POST | `/api/employees` | Add employee |
| GET | `/api/employees` | Fetch all employees |
| GET | `/api/employees/search` | Search/filter employees |
| PUT | `/api/employees/:id` | Update employee |
| DELETE | `/api/employees/:id` | Delete employee |
| POST | `/api/ai/recommend` | Generate AI recommendations |

## 7. AI Prompt Design

The backend sends employee performance data to OpenRouter and asks the model to return valid JSON containing:

- Summary
- Ranked employees
- Promotion readiness
- Training suggestions
- HR feedback

## 8. Test Cases

| Test Case | Expected Output |
| --- | --- |
| Insert valid employee | Employee stored successfully |
| Duplicate email | Error message |
| Missing performance score | Validation error |
| Search by department | Filtered employee list |
| Valid login | JWT token generated |
| Invalid password | Unauthorized error |
| Access protected route without token | Access denied |
| Update performance score | Updated data shown |
| Delete employee | Employee removed successfully |
| AI recommendation | Ranked recommendation list |

## 9. Screenshots to Attach Before PDF Export

Add screenshots below before converting to PDF:

1. Frontend login/signup page
2. Employee registration form
3. Employee list and filter result
4. AI recommendation display
5. Postman/Thunder Client auth request
6. Postman/Thunder Client employee CRUD request
7. Postman/Thunder Client AI recommendation request
8. MongoDB employee collection
9. MongoDB user collection showing hashed password
10. Render backend successful deployment
11. Render frontend successful deployment
12. Live endpoint testing screenshots

## 10. Deployment Links

- GitHub Repository: https://github.com/akashh-create/ESE-prap
- Live Frontend URL: Add after deployment
- Backend API URL: Add after deployment

## 11. Conclusion

This project implements a secure MERN-based HR analytics system with AI-powered employee recommendations. It satisfies core full-stack requirements including React components, Express REST APIs, MongoDB validation, JWT authentication, OpenRouter integration, GitHub usage, and Render deployment readiness.
