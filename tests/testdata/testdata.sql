 CREATE TABLE users (
            id SERIAL PRIMARY KEY,
            name VARCHAR(100) NOT NULL,
            email VARCHAR(100) NOT NULL UNIQUE,
            password VARCHAR(100) NOT NULL
        );

        -- Insert data into the users table
        INSERT INTO users (name, email, password) VALUES ('John Doe', 'john.doe@example.com', 'password123');
        INSERT INTO users (name, email, password) VALUES ('Jane Smith', 'jane.smith@example.com', 'securepassword');
        INSERT INTO users (name, email, password) VALUES ('Alice Johnson', 'alice.johnson@example.com', 'mypassword');