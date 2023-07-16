import React from "react";
import background from "../../assets/images/teal-image.jpg";
import { Stack, Text, Link } from "@chakra-ui/core";
import { NavLink } from "react-router-dom";

export default function HomePage() {
  return (
    <Stack>
      <div
        style={{
          width: "100%",
          height: "100vh",
          backgroundImage: `url(${background})`,
          backgroundPosition: "center",
          backgroundSize: "cover",
          overflow: "hidden",
          position: "fixed",
        }}
      >
        <Text fontSize="3xl" position="absolute" top="150px" right="300px">
          Welcome back
        </Text>
        <Text position="absolute" top="200px" right="276px">
          Don`t have an account? <Link as={NavLink} to="/register" color="blue.500" textDecoration='underline' >Sign In</Link>
        </Text>
      </div>
    </Stack>
  );
}