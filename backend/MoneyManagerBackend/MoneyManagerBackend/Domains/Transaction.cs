using System;

namespace MoneyManagerBackend.Domains
{
    public class Transaction
    {
        public int Id { get; set; }
        public DateTime Date { get; set; }
        public string Description { get; set; }
        public double Amount { get; set; }
        public string Account { get; set; }
        
    }
}