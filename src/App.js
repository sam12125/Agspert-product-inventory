import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import { ChakraProvider } from "@chakra-ui/react";
import Login from "./Components/Auth/Login";
import ActiveOrdersPage from "./Components/Pages/ActiveOrdersPage";
import CompletedOrdersPage from "./Components/Pages/CompletedOrdersPage";
import Navbar from "./Components/Layout/Navbar";
import DarkThemeToggle from "./Components/Layout/DarkThemeToggle";
import theme from "./Components/Theme/Theme";

const PrivateRoute = ({ children }) => {
  const isAuth = localStorage.getItem("auth");
  return isAuth ? children : <Navigate to="/login" />;
};

const App = () => {
  return (
    <ChakraProvider theme={theme}>
      <Router>
        <Navbar />
        <DarkThemeToggle />
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route
            path="/active-orders"
            element={
              <PrivateRoute>
                <ActiveOrdersPage />
              </PrivateRoute>
            }
          />
          <Route
            path="/completed-orders"
            element={
              <PrivateRoute>
                <CompletedOrdersPage />
              </PrivateRoute>
            }
          />
          <Route path="*" element={<Navigate to="/login" />} />
        </Routes>
      </Router>
    </ChakraProvider>
  );
};

export default App;
