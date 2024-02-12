import { BrowserRouter, Routes, Route } from "react-router-dom";
import Statements from './pages/StatementsPage/index.tsx';
import Learners from "./pages/LearnersPage/index.tsx";
import Demo from "./pages/DemoPage/index.tsx"
import SignIn from "./pages/SignInPage/index.tsx";
import SignUp from "./pages/SignUpPage/index.tsx";
import Profile from "./pages/ProfilePage/index.tsx";
import Header from "./components/Header.tsx";
import PrivateRoute from "./components/PrivateRoute.tsx";

export default function App() {
  return (
    <BrowserRouter>
      <Header />
      <div className="pt-16">
        <Routes>
          <Route path="/" element={<Statements />} />
          <Route path="/learners" element={<Learners />} />
          <Route path="/demo" element={<Demo />} />
          <Route element={<PrivateRoute />}>
            <Route path="profile" element={<Profile />} />
          </Route>
          <Route path="/sign-in" element={<SignIn />} />
          <Route path="/sign-up" element={<SignUp />} />
        </Routes>
      </div>
    </BrowserRouter>
  )
}
