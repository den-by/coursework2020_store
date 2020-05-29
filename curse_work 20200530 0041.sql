--
-- Скрипт сгенерирован Devart dbForge Studio 2019 for MySQL, Версия 8.2.23.0
-- Домашняя страница продукта: http://www.devart.com/ru/dbforge/mysql/studio
-- Дата скрипта: 30.05.2020 0:41:26
-- Версия сервера: 8.0.18
-- Версия клиента: 4.1
--

-- 
-- Отключение внешних ключей
-- 
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;

-- 
-- Установить режим SQL (SQL mode)
-- 
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;

-- 
-- Установка кодировки, с использованием которой клиент будет посылать запросы на сервер
--
SET NAMES 'utf8';

--
-- Удалить функцию `get_timestamp_months_before`
--
DROP FUNCTION IF EXISTS get_timestamp_months_before;

--
-- Удалить таблицу `client_log`
--
DROP TABLE IF EXISTS client_log;

--
-- Удалить процедуру `recolculate_order_total_price`
--
DROP PROCEDURE IF EXISTS recolculate_order_total_price;

--
-- Удалить таблицу `links_orders_products`
--
DROP TABLE IF EXISTS links_orders_products;

--
-- Удалить таблицу `writeoffs`
--
DROP TABLE IF EXISTS writeoffs;

--
-- Удалить таблицу `deliverys`
--
DROP TABLE IF EXISTS deliverys;

--
-- Удалить таблицу `links_products_suppliers`
--
DROP TABLE IF EXISTS links_products_suppliers;

--
-- Удалить таблицу `pre_orders`
--
DROP TABLE IF EXISTS pre_orders;

--
-- Удалить таблицу `products`
--
DROP TABLE IF EXISTS products;

--
-- Удалить таблицу `storage`
--
DROP TABLE IF EXISTS storage;

--
-- Удалить таблицу `orders`
--
DROP TABLE IF EXISTS orders;

--
-- Удалить таблицу `clients`
--
DROP TABLE IF EXISTS clients;

--
-- Удалить таблицу `order_status`
--
DROP TABLE IF EXISTS order_status;

--
-- Удалить процедуру `calculate_supplier_type_count`
--
DROP PROCEDURE IF EXISTS calculate_supplier_type_count;

--
-- Удалить таблицу `suppliers`
--
DROP TABLE IF EXISTS suppliers;

--
-- Удалить таблицу `supplier_types`
--
DROP TABLE IF EXISTS supplier_types;

--
-- Создать таблицу `supplier_types`
--
CREATE TABLE supplier_types (
  id TINYINT(4) UNSIGNED NOT NULL AUTO_INCREMENT,
  name VARCHAR(255) NOT NULL,
  description VARCHAR(255) NOT NULL,
  count INT(11) UNSIGNED DEFAULT NULL,
  PRIMARY KEY (id)
)
ENGINE = INNODB,
AUTO_INCREMENT = 6,
AVG_ROW_LENGTH = 3276,
CHARACTER SET utf8,
COLLATE utf8_general_ci;

--
-- Создать таблицу `suppliers`
--
CREATE TABLE suppliers (
  id INT(11) UNSIGNED NOT NULL AUTO_INCREMENT,
  name VARCHAR(255) NOT NULL COMMENT 'Имя',
  supplier_type_id TINYINT(4) UNSIGNED NOT NULL,
  PRIMARY KEY (id)
)
ENGINE = INNODB,
AUTO_INCREMENT = 6,
AVG_ROW_LENGTH = 4096,
CHARACTER SET utf8,
COLLATE utf8_general_ci,
COMMENT = 'Поставщик';

--
-- Создать внешний ключ
--
ALTER TABLE suppliers 
  ADD CONSTRAINT FK_supplier_supplier_type_supplier_type_id FOREIGN KEY (supplier_type_id)
    REFERENCES supplier_types(id);

DELIMITER $$

--
-- Создать процедуру `calculate_supplier_type_count`
--
CREATE DEFINER = 'root'@'%'
PROCEDURE calculate_supplier_type_count()
BEGIN
 DECLARE p_type INT(11) UNSIGNED;
    DECLARE p_count INT(11) UNSIGNED;
    DECLARE done INT DEFAULT 0;
    DECLARE count_supplier CURSOR FOR
      SELECT
       st.id,COUNT(s.id) count_suppliers
      FROM supplier_types st JOIN suppliers s ON st.id = s.supplier_type_id
      GROUP BY st.id;
    DECLARE CONTINUE HANDLER FOR SQLSTATE '02000' SET done = 1;

    OPEN count_supplier;
    
    REPEAT
      FETCH count_supplier
      INTO p_type, p_count;
      IF NOT done
      THEN
        UPDATE supplier_types st
        SET
          count = p_count
        WHERE id  = p_type;
      END IF;
    UNTIL done
    END REPEAT;
    
    CLOSE count_supplier;
END
$$

DELIMITER ;

--
-- Создать таблицу `order_status`
--
CREATE TABLE order_status (
  id TINYINT(4) UNSIGNED NOT NULL AUTO_INCREMENT,
  name VARCHAR(255) NOT NULL,
  PRIMARY KEY (id)
)
ENGINE = INNODB,
AUTO_INCREMENT = 7,
AVG_ROW_LENGTH = 2730,
CHARACTER SET utf8,
COLLATE utf8_general_ci;

--
-- Создать таблицу `clients`
--
CREATE TABLE clients (
  id INT(11) UNSIGNED NOT NULL AUTO_INCREMENT,
  name VARCHAR(255) NOT NULL,
  discount FLOAT DEFAULT 1,
  PRIMARY KEY (id)
)
ENGINE = INNODB,
AUTO_INCREMENT = 12,
AVG_ROW_LENGTH = 4096,
CHARACTER SET utf8,
COLLATE utf8_general_ci;

--
-- Создать таблицу `orders`
--
CREATE TABLE orders (
  id INT(11) UNSIGNED NOT NULL AUTO_INCREMENT,
  date_add TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  client_id INT(11) UNSIGNED NOT NULL,
  date_upd TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  order_status_id TINYINT(4) UNSIGNED NOT NULL DEFAULT 1,
  total_price DECIMAL(10, 2) NOT NULL DEFAULT 0.00,
  PRIMARY KEY (id)
)
ENGINE = INNODB,
AUTO_INCREMENT = 11,
AVG_ROW_LENGTH = 2730,
CHARACTER SET utf8,
COLLATE utf8_general_ci;

--
-- Создать внешний ключ
--
ALTER TABLE orders 
  ADD CONSTRAINT FK_order_client_client_id FOREIGN KEY (client_id)
    REFERENCES clients(id) ON UPDATE CASCADE;

--
-- Создать внешний ключ
--
ALTER TABLE orders 
  ADD CONSTRAINT FK_orders_order_status_id FOREIGN KEY (order_status_id)
    REFERENCES order_status(id);

--
-- Создать таблицу `storage`
--
CREATE TABLE storage (
  id INT(11) UNSIGNED NOT NULL,
  name VARCHAR(50) NOT NULL,
  capacity INT(11) NOT NULL DEFAULT 10,
  PRIMARY KEY (id)
)
ENGINE = INNODB,
AVG_ROW_LENGTH = 4096,
CHARACTER SET utf8,
COLLATE utf8_general_ci;

--
-- Создать таблицу `products`
--
CREATE TABLE products (
  id INT(11) UNSIGNED NOT NULL AUTO_INCREMENT,
  name VARCHAR(255) NOT NULL,
  price DECIMAL(10, 2) UNSIGNED NOT NULL,
  add_date TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (id)
)
ENGINE = INNODB,
AUTO_INCREMENT = 13,
AVG_ROW_LENGTH = 1365,
CHARACTER SET utf8,
COLLATE utf8_general_ci;

--
-- Создать таблицу `pre_orders`
--
CREATE TABLE pre_orders (
  id INT(11) UNSIGNED NOT NULL AUTO_INCREMENT,
  count INT(11) NOT NULL,
  product_id INT(11) UNSIGNED NOT NULL,
  price DECIMAL(19, 2) NOT NULL,
  product_name VARCHAR(255) NOT NULL,
  total_price DECIMAL(19, 2) GENERATED ALWAYS AS (`count` * `price`) STORED NOT NULL,
  client_id INT(11) UNSIGNED NOT NULL,
  date_add TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (id)
)
ENGINE = INNODB,
AUTO_INCREMENT = 4,
AVG_ROW_LENGTH = 5461,
CHARACTER SET utf8,
COLLATE utf8_general_ci;

--
-- Создать внешний ключ
--
ALTER TABLE pre_orders 
  ADD CONSTRAINT FK_pre_order_products_id FOREIGN KEY (product_id)
    REFERENCES products(id);

--
-- Создать внешний ключ
--
ALTER TABLE pre_orders 
  ADD CONSTRAINT FK_pre_orders_clients_id FOREIGN KEY (client_id)
    REFERENCES clients(id);

--
-- Создать таблицу `links_products_suppliers`
--
CREATE TABLE links_products_suppliers (
  id INT(11) UNSIGNED NOT NULL AUTO_INCREMENT,
  product_id INT(11) UNSIGNED NOT NULL,
  supplier_id INT(11) UNSIGNED NOT NULL,
  price DECIMAL(10, 2) UNSIGNED NOT NULL,
  delivery_hour INT(11) NOT NULL DEFAULT 24,
  PRIMARY KEY (id)
)
ENGINE = INNODB,
AUTO_INCREMENT = 5,
AVG_ROW_LENGTH = 8192,
CHARACTER SET utf8,
COLLATE utf8_general_ci,
COMMENT = 'сопоставление товаров и поставщиков';

--
-- Создать внешний ключ
--
ALTER TABLE links_products_suppliers 
  ADD CONSTRAINT FK_links_products_suppliers_products_id FOREIGN KEY (product_id)
    REFERENCES products(id);

--
-- Создать внешний ключ
--
ALTER TABLE links_products_suppliers 
  ADD CONSTRAINT FK_links_products_suppliers_suppliers_id FOREIGN KEY (supplier_id)
    REFERENCES suppliers(id);

--
-- Создать таблицу `deliverys`
--
CREATE TABLE deliverys (
  id INT(11) UNSIGNED NOT NULL AUTO_INCREMENT,
  date_add TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  product_id INT(11) UNSIGNED NOT NULL,
  price DECIMAL(19, 2) NOT NULL DEFAULT 0.00,
  supplier_id INT(11) UNSIGNED NOT NULL,
  total_price DECIMAL(19, 2) GENERATED ALWAYS AS (`count` * `price`) STORED NOT NULL,
  count INT(11) NOT NULL DEFAULT 0,
  storage_id INT(11) UNSIGNED DEFAULT NULL,
  PRIMARY KEY (id)
)
ENGINE = INNODB,
AUTO_INCREMENT = 6,
AVG_ROW_LENGTH = 3276,
CHARACTER SET utf8,
COLLATE utf8_general_ci;

--
-- Создать внешний ключ
--
ALTER TABLE deliverys 
  ADD CONSTRAINT FK_deliverys_storage_id FOREIGN KEY (storage_id)
    REFERENCES storage(id);

--
-- Создать внешний ключ
--
ALTER TABLE deliverys 
  ADD CONSTRAINT FK_product_delivery_products_id FOREIGN KEY (product_id)
    REFERENCES products(id);

--
-- Создать внешний ключ
--
ALTER TABLE deliverys 
  ADD CONSTRAINT FK_product_delivery_supplier_supplier_id FOREIGN KEY (supplier_id)
    REFERENCES suppliers(id) ON UPDATE CASCADE;

--
-- Создать таблицу `writeoffs`
--
CREATE TABLE writeoffs (
  id INT(11) UNSIGNED NOT NULL AUTO_INCREMENT,
  description VARCHAR(255) NOT NULL,
  delivery_id INT(11) UNSIGNED NOT NULL,
  count INT(11) NOT NULL DEFAULT 0,
  PRIMARY KEY (id)
)
ENGINE = INNODB,
AUTO_INCREMENT = 5,
AVG_ROW_LENGTH = 4096,
CHARACTER SET utf8,
COLLATE utf8_general_ci;

--
-- Создать внешний ключ
--
ALTER TABLE writeoffs 
  ADD CONSTRAINT FK_writeoff_product_delivery_product_delivery_id FOREIGN KEY (delivery_id)
    REFERENCES deliverys(id);

--
-- Создать таблицу `links_orders_products`
--
CREATE TABLE links_orders_products (
  id INT(11) UNSIGNED NOT NULL AUTO_INCREMENT,
  order_id INT(11) UNSIGNED NOT NULL,
  count INT(11) UNSIGNED NOT NULL DEFAULT 1,
  name VARCHAR(255) NOT NULL,
  date_add TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  date_upd TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  price DECIMAL(10, 2) NOT NULL DEFAULT 0.00,
  delivery_id INT(11) UNSIGNED NOT NULL,
  total_price DECIMAL(10, 2) GENERATED ALWAYS AS (`price` * `count`) STORED NOT NULL,
  PRIMARY KEY (id)
)
ENGINE = INNODB,
AUTO_INCREMENT = 20,
AVG_ROW_LENGTH = 1365,
CHARACTER SET utf8,
COLLATE utf8_general_ci;

--
-- Создать внешний ключ
--
ALTER TABLE links_orders_products 
  ADD CONSTRAINT FK_order_product_order_order_id FOREIGN KEY (order_id)
    REFERENCES orders(id) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Создать внешний ключ
--
ALTER TABLE links_orders_products 
  ADD CONSTRAINT FK_order_product_product_delivery_product_delivery_id FOREIGN KEY (delivery_id)
    REFERENCES deliverys(id) ON UPDATE CASCADE;

DELIMITER $$

--
-- Создать процедуру `recolculate_order_total_price`
--
CREATE PROCEDURE recolculate_order_total_price(IN order_id INT)
  SQL SECURITY INVOKER
  MODIFIES SQL DATA
BEGIN
#SELECT lop.total_price FROM links_orders_products lop WHERE lop.order_id = order_id GROUP BY order_id;
  UPDATE orders o SET o.total_price=(SELECT SUM(lop.total_price) FROM links_orders_products lop WHERE lop.order_id = order_id GROUP BY lop.order_id) WHERE order_id = o.id;

END
$$

DELIMITER ;

--
-- Создать таблицу `client_log`
--
CREATE TABLE client_log (
  id INT(11) UNSIGNED NOT NULL AUTO_INCREMENT,
  links_products_orders_id INT(11) UNSIGNED DEFAULT NULL,
  order_id INT(11) UNSIGNED DEFAULT NULL,
  event VARCHAR(255) NOT NULL DEFAULT '',
  date_add TIMESTAMP NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (id)
)
ENGINE = INNODB,
AUTO_INCREMENT = 101,
AVG_ROW_LENGTH = 528,
CHARACTER SET utf8mb4,
COLLATE utf8mb4_0900_ai_ci;

--
-- Создать внешний ключ
--
ALTER TABLE client_log 
  ADD CONSTRAINT FK_client_log_links_orders_products_id FOREIGN KEY (links_products_orders_id)
    REFERENCES links_orders_products(id) ON DELETE SET NULL ON UPDATE CASCADE;

--
-- Создать внешний ключ
--
ALTER TABLE client_log 
  ADD CONSTRAINT FK_client_log_orders_id FOREIGN KEY (order_id)
    REFERENCES orders(id) ON DELETE SET NULL ON UPDATE CASCADE;

DELIMITER $$

--
-- Создать функцию `get_timestamp_months_before`
--
CREATE DEFINER = 'root'@'%'
FUNCTION get_timestamp_months_before(timestamp timestamp, number_of_months_passed INT)
  RETURNS timestamp
  DETERMINISTIC
BEGIN
RETURN (timestamp - INTERVAL number_of_months_passed MONTH);
END
$$

DELIMITER ;

-- 
-- Вывод данных для таблицы supplier_types
--
/*!40000 ALTER TABLE supplier_types DISABLE KEYS */;
INSERT INTO supplier_types VALUES
(1, 'Завод', 'Прямые поставки с завода', 1),
(2, 'Дилер', 'Официальный диллер', 2),
(3, 'Небольшие производства', 'Небольшое производство', 1),
(4, 'Мелкие поставщик ', 'Работает под заказ', 1),
(5, 'Магазин', 'Имеет свой склад', 5);
/*!40000 ALTER TABLE supplier_types ENABLE KEYS */;

-- 
-- Вывод данных для таблицы suppliers
--
/*!40000 ALTER TABLE suppliers DISABLE KEYS */;
INSERT INTO suppliers VALUES
(1, 'ООО Запчасть сервис', 2),
(2, 'Измеритель', 1),
(3, 'ЧУП АвтоЗапчасть', 3),
(4, 'ИП Баранов А.В.', 4),
(5, 'ООО БелЗапчасть', 2);
/*!40000 ALTER TABLE suppliers ENABLE KEYS */;

-- 
-- Вывод данных для таблицы storage
--
/*!40000 ALTER TABLE storage DISABLE KEYS */;
INSERT INTO storage VALUES
(1, 'Склад основной', 100),
(2, 'Склад Для крупногобартиных', 100),
(3, 'Склад при магазине1', 100),
(4, 'Склад при магазине 2', 100);
/*!40000 ALTER TABLE storage ENABLE KEYS */;

-- 
-- Вывод данных для таблицы products
--
/*!40000 ALTER TABLE products DISABLE KEYS */;
INSERT INTO products VALUES
(1, 'Втулка а3 2001', 10.11, '2020-03-22 09:14:05'),
(2, 'Шаравая а3 2003', 11.32, '2020-03-22 00:00:00'),
(3, 'Руль от ауди', 12.31, '2020-04-05 18:04:05'),
(4, 'Колесо', 14.00, '2020-05-02 17:43:25'),
(5, 'Мотор', 16.00, '2020-05-02 17:43:38'),
(6, 'Зеркало боковое девое', 24.00, '2020-05-02 17:43:58'),
(7, 'Стекло лобовое', 12.00, '2020-05-02 17:44:18'),
(8, 'Ручка от двери', 23.00, '2020-05-02 17:44:41'),
(9, 'Рычаг переключения передач', 22.00, '2020-05-02 17:44:56'),
(10, 'Педаль тормоза', 11.00, '2020-05-02 17:45:19'),
(11, 'Педаль газа', 112.00, '2020-05-02 17:45:30'),
(12, 'Крышка багажника', 2234.00, '2020-05-02 17:45:56');
/*!40000 ALTER TABLE products ENABLE KEYS */;

-- 
-- Вывод данных для таблицы order_status
--
/*!40000 ALTER TABLE order_status DISABLE KEYS */;
INSERT INTO order_status VALUES
(1, ''),
(2, ''),
(3, ''),
(4, ''),
(5, ''),
(6, '');
/*!40000 ALTER TABLE order_status ENABLE KEYS */;

-- 
-- Вывод данных для таблицы deliverys
--
/*!40000 ALTER TABLE deliverys DISABLE KEYS */;
INSERT INTO deliverys(id, date_add, product_id, price, supplier_id, count, storage_id) VALUES
(1, '2020-03-22 14:22:10', 1, 12.00, 3, 123, 1),
(2, '2020-03-22 14:23:18', 2, 31.00, 2, 123, 2),
(3, '2020-04-05 17:23:22', 3, 213.00, 1, 123, 3),
(4, '2020-04-05 17:24:17', 2, 23.00, 4, 1111, 4),
(5, '2020-04-05 17:25:20', 2, 23.00, 3, 112, 4);
/*!40000 ALTER TABLE deliverys ENABLE KEYS */;

-- 
-- Вывод данных для таблицы clients
--
/*!40000 ALTER TABLE clients DISABLE KEYS */;
INSERT INTO clients(id, name, discount) VALUES
(1, 'Denis', 10),
(2, 'Dima', 20),
(3, 'Irina', 10),
(4, 'Vasilina', 0),
(5, 'Sergei', 1),
(6, 'Vlad', 1),
(7, 'Viktor', 1),
(8, 'Andrey', 1),
(9, 'Maksim', 1),
(10, 'Devid', 1),
(11, 'Oleg', 1);
/*!40000 ALTER TABLE clients ENABLE KEYS */;

-- 
-- Вывод данных для таблицы orders
--
/*!40000 ALTER TABLE orders DISABLE KEYS */;
INSERT INTO orders(id, date_add, client_id, date_upd, order_status_id, total_price) VALUES
(1, '2020-04-20 00:00:00', 2, '2020-05-27 11:48:54', 1, 511.20),
(3, '2020-05-20 17:55:06', 7, '2020-05-27 11:47:15', 2, 499.95),
(4, '2020-01-07 20:19:30', 4, '2020-05-27 11:47:31', 2, 189.90),
(5, '2020-05-20 17:54:14', 4, '2020-05-27 11:47:11', 3, 43.20),
(6, '2020-05-13 19:18:31', 1, '2020-05-27 11:47:42', 1, 10.80),
(8, '2020-05-05 19:24:59', 1, '2020-05-27 11:47:02', 1, 118.80),
(9, '2020-05-03 19:25:01', 5, '2020-05-03 19:25:01', 1, 0.00),
(10, '2020-05-26 09:32:49', 4, '2020-05-27 12:32:56', 1, 2130.00);
/*!40000 ALTER TABLE orders ENABLE KEYS */;

-- 
-- Вывод данных для таблицы links_orders_products
--
/*!40000 ALTER TABLE links_orders_products DISABLE KEYS */;
INSERT INTO links_orders_products(id, order_id, count, name, date_add, date_upd, price, delivery_id) VALUES
(1, 4, 1, 'Шаравая а3 2003', '2011-04-12 20:20:15', '2020-05-03 12:51:15', 11.32, 2),
(2, 1, 3, 'Руль от ауди', '2020-01-09 00:00:00', '2020-05-27 11:48:44', 12.31, 3),
(3, 4, 2, 'Втулка а3 2001', '2020-05-02 17:26:37', '2020-05-03 12:51:12', 10.11, 1),
(4, 3, 2, 'Руль от ауди', '2020-05-02 17:57:29', '2020-05-03 13:01:03', 12.31, 3),
(5, 5, 4, 'Втулка а3 2001', '2020-05-02 17:58:43', '2020-05-03 15:59:22', 10.11, 1),
(6, 3, 1, 'Шаравая а3 2003', '2020-05-02 18:12:37', '2020-05-03 13:00:59', 11.32, 2),
(11, 4, 1, 'Втулка а3 2001', '2020-05-03 15:32:20', '2020-05-03 15:32:20', 10.11, 1),
(12, 4, 12, 'Втулка а3 2001', '2020-05-03 15:32:23', '2020-05-03 15:32:23', 10.11, 1),
(13, 3, 2, 'Втулка а3 2001', '2020-05-03 15:58:33', '2020-05-03 15:58:33', 10.11, 1),
(15, 3, 1, 'Втулка а3 2001', '2020-05-03 18:47:05', '2020-05-03 18:47:05', 10.11, 1),
(16, 3, 1, 'Втулка а3 2001', '2020-05-03 18:47:07', '2020-05-03 18:47:10', 10.11, 1),
(17, 6, 1, 'Втулка а3 2001', '2020-05-03 19:18:37', '2020-05-03 19:19:10', 10.11, 1),
(18, 8, 11, 'Втулка а3 2001', '2020-05-03 19:25:06', '2020-05-03 19:25:06', 10.11, 1),
(19, 10, 10, 'Руль от ауди', '2020-05-26 09:33:03', '2020-05-26 09:33:23', 12.31, 3);
/*!40000 ALTER TABLE links_orders_products ENABLE KEYS */;

-- 
-- Вывод данных для таблицы writeoffs
--
/*!40000 ALTER TABLE writeoffs DISABLE KEYS */;
INSERT INTO writeoffs(id, description, delivery_id, count) VALUES
(1, ' ', 1, 1),
(2, ' ', 5, 2),
(3, ' ', 4, 4),
(4, ' ', 4, 1);
/*!40000 ALTER TABLE writeoffs ENABLE KEYS */;

-- 
-- Вывод данных для таблицы pre_orders
--
/*!40000 ALTER TABLE pre_orders DISABLE KEYS */;
INSERT INTO pre_orders(id, count, product_id, price, product_name, client_id, date_add) VALUES
(1, 112, 1, 123.00, 'dsdf', 2, '2020-04-28 15:13:48'),
(2, 1, 2, 234.00, '324234', 4, '2020-04-28 15:13:48'),
(3, 234, 3, 23.00, '234', 6, '2020-04-28 15:13:48');
/*!40000 ALTER TABLE pre_orders ENABLE KEYS */;

-- 
-- Вывод данных для таблицы links_products_suppliers
--
/*!40000 ALTER TABLE links_products_suppliers DISABLE KEYS */;
INSERT INTO links_products_suppliers(id, product_id, supplier_id, price, delivery_hour) VALUES
(1, 1, 1, 10.11, 11),
(2, 2, 2, 13.21, 13),
(4, 1, 3, 10.14, 31);
/*!40000 ALTER TABLE links_products_suppliers ENABLE KEYS */;

-- 
-- Вывод данных для таблицы client_log
--
/*!40000 ALTER TABLE client_log DISABLE KEYS */;
INSERT INTO client_log(id, links_products_orders_id, order_id, event, date_add) VALUES
(1, NULL, 1, '', '2020-05-03 19:56:11'),
(2, 3, 4, 'Добавлен новый товар item3 в заказ, цена и количетво 123.00, 1', '2020-05-03 19:56:11'),
(3, 4, 3, 'Добавлен новый товар 123 в заказ. Цена : 11.00 Количетво: 1', '2020-05-03 19:56:11'),
(4, 5, 5, 'Добавлен новый товар 123 в заказ. Цена : 111.00 Количетво: 3', '2020-05-03 19:56:11'),
(5, 4, 3, 'Заказ товара 123 обновлен, старвая цена и количетво 11.00, 1, новая цена и количество11.00, 1', '2020-05-03 19:56:11'),
(6, 5, 5, 'Заказ товара 123 обновлен, старвая цена и количетво 111.00, 3, новая цена и количество111.00, 3', '2020-05-03 19:56:11'),
(7, 5, 5, 'Заказ товара itm5 обновлен, старвая цена и количетво 111.00, 3, новая цена и количество111.00, 3', '2020-05-03 19:56:11'),
(8, 2, 1, 'Заказ товара item21 обновлен, старвая цена и количетво 241.00, 2, новая цена и количество241.00, 2', '2020-05-03 19:56:11'),
(9, 6, 3, 'Добавлен новый товар item7 в заказ. Цена : 11.00 Количетво: 1', '2020-05-03 19:56:11'),
(10, 4, 3, 'Заказ товара item4 обновлен, старвая цена и количетво 11.00, 1, новая цена и количество11.00, 1', '2020-05-03 19:56:11'),
(12, 4, 3, 'Заказ товара item4 обновлен, старвая цена и количетво 11.00, 1, новая цена и количество11.00, 2', '2020-05-03 19:56:11'),
(13, 3, 4, 'Заказ товара item3 обновлен, старвая цена и количетво 123.00, 1, новая цена и количество123.00, 2', '2020-05-03 19:56:11'),
(14, 1, 4, 'Заказ товара item1 обновлен, старвая цена и количетво 31.00, 1, новая цена и количество31.00, 1', '2020-05-03 19:56:11'),
(15, 2, 1, 'Заказ товара item2 обновлен, старвая цена и количетво 241.00, 2, новая цена и количество10.11, 2', '2020-05-03 19:56:11'),
(16, 2, 1, 'Заказ товара 10.11 обновлен, старвая цена и количетво 10.11, 2, новая цена и количество10.11, 1', '2020-05-03 19:56:11'),
(17, 2, 1, 'Заказ товара 10.11 обновлен, старвая цена и количетво 10.11, 1, новая цена и количество10.11, 123', '2020-05-03 19:56:11'),
(18, 2, 1, 'Заказ товара 10.11 обновлен, старвая цена и количетво 10.11, 123, новая цена и количество10.11, 123', '2020-05-03 19:56:11'),
(19, 2, 1, 'Заказ товара 10.11 обновлен, старвая цена и количетво 10.11, 123, новая цена и количество10.11, 11', '2020-05-03 19:56:11'),
(20, 2, 1, 'Заказ товара 10.11 обновлен, старвая цена и количетво 10.11, 11, новая цена и количество10.11, 11', '2020-05-03 19:56:11'),
(21, 2, 1, 'Заказ товара 10.11 обновлен, старвая цена и количетво 10.11, 11, новая цена и количество10.11, 11', '2020-05-03 19:56:11'),
(22, 2, 1, 'Заказ товара 10.11 обновлен, старвая цена и количетво 10.11, 11, новая цена и количество10.11, 11', '2020-05-03 19:56:11'),
(23, 2, 1, 'Заказ товара 10.11 обновлен, старвая цена и количетво 10.11, 11, новая цена и количество10.11, 11', '2020-05-03 19:56:11'),
(24, 2, 1, 'Заказ товара Втулка а3 2001 обновлен, старвая цена и количетво 10.11, 11, новая цена и количество10.11, 11', '2020-05-03 19:56:11'),
(25, 2, 1, 'Заказ товара Втулка а3 2001 обновлен, старвая цена и количетво 10.11, 11, новая цена и количество10.11, 11', '2020-05-03 19:56:11'),
(26, 2, 1, 'Заказ товара Втулка а3 2001 обновлен, старвая цена и количетво 10.11, 11, новая цена и количество10.11, 11', '2020-05-03 19:56:11'),
(27, 2, 1, 'Заказ товара Втулка а3 2001 обновлен, старвая цена и количетво 10.11, 11, новая цена и количество10.11, 111', '2020-05-03 19:56:11'),
(28, 2, 1, 'Заказ товара Втулка а3 2001 обновлен, старвая цена и количетво 10.11, 111, новая цена и количество10.11, 1', '2020-05-03 19:56:11'),
(29, 2, 1, 'Заказ товара Втулка а3 2001 обновлен, старвая цена и количетво 10.11, 1, новая цена и количество10.11, 1', '2020-05-03 19:56:11'),
(30, 2, 1, 'Заказ товара Втулка а3 2001 обновлен, старвая цена и количетво 10.11, 1, новая цена и количество10.11, 1', '2020-05-03 19:56:11'),
(31, 2, 1, 'Заказ товара Втулка а3 2001 обновлен, старвая цена и количетво 10.11, 1, новая цена и количество10.11, 1', '2020-05-03 19:56:11'),
(32, 2, 1, 'Заказ товара Втулка а3 2001 обновлен, старвая цена и количетво 10.11, 1, новая цена и количество10.11, 1', '2020-05-03 19:56:11'),
(33, 2, 1, 'Заказ товара Втулка а3 2001 обновлен, старвая цена и количетво 10.11, 1, новая цена и количество10.11, 1', '2020-05-03 19:56:11'),
(34, 2, 1, 'Заказ товара Втулка а3 2001 обновлен, старвая цена и количетво 10.11, 1, новая цена и количество10.11, 1', '2020-05-03 19:56:11'),
(35, 2, 1, 'Заказ товара Втулка а3 2001 обновлен, старвая цена и количетво 10.11, 1, новая цена и количество10.11, 1', '2020-05-03 19:56:11'),
(36, 2, 1, 'Заказ товара Втулка а3 2001 обновлен, старвая цена и количетво 10.11, 1, новая цена и количество10.11, 1', '2020-05-03 19:56:11'),
(37, 2, 1, 'Заказ товара Втулка а3 2001 обновлен, старвая цена и количетво 10.11, 1, новая цена и количество10.11, 1', '2020-05-03 19:56:11'),
(38, 2, 1, 'Заказ товара Втулка а3 2001 обновлен, старвая цена и количетво 10.11, 1, новая цена и количество10.11, 1', '2020-05-03 19:56:11'),
(39, 2, 1, 'Заказ товара Втулка а3 2001 обновлен, старвая цена и количетво 10.11, 1, новая цена и количество10.11, 1', '2020-05-03 19:56:11'),
(40, 2, 1, 'Заказ товара Втулка а3 2001 обновлен, старвая цена и количетво 10.11, 1, новая цена и количество10.11, 1', '2020-05-03 19:56:11'),
(41, 2, 1, 'Заказ товара Втулка а3 2001 обновлен, старвая цена и количетво 10.11, 1, новая цена и количество10.11, 1', '2020-05-03 19:56:11'),
(42, 2, 1, 'Заказ товара Втулка а3 2001 обновлен, старвая цена и количетво 10.11, 1, новая цена и количество10.11, 1', '2020-05-03 19:56:11'),
(43, 2, 1, 'Заказ товара Втулка а3 2001 обновлен, старвая цена и количетво 10.11, 1, новая цена и количество10.11, 1', '2020-05-03 19:56:11'),
(44, 2, 1, 'Заказ товара Втулка а3 2001 обновлен, старвая цена и количетво 10.11, 1, новая цена и количество10.11, 1', '2020-05-03 19:56:11'),
(45, 1, 4, 'Заказ товара item1 обновлен, старвая цена и количетво 31.00, 1, новая цена и количество31.00, 1', '2020-05-03 19:56:11'),
(46, 2, 1, 'Заказ товара Втулка а3 2001 обновлен, старвая цена и количетво 10.11, 1, новая цена и количество10.11, 1', '2020-05-03 19:56:11'),
(47, 2, 1, 'Заказ товара 123 обновлен, старвая цена и количетво 10.11, 1, новая цена и количество10.11, 1', '2020-05-03 19:56:11'),
(48, 2, 1, 'Заказ товара Втулка а3 2001 обновлен, старвая цена и количетво 10.11, 1, новая цена и количество10.11, 1', '2020-05-03 19:56:11'),
(49, 2, 1, 'Заказ товара 213 обновлен, старвая цена и количетво 10.11, 1, новая цена и количество10.11, 1', '2020-05-03 19:56:11'),
(50, 2, 1, 'Заказ товара Втулка а3 2001 обновлен, старвая цена и количетво 10.11, 1, новая цена и количество11.32, 1', '2020-05-03 19:56:11'),
(51, 2, 1, 'Заказ товара Шаравая а3 2003 обновлен, старвая цена и количетво 11.32, 1, новая цена и количество11.32, 1', '2020-05-03 19:56:11'),
(52, 2, 1, 'Заказ товара Шаравая а3 2003 обновлен, старвая цена и количетво 11.32, 1, новая цена и количество11.32, 2', '2020-05-03 19:56:11'),
(53, 2, 1, 'Заказ товара Шаравая а3 2003 обновлен, старвая цена и количетво 11.32, 2, новая цена и количество11.32, 2', '2020-05-03 19:56:11'),
(54, 2, 1, 'Заказ товара Шаравая а3 2003 обновлен, старвая цена и количетво 11.32, 2, новая цена и количество10.11, 2', '2020-05-03 19:56:11'),
(55, 2, 1, 'Заказ товара Втулка а3 2001 обновлен, старвая цена и количетво 10.11, 2, новая цена и количество12.31, 2', '2020-05-03 19:56:11'),
(56, 3, 4, 'Заказ товара item3 обновлен, старвая цена и количетво 123.00, 2, новая цена и количество11.32, 2', '2020-05-03 19:56:11'),
(57, 3, 4, 'Заказ товара Шаравая а3 2003 обновлен, старвая цена и количетво 11.32, 2, новая цена и количество11.32, 2', '2020-05-03 19:56:11'),
(58, 3, 4, 'Заказ товара Шаравая а3 2003 обновлен, старвая цена и количетво 11.32, 2, новая цена и количество11.32, 2', '2020-05-03 19:56:11'),
(59, 3, 4, 'Заказ товара Шаравая а3 2003 обновлен, старвая цена и количетво 11.32, 2, новая цена и количество11.32, 2', '2020-05-03 19:56:11'),
(60, 3, 4, 'Заказ товара Шаравая а3 2003 обновлен, старвая цена и количетво 11.32, 2, новая цена и количество10.11, 2', '2020-05-03 19:56:11'),
(61, 1, 4, 'Заказ товара asd обновлен, старвая цена и количетво 31.00, 1, новая цена и количество11.32, 1', '2020-05-03 19:56:11'),
(62, 6, 3, 'Заказ товара item7 обновлен, старвая цена и количетво 11.00, 1, новая цена и количество11.32, 1', '2020-05-03 19:56:11'),
(63, 4, 3, 'Заказ товара item4 обновлен, старвая цена и количетво 11.00, 2, новая цена и количество12.31, 2', '2020-05-03 19:56:11'),
(64, NULL, 3, 'Добавлен новый товар Втулка а3 2001 в заказ. Цена : 10.11 Количетво: 11', '2020-05-03 19:56:11'),
(65, NULL, 3, 'Добавлен новый товар Руль от ауди в заказ. Цена : 12.31 Количетво: 11', '2020-05-03 19:56:11'),
(66, NULL, 3, 'Заказ товара Руль от ауди обновлен, старвая цена и количетво 12.31, 11, новая цена и количество12.31, 11', '2020-05-03 19:56:11'),
(67, NULL, 3, 'Заказ товара Руль от ауди обновлен, старвая цена и количетво 12.31, 11, новая цена и количество10.11, 11', '2020-05-03 19:56:11'),
(68, NULL, 3, 'Заказ товара Втулка а3 2001 обновлен, старвая цена и количетво 10.11, 11, новая цена и количество10.11, 1', '2020-05-03 19:56:11'),
(75, NULL, 3, 'С заказа удален товар Втулка а3 2001', '2020-05-03 19:56:11'),
(76, NULL, 3, 'С заказа удален товар Втулка а3 2001', '2020-05-03 19:56:11'),
(77, NULL, 4, 'Добавлен новый товар Шаравая а3 2003 в заказ. Цена : 11.32 Количетво: 2', '2020-05-03 19:56:11'),
(78, NULL, 4, 'С заказа удален товар Шаравая а3 2003', '2020-05-03 19:56:11'),
(79, NULL, 3, 'Добавлен новый товар Шаравая а3 2003 в заказ. Цена : 11.32 Количетво: 1', '2020-05-03 19:56:11'),
(80, NULL, 3, 'Заказ товара Шаравая а3 2003 обновлен, старвая цена и количетво 11.32, 1, новая цена и количество11.32, 1111', '2020-05-03 19:56:11'),
(81, 11, 4, 'Добавлен новый товар Втулка а3 2001 в заказ. Цена : 10.11 Количетво: 1', '2020-05-03 19:56:11'),
(82, 12, 4, 'Добавлен новый товар Втулка а3 2001 в заказ. Цена : 10.11 Количетво: 12', '2020-05-03 19:56:11'),
(83, 2, 1, 'Заказ товара Руль от ауди обновлен, старвая цена и количетво 12.31, 2, новая цена и количество12.31, 3', '2020-05-03 19:56:11'),
(84, 2, 1, 'Заказ товара Руль от ауди обновлен, старвая цена и количетво 12.31, 3, новая цена и количество12.31, 1', '2020-05-03 19:56:11'),
(85, NULL, 3, 'С заказа удален товар Шаравая а3 2003', '2020-05-03 19:56:11'),
(86, 13, 3, 'Добавлен новый товар Втулка а3 2001 в заказ. Цена : 10.11 Количетво: 2', '2020-05-03 19:56:11'),
(87, NULL, 3, 'Добавлен новый товар Шаравая а3 2003 в заказ. Цена : 11.32 Количетво: 123', '2020-05-03 19:56:11'),
(88, NULL, 3, 'Заказ товара Шаравая а3 2003 обновлен, старвая цена и количетво 11.32, 123, новая цена и количество11.32, 1', '2020-05-03 19:56:11'),
(89, 2, 1, 'Заказ товара Руль от ауди обновлен, старвая цена и количетво 12.31, 1, новая цена и количество12.31, 2', '2020-05-03 19:56:11'),
(90, 5, 5, 'Заказ товара item6 обновлен, старвая цена и количетво 111.00, 3, новая цена и количество10.11, 4', '2020-05-03 19:56:11'),
(91, NULL, 3, 'С заказа удален товар Шаравая а3 2003', '2020-05-03 19:56:11'),
(92, 15, 3, 'Добавлен новый товар Втулка а3 2001 в заказ. Цена : 10.11 Количетво: 1', '2020-05-03 19:56:11'),
(93, 16, 3, 'Добавлен новый товар Втулка а3 2001 в заказ. Цена : 10.11 Количетво: 3', '2020-05-03 19:56:11'),
(94, 16, 3, 'Заказ товара Втулка а3 2001 обновлен, старвая цена и количетво 10.11, 3, новая цена и количество10.11, 1', '2020-05-03 19:56:11'),
(95, 17, 6, 'Добавлен новый товар Втулка а3 2001 в заказ. Цена : 10.11 Количетво: 123', '2020-05-03 19:56:11'),
(96, 17, 6, 'Заказ товара Втулка а3 2001 обновлен, старвая цена и количетво 10.11, 123, новая цена и количество10.11, 1', '2020-05-03 19:56:11'),
(97, 18, 8, 'Добавлен новый товар Втулка а3 2001 в заказ. Цена : 10.11 Количетво: 11', '2020-05-03 19:56:11'),
(98, 19, 10, 'Добавлен новый товар Руль от ауди в заказ. Цена : 12.31 Количетво: 11', '2020-05-26 09:33:03'),
(99, 19, 10, 'Заказ товара Руль от ауди обновлен, старвая цена и количетво 12.31, 11, новая цена и количество12.31, 10', '2020-05-26 09:33:23'),
(100, 2, 1, 'Заказ товара Руль от ауди обновлен, старвая цена и количетво 12.31, 2, новая цена и количество12.31, 3', '2020-05-27 11:48:44');
/*!40000 ALTER TABLE client_log ENABLE KEYS */;

--
-- Удалить триггер `trigger1`
--
DROP TRIGGER IF EXISTS trigger1;

--
-- Удалить триггер `before_insert_links_orders_products`
--
DROP TRIGGER IF EXISTS before_insert_links_orders_products;

--
-- Удалить триггер `before_update_links_orders_products`
--
DROP TRIGGER IF EXISTS before_update_links_orders_products;

--
-- Удалить триггер `delete_links_orders_products`
--
DROP TRIGGER IF EXISTS delete_links_orders_products;

--
-- Удалить триггер `insert_links_orders_products`
--
DROP TRIGGER IF EXISTS insert_links_orders_products;

--
-- Удалить триггер `update_links_oreders_products`
--
DROP TRIGGER IF EXISTS update_links_oreders_products;

DELIMITER $$

--
-- Создать триггер `before_insert_links_orders_products`
--
CREATE 
	DEFINER = 'root'@'%'
TRIGGER before_insert_links_orders_products
	BEFORE INSERT
	ON links_orders_products
	FOR EACH ROW
BEGIN
  IF (NEW.count = 0
    OR NEW.price = 0
    OR NEW.name = '') THEN
    SIGNAL SQLSTATE '45000' SET MESSAGE_TEXT = "Error... data is not correct";
  END IF;
END
$$

--
-- Создать триггер `before_update_links_orders_products`
--
CREATE 
	DEFINER = 'root'@'%'
TRIGGER before_update_links_orders_products
	BEFORE UPDATE
	ON links_orders_products
	FOR EACH ROW
BEGIN
  IF (NEW.count = 0
    OR NEW.price = 0
    OR NEW.name = '') THEN
    SIGNAL SQLSTATE '45000' SET MESSAGE_TEXT = "Error... data is not correct";
  END IF;
END
$$

--
-- Создать триггер `delete_links_orders_products`
--
CREATE 
	DEFINER = 'root'@'%'
TRIGGER delete_links_orders_products
	AFTER DELETE
	ON links_orders_products
	FOR EACH ROW
BEGIN
  INSERT INTO client_log (client_log.order_id, client_log.event)
    VALUES (old.order_id,CONCAT('С заказа удален товар ', old.name));
  CALL recolculate_order_total_price(old.order_id);
END
$$

--
-- Создать триггер `insert_links_orders_products`
--
CREATE 
	DEFINER = 'root'@'%'
TRIGGER insert_links_orders_products
	AFTER INSERT
	ON links_orders_products
	FOR EACH ROW
BEGIN
  INSERT INTO client_log (client_log.order_id, client_log.links_products_orders_id, client_log.event)
    VALUES (new.order_id, new.id, CONCAT('Добавлен новый товар ', new.name, ' в заказ. Цена : ', new.price,' Количетво: ', new.count));
  CALL recolculate_order_total_price(new.order_id);
END
$$

--
-- Создать триггер `update_links_oreders_products`
--
CREATE 
	DEFINER = 'root'@'%'
TRIGGER update_links_oreders_products
	AFTER UPDATE
	ON links_orders_products
	FOR EACH ROW
BEGIN
  INSERT INTO client_log (client_log.order_id, client_log.links_products_orders_id, client_log.event)
    VALUES (old.order_id, old.id, CONCAT('Заказ товара ', old.name, ' обновлен, старвая цена и количетво ', old.price, ', ', old.count, ', новая цена и количество', new.price, ', ', new.count));
  CALL recolculate_order_total_price(new.order_id);
END
$$

--
-- Создать триггер `trigger1`
--
CREATE 
	DEFINER = 'root'@'%'
TRIGGER trigger1
	BEFORE UPDATE
	ON orders
	FOR EACH ROW
BEGIN
  IF (NEW.DATE_ADD <> OLD.DATE_ADD) THEN
    SET NEW.total_price = (SELECT
        SUM(total)
      FROM (SELECT
          lop.count,
          d.price,
          (lop.count * d.price) total
        FROM links_orders_products lop
          JOIN deliverys d
            ON lop.delivery_id = d.id
        WHERE lop.order_id = NEW.id) total) * (100 - (SELECT
        c.discount
      FROM clients c
      WHERE c.id = NEW.client_id)) / 100;
  END IF;
END
$$

DELIMITER ;

-- 
-- Восстановить предыдущий режим SQL (SQL mode)
-- 
/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;

-- 
-- Включение внешних ключей
-- 
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;