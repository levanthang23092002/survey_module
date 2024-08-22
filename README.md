# NestJS Project

## Introduction

This project is a backend application built using [NestJS](https://nestjs.com/), a framework for building efficient, scalable Node.js server-side applications. NestJS leverages TypeScript and provides a modular architecture for easy maintenance and extension.

## Database Schema

### 1. User Table

- **Purpose:**
  - This table is used to manage user authentication and authorization. It stores the login credentials of users, which allows the system to differentiate between various users and grant appropriate access permissions based on their roles.
- **Usage:**
  - The `user` table is critical for user management and ensuring secure access to the system. It supports login functionality and role-based access control, ensuring that only authorized users can access certain features of the application.

### 2. Instance Table

- **Purpose:**
  - The `instance` table is used to manage specific events or instances within the system. It also tracks who the admin of each event is, thus controlling management rights and event-related activities.
- **Usage:**
  - This table helps in organizing and managing different events or sessions. It ensures that each instance has a designated admin, who has the authority to manage the event, assign tasks, and monitor progress.

### 3. Response Table

- **Purpose:**
  - The `response` table is designed to store the answers provided by users in surveys. It enables the system to collect, store, and analyze the feedback received from users.
- **Usage:**
  - The `response` table plays a crucial role in survey management. By storing user responses, it allows for detailed analysis and reporting on the collected data, helping in making informed decisions based on survey results.

## Justification for Additional Tables

To extend the initial request functionality, the following tables were added:

- **User Table**: To enable user login and manage authentication.
- **Instance Table**: To define and manage events, including admin assignments.
- **Response Table**: To capture and analyze survey responses effectively.

These additions enhance the flexibility and scalability of the system, allowing it to handle more complex scenarios, such as event management and survey analysis.

## Installation

### Prerequisites

- Node.js (Recommended version: v18.16.0 or compatible version)
- npm or yarn

### Setup

1.  **Clone the Repository**

    ```bash
    git clone https://github.com/levanthang23092002/survey_module
    cd survey_module

    ```

2.  **Install Dependencies**

    npm install

    #### Or if you use yarn

    yarn install

3.  **Configure Environment**

    Create a .env file and configure the necessary environment variables:

    ##### Variables:

        PORT = 3000
        DATABASE_URL = mysql://username:password@localhost:5432/mydatabase
        Access_Token_Key = example

4.  **Set Up Database**

    use command to create database:
    npx prisma migrate dev --name create-data
    npx prisma generate

5.  **Run the Project**

    #### npm usage:

        npm run start:dev
        npm run start

    #### Yarn usge:

        yarn start:dev
        yarn start

# API Documentation

## API Documentation: Get All Surveys for a Particular Event with Pagination

### Endpoint

- **URL:** `event/<eventId>/module/<moduleId>/surveys`
- **Method:** `GET`
- **URL Params:**
  - `<eventId>`: The unique identifier of the event (corresponds to `instanceid` in the database).
  - `<moduleId>`: The unique identifier of the module.
- **Query Params:**
  - `<page>`: The page number to retrieve.
  - `<itemPerPage>`: The number of items per page.
- **Headers:**
  - `Content-Type: application/json`
  - `Authorization: Basic d2ViX2FwcDpjaGFuZ2VpdA==`

### Data Params

- None

### Success Response

- **Code:** 200 OK
- **Content:**
  ```json
  {
    "total": 2,
    "itemPerPage": 12,
    "page": 1,
    "listSurvey": [
      {
        "surveyName": "Survey 1",
        "surveyDescription": "Description of Survey 1",
        "duration": 30,
        "type": "multiple-choice",
        "day": "2024-08-20T00:00:00.000Z",
        "points": 100,
        "timestampCreated": "2024-08-20T11:19:39.000Z"
      },
      {
        "surveyName": "Survey 2",
        "surveyDescription": "Description of Survey 2",
        "duration": 50,
        "type": "multiple-choice",
        "day": "2024-08-20T00:00:00.000Z",
        "points": 200,
        "timestampCreated": "2024-08-20T11:19:39.000Z"
      }
    ]
  }
  ```

### Error Response

- **Code:** 404 Not Found

### Sample Call

- **URL:** `event/1/module/1/surveys`

### Notes

- **Access Control:**

  - **User:** Regular users will only see surveys within the event (`instanceid`) that they have permission to view. Their access is restricted based on their role and permissions.
  - **Admin:** Admin users, identified by the `adminid` in the `Instance` model, will have access to all surveys within the event.

- **Mapping:**
  - The parameter `eventId` in the URL maps to the `instanceid` in the `Instance` model. This is used to identify the event for which surveys are being retrieved.

### Logic for Access Control

1. **User Role:**

   - When a user accesses the endpoint, the system checks the user’s role and associated permissions.
   - Only surveys within the event that the user is allowed to view are returned in the response.

2. **Admin Role:**
   - If the user is an admin of the event, they will see all surveys related to the event, without any restrictions.

## API Documentation: Get Survey Results By ID

### Endpoint

- **URL:** `/event/<eventId>/module/<moduleId>/surveys/<surveyId>/result`
- **Method:** `GET`
- **URL Params:**

  - `<eventId>`: The unique identifier of the event (corresponds to `instanceid` in the database).
  - `<moduleId>`: The unique identifier of the module.
  - `<surveyId>`: The unique identifier of the survey (corresponds to `surveyid` in the database).

- **Headers:**
  - `Content-Type: application/json`
  - `Authorization: Basic d2ViX2FwcDpjaGFuZ2VpdA==`

### Data Params

- None

### Success Response

- **Code:** 200 OK
- **Content:**
  ```json
  {
    "total": 1,
    "listSurvey": [
      {
        "userId": 1,
        "responses": [
          {
            "questionnum": 1,
            "question": "Question 1 for Survey 1",
            "description": null,
            "image": null,
            "answer": "option 1"
          },
          {
            "questionnum": 2,
            "question": "Question 2 for Survey 1",
            "description": null,
            "image": null,
            "answer": "option 1"
          },
          {
            "questionnum": 3,
            "question": "Question 3 for Survey 1",
            "description": null,
            "image": null,
            "answer": "option 1"
          }
        ]
      }
    ]
  }
  ```

### Error Response

- **Code:** 404 Not Found

### Sample Call

- **URL:** `/event/1/module/1/surveys/1/result`

### Notes

- **Mapping:**

  - The parameter `eventId` in the URL maps to the `instanceid` in the `Instance` model. This is used to identify the event for which survey results are being retrieved.
  - The parameter `surveyId` in the URL maps to the `surveyid` in the `Survey` model.

- **Access Control:**
  - **User Role:**
    - Regular users will only receive the survey results related to their own responses. The API will filter results based on the `userid` corresponding to the authenticated user.
  - **Admin Role:**
    - If the authenticated user is an admin for the event (identified by `adminid` in the `Instance` model), the API will return all results for the specified survey, showing responses from all users who participated in the survey.

### Logic for Access Control

1. **User Role:**

   - The system checks the `userid` of the authenticated user.
   - Only responses where `userid` matches the authenticated user’s ID will be returned.

2. **Admin Role:**

   - The system verifies if the authenticated user is the admin of the event (`instanceid`).
   - If the user is the admin, all survey results for the given `surveyid` will be returned, regardless of the `userid`.

3. **Response Format:**
   - The API returns the results in a structured format, showing the question number, the question text, any description or image associated with the question, and the answer provided by the user.

## API Documentation: Get All Survey Items

### Endpoint

- **URL:** `/event/{eventId}/module/{moduleId}/surveys/{surveyId}`
- **Method:** `GET`
- **URL Params:**

  - `<eventId>`: The unique identifier of the event (corresponds to `instanceid` in the database).
  - `<moduleId>`: The unique identifier of the module.
  - `<surveyId>`: The unique identifier of the survey (corresponds to `surveyid` in the database).

- **Headers:**
  - `Content-Type: application/json`
  - `Authorization: Basic d2ViX2FwcDpjaGFuZ2VpdA==`

### Data Params

- None

### Success Response

- **Code:** 200 OK
- **Content:**
  ```json
  {
    "total": 3,
    "data": [
      {
        "questionNum": 1,
        "question": "Question 1 for Survey 1",
        "description": null,
        "image": null,
        "choice1": "Choice 1",
        "choice2": "Choice 2",
        "choice3": "Choice 3",
        "choice4": "Choice 4"
      },
      {
        "questionNum": 2,
        "question": "Question 2 for Survey 1",
        "description": null,
        "image": null,
        "choice1": "Choice 1",
        "choice2": "Choice 2",
        "choice3": "Choice 3",
        "choice4": "Choice 4"
      },
      {
        "questionNum": 3,
        "question": "Question 3 for Survey 1",
        "description": null,
        "image": null,
        "choice1": "Choice 1",
        "choice2": "Choice 2",
        "choice3": "Choice 3",
        "choice4": "Choice 4"
      }
    ]
  }
  ```

### Error Response

- **Code:** 404 Not Found

### Sample Call

- **URL:** `/event/1/module/1/surveys/1`

### Notes

- **Mapping:**

  - The parameter `eventId` in the URL maps to the `instanceid` in the `Instance` model. This is used to identify the event for which survey items are being retrieved.
  - The parameter `surveyId` in the URL maps to the `surveyid` in the `Survey` model.

- **Access Control:**
  - **User Role:**
    - Regular users will only receive survey items that they are authorized to see based on their group or role within the event.
  - **Admin Role:**
    - If the authenticated user is an admin for the event (identified by `adminid` in the `Instance` model), the API will return all survey items for the specified survey, regardless of any group-based restrictions.

### Logic for Access Control

1. **User Role:**

   - The system checks the `userid` of the authenticated user.
   - The API returns only the survey items that the user is authorized to view. This may involve checking the user's group or permissions within the event.

2. **Admin Role:**

   - The system verifies if the authenticated user is the admin of the event (`instanceid`).
   - If the user is the admin, all survey items for the given `surveyid` will be returned, without any restrictions.

3. **Response Format:**
   - The API returns the questions and associated choices in a structured format, showing the question number, the question text, any description or image associated with the question, and the available choices.

## API Documentation: Post Survey answer

### Endpoint

- **URL:** `/event/{eventId}/module/{moduleId}/surveys/{surveyId}/submit`
- **Method:** `POST`
- **URL Params:**

  - `<eventId>`: The unique identifier of the event (corresponds to `instanceid` in the database).
  - `<moduleId>`: The unique identifier of the module.
  - `<surveyId>`: The unique identifier of the survey (corresponds to `surveyid` in the database).

- **Headers:**
  - `Content-Type: application/json`
  - `Authorization: Basic d2ViX2FwcDpjaGFuZ2VpdA==`

### Data Params

- **Body:**
  ```json
  {
    "data": [
      {
        "surveyitemid": <surveyitemid>,
        "answer": "<answer>"
      },
      {
        "surveyitemid": <surveyitemid>,
        "answer": "<answer>"
      },
      {
        "surveyitemid": <surveyitemid>,
        "answer": "<answer>"
      }
    ]
  }
  ```
  - `surveyitemid`: The unique identifier of the survey item (question) being answered.
  - `answer`: The response provided for the corresponding survey item.

### Success Response

- **Code:** 200 OK
- **Content:**
  ```json
  {
    "success": true,
    "message": "You have completed the survey."
  }
  ```

### Error Response

- **Code:** 404 Not Found

### Sample Call

- **URL:** `/event/1/module/1/surveys/1/submit`
- **Body:**
  ```json
  {
    "data": [
      {
        "surveyitemid": 1,
        "answer": "Option 1"
      },
      {
        "surveyitemid": 2,
        "answer": "Option 2"
      },
      {
        "surveyitemid": 3,
        "answer": "Option 3"
      }
    ]
  }
  ```

### Notes

- **Mapping:**
  - The parameter `eventId` in the URL maps to `instanceid` in the `Instance` model.
  - The parameter `surveyId` in the URL maps to `surveyid` in the `Survey` model.
- **Functionality:**

  - This endpoint allows users to submit their answers for a survey.
  - The `data` parameter should contain an array of answers, each associated with a specific `surveyitemid`.
  - After successful submission, users receive a confirmation message indicating that the survey has been completed.

- **Access Control:**

  - Ensure that users are authenticated and authorized to submit responses for the specified survey.
  - Admins and regular users can both submit responses, but only the intended survey responses should be updated.

- **Error Handling:**
  - Return `404 Not Found` if the `surveyId` or `surveyitemid` is invalid or does not exist in the database.
  - Consider adding more detailed error messages for better debugging and user feedback.

## API Documentation: User Login

### Endpoint

- **URL:** `/auth/login`
- **Method:** `POST`

### Headers

- `Content-Type: application/json`
- `Authorization: Basic d2ViX2FwcDpjaGFuZ2VpdA==`

### Data Parameters

- **Content:**

```json
{
  "email": "<email>",
  "passWord": "<password>"
}
```

- `email`: The email address of the user trying to log in.

- `passWord`: The password of the user.

### Response successful

- **Code:** 200 OK
- **Content:**

```json
{
"accesstoken": "accesstoken_JwT",
"payload": {
    "userId": <userId>,
    "name": "<firstName> <lastName>",
    "email": "<email>"
}
}
```

- `accesstoken`: JWT or other token used for authenticated requests.

- `payload`: Contains user information:

- `userId`: Unique identifier of the user.

- `name`: Full name of the user (first name + last name).

- `email`: Email address of the user.

### Error Response

- **Code:** 404 Not Found
- **Message:**

```json
{
  "error": "User not found or invalid credentials."
}
```

### Sample Call

- **Request Body:**

```json
{
  "email": "john.doe@example.com",
  "passWord": "password123"
}
```

### Notes

- **Authentication:**
- Ensure that the provided authentication information is correct and matches an existing user in the system.
- The `Authorization` header must include the appropriate authentication information, but is generally not required for this endpoint unless used for special purposes.

- **Security:**
- Implement rate limiting and other security measures to protect against brute force attacks.

- **Error Handling:**
- Return `404 Not Found` if email is not registered or password is incorrect.

- Consider using more specific HTTP status codes (e.g. `401 Unauthorized`) for authentication errors for clearer API responses.

- **Token Handling:**
- The provided access token must be used for subsequent requests to protected endpoints.

- Ensure proper handling and storage of tokens to maintain security and user sessions.

## Documentation

[NestJS Documentation](https://docs.nestjs.com/)
[Prisma Documentation](https://www.prisma.io/docs)
