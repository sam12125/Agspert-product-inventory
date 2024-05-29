import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { Box, Flex, Button } from "@chakra-ui/react";

const Navbar = () => {
  const handleLogout = () => {
    localStorage.removeItem("auth");
  };

  return (
    <Box bg="teal.500" p={4}>
      <Flex justify="space-between">
        <Box>
          <Link to="/active-orders">
            <Button colorScheme="teal" variant="ghost">
              Active Orders
            </Button>
          </Link>
          <Link to="/completed-orders">
            <Button colorScheme="teal" variant="ghost">
              Completed Orders
            </Button>
          </Link>
        </Box>
        <Box>
          <Link to="/login">
            <Button colorScheme="teal" variant="ghost" onClick={handleLogout}>
              Logout
            </Button>
          </Link>
        </Box>
      </Flex>
    </Box>
  );
};

export default Navbar;
