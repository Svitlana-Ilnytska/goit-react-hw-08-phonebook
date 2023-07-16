import React, { useState } from "react";
import PropTypes from "prop-types";
import {
  useCreateContactMutation,
  useEditContactMutation,
  useFetchContactsQuery,
} from "../../redux/contacts/operations";
import { useAuth } from '../../hooks';

import {
  Button,
  Box,
  FormControl,
  FormLabel,
  Input,
  useToast,
} from "@chakra-ui/core";

export default function ContactForm({
  id,
  nameItem,
  numberItem,
  onCloseModal,
}) {
  const [name, setName] = useState(nameItem);
  const [number, setNumber] = useState(numberItem);
  const {token} = useAuth();

  const { data: contacts } = useFetchContactsQuery(token);
  const [createContact] = useCreateContactMutation();
  const [editContact] = useEditContactMutation();
  const toast = useToast();

  const handleChange = (e) => {
    const { name, value } = e.target;

    switch (name) {
      case "name":
        setName(value);
        break;

      case "number":
        setNumber(value);
        break;

      default:
        console.warn(`name - ${name} not matched`);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const contactName = {
      name: name,
      number: number,
    };

    const theSameContact = contacts?.some((contact) =>
      contact.name.toLowerCase().includes(contactName.name.toLowerCase())
    );

    if (id) {
      editContact({ id, contactName, token });
      onCloseModal();
      toast({
        title: "Contact saved.",
        description: "We've updated your contact.",
        status: "success",
        duration: 9000,
        isClosable: true,
      });
    } else if (theSameContact) {
      toast({
        title: "An error occurred.",
        description: `${contactName.name} is already in contacts.`,
        status: "error",
        duration: 9000,
        isClosable: true,
      });
    } else {
      createContact({ contactName, token });
      toast({
        title: "Contact added.",
        description: "We've created your contact.",
        status: "success",
        duration: 9000,
        isClosable: true,
      });
      reset();
    }
  };

  const reset = () => {
    setName("");
    setNumber("");
  };

  return (
    <Box my={8} textAlign="left">
      <form onSubmit={handleSubmit}>
        <FormControl>
          <FormLabel>Name </FormLabel>
          <Input
            type="text"
            name="name"
            value={name}
            onChange={handleChange}
            placeholder="Type name"
            pattern="^[a-zA-Zа-яА-Я\\s\\'-]+$"
            title="Name may contain only letters, apostrophe, dash and spaces. For example Adrian, Jacob Mercer, Charles de Batz de Castelmore d'Artagnan"
            required
          />
        </FormControl>

        <FormControl mt={4}>
          <FormLabel> Number</FormLabel>
          <Input
            type="tel"
            name="number"
            value={number}
            onChange={handleChange}
            placeholder="Type number"
            pattern="[+]?[0-9]{1,4}[-.\\s]?[()0-9]{1,3}[-.\\s]?[0-9]{1,4}[-.\\s]?[0-9]{1,4}[-.\\s]?[0-9]{1,9}"
            title="Phone number must be digits and can contain spaces, dashes, parentheses and can start with +"
            required
          />
        </FormControl>
        {id ? (
          <Button
            variantColor="teal"
            width="45%"
            borderWidth={1}
            mt={4}
            type="submit"
          >
            Save changes
          </Button>
        ) : (
          <Button
            variantColor="teal"
            width="full"
            borderWidth={1}
            mt={4}
            type="submit"
          >
            Add contact
          </Button>
        )}
      </form>
    </Box>
  );
}

ContactForm.propTypes = {
  id: PropTypes.string, 
  nameItem: PropTypes.string,
  numberItem: PropTypes.string,
  onCloseModal: PropTypes.func,
};

ContactForm.defaultProps = {
  id: "", 
  nameItem: "", 
  numberItem: "",
};