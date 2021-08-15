using System;
using System.Collections.Generic;
using MoneyManagerBackend.Domains;

namespace MoneyManagerBackend.Services
{
    public interface ITransactionService
    {
        public List<Transaction> GetTransactions();

        public Transaction GetTransactionById(int movementId);

        public bool UpdateTransaction(Transaction movement);
        public bool DeleteTransaction(int movementId);

    }
}