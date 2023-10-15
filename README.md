# Getting Started

This project is a simple application that allows you to search for gifs on Giphy and save the search history of the user. To execute this project, you need to follow the steps below.

You need have [Node.js](https://nodejs.org/en/) installed on your machine and [PostgreSQL](https://www.postgresql.org/) database.

## Setup

Follow these steps to get your development environment set up:

1. Create a database on your PostgreSQL server.
2. Create a `.env.local` file in the root of the project and add the following environment variables or follow the `.env.example` file:
   1. `API_KEY` - API key provided by Giphy.
   2. `DATABASE_URL` - URL to connection database, with username, password, host, port, and database name.

3. Install dependencies in the root of the project with `npm install` or `yarn install`.
4. Run `npx prisma migrate dev` to create the database tables.
5. Run `npm run dev` or `yarn dev` to start the development server.

## API

In this project, we have two API routes:

1. `/api/history` - This route is responsible for returning the search history of the user.
2. `/api/search` - This route is responsible for searching for gifs on Giphy and saving the search history of the user.

## Tech Stack

- [Next.js](https://nextjs.org/)
- [TypeScript](https://www.typescriptlang.org/)
- [Prisma](https://www.prisma.io/)
- [PostgreSQL](https://www.postgresql.org/)
- [Tailwind CSS](https://tailwindcss.com/)
