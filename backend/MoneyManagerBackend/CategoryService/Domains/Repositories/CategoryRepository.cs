using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using CategoryService.Domains.Model;

namespace CategoryService.Domains.Repository
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

        public void CreateRule(RuleEntity ruleEntity)
        {
            if (ruleEntity == null)
            {
                throw new ArgumentNullException(nameof(ruleEntity));
            }
            _dbContext.Rules.Add(ruleEntity);
        }

        public void DeleteCategoryById(int id)
        {
            var category = _dbContext.Categories.FirstOrDefault(c => c.Id == id);
            _dbContext.Categories.Remove(category);
        }

        public void DeleteRuleById(string category)
        {
            var rule = _dbContext.Rules.FirstOrDefault(r => r.Category == category);
            _dbContext.Rules.Remove(rule);
        }

        public IEnumerable<CategoryEntity> GetAllCategories()
        {
            return _dbContext.Categories.ToList();
        }

        public IEnumerable<RuleEntity> GetAllRules()
        {
              return _dbContext.Rules.ToList();
        }

        public CategoryEntity GetCategoryById(int id)
        {
            return _dbContext.Categories.FirstOrDefault(c => c.Id == id);
        }

        public RuleEntity GetRuleByName(string category)
        {
            return _dbContext.Rules.FirstOrDefault(r => r.Category == category);
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