# .NET

This directory contains information about .NET web service.

## Commands

- Add packages to project ([NuGet](https://www.nuget.org)):
`dotnet add package Microsoft.EntityFrameworkCore --version 5.0.6`
`dotnet add package Microsoft.EntityFrameworkCore.Sqlite --version 5.0.6`
`dotnet add package Microsoft.EntityFrameworkCore.Design --version 5.0.6`
`dotnet add package AutoMapper.Extensions.Microsoft.DependencyInjection --version 8.1.1`

- Publish .NET Application ([dotnet publish](https://docs.microsoft.com/en-us/dotnet/core/tools/dotnet-publish)):
`dotnet publish --configuration Release --framework net5.0 --self-contained --nologo --runtime linux-x64 --output ./publish_linux`
`dotnet publish --configuration Release --framework net5.0 --self-contained --nologo --runtime win-x64 --output ./publish_windows`
