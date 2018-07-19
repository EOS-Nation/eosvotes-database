# EOS Votes Database

> The main goal with `EOS Votes Database` is to "listen" and store data into a well organized/structured MongoDB with an exposed GraphQL endpoint.

## Goals

- [x] Build listeners on `eosio` & `eosio.forum` that dumps action data into MongoDB
- [x] Tracking for EOS token Staked Balance
- [x] Define GraphQL Data schema
- [ ] Setup CLI for ease of use

## How to Start

Setup Environment variables by adding a `.env` file to your root directory.

**.env**

```
MONGO_DATA_DIR=/data/db
MONGO_LOG_DIR=/dev/null
MONGO_INITDB_ROOT_USERNAME=user
MONGO_INITDB_ROOT_PASSWORD=pass
MONGO_INITDB_DATABASE=eosvotes
```

Launch application using [Docker Compose](https://docs.docker.com/compose/).

```
$ docker-compose up
```

## Install MongoDB Compass

https://www.mongodb.com/download-center#compass

## Database

### `eosio.forum` entry

![image](https://user-images.githubusercontent.com/550895/42353424-370975ce-808e-11e8-87c9-561c73a15bad.png)

### GraphQL Endpoint

![image](https://user-images.githubusercontent.com/550895/42975044-28871236-8b88-11e8-9b99-19fbf978ed45.png)
![image](https://user-images.githubusercontent.com/550895/42353435-4c6c67dc-808e-11e8-8089-d63fd3e00cc2.png)

### MongoDB

![image](https://user-images.githubusercontent.com/550895/42353449-69d158c8-808e-11e8-8fdb-4f8681c2487c.png)

![image](https://user-images.githubusercontent.com/550895/42353446-5d7dee60-808e-11e8-8480-5b07f219185f.png)

## EOS Constitution

### [Article XI - Amending](https://github.com/EOS-Mainnet/governance/blob/master/eosio.system/eosio.system-clause-constitution-rc.md#article-xi---amending)

This Constitution and its subordinate documents shall not be amended except by a vote of the token holders with no less than 15% vote participation among tokens and no fewer than 10% more Yes than No votes, sustained for 30 continuous days within a 120 day period.
