-- phpMyAdmin SQL Dump
-- version 5.0.4
-- https://www.phpmyadmin.net/
--
-- Host: localhost:3308
-- Generation Time: May 20, 2022 at 01:33 AM
-- Server version: 5.7.24
-- PHP Version: 7.2.19

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `consumables`
--
CREATE DATABASE IF NOT EXISTS `consumables` DEFAULT CHARACTER SET utf8 COLLATE utf8_general_ci;
USE `consumables`;

-- --------------------------------------------------------

--
-- Table structure for table `action_types`
--

DROP TABLE IF EXISTS `action_types`;
CREATE TABLE IF NOT EXISTS `action_types` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `action_type` varchar(50) DEFAULT NULL,
  `date_created` datetime DEFAULT NULL,
  `date_updated` datetime DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `adjustment_type` (`action_type`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8;

--
-- Dumping data for table `action_types`
--

INSERT INTO `action_types` (`id`, `action_type`, `date_created`, `date_updated`) VALUES
(1, 'Receive', NULL, NULL),
(2, 'Release', NULL, NULL),
(3, 'Adjustment', NULL, NULL);

-- --------------------------------------------------------

--
-- Table structure for table `adjustments`
--

DROP TABLE IF EXISTS `adjustments`;
CREATE TABLE IF NOT EXISTS `adjustments` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `date` varchar(50) NOT NULL,
  `item_id` varchar(50) NOT NULL,
  `old_qty` varchar(50) NOT NULL,
  `new_qty` varchar(50) NOT NULL,
  `date_created` datetime DEFAULT NULL,
  `date_updated` datetime DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Table structure for table `audits`
--

DROP TABLE IF EXISTS `audits`;
CREATE TABLE IF NOT EXISTS `audits` (
  `log_id` int(11) NOT NULL AUTO_INCREMENT,
  `action` varchar(50) DEFAULT NULL,
  `page` varchar(50) DEFAULT NULL,
  `record_id` varchar(50) DEFAULT NULL,
  `old_values` text,
  `new_values` text,
  `user_id` varchar(50) DEFAULT NULL,
  `user_ip` varchar(50) DEFAULT NULL,
  `user_agent` text,
  `request_url` text,
  `timestamp` datetime DEFAULT NULL,
  PRIMARY KEY (`log_id`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Table structure for table `items`
--

DROP TABLE IF EXISTS `items`;
CREATE TABLE IF NOT EXISTS `items` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `barcode` varchar(15) NOT NULL,
  `name` varchar(100) NOT NULL,
  `type_id` int(11) DEFAULT NULL,
  `measurement_id` int(11) DEFAULT NULL,
  `date_created` datetime DEFAULT NULL,
  `date_updated` datetime DEFAULT NULL,
  `date_deleted` datetime DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `barcode` (`barcode`),
  UNIQUE KEY `name` (`name`)
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=utf8;

--
-- Dumping data for table `items`
--

INSERT INTO `items` (`id`, `barcode`, `name`, `type_id`, `measurement_id`, `date_created`, `date_updated`, `date_deleted`) VALUES
(1, '970243', 'Make-Up for ECJET 1000', 2, 1, NULL, NULL, NULL),
(2, '540943', 'Make-Up for ECJET 2000', 2, 1, NULL, NULL, NULL),
(3, '891059', 'Make-Up for Hitachi', 2, 1, NULL, NULL, NULL),
(4, '744625', 'Ink for Hitachi', 2, 1, NULL, NULL, NULL),
(5, '994873', 'Cleaning Solution for Hitachi 5L', 2, 4, NULL, NULL, NULL),
(6, '232098', 'Ink for ECJET 1000', 2, 1, NULL, NULL, NULL);

-- --------------------------------------------------------

--
-- Table structure for table `measurements`
--

DROP TABLE IF EXISTS `measurements`;
CREATE TABLE IF NOT EXISTS `measurements` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `code` varchar(10) NOT NULL,
  `name` varchar(50) NOT NULL,
  `date_created` datetime DEFAULT NULL,
  `date_updated` datetime DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `code` (`code`),
  UNIQUE KEY `name` (`name`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8;

--
-- Dumping data for table `measurements`
--

INSERT INTO `measurements` (`id`, `code`, `name`, `date_created`, `date_updated`) VALUES
(1, 'BOT', 'Bottle/s', NULL, NULL),
(2, 'PC', 'Piece/s', NULL, NULL),
(3, 'BOX', 'Box/es', NULL, NULL),
(4, 'GAL', 'Gallon/s', NULL, NULL),
(5, 'LTR', 'Liter/s', NULL, NULL);

-- --------------------------------------------------------

--
-- Table structure for table `permissions`
--

DROP TABLE IF EXISTS `permissions`;
CREATE TABLE IF NOT EXISTS `permissions` (
  `permission_id` int(11) NOT NULL AUTO_INCREMENT,
  `permission` varchar(255) NOT NULL,
  `role_id` int(11) DEFAULT NULL,
  PRIMARY KEY (`permission_id`),
  KEY `role_id` (`role_id`)
) ENGINE=InnoDB AUTO_INCREMENT=221 DEFAULT CHARSET=utf8;

--
-- Dumping data for table `permissions`
--

INSERT INTO `permissions` (`permission_id`, `permission`, `role_id`) VALUES
(143, 'home/list', 5),
(144, 'adjustment_types/importdata', 5),
(145, 'adjustments/list', 5),
(146, 'adjustments/view', 5),
(147, 'adjustments/add', 5),
(148, 'adjustments/edit', 5),
(149, 'adjustments/delete', 5),
(150, 'adjustments/importdata', 5),
(151, 'items/list', 5),
(152, 'items/view', 5),
(153, 'items/add', 5),
(154, 'items/edit', 5),
(155, 'items/delete', 5),
(156, 'items/importdata', 5),
(157, 'measurements/list', 5),
(158, 'measurements/view', 5),
(159, 'measurements/add', 5),
(160, 'measurements/edit', 5),
(161, 'measurements/delete', 5),
(162, 'measurements/importdata', 5),
(163, 'stocks/list', 5),
(164, 'stocks/view', 5),
(165, 'stocks/add', 5),
(166, 'stocks/edit', 5),
(167, 'stocks/delete', 5),
(168, 'stocks/importdata', 5),
(169, 'types/list', 5),
(170, 'types/view', 5),
(171, 'types/add', 5),
(172, 'types/edit', 5),
(173, 'types/delete', 5),
(174, 'types/importdata', 5),
(175, 'account/list', 5),
(176, 'account/edit', 5),
(177, 'action_types/list', 5),
(178, 'action_types/view', 5),
(179, 'action_types/add', 5),
(180, 'action_types/edit', 5),
(181, 'action_types/delete', 5),
(182, 'users/list', 5),
(183, 'users/view', 5),
(184, 'users/add', 5),
(185, 'users/edit', 5),
(186, 'users/delete', 5),
(187, 'permissions/list', 5),
(188, 'permissions/view', 5),
(189, 'permissions/add', 5),
(190, 'permissions/edit', 5),
(191, 'permissions/delete', 5),
(192, 'roles/list', 5),
(193, 'roles/view', 5),
(194, 'roles/add', 5),
(195, 'roles/edit', 5),
(196, 'roles/delete', 5),
(197, 'audits/list', 5),
(198, 'audits/view', 5),
(199, 'home/list', 6),
(200, 'adjustment_types/importdata', 6),
(201, 'adjustments/list', 6),
(202, 'adjustments/view', 6),
(203, 'adjustments/add', 6),
(204, 'items/list', 6),
(205, 'items/view', 6),
(206, 'items/add', 6),
(207, 'measurements/list', 6),
(208, 'measurements/view', 6),
(209, 'measurements/add', 6),
(210, 'stocks/list', 6),
(211, 'stocks/view', 6),
(212, 'stocks/add', 6),
(213, 'types/list', 6),
(214, 'types/view', 6),
(215, 'types/add', 6),
(216, 'account/list', 6),
(217, 'account/edit', 6),
(218, 'action_types/list', 6),
(219, 'action_types/view', 6),
(220, 'action_types/add', 6);

-- --------------------------------------------------------

--
-- Table structure for table `roles`
--

DROP TABLE IF EXISTS `roles`;
CREATE TABLE IF NOT EXISTS `roles` (
  `role_id` int(11) NOT NULL AUTO_INCREMENT,
  `role_name` varchar(255) NOT NULL,
  PRIMARY KEY (`role_id`)
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=utf8;

--
-- Dumping data for table `roles`
--

INSERT INTO `roles` (`role_id`, `role_name`) VALUES
(5, 'Administrator'),
(6, 'User');

-- --------------------------------------------------------

--
-- Table structure for table `stocks`
--

DROP TABLE IF EXISTS `stocks`;
CREATE TABLE IF NOT EXISTS `stocks` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `action_id` int(11) DEFAULT NULL,
  `date` date NOT NULL,
  `item_id` int(11) NOT NULL,
  `qty` decimal(10,2) NOT NULL,
  `remarks` text,
  `date_created` datetime DEFAULT NULL,
  `date_updated` datetime DEFAULT NULL,
  `date_deleted` datetime DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=17 DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Table structure for table `types`
--

DROP TABLE IF EXISTS `types`;
CREATE TABLE IF NOT EXISTS `types` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `type` varchar(100) NOT NULL,
  `date_created` datetime DEFAULT NULL,
  `date_updated` datetime DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `type` (`type`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8;

--
-- Dumping data for table `types`
--

INSERT INTO `types` (`id`, `type`, `date_created`, `date_updated`) VALUES
(1, 'MIG', NULL, NULL),
(2, 'Instrumentation', NULL, NULL),
(3, 'Admin', '2022-05-17 19:51:13', '2022-05-17 19:51:13');

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

DROP TABLE IF EXISTS `users`;
CREATE TABLE IF NOT EXISTS `users` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `username` varchar(50) NOT NULL,
  `email` varchar(100) NOT NULL,
  `password` varchar(255) NOT NULL,
  `telelphone` varchar(50) DEFAULT NULL,
  `photo` varchar(255) DEFAULT NULL,
  `name` varchar(100) NOT NULL,
  `user_role_id` int(11) DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `username` (`username`),
  UNIQUE KEY `email` (`email`),
  KEY `user_role_id` (`user_role_id`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`id`, `username`, `email`, `password`, `telelphone`, `photo`, `name`, `user_role_id`) VALUES
(1, 'jaypee.hindang', 'eujay.29@gmail.com', '$2a$10$Q7KjrAuAG4dk461stnZakesSPg4XMdtyPYQdWOuOii0Tp8y27WkJC', '75735018', 'uploads/files/f24a41487193c04e779903aa5d8f3e0a.jpg', 'Jaypee Hindang', 5),
(2, 'ralf.gallego', 'ralf.gallego@frabellefpg.com', '$2a$10$wJ2YvzBKZZSsS72Gy6lZmuJrFilXXVDln6srDR5Ox5lQOPKaRcJPa', '', '', 'Ralf Gallego', 5),
(3, 'user', 'user@user.com', '$2a$10$/xpKMoHQ4.YbQYYC0UqYoOIjCPSTlklklIKtbOUYOWqkVr.xH4e2S', '', '', 'Dummy User', 6);

--
-- Constraints for dumped tables
--

--
-- Constraints for table `permissions`
--
ALTER TABLE `permissions`
  ADD CONSTRAINT `permissions_ibfk_1` FOREIGN KEY (`role_id`) REFERENCES `roles` (`role_id`) ON DELETE CASCADE;

--
-- Constraints for table `users`
--
ALTER TABLE `users`
  ADD CONSTRAINT `users_ibfk_1` FOREIGN KEY (`user_role_id`) REFERENCES `roles` (`role_id`) ON DELETE SET NULL;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
