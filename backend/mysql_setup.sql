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

-- ACCOUNT TABLE
CREATE TABLE `cs4345`.`accounts` (
    `account_id` SERIAL,
    `username` VARCHAR(100) NOT NULL,
    `password` VARCHAR(255) NOT NULL,
    `first_name` VARCHAR(255) NOT NULL,
    `last_name` VARCHAR(255) NOT NULL,
    `role_id` BIGINT UNSIGNED NOT NULL,
    PRIMARY KEY (`account_id`)
);


# INSERT INTO `cs4345`.`accounts` (username, password, first_name, last_name, role_id)
#     VALUES (
#             'alex',
#             'alex',
#             'alex',
#             'cerpa',
#             1
#     );