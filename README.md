# API Documentation

## Register Endpoint

**Endpoint:** `/api/v1/user/register`  
**Method:** `POST`

### Description
This endpoint registers a new user. It requires a JSON payload with the user's `fullname` (including `firstname` and optionally `lastname`), a valid `email`, and a `password`. The endpoint validates the provided input and creates the user if all criteria are met. Upon successful registration, a JWT token is generated and returned with the user details.

### Request Body Example
```json
{
  "fullname": {
    "firstname": "John",
    "lastname": "Doe"
  },
  "email": "john.doe@example.com",
  "password": "securepassword"
}
```

## Login Endpoint

**Endpoint:** `/api/v1/user/login`  
**Method:** `POST`

### Description
This endpoint allows an existing user to log in. The user must provide their `email` and `password`. If the credentials are valid, a JSON Web Token (JWT) is generated and returned along with the user details.

### Request Body Example
```json
{
  "email": "john.doe@example.com",
  "password": "securepassword"
}
```

## Profile Endpoint

**Endpoint:** `/api/v1/user/profile`  
**Method:** `GET`

### Description
This endpoint fetches the profile of the authenticated user. The request must include a valid JWT token (sent via cookie or Authorization header). If the token is valid and the user exists, their profile (excluding the password) is returned.

### Success Response (HTTP 200)
```json
{
  "message": "User profile fetched successfully",
  "success": true,
  "user": {
    "id": "603e8b3e2f1b2c4a5d6e7f8g",
    "fullname": {
      "firstname": "John",
      "lastname": "Doe"
    },
    "email": "john.doe@example.com"
  }
}
```

### Error Responses
- **Unauthorized (HTTP 401):** Returned when the token is missing, invalid, blacklisted, or the user is not found.
- **User Not Found (HTTP 404):** Returned when no user is associated with the provided token.
- **Server Error (HTTP 500):** Returned when an unexpected server error occurs.

## Logout Endpoint

**Endpoint:** `/api/v1/user/logout`  
**Method:** `GET`

### Description
This endpoint logs out the user by clearing the JWT token from the client's cookies and blacklisting the token on the server. Blacklisting prevents the token from being reused until it expires.

### Flow
1. The endpoint clears the token set in the client’s cookies.
2. The current token (extracted from the cookie or the Authorization header) is added to a blacklist collection in the database.
3. Future requests with the blacklisted token will be denied by the authentication middleware.

### Success Response (HTTP 200)
```json
{
  "message": "Logged out successfully",
  "success": true
}
```

## Register Caption Endpoint

**Endpoint:** `/api/v1/caption/register`  
**Method:** `POST`

### Description
This endpoint registers a new caption user. It requires a JSON payload containing the caption's personal details, authentication credentials, and vehical details. On successful registration, an authentication token is generated and returned along with the caption details. The token is also set as a cookie for subsequent requests.

### Request Payload Example
```json
{
  "fullname": {
    "firstname": "Varun",
    "lastname": "Singh"
  },
  "email": "varun@gmail.com",
  "password": "varun@123",
  "vehical": {
    "plate": "UP27 af 6408",
    "capacity": 2,
    "color": "black",
    "vehicalType": "motorcycle"
  }
}
```

### Success Response (HTTP 200)
```json
{
  "message": "Caption registered successfully",
  "caption": {
    "id": "6040f9d7eb1c2c0015a0c123",
    "fullname": {
      "firstname": "Varun",
      "lastname": "Singh"
    },
    "email": "varun@gmail.com",
    "plate": "UP27 af 6408",
    "capacity": 2,
    "color": "black",
    "vehicalType": "motorcycle"
  },
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
}
```

## Caption Login Endpoint

**Endpoint:** `/api/v1/caption/login`  
**Method:** `POST`

### Description
This endpoint allows an existing caption to log in by providing their `email` and `password`. If the credentials are valid, an authentication token is generated and returned along with the caption's details. The token is also set in a secure, HTTP-only cookie.

### Request Body Example
```json
{
  "email": "varun@gmail.com",
  "password": "varun@123"
}
```

### Success Response (HTTP 200)
```json
{
  "message": "Caption logged in successfully",
  "caption": {
    "id": "6040f9d7eb1c2c0015a0c123",
    "fullname": {
      "firstname": "Varun",
      "lastname": "Singh"
    },
    "email": "varun@gmail.com",
    "plate": "UP27 af 6408",
    "capacity": 2,
    "color": "black",
    "vehicalType": "motorcycle"
  }
}
```

## Caption Profile Endpoint

**Endpoint:** `/api/v1/caption/profile`  
**Method:** `GET`

### Description
This endpoint retrieves the profile of the authenticated caption. A valid JWT token must be provided (via cookie or Authorization header). If the token is valid and the caption exists, their profile information is returned.

### Success Response (HTTP 200)
```json
{
  "caption": {
    "id": "6040f9d7eb1c2c0015a0c123",
    "fullname": {
      "firstname": "Varun",
      "lastname": "Singh"
    },
    "email": "varun@gmail.com",
    "plate": "UP27 af 6408",
    "capacity": 2,
    "color": "black",
    "vehicalType": "motorcycle"
  }
}
```

## Caption Logout Endpoint

**Endpoint:** `/api/v1/caption/logout`  
**Method:** `GET`

### Description
This endpoint logs out the authenticated caption by clearing the JWT token from their cookies and adding the token to a blacklist. Blacklisting ensures that the token cannot be reused for subsequent requests.

### Flow
1. The endpoint extracts the token from the request (either from a cookie or the Authorization header).
2. The token is cleared from the client’s cookies.
3. The token is stored in a blacklist collection. Future requests containing this token will be rejected by the authentication middleware.

### Success Response (HTTP 200)
```json
{
  "message": "Caption logged out successfully"
}
```

