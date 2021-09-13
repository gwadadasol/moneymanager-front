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
    public class GetCategoriesRequestHandler : IRequestHandler<GetCategoriesRequest, List<CategoryDto>>
    {
        public Task<List<CategoryDto>> Handle(GetCategoriesRequest request, CancellationToken cancellationToken)
        {
            // var categories = new List<CategoryDto>();
            // using (var dbContext = new SqliteDbContext())
            // {
            //     categories = dbContext.Categories.ToList<CategoryDto>();
            // }
            // return Task.FromResult(categories);

            var categoriesEnt = new List<CategoryEntity>();
            using (var dbContext = new SqliteDbContext())
            {
                categoriesEnt = dbContext.Categories.ToList<CategoryEntity>();
            }

            var categoriesDto = new List<CategoryDto>();

            foreach(var catEnt in categoriesEnt)
            {
                categoriesDto.Add(new CategoryDto{Id = catEnt.Id, Name = catEnt.Name});

            }

            return Task.FromResult(categoriesDto);
        }
    }
}
