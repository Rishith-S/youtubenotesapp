import { Routes, Route } from "react-router-dom";
import "../src/index.css";
import Layout from "./components/Layout";
import Homescreen from "./screens/Homescreen";

const App = () => {
  return (
    <Routes >
      <Route element={<Layout />}>
        <Route path="/" element={<Homescreen />} />
      </Route>
    </Routes>
  )
};

export default App;
