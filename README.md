# BreizhSport Frontend

This repository contains the Angular 18 frontend for the BreizhSport application. The frontend communicates with the `auth` and `product` microservices to deliver a seamless user experience.

## Features

- User authentication (via `auth` microservice)
- Product browsing and management
- Order management

## Prerequisites

Ensure you have the following installed:

- [Node.js](https://nodejs.org/) (v16+ recommended)
- [Angular CLI](https://angular.io/cli) (v18+)
- [Docker](https://docs.docker.com/get-docker/) (optional for containerized builds)

## Repository Structure

```
BreizhSport-frontend/
├── src/
├── e2e/
├── angular.json
├── package.json
├── README.md
├── tsconfig.json
```

## Getting Started

### Environment Variables

Create a `.env` file in the root directory with the following content:

```
API_AUTH_BASE_URL=http://localhost:8081
API_PRODUCT_BASE_URL=http://localhost:8082
```

### Installing Dependencies

Install project dependencies:

```bash
npm install
```

### Running the Application

To serve the application locally:

```bash
ng serve
```

The application will be accessible at `http://localhost:4200`.

### Building the Application

To build the application for production:

```bash
ng build --prod
```

The build artifacts will be stored in the `dist/` directory.

### Running in Docker

To run the frontend in a Docker container:

1. Build the Docker image:

   ```bash
   docker build -t breizhsport-frontend .
   ```

2. Run the container:

   ```bash
   docker run -p 4200:80 breizhsport-frontend
   ```

The application will be accessible at `http://localhost:4200`.

## API Integration

### Authentication

The frontend interacts with the `auth` microservice for user authentication. Ensure the `API_AUTH_BASE_URL` in your `.env` file points to the correct `auth` microservice URL.

### Product Management

The frontend fetches and manages product data via the `product` microservice. Ensure the `API_PRODUCT_BASE_URL` in your `.env` file points to the correct `product` microservice URL.

## Testing

Run unit tests with:

```bash
ng test
```

Run end-to-end tests with:

```bash
ng e2e
```

## Contribution

To contribute to this frontend project:

1. Fork the repository.
2. Create a new branch for your feature or bugfix.
3. Commit your changes and push them to your fork.
4. Submit a pull request for review.

## License

This project is licensed under the MIT License.

