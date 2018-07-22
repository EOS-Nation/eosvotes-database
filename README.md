# EOS Votes Database

> The main goal with `EOS Votes Database` is to "listen" and store data into a well organized/structured MongoDB with an exposed GraphQL endpoint.

## Goals

- [x] Build listeners on `eosio` & `eosio.forum` that dumps action data into MongoDB
- [x] Tracking for EOS token Staked Balance
- [x] Define GraphQL Data schema
- [ ] Setup CLI for ease of use
- [ ] Resistant to spamming
- [ ] Leverage EOSIO MongoDB

## How to Start

Launch application using [Docker Compose](https://docs.docker.com/compose/).

```
$ docker-compose up
```

## Install MongoDB Compass

https://www.mongodb.com/download-center#compass

### GraphQL Endpoint

For this example, we are using [@thomasbcox's message](https://eos-forum.novusphere.io/#/e/novusphere/cb3b0f024a55efffcfbf0a8af4057f015e975c1fd662344d3984d22c93c778af) as a Post UUID.

We can easily calculate that the `post` has `422.1 EOS` of voting power towards 💪.

![image](https://user-images.githubusercontent.com/550895/42975044-28871236-8b88-11e8-9b99-19fbf978ed45.png)

## Database

![image](https://user-images.githubusercontent.com/550895/42975163-c9ac4a00-8b88-11e8-96b3-7c97d7909fd0.png)

## EOS Constitution

### [Article XI - Amending](https://github.com/EOS-Mainnet/governance/blob/master/eosio.system/eosio.system-clause-constitution-rc.md#article-xi---amending)

This Constitution and its subordinate documents shall not be amended except by a vote of the token holders with no less than 15% vote participation among tokens and no fewer than 10% more Yes than No votes, sustained for 30 continuous days within a 120 day period.
