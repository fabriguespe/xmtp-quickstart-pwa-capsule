import React, { useEffect, useState } from "react";
import { FloatingInbox } from "./FloatingInbox-hooks";

const InboxPage = () => {
  const [signer, setSigner] = useState(null);
  const [loggingOut, setLoggingOut] = useState(false); // Add this line

  const handleLogout = async () => {
    setLoggingOut(true); // Set loggingOut to true when logout begins
    setLoggingOut(false); // Set loggingOut to false when logout ends
  };

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
      height: "100%",
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

  return (
    <div style={styles.uContainer}>
      <FloatingInbox isPWA={isPWA} wallet={signer} onLogout={handleLogout} />
    </div>
  );
};

export default InboxPage;
