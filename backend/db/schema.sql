-- Create bonds table
CREATE TABLE IF NOT EXISTS bonds (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    bond_address VARCHAR NOT NULL UNIQUE,
    issuer_address VARCHAR NOT NULL,
    amount DECIMAL NOT NULL,
    maturity_date TIMESTAMP NOT NULL,
    interest_rate DECIMAL NOT NULL,
    bond_type VARCHAR NOT NULL,
    status VARCHAR NOT NULL DEFAULT 'active',
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Create investments table
CREATE TABLE IF NOT EXISTS investments (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    bond_id UUID REFERENCES bonds(id),
    investor_address VARCHAR NOT NULL,
    amount DECIMAL NOT NULL,
    transaction_signature VARCHAR NOT NULL,
    status VARCHAR NOT NULL DEFAULT 'active',
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Create function to update updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = CURRENT_TIMESTAMP;
    RETURN NEW;
END;
$$ language 'plpgsql';

-- Create triggers for updated_at
CREATE TRIGGER update_bonds_updated_at
    BEFORE UPDATE ON bonds
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_investments_updated_at
    BEFORE UPDATE ON investments
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column();

-- Create indexes
CREATE INDEX IF NOT EXISTS idx_bonds_issuer ON bonds(issuer_address);
CREATE INDEX IF NOT EXISTS idx_bonds_status ON bonds(status);
CREATE INDEX IF NOT EXISTS idx_investments_investor ON investments(investor_address);
CREATE INDEX IF NOT EXISTS idx_investments_bond ON investments(bond_id);
