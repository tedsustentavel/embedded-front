import { Routes, Route } from "react-router-dom";
import { Home } from "../pages/Home/Home";
import { Layout } from "../pages/Layout";
import { Login } from "../pages/Login/Login";
import PrivateRoute from "./PrivateRoute";
import { AnonymousRoute } from "./AnonymousRoute";
import { NoMatch } from "../pages/NoMatch/NoMatch";
import { SignUp } from "../pages/SignUp/SignUp";
import { Test } from "../pages/Test/Test";

export default function App() {
  return (
    <Routes>
      <Route
        path="/login"
        element={
          <AnonymousRoute>
            <Login />
          </AnonymousRoute>
        }
      />
      <Route
        path="/sign-up"
        element={
          <AnonymousRoute>
            <SignUp />
          </AnonymousRoute>
        }
      />
      <Route
        path="/"
        element={
          <AnonymousRoute>
            <Layout />
          </AnonymousRoute>
        }
      />
      <Route
        element={
          <AnonymousRoute>
            <Layout />
          </AnonymousRoute>
        }
      >
        <Route path="/" element={<Home />} />
        <Route path="/test" element={<Test />} />
        <Route path="*" element={<NoMatch />} />
      </Route>
    </Routes>
  );
}
