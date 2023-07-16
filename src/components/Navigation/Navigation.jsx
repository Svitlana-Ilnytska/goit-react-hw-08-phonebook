import React from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useLogOutUserMutation } from "../../redux/auth/operations";
import { setlogOut } from "../../redux/auth/slice";
import { useAuth } from "../../hooks";
import UserMenu from "../UserMenu/UserMenu";
import { NavLink } from "react-router-dom";
import { Box, Flex, Link, Image, Stack, Text, useToast } from "@chakra-ui/core";

import { useColorMode, IconButton } from "@chakra-ui/core";

export default function Navigation() {
  const { colorMode, toggleColorMode } = useColorMode();

  const [logout] = useLogOutUserMutation();

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const toast = useToast();
  const { isLoggedIn } = useAuth();
  const { user } = useAuth();


    const logoutUser = async () => {
    try {
      const result = await logout();
      if (result.data) {
        dispatch(setlogOut());
        navigate("/login");
      }
    } catch (err) {
      toast({
        title: "Error.",
        description: "Something wrong.",
        status: "error",
        duration: 9000,
        isClosable: true,
      })
    }
  }

  return (
    <>
      <Box px={8} bg={colorMode === "light" ? "gray.100" : "gray.900"}>
        <Flex h={16} alignItems={"center"} justifyContent={"space-between"}>
          <Link as={NavLink} to="/">
            <Flex alignItems=" center" px={4}>
              <Image
                src="https://png.pngtree.com/png-vector/20191018/ourlarge/pngtree-ukraine-icon-circle-png-image_1817366.jpg"
                size="35px"
                mr={3}
                rounded
              />
              <Text> Ukrainian phonebook</Text>
            </Flex>
          </Link>

          <Flex alignItems={"center"}>
            <Box>
              <IconButton
                icon={colorMode === "light" ? "moon" : "sun"}
                onClick={toggleColorMode}
              />
            </Box>

            <Stack direction={"row"} spacing={7}>
              {user && isLoggedIn ? (
                <UserMenu
                  name={user.name}
                  email={user.email}
                  onLogOut={() => logoutUser()}
                />
              ) : (
                <>
                  <Link px={4} ml={3} as={NavLink} to="/register">
                    Sign Up
                  </Link>
                  <Link px={4} as={NavLink} to="/login">
                    Log In
                  </Link>
                </>
              )}
            </Stack>
          </Flex>
        </Flex>
      </Box>
    </>
  );
}