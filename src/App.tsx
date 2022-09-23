import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import "./App.css";
import MainPage from "./containers/MainPage";
import PartsPage from "./containers/PartsPage";

function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<MainPage />} />
                <Route path="parts" element={<PartsPage />} />
            </Routes>
        </BrowserRouter>
    );
}

export default App;
