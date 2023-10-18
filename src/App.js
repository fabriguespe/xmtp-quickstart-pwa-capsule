import React, { useEffect, useState } from "react";
import { FloatingInbox } from "./FloatingInbox-hooks";
import "./index.css";
import { ethers } from "ethers";
import Capsule, {
  Environment,
  CapsuleEthersSigner,
  createCapsuleViemClient,
} from "@usecapsule/web-sdk";
import {
  CapsuleButton,
  CapsuleModal,
} from "@usecapsule/web-sdk/dist/modal/CapsuleModal";
import { Client } from "@xmtp/react-sdk";

const capsule = new Capsule(Environment.BETA, undefined);

const CHAIN_PROVIDER =
  "https://mainnet.infura.io/v3/40b700e3bfa24597a43d7ae0315bec06";
const CHAIN = "mainnet";

const isPWA = true;
const styles = {
  uContainer: {
    height: "100vh",
    backgroundColor: "#f9f9f9",
    borderRadius: isPWA == true ? "0px" : "10px",
    boxShadow: "0 0 10px rgba(0, 0, 0, 0.1)",
    zIndex: "1000",
    overflow: "hidden",
    display: "flex",
    flexDirection: "column",
  },
  xmtpContainer: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    height: "100vh",
  },
  btnXmtp: {
    backgroundColor: "#f0f0f0",
    display: "flex",
    alignItems: "center",
    textDecoration: "none",
    color: "#000",
    justifyContent: "center",
    border: "1px solid grey",
    padding: isPWA == true ? "20px" : "10px",
    borderRadius: "5px",
    fontSize: isPWA == true ? "20px" : "14px", // Increased font size
  },
};
function App() {
  const [signer, setSigner] = useState(null);

  const handleLogout = async () => {
    await capsule.logout();
    setSigner(null);
  };

  useEffect(() => {
    const updateLoginStatus = async () => {
      const isLoggedIn = await capsule.isSessionActive();
      //const currentWalletAddress = Object.values(capsule.getWallets())?.[0]?.address;
      if (isLoggedIn) {
        const provider = new ethers.providers.JsonRpcProvider(
          CHAIN_PROVIDER,
          CHAIN
        );
        let signer = new CapsuleEthersSigner(capsule, provider);

        /* The following commented code is an alternative way to create a signer using the Web3Provider
         This code is currently commented out, but if uncommented, it will work
         This code checks if the Ethereum object is injected into the window object, which is done by MetaMask and similar wallets
         If the Ethereum object is present, a new Web3Provider is created using the Ethereum object
         The signer is then retrieved from the provider */
        // if (typeof window.ethereum !== "undefined") {
        //   const provider = new ethers.providers.Web3Provider(window.ethereum);
        //   signer = provider.getSigner();
        // }
        setSigner(signer);
      }
    };
    updateLoginStatus();

    const intervalId = setInterval(updateLoginStatus, 1000);
    return () => clearInterval(intervalId);
  }, []);

  return (
    <div className="App">
      {!signer && (
        <div style={styles.xmtpContainer}>
          <CapsuleButton
            style={styles.btnXmtp}
            capsule={capsule}
            appName={"XMTP PWA"}
          />
        </div>
      )}
      {signer && (
        <FloatingInbox isPWA={true} wallet={signer} onLogout={handleLogout} />
      )}
    </div>
  );
}

export default App;
