CREATE TABLE IF NOT EXISTS user (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  username TEXT UNIQUE NOT NULL,
  password TEXT NOT NULL
);

CREATE TABLE IF NOT EXISTS transactions (
  transaction_id INTEGER PRIMARY KEY AUTOINCREMENT,
  user_id INTEGER NOT NULL,
  transaction_name TEXT NOT NULL,
  transaction_amount REAL NOT NULL,
  transaction_note TEXT,
  FOREIGN KEY (user_id) REFERENCES user (id)
);

CREATE TABLE IF NOT EXISTS bookmark (
  bookmark_id INTEGER PRIMARY KEY AUTOINCREMENT,
  transaction_id INTEGER NOT NULL,
  bookmark_type TEXT NOT NULL,
  bookmark_note TEXT,
  FOREIGN KEY (transaction_id) REFERENCES transactions (transaction_id) 
);