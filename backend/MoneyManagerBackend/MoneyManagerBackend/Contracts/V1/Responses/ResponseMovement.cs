using System;

namespace MoneyManagerBackend.Contracts.V1
{
    public class ResponseMovement
    {
            public DateTime Date { get; set; }
            public string Description { get; set; }
            public double Amount { get; set; }
            public string Account { get; set; }
    }
}