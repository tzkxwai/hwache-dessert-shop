using System.Globalization;
using Microsoft.AspNetCore.Localization;

var builder = WebApplication.CreateBuilder(args);

builder.Services.AddLocalization(options => options.ResourcesPath = "Resources");
builder.Services.Configure<RequestLocalizationOptions>(options =>
{
    var cultures = new[] { new CultureInfo("ru"), new CultureInfo("uk") };
    options.DefaultRequestCulture = new RequestCulture("ru");
    options.SupportedCultures = cultures;
    options.SupportedUICultures = cultures;
    options.RequestCultureProviders =
    [
        new CookieRequestCultureProvider(),
        new QueryStringRequestCultureProvider(),
        new AcceptLanguageHeaderRequestCultureProvider()
    ];
});

builder.Services.AddControllersWithViews()
    .AddViewLocalization();

var app = builder.Build();

if (!app.Environment.IsDevelopment())
{
    app.UseExceptionHandler("/Home/Error");
    app.UseHsts();
}

// Не перенаправляем на HTTPS в Development и при явном HTTP для сети (0.0.0.0) — иначе с других устройств сайт по http://IP не откроется.
var urls = builder.Configuration["Urls"] ?? Environment.GetEnvironmentVariable("ASPNETCORE_URLS") ?? "";
var httpOnlyForLan = urls.Contains("0.0.0.0", StringComparison.OrdinalIgnoreCase)
    && !urls.Contains("https://", StringComparison.OrdinalIgnoreCase);
if (!app.Environment.IsDevelopment() && !httpOnlyForLan)
    app.UseHttpsRedirection();

app.UseRouting();
app.UseRequestLocalization();
app.UseAuthorization();

app.MapStaticAssets();

app.MapControllerRoute(
    name: "default",
    pattern: "{controller=Home}/{action=Index}/{id?}")
    .WithStaticAssets();

app.Run();
