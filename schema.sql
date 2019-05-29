-- Drops the database if it exists currently --
DROP DATABASE IF EXISTS rrc_db;
-- Creates the database --
CREATE DATABASE rrc_db;

USE rrc_db;

CREATE TABLE USERS (
  id INT NOT NULL AUTO_INCREMENT,
  userName VARCHAR(200) UNIQUE NOT NULL,
  email VARCHAR(200) UNIQUE NOT NULL,
  userPassword VARCHAR(40) NOT NULL,
  PRIMARY KEY (id)
);

    
CREATE TABLE OPERATOR (
  id INT NOT NULL AUTO_INCREMENT,
  operatorName VARCHAR(200) NOT NULL,
  operatorNumber VARCHAR(40) UNIQUE NOT NULL,
  operatorAddress VARCHAR(200) NOT NULL,
  operatorPhone VARCHAR(10) NOT NULL,
  operatorBirthday DATETIME,
  h15Rules DATETIME,
  authID INT,
  FOREIGN KEY (authID) REFERENCES USERS(id),
  PRIMARY KEY (id)
);

CREATE TABLE MEMBER (
	id INT NOT NULL AUTO_INCREMENT,
    memberName VARCHAR(200) NOT NULL,
	memberTitle VARCHAR(200) NOT NULL,
    operateID INT,
    FOREIGN KEY (operateID) REFERENCES OPERATOR(id),
    PRIMARY KEY (id)
);

CREATE TABLE OPFIELD (
	id INT NOT NULL AUTO_INCREMENT,
    fieldName VARCHAR(200) NOT NULL,
    fieldNumber VARCHAR(40) UNIQUE NOT NULL,
    fieldRules DATETIME NOT NULL,
    operatorID INT,
    FOREIGN KEY (operatorID) REFERENCES OPERATOR(id),
    PRIMARY KEY (id)
);
    
CREATE TABLE LEASE (
  id INT NOT NULL AUTO_INCREMENT,
  districtNumber VARCHAR(2) NOT NULL,
  countyName VARCHAR(40) NOT NULL,
  leaseName VARCHAR(200) NOT NULL,
  leaseNumber VARCHAR(40) UNIQUE NOT NULL,
  fieldID INT,
  FOREIGN KEY (fieldID) REFERENCES OPFIELD(id),
  PRIMARY KEY (id)
);

CREATE TABLE WELLS (
  id INT NOT NULL AUTO_INCREMENT,
  wellName VARCHAR(200) NOT NULL,
  apiNumber VARCHAR(40) UNIQUE NOT NULL,
--   **************************************
-- 	Assuming an integer for the well types:
-- 		   1 - oil producing
--         2 - gas producing
--         3 - oil inactive
--         4 - gas inactive
--         5 - injection
--   **************************************
  wellType INT NOT NULL,
  dateCompleted DATETIME NOT NULL,
  dateInactive DATETIME,
  h10Rules DATETIME,
  leaseID INT,
  FOREIGN KEY (leaseID) REFERENCES LEASE(id),
  PRIMARY KEY (id)
);


CREATE TABLE FILINGS (
  id INT NOT NULL AUTO_INCREMENT,
  filingName VARCHAR(200) NOT NULL,
  wellType INT NOT NULL,
  frequency VARCHAR(40) NOT NULL,
  contactName VARCHAR(200) NOT NULL,
  contactNumber VARCHAR(10) NOT NULL,
  dueDate DATETIME,
  wellID INT,
  FOREIGN KEY (wellID) REFERENCES WELLS(id),
  PRIMARY KEY (id)
);

CREATE TABLE TESTS (
	id INT NOT NULL AUTO_INCREMENT,
    testID INT,
    wellID INT,
    FOREIGN KEY (testID) REFERENCES FILINGS(id),
    FOREIGN KEY (wellID) REFERENCES WELLS(id),
    PRIMARY KEY (id)
    );

CREATE TABLE WELLTYPE (
id INT NOT NULL AUTO_INCREMENT,
wellType VARCHAR(200) NOT NULL,
PRIMARY KEY (id)
);

USE rrc_db;
INSERT INTO USERS (userName, email) VALUES
("chuck norris", "momadison@me.com"),
("jeffrey skilling", "madison@madisonandwright.com");
INSERT INTO OPERATORS (operatorName, operatorNumber, operatorAddress, operatorPhone, operatorBirthday, h15rules,  authID) VALUES
("Standard Oil", "000001", "123 main st", "8723456785", "1870-1-01", "2019-6-01", 1),
("Exxon Mobile", "521182", "2424 west 3rd st", "9034567123", "1999-11-03", "2019-6-01", 2),
("Basic Oil", "420231", "123 main st", "8723456785", "1870-1-01", "2019-6-01", 1);
INSERT INTO MEMBERS (memberName, memberTitle, operatorID) VALUES
("chuck norris", "president", 1),
("jeffrey skilling", "coo", 2);
INSERT INTO OPFIELDS (fieldName, fieldNumber, fieldRules, operatorID) VALUES
("tunstill east (delaware)","91818500", "2019-06-01", 1),
("turner gregory  (clear fork)","91903333", "2019-03-01", 3); 
INSERT INTO LEASES (districtNumber, countyName, leaseName, leaseNumber, fieldID) VALUES
("8", "loving", "tunstill unit","36550", 1),
("8", "mitchell", "turner gregory unit","36961", 2); 
INSERT INTO WELLS (wellName, apiNumber, wellType, dateCompleted, dateInactive, h10Rules, leaseID) VALUES
("well_1", "50105095", 1, "1988-7-04", NULL, NULL, 1),
("well_2", "34767892", 2, "1962-5-18", NULL, NULL, 2),
("well_3", "90123156", 3, "1975-12-12", "2012-7-29", NULL, 1),
("well_4", "56034596", 4, "1951-8-30", "1972-8-29", NULL, 2),
("well_5", "34456765", 5, "2008-7-29", "2019-6-01", "2019-6-01", 1);  
INSERT INTO FILINGS (filingName, wellType, frequency, contactName, contactNumber) VALUES
("Production", 1,"monthly", "help desk", "5124636726"),
("Production", 2,"monthly", "help desk", "5124636726"),
("P5", 1, "annually", "p5 department", "5124636772"),
("G10", 2, "annually", "well compliance", "5124636975"),
("H10", 5, "annually", "margot buyens", "5124632903"),
("H15", 3, "annually", "barbara", "5124636912"),
("H15", 4, "annually", "barbara", "5124636912"),
("H5", 5, "annually", "julie requejo", "5124633616"),
("W3C", 3, "annually", "p5 department", "5124636772"),
("W3C", 4, "annually", "p5 department", "5124636772"),
("W3X", 3, "annually", "p5 department", "5124636772"),
("W3X", 4, "annually", "p5 department", "5124636772"),
("W10", 1, "annually", "well compliance", "5124636975");
INSERT INTO TESTS (testID, leaseID, wellID, usrID, dueDate) VALUES
(1,1,1,1,"2019-6-01"),
(13,1,1,1,"2019-6-01"),
(2,2,2,1,"2019-6-01"),
(4,2,2,1,"2019-6-01"),
(6,3,3,1,"2019-6-01"),
(9,3,3,1,"2019-6-01"),
(11,3,4,1,"2019-6-01"),
(6,4,4,1,"2019-6-01"),
(9,4,5,1,"2019-6-01"),
(11,4,5,1,"2019-6-01"),
(5,5,1,1,"2019-6-01"),
(8,5,1,1,"2019-6-01"); 

SELECT * FROM USERS;
SELECT * FROM OPERATORS;
SELECT * FROM OPFIELDS;
SELECT * FROM LEASES;
SELECT * FROM WELLS;
SELECT * FROM FILINGS;
SELECT * FROM TESTS;

SELECT * FROM  INNER JOIN USERS ON OPERATORS.authID = USERS.id