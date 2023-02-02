import React from "react";

const States = () => {
  const [scanned, setScanned] = React.useState(false);

  return {
    scanned,
    setScanned,
  };
};

export default States;
