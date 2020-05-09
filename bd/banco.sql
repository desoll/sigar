DROP DATABASE /*!32312 IF EXISTS*/ banco;
 CREATE DATABASE banco;
 USE banco;
 
 


# Host: localhost  (Version: 5.1.44-community)
# Date: 2012-11-26 17:45:23
# Generator: MySQL-Front 5.3  (Build 1.21)

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE */;
/*!40101 SET SQL_MODE='STRICT_TRANS_TABLES,NO_AUTO_CREATE_USER,NO_ENGINE_SUBSTITUTION' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES */;
/*!40103 SET SQL_NOTES='ON' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS */;
/*!40014 SET FOREIGN_KEY_CHECKS=0 */;

#
# Source for table "danos"
#

DROP TABLE IF EXISTS `danos`;
CREATE TABLE `danos` (
  `codigo_danos` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `tipo_danos` varchar(35) NOT NULL,
  `sofrido_danos` varchar(45) NOT NULL,
  `n_danos` int(10) unsigned NOT NULL,
  PRIMARY KEY (`codigo_danos`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=latin1;

#
# Data for table "danos"
#

INSERT INTO `danos` VALUES (2,'Lezões Corporais','Ferimentos',2),(3,'ligeiros','Aranhões',2),(4,'Materiais','Vidros Partidos',4),(5,'nenhum','nehnum',0);

#
# Source for table "veiculo"
#

DROP TABLE IF EXISTS `veiculo`;
CREATE TABLE `veiculo` (
  `codigo_veiculo` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `tipo_veiculo` varchar(45) NOT NULL,
  `marca_veiculo` varchar(45) NOT NULL,
  `modelo_veiculo` varchar(45) NOT NULL,
  `matricula_veiculo` varchar(45) NOT NULL,
  `cor_veiculo` varchar(45) NOT NULL,
  `codigo_danos` int(10) unsigned NOT NULL,
  PRIMARY KEY (`codigo_veiculo`),
  KEY `danos_veiculo_1` (`codigo_danos`),
  CONSTRAINT `danos_veiculo_1` FOREIGN KEY (`codigo_danos`) REFERENCES `danos` (`codigo_danos`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=latin1;

#
# Data for table "veiculo"
#

INSERT INTO `veiculo` VALUES (1,'Ligeiro','Toyota','Sequoia','LD - 32-35 - LP','Prateado',4),(2,'Nenhum','Nenhum','Nenhum','Nenhum','Nenhum',5);

#
# Source for table "vitima"
#

DROP TABLE IF EXISTS `vitima`;
CREATE TABLE `vitima` (
  `codigo_vitima` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `nome_vitima` varchar(45) NOT NULL,
  `sexo_vitima` varchar(20) NOT NULL,
  `data_nascimento_vitima` varchar(45) DEFAULT NULL,
  `bi_vitima` varchar(45) NOT NULL,
  `bairro_vitima` varchar(45) NOT NULL,
  `rua_vitima` varchar(45) NOT NULL,
  `municipio_vitima` varchar(45) NOT NULL,
  `provincia_vitima` varchar(45) NOT NULL,
  `codigo_danos` int(10) unsigned NOT NULL,
  `codigo_veiculo` int(10) unsigned NOT NULL,
  PRIMARY KEY (`codigo_vitima`),
  KEY `veiculo_vitima_2` (`codigo_veiculo`),
  KEY `danos_vitima_1` (`codigo_danos`),
  CONSTRAINT `danos_vitima_1` FOREIGN KEY (`codigo_danos`) REFERENCES `danos` (`codigo_danos`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `veiculo_vitima_2` FOREIGN KEY (`codigo_veiculo`) REFERENCES `veiculo` (`codigo_veiculo`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=latin1;

#
# Data for table "vitima"
#

INSERT INTO `vitima` VALUES (1,'António Joaquim','Ma','23/09/89','000i86LA098','Sapú','Vala','Viana','Luanda',2,2);

#
# Source for table "registo"
#

DROP TABLE IF EXISTS `registo`;
CREATE TABLE `registo` (
  `codigo_registo` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `causa_registo` varchar(45) NOT NULL,
  `data_registo` varchar(45) DEFAULT NULL,
  `codigo_vitima` int(10) unsigned NOT NULL,
  PRIMARY KEY (`codigo_registo`),
  KEY `vitima_registo_1` (`codigo_vitima`),
  CONSTRAINT `vitima_registo_1` FOREIGN KEY (`codigo_vitima`) REFERENCES `vitima` (`codigo_vitima`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=latin1;

#
# Data for table "registo"
#

INSERT INTO `registo` VALUES (1,'Embreaguês','23/10/12',1);

#
# Source for table "local"
#

DROP TABLE IF EXISTS `local`;
CREATE TABLE `local` (
  `codigo_local` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `bairro_local` varchar(45) NOT NULL,
  `rua_local` varchar(45) NOT NULL,
  `municipio_local` varchar(45) NOT NULL,
  `provincia_local` varchar(45) NOT NULL,
  `codigo_danos` int(10) unsigned NOT NULL,
  `codigo_registo` int(10) unsigned NOT NULL,
  `codigo_vitima` int(10) unsigned NOT NULL,
  PRIMARY KEY (`codigo_local`),
  KEY `vitima_local_3` (`codigo_vitima`),
  KEY `danos_local_1` (`codigo_danos`),
  KEY `registo_local_2` (`codigo_registo`),
  CONSTRAINT `danos_local_1` FOREIGN KEY (`codigo_danos`) REFERENCES `danos` (`codigo_danos`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `registo_local_2` FOREIGN KEY (`codigo_registo`) REFERENCES `registo` (`codigo_registo`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `vitima_local_3` FOREIGN KEY (`codigo_vitima`) REFERENCES `vitima` (`codigo_vitima`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=latin1;

#
# Data for table "local"
#

INSERT INTO `local` VALUES (1,'Estalagem','brasileira','Viana','Luanda',5,1,1);

#
# Source for table "causador"
#

DROP TABLE IF EXISTS `causador`;
CREATE TABLE `causador` (
  `codigo_causador` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `nome_causador` varchar(45) NOT NULL,
  `sexo_causador` varchar(45) NOT NULL,
  `data_nascimento_causador` varchar(45) DEFAULT NULL,
  `bi_causador` varchar(45) NOT NULL,
  `bairro_causador` varchar(45) NOT NULL,
  `rua_causador` varchar(45) NOT NULL,
  `municipio_causador` varchar(45) NOT NULL,
  `provincia_causador` varchar(45) NOT NULL,
  `codigo_danos` int(10) unsigned NOT NULL,
  `codigo_vitima` int(10) unsigned NOT NULL,
  `codigo_local` int(10) unsigned NOT NULL,
  `codigo_registo` int(10) unsigned NOT NULL,
  `codigo_veiculo` int(10) unsigned NOT NULL,
  PRIMARY KEY (`codigo_causador`),
  KEY `veiculo_causador_5` (`codigo_veiculo`),
  KEY `danos_causador_1` (`codigo_danos`),
  KEY `local_causador_3` (`codigo_local`),
  KEY `registo_causador_4` (`codigo_registo`),
  KEY `vitima_causador_2` (`codigo_vitima`),
  CONSTRAINT `danos_causador_1` FOREIGN KEY (`codigo_danos`) REFERENCES `danos` (`codigo_danos`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `local_causador_3` FOREIGN KEY (`codigo_local`) REFERENCES `local` (`codigo_local`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `registo_causador_4` FOREIGN KEY (`codigo_registo`) REFERENCES `registo` (`codigo_registo`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `veiculo_causador_5` FOREIGN KEY (`codigo_veiculo`) REFERENCES `veiculo` (`codigo_veiculo`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `vitima_causador_2` FOREIGN KEY (`codigo_vitima`) REFERENCES `vitima` (`codigo_vitima`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=latin1;

#
# Data for table "causador"
#

INSERT INTO `causador` VALUES (1,'Andrades Pereira','Masculino','23/09/87','09786765LA073','Estalagem','Brasileira','Viana','Luanda',3,1,1,1,1);

#
# Source for table "agente"
#

DROP TABLE IF EXISTS `agente`;
CREATE TABLE `agente` (
  `codigo_agente` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `patente_agente` varchar(45) NOT NULL,
  `nome_agente` varchar(45) NOT NULL,
  `n_agente` int(10) unsigned NOT NULL,
  `sexo_agente` varchar(20) NOT NULL,
  `esquadra_agente` varchar(45) NOT NULL,
  `divisao_agente` varchar(45) NOT NULL,
  `codigo_causador` int(10) unsigned NOT NULL,
  `codigo_vitima` int(10) unsigned NOT NULL,
  `codigo_registo` int(10) unsigned NOT NULL,
  `codigo_local` int(10) unsigned NOT NULL,
  PRIMARY KEY (`codigo_agente`),
  KEY `local_agente_4` (`codigo_local`),
  KEY `causador_agente_1` (`codigo_causador`),
  KEY `registo_agente_3` (`codigo_registo`),
  KEY `vitima_agente_2` (`codigo_vitima`),
  CONSTRAINT `causador_agente_1` FOREIGN KEY (`codigo_causador`) REFERENCES `causador` (`codigo_causador`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `local_agente_4` FOREIGN KEY (`codigo_local`) REFERENCES `local` (`codigo_local`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `registo_agente_3` FOREIGN KEY (`codigo_registo`) REFERENCES `registo` (`codigo_registo`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `vitima_agente_2` FOREIGN KEY (`codigo_vitima`) REFERENCES `vitima` (`codigo_vitima`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=latin1;

#
# Data for table "agente"
#

INSERT INTO `agente` VALUES (1,'Tenente','Diolindo Ferraz',234,'Masculino','2ª','Viana',1,1,1,1);

/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;
/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
