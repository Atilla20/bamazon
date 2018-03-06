var mysql = require('mysql');

var inquirer = require('inquirer');

//npm install mysql and inquirer

var connection = mysql.createConnection({
    host: 'localhost',
    port: '3306',
    user:'root',
    password: '',
    database: 'bamazon_db'
});



function begin() {


    connection.query("SELECT * FROM products", function(error, response) {

       if(error) throw error;

        console.log("Here's our selection.../n");

        console.log(' ID    |    Product Name    |    Department Name    |    Price    |   In stock');
        console.log('- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -');

        //Loops through and shows all items on database

        for( var i = 0; i < response.length; i++) {
          var itemId = response[i].item_id + ' '; //convert to string
        

          var productName = response[i].product_name + ' '; //convert to string
         

          var departmentName = response[i].department_name + ' '; //convert to string
         

          var price = '$' + response[i].price.toFixed(2) + ' '; //converts to string
        

          var quantity = response[i].stock_quantity + ' '; // converts to string

          console.log(itemId + '|' + productName + '|' + departmentName + '|' + price + '|' + quantity);
        }
        inquirer
        .prompt([
          {
          name: "yourOrder",
          type: "input",
          message: "What is the id of the item you wish to purchase?",
          validate: function(value) {
            if(isNaN(value) === false && parseInt(value) <= response.length && parseInt(value) > 0) {
              return true;
            } else {
              return false;
            }
          }
        },
        {
        name: "quantity",
          type: "input",
          message: "How much of this item would you like to purchase?",
          validate: function(value) {
            if(isNaN(value)) {
              return false;
            } else{
              return true;
            }
          }
        }
      ])
        .then(function(answer) {
          console.log("You want " + answer.quantity + " of this item.");
          console.log('- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -');
          console.log("I am checking store now to see if we have this much in stock");

          var item = (answer.yourOrder) -1;
          var amount = parseInt(answer.quantity);

          var total = parseFloat(((response[item].price) * amount).toFixed(2));

          var amountLeft = parseFloat(((response[item].stock_quantity) - amount).toFixed(2));

          //this checks to see if there's enough of the item in stock

          if(response[item].stock_quantity >= amount) {
            connection.query('UPDATE products SET ? WHERE ?', [
              {stock_quantity: (response[item].stock_quantity - amount)},
              {item_id: answer.yourOrder}
            ], function (error, result) {
              if(error) throw error;
              console.log("Your order has been placed! Your total purchase is $" + total.toFixed(2) + ".");
              console.log("The total amount left is " + amountLeft + ".");
            });
          }

            else {
              console.log("Insufficient amount in stock. Cannot fulfill your order.");
            }
          
            })

    })
}
begin();





  