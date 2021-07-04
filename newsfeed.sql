-- MySQL dump 10.13  Distrib 8.0.25, for Win64 (x86_64)
--
-- Host: localhost    Database: newsfeed
-- ------------------------------------------------------
-- Server version	8.0.25

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `comment`
--

DROP TABLE IF EXISTS `comment`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `comment` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `body` mediumtext NOT NULL,
  `user_id` bigint NOT NULL,
  `post_id` bigint NOT NULL,
  `created_at` datetime DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  KEY `user_id_idx` (`user_id`),
  KEY `post_id_conts_idx` (`post_id`),
  CONSTRAINT `post_id_conts` FOREIGN KEY (`post_id`) REFERENCES `post` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `user_id_const` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=19 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `comment`
--

LOCK TABLES `comment` WRITE;
/*!40000 ALTER TABLE `comment` DISABLE KEYS */;
INSERT INTO `comment` VALUES (4,'this is a comment',13,21,'2021-07-04 19:49:55'),(5,'this is a 2nd comment',13,21,'2021-07-04 19:51:48'),(6,'comment asd asd ',13,9,'2021-07-04 19:53:13'),(7,'comment asd asd ',13,9,'2021-07-04 19:53:17'),(8,'comment asd asd ',13,9,'2021-07-04 19:53:28'),(9,'sadasd',13,9,'2021-07-04 19:53:37'),(10,'new comment',13,8,'2021-07-04 19:54:09'),(11,'test',13,8,'2021-07-04 19:57:29'),(12,'test',13,21,'2021-07-04 19:58:39'),(13,'test 2 ',13,21,'2021-07-04 19:58:47'),(14,'this is another comment',13,21,'2021-07-04 19:59:41'),(15,'test notificatioin',13,9,'2021-07-04 20:00:16'),(16,'test',13,9,'2021-07-04 20:01:04'),(17,'very nice car',14,22,'2021-07-04 21:42:58'),(18,'thank you',13,22,'2021-07-04 21:44:46');
/*!40000 ALTER TABLE `comment` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `post`
--

DROP TABLE IF EXISTS `post`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `post` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `user_id` bigint NOT NULL,
  `title` varchar(255) DEFAULT NULL,
  `body` mediumtext,
  `image` mediumtext,
  `isPublic` tinyint NOT NULL,
  `sharePost` tinyint DEFAULT '0',
  `sharePost_Id` bigint DEFAULT NULL,
  `vote` int DEFAULT '0',
  `created_at` datetime DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  KEY `user_id_idx` (`user_id`),
  CONSTRAINT `user_id` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=23 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `post`
--

LOCK TABLES `post` WRITE;
/*!40000 ALTER TABLE `post` DISABLE KEYS */;
INSERT INTO `post` VALUES (8,13,'my first post','asdasd','screenshot-2021-07-03-174734-1625393404642.jpg',1,0,NULL,5,'2021-07-04 16:10:04'),(9,13,'my second post','asdasd','screenshot-2021-07-02-124708-1625393520727.jpg',1,0,NULL,19,'2021-07-04 16:12:00'),(21,13,'private post','private post details','puppy-1625395166638.jpg',0,0,NULL,19,'2021-07-04 16:39:26'),(22,13,'test final','final test','car-image-1625413294138.jpg',1,0,NULL,0,'2021-07-04 21:41:34');
/*!40000 ALTER TABLE `post` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `saved`
--

DROP TABLE IF EXISTS `saved`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `saved` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `user_id` bigint NOT NULL,
  `post_id` bigint NOT NULL,
  PRIMARY KEY (`id`),
  KEY `user_idx` (`user_id`),
  KEY `post_idx` (`post_id`),
  CONSTRAINT `post_saved` FOREIGN KEY (`post_id`) REFERENCES `post` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `user_saved` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `saved`
--

LOCK TABLES `saved` WRITE;
/*!40000 ALTER TABLE `saved` DISABLE KEYS */;
/*!40000 ALTER TABLE `saved` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `users`
--

DROP TABLE IF EXISTS `users`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `users` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `first_name` varchar(255) NOT NULL,
  `last_name` varchar(255) NOT NULL,
  `email` varchar(45) NOT NULL,
  `password` varchar(255) NOT NULL,
  `profile_pic` mediumtext,
  `about` mediumtext,
  `dob` date NOT NULL,
  `created_at` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  UNIQUE KEY `email_UNIQUE` (`email`)
) ENGINE=InnoDB AUTO_INCREMENT=24 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `users`
--

LOCK TABLES `users` WRITE;
/*!40000 ALTER TABLE `users` DISABLE KEYS */;
INSERT INTO `users` VALUES (12,'John','Doe','john@doe.com','$2b$10$I8FCQMW6AREModNS1yQjV.HdH2zGnUcDcHtsMQtLson1m9RqWSYgS',NULL,NULL,'1998-07-06','2021-07-04 10:48:19'),(13,'ishrak','rafi','ishrakw94@gmail.com','$2b$10$WqLaUv.E43isZW5LnS71..YUVs34uZhWGrPjdiLl8AIN2nfHjiMXO','profile-1625411527663.jpg','this is an about of myself','1998-06-12','2021-07-04 13:54:31'),(14,'Arman','Hossain','arman@gmail.com','$2b$10$J80H/PfZ8OR/kTmTx2sp7.VG1RvJtO9HF92Kxq.SlfEzSH3U1DWXi',NULL,NULL,'1998-06-12','2021-07-04 13:57:13'),(15,'Tahia','Hossain','tahia@gmail.com','$2b$10$ZA93Og2GSU3EzJnu1WFmKO1DqAeLRMJvzpQLK6Jlp0DaNX4ewnROu',NULL,NULL,'1998-06-12','2021-07-04 13:58:28'),(21,'ed','sheeran','ed@music.com','$2b$10$7Ukj3xysKXxGkbT1AiHk9O6VJ378Rh50mrIfkQ3W3x5nrKKq9WzF2',NULL,NULL,'2012-06-06','2021-07-04 14:05:52'),(22,'sia','sia','sia@gmail.com','$2b$10$Sv62tuffDSj2mj6JRJdXq.HY8EjBmrX3XX6E.KgD.IosF9FDQbQfq',NULL,NULL,'1998-05-05','2021-07-04 14:07:33'),(23,'asdasd','assf','asdasd@asd','$2b$10$D0Y/z6I8Mx.78LOhg5KGvOv/svH7NoHGJQSrIrSrH3wTB.CfgnuBC',NULL,NULL,'2021-07-08','2021-07-04 14:09:41');
/*!40000 ALTER TABLE `users` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `vote`
--

DROP TABLE IF EXISTS `vote`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `vote` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `user_id` bigint NOT NULL,
  `post_id` bigint NOT NULL,
  `upvote` tinyint DEFAULT '0',
  `downvote` tinyint DEFAULT '0',
  PRIMARY KEY (`id`),
  KEY `user_const_idx` (`user_id`),
  KEY `post_idx` (`post_id`),
  CONSTRAINT `post` FOREIGN KEY (`post_id`) REFERENCES `post` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `user_const` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=16 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `vote`
--

LOCK TABLES `vote` WRITE;
/*!40000 ALTER TABLE `vote` DISABLE KEYS */;
INSERT INTO `vote` VALUES (13,13,21,1,0),(14,13,9,1,0),(15,13,8,1,0);
/*!40000 ALTER TABLE `vote` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2021-07-04 22:21:06
