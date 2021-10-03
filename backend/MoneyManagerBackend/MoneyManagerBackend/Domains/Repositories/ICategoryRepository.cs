using System.Collections.Generic;
using System.Threading.Tasks;
using MoneyManagerBackend.Domains.Model;

namespace MoneyManagerBackend.Domains.Repository
{
    public interface ICategoryRepository
    {
        bool SaveChanges();
        Task<bool> SaveChangesAsync();

        IEnumerable<CategoryEntity> GetAllCategories();
        CategoryEntity GetCategoryById(int id);
        void CreateCategory(CategoryEntity category);
        void DeleteCategoryById(int id);
    }
}