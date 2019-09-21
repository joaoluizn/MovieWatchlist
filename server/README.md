# Watchlist Server Component

This is the server component from Watchlist project. This project was made using Spring Boot Framework and Java 8.

## Development Env
The project was created using Intellij Idea and no extra configuration was added when running this project, just the main Spring Application.

* Maven was used in this project instead of Graddle

## Building project
- On root directory:
```
$ mvn package
```

## Running Server
- Go to `target` folder:
```
$ cd target
```

- Run Built `.jar` file:
```
$ java -jar watchlist-0.0.1-SNAPSHOT.jar
```

Project should now be running on port 8080

- If need to change the server port:
```
$ java -jar watchlist-0.0.1-SNAPSHOT.jar --server.port=[Port-Number]
```

Thanks!