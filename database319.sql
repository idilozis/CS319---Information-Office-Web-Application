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
) ENGINE=InnoDB AUTO_INCREMENT=25 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `auth_permission`
--

LOCK TABLES `auth_permission` WRITE;
/*!40000 ALTER TABLE `auth_permission` DISABLE KEYS */;
INSERT INTO `auth_permission` VALUES (1,'Can add log entry',1,'add_logentry'),(2,'Can change log entry',1,'change_logentry'),(3,'Can delete log entry',1,'delete_logentry'),(4,'Can view log entry',1,'view_logentry'),(5,'Can add permission',2,'add_permission'),(6,'Can change permission',2,'change_permission'),(7,'Can delete permission',2,'delete_permission'),(8,'Can view permission',2,'view_permission'),(9,'Can add group',3,'add_group'),(10,'Can change group',3,'change_group'),(11,'Can delete group',3,'delete_group'),(12,'Can view group',3,'view_group'),(13,'Can add content type',4,'add_contenttype'),(14,'Can change content type',4,'change_contenttype'),(15,'Can delete content type',4,'delete_contenttype'),(16,'Can view content type',4,'view_contenttype'),(17,'Can add session',5,'add_session'),(18,'Can change session',5,'change_session'),(19,'Can delete session',5,'delete_session'),(20,'Can view session',5,'view_session'),(21,'Can add user',6,'add_useraccount'),(22,'Can change user',6,'change_useraccount'),(23,'Can delete user',6,'delete_useraccount'),(24,'Can view user',6,'view_useraccount');
/*!40000 ALTER TABLE `auth_permission` ENABLE KEYS */;
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
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `django_content_type`
--

LOCK TABLES `django_content_type` WRITE;
/*!40000 ALTER TABLE `django_content_type` DISABLE KEYS */;
INSERT INTO `django_content_type` VALUES (1,'admin','logentry'),(3,'auth','group'),(2,'auth','permission'),(4,'contenttypes','contenttype'),(6,'cs319projectapp','useraccount'),(5,'sessions','session');
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
) ENGINE=InnoDB AUTO_INCREMENT=21 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `django_migrations`
--

LOCK TABLES `django_migrations` WRITE;
/*!40000 ALTER TABLE `django_migrations` DISABLE KEYS */;
INSERT INTO `django_migrations` VALUES (1,'contenttypes','0001_initial','2024-12-06 18:21:38.237771'),(2,'contenttypes','0002_remove_content_type_name','2024-12-06 18:21:38.311198'),(3,'auth','0001_initial','2024-12-06 18:21:38.587361'),(4,'auth','0002_alter_permission_name_max_length','2024-12-06 18:21:38.662035'),(5,'auth','0003_alter_user_email_max_length','2024-12-06 18:21:38.668558'),(6,'auth','0004_alter_user_username_opts','2024-12-06 18:21:38.677932'),(7,'auth','0005_alter_user_last_login_null','2024-12-06 18:21:38.684093'),(8,'auth','0006_require_contenttypes_0002','2024-12-06 18:21:38.688057'),(9,'auth','0007_alter_validators_add_error_messages','2024-12-06 18:21:38.698387'),(10,'auth','0008_alter_user_username_max_length','2024-12-06 18:21:38.705410'),(11,'auth','0009_alter_user_last_name_max_length','2024-12-06 18:21:38.712658'),(12,'auth','0010_alter_group_name_max_length','2024-12-06 18:21:38.726958'),(13,'auth','0011_update_proxy_permissions','2024-12-06 18:21:38.733656'),(14,'auth','0012_alter_user_first_name_max_length','2024-12-06 18:21:38.739518'),(15,'cs319projectapp','0001_initial','2024-12-06 18:21:39.125110'),(16,'admin','0001_initial','2024-12-06 18:21:39.283158'),(17,'admin','0002_logentry_remove_auto_add','2024-12-06 18:21:39.294663'),(18,'admin','0003_logentry_add_action_flag_choices','2024-12-06 18:21:39.307530'),(19,'sessions','0001_initial','2024-12-06 18:21:39.355770'),(20,'cs319projectapp','0002_alter_useraccount_options_alter_useraccount_managers_and_more','2024-12-15 17:19:09.059273');
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
) ENGINE=InnoDB AUTO_INCREMENT=106 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `highschools`
--

LOCK TABLES `highschools` WRITE;
/*!40000 ALTER TABLE `highschools` DISABLE KEYS */;
INSERT INTO `highschools` VALUES (1,'Ankara Fen Lisesi','ANKARA',99.17),(2,'İzmir Fen Lisesi','İZMİR',98.54),(3,'Atatürk Lisesi','İZMİR',97.4),(4,'Tofaş Fen Lisesi','BURSA',97.27),(5,'Adana Fen Lisesi','ADANA',96.39),(6,'Ankara Pursaklar Fen Lisesi','ANKARA',96.18),(7,'Osman Ulubaş Kayseri Fen Lisesi','KAYSERİ',95.42),(8,'Prof. Dr. Aziz Sancar Fen Lisesi','ANKARA',93.92),(9,'Yusuf Ziya Öner Fen Lisesi','ANTALYA',93.77),(10,'Nilüfer Borsa İstanbul Fen Lisesi','BURSA',93.12),(11,'Eyüp Aygar Fen Lisesi','MERSİN',92.19),(12,'Erbakır Fen Lisesi','DENİZLİ',91.9),(13,'Aydın Fen Lisesi','AYDIN',89.63),(14,'Buca İnci-Özer Tırnaklı Fen Lisesi','İZMİR',89.58),(15,'Meram Fen Lisesi','KONYA',88.49),(16,'Atatürk Anadolu Lisesi','ANKARA',87.79),(17,'Samsun Garip Zeycan Yıldırım Fen Lisesi','SAMSUN',87.67),(18,'Sümer Fen Lisesi','KAYSERİ',86.86),(19,'Kocaeli Fen Lisesi','KOCAELİ',86.73),(20,'Vehbi Dinçerler Fen Lisesi','GAZİANTEP',86.56),(21,'Seyhan Borsa İstanbul Fen Lisesi','ADANA',85.53),(22,'Cumhuriyet Fen Lisesi','ANKARA',85.52),(23,'Eskişehir Fatih Fen Lisesi','ESKİŞEHİR',85.5),(24,'Trabzon Merkez Fen Lisesi','TRABZON',85.43),(25,'Özdemir Bayraktar Havacılık ve Uzay Lisesi','ANKARA',85.32),(26,'Manisa Fen Lisesi','MANİSA',85.09),(27,'Bornova Anadolu Lisesi','İZMİR',84.88),(28,'Bursa Anadolu Lisesi','BURSA',84.86),(29,'Malatya Erman Ilıcak Fen Lisesi','MALATYA',84.47),(30,'Rekabet Kurumu Cumhuriyet Fen Lisesi','DİYARBAKIR',84.46),(31,'Nazilli Fen Lisesi','AYDIN',84.44),(32,'Yahya Akel Fen Lisesi','MERSİN',84.23),(33,'Keçiören Vatansever Aydoğan Fen Lisesi','ANKARA',83.2),(34,'AYDEM Fen Lisesi','DENİZLİ',82.36),(35,'Ahmet Hamdi Gökbayrak Fen Lisesi','BURSA',79.61),(36,'Mahmut Sami Ramazanoğlu Anadolu İmam Hatip Lisesi','KONYA',78.4),(37,'Antalya Anadolu Lisesi','ANTALYA',77.73),(38,'Isparta Süleyman Demirel Fen Lisesi','ISPARTA',77.14),(39,'Ankara Erman Ilıcak Fen Lisesi','ANKARA',74.99),(40,'Ebru Nayim Fen Lisesi','TEKİRDAĞ',74.79),(41,'Aziz Atik Fen Lisesi','SAMSUN',74.75),(42,'Yenimahalle Fen Lisesi','ANKARA',74.53),(43,'TOBB Fen Lisesi','GAZİANTEP',74.34),(44,'Halil Kale Fen Lisesi','MANİSA',73.57),(45,'TOBB Osmaniye Fen Lisesi','OSMANİYE',73.22),(46,'Kaya Karakaya Fen Lisesi','ELAZIĞ',70.21),(47,'Muammer Dereli Fen Lisesi','KOCAELİ',69.31),(48,'Süleyman Demirel Fen Lisesi','AFYONKARAHİSAR',69.11),(49,'Erzurum İbrahim Hakkı Fen Lisesi','ERZURUM',69.02),(50,'İzmir Kız Lisesi','İZMİR',68.25),(51,'Kayseri Fen Lisesi','KAYSERİ',68.19),(52,'Trabzon Yomra Fen Lisesi','TRABZON',67.6),(53,'ASELSAN Mesleki ve Teknik Anadolu Lisesi','ANKARA',67.59),(54,'Adana Anadolu Lisesi','ADANA',67.46),(55,'Karatay Fen Lisesi','KONYA',67.2),(56,'Tokat Milli Piyango İhya Balak Fen Lisesi','TOKAT',66.91),(57,'Borsa İstanbul Fen Lisesi','DİYARBAKIR',66.67),(58,'Prof.Dr.İlhan Kılıçözlü Fen Lisesi','KIRŞEHİR',65.6),(59,'Yücel Boru Fen Lisesi','KOCAELİ',65.19),(60,'Canik Fen Lisesi','SAMSUN',62.77),(61,'Eskişehir Anadolu Lisesi','ESKİŞEHİR',60.22),(62,'Selçuklu Fen Lisesi','KONYA',60.14),(63,'Menteşe TOBB Fen Lisesi','MUĞLA',59.08),(64,'Yaşar Kımıl Fen Lisesi','DENİZLİ',58.93),(65,'Özkent Akbilek Fen Lisesi','ANKARA',56.02),(66,'Kütahya Nafi Güral Fen Lisesi','KÜTAHYA',55.5),(67,'Ahmet Erdem Anadolu Lisesi','BURSA',54.74),(68,'Nuh Mehmet Küçükçalık Anadolu Lisesi','KAYSERİ',54.54),(69,'Kahramanmaraş TOBB Fen Lisesi','KAHRAMANMARAŞ',52.24),(70,'Çanakkale Fen Lisesi','ÇANAKKALE',49.34),(71,'Sivas Fen Lisesi','SİVAS',48.24),(72,'Hüseyin Girenes Fen Lisesi','ANTALYA',43.12),(73,'Sakarya Cevat Ayhan Fen Lisesi','SAKARYA',42.65),(74,'Aksaray Şehit Pilot Hamza Gümüşsoy Fen Lisesi','AKSARAY',41.99),(75,'Sesim Sarpkaya Fen Lisesi','MERSİN',39.01),(76,'Macide-Ramiz Taşkınlar Fen Lisesi','MANİSA',38.88),(77,'Batman Fen Lisesi','BATMAN',37.98),(78,'Adem-Tolunay Anadolu Lisesi','ANTALYA',36.02),(79,'Şehit Turgut Solak Fen Lisesi','BALIKESİR',35.26),(80,'Van Türk Telekom Fen Lisesi','VAN',33.9),(81,'Antalya TOBB Fen Lisesi','ANTALYA',31.76),(82,'Abdulkadir Konukoğlu Fen Lisesi','GAZİANTEP',29.58),(83,'Karşıyaka Cihat Kora Anadolu Lisesi','İZMİR',29.48),(84,'Şehit Özcan Kan Fen Lisesi','KOCAELİ',21.65),(85,'Şanlıurfa Fen Lisesi','ŞANLIURFA',21.39),(86,'Buca Fatma Saygın Anadolu Lisesi','İZMİR',21.24),(87,'Gazi Anadolu Lisesi','ANKARA',19.64),(88,'Ankara Atatürk Lisesi','ANKARA',18.89),(89,'15 Temmuz Şehitleri Fen Lisesi','ÇORUM',17.51),(90,'Kepez Mahmut Celalettin Ökten Anadolu Lisesi','ANTALYA',12.98),(91,'Altıeylül Fen Lisesi','BALIKESİR',11.36),(92,'Şükrü Şankaya Anadolu Lisesi','BURSA',9.76),(93,'Vali Aydın Arslan Fen Lisesi','DİYARBAKIR',7.88),(94,'Ordu Fen Lisesi','ORDU',5.98),(95,'Sami Yangın Anadolu Lisesi','KAYSERİ',3.87),(96,'Meram Anadolu Lisesi','KONYA',3.82),(97,'Çiğli Fen Lisesi','İZMİR',1.18),(98,'Kastamonu Fen Lisesi','KASTAMONU',0.79),(99,'Ortaklar Fen Lisesi','AYDIN',0.58),(100,'ÇEAS Anadolu Lisesi','ADANA',0.43);
/*!40000 ALTER TABLE `highschools` ENABLE KEYS */;
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

-- Dump completed on 2024-12-18 22:32:40
