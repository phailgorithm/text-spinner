# Setting up a local development environment

## Initial setup

In order to setup a local development enviroment please follow the below steps.

- Clone the github repository to your local machine by running

  ```
  git clone git@github.com:phailgorithm/text-spinner
  ```

- Change current working directory to text-spinner

  ```
  cd text-spinner/
  ```

- Create an environment file to store directus's credentials

  ```
  touch .directus.env
  ```

- Spin up the services listed in docker-compose file

  ```
  docker-compose up --build
  ```

  After spinning up the services, you will notice logs of all services. Directus will generate and log default username and password. Note it down and save it in .directus.env file.

- In order to run database migrations execute from another terminal:
  ```
  cat migration.sql | docker-compose exec -T postgresql psql -U postgres
  ```

## Directus Bug

Once done, you may not see all the collections listed in directus. Access directus data model from [Spinner](http://localhost:8055/admin/settings/data-model/spinner)
Under Archive, enable or disalbe `Archive App Filter` option and save. Now collections should be visible

## Stopping the services

In order to stop the services just press `CTRL+C` in the terminal where services are logging.

## Running in background

In order to run a service(s) in background, use the following command

```
docker-compose up -d <service-name>
```

For example, to run the database service in background

```
docker-compose up -d postgresql
```

To check logs of a service running in background

```
docker-compose logs -f postgresql
```

To stop a service running in background

```
docker-compose stop postgresql
```

##
