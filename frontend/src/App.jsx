import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Register from "./reusables/user/register.jsx";
import Login from "./reusables/user/login.jsx";
import Create from "./Create";
import Edit from "./edit.jsx";
import Display from "./Display";
import Home from "./Home";
import NoPage from "./reusables/NoPage";
import Header from "./reusables/Header.jsx";
import Footer from "./reusables/Footer.jsx";

const App = () => {
  return (
    <Router>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/page/:id" element={<Display />} />
        <Route path="/edit/:id" element={<Edit />} />
        <Route path="/create" element={<Create />} />
        <Route path="/edit" element={<Edit />} />
        <Route path="*" element={<NoPage />} />
      </Routes>
      <Footer />
    </Router>
  );
};

export default App;
