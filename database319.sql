-- MySQL dump 10.13  Distrib 9.1.0, for Win64 (x86_64)
--
-- Host: localhost    Database: project319
-- ------------------------------------------------------
-- Server version    9.1.0

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
 /*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
 /*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
 /*!50503 SET NAMES utf8mb4 */;
 /*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
 /*!40103 SET TIME_ZONE='+00:00' */;
 /*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
 /*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
 /*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
 /*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `auth_group`
--

DROP TABLE IF EXISTS `auth_group`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `auth_group` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(150) COLLATE utf8mb4_unicode_ci NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `name` (`name`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `auth_group`
--

LOCK TABLES `auth_group` WRITE;
/*!40000 ALTER TABLE `auth_group` DISABLE KEYS */;
/*!40000 ALTER TABLE `auth_group` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `auth_group_permissions`
--

DROP TABLE IF EXISTS `auth_group_permissions`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `auth_group_permissions` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `group_id` int NOT NULL,
  `permission_id` int NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `auth_group_permissions_group_id_permission_id_0cd325b0_uniq` (`group_id`,`permission_id`),
  KEY `auth_group_permissio_permission_id_84c5c92e_fk_auth_perm` (`permission_id`),
  CONSTRAINT `auth_group_permissio_permission_id_84c5c92e_fk_auth_perm` FOREIGN KEY (`permission_id`) REFERENCES `auth_permission` (`id`),
  CONSTRAINT `auth_group_permissions_group_id_b120cbf9_fk_auth_group_id` FOREIGN KEY (`group_id`) REFERENCES `auth_group` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `auth_group_permissions`
--

LOCK TABLES `auth_group_permissions` WRITE;
/*!40000 ALTER TABLE `auth_group_permissions` DISABLE KEYS */;
/*!40000 ALTER TABLE `auth_group_permissions` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `auth_permission`
--

DROP TABLE IF EXISTS `auth_permission`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `auth_permission` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `content_type_id` int NOT NULL,
  `codename` varchar(100) COLLATE utf8mb4_unicode_ci NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `auth_permission_content_type_id_codename_01ab375a_uniq` (`content_type_id`,`codename`),
  CONSTRAINT `auth_permission_content_type_id_2f476e4b_fk_django_co` FOREIGN KEY (`content_type_id`) REFERENCES `django_content_type` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=25 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `auth_permission`
--

LOCK TABLES `auth_permission` WRITE;
/*!40000 ALTER TABLE `auth_permission` DISABLE KEYS */;
INSERT INTO `auth_permission` VALUES 
(1,'Can add log entry',1,'add_logentry'),
(2,'Can change log entry',1,'change_logentry'),
(3,'Can delete log entry',1,'delete_logentry'),
(4,'Can view log entry',1,'view_logentry'),
(5,'Can add permission',2,'add_permission'),
(6,'Can change permission',2,'change_permission'),
(7,'Can delete permission',2,'delete_permission'),
(8,'Can view permission',2,'view_permission'),
(9,'Can add group',3,'add_group'),
(10,'Can change group',3,'change_group'),
(11,'Can delete group',3,'delete_group'),
(12,'Can view group',3,'view_group'),
(13,'Can add content type',4,'add_contenttype'),
(14,'Can change content type',4,'change_contenttype'),
(15,'Can delete content type',4,'delete_contenttype'),
(16,'Can view content type',4,'view_contenttype'),
(17,'Can add session',5,'add_session'),
(18,'Can change session',5,'change_session'),
(19,'Can delete session',5,'delete_session'),
(20,'Can view session',5,'view_session'),
(21,'Can add user',6,'add_useraccount'),
(22,'Can change user',6,'change_useraccount'),
(23,'Can delete user',6,'delete_useraccount'),
(24,'Can view user',6,'view_useraccount');
/*!40000 ALTER TABLE `auth_permission` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `cs319projectapp_useraccount`
--

DROP TABLE IF EXISTS `cs319projectapp_useraccount`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `cs319projectapp_useraccount` (
  `id` BIGINT NOT NULL AUTO_INCREMENT,
  `password` varchar(128) COLLATE utf8mb4_unicode_ci NOT NULL,
  `last_login` datetime(6) DEFAULT NULL,
  `is_superuser` tinyint(1) NOT NULL,
  `username` varchar(150) COLLATE utf8mb4_unicode_ci NOT NULL,
  `first_name` varchar(150) COLLATE utf8mb4_unicode_ci NOT NULL,
  `last_name` varchar(150) COLLATE utf8mb4_unicode_ci NOT NULL,
  `email` varchar(254) COLLATE utf8mb4_unicode_ci NOT NULL,
  `is_staff` tinyint(1) NOT NULL,
  `is_active` tinyint(1) NOT NULL,
  `date_joined` datetime(6) NOT NULL,
  `role` varchar(50) COLLATE utf8mb4_unicode_ci NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `username` (`username`)
) ENGINE=InnoDB AUTO_INCREMENT=8 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `cs319projectapp_useraccount`
--

LOCK TABLES `cs319projectapp_useraccount` WRITE;
/*!40000 ALTER TABLE `cs319projectapp_useraccount` DISABLE KEYS */;
INSERT INTO `cs319projectapp_useraccount` VALUES 
(1,'pbkdf2_sha256$870000$VCX7hdXBKpGQsBtzNAhvsi$OAvCfeWyqLCq+teSbrCfLONBzj8nO/qwjDVVAA0LQr4=','2024-12-06 18:26:46.036713',1,'Hakanto','','','i.hakan_karakoc@hotmail.com',1,1,'2024-12-06 18:26:09.754322','Guest'),
(2,'pbkdf2_sha256$870000$ORCvv09yIqYaLITYc33x8g$Mjs464SQfUeTD38x0i5AhDPzvnfsfhGIGDJZ7EEg9mE=',NULL,0,'guide','','','',0,1,'2024-12-06 18:28:19.491593','Guide'),
(3,'pbkdf2_sha256$870000$zphA8dbzIL5CwD31ZkiCBi$mOwo6GFZQ8ELKY7tMjhb60TxoRMCz/aFUM/YxGwwndI=',NULL,0,'advisor','','','',0,1,'2024-12-06 18:28:19.861454','Advisor'),
(4,'pbkdf2_sha256$870000$n0QQeQCcUrEVMr9fIyOhRf$LcekSu5mWfZCw9odfAhY/ePZFdfARXVUai78ZpMRDII=',NULL,0,'coordinator','','','',0,1,'2024-12-06 18:28:20.212893','Coordinator'),
(5,'pbkdf2_sha256$870000$36Y0D6AVmwC3GmYRiPmuWJ$DRnQP7KFrrN5qjVWMOLvjttdrsPdfKhh12ZqRUG9Dog=',NULL,0,'director','','','',0,1,'2024-12-06 18:28:20.560639','Director'),
(6,'pbkdf2_sha256$870000$CLNrVDo9vanB5iw9k4NkkZ$7x55Nw81Ornr0OIjvG9RdjwobJTWf13CuhHdMAr0BPs=',NULL,0,'promo','','','',0,1,'2024-12-06 18:28:20.908215','Promo_Coordinator'),
(7,'pbkdf2_sha256$870000$9s9HgtX5BXPMxC4r9UN9bh$wdR1v/K5INaJKFh56vV4eR3SwLhWL3wc5NKX0U8qG0o=',NULL,0,'guest','','','',0,1,'2024-12-06 18:28:21.256441','Guest');
/*!40000 ALTER TABLE `cs319projectapp_useraccount` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `cs319projectapp_useraccount_groups`
--

DROP TABLE IF EXISTS `cs319projectapp_useraccount_groups`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `cs319projectapp_useraccount_groups` (
  `id` BIGINT NOT NULL AUTO_INCREMENT,
  `useraccount_id` BIGINT NOT NULL,
  `group_id` int NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `cs319projectapp_useracco_useraccount_id_group_id_5b2a9fbb_uniq` (`useraccount_id`,`group_id`),
  KEY `cs319projectapp_user_group_id_5b8c3591_fk_auth_grou` (`group_id`),
  CONSTRAINT `cs319projectapp_user_group_id_5b8c3591_fk_auth_grou` FOREIGN KEY (`group_id`) REFERENCES `auth_group` (`id`),
  CONSTRAINT `cs319projectapp_useraccount_groups_useraccount_id_c7d67d1d_fk` FOREIGN KEY (`useraccount_id`) REFERENCES `cs319projectapp_useraccount` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `cs319projectapp_useraccount_groups`
--

LOCK TABLES `cs319projectapp_useraccount_groups` WRITE;
/*!40000 ALTER TABLE `cs319projectapp_useraccount_groups` DISABLE KEYS */;
/*!40000 ALTER TABLE `cs319projectapp_useraccount_groups` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `cs319projectapp_useraccount_user_permissions`
--

DROP TABLE IF EXISTS `cs319projectapp_useraccount_user_permissions`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `cs319projectapp_useraccount_user_permissions` (
  `id` BIGINT NOT NULL AUTO_INCREMENT,
  `useraccount_id` BIGINT NOT NULL,
  `permission_id` int NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `cs319projectapp_useracco_useraccount_id_permissio_d0046033_uniq` (`useraccount_id`,`permission_id`),
  KEY `cs319projectapp_user_permission_id_b628f310_fk_auth_perm` (`permission_id`),
  CONSTRAINT `cs319projectapp_user_permission_id_b628f310_fk_auth_perm` FOREIGN KEY (`permission_id`) REFERENCES `auth_permission` (`id`),
  CONSTRAINT `cs319projectapp_useraccount_useraccount_id_c7d67d1d_fk` FOREIGN KEY (`useraccount_id`) REFERENCES `cs319projectapp_useraccount` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `cs319projectapp_useraccount_user_permissions`
--

LOCK TABLES `cs319projectapp_useraccount_user_permissions` WRITE;
/*!40000 ALTER TABLE `cs319projectapp_useraccount_user_permissions` DISABLE KEYS */;
/*!40000 ALTER TABLE `cs319projectapp_useraccount_user_permissions` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `django_admin_log`
--

DROP TABLE IF EXISTS `django_admin_log`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `django_admin_log` (
  `id` int NOT NULL AUTO_INCREMENT,
  `action_time` datetime(6) NOT NULL,
  `object_id` longtext COLLATE utf8mb4_unicode_ci,
  `object_repr` varchar(200) COLLATE utf8mb4_unicode_ci NOT NULL,
  `action_flag` smallint unsigned NOT NULL,
  `change_message` longtext COLLATE utf8mb4_unicode_ci NOT NULL,
  `content_type_id` int DEFAULT NULL,
  `user_id` BIGINT NOT NULL,
  PRIMARY KEY (`id`),
  KEY `django_admin_log_content_type_id_c4bce8eb_fk_django_co` (`content_type_id`),
  KEY `django_admin_log_user_id_c564eba6_fk_cs319proj` (`user_id`),
  CONSTRAINT `django_admin_log_content_type_id_c4bce8eb_fk_django_co` FOREIGN KEY (`content_type_id`) REFERENCES `django_content_type` (`id`),
  CONSTRAINT `django_admin_log_user_id_c564eba6_fk_cs319proj` FOREIGN KEY (`user_id`) REFERENCES `cs319projectapp_useraccount` (`id`),
  CONSTRAINT `django_admin_log_chk_1` CHECK ((`action_flag` >= 0))
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `django_admin_log`
--

LOCK TABLES `django_admin_log` WRITE;
/*!40000 ALTER TABLE `django_admin_log` DISABLE KEYS */;
/*!40000 ALTER TABLE `django_admin_log` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `django_content_type`
--

DROP TABLE IF EXISTS `django_content_type`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `django_content_type` (
  `id` int NOT NULL AUTO_INCREMENT,
  `app_label` varchar(100) COLLATE utf8mb4_unicode_ci NOT NULL,
  `model` varchar(100) COLLATE utf8mb4_unicode_ci NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `django_content_type_app_label_model_76bd3d3b_uniq` (`app_label`,`model`)
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `django_content_type`
--

LOCK TABLES `django_content_type` WRITE;
/*!40000 ALTER TABLE `django_content_type` DISABLE KEYS */;
INSERT INTO `django_content_type` VALUES 
(1,'admin','logentry'),
(3,'auth','group'),
(2,'auth','permission'),
(4,'contenttypes','contenttype'),
(6,'cs319projectapp','useraccount'),
(5,'sessions','session');
/*!40000 ALTER TABLE `django_content_type` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `django_migrations`
--

DROP TABLE IF EXISTS `django_migrations`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `django_migrations` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `app` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `name` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `applied` datetime(6) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=20 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `django_migrations`
--

LOCK TABLES `django_migrations` WRITE;
/*!40000 ALTER TABLE `django_migrations` DISABLE KEYS */;
INSERT INTO `django_migrations` VALUES 
(1,'contenttypes','0001_initial','2024-12-06 18:21:38.237771'),
(2,'contenttypes','0002_remove_content_type_name','2024-12-06 18:21:38.311198'),
(3,'auth','0001_initial','2024-12-06 18:21:38.587361'),
(4,'auth','0002_alter_permission_name_max_length','2024-12-06 18:21:38.662035'),
(5,'auth','0003_alter_user_email_max_length','2024-12-06 18:21:38.668558'),
(6,'auth','0004_alter_user_username_opts','2024-12-06 18:21:38.677932'),
(7,'auth','0005_alter_user_last_login_null','2024-12-06 18:21:38.684093'),
(8,'auth','0006_require_contenttypes_0002','2024-12-06 18:21:38.688057'),
(9,'auth','0007_alter_validators_add_error_messages','2024-12-06 18:21:38.698387'),
(10,'auth','0008_alter_user_username_max_length','2024-12-06 18:21:38.705410'),
(11,'auth','0009_alter_user_last_name_max_length','2024-12-06 18:21:38.712658'),
(12,'auth','0010_alter_group_name_max_length','2024-12-06 18:21:38.726958'),
(13,'auth','0011_update_proxy_permissions','2024-12-06 18:21:38.733656'),
(14,'auth','0012_alter_user_first_name_max_length','2024-12-06 18:21:38.739518'),
(15,'cs319projectapp','0001_initial','2024-12-06 18:21:39.125110'),
(16,'admin','0001_initial','2024-12-06 18:21:39.283158'),
(17,'admin','0002_logentry_remove_auto_add','2024-12-06 18:21:39.294663'),
(18,'admin','0003_logentry_add_action_flag_choices','2024-12-06 18:21:39.307530'),
(19,'sessions','0001_initial','2024-12-06 18:21:39.355770');
/*!40000 ALTER TABLE `django_migrations` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `django_session`
--

DROP TABLE IF EXISTS `django_session`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `django_session` (
  `session_key` varchar(40) COLLATE utf8mb4_unicode_ci NOT NULL,
  `session_data` longtext COLLATE utf8mb4_unicode_ci NOT NULL,
  `expire_date` datetime(6) NOT NULL,
  PRIMARY KEY (`session_key`),
  KEY `django_session_expire_date_a5c62663` (`expire_date`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `django_session`
--

LOCK TABLES `django_session` WRITE;
/*!40000 ALTER TABLE `django_session` DISABLE KEYS */;
INSERT INTO `django_session` VALUES 
('e1ilcct2bpx2rx0xqw5lh0k0qzgcnyu3','.eJxVjEEOwiAQRe_C2hBggIpL9z0DmRmoVA1NSrsy3l1JutDtf-_9l4i4byXuLa9xTuIitDj9boT8yLWDdMd6WyQvdVtnkl2RB21yXFJ-Xg_376BgK702rCYirbTDYIiMTyooduySh3NQVqPy2VnkAWEIQMZymAzBNwKfQLw_4gE34Q:1tJd2M:3kqVIbcmo3HTdtlYNesTjURAsCzFQCKBN2vwNuAPcPo','2024-12-20 18:26:46.042879');
/*!40000 ALTER TABLE `django_session` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `users`
--

DROP TABLE IF EXISTS `users`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `users` (
  `ID` int NOT NULL AUTO_INCREMENT,
  `Password` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `Role` enum('Guide','Advisor','Coordinator','Director','Promo_Coordinator') COLLATE utf8mb4_unicode_ci NOT NULL,
  PRIMARY KEY (`ID`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `users`
--

LOCK TABLES `users` WRITE;
/*!40000 ALTER TABLE `users` DISABLE KEYS */;
INSERT INTO `users` VALUES 
(1,'guide123','Guide'),
(2,'advisor123','Advisor'),
(3,'coordinator123','Coordinator'),
(4,'director123','Director'),
(5,'promo123','Promo_Coordinator');
/*!40000 ALTER TABLE `users` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

 /*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
 /*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
 /*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
 /*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
 /*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
 /*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
 /*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2024-12-15 19:23:57
