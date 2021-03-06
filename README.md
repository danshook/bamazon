<h1>bamazon</h1>

<p>Project source can be downloaded from https://github.com/danshook/bamazon.

<h3>Author</h3>

Daniel Shook

<h3>Overview</h3>
This command line interface (CLI) app was developed as part of a software development course assignment. In this assignment, I created an Amazon-like store. The app will take in orders from customers and deplete stock from the store's inventory.
<br>
<h4>After initiating the app, it will display all product names with their respective item IDs and prices. It then prompts the user to enter the ID of the product they wish to purchase.</h4>

![](images/1.png)

![](images/2.png)

<h4>After the user enters the quantity of the product they wish to purchase, the app will check with the database to ensure there is adequate inventory to satisfy the order. If so, the user will receive this message:</h4>

![](images/3.png)

<h4>In this scenario, the user chooses a different product to purhcase...</h4>

![](images/4.png)

<h4>However, the user attempts to purchase more product than the store has on hand and receives the following message:</h4>

![](images/5.png)

<h2>Technologies used</h2>

    * MySQL
    * Node.js
    * NPM Package(s)
        * MySQL
        * Inquirer
        * console.table
    * JavaScript
