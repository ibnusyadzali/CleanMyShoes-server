# CleanMyShoes API Documentation

## Endpoints :

List of available endpoints:

- `POST /users/register`
- `POST /users/login`
- `GET /services`
- `POST /orders/`
- `GET /orders/myOrder`
- `GET /orders/:orderId`
- `PATCH /orders/:orderId`
- `POST /:orderId`
- `POST /orders/payment`

&nbsp;

## 1. POST /users/register

Description:

- Create/register an account

Request:

- body:

```json
{
  "email": "string",
  "password": "string",
  "username": "string",
  "phoneNumber": "string",
  "address": "integer"
}
```

_Response (201 - Created)_

```json
{
  "message": "Thank you ${username}, your account has been created"
}
```

_Response (400 - Bad Request)_

```json
{
    "message": "Username is required"
}
OR
{
    "message": "Email is required"
}
OR
{
    "message": "Email already existed"
}
OR
{
    "message": "Invalid Email format"
}
OR
{
    "message": "Password is required"
}
OR
{
    "message": "Minimum 6 characters required in password"
}
{
    "message": "Phone Number is required"
}
OR
{
    "message": "Address is required"
}
```

&nbsp;

## 2. POST /users/login

Description:

- Login

Request:

- body:

```json
{
  "email": "string",
  "password": "string"
}
```

_Response (200 - OK)_

```json
{
  "access_token": "string",
  "username": "string",
  "email": "string",
  "role": "string"
}
```

_Response (400 - Bad Request)_

```json
{
  "message": "Email or Password is required"
}
```

_Response (401 - Unauthorized)_

```json
{
    "message": "Invalid Email or Password"
}
OR
{
    "message": "Unauthenticated, please login first"
}
OR
{
    "message": "Invalid Email/Password"
}
```

_Response (404 - Not Found)_

```json
{
  "message": "Data Not Found"
}
```

&nbsp;

## 3. GET /services

Description:

- Get all services data

Request:

_Response (200 - OK)_

```json
[
    {
        "id": 1,
        "name": "Standard Cleaning",
        "price": "35000",
        "estimatedDay": 2,
        "image": "../assets/standard cleaning.png",
        "createdAt": "2023-01-12T02:37:31.277Z",
        "updatedAt": "2023-01-12T02:37:31.277Z"
    },
    {
        "id": 2,
        "name": "Premium Cleaning",
        "price": "45000",
        "estimatedDay": 2,
        "image": "../assets/premium cleaning.png",
        "createdAt": "2023-01-12T02:37:31.277Z",
        "updatedAt": "2023-01-12T02:37:31.277Z"
    },
    ...,
]
```

## 4. POST /orders

Description:

- create order

Request:

- headers:

```json
{
  "access_token": "string"
}
```

- body:

```json
{
  "shoesBrand": "string",
  "shoesSize": "string",
  "shoesColor": "string",
  "shoesMaterial": "string",
  "phoneNumberPIC": "string",
  "photo": "string",
  "pickUpAddress": "string",
  "ServiceId": "string"
}
```

_Response (201 - Created)_

```json
{
  "message": "Success create order with Order ID Number ${orderIdNumber}"
}
```

_Response (400 - Bad Request)_

```json
{
    "message": "OrderIdNumber is required"
}
OR
{
    "message": "shoesBrand is required"
}
OR
{
    "message": "shoesSize is required"
}
OR
{
    "message": "shoesColor is required"
}
OR
{
    "message": "shoesMaterial is required"
}
OR
{
    "message": "phoneNumberPIC is required"
}
OR
{
    "message": "pickUpAddress is required"
}

```

_Response (401 - Unauthorized)_

```json
{
  "message": "Unauthenticated, please login first"
}
```

## 5. Get /orders/myOrder

Description:

- get all user's orders

Request:

- headers:

```json
{
  "access_token": "string"
}
```

_Response (201 - Created)_

```json
[
    {
        "id": "integer",
        "orderIdNumber": "String",
        "shoesBrand": "String",
        "shoesSize": "String",
        "shoesColor": "String",
        "shoesMaterial": "String",
        "phoneNumberPIC": "String",
        "photo": "String",
        "pickUpAddress": "String",
        "photoAfter": "String",
        "status": "String",
        "estimatedDate": "String",
        "completedDate": "String",
        "UserId": "integer",
        "ServiceId": "integer",
        "createdAt": "String",
        "updatedAt": "String",
        "User": {
            "id": "integer",
            "username": "String",
            "email": "String",
            "password": "String",
            "role": "String",
            "phoneNumber": "String",
            "address": "String",
            "createdAt": "String",
            "updatedAt": "String"
        },
        "Service": {
            "id": "integer",
            "name": "String",
            "price": "String",
            "estimatedDay": "integer",
            "image": "String",
            "createdAt": "String",
            "updatedAt": "String"
        }
    }
    ...,
]
```

_Response (401 - Unauthorized)_

```json
{
  "message": "Unauthenticated, please login first"
}
```

## 6. GET /orders/:orderId

Description:

- Get order detail by Id

Request:

- headers:

```json
{
  "access_token": "string"
}
```

- params:

```json
{
  "orderId": "integer (required)"
}
```

_Response (200 - OK)_

```json
{
        "id": "integer",
        "orderIdNumber": "String",
        "shoesBrand": "String",
        "shoesSize": "String",
        "shoesColor": "String",
        "shoesMaterial": "String",
        "phoneNumberPIC": "String",
        "photo": "String",
        "pickUpAddress": "String",
        "photoAfter": "String",
        "status": "String",
        "estimatedDate": "String",
        "completedDate": "String",
        "UserId": "integer",
        "ServiceId": "integer",
        "createdAt": "String",
        "updatedAt": "String",
        "User": {
            "id": "integer",
            "username": "String",
            "email": "String",
            "password": "String",
            "role": "String",
            "phoneNumber": "String",
            "address": "String",
            "createdAt": "String",
            "updatedAt": "String"
        },
        "Service": {
            "id": "integer",
            "name": "String",
            "price": "String",
            "estimatedDay": "integer",
            "image": "String",
            "createdAt": "String",
            "updatedAt": "String"
        }
    }
```
&nbsp;

_Response (401 - Unauthorized)_

```json
{
  "message": "Unauthenticated, please login first"
}
```

_Response (403 - Forbidden)_

```json
{
    "message": "Sorry, you have no authorization"
}
```



## 7. PATCH /orders/:orderId

Description:

- Update category status (admin only at order log page)

Request:

- headers:

```json
{
  "access_token": "string"
}
```

- params:

```json
{
  "orderId": "integer (required)"
}
```

- body:

```json
{
  "status": "string"
}
```

_Response (200 - OK)_

```json
{
  "message": "Success update order data"
}
```

_Response (401 - Unauthorized )_

```json
{
  "message": "Unauthenticated, please login first"
}
```

_Response (403 - Forbidden )_

```json
{
    "message": "Sorry, you have no authorization"
}
```

## 8. POST /orders/:orderId

Description:

- payment midtrans

Request:

- headers:

```json
{
  "access_token": "string"
}
```

- params:

```json
{
  "orderId": "integer (required)"
}
```

- body:

```json
{
  "status": "string"
}
```

_Response (201 - OK)_

```json
{
    "token": "string",
    "redirect_url": "string"
}
```

_Response (401 - Unauthorized )_

```json
{
  "message": "Unauthenticated, please login first"
}
```

_Response (403 - Forbidden )_

```json
## 8. POST /orders/:orderId

Description:

- update status after payment with midtrans

Request:

- headers:

```json
{
  "status": "string"
}
```

- params:

```json
{
  "orderId": "integer (required)"
}
```

- body:

```json
{
  "status": "string"
}
```

_Response (201 - Created)_

```json
{
    "message": "Payment Success",
}
```

_Response (401 - Unauthorized )_

```json
{
  "message": "Unauthenticated, please login first"
}
```

_Response (403 - Forbidden )_

```json
{
    "message": "Sorry, you have no authorization"
}
```

## Global Error

_Response (500 - Internal Server Error)_

```json
{
  "message": "Internal server error"
}
```
