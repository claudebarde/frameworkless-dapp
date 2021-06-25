window.addEventListener("load", async event => {
  // Taquito
  if (window.taquito && window.taquito.hasOwnProperty("TezosToolkit")) {
    console.log("Taquito is installed");
    const rpcUrl = "https://api.tez.ie/rpc/florencenet";
    const contractAddress = "KT1PzUGbdKaN332Smfd1ExpdKQ7BSzzJRqJ4";
    const Tezos = new window.taquito.TezosToolkit(rpcUrl);

    document.getElementById("connect-wallet").onclick = async () => {
      const wallet = new window.taquitoBeaconWallet.BeaconWallet({
        name: "Frameworkless Dapp",
        preferredNetwork: "florencenet"
      });
      await wallet.requestPermissions({
        network: {
          type: "florencenet",
          rpcUrl
        }
      });
      Tezos.setWalletProvider(wallet);
    };

    document.getElementById("send-tez").addEventListener("click", async () => {
      console.log("send tez");
    });

    document
      .getElementById("update-contract")
      .addEventListener("click", async () => {
        console.log("update contract");
        try {
          const contract = await Tezos.wallet.at(contractAddress);
          const op = await contract.methods.simple_param(10).send();
          await op.confirmation();
        } catch (err) {
          console.log(err);
        }
      });
  } else {
    console.log("Taquito is not installed");
  }

  // Beacon Wallet
  if (
    window.taquitoBeaconWallet &&
    window.taquitoBeaconWallet.hasOwnProperty("BeaconWallet")
  ) {
    console.log("Beacon Wallet is installed");
    globalThis.beacon = globalThis.beaconSdk;
    global = globalThis;
  } else {
    console.log("Beacon Wallet is not installed");
  }
});
