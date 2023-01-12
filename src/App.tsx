import { BrowserRouter, Route, Routes } from "react-router-dom"
import Modal from "react-modal"
import NotFound from "./pages/404"
import { URLProvider } from "./utils/URLProvider"
import LayoutOnePager from "./templates/LayoutOnePager";
import OnePager from "./pages/OnePager";
import Contact from "./pages/Contact";
import Terms from "./pages/Terms";
import Version from "./pages/Version"
import { useEffect } from "react";

function App() {
    Modal.setAppElement("#root")

    useEffect(() => {
        window.plausible =
            window.plausible ||
            function () {
                ;(window.plausible.q = window.plausible.q || []).push(arguments)
            }
    }, [])

    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<LayoutOnePager />}>
                    <Route index element={<OnePager />} />
                    <Route path={URLProvider.URL_CONTACT} element={<Contact />} />
                    <Route path={URLProvider.URL_TERMS} element={<Terms />} />
                    <Route path="*" element={<NotFound />} />
                </Route>
                <Route path="*" element={<NotFound />} />
                <Route path={URLProvider.URL_VERSION} element={<Version />} />
            </Routes>
        </BrowserRouter>
    )
}

export default App
