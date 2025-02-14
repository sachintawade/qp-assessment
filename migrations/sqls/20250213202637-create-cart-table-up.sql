CREATE TABLE cart (
    id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT NOT NULL,  -- Define the column
    item_id INT NOT NULL,  -- Define the column
    quantity INTEGER NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(id),  -- Add foreign key constraint separately
    FOREIGN KEY (item_id) REFERENCES grocery_items(id)   -- Add foreign key constraint separately
);