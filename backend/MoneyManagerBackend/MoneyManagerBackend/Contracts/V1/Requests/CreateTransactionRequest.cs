using MediatR;
using MoneyManagerBackend.Domains.Dtos;

namespace MoneyManagerBackend.Contracts.V1
{
    public class CreateTransactionRequest : IRequest<TransactionDto>
    {
        public TransactionDto Transaction { get; set; }
    }
}