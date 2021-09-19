using MediatR;
using MoneyManagerBackend.Domains.Dtos;

namespace MoneyManagerBackend.Contracts.V1.Requests
{
    public class GetCategoryRequest : IRequest<CategoryDto> 
    {
        public int Id { get; set; }
    }
}
