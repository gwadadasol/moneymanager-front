using System.Collections.Generic;
using MoneyManagerBackend.Domains.Model;

namespace MoneyManagerBackend.Domains.Repository
{
    public interface ITransactionRepository
    {
        bool SaveChanges();

        IEnumerable<TransactionEntity> GetAllTransactions();
        TransactionEntity GetTransactionById(int id);
        void CreateTransaction(TransactionEntity category);
    }
}