using System;
using MediatR;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using Microsoft.OpenApi.Models;
using MoneyManagerBackend.Installers;
using MoneyManagerBackend.Options;

namespace MoneyManagerBackend
{
    public class Startup
    {
        public Startup(IConfiguration configuration)
        {
            Configuration = configuration;
        }

        public IConfiguration Configuration { get; } 

        // This method gets called by the runtime. Use this method to add services to the container.
        public void ConfigureServices(IServiceCollection services)
        {
            // services.InstallServicesAssembly(Configuration);
            services.AddControllers();
            services.AddSwaggerGen();

            services.AddCors(options => options.AddDefaultPolicy(
                //name: "MyPolicy",
                builder =>
                {
                    builder.WithOrigins("http://localhost:3000").AllowAnyMethod().AllowAnyHeader();
                }));

            // services.AddMvc(options => options.EnableEndpointRouting = false);

            services.AddMediatR(typeof(Startup));

            services.AddAutoMapper(AppDomain.CurrentDomain.GetAssemblies());
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

            app.UseHttpsRedirection();

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
