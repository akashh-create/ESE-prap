# API Test Cases

Use Postman or Thunder Client. First call `POST /api/auth/signup` or `POST /api/auth/login`, then copy the returned JWT token into the `Authorization: Bearer <token>` header for protected endpoints.

## Auth

### Signup

```http
POST /api/auth/signup
Content-Type: application/json
```

```json
{
  "name": "HR Admin",
  "email": "admin@example.com",
  "password": "password123",
  "role": "Admin"
}
```

Expected output: JWT token generated and password stored in encrypted format in MongoDB.

### Login

```http
POST /api/auth/login
Content-Type: application/json
```

```json
{
  "email": "admin@example.com",
  "password": "password123"
}
```

Expected output: JWT token generated.

### Invalid Login

Use wrong password.

Expected output: `401 Unauthorized`.

## Employee APIs

### Add Employee

```http
POST /api/employees
Authorization: Bearer <token>
Content-Type: application/json
```

```json
{
  "name": "Aman Verma",
  "email": "aman@gmail.com",
  "department": "Development",
  "skills": ["React", "Node.js", "MongoDB"],
  "performanceScore": 85,
  "experience": 3
}
```

Expected output: Employee stored successfully.

### Duplicate Email

Send the same employee email again.

Expected output: `409 Email already exists`.

### Missing Performance Score

Remove `performanceScore` from the body.

Expected output: Validation error.

### Get All Employees

```http
GET /api/employees
Authorization: Bearer <token>
```

Expected output: List of all employees.

### Search by Department

```http
GET /api/employees/search?department=Development
Authorization: Bearer <token>
```

Expected output: Filtered employee list.

### Update Performance Score

```http
PUT /api/employees/:id
Authorization: Bearer <token>
Content-Type: application/json
```

```json
{
  "performanceScore": 92
}
```

Expected output: Updated employee shown.

### Delete Employee

```http
DELETE /api/employees/:id
Authorization: Bearer <token>
```

Expected output: Employee removed successfully.

## AI Recommendation API

```http
POST /api/ai/recommend
Authorization: Bearer <token>
Content-Type: application/json
```

```json
{}
```

Expected output:

- High performance employee: promotion suggestion
- Low score employee: improvement feedback
- Missing skills: skill enhancement recommendation
- Multiple employees: ranked recommendations
