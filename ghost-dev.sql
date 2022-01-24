-- phpMyAdmin SQL Dump
-- version 5.1.0
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Jan 24, 2022 at 09:49 PM
-- Server version: 10.4.18-MariaDB
-- PHP Version: 8.0.3

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `ghost-dev`
--

-- --------------------------------------------------------

--
-- Table structure for table `articles`
--

CREATE TABLE `articles` (
  `id` int(5) NOT NULL,
  `title` varchar(1000) NOT NULL,
  `description` text NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `stat` int(1) NOT NULL DEFAULT 1
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `articles`
--

INSERT INTO `articles` (`id`, `title`, `description`, `created_at`, `updated_at`, `stat`) VALUES
(1, 'Article 1', 'Article 1 Description', '2022-01-24 07:26:21', '2022-01-24 07:26:21', 1);

-- --------------------------------------------------------

--
-- Table structure for table `article_details`
--

CREATE TABLE `article_details` (
  `id` int(10) NOT NULL,
  `user_id` int(5) NOT NULL,
  `article_id` int(5) NOT NULL,
  `time_stamp` timestamp NOT NULL DEFAULT current_timestamp(),
  `comment` varchar(1000) NOT NULL,
  `vote` int(1) NOT NULL DEFAULT 0,
  `parent` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `article_details`
--

INSERT INTO `article_details` (`id`, `user_id`, `article_id`, `time_stamp`, `comment`, `vote`, `parent`) VALUES
(1, 1, 1, '2022-01-24 11:33:17', 'Jeepers now that\'s a huge release with some big community earnings to back it - it must be so rewarding seeing creators quit their day jobs after monetizing (with real MRR) on the new platform.', 0, NULL),
(50, 2, 1, '2022-01-24 10:57:05', 'Switched our blog from Hubspot to Ghost a year ago -- turned out to be a great decision. Looking forward to this update....the in-platform analytics look especially delicious. :)', 0, NULL),
(51, 3, 1, '2022-01-24 10:01:43', 'Love the native memberships and the zipless themes, I was just asked by a friend about options for a new site, and I think I know what I\'ll be recommending then...', 0, NULL),
(58, 4, 1, '2022-01-24 10:01:43', 'Thanks Sophie! Last year has been an absolute goldrush for the creator economy. Slowly at first, then all at once. Will be interesting to see how this ecosystem evolves over the next few years', 0, 50);

-- --------------------------------------------------------

--
-- Table structure for table `upvotes`
--

CREATE TABLE `upvotes` (
  `id` int(5) NOT NULL,
  `user_id` int(5) NOT NULL,
  `comment_id` int(5) NOT NULL,
  `time_stamp` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `upvotes`
--

INSERT INTO `upvotes` (`id`, `user_id`, `comment_id`, `time_stamp`) VALUES
(1, 1, 1, '2022-01-24 16:22:56'),
(2, 1, 1, '2022-01-24 16:23:09'),
(10, 1, 1, '2022-01-24 18:47:32'),
(11, 1, 1, '2022-01-24 18:47:56'),
(12, 1, 1, '2022-01-24 18:48:39'),
(13, 1, 1, '2022-01-24 18:51:19'),
(14, 1, 1, '2022-01-24 18:53:55'),
(15, 1, 50, '2022-01-24 18:54:04'),
(16, 1, 1, '2022-01-24 18:57:57'),
(17, 1, 1, '2022-01-24 18:58:35'),
(18, 1, 1, '2022-01-24 18:58:58'),
(19, 1, 1, '2022-01-24 18:59:18'),
(20, 1, 1, '2022-01-24 18:59:21'),
(21, 1, 1, '2022-01-24 18:59:28'),
(22, 1, 1, '2022-01-24 19:00:21'),
(23, 1, 1, '2022-01-24 19:04:14'),
(24, 1, 1, '2022-01-24 19:21:30'),
(25, 1, 1, '2022-01-24 19:22:00'),
(26, 1, 1, '2022-01-24 19:23:03'),
(27, 1, 1, '2022-01-24 19:23:40'),
(28, 1, 50, '2022-01-24 19:23:45'),
(29, 1, 51, '2022-01-24 19:23:49'),
(30, 1, 58, '2022-01-24 19:24:33'),
(31, 1, 50, '2022-01-24 19:24:36'),
(32, 1, 1, '2022-01-24 19:25:27');

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `id` int(5) NOT NULL,
  `name` varchar(200) NOT NULL,
  `profile_image` text NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`id`, `name`, `profile_image`) VALUES
(1, 'Rob Hope', 'https://www.whatsappimages.in/wp-content/uploads/2021/04/Sad-Whatsapp-Dp-Profile-Photo-HD-Download.jpg'),
(2, 'Sophie Brecht', 'https://d2qp0siotla746.cloudfront.net/img/use-cases/profile-picture/template_3.jpg'),
(3, 'Cameron Lawrence', 'https://www.justheadshots.photo/wp-content/uploads/2020/04/white-background-headshots-065.jpg'),
(4, 'James', 'https://www.opticalexpress.co.uk/media/1064/man-with-glasses-smiling-looking-into-distance.jpg');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `articles`
--
ALTER TABLE `articles`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `article_details`
--
ALTER TABLE `article_details`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `upvotes`
--
ALTER TABLE `upvotes`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `articles`
--
ALTER TABLE `articles`
  MODIFY `id` int(5) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT for table `article_details`
--
ALTER TABLE `article_details`
  MODIFY `id` int(10) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=74;

--
-- AUTO_INCREMENT for table `upvotes`
--
ALTER TABLE `upvotes`
  MODIFY `id` int(5) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=33;

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `id` int(5) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
