USE project319;
CREATE TABLE Users (
    ID INT AUTO_INCREMENT PRIMARY KEY, -- Unique identifier for each user
    Password VARCHAR(255) NOT NULL,    -- Stores user password
    Role ENUM('Guide', 'Advisor', 'Coordinator', 'Director', 'Promo_Coordinator') NOT NULL
);
