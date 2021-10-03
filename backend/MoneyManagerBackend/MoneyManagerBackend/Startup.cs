using System;
using MediatR;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using Microsoft.OpenApi.Models;
using MoneyManagerBackend.Domains.Model;
using MoneyManagerBackend.Domains.Repository;
using MoneyManagerBackend.Installers;
using MoneyManagerBackend.Options;

namespace MoneyManagerBackend
{
    public class Startup
    {
        public IConfiguration Configuration { get; }

        private readonly IWebHostEnvironment _env;

        public Startup(IConfiguration configuration, IWebHostEnvironment env)
        {
            Configuration = configuration;
            _env = env;
        }

        // This method gets called by the runtime. Use this method to add services to the container.
        public void ConfigureServices(IServiceCollection services)
        {
            // services.InstallServicesAssembly(Configuration);


            if (_env.IsDevelopment())
            {
                Console.WriteLine("Development Mode");
                Console.WriteLine("Use In Memory DB");
                services.AddDbContext<AppDbContext>(opt => opt.UseInMemoryDatabase("InMem"));
            }
            else
            {
                Console.WriteLine("Production Mode");
                services.AddDbContext<AppDbContext>(opt =>
                opt.UseSqlServer(Configuration.GetConnectionString("SqlServer")));
            }


            services.AddMediatR(typeof(Startup));

            services.AddScoped<ICategoryRepository, CategoryRepository>();
            services.AddScoped<ITransactionRepository, TransactionRepository>();

            services.AddAutoMapper(AppDomain.CurrentDomain.GetAssemblies());

            services.AddControllers();
            services.AddSwaggerGen();

            services.AddCors(options => options.AddDefaultPolicy(
                //name: "MyPolicy",
                builder =>
                {
                    builder.WithOrigins("http://localhost:3000").AllowAnyMethod().AllowAnyHeader();
                }));
        }


        // This method gets called by the runtime. Use this method to configure the HTTP request pipeline.
        public void Configure(IApplicationBuilder app, IWebHostEnvironment env)
        {
            if (env.IsDevelopment())
            {
                app.UseDeveloperExceptionPage();
            }

            SwaggerOptions swaggerOptions = new();
            Configuration.GetSection(nameof(SwaggerOptions)).Bind(swaggerOptions);

            // app.UseSwagger(option => { option.RouteTemplate = swaggerOptions.JsonRoute; });
            app.UseSwagger();

            app.UseSwaggerUI(c => c.SwaggerEndpoint(swaggerOptions.UIEndpoint, swaggerOptions.Description));

            // app.UseHttpsRedirection();

            app.UseRouting();

            app.UseCors();

            app.UseAuthorization();

            app.UseEndpoints(endpoints =>
            {
                endpoints.MapControllers();
            });
        }
    }
}
