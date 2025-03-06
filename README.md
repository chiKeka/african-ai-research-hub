# African AI Research Hub

A web platform to discover and explore AI research papers from across Africa.

## Features

- Interactive map visualization of research papers across African countries
- Search and filter research papers by country, topic, and keywords
- Admin dashboard with statistics and scraper controls
- MongoDB integration for storing research paper data

## Tech Stack

- Next.js 14 with App Router
- TypeScript
- Tailwind CSS
- MongoDB for database
- Chart.js for data visualization

## Getting Started

### Prerequisites

- Node.js 18+ and npm
- MongoDB instance (local or cloud)

### Installation

1. Clone the repository
   ```bash
   git clone https://github.com/chiKeka/african-ai-research-hub.git
   cd african-ai-research-hub
   ```

2. Install dependencies
   ```bash
   npm install
   ```

3. Create a `.env.local` file with your MongoDB connection string
   ```
   MONGODB_URI=mongodb+srv://your-username:your-password@your-cluster.mongodb.net
   MONGODB_DB=african_ai_research
   ```

4. Run the development server
   ```bash
   npm run dev
   ```

5. Open [http://localhost:3000](http://localhost:3000) in your browser

## Project Structure

- `/app` - Next.js App Router pages and components
- `/app/api` - API routes for data fetching and scraper controls
- `/app/admin` - Admin dashboard for statistics and controls
- `/app/components` - Reusable UI components
- `/app/lib` - Utility functions and database connection

## License

MIT