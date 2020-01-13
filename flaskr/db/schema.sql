CREATE TABLE IF NOT EXISTS users (
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
  transaction_date TEXT,
  tag_id INTEGER NOT NULL,
  FOREIGN KEY (user_id) REFERENCES users (id),
  FOREIGN KEY (tag_id) REFERENCES tags (tag_id)
);

CREATE TABLE IF NOT EXISTS tags (
  tag_id INTEGER PRIMARY KEY AUTOINCREMENT,
  user_id INTEGER NOT NULL,
  tag_type TEXT NOT NULL,
  tag_summary TEXT,
  FOREIGN KEY (user_id) REFERENCES users (id)
);

CREATE TABLE IF NOT EXISTS todos (
  todo_id INTEGER PRIMARY KEY AUTOINCREMENT,
  author_id INTEGER NOT NULL,
  todo_title TEXT NOT NULL,
  todo_body TEXT,
  todo_deadline TEXT NOT NULL,
  todo_done INTEGER NOT NULL,
  FOREIGN KEY (author_id) REFERENCES users (id)
);

CREATE TABLE IF NOT EXISTS request (
  req_id INTEGER PRIMARY KEY AUTOINCREMENT,
  sender_id INTEGER NOT NULL,
  recipient_id INTEGER NOT NULL,
  req_amount INTEGER NOT NULL,
  req_note TEXT,
  FOREIGN KEY (sender_id) REFERENCES users (id),
  FOREIGN KEY (recipient_id) REFERENCES users (id)
)
