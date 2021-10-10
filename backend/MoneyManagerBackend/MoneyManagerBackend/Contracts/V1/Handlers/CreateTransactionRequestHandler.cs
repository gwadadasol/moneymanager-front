using System.Threading;
using System.Threading.Tasks;
using AutoMapper;
using MediatR;
using TransactionService.Domains.Dtos;
using TransactionService.Domains.Model;
using TransactionService.Domains.Repository;

namespace TransactionService.Contracts.V1.Handlers
{
    public class CreateTransactionRequestHandler : IRequestHandler<CreateTransactionRequest, TransactionDto>
    {
        private readonly IMapper _mapper;
        private readonly ITransactionRepository _repository;

        public CreateTransactionRequestHandler(IMapper mapper, ITransactionRepository repository)
        {
            _mapper = mapper;
            _repository = repository;
        }

        public async Task<TransactionDto> Handle(CreateTransactionRequest request, CancellationToken cancellationToken)
        {
            var transactionEntity =  _mapper.Map<TransactionEntity>(request.Transaction);
            _repository.CreateTransaction(transactionEntity);
            await _repository.SaveChangesAsync();

            return _mapper.Map<TransactionDto>(transactionEntity);

        }
    }
}