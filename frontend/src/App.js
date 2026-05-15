import "@/App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { lazy, Suspense } from "react";
import ScrollProgressBar from "./components/ScrollProgressBar";

const Landing = lazy(() => import("./pages/Landing"));
const UserDashboard = lazy(() => import("./pages/dashboard/UserDashboard"));
const AdminDashboard = lazy(() => import("./pages/admin/AdminDashboard"));

const Privacy = lazy(() => import("./pages/legal/Privacy"));
const Terms = lazy(() => import("./pages/legal/Terms"));
const Security = lazy(() => import("./pages/legal/Security"));
const Cookies = lazy(() => import("./pages/legal/Cookies"));

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
                        <Route path="/privacy" element={<Privacy />} />
                        <Route path="/terms" element={<Terms />} />
                        <Route path="/security" element={<Security />} />
                        <Route path="/cookies" element={<Cookies />} />
                    </Routes>
                </Suspense>
            </BrowserRouter>
        </div>
    );
}

export default App;
