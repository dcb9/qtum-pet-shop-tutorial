Qtum Pet Shop Tutorial
==================================

## Requirements

- NodeJS
- Docker
- Docker Compose
- [Qrypto](https://github.com/bodhiproject/qrypto) a qtum light wallet

## Clone and install

```shell
$ git clone https://github.com/dcb9/qtum-pet-shop-tutorial.git
$ cd qtum-pet-shop-tutorial
$ npm install
```

## Start services

The qtumjs-wallet depends on a number of external services. you'll need to start the services using docker-compose.

```shell
$ npm run start-services
```

To generate a block quickly

```shell
$ npm run mineQuickly
```

## Migrate

```shell
$ npm run migrate:force
```


## Start

```shell
$ npm start
```
