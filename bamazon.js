//requiring mysql and inquirer
var mysql = require("mysql");
var inquirer = require("inquirer");

//variable creating connection to mysql
var con = mysql.createConnection({
  host: "localhost",

  // port
  port: 3306,

  // username
  user: "root",

  // password
  password: "root",
  database: "bamazon"
});

//connecting to database
con.connect(function (err) {
  if (err) throw err;
  ask();
});

//funciton asking for customer order
function ask() {

  //selecting all from prodcuts table
  con.query("SELECT * FROM products", function (err, results) {
    if (err) {
      throw err;
    }
    else {
      console.log("Welcome to Bamazon.  The following is a list of our current products:");
      console.log(results);
    }

    //beginning prompt to accept customer order
    inquirer.prompt([

      //creating list of item id's for customer to select from
      {
        type: "rawlist",
        choices: function () {
          var choiceArray = [];
          for (var i = 0; i < results.length; i++) {
            choiceArray.push(results[i].Item_id);
          }
          return choiceArray;
        },
        name: "itemID",
        message: "What is the item ID of the product you would like to buy?"
      },

      //asking the customer how many they would like of that item
      {
        name: "quantity",
        type: "input",
        message: "How many of these would you like to purchase?"
      }

      //after receiving answers from the customer...
    ]).then(function (answer) {

      let item = "";
      let quantity = 0;

      console.log(answer.itemID);
      console.log(answer.quantity);

      //looping through the results of inquiry to determin which item was selected
      for (var i = 0; i < results.length; i++) {

        if (err) {
          throw err;
        }

        else if (answer.itemID === results[i].Item_id) {
          item = results[i];
          quantity = answer.quantity;
          console.log("You have decided to purchase " + quantity + " units of " + item.Product_Name);
        }
      }
      let trueQuan = parseInt(quantity);

      //if the stock quantity exceeds the total stock quantity
      if (item.Stock_Quantity < trueQuan) {
        console.log("I'm sorry, we only have " + item.Stock_Quantity + " in stock.  Please order a quantity less than our current inventory.")
        console.log("Current inventory quantity: " + item.Stock_Quantity);
        console.log("Your requested order quantity: " + trueQuan);
      }

      //else... filling the cutomer's order
      else {

        //subtracting the customer order from inventory
        let price = (item.Price * quantity);
        let newInv = (item.Stock_Quantity - trueQuan);
        con.query(
          "UPDATE products SET Stock_Quantity = " + newInv,
        )

        //logging the updated inventory & the total cost of the order to the customer
        console.log("Inventory updated: " + item.Stock_Quantity + " " + item.Product_Name + " remaining in stock.");
        console.log("Thank you for your purchase.  The total cost of your order was: $" + price);

        //running the function to end the connection to avoid async errors
        finishOrder();
      }
    })
  })
};
function finishOrder() {
  con.end();
}