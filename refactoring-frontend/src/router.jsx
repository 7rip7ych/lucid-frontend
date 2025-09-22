import React from 'react';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./views/index";
import Doc from "./views/doc";

export default function App() {
    return (
    <BrowserRouter>
        <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/:id" element={<Doc />} />
        </Routes>
    </BrowserRouter>
    );
}
