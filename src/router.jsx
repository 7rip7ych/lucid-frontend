import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./views/Index";
import Doc from "./views/Doc";

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
