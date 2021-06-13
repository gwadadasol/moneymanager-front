namespace MoneyManagerBackend.Contracts.V1
{
    public static class ApiRoutes
    {
        public const string Root = "api";
        public const string Version = "v1";
        public const string Base = Root + "/" + Version;

        public static class Movement
        {
            public const string GetAll = Base + "/movements";
            public const string Update = Base + "/movements/{movementId}";
            public const string Delete = Base + "/movements/{movementId}";
            public const string Get = Base + "/movements/{movementId}";
            public const string Create = Base + "/movements";
        }
    }
}