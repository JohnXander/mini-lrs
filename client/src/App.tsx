import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from './pages/Home.tsx';
import SignIn from "./pages/SignInPage/index.tsx";
import SignUp from "./pages/SignUpPage/index.tsx";
import About from "./pages/About.tsx";
import Profile from "./pages/Profile.tsx";
import Header from "./components/Header.tsx";
import PrivateRoute from "./components/PrivateRoute.tsx";

export default function App() {
  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/sign-in" element={<SignIn />} />
        <Route path="/sign-up" element={<SignUp />} />
        <Route path="/about" element={<About />} />
        <Route element={<PrivateRoute />}>
          <Route path="profile" element={<Profile />} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}
