# Register Login Node.js Documentation

This document outlines the API endpoints available in the Register Login Node.js application.

## Base URL

All URLs referenced in the documentation have the base path `/api`.

## Authentication

### Register

- **URL**: `/auth/register`
- **Method**: `POST`
- **Body**:
  - `email`: User's email
  - `password`: User's password
- **Success Response**: HTTP 201 with user details
- **Error Response**: HTTP 400 if the email is already taken

### Login

- **URL**: `/auth/login`
- **Method**: `POST`
- **Body**:
  - `email`: User's email
  - `password`: User's password
- **Success Response**: HTTP 200 with a token
- **Error Response**: HTTP 401 if credentials are invalid

## Users

### Get All Users

- **URL**: `/users/`
- **Method**: `GET`
- **Query Parameters**:
  - `page`: Page number (optional)
  - `count`: Number of users per page (optional)
- **Success Response**: HTTP 200 with list of users and pagination details
- **Error Response**: HTTP 400 on error

### Get User by ID

- **URL**: `/users/:id`
- **Method**: `GET`
- **URL Parameters**:
  - `id`: User's ID
- **Success Response**: HTTP 200 with user details
- **Error Response**: HTTP 404 if user not found, HTTP 400 on other errors

### Update User

- **URL**: `/users/:id`
- **Method**: `PUT`
- **URL Parameters**:
  - `id`: User's ID
- **Body**:
  - `email`: New email (optional)
  - `password`: New password (optional)
- **Success Response**: HTTP 200 with updated user details
- **Error Response**: HTTP 500 on error

### Delete User

- **URL**: `/users/:id`
- **Method**: `DELETE`
- **URL Parameters**:
  - `id`: User's ID
- **Success Response**: HTTP 200 with success message
- **Error Response**: HTTP 404 if user not found, HTTP 400 on other errors