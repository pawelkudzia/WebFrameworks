# Tools

## DataGenerator

`DataGenerator` is used for creating `measurements.sqlite3` database.

### Commands

- Create database migration:

`dotnet ef migrations add Init`


- Remove database migration:

`dotnet ef migrations remove`


- Revert all database migrations:

`dotnet ef database update 0`


- Apply database migrations:

`dotnet ef database update`


- Run application to check if database contains data (development):

`dotnet run`

## Others

`nginx` contains config files (`server blocks`) for nginx and scripts for starting web services.

`plots` contains Python scripts and `csv` files for creating benchmark plots (read, create and update tests).

`postman` contains Postman collection which holds endpoints used in web services.

`results` contains final benchmark data. There are 2 directories: `read` and `create_update`.

`scripts` contains scripts which are used for performing benchmark tests.
