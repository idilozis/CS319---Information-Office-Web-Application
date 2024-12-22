-- MySQL dump 10.13  Distrib 9.1.0, for Win64 (x86_64)
--
-- Host: localhost    Database: project319
-- ------------------------------------------------------
-- Server version	9.1.0

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
-- Table structure for table `advisors`
--

DROP TABLE IF EXISTS `advisors`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `advisors` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(100) COLLATE utf8mb4_unicode_ci NOT NULL,
  `bilkent_id` varchar(10) COLLATE utf8mb4_unicode_ci NOT NULL,
  `contact_phone` varchar(15) COLLATE utf8mb4_unicode_ci NOT NULL,
  `contact_email` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `assigned_day` varchar(10) COLLATE utf8mb4_unicode_ci NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `advisors`
--

LOCK TABLES `advisors` WRITE;
/*!40000 ALTER TABLE `advisors` DISABLE KEYS */;
INSERT INTO `advisors` VALUES (1,'Ahmet Yavuzhan Er','22001236','0123 456 78 90','ahmet.er@bilkent.edu.tr','Monday'),(2,'Ali Yıldırım','22001237','0111 222 33 44','ali.yildirim@bilkent.edu.tr','Thursday'),(3,'Berker Kara','22001238','0333 444 55 66','berker.kara@bilkent.edu.tr','Friday'),(4,'Sıla Yılmaz','22001239','0444 555 66 77','sila.yilmaz@bilkent.edu.tr','Saturday'),(5,'Zeynep Dursun','22001240','0555 666 77 88','zeynep.dursun@bilkent.edu.tr','Sunday');
/*!40000 ALTER TABLE `advisors` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `auth_group`
--

DROP TABLE IF EXISTS `auth_group`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `auth_group` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(150) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
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
  `name` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `content_type_id` int NOT NULL,
  `codename` varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `auth_permission_content_type_id_codename_01ab375a_uniq` (`content_type_id`,`codename`),
  CONSTRAINT `auth_permission_content_type_id_2f476e4b_fk_django_co` FOREIGN KEY (`content_type_id`) REFERENCES `django_content_type` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=41 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `auth_permission`
--

LOCK TABLES `auth_permission` WRITE;
/*!40000 ALTER TABLE `auth_permission` DISABLE KEYS */;
INSERT INTO `auth_permission` VALUES (1,'Can add log entry',1,'add_logentry'),(2,'Can change log entry',1,'change_logentry'),(3,'Can delete log entry',1,'delete_logentry'),(4,'Can view log entry',1,'view_logentry'),(5,'Can add permission',2,'add_permission'),(6,'Can change permission',2,'change_permission'),(7,'Can delete permission',2,'delete_permission'),(8,'Can view permission',2,'view_permission'),(9,'Can add group',3,'add_group'),(10,'Can change group',3,'change_group'),(11,'Can delete group',3,'delete_group'),(12,'Can view group',3,'view_group'),(13,'Can add content type',4,'add_contenttype'),(14,'Can change content type',4,'change_contenttype'),(15,'Can delete content type',4,'delete_contenttype'),(16,'Can view content type',4,'view_contenttype'),(17,'Can add session',5,'add_session'),(18,'Can change session',5,'change_session'),(19,'Can delete session',5,'delete_session'),(20,'Can view session',5,'view_session'),(21,'Can add user',6,'add_useraccount'),(22,'Can change user',6,'change_useraccount'),(23,'Can delete user',6,'delete_useraccount'),(24,'Can view user',6,'view_useraccount'),(25,'Can add high school',7,'add_highschool'),(26,'Can change high school',7,'change_highschool'),(27,'Can delete high school',7,'delete_highschool'),(28,'Can view high school',7,'view_highschool'),(29,'Can add tour',8,'add_tour'),(30,'Can change tour',8,'change_tour'),(31,'Can delete tour',8,'delete_tour'),(32,'Can view tour',8,'view_tour'),(33,'Can add individual tour',9,'add_individualtour'),(34,'Can change individual tour',9,'change_individualtour'),(35,'Can delete individual tour',9,'delete_individualtour'),(36,'Can view individual tour',9,'view_individualtour'),(37,'Can add university fair',10,'add_universityfair'),(38,'Can change university fair',10,'change_universityfair'),(39,'Can delete university fair',10,'delete_universityfair'),(40,'Can view university fair',10,'view_universityfair');
/*!40000 ALTER TABLE `auth_permission` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `cs319projectapp_highschool`
--

DROP TABLE IF EXISTS `cs319projectapp_highschool`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `cs319projectapp_highschool` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `name` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `city` varchar(100) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `score` double NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `cs319projectapp_highschool`
--

LOCK TABLES `cs319projectapp_highschool` WRITE;
/*!40000 ALTER TABLE `cs319projectapp_highschool` DISABLE KEYS */;
/*!40000 ALTER TABLE `cs319projectapp_highschool` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `cs319projectapp_tour`
--

DROP TABLE IF EXISTS `cs319projectapp_tour`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `cs319projectapp_tour` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `counselor_name` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `capacity` int unsigned NOT NULL,
  `highschool` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `contact_phone` varchar(20) COLLATE utf8mb4_unicode_ci NOT NULL,
  `contact_email` varchar(254) COLLATE utf8mb4_unicode_ci NOT NULL,
  `additional_notes` longtext COLLATE utf8mb4_unicode_ci,
  `date` date NOT NULL,
  `time_slot` varchar(50) COLLATE utf8mb4_unicode_ci NOT NULL,
  PRIMARY KEY (`id`),
  CONSTRAINT `cs319projectapp_tour_chk_1` CHECK ((`capacity` >= 0))
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `cs319projectapp_tour`
--

LOCK TABLES `cs319projectapp_tour` WRITE;
/*!40000 ALTER TABLE `cs319projectapp_tour` DISABLE KEYS */;
/*!40000 ALTER TABLE `cs319projectapp_tour` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `cs319projectapp_useraccount_groups`
--

DROP TABLE IF EXISTS `cs319projectapp_useraccount_groups`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `cs319projectapp_useraccount_groups` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `useraccount_id` varchar(50) COLLATE utf8mb4_unicode_ci NOT NULL,
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
  `id` bigint NOT NULL AUTO_INCREMENT,
  `useraccount_id` varchar(50) COLLATE utf8mb4_unicode_ci NOT NULL,
  `permission_id` int NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `cs319projectapp_useracco_useraccount_id_permissio_d0046033_uniq` (`useraccount_id`,`permission_id`),
  KEY `cs319projectapp_user_permission_id_b628f310_fk_auth_perm` (`permission_id`),
  CONSTRAINT `cs319projectapp_user_permission_id_b628f310_fk_auth_perm` FOREIGN KEY (`permission_id`) REFERENCES `auth_permission` (`id`),
  CONSTRAINT `cs319projectapp_useraccou_useraccount_id_566e24e5_fk` FOREIGN KEY (`useraccount_id`) REFERENCES `cs319projectapp_useraccount` (`id`)
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
  `user_id` varchar(50) COLLATE utf8mb4_unicode_ci NOT NULL,
  PRIMARY KEY (`id`),
  KEY `django_admin_log_content_type_id_c4bce8eb_fk_django_co` (`content_type_id`),
  KEY `django_admin_log_user_id_c564eba6_fk` (`user_id`),
  CONSTRAINT `django_admin_log_content_type_id_c4bce8eb_fk_django_co` FOREIGN KEY (`content_type_id`) REFERENCES `django_content_type` (`id`),
  CONSTRAINT `django_admin_log_user_id_c564eba6_fk` FOREIGN KEY (`user_id`) REFERENCES `cs319projectapp_useraccount` (`id`),
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
) ENGINE=InnoDB AUTO_INCREMENT=11 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `django_content_type`
--

LOCK TABLES `django_content_type` WRITE;
/*!40000 ALTER TABLE `django_content_type` DISABLE KEYS */;
INSERT INTO `django_content_type` VALUES (1,'admin','logentry'),(3,'auth','group'),(2,'auth','permission'),(4,'contenttypes','contenttype'),(7,'cs319projectapp','highschool'),(9,'cs319projectapp','individualtour'),(8,'cs319projectapp','tour'),(10,'cs319projectapp','universityfair'),(6,'cs319projectapp','useraccount'),(5,'sessions','session');
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
) ENGINE=InnoDB AUTO_INCREMENT=35 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `django_migrations`
--

LOCK TABLES `django_migrations` WRITE;
/*!40000 ALTER TABLE `django_migrations` DISABLE KEYS */;
INSERT INTO `django_migrations` VALUES (1,'contenttypes','0001_initial','2024-12-06 18:21:38.237771'),(2,'contenttypes','0002_remove_content_type_name','2024-12-06 18:21:38.311198'),(3,'auth','0001_initial','2024-12-06 18:21:38.587361'),(4,'auth','0002_alter_permission_name_max_length','2024-12-06 18:21:38.662035'),(5,'auth','0003_alter_user_email_max_length','2024-12-06 18:21:38.668558'),(6,'auth','0004_alter_user_username_opts','2024-12-06 18:21:38.677932'),(7,'auth','0005_alter_user_last_login_null','2024-12-06 18:21:38.684093'),(8,'auth','0006_require_contenttypes_0002','2024-12-06 18:21:38.688057'),(9,'auth','0007_alter_validators_add_error_messages','2024-12-06 18:21:38.698387'),(10,'auth','0008_alter_user_username_max_length','2024-12-06 18:21:38.705410'),(11,'auth','0009_alter_user_last_name_max_length','2024-12-06 18:21:38.712658'),(12,'auth','0010_alter_group_name_max_length','2024-12-06 18:21:38.726958'),(13,'auth','0011_update_proxy_permissions','2024-12-06 18:21:38.733656'),(14,'auth','0012_alter_user_first_name_max_length','2024-12-06 18:21:38.739518'),(15,'cs319projectapp','0001_initial','2024-12-06 18:21:39.125110'),(16,'admin','0001_initial','2024-12-06 18:21:39.283158'),(17,'admin','0002_logentry_remove_auto_add','2024-12-06 18:21:39.294663'),(18,'admin','0003_logentry_add_action_flag_choices','2024-12-06 18:21:39.307530'),(19,'sessions','0001_initial','2024-12-06 18:21:39.355770'),(20,'cs319projectapp','0002_alter_useraccount_options_alter_useraccount_managers_and_more','2024-12-15 17:19:09.059273'),(23,'cs319projectapp','0003_highschool','2024-12-19 14:06:01.762270'),(24,'cs319projectapp','0004_alter_highschool_id','2024-12-19 14:06:01.824694'),(25,'cs319projectapp','0005_alter_highschool_table','2024-12-19 14:42:16.597744'),(26,'cs319projectapp','0006_tour','2024-12-20 14:27:04.109528'),(27,'cs319projectapp','0007_alter_tour_table','2024-12-20 14:42:37.769694'),(28,'cs319projectapp','0008_rename_date_tour_tour_date','2024-12-20 14:59:53.058473'),(29,'cs319projectapp','0009_rename_tour_date_tour_date_tour_status','2024-12-21 10:04:07.628364'),(30,'cs319projectapp','0010_individualtour','2024-12-21 11:02:07.320686'),(31,'cs319projectapp','0011_universityfair','2024-12-21 11:37:37.011561'),(32,'cs319projectapp','0012_guide_tour_guide','2024-12-21 14:56:35.701317'),(33,'cs319projectapp','0013_remove_tour_guide_tour_guide1_id_tour_guide2_id_and_more','2024-12-21 14:56:35.708505'),(34,'cs319projectapp','0012_individualtour_guide_id_tour_guide1_id_and_more','2024-12-21 19:32:47.566099');
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
INSERT INTO `django_session` VALUES ('e1ilcct2bpx2rx0xqw5lh0k0qzgcnyu3','.eJxVjEEOwiAQRe_C2hBggIpL9z0DmRmoVA1NSrsy3l1JutDtf-_9l4i4byXuLa9xTuIitDj9boT8yLWDdMd6WyQvdVtnkl2RB21yXFJ-Xg_376BgK702rCYirbTDYIiMTyooduySh3NQVqPy2VnkAWEIQMZymAzBNwKfQLw_4gE34Q:1tJd2M:3kqVIbcmo3HTdtlYNesTjURAsCzFQCKBN2vwNuAPcPo','2024-12-20 18:26:46.042879');
/*!40000 ALTER TABLE `django_session` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `feedback`
--

DROP TABLE IF EXISTS `feedback`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `feedback` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(100) COLLATE utf8mb4_unicode_ci NOT NULL,
  `city` varchar(100) COLLATE utf8mb4_unicode_ci NOT NULL,
  `highschool` varchar(100) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `tour_type` enum('High School','Individual') COLLATE utf8mb4_unicode_ci NOT NULL,
  `tour_date` date NOT NULL,
  `feedback` text COLLATE utf8mb4_unicode_ci NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `feedback`
--

LOCK TABLES `feedback` WRITE;
/*!40000 ALTER TABLE `feedback` DISABLE KEYS */;
INSERT INTO `feedback` VALUES (1,'İrfan Hakan','Izmir','İzmir Fen Lisesi','High School','2025-01-03','I enjoyed the tour at smosh.');
/*!40000 ALTER TABLE `feedback` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `guides`
--

DROP TABLE IF EXISTS `guides`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `guides` (
  `id` int NOT NULL AUTO_INCREMENT,
  `bilkentid` varchar(20) COLLATE utf8mb4_unicode_ci NOT NULL,
  `name` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `contact_mail` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `contact_phone` varchar(20) COLLATE utf8mb4_unicode_ci NOT NULL,
  `tour_hours` int DEFAULT '0',
  `fair_hours` int DEFAULT '0',
  `payroll` decimal(10,2) DEFAULT '0.00',
  PRIMARY KEY (`id`),
  UNIQUE KEY `bilkentid` (`bilkentid`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `guides`
--

LOCK TABLES `guides` WRITE;
/*!40000 ALTER TABLE `guides` DISABLE KEYS */;
INSERT INTO `guides` VALUES (1,'22001234','John Doe','johndoe@example.com','123-456-7890',10,5,500.00),(2,'22001235','Jane Smith','janesmith@example.com','987-654-3210',15,8,750.00);
/*!40000 ALTER TABLE `guides` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `highschools`
--

DROP TABLE IF EXISTS `highschools`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `highschools` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `city` varchar(100) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `score` float DEFAULT '0',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=102 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `highschools`
--

LOCK TABLES `highschools` WRITE;
/*!40000 ALTER TABLE `highschools` DISABLE KEYS */;
INSERT INTO `highschools` VALUES (1,'Ankara Fen Lisesi','ANKARA',99.17),(2,'İzmir Fen Lisesi','İZMİR',98.54),(3,'Atatürk Lisesi','İZMİR',97.4),(4,'Tofaş Fen Lisesi','BURSA',97.27),(5,'Adana Fen Lisesi','ADANA',96.39),(6,'Ankara Pursaklar Fen Lisesi','ANKARA',96.18),(7,'Osman Ulubaş Kayseri Fen Lisesi','KAYSERİ',95.42),(8,'Prof. Dr. Aziz Sancar Fen Lisesi','ANKARA',93.92),(9,'Yusuf Ziya Öner Fen Lisesi','ANTALYA',93.77),(10,'Nilüfer Borsa İstanbul Fen Lisesi','BURSA',93.12),(11,'Eyüp Aygar Fen Lisesi','MERSİN',92.19),(12,'Erbakır Fen Lisesi','DENİZLİ',91.9),(13,'Aydın Fen Lisesi','AYDIN',89.63),(14,'Buca İnci-Özer Tırnaklı Fen Lisesi','İZMİR',89.58),(15,'Meram Fen Lisesi','KONYA',88.49),(16,'Atatürk Anadolu Lisesi','ANKARA',87.79),(17,'Samsun Garip Zeycan Yıldırım Fen Lisesi','SAMSUN',87.67),(18,'Sümer Fen Lisesi','KAYSERİ',86.86),(19,'Kocaeli Fen Lisesi','KOCAELİ',86.73),(20,'Vehbi Dinçerler Fen Lisesi','GAZİANTEP',86.56),(21,'Seyhan Borsa İstanbul Fen Lisesi','ADANA',85.53),(22,'Cumhuriyet Fen Lisesi','ANKARA',85.52),(23,'Eskişehir Fatih Fen Lisesi','ESKİŞEHİR',85.5),(24,'Trabzon Merkez Fen Lisesi','TRABZON',85.43),(25,'Özdemir Bayraktar Havacılık ve Uzay Lisesi','ANKARA',85.32),(26,'Manisa Fen Lisesi','MANİSA',85.09),(27,'Bornova Anadolu Lisesi','İZMİR',84.88),(28,'Bursa Anadolu Lisesi','BURSA',84.86),(29,'Malatya Erman Ilıcak Fen Lisesi','MALATYA',84.47),(30,'Rekabet Kurumu Cumhuriyet Fen Lisesi','DİYARBAKIR',84.46),(31,'Nazilli Fen Lisesi','AYDIN',84.44),(32,'Yahya Akel Fen Lisesi','MERSİN',84.23),(33,'Keçiören Vatansever Aydoğan Fen Lisesi','ANKARA',83.2),(34,'AYDEM Fen Lisesi','DENİZLİ',82.36),(35,'Ahmet Hamdi Gökbayrak Fen Lisesi','BURSA',79.61),(36,'Mahmut Sami Ramazanoğlu Anadolu İmam Hatip Lisesi','KONYA',78.4),(37,'Antalya Anadolu Lisesi','ANTALYA',77.73),(38,'Isparta Süleyman Demirel Fen Lisesi','ISPARTA',77.14),(39,'Ankara Erman Ilıcak Fen Lisesi','ANKARA',74.99),(40,'Ebru Nayim Fen Lisesi','TEKİRDAĞ',74.79),(41,'Aziz Atik Fen Lisesi','SAMSUN',74.75),(42,'Yenimahalle Fen Lisesi','ANKARA',74.53),(43,'TOBB Fen Lisesi','GAZİANTEP',74.34),(44,'Halil Kale Fen Lisesi','MANİSA',73.57),(45,'TOBB Osmaniye Fen Lisesi','OSMANİYE',73.22),(46,'Kaya Karakaya Fen Lisesi','ELAZIĞ',70.21),(47,'Muammer Dereli Fen Lisesi','KOCAELİ',69.31),(48,'Süleyman Demirel Fen Lisesi','AFYONKARAHİSAR',69.11),(49,'Erzurum İbrahim Hakkı Fen Lisesi','ERZURUM',69.02),(50,'İzmir Kız Lisesi','İZMİR',68.25),(51,'Kayseri Fen Lisesi','KAYSERİ',68.19),(52,'Trabzon Yomra Fen Lisesi','TRABZON',67.6),(53,'ASELSAN Mesleki ve Teknik Anadolu Lisesi','ANKARA',67.59),(54,'Adana Anadolu Lisesi','ADANA',67.46),(55,'Karatay Fen Lisesi','KONYA',67.2),(56,'Tokat Milli Piyango İhya Balak Fen Lisesi','TOKAT',66.91),(57,'Borsa İstanbul Fen Lisesi','DİYARBAKIR',66.67),(58,'Prof.Dr.İlhan Kılıçözlü Fen Lisesi','KIRŞEHİR',65.6),(59,'Yücel Boru Fen Lisesi','KOCAELİ',65.19),(60,'Canik Fen Lisesi','SAMSUN',62.77),(61,'Eskişehir Anadolu Lisesi','ESKİŞEHİR',60.22),(62,'Selçuklu Fen Lisesi','KONYA',60.14),(63,'Menteşe TOBB Fen Lisesi','MUĞLA',59.08),(64,'Yaşar Kımıl Fen Lisesi','DENİZLİ',58.93),(65,'Özkent Akbilek Fen Lisesi','ANKARA',56.02),(66,'Kütahya Nafi Güral Fen Lisesi','KÜTAHYA',55.5),(67,'Ahmet Erdem Anadolu Lisesi','BURSA',54.74),(68,'Nuh Mehmet Küçükçalık Anadolu Lisesi','KAYSERİ',54.54),(69,'Kahramanmaraş TOBB Fen Lisesi','KAHRAMANMARAŞ',52.24),(70,'Çanakkale Fen Lisesi','ÇANAKKALE',49.34),(71,'Sivas Fen Lisesi','SİVAS',48.24),(72,'Hüseyin Girenes Fen Lisesi','ANTALYA',43.12),(73,'Sakarya Cevat Ayhan Fen Lisesi','SAKARYA',42.65),(74,'Aksaray Şehit Pilot Hamza Gümüşsoy Fen Lisesi','AKSARAY',41.99),(75,'Sesim Sarpkaya Fen Lisesi','MERSİN',39.01),(76,'Macide-Ramiz Taşkınlar Fen Lisesi','MANİSA',38.88),(77,'Batman Fen Lisesi','BATMAN',37.98),(78,'Adem-Tolunay Anadolu Lisesi','ANTALYA',36.02),(79,'Şehit Turgut Solak Fen Lisesi','BALIKESİR',35.26),(80,'Van Türk Telekom Fen Lisesi','VAN',33.9),(81,'Antalya TOBB Fen Lisesi','ANTALYA',31.76),(82,'Abdulkadir Konukoğlu Fen Lisesi','GAZİANTEP',29.58),(83,'Karşıyaka Cihat Kora Anadolu Lisesi','İZMİR',29.48),(84,'Şehit Özcan Kan Fen Lisesi','KOCAELİ',21.65),(85,'Şanlıurfa Fen Lisesi','ŞANLIURFA',21.39),(86,'Buca Fatma Saygın Anadolu Lisesi','İZMİR',21.24),(87,'Gazi Anadolu Lisesi','ANKARA',19.64),(88,'Ankara Atatürk Lisesi','ANKARA',18.89),(89,'15 Temmuz Şehitleri Fen Lisesi','ÇORUM',17.51),(90,'Kepez Mahmut Celalettin Ökten Anadolu Lisesi','ANTALYA',12.98),(91,'Altıeylül Fen Lisesi','BALIKESİR',11.36),(92,'Şükrü Şankaya Anadolu Lisesi','BURSA',9.76),(93,'Vali Aydın Arslan Fen Lisesi','DİYARBAKIR',7.88),(94,'Ordu Fen Lisesi','ORDU',5.98),(95,'Sami Yangın Anadolu Lisesi','KAYSERİ',3.87),(96,'Meram Anadolu Lisesi','KONYA',3.82),(97,'Çiğli Fen Lisesi','İZMİR',1.18),(98,'Kastamonu Fen Lisesi','KASTAMONU',0.79),(99,'Ortaklar Fen Lisesi','AYDIN',0.58),(100,'ÇEAS Anadolu Lisesi','ADANA',0.43),(101,'Hakanto Lisesi','Greenpath',102);
/*!40000 ALTER TABLE `highschools` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `highschooltours`
--

DROP TABLE IF EXISTS `highschooltours`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `highschooltours` (
  `id` int NOT NULL AUTO_INCREMENT,
  `counselor_name` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `capacity` int NOT NULL,
  `highschool` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `contact_phone` varchar(20) COLLATE utf8mb4_unicode_ci NOT NULL,
  `contact_email` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `additional_notes` text COLLATE utf8mb4_unicode_ci,
  `date` date DEFAULT NULL,
  `time_slot` varchar(50) COLLATE utf8mb4_unicode_ci NOT NULL,
  `status` enum('pending','accepted','rejected') COLLATE utf8mb4_unicode_ci DEFAULT 'pending',
  `guide1_id` int DEFAULT NULL,
  `guide2_id` int DEFAULT NULL,
  `guide3_id` int DEFAULT NULL,
  PRIMARY KEY (`id`),
  CONSTRAINT `highschooltours_chk_1` CHECK ((`capacity` <= 180))
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `highschooltours`
--

LOCK TABLES `highschooltours` WRITE;
/*!40000 ALTER TABLE `highschooltours` DISABLE KEYS */;
INSERT INTO `highschooltours` VALUES (1,'İrfan Hakan',2,'Ankara Fen Lisesi','0123 456 01 01','hakan.karakoc@ug.bilkent.edu.tr','try','2025-01-08','01:30-03:30','accepted',NULL,NULL,NULL),(2,'İrfan Hakan',23,'Ankara Fen Lisesi','0123 456 01 02','hakan.karakoc@ug.bilkent.edu.tr','xdxd','2025-01-07','01:30-03:30','accepted',NULL,NULL,NULL),(3,'Hakanto',32,'Ankara Fen Lisesi','0123 456 01 01','hakan.karakoc@ug.bilkent.edu.tr','xdxd','2025-01-10','10:30-12:30','accepted',NULL,NULL,NULL),(4,'İrfan Hakan',123,'Ankara Pursaklar Fen Lisesi','0123 456 01 01','hakan.karakoc@ug.bilkent.edu.tr','xdxd','2025-01-10','01:30-03:30','accepted',NULL,NULL,NULL),(5,'YAVUZ',2,'Ankara Fen Lisesi','0123 456 01 01','hakan.karakoc@ug.bilkent.edu.tr','try','2024-12-13','13:30-15:30','accepted',NULL,NULL,NULL),(6,'patot',2,'Ankara Fen Lisesi','0123 456 01 01','hakan.karakoc@ug.bilkent.edu.tr','try','2024-12-13','13:30-15:30','pending',NULL,NULL,NULL),(7,'turker',2,'Ankara Fen Lisesi','0123 456 01 01','hakan.karakoc@ug.bilkent.edu.tr','try','2025-01-03','13:30-15:30','pending',NULL,NULL,NULL);UNLOCK TABLES;

--
-- Table structure for table `individualtours`
--

DROP TABLE IF EXISTS `individualtours`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `individualtours` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `city` varchar(100) COLLATE utf8mb4_unicode_ci NOT NULL,
  `highschool` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `contact_phone` varchar(20) COLLATE utf8mb4_unicode_ci NOT NULL,
  `contact_email` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `major_of_interest` text COLLATE utf8mb4_unicode_ci NOT NULL,
  `additional_notes` text COLLATE utf8mb4_unicode_ci,
  `date` date NOT NULL,
  `status` enum('pending','accepted','rejected') COLLATE utf8mb4_unicode_ci DEFAULT 'pending',
  `guide_id` int DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `individualtours`
--

LOCK TABLES `individualtours` WRITE;
/*!40000 ALTER TABLE `individualtours` DISABLE KEYS */;
INSERT INTO `individualtours` VALUES (1,'İrfan Hakan','Ankara','Ankara Fen Lisesi','3424324344','hakan.karakoc@ug.bilkent.edu.tr','gfgfgfgf','xdxd','2025-01-09','accepted',NULL),(2,'Hakanto','Izmir','Atatürk Lisesi','3424324344','hakan.karakoc@ug.bilkent.edu.tr','gfgfgfgf','xdxdx','2025-01-10','accepted',NULL),(3,'Hakanto','Izmir','Atatürk Lisesi','3424324344','i.hakan_karakoc@hotmail.com','gfgfgfgf','xdxd','2025-01-09','accepted',NULL);
/*!40000 ALTER TABLE `individualtours` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `universityfairs`
--

DROP TABLE IF EXISTS `universityfairs`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `universityfairs` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(255) NOT NULL,
  `contact_email` varchar(255) NOT NULL,
  `city` varchar(100) NOT NULL,
  `highschool_name` varchar(255) NOT NULL,
  `date` date NOT NULL,
  `time` varchar(50) NOT NULL,
  `additional_notes` text,
  `status` enum('pending','accepted','rejected') DEFAULT 'pending',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `universityfairs`
--

LOCK TABLES `universityfairs` WRITE;
/*!40000 ALTER TABLE `universityfairs` DISABLE KEYS */;
INSERT INTO `universityfairs` VALUES (1,'İrfan Hakan','hakan.karakoc@ug.bilkent.edu.tr','Ankara','Ankara Fen Lisesi','2025-01-01','08:58','xdxd','rejected'),(2,'Hakanto','i.hakan_karakoc@hotmail.com','Ankara','Prof. Dr. Aziz Sancar Fen Lisesi','2025-01-10','05:00','deneme','accepted'),(3,'İrfan Hakan','hakan.karakoc@ug.bilkent.edu.tr','Ankara','Ankara Fen Lisesi','2025-01-02','08:27','','accepted');
/*!40000 ALTER TABLE `universityfairs` ENABLE KEYS */;
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
INSERT INTO `users` VALUES (1,'guide123','Guide'),(2,'advisor123','Advisor'),(3,'coordinator123','Coordinator'),(4,'director123','Director'),(5,'promo123','Promo_Coordinator');
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

-- Dump completed on 2024-12-22 20:34:47
