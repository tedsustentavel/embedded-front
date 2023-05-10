import { Routes, Route } from "react-router-dom";
import { Home } from "../pages/Home/Home";
import { Layout } from "../pages/Layout";
import { Login } from "../pages/Login/Login";
import PrivateRoute from "./PrivateRoute";
import { AnonymousRoute } from "./AnonymousRoute";
import { NoMatch } from "../pages/NoMatch/NoMatch";
import { SignUp } from "../pages/SignUp/SignUp";
import { Joker } from "../pages/Joker/Joker";
import { Gsm } from "../pages/Gsm/Gsm";
import { Wifi } from "../pages/Wifi/Wifi";
import { Fichario } from "../pages/Fichario/Fichario";
import { Sensor } from "../pages/Sensor/Sensor";

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
        <Route path="/joker" element={<Joker />} />
        <Route path="/gsm" element={<Gsm />} />
        <Route path="/wifi" element={<Wifi />} />
        <Route path="/fichario" element={<Fichario />} />
        <Route path="/sensor" element={<Sensor />} />
        <Route path="*" element={<NoMatch />} />
      </Route>
    </Routes>
  );
}
