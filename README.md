# Getting Started

## Downloading the repository

1. Open powershell in any directory.
2. Copy the repository link.
3. Use `git clone <url>`

## Creating DB

First you need to create a database and fill it with initial data in fact, for this purpose, there is a file init-db.sql in the root of our project.

1. Open root directory in this project.
2. In file ./server/database/db.js set up a connection to the database (insert your data).
3. Open PSQL Shell
4. Enter the command `\i <full path to the file>\init-db.sql`
5. There will be a connection to the database and filling with initial data.

## Launching the application

1. Open root directory in this project.
2. Open two terminals from root directory.
3. Use `Yarn install` for downloading dependencies.
4. Use `Yarn workspace server start` and `Yarn workspace client start`
