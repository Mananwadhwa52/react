// COMPONET NAME SHOULD BE IN UPPERCASE
import React from 'react';
import { createRoot } from 'react-dom/client';
import Chat from './components/Chat.jsx';
import './styles.css';

const App = () => {
  return (
    <div className="h-screen w-full">
      <Chat />
    </div>
  );
};

const root = document.getElementById("root");
const domRoot = createRoot(root);
domRoot.render(<App />);