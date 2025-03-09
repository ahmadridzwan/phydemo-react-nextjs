# Phydemo React App

This is Phydemo React App made with [Next.js](https://nextjs.org) and bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

A live demo site is available on [https://phydemo.ahmadridzwan.com](https://phydemo.ahmadridzwan.com).

## Project Features

- Built with [Next.js](https://nextjs.org) and [Tailwind](https://tailwindcss.com/)
- Integration with Mock API from [Reqres](https://reqres.in/)
- Lazy loading of content
- Responsive design for variety of screen sizes
- Unit tests implemented with [Jest](https://jestjs.io/)
- Automatic code formatting and linting with [Prettier](https://prettier.io/) and [ESlint](https://eslint.org/)

## Getting Started

To run the development server locally, follow these steps:

1. Clone this git repository by running within your desired directory:
   `git clone https://github.com/ahmadridzwan/Phydemo-react.git`
2. Create a `.env` file at the root of your project (e.g. `.env.local`) and include the following:
   ```
   NEXT_PUBLIC_API_URL=https://reqres.in/api
   ```
3. Install dependencies by running `pnpm install`. If running with `npm`, delete the pnpm lock file and run `npm install`
4. Run the development server by running `pnpm dev` (or `npm run dev` if using `npm`)
5. Your application should now be running at [http://localhost:3000](http://localhost:3000)

## Project Roadmap

- Complete test specifications for the remaining components
- Optimize loading animation and asset. GIF and MP4 are not ideal to be used as loading animations
- Improve error handling and error boundaries
- Various performance optimisations
- Implement search function
- Implement remaining CRUD operations; add, update, and delete
- Implement own API with dedicated database
- Implement Github Action or other CI/CD tool to integrate with Vercel
