# MetaTX

By using meta transactions, one user can sign a message and it can be executed by another. Meaning the first user who signed the message will not have to pay, in this example, a tranfer fee. By introducing a nonce for each signature, there is no possibiliby of a signature replay, as shown in the unit tests.

```shell
npm install
npx hardhat test
```
