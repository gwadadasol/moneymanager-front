using AutoMapper;
using MediatR;
using MoneyManagerBackend.Contracts.V1.Requests;
using MoneyManagerBackend.Domains;
using MoneyManagerBackend.Domains.Dtos;
using MoneyManagerBackend.Domains.Model;
using MoneyManagerBackend.Domains.Repository;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;

namespace MoneyManagerBackend.Contracts.V1.Handlers
{
    public class GetCategoryRequestHandler : IRequestHandler<GetCategoryRequest, CategoryDto>
    {

        private readonly IMapper _mapper;
        private readonly ICategoryRepository _repository;

        public GetCategoryRequestHandler(IMapper mapper, ICategoryRepository repository)
        {
            _mapper = mapper;
            _repository = repository;
        }
        public Task<CategoryDto> Handle(GetCategoryRequest request, CancellationToken cancellationToken)
        {
                var categoryEnt = _repository.GetCategoryById(request.Id);
                var categoryDto = _mapper.Map<CategoryDto>(categoryEnt);
                return Task.FromResult(categoryDto);
        }
    }
}
