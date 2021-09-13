using MediatR;
using MoneyManagerBackend.Contracts.V1.Requests;
using MoneyManagerBackend.Domains;
using MoneyManagerBackend.Domains.Model;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;

namespace MoneyManagerBackend.Contracts.V1.Handlers
{
    public class CreateCategoryRequestHandler : IRequestHandler<CreateCategoryRequest, CategoryDto>
    {
        public async Task<CategoryDto> Handle(CreateCategoryRequest request, CancellationToken cancellationToken)
        {
            string newCategoryId = string.Empty;
            using (var dbContext = new SqliteDbContext())
            {
                dbContext.Categories.Add(new CategoryEntity() { Name = request.Name });
                await dbContext.SaveChangesAsync();

                CategoryEntity catEnt =  dbContext.Categories.FirstOrDefault(value => value.Name == request.Name);
                CategoryDto categoryDto = new CategoryDto {
                    Id = catEnt.Id, 
                    Name = catEnt.Name
                    };


                // return dbContext.Categories.FirstOrDefault(value => value.Name == request.Name);
                return categoryDto;
            }

            
        }
    }
}
