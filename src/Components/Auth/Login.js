import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button, Input, Box } from "@chakra-ui/react";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = () => {
    if (username === "user" && password === "pass") {
      localStorage.setItem("auth", true);
      navigate("/active-orders");
    }
  };

  return (
    <Box
      style={{
        width: "30%",
        boxShadow: "rgba(0, 0, 0, 0.35) 0px 5px 15px",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        margin: "auto",
        gap: "20px",
        padding: "10px",
      }}
    >
      <Input
        placeholder="Username"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
      />
      <Input
        placeholder="Password"
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <Button onClick={handleLogin}>Login</Button>
    </Box>
  );
};

export default Login;
