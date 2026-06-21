# Portfolio Web

- Production is deployed on Vercel as `portfolio` and is aliased to `https://www.vvitovec.com`.
- Production database and self-hosted storage are on Baller through BaseV in `/srv/projects/basev`.
- BaseV tenant config for this project is `/srv/projects/basev/projects/portfolio.yaml`.
- Production Postgres is exposed as `db.vvitovec.com`, database `portfolio`, with the app user configured in Vercel env.
- When schema changes are needed, apply repo migrations to the Baller/BaseV production database with an admin connection, then verify Vercel runtime with the production env.
- Do not store generated secrets in this repo.
