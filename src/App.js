import React from "react";
import InboxPage from "./InboxPage-hooks";
import "./index.css";
// With the Modal, User and Wallet Creation are handled automatically!
import Capsule, { Environment } from "@usecapsule/web-sdk";

const capsule = new Capsule(
  Environment.BETA,
  YOUR_API_KEY,
  {
    offloadMPCComputationURL:
      "https://partner-mpc-computation.beta.usecapsule.com",
  } // add your offload URL and opts here
);

function App() {
  return (
    <div className="App">
      <div>text</div>
    </div>
  );
}

export default App;
