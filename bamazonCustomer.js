var mysql = require("mysql");
var inquirer = require("inquirer");
require("console.table");

var connection = mysql.createConnection({
  host: "127.0.0.1",
  port: 3306,
  user: "root",
  password: "CuL@8Poos",
  database: "bamazon"
});

connection.connect(function(err) {
  if (err) throw err;
  displayMerchandise();
});

function displayMerchandise() {
  connection.query("select * from products", function(err, res) {
    console.table(res);

    promptId(res);

    // for (var i = 0; i < res.length; i++) {
    // console.log(
    //   "ITEM ID: " +
    //     res[i].item_id +
    //     " | " +
    //     "ITEM NAME: " +
    //     res[i].product_name +
    //     " | " +
    //     "ITEM PRICE: " +
    //     res[i].price
    // );
  });
}

function promptId(inventory) {
  inquirer
    .prompt([
      {
        type: "input",
        name: "id_choice",
        message:
          "Please enter the item ID of the product you would like to buy."
      }
    ])
    .then(function(productId) {
      // logic using res value from user
      for (var i = 0; i < inventory.length; i++) {
        //console.log("FOR LOOPING");
        console.log("STOCK QTY: " + inventory[i].stock_quantity);
      }

      console.log("PRODUCT ID: " + JSON.stringify(productId));
      //console.log("INVENTORY: " + JSON.stringify(inventory));
    });
}