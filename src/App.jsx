import React from "react";
import ScrollIndicator from "./Component/Scroll Indicator/ScrollIndicator";

const App = () => {
  return (
    <div>
      <ScrollIndicator url={"https://dummyjson.com/products?limit=100"} />
    </div>
  );
};

export default App;
