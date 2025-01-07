# Super Kid Slimes

A fun and interactive e-commerce website for handmade boutique slimes and slime kits for kids.

## Features

- Interactive and playful UI design
- Product catalog with categories
- Shopping cart functionality
- Contact form
- Responsive design
- MongoDB integration
- Shopify integration (coming soon)

## Tech Stack

- Frontend:

  - React
  - TypeScript
  - TailwindCSS
  - Framer Motion
  - React Router

- Backend:
  - Node.js
  - Express
  - MongoDB
  - Shopify API (integration planned)

## Getting Started

1. Clone the repository:

   ```bash
   git clone https://github.com/patricknavarre/superKidSlimes.git
   cd superKidSlimes
   ```

2. Install dependencies:

   ```bash
   # Install backend dependencies
   npm install

   # Install frontend dependencies
   cd client
   npm install
   ```

3. Create a `.env` file in the root directory with the following variables:

   ```
   PORT=4020
   MONGODB_URI=mongodb://localhost:27017/superKidSlimes
   NODE_ENV=development
   ```

4. Start the development servers:

   ```bash
   # Start backend server (from root directory)
   npm start

   # Start frontend server (from client directory)
   cd client
   npm start
   ```

5. Open your browser and visit:
   - Frontend: http://localhost:4000
   - Backend API: http://localhost:4020

## Contributing

Pull requests are welcome. For major changes, please open an issue first to discuss what you would like to change.

## License

[MIT](https://choosealicense.com/licenses/mit/)
