import React from "react";

const States = () => {
  const [scanned, setScanned] = React.useState(false);

  const [userId, setUserId] = React.useState("");

  return {
    scanned,
    setScanned,
    userId,
    setUserId,
  };
};

export default States;
