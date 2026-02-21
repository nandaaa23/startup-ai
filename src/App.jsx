import { Routes, Route } from "react-router-dom";
import HelixLanding from "./front.jsx";
import IdeaPage from "./Ideapage.jsx";
import StructurePage from "./Structure.jsx";
import Checklist from "./Checklist.jsx";
import PitchDeck from "./PitchDeck.jsx";

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<HelixLanding />} />
      <Route path="/idea" element={<IdeaPage />} />
      <Route path="/structure" element={<StructurePage />} />
      <Route path="/checklist" element={<Checklist />} />
       <Route path="/funding" element={<PitchDeck />} />
    </Routes>
  );
}


