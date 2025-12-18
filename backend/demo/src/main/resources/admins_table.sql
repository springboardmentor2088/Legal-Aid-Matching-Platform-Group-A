-- Admin Table Creation Script
-- Run this script to create the admins table and insert a default admin user

-- Create admins table
CREATE TABLE IF NOT EXISTS admins (
    id INT AUTO_INCREMENT PRIMARY KEY,
    full_name VARCHAR(255) NOT NULL,
    aadhar_number VARCHAR(12) NOT NULL,
    email VARCHAR(255) NOT NULL UNIQUE,
    mobile_number VARCHAR(15) NOT NULL,
    date_of_birth DATE NOT NULL,
    password VARCHAR(255) NOT NULL,
    state VARCHAR(100) NOT NULL,
    district VARCHAR(100) NOT NULL,
    city VARCHAR(100) NOT NULL,
    address TEXT NOT NULL,
    profile_photo_url VARCHAR(500),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- Insert default admin user
-- Email: admin@advocare.com
-- Password: admin123
-- You can change these credentials after first login
INSERT INTO admins (full_name, aadhar_number, email, mobile_number, date_of_birth, password, state, district, city, address) 
VALUES (
    'System Administrator', 
    '000000000000', 
    'admin@advocare.com', 
    '9999999999', 
    '1990-01-01', 
    'admin123', 
    'Maharashtra', 
    'Pune', 
    'Pune', 
    'Admin Office, Legal Aid Platform'
)
ON DUPLICATE KEY UPDATE full_name = VALUES(full_name);
