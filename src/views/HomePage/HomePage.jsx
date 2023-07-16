import React from "react";

import ContactForm from "../../components/ContactForm/ContactForm";
import Filter from "../../components/Filter/Filter";
import ContactList from "../../components/ContactList/ContactList";

import { Box, Heading, Flex } from "@chakra-ui/core";

export default function ContactsPage() {
  return (
    <div>
      <Flex
        minHeight="100vh"
        width="full"
        align="start"
        justifyContent="space-around"
        py={12}
      >
        <Box
          borderWidth={1}
          px={4}
          width="full"
          maxWidth="500px"
          borderRadius={4}
          textAlign="center"
          boxShadow="lg"
        >
          <Heading className="text-center">Phonebook</Heading>
          <ContactForm />
        </Box>
        <Box
          px={4}
          width="full"
          maxWidth="600px"
          borderRadius={4}
          textAlign="center"
        >
          <Heading>Contacts</Heading>
          <Filter />
          <ContactList />
        </Box>
      </Flex>
    </div>
  );
}