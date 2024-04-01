

// App.js
import React from 'react';
import DeleteGroupModal from './components/DeleteGroup';
// import ToastModal from './components/Toasts';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "./components/pages/Layout";
import Home from "./components/pages/Home";
import Qlnv from "./components/pages/Qlnv";
import Privacy from "./components/pages/Privacy";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="Qlnv" element={<Qlnv />} />
          <Route path="privacy" element={<Privacy/>} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

// export default App;
 

export function DeleteGroup(){
  return (
    <DeleteGroupModal />
  );
}

