import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import LOGIN from "./components/login";
import "./App.css";
import SIGNUP from "./components/Signup";
import HOME from "./components/Home";
import { Toaster } from "react-hot-toast";
import { useAuthContext } from "./context/AuthContext";
import ShootingStars from "./components/ui/ShootingStars";
import StarsBackground from "./components/ui/StarsBackground";
function App() {
  const { authUser } = useAuthContext();
  return (
    <>
      <div className="relative w-screen h-screen overflow-hidden bg-black">
        <ShootingStars />
        <StarsBackground />
      </div>
      <Router>
        <Routes>
          <Route
            path="/"
            element={authUser ? <HOME /> : <Navigate to="/login" />}
          />
          <Route
            path="/login"
            element={authUser ? <Navigate to="/" /> : <LOGIN />}
          />
          <Route
            path="/signup"
            element={authUser ? <Navigate to="/" /> : <SIGNUP />}
          />
        </Routes>
      </Router>
      <Toaster />
    </>
  );
}

export default App;
