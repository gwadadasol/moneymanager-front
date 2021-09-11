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
    public class DeleteCategoryRequestHandler : IRequestHandler<DeleteCategoryRequest, bool>
    {
        public async Task<bool> Handle(DeleteCategoryRequest request, CancellationToken cancellationToken)
        {
            string newCategoryId = string.Empty;
            using (var dbContext = new SqliteDbContext())
            {

                if ( dbContext.Categories.Any(c => c.Id == request.CategoryId))
                {
                    var cat = dbContext.Categories.First(c => c.Id == request.CategoryId);
                    dbContext.Categories.Remove(cat);
                    await dbContext.SaveChangesAsync();
                    return true;
                }

                return false;

            }
        }
    }
}
