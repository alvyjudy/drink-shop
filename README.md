## Routes

### Sign up

Request:
```
POST /auth/signup 
Content-Type: application/json

{"email":<email>, "password":<password>}
```

Success response:
```
200 OK
Content-Type: application/json

{token: <token>}
```

Error on email duplicates:
```
403 Forbidden

Email already exists
```

### Log in

Request:
```
POST /auth/login 
Content-Type: application/json

{"email":<email>, "password":<password>}
```

Success response:
```
200 OK
Content-Type: application/json

{token: <token>}
```

Error on invalid credentials:
```
403 Forbidden

Invalid credential
```

### Log out

Request:
```
POST /auth/logout
Authorization: Bearer <jwtToken>
```

Success response:
```
200 OK

User has been logged out
```

Error:
```
400 Bad Request

The specified user does not exist.
```

### Validate token

Request:
```
POST /auth/validate-token
Authorization: Bearer <jwtToken>
```

Success response:
```
200 OK

Valid token
```

Error:
```
400 Bad Request

The user is not logged in
```