// COMPONET NAME SHOULD BE IN UPPERCASE
import React from "react";
import ReactDOM from "react-dom/client";
import Chat from './components/Chat.jsx';
import './styles.pcss';


const App = () => {
  return (
    <div className="h-screen w-full">
      <Chat />
    </div>
  );
};

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<App />);