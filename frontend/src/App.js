import "@/App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { lazy, Suspense } from "react";
import ScrollProgressBar from "./components/ScrollProgressBar";

const Landing = lazy(() => import("./pages/Landing"));
const UserDashboard = lazy(() => import("./pages/UserDashboard"));
const AdminDashboard = lazy(() => import("./pages/AdminDashboard"));

function PageLoader() {
    return (
        <div className="min-h-screen flex items-center justify-center bg-white">
            <div className="size-12 rounded-2xl bg-brand-gradient animate-pulse" />
        </div>
    );
}

function App() {
    return (
        <div className="App font-body">
            <BrowserRouter>
                <ScrollProgressBar />
                <Suspense fallback={<PageLoader />}>
                    <Routes>
                        <Route path="/" element={<Landing />} />
                        <Route path="/dashboard" element={<UserDashboard />} />
                        <Route path="/admin" element={<AdminDashboard />} />
                    </Routes>
                </Suspense>
            </BrowserRouter>
        </div>
    );
}

export default App;
