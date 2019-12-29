CREATE SCHEMA woozer;

CREATE TABLE user (
	id INT PRIMARY KEY NOT NULL,
    username VARCHAR(25),
    email VARCHAR(255)
);