var mysql = require("mysql");

var inquirer = require("inquirer");

require("console.table");

displayMerchandise();

function newConnection() {
  var connection = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "CuL@8Poos",
    database: "bamazon"
  });
  return connection;
}

function displayMerchandise() {
  var cn = newConnection();
  cn.connect(function(err) {
    if (err) throw err;
    cn.query("select item_id, product_name, price from products", function(
      err,
      res
    ) {
      console.table(res);
      cn.end();
      promptId(res);
    });
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
      },
      {
        type: "input",
        name: "qty_choice",
        message: "How many would you would like to buy."
      }
    ])
    .then(function(processOrder) {
      var c2 = newConnection();
      c2.connect(function(err) {
        if (err) throw err;
        q1 =
          "select stock_quantity, price from products where item_id='" +
          processOrder.id_choice +
          "';";
        console.log("Query is:", q1);

        c2.query(q1, function(err, res2) {
          console.table(res2);
          c2.end();
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
        });
      });
    });
}

function updateInventory(id, qty) {
  var c3 = newConnection();
  console.log("Updating inventory", id, qty);
  c3.connect(function(err) {
    if (err) throw err;
    c3.query(
      "update products set stock_quantity = " +
        qty +
        " where item_id='" +
        id +
        "';",
      function(err, res3) {
        console.log("Inventory updated");
        c3.end();
      }
    );
  });
}
