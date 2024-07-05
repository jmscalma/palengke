-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1:3308
-- Generation Time: Jun 27, 2024 at 07:26 AM
-- Server version: 10.4.32-MariaDB
-- PHP Version: 8.0.30

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `online_palengke`
--

DELIMITER $$
--
-- Procedures
--
CREATE DEFINER=`root`@`localhost` PROCEDURE `add_order` (IN `p_product_id` INT, IN `p_customer_name` VARCHAR(50), IN `p_email` VARCHAR(50), IN `p_contact_number` VARCHAR(11), IN `p_quantity` DECIMAL(10,2), IN `p_total_price` DECIMAL(10,2))   BEGIN

	INSERT INTO orders(product_id, customer_name, customer_email, customer_number, quantity, total_price)
    VALUES (p_product_id, p_customer_name, p_email, p_contact_number, p_quantity, p_total_price);

END$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `get_all_products` ()   BEGIN
	
    SELECT *
    FROM products;


END$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `get_recent_order` ()   BEGIN

    DECLARE last_order_id INT;
    
    SELECT order_id INTO last_order_id 
    FROM orders
    ORDER BY order_id DESC LIMIT 1;
    
    SELECT *
    FROM orders
    WHERE order_id = last_order_id;

END$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `get_specific_product` (IN `p_product_id` INT)   BEGIN

	SELECT *
    FROM products
    WHERE products.product_id = p_product_id;

END$$

DELIMITER ;

-- --------------------------------------------------------

--
-- Table structure for table `orders`
--

CREATE TABLE `orders` (
  `order_id` int(11) NOT NULL,
  `product_id` int(11) DEFAULT NULL,
  `customer_name` varchar(100) DEFAULT NULL,
  `customer_email` varchar(50) NOT NULL,
  `customer_number` varchar(11) DEFAULT NULL,
  `quantity` decimal(10,2) DEFAULT NULL,
  `total_price` decimal(10,2) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `orders`
--

INSERT INTO `orders` (`order_id`, `product_id`, `customer_name`, `customer_email`, `customer_number`, `quantity`, `total_price`) VALUES
(1, 6, 'asd', 'asd', '2132', 2.00, 130.00),
(2, 5, 'asdas', 'zxcxzc', '23124', 23.23, 464.60),
(3, 5, 'dwynn', 'asdasd', '13123', 4.00, 80.00);

-- --------------------------------------------------------

--
-- Table structure for table `products`
--

CREATE TABLE `products` (
  `product_id` int(11) NOT NULL,
  `name` varchar(50) DEFAULT NULL,
  `qty` int(11) DEFAULT NULL,
  `bundle` enum('piece','kilo') DEFAULT NULL,
  `price` decimal(10,2) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `products`
--

INSERT INTO `products` (`product_id`, `name`, `qty`, `bundle`, `price`) VALUES
(5, 'apple', 100, 'piece', 20.00),
(6, 'banana', 20, 'kilo', 65.00),
(7, 'dalandan', 50, 'kilo', 50.00),
(8, 'grapes', 30, 'kilo', 105.00),
(9, 'ponkan', 200, 'piece', 25.00),
(10, 'watermelon', 50, 'piece', 215.00);

--
-- Indexes for dumped tables
--

--
-- Indexes for table `orders`
--
ALTER TABLE `orders`
  ADD PRIMARY KEY (`order_id`),
  ADD KEY `product_id` (`product_id`);

--
-- Indexes for table `products`
--
ALTER TABLE `products`
  ADD PRIMARY KEY (`product_id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `orders`
--
ALTER TABLE `orders`
  MODIFY `order_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT for table `products`
--
ALTER TABLE `products`
  MODIFY `product_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=11;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `orders`
--
ALTER TABLE `orders`
  ADD CONSTRAINT `orders_ibfk_1` FOREIGN KEY (`product_id`) REFERENCES `products` (`product_id`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
