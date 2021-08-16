using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace MoneyManagerBackend.Domains
{
    public class SqliteDbContext : DbContext
    {
        public DbSet<TransactionEntity> Movements { get; set; }
        public DbSet<Category> Categories { get; set; }

        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
            optionsBuilder.UseSqlite(@"Data Source=C:\Users\phili\src\money-manager\money-manager\database\moneymanager.db;");
        }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<TransactionEntity>().ToTable("Transactions");
            modelBuilder.Entity<Category>().ToTable("Categories");
        }
    }
}
