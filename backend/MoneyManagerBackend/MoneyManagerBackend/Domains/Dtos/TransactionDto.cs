using System;

namespace MoneyManagerBackend.Domains.Dtos
{
    public class TransactionDto
    {
        public int Id { get; set; }
        public DateTime Date { get; set; }
        public string Description { get; set; }
        public decimal Amount { get; set; }
        public string Account { get; set; }
        public string Category { get; set; }
        
    }
}