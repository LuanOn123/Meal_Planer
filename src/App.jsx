import { Route, Routes } from "react-router-dom";
import { ScrollToHash } from "./components/layout/ScrollToHash.jsx";
import { SiteLayout } from "./components/layout/SiteLayout.jsx";
import { DownloadPage } from "./pages/DownloadPage.jsx";
import { LandingPage } from "./pages/LandingPage.jsx";

export default function App() {
  return (
    <>
      <ScrollToHash />
      <Routes>
        <Route element={<SiteLayout />}>
          <Route path="/" element={<LandingPage />} />
          <Route path="/download" element={<DownloadPage />} />
          <Route path="/download.html" element={<DownloadPage />} />
          <Route path="*" element={<LandingPage />} />
        </Route>
      </Routes>
    </>
  );
}
