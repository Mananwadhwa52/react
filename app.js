// COMPONET NAME SHOULD BE IN UPPERCASE
import React from 'react';
import { createRoot } from 'react-dom/client';


const Elent=()=>{
    return React.createElement("h1",{id:"heading"},"hlo worbhgld!")
}

let root=document.getElementById("root");
let domroot=createRoot(root);
domroot.render(<Elent />)