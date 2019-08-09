# XRP QuickWallet Demo

This is a demo custodial wakllet built using the xrp-api. This utilizes a redis cache in order to store user data {destination tag, username, balance}.

The web client uses the xrp-api server to hit the xrp ledger, and records balances internally using the database. 


## Usage

- Sign up using destination tag and a username. Each user starts out with 100 XRP balance.
- Login using username 
- Login using `Admin` to access the admin page (Required for setup)

## Instructions

1. Setup an instance of the [xrp-api server] (https://github.com/intelliot/xrp-api)

- Copy Public Address, Secret Key, and API Key into xrp-wallet/client/components/Wallet/wallet.js EDIT THE STATE DIRECTLY!
Replace `address`, `secret`, and `Bearer_key`

2. install dependencies using `yarn` IN BOTH `redis-cache` and `client`

3. start the following processes in separate terminals

`redis-server`
`cd redis-cache && node server`
`cd client && yarn start`
`yarn dev`(in the xrp-api directory)
`redis-cli`

4. in the `redis-cli` bash, use the command `flushdb` to restart the server

5. Enter the admin page by logging in with username `Admin`, and see `Total Transaction Volume`. User the command `set counter X` where X is Total Transaction Volume. 
This makes sure that the counter is on the same page as the ledger.

## To Do
- [ ] Add a config file so you don't have to edit wallet.js directly
- [ ] Use Concurrently node package to make setup easier 
- [ ] host the xrp-api server once it's finished, so this demo can use the hosted server
- [ ] main net 



