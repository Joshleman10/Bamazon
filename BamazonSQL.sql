DROP DATABASE IF EXISTS bamazon;

CREATE DATABASE bamazon;

DROP TABLE IF EXISTS products;

CREATE TABLE products(

Item_id INT NOT NULL,
Product_Name VARCHAR (50),
Department_Name VARCHAR (50),
Price DECIMAL NOT NULL,
Stock_Quantity INT NOT NULL
);

INSERT INTO products (Item_id, Product_Name, Department_Name,
 Price, Stock_Quantity)
 VALUES
 ("123456", "Coffee", "Groceries", "4.00", "400"),
 ("123457", "Burrito", "Groceries", "5.00", "100"),
 ("123458", "Donut", "Groceries", ".50", "1000"),
 ("123459", "Video Game", "Electronics", "60.00", "50"),
 ("123460", "Laptop", "Electronics", "1000.00", "50"),
 ("123461", "iPhone", "Electronics", "800.00", "150"),
 ("123462", "Shampoo", "Health & Beauty", "4.00", "300"),
 ("123463", "Toothpaste", "Health & Beauty", "5.00", "300"),
 ("123464", "Asprin", "Health & Beauty", "2.50", "500"),
 ("123465", "Flowers", "Lawn & Garden", "15.00", "30"),
 ("123466", "Potting Soil", "Lawn & Garden", "10.00", "100");
 
 SELECT * FROM products;
 



