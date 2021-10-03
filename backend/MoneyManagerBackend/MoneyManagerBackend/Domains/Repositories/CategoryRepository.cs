using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using MoneyManagerBackend.Domains.Model;

namespace MoneyManagerBackend.Domains.Repository
{
    public class CategoryRepository : ICategoryRepository
    {
        private readonly AppDbContext _dbContext;

        public CategoryRepository(AppDbContext dbContext)
        {
            _dbContext = dbContext;
        }
        public void CreateCategory(CategoryEntity category)
        {
            if (category == null)
            {
                throw new ArgumentNullException(nameof(category));
            }
            _dbContext.Categories.Add(category);
        }

        public void DeleteCategoryById(int id)
        {
            var category = _dbContext.Categories.FirstOrDefault(c => c.Id == id);
            _dbContext.Categories.Remove(category);
        }

        public IEnumerable<CategoryEntity> GetAllCategories()
        {
            return _dbContext.Categories.ToList();
        }

        public CategoryEntity GetCategoryById(int id)
        {
            return _dbContext.Categories.FirstOrDefault(c => c.Id == id);
        }

        public bool SaveChanges()
        {
           return (_dbContext.SaveChanges() >= 0 );
        }

        public async Task<bool> SaveChangesAsync()
        {
            return (await _dbContext.SaveChangesAsync() >= 0 );
        }
    }
}