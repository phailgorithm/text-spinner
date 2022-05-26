# text-spinner sample api

## INSTALL

```
touch .directus.env
docker-compose up -d postgresql

# spin up directus and wait for install / password generation
docker-compose up directus


# in another shell, migrate:
cat migration.sql | docker-compose exec -T postgresql psql -U postgres
```

**DIRECTUS BUG**
Once done, access directus data model, access [`Spinner`](http://localhost:8055/admin/settings/data-model/spinner)
Under Archive, enable or disalbe `Archive App Filter`

Save.

Now collections should be visible

## Openapi

The openapi spec is mantained in a file named _openapi.yaml_. It is served from express with the swagger UI. More about openapi can be found here: https://swagger.io/specification/

The openapi documentation with swagger UI can be accessed here: http://localhost:8080/doc

## Development Environment

Run the below command to start the development environment

```
docker-compose up --build
```

### Nodemon

Use nodemon during development because it automatically restarts the http server whenever there is a change in any of javascript files. It removes the overhead of manually restarting the server everytime there is a change in code.

### Deployment

In order to deploy the app run

```
make
```

and then

```
docker-compose up -d --build
```
