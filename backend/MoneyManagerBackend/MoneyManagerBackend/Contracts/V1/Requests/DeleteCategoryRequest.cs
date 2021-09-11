using MediatR;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace MoneyManagerBackend.Contracts.V1.Requests
{
    public class DeleteCategoryRequest : IRequest<bool>
    {
        public int CategoryId { get; set; }
    }
}
