CREATE TABLE User (
    _id VARCHAR(255),
    user_name VARCHAR(255),
    student_id VARCHAR(255),
    type INT,
    PRIMARY KEY (_id)
);

CREATE TABLE Activities (
    _id VARCHAR(255),
    activity_name VARCHAR(255),
    description_thumb VARCHAR(255),
    description TEXT,
    location VARCHAR(255),
    date DATE,
    post_time DATETIME,
    registration_deadline DATETIME,
    organizer VARCHAR(255),
    max_participants INT,
    current_participants INT,
    PRIMARY KEY (_id)
);
