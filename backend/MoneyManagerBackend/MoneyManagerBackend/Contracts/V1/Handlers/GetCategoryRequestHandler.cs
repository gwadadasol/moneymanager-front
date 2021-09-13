using MediatR;
using MoneyManagerBackend.Contracts.V1.Requests;
using MoneyManagerBackend.Domains;
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
        public Task<CategoryDto> Handle(GetCategoryRequest request, CancellationToken cancellationToken)
        {
            using (var dbContext = new SqliteDbContext())
            {
                var categoryEnt = dbContext.Categories.Where(c => c.Id == request.Id).FirstOrDefault();
                var categoryDto = new CategoryDto{Id = categoryEnt.Id, Name = categoryEnt.Name};
                return Task.FromResult(categoryDto);
            }
        }
    }
}
