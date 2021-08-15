using System;
using System.Collections.Generic;
using System.Linq;
using MoneyManagerBackend.Domains;

namespace MoneyManagerBackend.Services
{
    public class TransactionService : ITransactionService
    {
        private readonly List<Transaction> _movements;

        public TransactionService()
        {
            _movements = new()
            {
                new Transaction
                {
                    Id = 1,
                    Date = new DateTime(2021, 03, 31),
                    Account = "1",
                    Description = "desc 1",
                    Amount = 10
                },
                new Transaction
                {
                    Id = 2,
                    Date = new DateTime(2021, 03, 31),
                    Account = "2",
                    Description = "desc 2",
                    Amount = 20
                }
            };

        }

        public bool DeleteTransaction(int movementId)
        {
            var movement = GetTransactionById(movementId);

            if (movement == null)
            {
                return false;
            }

            _movements.Remove(movement);
            return true;
        }

        public Transaction GetTransactionById(int movementId)
        {
            return _movements.FirstOrDefault(m => m.Id == movementId);
        }

        public List<Transaction> GetTransactions()
        {
            return _movements;
        }

        public bool UpdateTransaction(Transaction movementToUpdate)
        {
            bool exist = GetTransactionById(movementToUpdate.Id) != null;

            if (!exist)
                return false;

            var index = _movements.FindIndex(m => m.Id == movementToUpdate.Id);
            _movements[index] = movementToUpdate;
            return true;
        }
    }
}