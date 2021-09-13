using MediatR;
using MoneyManagerBackend.Domains;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace MoneyManagerBackend.Contracts.V1.Requests
{
    public class CreateCategoryRequest : IRequest<CategoryDto> 
    {
        public string Name { get; set; }
    }
}
