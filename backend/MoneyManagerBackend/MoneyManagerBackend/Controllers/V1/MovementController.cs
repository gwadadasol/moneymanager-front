using System;
using System.Collections.Generic;
using MoneyManagerBackend.Domains;
using Microsoft.AspNetCore.Mvc;
using MoneyManagerBackend.Contracts.V1;

namespace MoneyManagerBackend.Controllers.V1
{
    [ApiController]
    [Route("check")]
    public class MovementController : ControllerBase
    {
        public readonly List<Movement> _movements;

        public MovementController()
        {
            _movements = new List<Movement>();

            var v = new Movement
            {
                Date = new DateTime(2021, 03, 31),
                Account = "1",
                Description = "desc 1",
                Amount = 10
            };

            _movements.Add(v);
        }
         
        [HttpGet(ApiRoutes.Movement.GetAll)]
        public IActionResult GetMovement()
        {
            return Ok(_movements);
        }

        [HttpPost(ApiRoutes.Movement.Create)]
        public IActionResult Create()
        {
            return Ok(1);
        }
    }
}