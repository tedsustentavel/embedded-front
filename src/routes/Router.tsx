import { Routes, Route } from "react-router-dom";
import { Home } from "../pages/Home/Home";
import { Layout } from "../pages/Layout";
import { Login } from "../pages/Login/Login";
import PrivateRoute from "./PrivateRoute";
import { AnonymousRoute } from "./AnonymousRoute";
import { NoMatch } from "../pages/NoMatch/NoMatch";
import { FormPage } from "../pages/FormPage/FormPage";

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
        element={
          <PrivateRoute>
            <Layout />
          </PrivateRoute>
        }
      >
        <Route path="/" element={<Home />} />
        <Route path=":name" element={<FormPage />} />
        <Route path="*" element={<NoMatch />} />
      </Route>
    </Routes>
  );
}
