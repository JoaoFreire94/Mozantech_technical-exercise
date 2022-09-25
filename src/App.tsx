import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import "./styles/index.css";
import ErrorPage from "./containers/ErrorPage";
import MainPage from "./containers/MainPage";
import PartPage from "./containers/PartPage";

function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="parts">
                    <Route index element={<MainPage />} />
                    <Route path=":partName" element={<PartPage />} />
                </Route>
                <Route path="*" element={<ErrorPage />} />
            </Routes>
        </BrowserRouter>
    );
}

export default App;
