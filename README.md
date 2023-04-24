# CSVSQLWEB *

[Demo](https://hsps.in/csvsqlweb/)

A web based application that allows you to manipulate a CSV file using SQL. The app import the csv file into an in memory sqlite3 database, thus no data (100% privacy) is ever shared with the web server. The data in database can be manipulated using SQL, and then the result of the SQL can be downloaded as a CSV file.

This project doesn't use any special framework at the moment but we are building using 2 major libraries.

1) Papaparse
Papa parse, lightweight library that parses and generates CSV files.
2) sql.js
SQLite compiled to JavaScript

Things to do
------------

1) Proper/better name for the project
2) Move both Papa parse/SQL to service worker, to reduce load on the browser main thread.
3) Validate SQL query as valid before executing
4) Detect data type and use that when we create the table

Run Locally
-----------

```sh
npm install
http-server .
```
