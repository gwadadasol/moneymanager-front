CREATE TABLE IF NOT EXISTS Transactions
(
    Id INTEGER PRIMARY KEY ASC,
    AccountNumber TEXT NOT NULL,
    TransactionDate TEXT NOT NULL,
    Description  TEXT NOT NULL,
    AmountCAD  REAL NOT NULL
);

CREATE TABLE IF NOT EXISTS Categories
(
    Id INTEGER PRIMARY KEY ASC,
    Name TEXT NOT NULL
);

CREATE TABLE  IF NOT EXISTS TransactionsCategories
(
    Counterparty  TEXT NOT NULL,
    CategoryId INTEGER NOT NULL
);