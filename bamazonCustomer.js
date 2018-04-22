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
  connection.query(
    "select item_id, product_name, price from products",
    function(err, res) {
      if (err) throw err;
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
    }
  );
}

function promptId(inventory) {
  inquirer
    .prompt([
      {
        type: "input",
        name: "id_choice",
        message:
          "Please enter the item ID of the product you would like to buy."
      },
      {
        type: "input",
        name: "qty_choice",
        message: "How many would you would like to buy."
      }
    ])
    .then(function(processOrder) {
      var c2 = mysql.createConnection({
        host: "127.0.0.1",
        port: 3306,
        user: "root",
        password: "CuL@8Poos",
        database: "bamazon"
      });

      c2.connect(function(err) {
        if (err) throw err;

        q1 =
          "select stock_quantity, price from products where item_id=" +
          processOrder.id_choice +
          ";";

        console.log("Query is:", q1);

        c2.query(
          q1,

          function(err, res2) {
            console.table(res2);

            if (res2[0].stock_quantity >= processOrder.qty_choice) {
              console.log(
                "Congratulations!  Your purchase total is:",
                processOrder.qty_choice * res2[0].price
              );

              updateInventory(
                processOrder.id_choice,
                res2[0].stock_quantity - processOrder.qty_choice
              );
            } else {
              console.log("Insufficient inventory");
            }
          }
        );
      });
    });
}

function updateInventory(id, qty) {
  var c3 = mysql.createConnection({
    host: "127.0.0.1",
    port: 3306,
    user: "root",
    password: "CuL@8Poos",
    database: "bamazon"
  });

  console.log("Updating inventory", id, qty);

  c3.connect(function(err) {
    if (err) throw err;

    c3.query(
      "update products set stock_quantity = " +
        qty +
        " where item_id=" +
        id +
        ";",

      function(err, res3) {
        console.log("Inventory updated");
      }
    );
  });
}
