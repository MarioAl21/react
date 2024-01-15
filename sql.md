# Index

1. SQL

   1.1 SELECT

    1.1.1 COUNT

    1.1.2 DISTINCT

   1.2. WHERE

    1.2.1 NOT
    
    1.2.2 AND
    
    1.2.3 OR

    1.2.4 LIKE

   [1.3 ORDER BY](#13-order-by)

   [1.4 ALTER](#14-alter)

2. MySQL

   2.1 How to use MYSQL Command Line Client
 
   2.2 List all the databases

   2.3 List all the tables

   2.4 Show the schema of a table 

3. SQL SERVER

   3. How to connect from CLI

   3. How to view a list of databases on an instance (Using SQL SERVER MS or Transact-SQL)

   [3. How to display all the tables from a database](#3-how-to-display-all-the-tables-from-a-database)

   3. Add a new column

   3. Alter a column to accept NULL


# 1. SQL
## 1.1 SELECT
```
SELECT * FROM database.table;
```
To select all fields of a table
```
SELECT column1, column2, ... FROM database.table;
```
To select some of our fields.
```
SELECT DISCTINCT column1, column2, ... FROM database.table_name;
```
To select all different values from a certain column in a specfied table.
### 1.1.1 COUNT
```
SELECT COUNT(*) FROM table_name
```
We will get the total number of the logs from a table. 
### 1.1.2 DISTINCT
```
SELECT DISTINCT column1 FROM table_name; 
```
We will get all the different values from a table given a column.

**Mixing our COUNT with DISCTINCT**
```
SELECT COUNT(DISTINCT column) FROM table_name;
```
We will get all the total of values that are not repeated into a table.

Example:
```
SELECT COUNT(DISTINCT nombre) FROM bd_users;
```
## 1.2 WHERE
```
SELECT * FROM table_name WHERE condition;
```
Allows to do a depth select over the logs of a table.

Ejemplo:
```
SELECT * FROM Customers WHERE City = 'Berlin';
```
ℹWe can also use it with UPDATE, DELETE, etc.

**Accepted Operators by WHERE clause**
```
=, >, <, >=, <=, <>, BETWEEN, LIKE, IN
```
### 1.2.1 NOT
```
SELECT * FROM table_name WHERE NOT condition;
```
Allows discrimination logs given the WHERE clause.

Ejemplo(s):
```
SELECT * FROM customers WHERE NOT City = 'Berlin';
```
```
SELECT * FROM Customers WHERE id = 34;
```
### 1.2.2 AND
```
SELECT * FROM table_name WHERE column1 = value1 AND column2 = value2;
```
Allows to obtain a log by using more then one conicidence.
Ejemplo:
```
SELECT * FROM Customers WHERE City = 'Berlin' AND PostalCode = 12209;
```
AND operator is use to filter records based on more than one condition , like if we want to return all customers from Spain that starts with 'G' letter:
```
SELECT *
FROM Customers
WHERE Country = 'Spain' AND CustomerName LIKE 'G%';
```
Syntax:
```
SELECT column1, column2, ...
FROM table_name
WHERE condition1 AND condition2 AND condition3 ...;
```
**AND VS OR**
```
The AND operator displays a record if all the conditions are TRUE.

The OR operator displays a record if any of the conditions are TRUE.
```
### 1.2.3 OR
```
SELECT * FROM Customers WHERE City = 'Berlin' OR City = 'London';
```
Allows to obtain one of two mathes.

ℹThe WHERE clause can contain one or more OR operators.

Syntax
```
SELECT column1, column2, ...
FROM table_name
WHERE condition1 OR condition2 OR condition3 ...;
```
Ejemplo:

The following SQL statement selects all fields from Customers where either City is "Berlin", CustomerName starts with the letter "G" or Country is "Norway".
```
SELECT * FROM Customers
WHERE City = 'Berlin' OR CustomerName LIKE 'G%' OR Country = 'Norway';

SELECT * FROM Customers
WHERE Country = 'Spain' AND (CustomerName LIKE 'G%' OR CustomerName LIKE 'R%');

SELECT * FROM Customers
WHERE Country = 'Spain' AND CustomerName LIKE 'G%' OR CustomerName LIKE 'R%';
```

### 1.2.4 NOT LIKE
Select customers that does not start with the letter 'A':
```
SELECT * FROM Customers
WHERE CustomerName NOT LIKE 'A%';
```
### 1.2.5 NOT BETWEEN
Select customers with a customerID not between 10 and 60:
```
SELECT * FROM Customers
WHERE CustomerID NOT BETWEEN 10 AND 60;
```
### 1.2.6 NOT IN
Select customers that are not from Paris or London:
```
SELECT * FROM Customers
WHERE City NOT IN ('Paris', 'London');
```
### 1.2.6 NOT Greater Than
Select customers with a CustomerId not greater than 50:
```
SELECT * FROM Customers
WHERE NOT CustomerID > 50;
```
### 1.2.6 NOT Less Than
Select customers with a CustomerID not less than 50:
```
SELECT * FROM Customers
WHERE NOT CustomerId < 50;
```
## 1.3 ORDER BY
The ORDER BY keyword sorts the records in ascending order by default.
```
SELECT column1, column2, ...
FROM table_name
ORDER BY column1, column2, ... ASC|DESC;
```
Ejemplo:
```
SELECT * FROM Customers
ORDER BY Country, City;
```
### 1.3.1 DESC
To sort the records in descending order, use the DESC keyword.

Ejemplo:
```
SELECT * FROM Products
ORDER BY Price DESC;
```
**Using both ASC and DESC**

### 1.4 ALTER 
```
ALTER TABLE user
      MODIFY COLUMN id_user INT AUTO_INCREMENT PRIMARY KEY;
```
This sentence allows us to set a primary key field after created to turn it into an auto increment value.

## Knowledge
```
--SELECT COUNT(permiso) as total FROM db_permisos ORDER BY total;
--SELECT COUNT(grupo) as totalPermisos, MAX(grupo) as grupo FROM db_permisos;
SELECT * FROM
(SELECT COUNT(permiso) as permisosTotal, MAX(grupo) as grupo FROM db_permisos GROUP BY grupo) as resultado 
WHERE permisosTotal >= 4 AND permisosTotal <= 20 ORDER BY permisosTotal;
--HAVING COUNT(permiso) >= 4 AND COUNT(permiso) <= 20 ORDER BY permisosTotal;
WITH dataT as (SELECT COUNT(permiso) as permisosTotal, MAX(grupo) as grupo FROM db_permisos GROUP BY grupo)
SELECT * FROM dataT WHERE permisosTotal >= 4 AND permisosTotal <= 20 ORDER BY permisosTotal;
```

# 2. MySQL

## Print MYSQL version
```
SHOW VARIABLES LIKE 'version';
```

We'll obtain something like this:

```
version  |  10.4.28-MariaDB
```

## Drop a Foreign Key

```
SHOW CREATE TABLE table_name
```

This prints the foreign key constraint name. Prints some like:

```
***************************   1. row ***************************
       Table: child
Create Table: CREATE TABLE `child` (
  `id` int DEFAULT NULL,
  `parent_id` int DEFAULT NULL,
  KEY `par_ind` (`parent_id`),
  CONSTRAINT `child_ibfk_1` FOREIGN KEY (`parent_id`)
  REFERENCES `parent` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci
```

Execute the next command to drop the foreign key.

```
ALTER TABLE child DROP FOREIGN KEY `child_ibfk_1`;
```

## Add a new foreign key

```
ALTER TABLE task ADD FOREIGN KEY (id_user) REFERENCES user(id_user);
```

## 2.1 How to use MYSQL Command Line Client
```
mysql -u root -p
```
ℹNOTE: Thi p flag requests for password. Usually  root user doesn´t have one by default.
## 2.2 List all the databases
```
show databases;
```
## 2.3 List all the tables

```
show tables;
```
## 2.4 Show the schema of a table
```
describe databaseName.tableName;
```
Ejemplo:
```
describe sfm.db_users; 
```

# 3. SQL SERVER
## 3 How to connect from CLI
Using **sqlcmd** utility that lets us enter Transact-SQL statements, system procedures, and script files at the command prompt. 
```
sqlcmd
```
We now have a trusted connection to the default instance of SQL Server that is running on your computer

ℹNOTE: Windows Authentication is the default authentication mode for sqlcmd. To use SQL Server Authentication, we must specify a user name and password by using the -U and -P options.
```
sqlcmd -S myServer\instanceName
```
We set a connection to a named instance.

Ejemplo:
```
sqlcmd -S SFITDES-S3\SCADA
```
## 3 How to view a list of databases
```
SELECT name, database_id, create_date FROM sys.databases;
GO
```
## 3 How to display all the tables from a database
In SQL SERVER we have four different ways to list all the tables in a database
```
SELECT table_name
FROM INFORMATION_SCHEMA.TABLES
WHERE table_type = 'BASE TABLE'

SELECT name
FROM sys.tables

SELECT name
FROM sysobjects
WHERE xtype = 'U'

SELECT name
FROM sys.objects
WHERE type_desc = 'USER_TABLE'
```
## Describe tables in SQL SERVER
```
EXEC sp_help 'db_users'
```
This is equivalent to *describe table_name* in MySQL.
# Backup
```
$ mysqldump -u username -p"password" -R oldDbName > oldDbName.sql.
$ mysqladmin -u username -p"password" create newDbName.
$ mysql -u username -p"password" newDbName < oldDbName.sql.
```

## Add a new Column

```
ALTER TABLE dbo.doc_exa 
ADD column_b VARCHAR(20) NULL, column_c INT NULL ;
```
