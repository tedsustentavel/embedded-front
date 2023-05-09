import { Outlet } from "react-router-dom";
import { Sidebar } from "../components/Sidebar/Sidebar";
import {
  Burger,
  Container,
  Drawer,
  Flex,
  Header,
  MediaQuery,
} from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";

export function Layout() {
  const [opened, { toggle, close }] = useDisclosure(false);

  return (
    <Flex>
      <MediaQuery smallerThan="sm" styles={{ display: "none" }}>
        <div>
          <Sidebar />
        </div>
      </MediaQuery>

      <Container style={{ flex: 1 }} p={40}>
        <MediaQuery largerThan="sm" styles={{ display: "none" }}>
          <Header height={40}>
            <Burger opened={opened} onClick={toggle} />
          </Header>
        </MediaQuery>

        <Drawer opened={opened} onClose={close} size="100%">
          <Sidebar />
        </Drawer>
        <Outlet />
      </Container>
    </Flex>
  );
}
