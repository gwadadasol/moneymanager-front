using MediatR;
using MoneyManagerBackend.Domains;
using MoneyManagerBackend.Domains.Dtos;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace MoneyManagerBackend.Contracts.V1.Requests
{
    public class GetCategoriesRequest : IRequest<List<CategoryDto>> { }
}
