This is an update to the [code](https://github.com/dappuniversity/election) from [DAPP University](http://www.dappuniversity.com/)'s intro Election tutorial:

[https://www.youtube.com/watch?v=3681ZYbDSSk](https://www.youtube.com/watch?v=3681ZYbDSSk)

This codebase is upgraded for Solidity 0.5.x.

1) Install [Ganache UI](https://truffleframework.com/ganache) and run on **localhost** port **7545**

2) Install [Metamask](https://metamask.io/) chrome extension, set up an account and connect to Custom RPC at **http://localhost:7545**

3) Import account private keys from Ganache to Metamask, and make sure Metamask is using Account #2 (see [1:09:00](https://youtu.be/3681ZYbDSSk?t=4152))

4) Proceed with NodeJS truffle setup

```
npm install -g truffle
npm install
truffle init                # say N for each
truffle migrate --reset
```

Confirm that the first address in Ganache now shows 99.99 ETH.

5) Check that all 5 tests pass:

```
truffle test
```

Confirm that the first address in Ganache now shows 99.98 ETH or less.

6) Test the console

```
truffle console
```

Confirm the dapp functions exist:

```
> Election.deployed().then(function(i){ app = i })
> app.candidates(1)
> app.candidates(2)
```

Type `.exit` to exit the console

7) Run development server

```
npm run dev
```

Open [http://localhost:8000](http://localhost:8000)

TODO: rewrite front-end in ReactJS