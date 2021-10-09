using System.Collections.Generic;
using System.Threading.Tasks;
using MoneyManagerBackend.Domains.Model;

namespace MoneyManagerBackend.Domains.Repository
{
    public interface ITransactionRepository
    {
        bool SaveChanges();
        Task<bool> SaveChangesAsync();


        IEnumerable<TransactionEntity> GetAllTransactions();
        TransactionEntity GetTransactionById(int id);
        void CreateTransaction(TransactionEntity category);
    }
}