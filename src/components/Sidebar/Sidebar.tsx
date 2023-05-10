import { useState } from "react";
import {
  Navbar,
  Group,
  Code,
  Switch,
  useMantineTheme,
  useMantineColorScheme,
} from "@mantine/core";
import {
  IconBuildingCircus,
  IconAntennaBars5,
  IconWifi,
  IconNotebook,
  IconDeviceHeartMonitor,
  IconLogout,
  IconSun,
  IconMoonStars,
} from "@tabler/icons-react";
import { useStyles } from "./styles";
import { Link, useLocation } from "react-router-dom";

const data = [
  { link: "/joker", label: "Joker", icon: IconBuildingCircus },
  { link: "/gsm", label: "GSM", icon: IconAntennaBars5 },
  { link: "/wifi", label: "Wi-Fi", icon: IconWifi },
  { link: "/fichario", label: "Fichario", icon: IconNotebook },
  { link: "/sensor", label: "Sensor", icon: IconDeviceHeartMonitor },
];

export function Sidebar() {
  const { pathname } = useLocation();
  const { classes, cx } = useStyles();
  const [active, setActive] = useState(pathname);
  const { colorScheme, toggleColorScheme } = useMantineColorScheme();
  const theme = useMantineTheme();

  const links = data.map((item) => (
    <Link
      className={cx(classes.link, {
        [classes.linkActive]: item.link === active,
      })}
      to={item.link}
      key={item.label}
      onClick={() => {
        setActive(item.link);
      }}
    >
      <item.icon className={classes.linkIcon} stroke={1.5} />
      <span>{item.label}</span>
    </Link>
  ));

  return (
    <Navbar height={700} width={{ sm: 250 }} p="md">
      <Navbar.Section grow>
        <Group className={classes.header} position="apart">
          Logo
          <Code sx={{ fontWeight: 700 }}>Version</Code>
        </Group>
        {links}
      </Navbar.Section>

      <Navbar.Section className={classes.footer}>
        <a
          href="#"
          className={classes.link}
          onClick={(event) => event.preventDefault()}
        >
          <IconLogout className={classes.linkIcon} stroke={1.5} />
          <span>Logout</span>
        </a>
      </Navbar.Section>

      <Group position="center" my={30}>
        <Switch
          checked={colorScheme === "dark"}
          onChange={() => toggleColorScheme()}
          size="lg"
          onLabel={<IconSun color={theme.white} size="1.25rem" stroke={1.5} />}
          offLabel={
            <IconMoonStars
              color={theme.colors.gray[6]}
              size="1.25rem"
              stroke={1.5}
            />
          }
        />
      </Group>
    </Navbar>
  );
}
