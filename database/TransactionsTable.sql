CREATE TABLE Transactions IF NOT EXISTS
(
    Id INTEGER PRIMARY KEY ASC,
    AccountNumber TEXT NOT NULL,
    TransactionDate TEXT NOT NULL,
    Description  TEXT NOT NULL,
    AmountCAD  REAL NOT NULL
)