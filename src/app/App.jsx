import { Routes, Route } from "react-router-dom";
import AppProvider from "./AppProvider";
import Home from "../pages/Home";

export default function App() {
  return (
    <AppProvider>
      <Routes>
        <Route path="/" element={<Home />} />
      </Routes>
    </AppProvider>
  );
}
