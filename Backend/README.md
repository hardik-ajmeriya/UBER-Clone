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

## User Login

### Endpoint

**URL:** `/users/login`  
**Method:** `POST`  
**Description:** Authenticate an existing user and return a JWT token.

### Request Headers

| Header       | Value            | Required |
| ------------ | ---------------- | -------- |
| Content-Type | application/json | Yes      |

### Request Body

Send a JSON object with the following properties:

| Field      | Type   | Required | Validation                          |
| ---------- | ------ | -------- | ----------------------------------- |
| `email`    | String | Yes      | Must be a valid email format       |
| `password` | String | Yes      | Minimum 6 characters               |

#### Example Request Body

```json
{
  "email": "john.doe@example.com",
  "password": "securePass123"
}
```

### Responses

#### Success (200 OK)

Returns a JSON object containing a JWT token and the user data.

```json
HTTP/1.1 200 OK
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

#### Validation Error (400 Bad Request)

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

#### Authentication Error (401 Unauthorized)

Returned when credentials are invalid.

```json
HTTP/1.1 401 Unauthorized
Content-Type: application/json

{
  "message": "Invalid Email and Password"
}
```

## Get User Profile

### Endpoint

**URL:** `/users/profile`  
**Method:** `GET`  
**Description:** Retrieve the currently authenticated user's profile information.

### Request Headers

| Header         | Value                | Required |
| -------------- | -------------------- | -------- |
| Authorization  | Bearer `<JWT_TOKEN>` | Yes      |
| Content-Type   | application/json     | Yes      |

### Responses

#### Success (200 OK)

Returns the user object for the authenticated session:

```json
HTTP/1.1 200 OK
Content-Type: application/json

{
  "_id": "60f5a3c2c2a5120dc8f0bb3d",
  "fullname": {
    "first_name": "John",
    "last_name": "Doe"
  },
  "email": "john.doe@example.com",
  "socketId": null
}
```

#### Authentication Error (401 Unauthorized)

If no valid token is provided:

```json
HTTP/1.1 401 Unauthorized
Content-Type: application/json

{
  "message": "Unauthorized: Token Expires"
}
```

## User Logout

### Endpoint

**URL:** `/users/logout`  
**Method:** `GET`  
**Description:** Logout the current user and invalidate their JWT.

### Request Headers

| Header         | Value                | Required |
| -------------- | -------------------- | -------- |
| Authorization  | Bearer `<JWT_TOKEN>` | Yes      |
| Content-Type   | application/json     | Yes      |

### Responses

#### Success (200 OK)

Clears the authentication cookie and blacklists the token:

```json
HTTP/1.1 200 OK
Content-Type: application/json

{
  "message": "Logged out successfully"
}
```

#### Authentication Error (401 Unauthorized)

If no valid token is provided or token is invalid:

```json
HTTP/1.1 401 Unauthorized
Content-Type: application/json

{
  "message": "Unauthorized: Token Expires"
}
```

## Captain Registration

### Endpoint

**URL:** `/captains/register`  
**Method:** `POST`  
**Description:** Register a new captain with personal and vehicle details.

### Request Headers

| Header           | Value            | Required |
| ---------------- | ---------------- | -------- |
| Content-Type     | application/json | Yes      |

### Request Body

Send a JSON object with the following properties:

| Field                  | Type    | Required | Validation                                    |
| ---------------------- | ------- | -------- | --------------------------------------------- |
| `fullname.first_name`  | String  | Yes      | Minimum 3 characters                           |
| `fullname.last_name`   | String  | Yes      | Minimum 3 characters                           |
| `email`                | String  | Yes      | Must be a valid email format                   |
| `password`             | String  | Yes      | Minimum 6 characters                           |
| `vehicle.color`        | String  | Yes      | Minimum 3 characters                           |
| `vehicle.plate`        | String  | Yes      | Minimum 3 characters                           |
| `vehicle.capacity`     | Number  | Yes      | Must be a number                               |
| `vehicle.vehicleType`  | String  | Yes      | One of `car`, `motorcycle`, `auto`             |

#### Example Request Body

```json
{
  "fullname": {
    "first_name": "Alice",
    "last_name": "Smith"
  },
  "email": "alice.smith@example.com",
  "password": "strongPass123",
  "vehicle": {
    "color": "Blue",
    "plate": "XYZ123",
    "capacity": 4,
    "vehicleType": "car"
  }
}
```

### Responses

#### Success (201 Created)

Returns a JSON object containing a new JWT token and the captain data.

```json
HTTP/1.1 201 Created
Content-Type: application/json

{
  "token": "<JWT_TOKEN>",
  "captain": {
    "_id": "60f5a3c2c2a5120dc8f0bb3d",
    "fullname": {
      "first_name": "Alice",
      "last_name": "Smith"
    },
    "email": "alice.smith@example.com",
    "socketId": null,
    "status": "inactive",
    "vehicle": {
      "color": "Blue",
      "plate": "XYZ123",
      "capacity": 4,
      "vehicleType": "car"
    }
  }
}
```

#### Validation Error (400 Bad Request)

```json
HTTP/1.1 400 Bad Request
Content-Type: application/json

{
  "errors": [
    {
      "msg": "Invalid Email",
      "param": "email",
      "location": "body"
    }
  ]
}
```

#### Duplicate Captain Error (400 Bad Request)

Returned when a captain with the provided email or plate already exists.

```json
HTTP/1.1 400 Bad Request
Content-Type: application/json

{
  "error": "Captain already exists"
}
```
