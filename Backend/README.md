# Uber Video Backend API Documentation

## User Registration

### Endpoint

**URL:** `/users/register`  
**Method:** `POST`  
**Description:** Register a new user in the system.

### Request Headers

| Header           | Value           | Required |
| ---------------- | --------------- | -------- |
| Content-Type     | application/json| Yes      |

### Request Body

Send a JSON object with the following properties:

| Field                  | Type   | Required | Validation                             |
| ---------------------- | ------ | -------- | -------------------------------------- |
| `fullname.first_name`  | String | Yes      | Minimum 3 characters                    |
| `fullname.last_name`   | String | No       | Minimum 3 characters (if provided)      |
| `email`                | String | Yes      | Must be a valid email format            |
| `password`             | String | Yes      | Minimum 6 characters                    |

#### Example Request Body

```json
{
    "fullname": {
        "first_name": "John",
        "last_name": "Doe"
    },
    "email": "john.doe@example.com",
    "password": "securePass123"
}
```

### Responses

#### Success (201 Created)

Returns a JSON object containing a new JWT token and the user data.

```json
HTTP/1.1 201 Created
Content-Type: application/json

{
    "token": "<JWT_TOKEN>",
    "user": {
        "_id": "60f5a3c2c2a5120dc8f0bb3d",
        "fullname": {
            "first_name": "John",
            "last_name": "Doe"
        },
        "email": "john.doe@example.com",
        "socketId": null
    }
}
```

**Example Success Response:**

```json
{
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYwZjVhM2MyYzJhNTEyMGRjOGYwYmIzZCIsImlhdCI6MTYyNjg2ODAwMH0.abc123def456ghi789jkl012mno345pqr678stu901vwx234yz567",
    "user": {
        "_id": "60f5a3c2c2a5120dc8f0bb3d",
        "fullname": {
            "first_name": "John",
            "last_name": "Doe"
        },
        "email": "john.doe@example.com",
        "socketId": null
    }
}
```

#### Validation Error (400 Bad Request)

If any required field is missing or fails validation, returns an array of errors.

```json
HTTP/1.1 400 Bad Request
Content-Type: application/json

{
    "errors": [
        {
            "msg": "Invalid Email",
            "param": "email",
            "location": "body"
        },
        {
            "msg": "Password must be at least 6 characters long!",
            "param": "password",
            "location": "body"
        }
    ]
}
```
