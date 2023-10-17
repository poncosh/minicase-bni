create database `bni_test_satrio_ponco_sushadi`;

use `bni_test_satrio_ponco_sushadi`;

create table `customers` (
	id INT auto_increment primary key not null,
	name VARCHAR(255) not null,
  email VARCHAR(50) not null,
  password VARCHAR (100) not null,
  balance INT not null,
  created_at timestamp default current_timestamp,
  updated_at timestamp default current_timestamp on update current_timestamp
) engine InnoDB;

create table `customer_data` (
	id INT auto_increment primary key not null,
  customer_id INT not null,
  identity_id INT not null,
  address VARCHAR(255) not null,
  phone_number VARCHAR(50) not null,
  date_of_birth DATE not null,
  created_at timestamp default current_timestamp,
  updated_at timestamp default current_timestamp on update current_timestamp,
  FOREIGN KEY (customer_id) REFERENCES customers(id)
) engine InnoDB;

create table `customer_transactions` (
  id INT auto_increment primary key not null,
  customer_id INT not null,
  name VARCHAR(255) not null,
  amount INT not null,
  tariff INT not null,
  created_at timestamp default current_timestamp,
  updated_at timestamp default current_timestamp on update current_timestamp,
  FOREIGN KEY (customer_id) REFERENCES customers(id)
) engine InnoDB;