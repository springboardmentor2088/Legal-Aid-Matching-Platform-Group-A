-- Cases Table for Legal Aid Platform
-- This table stores case information filed by citizens
-- Each step of the form saves data progressively

CREATE TABLE IF NOT EXISTS cases (
    id BIGSERIAL PRIMARY KEY,
    citizen_id INTEGER NOT NULL REFERENCES citizens(id),
    case_number VARCHAR(50) UNIQUE,
    
    -- Step 0: Applicant Details
    applicant_name VARCHAR(100),
    email VARCHAR(255),
    mobile VARCHAR(15),
    aadhaar VARCHAR(12),
    
    -- Step 1: Victim Details
    victim_name VARCHAR(100),
    relation VARCHAR(50),
    victim_gender VARCHAR(20),
    victim_age INTEGER,
    
    -- Step 2: Case Details
    case_title VARCHAR(255),
    case_type VARCHAR(50),
    
    -- Step 3: Incident Details
    incident_date DATE,
    incident_place VARCHAR(255),
    urgency VARCHAR(20),
    
    -- Step 4: Legal Preference
    specialization VARCHAR(50),
    court_type VARCHAR(50),
    seeking_ngo_help VARCHAR(10),
    ngo_type VARCHAR(50),
    
    -- Step 5: Case Explanation
    background TEXT,
    relief TEXT,
    
    -- Step 6: Documents
    documents_url TEXT,
    
    -- Metadata
    current_step INTEGER DEFAULT 0,
    is_submitted BOOLEAN DEFAULT FALSE,
    status VARCHAR(20) DEFAULT 'DRAFT',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Index for faster queries by citizen
CREATE INDEX IF NOT EXISTS idx_cases_citizen_id ON cases(citizen_id);
CREATE INDEX IF NOT EXISTS idx_cases_updated_at ON cases(updated_at DESC);
CREATE INDEX IF NOT EXISTS idx_cases_status ON cases(status);

