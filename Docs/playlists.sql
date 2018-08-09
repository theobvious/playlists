-- phpMyAdmin SQL Dump
-- version 4.7.4
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: May 27, 2018 at 05:05 PM
-- Server version: 10.1.28-MariaDB
-- PHP Version: 5.6.32

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT = 0;
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `playlist`
--

-- --------------------------------------------------------

--
-- Table structure for table `playlists`
--

CREATE TABLE `playlists` (
  `id` int(11) NOT NULL,
  `name` varchar(100) CHARACTER SET hp8 COLLATE hp8_bin NOT NULL,
  `image` varchar(1000) CHARACTER SET hp8 COLLATE hp8_bin NOT NULL,
  `songs` text CHARACTER SET hp8 COLLATE hp8_bin NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin;

--
-- Dumping data for table `playlists`
--

INSERT INTO `playlists` (`id`, `name`, `image`, `songs`) VALUES
(1, 'Franz Ferdinand', './imgs/ffcd1.jpg', '[{\"name\":\"Jacqueline\",\"url\":\".\\/sample.mp3\"},{\"name\":\"Tell her Tonight\",\"url\":\".\\/sample.mp3\"},{\"name\":\"Take Me Out\",\"url\":\".\\/sample.mp3\"},{\"name\":\"The Dark of the Matinee\",\"url\":\".\\/sample.mp3\"}]'),
(2, 'Right Words', './imgs/ffcd2.jpg', '[{\"name\":\"Right Action\",\"url\":\"sample.mp3\"},{\"name\":\"Evil Eye\",\"url\":\"sample.mp3\"},{\"name\":\"Love Illumination\",\"url\":\"sample.mp3\"},{\"name\":\"Stand on the Horizon\",\"url\":\"sample.mp3\"}]'),
(3, 'You Could Have It', './imgs/ffcd3.jpg', '[{\"name\":\"The Fallen\",\"url\":\".\\/sample.mp3\"},{\"name\":\"Do You Want\",\"url\":\".\\/sample.mp3\"},{\"name\":\"This Boy\",\"url\":\".\\/sample.mp3\"},{\"name\":\"Walk Away\",\"url\":\".\\/sample.mp3\"}]'),
(4, 'Always Ascending', './imgs/ffcd4.jpg', '[{\"name\":\"Always Ascending\",\"url\":\".\\/sample.mp3\"},{\"name\":\"Lazy Boy\",\"url\":\".\\/sample.mp3\"},{\"name\":\"Paper Cages\",\"url\":\".\\/sample.mp3\"},{\"name\":\"Finally\",\"url\":\".\\/sample.mp3\"}]'),
(5, 'Testing', 'https://i2.wp.com/beebom.com/wp-content/uploads/2016/01/Reverse-Image-Search-Engines-Apps-And-Its-Uses-2016.jpg', '[{\"name\":\"Something\",\"url\":\"sample.mp3\"},{\"name\":\"Something different\",\"url\":\"https:\\/\\/archive.org\\/download\\/testmp3testfile\\/mpthreetest.mp3\"},{\"name\":\"New somethings\",\"url\":\"sample.mp3\"}]');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `playlists`
--
ALTER TABLE `playlists`
  ADD UNIQUE KEY `id` (`id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `playlists`
--
ALTER TABLE `playlists`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=12;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
