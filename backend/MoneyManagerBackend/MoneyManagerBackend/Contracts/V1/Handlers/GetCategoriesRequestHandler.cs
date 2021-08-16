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
    public class GetCategoriesRequestHandler : IRequestHandler<GetCategoriesRequest, List<Category>>
    {
        public Task<List<Category>> Handle(GetCategoriesRequest request, CancellationToken cancellationToken)
        {
            var categories = new List<Category>();
            using (var dbContext = new SqliteDbContext())
            {
                categories = dbContext.Categories.ToList<Category>();
            }

            return Task.FromResult(categories);
        }
    }
}
