# Store Products API

A RESTful API for creating and managing products in a store, with JWT-based authentication for secure access.

#### **BASE URL** - [https://store-5fx8.onrender.com/api/v1](https://store-5fx8.onrender.com/api/v1)

#### **POSTMAN DOCS** - [API Documentation on Postman](https://documenter.getpostman.com/view/36399546/2sB2cREQQP)

## To Run Locally

1. Clone the repository:

    ```bash
    git clone https://github.com/timilehin2000/store
    cd store
    ```

2. Ensure Docker is installed on your local machine.

3. Set up environment variables by creating a `.env` file based on `.env.example`.
	```bash
	cp env.example .env
	```

4. Install dependencies:

    ```bash
    npm install
    ```

5. Run the application:

    ```bash
    npm run dev
    ```

6. Optionally, **Run with Docker**:
    - Build and run Docker containers:
        ```bash
       docker build -t store .
        ```
    - To stop and remove Docker containers:
        ```bash
        docker run -p 3000:3000 --env-file .env store
        ```
7. To run tests:

    ```bash
    npm test
    ```
