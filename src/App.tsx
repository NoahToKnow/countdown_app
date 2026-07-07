import { HashRouter, Routes, Route } from "react-router-dom";
import Dashboard from "./pages/Dashboard";
import Widget from "./pages/Widget";
import NotFound from "./pages/NotFound";

export default function App() {
  return (
    <HashRouter>
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/widget/:id" element={<Widget />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </HashRouter>
  );
}
