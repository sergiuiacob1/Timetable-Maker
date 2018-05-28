-- phpMyAdmin SQL Dump
-- version 4.8.0.1
-- https://www.phpmyadmin.net/
--
-- Host: db
-- Generation Time: May 19, 2018 at 11:14 AM
-- Server version: 5.6.40
-- PHP Version: 7.2.4

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT = 0;
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `extension`
--

-- --------------------------------------------------------

--
-- Table structure for table `dependencies`
--

CREATE TABLE `dependencies` (
  `id` int(11) UNSIGNED NOT NULL,
  `dependant` int(11) UNSIGNED NOT NULL,
  `dependency` int(11) UNSIGNED NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Triggers `dependencies`
--
DELIMITER $$
CREATE TRIGGER `Update remaining capacities on delete` AFTER DELETE ON `dependencies` FOR EACH ROW update resource
set remaining = (capacity - (
 select count(*)
 from dependencies
 where dependency = OLD.dependency))
where id = OLd.dependency
$$
DELIMITER ;
DELIMITER $$
CREATE TRIGGER `Update remaining capacities on insert` AFTER INSERT ON `dependencies` FOR EACH ROW update resource
set remaining = (capacity - (
 select count(*)
 from dependencies
 where dependency = NEW.dependency))
where id = NEW.dependency
$$
DELIMITER ;

--
-- Indexes for dumped tables
--

--
-- Indexes for table `dependencies`
--
ALTER TABLE `dependencies`
  ADD PRIMARY KEY (`id`),
  ADD KEY `dependant` (`dependant`),
  ADD KEY `dependency` (`dependency`) USING BTREE;

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `dependencies`
--
ALTER TABLE `dependencies`
  MODIFY `id` int(11) UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `dependencies`
--
ALTER TABLE `dependencies`
  ADD CONSTRAINT `Dependant` FOREIGN KEY (`dependant`) REFERENCES `resource` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `Dependency` FOREIGN KEY (`dependency`) REFERENCES `resource` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
