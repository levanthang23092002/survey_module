# NestJS Project

## Introduction

This project is a backend application built using [NestJS](https://nestjs.com/), a framework for building efficient, scalable Node.js server-side applications. NestJS leverages TypeScript and provides a modular architecture for easy maintenance and extension.

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

    # Or if you use yarn

    yarn install

3.  **Configure Environment**

    Create a .env file and configure the necessary environment variables:

    # Port on which the application will run

        PORT = 3000

    # Database connection URL

    DATABASE_URL = mysql://username:password@localhost:5432/mydatabase

    # Access Token

    Access_Token_Key = example

4.  **Set Up Database**

    use command to create database:
    npx prisma migrate dev --name create-data
    npx prisma generate

5.  **Run the Project**

    # npm usage:

        npm run start:dev
        npm run start

    # Yarn usge:

        yarn start:dev
        yarn start

Documentation
[NestJS Documentation](https://docs.nestjs.com/)
[Prisma Documentation](https://www.prisma.io/docs)
