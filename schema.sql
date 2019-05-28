-- Drops the database if it exists currently --
DROP DATABASE IF EXISTS rrc_db;
-- Creates the database --
CREATE DATABASE rrc_db;

USE rrc_db;

CREATE TABLE auth (
  id INT NOT NULL AUTO_INCREMENT,
  userName VARCHAR(200) UNIQUE NOT NULL,
  userPassword VARCHAR(40) NOT NULL,
  PRIMARY KEY (id)
);

CREATE TABLE operator (
  id INT NOT NULL AUTO_INCREMENT,
  operatorName VARCHAR(200) NOT NULL,
  operatorNumber VARCHAR(40) UNIQUE NOT NULL,
  operatorBirthday DATETIME,
  FOREIGN KEY (id) REFERENCES auth,
  PRIMARY KEY (id)
);

CREATE TABLE lease (
  id INT NOT NULL AUTO_INCREMENT,
  districtNumber VARCHAR(2) NOT NULL,
  countyName VARCHAR(40) NOT NULL,
  leaseName VARCHAR(200) NOT NULL,
  leaseNumber VARCHAR(40) UNIQUE NOT NULL,
  fieldName VARCHAR(200) NOT NULL,
  fieldNumber VARCHAR(40) UNIQUE NOT NULL,
  FOREIGN KEY (id) REFERENCES operator,
  PRIMARY KEY (id)
);

CREATE TABLE wells (
  id INT NOT NULL AUTO_INCREMENT,
  wellName VARCHAR(200) NOT NULL,
  apiNumber VARCHAR(40) UNIQUE NOT NULL,
  wellType VARCHAR(40) NOT NULL,
  FOREIGN KEY (id) REFERENCES lease,
  PRIMARY KEY (id)
);

CREATE TABLE filings (
  id INT NOT NULL AUTO_INCREMENT,
  filingName VARCHAR(200) UNIQUE NOT NULL,
  wellType VARCHAR(40) NOT NULL,
  frequency VARCHAR(40) NOT NULL,
  contactName VARCHAR(200) NOT NULL,
  contactNumber VARCHAR(7) NOT NULL,
  dueDate DATETIME,
  FOREIGN KEY (id) REFERENCES wells,
  PRIMARY KEY (id)
);
