using System.Collections.Generic;
using MediatR;
using MoneyManagerBackend.Domains.Dtos;

namespace MoneyManagerBackend.Contracts.V1.Requests
{
    public class GetTransactionsRequest: IRequest<List<TransactionDto>> { }
}