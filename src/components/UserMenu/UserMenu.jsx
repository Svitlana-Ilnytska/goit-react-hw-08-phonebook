import React from "react";

import {
  Box,
  Avatar,
  Button,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  MenuDivider,
  Flex,
  Text,
} from "@chakra-ui/core";

export default function UserMenu({ name, email, onLogOut }) {
  return (
    <div>
      <Box px={4} ml={3}>
        <Menu>
          <MenuButton
            as={Button}
            rounded={"full"}
            variant={"link"}
            cursor={"pointer"}
            minW={0}
            px={8}
          >
            <Avatar
              size={"sm"}
              src={"https://avatars.dicebear.com/api/male/username.svg"}
            />
          </MenuButton>
          <MenuList>
            <Flex justifyContent="center">
              <Box py={2}>
                <Avatar
                  size={"2xl"}
                  src={"https://avatars.dicebear.com/api/male/username.svg"}
                />
              </Box>
            </Flex>
            <Flex justifyContent="center" alignItems="center">
              <Box>
                <Text>{name}</Text>
                <Text fontSize="xs">{email}</Text>
              </Box>
            </Flex>
            <MenuDivider />
            <MenuItem
              alignItems="center"
              variantColor="teal"
              width="200px"
              borderWidth={1}
              type="button"
              onClick={onLogOut}
            >
              LogOut
            </MenuItem>
          </MenuList>
        </Menu>
      </Box>
    </div>
  );
}