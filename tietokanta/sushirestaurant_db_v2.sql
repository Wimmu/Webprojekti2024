CREATE TABLE IF NOT EXISTS `user` (
    `user_id` int(11) NOT NULL AUTO_INCREMENT,
    `role` varchar(50) DEFAULT NULL,
    `username` varchar(50) DEFAULT NULL,
    `password` varchar(50) DEFAULT NULL,
    `first_name` varchar(50) DEFAULT NULL,
    `last_name` varchar(50) DEFAULT NULL,
    `address` varchar(50) DEFAULT NULL,
    `email` varchar(50) DEFAULT NULL,
    `phone` varchar(50) DEFAULT NULL,
    `avatar` varchar(50) DEFAULT NULL,
    PRIMARY KEY (`user_id`)
) ENGINE=InnoDB AUTO_INCREMENT=1 DEFAULT CHARSET=latin1 COLLATE=latin1_swedish_ci;

CREATE TABLE IF NOT EXISTS `restaurant` (
    `restaurant_id` int(11) NOT NULL AUTO_INCREMENT,
    `name` varchar(50) NOT NULL,
    `address` varchar(255) NOT NULL,
    PRIMARY KEY (`restaurant_id`)
) ENGINE=InnoDB AUTO_INCREMENT=1 DEFAULT CHARSET=latin1 COLLATE=latin1_swedish_ci;

CREATE TABLE IF NOT EXISTS `menuitem` (
    `menuitem_id` int(11) NOT NULL AUTO_INCREMENT,
    `name` varchar(50) NOT NULL,
    `price` decimal(10,2) NOT NULL,
    `description` varchar(500) NOT NULL,
    `allergen` varchar(255) NOT NULL,
    `category` varchar(255) NOT NULL,
    `image` varchar(255) NOT NULL,
    PRIMARY KEY (`menuitem_id`)
) ENGINE=InnoDB AUTO_INCREMENT=1 DEFAULT CHARSET=latin1 COLLATE=latin1_swedish_ci;

CREATE TABLE IF NOT EXISTS `order` (
    `order_id` int(11) NOT NULL AUTO_INCREMENT,
    `user_id` int(11) DEFAULT NULL,
    `restaurant_id` int(11) DEFAULT NULL,
    `total_cost` decimal(10,2) NOT NULL,
    `date` date NOT NULL,
    `status` varchar(50) NOT NULL,
    PRIMARY KEY (`order_id`),
    KEY `user_id` (`user_id`),
    CONSTRAINT `order_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `user` (`user_id`)
) ENGINE=InnoDB AUTO_INCREMENT=1 DEFAULT CHARSET=latin1 COLLATE=latin1_swedish_ci;

CREATE TABLE IF NOT EXISTS `orderitem` (
    `orderitem_id` int(11) NOT NULL AUTO_INCREMENT,
    `menuitem_id` int(11) NOT NULL,
    `order_id` int(11) NOT NULL,
    `quantity` int(11) DEFAULT NULL,
    PRIMARY KEY (`orderitem_id`),
    CONSTRAINT `orderitem_ibfk_1` FOREIGN KEY (`menuitem_id`) REFERENCES `menuitem` (`menuitem_id`),
    CONSTRAINT `orderitem_ibfk_2` FOREIGN KEY (`order_id`) REFERENCES `order` (`order_id`)
) ENGINE=InnoDB AUTO_INCREMENT=1 DEFAULT CHARSET=latin1 COLLATE=latin1_swedish_ci;

CREATE TABLE IF NOT EXISTS `dailymenu` (
    `lunch_id` int(11) NOT NULL AUTO_INCREMENT,
    `date` date NOT NULL,
    `restaurant_id` int(11) NOT NULL,
    `item1` varchar(255) NOT NULL,
    `item2` varchar(255) DEFAULT NULL,
    `item3` varchar(255) DEFAULT NULL,
    `item4` varchar(255) DEFAULT NULL,
    `item5` varchar(255) DEFAULT NULL,
    `item6` varchar(255) DEFAULT NULL,
    PRIMARY KEY (`lunch_id`),
    CONSTRAINT `daily_lunch_ibfk_1` FOREIGN KEY (`restaurant_id`) REFERENCES `restaurant` (`restaurant_id`)
) ENGINE=InnoDB AUTO_INCREMENT=1 DEFAULT CHARSET=latin1 COLLATE=latin1_swedish_ci;
