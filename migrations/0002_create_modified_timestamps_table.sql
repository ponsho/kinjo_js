CREATE TABLE modified_timestamps (
    created_at timestamp default current_timestamp,
    updated_at timestamp

);

CREATE OR REPLACE FUNCTION update_modified_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = now();
    RETURN NEW;
END;
$$ language 'plpgsql';
