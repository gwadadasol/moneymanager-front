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
    public class GetCategoryRequestHandler : IRequestHandler<GetCategoryRequest, CategoryDto>
    {

        IMapper _mapper;

        public GetCategoryRequestHandler(IMapper mapper)
        {
            _mapper = mapper;
        }
        public Task<CategoryDto> Handle(GetCategoryRequest request, CancellationToken cancellationToken)
        {
            using (var dbContext = new SqliteDbContext())
            {
                var categoryEnt = dbContext.Categories.Where(c => c.Id == request.Id).FirstOrDefault();
                var categoryDto = _mapper.Map<CategoryDto>(categoryEnt);
                return Task.FromResult(categoryDto);
            }
        }
    }
}
