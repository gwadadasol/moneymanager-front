using AutoMapper;
using MoneyManagerBackend.Domains.Dtos;
using MoneyManagerBackend.Domains.Model;

namespace MoneyManagerBackend.Domains.Profiles
{
    public class MoneyManagerProfile : Profile
    {
        public MoneyManagerProfile()
        {
            // Source --> Target
            CreateMap<TransactionEntity, TransactionDto>();
            CreateMap<TransactionDto,TransactionEntity>();
            CreateMap<CategoryEntity, CategoryDto>();
            CreateMap<CategoryDto, CategoryEntity>();
        }
    }
}