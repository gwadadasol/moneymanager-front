using MediatR;
using Microsoft.AspNetCore.Mvc;
using MoneyManagerBackend.Contracts.V1;
using MoneyManagerBackend.Contracts.V1.Requests;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace MoneyManagerBackend.Controllers.V1
{
    [ApiController]
    public class CategoryController : ControllerBase
    {
        readonly IMediator _mediator;

        public CategoryController(IMediator mediator)
        {
            _mediator = mediator;
        }


        [HttpGet(ApiRoutes.Category.GetAll)]
        public async Task<IActionResult> GetCategories()
        {
            var result = await _mediator.Send(new GetCategoriesRequest());
            return Ok(result);
        }
        [HttpGet(ApiRoutes.Category.Get)]
        public async Task<IActionResult> GetCategories(int categoryId)
        {
            var result = await _mediator.Send(new GetCategoryRequest() { Id = categoryId });
            return result != null ? Ok(result) : NotFound();
        }

        [HttpPost(ApiRoutes.Category.Create)]
        public async Task<IActionResult> Create(string name)
        {
            var result = await _mediator.Send(new CreateCategoryRequest() { Name = name});
            if (result != null)
            {
                var baseUrl = $"{HttpContext.Request.Scheme}://{HttpContext.Request.Host.ToUriComponent()}";
                var locationUri = $"{baseUrl}/{ApiRoutes.Category.Get.Replace("{categoryId}", result.Id.ToString())}";
                return Created(locationUri, result);
            }
            else
                return NotFound();
        }
    }
}
