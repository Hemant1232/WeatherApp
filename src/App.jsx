import React from "react";
import Weather from "./components/Weather";
import backgroundImage from "./assets/background.png";

const App = () => {
  return (
    <div
      className="min-h-screen grid  "
      style={{ backgroundImage: `url(${backgroundImage})`,
      backgroundSize:'cover',
      backgroundPosition:'center',
      backgroundRepeat: 'no-repeat',
    
    }}
    >
      <Weather />
    </div>
  );
};

export default App;
