drop database if exists bamazon_db;

create database bamazon_db;

use bamazon_db;

create table products (
	item_id integer(11) not null,
	product_name varchar(50),
	department_name varchar(50),
	price integer(11),
	stock_quantity integer(11)
);

insert into products (item_id,product_name, department_name, price, stock_quantity)
value (1, "bananas", "produce", .59, 100);

insert into products (item_id,product_name, department_name, price, stock_quantity)
value (2, "milk", "produce",4.00 , 50);

insert into products (item_id,product_name, department_name, price, stock_quantity)
value (3, "socks", "clothing", 10.00, 150);

insert into products (item_id,product_name, department_name, price, stock_quantity)
value (4, "rubix cube", "toys", 15.00, 10);

insert into products (item_id,product_name, department_name, price, stock_quantity)
value (5, "google home", "electronics", 200.00, 6);

insert into products (item_id,product_name, department_name, price, stock_quantity)
value (6, "staples", "office supply", 1.00, 20);

insert into products (item_id,product_name, department_name, price, stock_quantity)
value (7, "pillow", "home", 50.00, 103);

insert into products (item_id,product_name, department_name, price, stock_quantity)
value (8, "blanket", "home", 60.00, 5);

insert into products (item_id,product_name, department_name, price, stock_quantity)
value (9, "coffee mug", "kitchenware", 20.00, 200);

insert into products (item_id,product_name, department_name, price, stock_quantity)
value (10, "necklace", "accessories", 15.00, 2);


select * from products;