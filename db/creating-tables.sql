DROP DATABASE IF EXISTS HealthDiary;
CREATE DATABASE HealthDiary;
USE HealthDiary;


CREATE TABLE Users (
    user_id INT AUTO_INCREMENT PRIMARY KEY,
    username VARCHAR(50) NOT NULL UNIQUE,
    password VARCHAR(100) NOT NULL,
    email VARCHAR(100) NOT NULL,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    user_level VARCHAR(15) DEFAULT 'regular'
);

CREATE TABLE DiaryEntries (
    entry_id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT,
    entry_date DATE NOT NULL,
    anxiety_level INT,
    notes VARCHAR(255),
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES Users(user_id)
);

INSERT INTO Users (user_id, username, password, email, created_at, user_level) VALUES
  (1, 'johndoe', 'temp-pw-1', 'johndoe@example.com', '2024-01-02 10:00:00', 'regular');

INSERT INTO Users (username, password, email, user_level) VALUES
  ('janedoe', 'temp-pw-2', 'janedoe@example.com', 'admin'),
  ('mike_smith', 'temp-pw-3', 'mike@example.com', 'moderator');

INSERT INTO DiaryEntries (user_id, entry_date, anxiety_level, notes, created_at) VALUES
  (7, '2024-01-10', 1, 'Kiva päivä', '2024-01-10 20:00:00'),
  (7, '2024-01-08', 3, 'vähän väsytti', '2024-01-10 20:00:00'),
  (7, '2024-01-11', 6, 'töissä kiireistä', '2024-01-11 20:00:00'),
  (7, '2024-01-07', 7, 'lapsi sairaana', '2024-01-10 21:00:00');
