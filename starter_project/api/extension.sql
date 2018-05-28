-- phpMyAdmin SQL Dump
-- version 4.7.5
-- https://www.phpmyadmin.net/
--
-- Host: db
-- Generation Time: 26 Mai 2018 la 13:32
-- Versiune server: 5.6.38
-- PHP Version: 7.1.9

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
-- Structura de tabel pentru tabelul `dependencies`
--

CREATE TABLE `dependencies` (
  `id` int(11) UNSIGNED NOT NULL,
  `dependant` int(11) UNSIGNED NOT NULL,
  `dependency` int(11) UNSIGNED NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Structura de tabel pentru tabelul `groups`
--

CREATE TABLE `groups` (
  `id` int(11) NOT NULL,
  `name` varchar(200) NOT NULL,
  `an` int(11) NOT NULL,
  `number` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Salvarea datelor din tabel `groups`
--

INSERT INTO `groups` (`id`, `name`, `an`, `number`) VALUES
(1, 'A1', 1, 34),
(2, 'B1', 2, 20);

-- --------------------------------------------------------

--
-- Structura de tabel pentru tabelul `resource`
--

CREATE TABLE `resource` (
  `id` int(11) UNSIGNED NOT NULL,
  `type` varchar(50) NOT NULL,
  `name` varchar(100) NOT NULL,
  `capacity` int(11) UNSIGNED NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Structura de tabel pentru tabelul `rooms`
--

CREATE TABLE `rooms` (
  `id` int(11) NOT NULL,
  `name` varchar(200) NOT NULL,
  `capacity` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Salvarea datelor din tabel `rooms`
--

INSERT INTO `rooms` (`id`, `name`, `capacity`) VALUES
(1, 'c911', 35),
(2, 'c909', 50);

-- --------------------------------------------------------

--
-- Structura de tabel pentru tabelul `rooms_resources`
--

CREATE TABLE `rooms_resources` (
  `room_id` int(11) NOT NULL,
  `resource_id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Salvarea datelor din tabel `rooms_resources`
--

INSERT INTO `rooms_resources` (`room_id`, `resource_id`) VALUES
(1, 1),
(1, 2);

-- --------------------------------------------------------

--
-- Structura de tabel pentru tabelul `room_hours`
--

CREATE TABLE `room_hours` (
  `room_id` int(11) NOT NULL,
  `day` int(11) NOT NULL,
  `available_hours` varchar(200) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Salvarea datelor din tabel `room_hours`
--

INSERT INTO `room_hours` (`room_id`, `day`, `available_hours`) VALUES
(1, 0, '08-20');

-- --------------------------------------------------------

--
-- Structura de tabel pentru tabelul `subjects`
--

CREATE TABLE `subjects` (
  `id` int(11) NOT NULL,
  `name` varchar(200) NOT NULL,
  `short` varchar(200) NOT NULL,
  `date` varchar(200) NOT NULL,
  `frequency` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Salvarea datelor din tabel `subjects`
--

INSERT INTO `subjects` (`id`, `name`, `short`, `date`, `frequency`) VALUES
(1, 'Algoritmi genetici', 'AG', '', 1),
(2, 'Algoritmi genetici Examen', 'AG', '20/06/2018', 0);

-- --------------------------------------------------------

--
-- Structura de tabel pentru tabelul `teacher_subject_map`
--

CREATE TABLE `teacher_subject_map` (
  `id_user` int(11) UNSIGNED NOT NULL,
  `id_subject` int(11) UNSIGNED NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Salvarea datelor din tabel `teacher_subject_map`
--

INSERT INTO `teacher_subject_map` (`id_user`, `id_subject`) VALUES
(3, 2),
(3, 1);

-- --------------------------------------------------------

--
-- Structura de tabel pentru tabelul `users`
--

CREATE TABLE `users` (
  `id` int(11) NOT NULL,
  `mail` varchar(100) NOT NULL,
  `password` varchar(100) NOT NULL,
  `userName` varchar(100) NOT NULL,
  `fullName` varchar(100) NOT NULL,
  `is_admin` tinyint(1) NOT NULL DEFAULT '0'
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Salvarea datelor din tabel `users`
--

INSERT INTO `users` (`id`, `mail`, `password`, `userName`, `fullName`, `is_admin`) VALUES
(1, 'admin@admin.com', 'admin', '', 'Adminut Adminaschi', 1),
(3, 'gigelus@a.com', 'rMPfsAZ6E', 'undefined', 'gigelus', 0);

--
-- Indexes for dumped tables
--

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `mail` (`mail`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
