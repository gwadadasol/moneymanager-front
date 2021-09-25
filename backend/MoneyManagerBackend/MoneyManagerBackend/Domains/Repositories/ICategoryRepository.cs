using System.Collections.Generic;
using MoneyManagerBackend.Domains.Model;

namespace MoneyManagerBackend.Domains.Repository
{
    public interface ICategoryRepository
    {
        bool SaveChanges();

        IEnumerable<CategoryEntity> GetAllCategories();
        CategoryEntity GetCategoryById(int id);
        void CreateCategory(CategoryEntity category);
        void DeleteCategoryById(int id);
    }
}