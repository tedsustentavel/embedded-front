import { Outlet } from "react-router-dom";
import { Sidebar } from "../components/Sidebar/Sidebar";
import { Container, Flex } from "@chakra-ui/react";

export function Layout() {
  return (
    <Flex>
      <Sidebar>
        <Container>
          <Outlet />
        </Container>
      </Sidebar>
    </Flex>
  );
}
