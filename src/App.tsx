import { Routes, Route } from "react-router-dom";
import "../src/index.css";
import Layout from "./components/Layout";
import Homescreen from "./screens/Homescreen";
import PlaylistScreen from "./screens/PlaylistScreen";

const App = () => {
  return (
    <Routes >
      <Route element={<Layout />}>
        <Route path="/" element={<Homescreen />} />
        <Route path="/playlist/:id" element={<PlaylistScreen />} />
      </Route>
    </Routes>
  )
};

export default App;
