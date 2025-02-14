ALTER TABLE `grocery_app`.`grocery_items` 
ADD COLUMN `is_deleted` TINYINT NULL DEFAULT 0 AFTER `category_id`;
