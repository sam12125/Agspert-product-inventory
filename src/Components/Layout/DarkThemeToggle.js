import { useColorMode, Button } from "@chakra-ui/react";

const DarkThemeToggle = () => {
  const { colorMode, toggleColorMode } = useColorMode();

  return (
    <Button onClick={toggleColorMode}>
      Toggle {colorMode === "light" ? "Dark" : "Light"}
    </Button>
  );
};

export default DarkThemeToggle;
