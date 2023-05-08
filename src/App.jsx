import { useEffect } from "react";
import { HomeBody } from "./Pages/Home/HomeBody";
import { Header } from "./Templates/HomeTepmplate/Header/Header";
import web3 from "./Services/Web3/Web3";

function App() {
  useEffect(() => {
    (async () => {
      let balance = 0;
      let accounts = [];
      try {
        accounts = await web3.eth.getAccounts();
        if (accounts.length > 0) {
          balance = await web3.eth.getBalance(accounts[0]);
          console.log("accounts: ", accounts);
          console.log("balance: ", web3.utils.fromWei(balance, "ether"));
        } else {
          console.log("Please Connect To Your MetaMask !")
        }
      } catch (err) {
        console.log(err);
      }
    })();
  }, []);

  return (
    <div
      style={{ background: "rgb(30,27,39)", color: "white" }}
      className="h-screen"
    >
      <Header />
      <HomeBody />
    </div>
  );
}

export default App;
