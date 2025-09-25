import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import Index from "./views/Index";
import Doc from "./views/Doc";

export default function App() {
    return (
    <BrowserRouter basename={import.meta.env.BASE_URL}>
        <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/:id" element={<Doc />} />
        </Routes>
    </BrowserRouter>
    );
}
