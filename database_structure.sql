CREATE TABLE users (
    _id VARCHAR(255),
    openid VARCHAR(255),
    user_name VARCHAR(255),
    student_id VARCHAR(255),
    type INT,
    PRIMARY KEY (_id)
);

CREATE TABLE activities (
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

CREATE TABLE user_activity (
    user_id VARCHAR(255),
    activity_id VARCHAR(255),
    FOREIGN KEY (user_id) REFERENCES users(_id),
    FOREIGN KEY (activity_id) REFERENCES activities(_id),
    PRIMARY KEY (user_id, activity_id)
);
