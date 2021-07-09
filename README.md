# Welcome to Xamber test!

Hi this is a starting point url shortener project written in Nodejs and express.

**Prerequisite to install** 
 - Latest intall of node.js
 - A text editor, Like VScode

**Stack being used**
 - Nodejs with expressjs 
 - Prisma2 as ORM

**
## Installation
To install this project you need to

 1. Clone the **github** repository into your computer or server .
 2. Open a terminal in the cloned folder and run the following command.
 3. `npm install`
 4. Once done, Change your database settings in the .env file.
 5. Change your base url in the .env file to your webserver link.
 6. Run :  `npx prisma migrate dev  --name init` to apply the migration to the database.

**Note**
Make sure your database server is running before you apply the migrations.



## Scalability and performance notes
**Performance of the redirection**
To increase the overall performance of the redirection  function without increasing the cost, A very good sollution is to rewrite the **redirection function ( Controller )**  as a stand alone service written in a more robust programming language like **Rust** or **GOlang ( Prefered )**, This sollution will **multiply the number of requests** the server handles per/second by at least **8X times** taking goland as an example. 

To get a better idea of what i am talking about check this performance test made by [techEmpower](https://www.techempower.com/benchmarks/). Do a search of **fiber-prefork** ( golang framework ) vs Express ( Nodejs framework ).


