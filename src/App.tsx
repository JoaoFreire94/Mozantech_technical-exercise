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
                <Route path="/parts" element={<MainPage />}>
                    <Route path="/:part" element={<PartPage />} />
                </Route>
                <Route path="/*" element={<ErrorPage />} />
            </Routes>
        </BrowserRouter>
    );
}

export default App;
