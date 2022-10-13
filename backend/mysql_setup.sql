-- create database db
CREATE DATABASE db;

-- use newly create database
USE db;

-- -- create table in db
-- CREATE TABLE `db`.`users` (
--     `id` INT NOT NULL AUTO_INCREMENT, 
--     `username` VARCHAR(45), 
--     `password` VARCHAR(15),
--     PRIMARY KEY (`id`), 
--     UNIQUE INDEX `id_UNIQUE` (`id` ASC) VISIBLE
-- );

DROP TABLE `cs4345`.`accounts`;

-- ACCOUNT TABLE
CREATE TABLE `cs4345`.`accounts` (
    `smu_id` BIGINT UNSIGNED NOT NULL PRIMARY KEY,
    `password` VARCHAR(255) NOT NULL,
    `first_name` VARCHAR(255) NOT NULL,
    `last_name` VARCHAR(255) NOT NULL,
    `role_id` BIGINT UNSIGNED NOT NULL,
    `email` VARCHAR(255) NOT NULL

);


# INSERT INTO `cs4345`.`accounts` (username, password, first_name, last_name, role_id)
#     VALUES (
#             'alex',
#             'alex',
#             'alex',
#             'cerpa',
#             1
#     );