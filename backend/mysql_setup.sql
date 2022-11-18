
-- -- create table in db
-- CREATE TABLE `db`.`users` (
--     `id` INT NOT NULL AUTO_INCREMENT, 
--     `username` VARCHAR(45), 
--     `password` VARCHAR(15),
--     PRIMARY KEY (`id`), 
--     UNIQUE INDEX `id_UNIQUE` (`id` ASC) VISIBLE
-- );

-- DROP TABLE `cs4345`.`accounts`;

-- ACCOUNT TABLE
CREATE DATABASE IF NOT EXISTS cs4345;
USE cs4345;
CREATE TABLE `cs4345`.`accounts` (
    `smu_id` BIGINT UNSIGNED NOT NULL PRIMARY KEY,
    `password` VARCHAR(255) NOT NULL,
    `first_name` VARCHAR(255) NOT NULL,
    `last_name` VARCHAR(255) NOT NULL,
    `role_id` BIGINT UNSIGNED NOT NULL,
    `email` VARCHAR(255) NOT NULL
);

CREATE TABLE `cs4345`.`courses` (
    `course_id` BIGINT UNSIGNED NOT NULL PRIMARY KEY AUTO_INCREMENT,
    `course_name` VARCHAR(50) NOT NULL,
    `description` VARCHAR(500) NOT NULL,
    `professor_id` BIGINT UNSIGNED NOT NULL REFERENCES accounts(smu_id),
    `syllabus` BLOB NOT NULL
);

CREATE TABLE `cs4345`.`course_times` (
    `id?` INT UNSIGNED NOT NULL PRIMARY KEY AUTO_INCREMENT,
    `day` INT NOT NULL,
    `start` INT NOT NULL,
    `end` INT NOT NULL,
    `course_id` BIGINT UNSIGNED NOT NULL REFERENCES courses(course_id)
);

CREATE TABLE `cs4345`.`applications` (
    `application_num` BIGINT UNSIGNED NOT NULL PRIMARY KEY AUTO_INCREMENT,
    `resume` BLOB NOT NULL,
    `smu_id` BIGINT UNSIGNED NOT NULL REFERENCES accounts(smu_id),
    `grade` INT UNSIGNED NOT NULL,
    `course_id` BIGINT UNSIGNED NOT NULL REFERENCES courses(course_id)
);

CREATE TABLE `cs4345`.`application_times` (
    `id?` INT UNSIGNED NOT NULL PRIMARY KEY AUTO_INCREMENT,
    `day` INT NOT NULL,
    `start` INT NOT NULL,
    `end` INT NOT NULL,
    `app_num` BIGINT UNSIGNED NOT NULL REFERENCES applications(application_num)
);