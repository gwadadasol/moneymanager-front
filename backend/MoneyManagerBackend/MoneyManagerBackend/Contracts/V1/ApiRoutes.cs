namespace TransactionService.Contracts.V1
{
    public static class ApiRoutes
    {
        public const string Root = "api";
        public const string Version = "v1";
        public const string Base = Root + "/" + Version;

        public static class Transaction
        {
            public const string GetAll = Base + "/transactions";
            public const string Update = Base + "/transactions/{transactionId}";
            public const string Delete = Base + "/transactions/{transactionId}";
            public const string Get = Base + "/transactions/{transactionId}";
            public const string Create = Base + "/transactions";
        }
    }
}