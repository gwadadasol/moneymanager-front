using AutoMapper;
using MediatR;
using MoneyManagerBackend.Contracts.V1.Requests;
using MoneyManagerBackend.Domains.Model;
using MoneyManagerBackend.Domains.Repository;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;

namespace MoneyManagerBackend.Contracts.V1.Handlers
{
    public class DeleteCategoryRequestHandler : IRequestHandler<DeleteCategoryRequest, bool>
    {
        private readonly IMapper _mapper;
        private readonly ICategoryRepository _repository;

        public DeleteCategoryRequestHandler(IMapper mapper, ICategoryRepository repository)
        {
            _mapper = mapper;
            _repository = repository;
        }

        public async Task<bool> Handle(DeleteCategoryRequest request, CancellationToken cancellationToken)
        {
            _repository.DeleteCategoryById(request.CategoryId);
            await _repository.SaveChangesAsync();
            return true;
        }
    }
}
