using MediatR;
using MoneyManagerBackend.Contracts.V1.Requests;
using MoneyManagerBackend.Domains;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;

namespace MoneyManagerBackend.Contracts.V1.Handlers
{
    public class GetCategoryRequestHandler : IRequestHandler<GetCategoryRequest, Category>
    {
        public Task<Category> Handle(GetCategoryRequest request, CancellationToken cancellationToken)
        {
            using (var dbContext = new SqliteDbContext())
            {
                var category = dbContext.Categories.Where(c => c.Id == request.Id).FirstOrDefault();
                return Task.FromResult(category);
            }
        }
    }
}
