using System;
using System.Collections.Generic;
using MoneyManagerBackend.Domains;
using Microsoft.AspNetCore.Mvc;
using MoneyManagerBackend.Contracts.V1;

namespace MoneyManagerBackend.Controllers.V1
{
    [ApiController]
    [Route("check")]
    public class TransactionController : ControllerBase
    {
        public readonly List<Transaction> _movements;
        

        public TransactionController()
        {
            _movements = new List<Transaction>();
            using (var dbContext = new SqliteDbContext())
            {
                foreach (var movement in dbContext.Movements)
                {
                    _movements.Add(new Transaction
                    {
                        Id = movement.Id,
                        Account = movement.AccountNumber,
                        Description = movement.Description,
                        Amount = movement.AmountCad,
                        Date = movement.TransactionDate
                    });
                }

            }

                

            //var v = new Movement
            //{
            //    Date = new DateTime(2021, 03, 31),
            //    Account = "1",
            //    Description = "desc 1",
            //    Amount = 10
            //};

            //_movements.Add(v);
        }
         
        [HttpGet(ApiRoutes.Transaction.GetAll)]
        public IActionResult GetMovement()
        {
            return Ok(_movements);
        }

        [HttpPost(ApiRoutes.Transaction.Create)]
        public IActionResult Create()
        {
            return Ok(1);
        }
    }
}