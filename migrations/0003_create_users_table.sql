CREATE TABLE users (
  id SERIAL PRIMARY KEY,
  email CITEXT UNIQUE,
  password TEXT
)INHERITS(modified_timestamps);

CREATE TRIGGER update_users_modtime BEFORE UPDATE ON users FOR EACH ROW EXECUTE PROCEDURE  update_modified_column();

