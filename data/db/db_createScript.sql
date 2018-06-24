-- phpMyAdmin SQL Dump
-- version 4.5.4.1deb2ubuntu2
-- http://www.phpmyadmin.net
--
-- Host: localhost
-- Generation Time: Jun 24, 2018 at 11:04 AM
-- Server version: 5.7.22-0ubuntu0.16.04.1
-- PHP Version: 7.0.30-0ubuntu0.16.04.1

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `amsta_application`
-- Data is changed to mock data for displaying this project as open source
--

-- --------------------------------------------------------

--
-- Table structure for table `Activity`
--

CREATE TABLE `Activity` (
  `idActivity` int(11) NOT NULL,
  `name` varchar(35) NOT NULL,
  `date` varchar(255) NOT NULL,
  `timeStart` varchar(45) NOT NULL,
  `timeEnd` varchar(45) NOT NULL,
  `timeStarted` varchar(45) NOT NULL,
  `timeEnded` varchar(45) NOT NULL,
  `completedTime` varchar(45) NOT NULL,
  `completed` tinyint(2) NOT NULL,
  `notes` varchar(255) NOT NULL,
  `resId` int(11) NOT NULL,
  `taskId` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `Activity`
--

INSERT INTO `Activity` (`idActivity`, `name`, `date`, `timeStart`, `timeEnd`, `timeStarted`, `timeEnded`, `completedTime`, `completed`, `notes`, `resId`, `taskId`) VALUES
(1, 'douchen', '2018-06-04', '', '', '09:20', '09:30', '', 0, '', 1, 3),
(1, 'Koken', '2018-06-04', '08:20', '08:30', '08:20', '08:30', '00:10', 0, '', 2, 0),
(1, 'activiteit naam', '2018-06-12', '01:30', '23:59', '12:00', '23:59', '20:00', 0, '', 3, 0),
(2, 'Help', '2018-11-11', '', '', '20:00', '23:00', '', 1, '', 1, 8),
(2, 'Groenten snijden ', '2018-06-14T10:52:04.788Z', '11:00', '12:00', '12:52', '12:52', '0', 1, '', 2, 6),
(2, 'Tanden Poetsen', '2018-06-12', '01:30', '23:59', '12:00', '23:59', '20:00', 0, '', 3, 0),
(3, 'Help', '2018-11-11', '', '', '20:00', '23:00', '', 1, '', 1, 8),
(3, 'Lunch opwarmen', '2018-06-14T12:17:08.258Z', '13:00', '14:00', '14:17', '14:17', '0', 1, '', 2, 5),
(3, 'Tanden Poetsen', '2018-06-12', '01:30', '23:59', '12:00', '23:59', '20:00', 0, '', 3, 0),
(4, 'Groenten snijden ', '2018-06-12T15:06:32.449Z', '13:00', '14:00', '17:6', '17:6', '0', 1, '', 1, 6),
(4, 'Groenten snijden ', '2018-06-14T12:26:37.556Z', '13:00', '14:00', '14:26', '14:28', '2', 1, '', 2, 6),
(4, 'Tv kijken', '2018-06-14T10:00:11.817Z', '11:00', '12:00', '12:0', '12:0', '0', 1, '', 3, 7),
(5, 'Krant lezen', '2018-06-12T15:07:05.876Z', '15:00', '16:00', '17:7', '17:7', '0', 1, '', 1, 4),
(5, 'Lunch opwarmen', '2018-06-14T12:43:52.310Z', '13:00', '14:00', '14:43', '14:44', '1', 1, '', 2, 5),
(5, 'Groenten snijden ', '2018-06-14T12:44:59.948Z', '13:00', '14:00', '14:44', '14:45', '1', 1, '', 3, 6),
(6, 'Krant lezen', '2018-06-12T15:08:48.576Z', '15:00', '16:00', '17:8', '17:8', '0', 1, '', 1, 4),
(6, 'Krant lezen', '2018-06-14T12:58:14.573Z', '09:00', '10:00', '14:58', '14:58', '0', 1, '', 2, 4),
(6, 'Groenten snijden ', '2018-06-14T12:47:48.905Z', '13:00', '14:00', '14:47', '14:48', '1', 1, '', 3, 6),
(7, 'Krant lezen', '2018-06-12T15:11:28.134Z', '15:00', '16:00', '17:11', '17:11', '0', 1, '', 1, 4),
(7, 'Groenten snijden ', '2018-06-14T13:00:54.075Z', '13:00', '14:00', '15:0', '15:1', '1', 1, '', 2, 6),
(7, 'Tanden Poetsen', '2018-06-22T14:50:04.906Z', '08:00', '09:00', '16:50', '16:50', '0', 1, 'Automatisch...', 3, 2),
(8, 'Krant lezen', '2018-06-12T15:12:34.470Z', '15:00', '16:00', '17:12', '17:12', '0', 1, '', 1, 4),
(8, 'Lunch opwarmen', '2018-06-14T13:23:53.267Z', '13:00', '14:00', '15:23', '15:24', '1', 1, '', 2, 5),
(9, 'Lunch bereiden', '2018-06-12T15:14:22.969Z', '13:00', '14:00', '17:14', '17:14', '0', 1, '', 1, 5),
(9, 'Krant lezen', '2018-06-14T13:24:41.649Z', '09:00', '10:00', '15:24', '15:24', '0', 1, '', 2, 4),
(10, 'Lunch bereiden', '2018-06-12T15:16:39.804Z', '13:00', '14:00', '17:16', '17:17', '1', 1, '', 1, 5),
(10, 'Tanden Poetsen', '2018-06-14T13:35:38.069Z', '08:00', '09:00', '15:35', '15:36', '1', 1, '', 2, 2),
(11, 'Lunch bereiden', '2018-06-12T15:19:03.327Z', '13:00', '14:00', '17:19', '17:19', '0', 1, '', 1, 5),
(11, 'Gaan slapen', '2018-06-14T14:30:52.646Z', '20:30', '23:45', '16:30', '16:31', '1', 1, '', 2, 8),
(12, 'Krant lezen', '2018-06-12T15:22:07.412Z', '15:00', '16:00', '17:22', '17:22', '0', 1, '', 1, 4),
(12, 'Lunch opwarmen', '2018-06-14T14:31:23.020Z', '13:00', '14:00', '16:31', '16:32', '1', 1, '', 2, 5),
(13, 'Lunch bereiden', '2018-06-12T15:23:05.848Z', '13:00', '14:00', '17:23', '17:23', '0', 1, '', 1, 5),
(13, 'Tanden Poetsen', '2018-06-14T18:29:44.577Z', '08:00', '09:00', '20:29', '20:30', '1', 1, 'Automatisch...', 2, 2),
(14, 'Lunch bereiden', '2018-06-12T15:31:29.169Z', '13:00', '14:00', '17:31', '17:31', '0', 1, '', 1, 5),
(15, 'Lunch opwarmen', '2018-06-14T12:51:06.312Z', '13:00', '14:00', '14:51', '14:51', '0', 1, '', 1, 5),
(16, 'Groenten snijden ', '2018-06-14T13:14:38.325Z', '13:00', '14:00', '15:14', '15:14', '0', 1, '', 1, 6),
(17, 'Krant lezen', '2018-06-14T13:32:05.187Z', '09:00', '10:00', '15:32', '15:32', '0', 1, '', 1, 4),
(18, 'Lunch opwarmen', '2018-06-14T16:38:10.670Z', '13:00', '14:00', '18:38', '18:38', '0', 1, 'Automatisch...', 1, 5);

-- --------------------------------------------------------

--
-- Table structure for table `Resident`
--

CREATE TABLE `Resident` (
  `resId` int(11) NOT NULL,
  `name` varchar(35) NOT NULL,
  `surname` varchar(35) NOT NULL,
  `bio` varchar(255) NOT NULL,
  `imgPath` varchar(45) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `Resident`
--

INSERT INTO `Resident` (`resId`, `name`, `surname`, `bio`, `imgPath`) VALUES
(1, 'Maurits', 'Bogaards', 'Goede man die meestal weet wat hij doet', '/residents/Maurits Bogaards.jpg'),
(2, 'Max', 'Lenoir', 'Ik moet echt ff nieuwe mensen bedenken', '/residents/max.jpg'),
(3, 'brenda', 'beton', 'iets', '/residents/woman1.jpg');

-- --------------------------------------------------------

--
-- Table structure for table `Step`
--

CREATE TABLE `Step` (
  `idStep` int(11) NOT NULL,
  `imgLink` varchar(45) NOT NULL,
  `description` varchar(45) NOT NULL,
  `Task_idTask` int(11) NOT NULL,
  `Timer_idTimer` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `Step`
--

INSERT INTO `Step` (`idStep`, `imgLink`, `description`, `Task_idTask`, `Timer_idTimer`) VALUES
(1, '/tasks/Schoonmaken_1.jpg', 'Pak een doek', 1, NULL),
(1, '/tasks/Tanden Poetsen_1.jpg', 'Pak een tandenborstel', 2, NULL),
(1, '/tasks/Douchen_1.jpg', 'Doe uw kleding uit.', 3, NULL),
(1, '/tasks/Nieuws lezen_1.jpg', 'Pak de nieuws krant.', 4, NULL),
(1, '/tasks/Lunch bereiden_1.jpg', 'Doe de magnetron open.', 5, NULL),
(1, '/tasks/Tv kijken_1.jpg', 'Pak de afstandsbediening.', 7, NULL),
(1, '/tasks/Gaan slapen_1.jpg', 'Doe je slaap kleding aan.', 8, NULL),
(2, '/tasks/Schoonmaken_2.jpg', 'Veeg de tafel ermee af', 1, NULL),
(2, '/tasks/Tanden Poetsen_2.jpg', 'Doe hier wat tandpasta op', 2, NULL),
(2, '/tasks/Douchen_2.jpg', 'Zet de douche aan', 3, NULL),
(2, '/tasks/Nieuws lezen_2.jpg', 'Lees een stukje. En sla de krant om.', 4, NULL),
(2, '/tasks/Lunch bereiden_2.jpg', 'Doe je eten uit de koelkast erin.', 5, NULL),
(2, '/tasks/tv.jpg', 'Richt op de televisie', 7, NULL),
(2, '/tasks/Gaan slapen_2.jpg', 'Ga naar je bed.', 8, NULL),
(3, '/tasks/Schoonmaken_3.jpg', 'Veeg nu de vloer een beetje  schoon.', 1, NULL),
(3, '/tasks/Tanden Poetsen_3.jpg', 'En poets uw tanden maar', 2, NULL),
(3, '/tasks/Douchen_3.jpg', 'Timer - 5min', 3, NULL),
(3, '/tasks/Lunch bereiden_3.jpg', 'Zet de magnetron aan op 3 minuten.', 5, NULL),
(3, '/tasks/Tv kijken_3.jpg', 'Druk op de aan knop.', 7, NULL),
(3, '/tasks/Gaan slapen_3.jpg', 'Ga rustig slapen.', 8, NULL),
(4, '/tasks/Tanden Poetsen_4.jpg', 'Timer stap! 2min', 2, 10),
(4, '/tasks/Lunch bereiden_4.jpg', 'Als de *pling* gaat kun je eten!', 5, NULL);

-- --------------------------------------------------------

--
-- Table structure for table `Task`
--

CREATE TABLE `Task` (
  `idTask` int(11) NOT NULL,
  `name` varchar(45) NOT NULL,
  `imgLink` varchar(45) NOT NULL,
  `description` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `Task`
--

INSERT INTO `Task` (`idTask`, `name`, `imgLink`, `description`) VALUES
(1, 'Schoonmaken', '/tasks/Schoonmaken_0.jpg', '                                                                                                                                Hier leer je het huis schoon te maken           '),
(2, 'Tanden Poetsen', '/tasks/Tanden Poetsen_0.jpg', '                                                                                                                                       Hier leer je je tanden schoon te maken        '),
(3, 'Douchen', '/tasks/shower.jpg', ' Hier leer je jezelf schoon te maken   '),
(4, 'Krant lezen', '/tasks/Nieuws lezen_0.jpg', 'Hier leer je het nieuws te begrijpen '),
(5, 'Lunch opwarmen', '/tasks/Lunch opwarmen_0.jpg', 'Hier leer je jou lunch klaar te maken.'),
(7, 'Tv kijken', '/tasks/tv.jpg', 'Stapsgewijs leren de televisie te bedienen.'),
(8, 'Gaan slapen', '/tasks/sleeping.jpg', 'Hier leer je jezelf klaar te maken voor slaap ');

-- --------------------------------------------------------

--
-- Table structure for table `TaskTime`
--

CREATE TABLE `TaskTime` (
  `id` int(11) NOT NULL,
  `startTime` varchar(45) NOT NULL,
  `endTime` varchar(45) NOT NULL,
  `Task_taskId` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `TaskTime`
--

INSERT INTO `TaskTime` (`id`, `startTime`, `endTime`, `Task_taskId`) VALUES
(1, '10:00', '11:00', 1),
(1, '08:00', '09:00', 2),
(1, '13:00', '12:03', 3),
(1, '09:00', '10:00', 4),
(1, '13:00', '14:00', 5),
(1, '22:00', '23:00', 7),
(1, '20:30', '23:45', 8),
(2, '15:00', '16:00', 1),
(2, '18:00', '22:00', 2),
(2, '15:00', '16:00', 4),
(3, '10:00', '11:00', 1);

-- --------------------------------------------------------

--
-- Table structure for table `Timer`
--

CREATE TABLE `Timer` (
  `id` int(4) NOT NULL,
  `time` int(4) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `Timer`
--

INSERT INTO `Timer` (`id`, `time`) VALUES
(10, 10000);

--
-- Indexes for dumped tables
--

--
-- Indexes for table `Activity`
--
ALTER TABLE `Activity`
  ADD PRIMARY KEY (`idActivity`,`resId`),
  ADD KEY `Activity-Res` (`resId`);

--
-- Indexes for table `Resident`
--
ALTER TABLE `Resident`
  ADD PRIMARY KEY (`resId`);

--
-- Indexes for table `Step`
--
ALTER TABLE `Step`
  ADD PRIMARY KEY (`idStep`,`Task_idTask`),
  ADD KEY `fk_Step_Task_idx` (`Task_idTask`),
  ADD KEY `FK_Step_Timer` (`Timer_idTimer`);

--
-- Indexes for table `Task`
--
ALTER TABLE `Task`
  ADD PRIMARY KEY (`idTask`),
  ADD UNIQUE KEY `idTask` (`idTask`);

--
-- Indexes for table `TaskTime`
--
ALTER TABLE `TaskTime`
  ADD PRIMARY KEY (`id`,`Task_taskId`),
  ADD KEY `Task_taskId` (`Task_taskId`);

--
-- Indexes for table `Timer`
--
ALTER TABLE `Timer`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `Resident`
--
ALTER TABLE `Resident`
  MODIFY `resId` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=44;
--
-- AUTO_INCREMENT for table `Task`
--
ALTER TABLE `Task`
  MODIFY `idTask` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=69;
--
-- AUTO_INCREMENT for table `Timer`
--
ALTER TABLE `Timer`
  MODIFY `id` int(4) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=11;
--
-- Constraints for dumped tables
--

--
-- Constraints for table `Activity`
--
ALTER TABLE `Activity`
  ADD CONSTRAINT `Activity-Res` FOREIGN KEY (`resId`) REFERENCES `Resident` (`resId`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `Step`
--
ALTER TABLE `Step`
  ADD CONSTRAINT `FK_Step_Timer` FOREIGN KEY (`Timer_idTimer`) REFERENCES `Timer` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `fk_Step_Task` FOREIGN KEY (`Task_idTask`) REFERENCES `Task` (`idTask`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `TaskTime`
--
ALTER TABLE `TaskTime`
  ADD CONSTRAINT `CtaskTime` FOREIGN KEY (`Task_taskId`) REFERENCES `Task` (`idTask`) ON DELETE CASCADE ON UPDATE CASCADE;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
