using AutoMapper;
using MediatR;
using MoneyManagerBackend.Contracts.V1.Requests;
using MoneyManagerBackend.Domains;
using MoneyManagerBackend.Domains.Dtos;
using MoneyManagerBackend.Domains.Model;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;

namespace MoneyManagerBackend.Contracts.V1.Handlers
{
    public class GetCategoriesRequestHandler : IRequestHandler<GetCategoriesRequest, List<CategoryDto>>
    {
        private IMapper _mapper;

        public GetCategoriesRequestHandler(IMapper mapper)
        {
            _mapper = mapper;
        }
        public Task<List<CategoryDto>> Handle(GetCategoriesRequest request, CancellationToken cancellationToken)
        {
            var categoriesEnt = new List<CategoryEntity>();
            using (var dbContext = new SqliteDbContext())
            {
                categoriesEnt = dbContext.Categories.ToList<CategoryEntity>();
            }

            var categoriesDto = categoriesEnt.Select(c => _mapper.Map<CategoryDto>(c)).ToList();

            return Task.FromResult(categoriesDto);
        }
    }
}
