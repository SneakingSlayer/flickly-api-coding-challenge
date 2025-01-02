# Flickly

Flickly is a simple modular Express.js application that consumes The Movie Database (TMDB) API to provide movie-related data and features.

## Features

-   Integration with TMDB API for movie data
    
-   Modular architecture with feature-based modules
    
-   RESTful API endpoints
    
-   Middleware for request handling and validation
    
-   Environment-based configuration
    
-   TypeScript for better type safety
 

----------

## Getting Started

Follow the steps below to set up and run the application locally.

### Prerequisites

-   [Node.js](https://nodejs.org/) (v16 or higher recommended)
    
-   [npm](https://www.npmjs.com/) or [yarn](https://yarnpkg.com/) package manager

- [TMDB](https://www.themoviedb.org/) API keys 
    

----------

### Installation

1.  Clone the repository:
    
    ```
    https://github.com/SneakingSlayer/flickly-api-coding-challenge.git
    ```
    
2.  Install dependencies:
    
    ```
    npm install
    ```
    
    Or with Yarn:
    
    ```
    yarn install
    ```
    

----------

### Environment Configuration

Create a `.env` file in the root directory and add the following variables:

```
PORT=port
TMDB_ACCESS_TOKEN=your_tmdb_access_token
TMDB_KEY=your_tmdb_key
TMDB_BASE_URL=tmdb_base_url
ALLOWED_ORIGINS=allowed_origins
```

Replace the placeholder values with your actual configuration.

----------

### Running the Application

#### Development Mode

Run the app in development mode with hot-reloading:

```
npm run dev
```

Or with Yarn:

```
yarn dev
```

#### Production Mode

1.  Build the app:
    
    ```
    npm run build
    ```
    
    Or with Yarn:
    
    ```
    yarn build
    ```
    
2.  Start the app:
    
    ```
    npm start
    ```
    
    Or with Yarn:
    
    ```
    yarn start
    ```
    

----------

### API Endpoints

Method

Endpoint

Description

GET

`/api/movies/:id/images`

Get images for a movie by ID

GET

`/api/movies/:id/credits`

Get credits for a movie by ID

GET

`/api/movies/:id/recommendations`

Get recommendations for a movie by ID

GET

`/api/movies/top-rated`

Get top-rated movies

GET

`/api/movies/popular`

Get popular movies

GET

`/api/movies/genres`

Get available movie genres

GET

`/api/movies/trending`

Get trending movies

GET

`/api/movies/search`

Search for movies by query

GET

`/api/movies/:id`

Get movie details by ID

----------

### Author

- **Your Name** - [GitHub Profile](https://github.com/SneakingSlayer)