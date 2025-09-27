import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import Index from "./views/Index";
import Doc from "./views/Doc";

export default function App() {
    return (
    <BrowserRouter>
        <Routes>
            <Route path="/lucid-frontend/" element={<Index />} />
            <Route path="/lucid-frontend/:id" element={<Doc />} />
        </Routes>
    </BrowserRouter>
    );
}
