using MoneyManagerBackend.Domains;
using MoneyManagerBackend.Domains.Dtos;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace MoneyManagerBackend.Services
{
    public interface ICategoryService
    {
        public List<CategoryDto> GetCategories();
    }
}
