CREATE USER 'katar'@'localhost' IDENTIFIED BY 'password';
GRANT ALL PRIVILEGES ON `HealthDiary`.* TO 'katar'@'localhost';
FLUSH PRIVILEGES;
