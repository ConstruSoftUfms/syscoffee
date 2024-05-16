'use client'
import Config from "./settings";
import HomeAdmin from "./dashboard";
import React from "react";
import ProductRegistration from "./productRegistration";

const buttonStyle = {
  backgroundColor: '#7a3333',
  color: '#fff',
  padding: '10px 20px', 
  borderRadius: 20, 
  marginRight: 10,
};

export default function T() {
  const [activeSection, setActiveSection] = React.useState("homeAdmin");
  const handleClickHomeAdmin = () => {
    setActiveSection("HomeAdmin");
  };
  const handleClickConfig = () => {
    setActiveSection("Config");
  };
  const handleClickProductRegistration = () => {
    setActiveSection("ProductRegistration");
  };

  return (
    <>
      <div className="text-white text-center font-bold font-sans text-xl">
        Ambiente do Administrador
      </div>
      <div className="buttons">
        <button style={buttonStyle} onClick={handleClickHomeAdmin}>
          HomeAdmin
        </button>
        <button style={buttonStyle} onClick={handleClickConfig}>
          Configurações
        </button>
        <button style={buttonStyle} onClick={handleClickProductRegistration}>
            Registrar Produto
        </button>
      </div>
      {activeSection === "HomeAdmin" && <HomeAdmin />}
      {activeSection === "Config" && <Config />}
      {activeSection === "ProductRegistration" && <ProductRegistration />}
       <main className="flex flex-col items-center justify-center pt-24 h-screen relative"
          style={{
            backgroundImage:
              'url(https://static.vecteezy.com/system/resources/previews/023/010/450/non_2x/the-cup-of-latte-coffee-with-heart-shaped-latte-art-and-ai-generated-free-photo.jpg)',
            backgroundSize: 'cover',
            backgroundRepeat: 'no-repeat',
          }} >
          <div className="absolute inset-0 bg-black bg-opacity-50" />
          <div className="relative flex flex-col items-center">
            <h1
              className="text-7xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-zinc-50 to-blue-500"
            >
              SysCoffe
            </h1>
          </div>
        </main>
    </>
  );
}
// T.tsx
/*import React, { useState } from "react";
import ProductRegistration from "./productRegistration";

const buttonStyle = {
  backgroundColor: '#7a3333',
  color: '#fff',
  padding: '10px 20px', 
  borderRadius: 20, 
  marginRight: 10,
};

export default function T() {
  const [activeSection, setActiveSection] = useState("homeAdmin");

  const handleClickHomeAdmin = () => {
    setActiveSection("HomeAdmin");
  };
  
  const handleClickConfig = () => {
    setActiveSection("Config");
  };
  
  const handleClickProductRegistration = () => {
    setActiveSection("ProductRegistration");
  };

  return (
    <>
      <div className="text-white text-center font-bold font-sans text-xl">
        Ambiente do Administrador
      </div>
      <div className="buttons">
        <button style={buttonStyle} onClick={handleClickHomeAdmin}>
          HomeAdmin
        </button>
        <button style={buttonStyle} onClick={handleClickConfig}>
          Configurações
        </button>
        <button style={buttonStyle} onClick={handleClickProductRegistration}>
            Registrar Produto
        </button>
      </div>
      {activeSection === "HomeAdmin" && <HomeAdmin />}
      {activeSection === "Config" && <Config />}
      {activeSection === "ProductRegistration" && <ProductRegistration />}
    </>
  );
}*/

