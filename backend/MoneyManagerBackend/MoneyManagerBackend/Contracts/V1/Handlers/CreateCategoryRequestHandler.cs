using AutoMapper;
using MediatR;
using MoneyManagerBackend.Contracts.V1.Requests;
using MoneyManagerBackend.Domains.Dtos;
using MoneyManagerBackend.Domains.Model;
using MoneyManagerBackend.Domains.Repository;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;

namespace MoneyManagerBackend.Contracts.V1.Handlers
{
    public class CreateCategoryRequestHandler : IRequestHandler<CreateCategoryRequest, CategoryDto>
    {
        private readonly IMapper _mapper;
        private readonly  ICategoryRepository _repository;

        public CreateCategoryRequestHandler(IMapper mapper, ICategoryRepository repository)
        {
            _mapper = mapper;
            _repository = repository;
        }

        public async Task<CategoryDto> Handle(CreateCategoryRequest request, CancellationToken cancellationToken)
        {
            var category = new CategoryEntity { Name = request.Name };
        
            _repository.CreateCategory(category);
            await _repository.SaveChangesAsync();

            return _mapper.Map<CategoryDto>(category);
        }
    }
}
