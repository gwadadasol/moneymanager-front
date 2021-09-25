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
    public class GetCategoriesRequestHandler : IRequestHandler<GetCategoriesRequest, List<CategoryDto>>
    {
        private readonly IMapper _mapper;
        private readonly ICategoryRepository _repository;

        public GetCategoriesRequestHandler(IMapper mapper, ICategoryRepository repository)
        {
            _mapper = mapper;
            _repository = repository;
        }
        public Task<List<CategoryDto>> Handle(GetCategoriesRequest request, CancellationToken cancellationToken)
        {
            var categoriesEnt = _repository.GetAllCategories();
            var categoriesDto = categoriesEnt.Select(c => _mapper.Map<CategoryDto>(c)).ToList();

            return Task.FromResult(categoriesDto);
        }
    }
}
