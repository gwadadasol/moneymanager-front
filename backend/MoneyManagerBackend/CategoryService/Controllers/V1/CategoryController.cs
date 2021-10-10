using System.Threading.Tasks;
using CategoryService.Contracts.V1;
using CategoryService.Contracts.V1.Requests;
using MediatR;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;

namespace CategoryService.Controllers.V1
{
    [ApiController]
    public class CategoryController : ControllerBase
    {
        private readonly IMediator _mediator;
        private readonly ILogger<CategoryController> _logger;

        public CategoryController(IMediator mediator, ILogger<CategoryController> logger)
        {
            _mediator = mediator;
            _logger = logger;
        }


        [HttpGet(ApiRoutes.Category.GetAll)]
        public async Task<IActionResult> GetCategories()
        {
            _logger.LogTrace("Get all categories");
            var result = await _mediator.Send(new GetCategoriesRequest());
            return Ok(result);
        }
        [HttpGet(ApiRoutes.Category.Get, Name = "GetCategoryById")]
        public async Task<IActionResult> GetCategoryById(int categoryId)
        {
            _logger.LogTrace("GetCategoryById");
            var result = await _mediator.Send(new GetCategoryRequest() { Id = categoryId });

            _logger.LogTrace($"Result:[Id:{result.Id}, Name:{result.Name}]");
            return result != null ? Ok(result) : NotFound();
        }

        [HttpPost(ApiRoutes.Category.Create)]
        public async Task<IActionResult> Create(string categoryName)
        {
            _logger.LogTrace("Create");

            var result = await _mediator.Send(new CreateCategoryRequest() { Name = categoryName });

            if (result != null)
            {
                // var baseUrl = $"{HttpContext.Request.Scheme}://{HttpContext.Request.Host.ToUriComponent()}";
                // var locationUri = $"{baseUrl}/{ApiRoutes.Category.Get.Replace("{categoryId}", result.Id.ToString())}";
                // return Created(locationUri, result);

                _logger.LogTrace($"Result:[Id:{result.Id}, Name:{result.Name}]");
                return CreatedAtRoute(nameof(GetCategoryById), new { categoryId = result.Id }, result);
            }
            else
                return NotFound();
        }

        [HttpDelete(ApiRoutes.Category.Delete)]
        public async Task<IActionResult> Delete(int categoryId)
        {
            _logger.LogTrace("Delete");
            _logger.LogTrace($"Category to delete:[Id:{categoryId}]");
            var result = await _mediator.Send(new DeleteCategoryRequest() { CategoryId = categoryId });

            return result ? Ok() : NotFound();

        }
    }
}
