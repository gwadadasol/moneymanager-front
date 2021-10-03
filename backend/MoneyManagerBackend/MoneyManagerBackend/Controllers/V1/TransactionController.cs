using System;
using System.Collections.Generic;
using MoneyManagerBackend.Domains;
using Microsoft.AspNetCore.Mvc;
using MoneyManagerBackend.Contracts.V1;
using MoneyManagerBackend.Domains.Model;
using MoneyManagerBackend.Domains.Dtos;
using MediatR;
using Microsoft.Extensions.Logging;
using MoneyManagerBackend.Contracts.V1.Requests;
using System.Threading.Tasks;

namespace MoneyManagerBackend.Controllers.V1
{
    [ApiController]
    public class TransactionController : ControllerBase
    {
        private readonly IMediator _mediator;
        private readonly ILogger<TransactionController> _logger;

        public TransactionController(IMediator mediator, ILogger<TransactionController> logger)
        {
            _mediator = mediator;
            _logger = logger;
        }
         
        [HttpGet(ApiRoutes.Transaction.GetAll)]
        public async Task<IActionResult> GetAllTransactions()
        {
            _logger.LogTrace("GetAllTransactions");
            var result = await _mediator.Send(new GetTransactionsRequest());

            result.ForEach( t => _logger.LogTrace($" Date:{t.Date}, [Id:{t.Id}, Account:{t.Account}, Amount:{t.Amount}, Desc:{t.Description}]"));
            
            return Ok(result);
        }
    }
}