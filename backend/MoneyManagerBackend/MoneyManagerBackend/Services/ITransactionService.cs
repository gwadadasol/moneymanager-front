using System;
using System.Collections.Generic;
using MoneyManagerBackend.Domains;
using MoneyManagerBackend.Domains.Dtos;

namespace MoneyManagerBackend.Services
{
    public interface ITransactionService
    {
        public List<TransactionDto> GetTransactions();

        public TransactionDto GetTransactionById(int movementId);

        public bool UpdateTransaction(TransactionDto movement);
        public bool DeleteTransaction(int movementId);

    }
}