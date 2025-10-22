import { ReactNode, useContext, useEffect, useState } from "react";
import {
  IconButton,
  Box,
  CloseButton,
  Flex,
  Icon,
  useColorModeValue,
  Drawer,
  DrawerContent,
  useDisclosure,
  BoxProps,
  FlexProps,
  useColorMode,
  Spinner
} from "@chakra-ui/react";
import { FiLogOut, FiMenu, FiMoon, FiSun } from "react-icons/fi";
import { IconType } from "react-icons";
import { getSidebarPages } from "../../services/config";
import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";
import tdrrLogo from "/logo-tdrr.png";
import { AuthContext, AuthContextType } from "../../hooks/auth";

export function Sidebar({ children }: { children: ReactNode }) {
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <Box minH="100vh" minW="100vw" >
      <SidebarContent
        style={{overflowY: 'auto'}}
        onClose={onClose}
        display={{ base: "none", md: "block" }}
      />
      <Drawer
        autoFocus={false}
        isOpen={isOpen}
        placement="left"
        onClose={onClose}
        returnFocusOnClose={false}
        onOverlayClick={onClose}
        size="full"
      >
        <DrawerContent>
          <SidebarContent onClose={onClose} style={{overflowY: 'auto'}} />
        </DrawerContent>
      </Drawer>
      {/* mobilenav */}
      <MobileNav display={{ base: "flex", md: "none" }} onOpen={onOpen} />

      <Flex ml={{ base: 0, md: 60 }} p="4">
        {children}
      </Flex>
    </Box>
  );
}

interface SidebarProps extends BoxProps {
  onClose: () => void;
}

const SidebarContent = ({ onClose, ...rest }: SidebarProps) => {
  const { signOut } = useContext(AuthContext) as AuthContextType;
  const { colorMode, toggleColorMode } = useColorMode();
  const [items, setItems] = useState<string[]>([]);

  async function fetchItems() {
    const result = await getSidebarPages();

    setItems(result.data.substring(2, result.data.length - 2).split("', '"));
  }

  useEffect(() => {
    fetchItems();
  }, []);

  return (
    <Box
      borderRight="1px"
      borderRightColor={useColorModeValue("gray.200", "gray.700")}
      w={{ base: "full", md: 60 }}
      pos="fixed"
      h="full"
      {...rest}
    >
      <Flex
        h="20"
        alignItems="center"
        p={[2, 2]}
        w="100%"
        justifyContent="space-between"
      >
        <Flex maxW="250px"  style={{height: '100%'}}>
          <img src={tdrrLogo} alt="Logo" />
        </Flex>

        <CloseButton display={{ base: "flex", md: "none" }} onClick={onClose} />
      </Flex>

      {items.length === 0 ? (
        <Flex justify="center" my={24}>
          <Spinner
            thickness="4px"
            speed="0.65s"
            emptyColor="gray.200"
            color="blue.500"
            size="xl"
          />
        </Flex>
      ) : (
        items.map((item) => <NavItem key={item} label={item} />)
      )}

      <Flex justify="center" my={4}>
        <IconButton
          onClick={signOut}
          icon={<FiLogOut />}
          aria-label="dark-mode"
        />
      </Flex>

      <Flex justify="center" my={4}>
        <IconButton
          onClick={toggleColorMode}
          icon={colorMode === "dark" ? <FiSun /> : <FiMoon />}
          aria-label="dark-mode"
        />
      </Flex>
    </Box>
  );
};

interface NavItemProps extends FlexProps {
  icon?: IconType;
  label: string;
}

const NavItem = ({ icon, label }: NavItemProps) => {
  const { name } = useParams();

  return (
    <Link
      to={`${label}`}
      style={{
        textDecoration: "none",
        textTransform: "capitalize",
      }}
    >
      <Flex
        align="center"
        p="4"
        mx="4"
        borderRadius="lg"
        role="group"
        cursor="pointer"
        style={{
          backgroundColor: label === name ? "#00B3FF" : "transparent",
        }}
      >
        {icon && (
          <Icon
            mr="4"
            fontSize="16"
            _groupHover={{
              color: "white",
            }}
            as={icon}
          />
        )}
        {label}
      </Flex>
    </Link>
  );
};

interface MobileProps extends FlexProps {
  onOpen: () => void;
}

const MobileNav = ({ onOpen, ...rest }: MobileProps) => {
  return (
    <Flex
      ml={{ base: 0, md: 60 }}
      px={{ base: 4, md: 24 }}
      height="20"
      alignItems="center"
      borderBottomWidth="1px"
      justifyContent="flex-start"
      {...rest}
    >
      <IconButton
        variant="outline"
        onClick={onOpen}
        aria-label="open menu"
        icon={<FiMenu />}
      />

      <Flex height="70%" ml={4}>
        <img src={tdrrLogo} alt="Logo" />
      </Flex>
    </Flex>
  );
};
