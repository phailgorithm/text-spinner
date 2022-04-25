# text-spinner sample api

## INSTALL

```
touch .directus.env
docker-compose up -d postgres

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

