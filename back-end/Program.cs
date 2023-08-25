using back_end.Data;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Http.Headers;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.Options;
using Microsoft.Net.Http.Headers;

var builder = WebApplication.CreateBuilder(args);

builder.Services.AddControllersWithViews();


var serverVersion = new MySqlServerVersion(new Version(5, 5, 62));

builder.Services.AddDbContext<ApplicationDbContext>(options =>
    options.UseMySql(builder.Configuration.GetConnectionString("DBConnection"),serverVersion));

builder.Services.AddSpaStaticFiles(configuration =>
{
    configuration.RootPath = "front-end/dist";

});

var app = builder.Build();

if (!app.Environment.IsDevelopment())
{
    app.UseExceptionHandler("/Home/Error");
    app.UseHsts();
}

app.UseHttpsRedirection();
app.UseStaticFiles();

app.UseRouting();

app.UseAuthorization();

app.MapControllerRoute(
    name: "default",
    pattern: "{controller=Home}/{action=Index}/{id?}",
    defaults: new { controller = "Home", action = "Index" });

var spaPath = "/app";
if (app.Environment.IsDevelopment())
{
    app.MapWhen(y => y.Request.Path.StartsWithSegments(spaPath), client =>
    {
        client.UseSpa(spa =>
        {
            spa.UseProxyToSpaDevelopmentServer("https://localhost:6363");
        });
    });
}
else
{
    app.Map(new PathString(spaPath), client =>
    {
        client.UseSpaStaticFiles();
        client.UseSpa(spa => {
            spa.Options.SourcePath = "front-end";

            spa.Options.DefaultPageStaticFileOptions = new StaticFileOptions
            {
                OnPrepareResponse = ctx =>
                {
                    ResponseHeaders headers = ctx.Context.Response.GetTypedHeaders();
                    headers.CacheControl = new CacheControlHeaderValue
                    {
                        NoCache = true,
                        NoStore = true,
                        MustRevalidate = true
                    };
                }
            };
        });
    });
}

app.Run();
