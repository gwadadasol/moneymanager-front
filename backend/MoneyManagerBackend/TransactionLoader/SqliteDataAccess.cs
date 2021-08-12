using Microsoft.Data.Sqlite;
using System;
using System.Collections.Generic;
using System.Data;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace TransactionLoader
{
    public class SqliteDataAccess
    {
        public static void SaveTransaction(Transaction transaction)
        {
            using (IDbConnection connection = new SqliteConnection(@"Data Source=C:\Users\phili\src\money-manager\money-manager\database\moneymanager.db;"))
            {
                connection.Open();
                string stm = $"INSERT INTO Transactions (AccountNumber, TransactionDate, Description, AmountCAD) " +
                        $"VALUES (\"{ transaction.AccountNumber}\", \"{ transaction.Date.Date}\", \"{ transaction.Description1 + " " + transaction.Description2}\", { transaction.AmountCad})";

                IDbCommand command = connection.CreateCommand();
                command.CommandText = stm;
                command.ExecuteScalar();
                connection.Close();
            }
        }

    }
}