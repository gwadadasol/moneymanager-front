using MediatR;
using MoneyManagerBackend.Contracts.V1.Requests;
using MoneyManagerBackend.Domains;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;

namespace MoneyManagerBackend.Contracts.V1.Handlers
{
    public class CreateCategoryRequestHandler : IRequestHandler<CreateCategoryRequest, Category>
    {
        public async Task<Category> Handle(CreateCategoryRequest request, CancellationToken cancellationToken)
        {
            string newCategoryId = string.Empty;
            using (var dbContext = new SqliteDbContext())
            {
                dbContext.Categories.Add(new Category() { Name = request.Name });
                await dbContext.SaveChangesAsync();

                return dbContext.Categories.FirstOrDefault(value => value.Name == request.Name);
            }

            
        }
    }
}
