import React from "react";
import { Route, Routes } from "react-router";
import Home from "./Pages/Home";
import Items from "./Components/Items";
import Login from "./Pages/Login";
import { ItemsProvider } from "./Context/Context";


const App: React.FC = () => {
  return (
    <div className="app">
    <ItemsProvider>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/home" element={<Home />} />
        <Route path="/items" element={<Items />} />
      </Routes>
    </ItemsProvider>
      
    </div>
  );
};

export default App;
