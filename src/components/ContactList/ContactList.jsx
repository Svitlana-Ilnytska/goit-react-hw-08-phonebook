import React from "react";
import { useSelector } from "react-redux";
import {
  useFetchContactsQuery,
  useDeleteContactMutation,
} from "../../redux/contacts/operations";
import { useAuth } from '../../hooks';
import ContactItem from "../ContactItem/ContactItem";

import {
  ListItem,
  List,
} from "@chakra-ui/core";

const filterAllContacts = (contacts, filter) => {
  return contacts?.filter((contact) =>
    contact.name.toLowerCase().includes(filter.toLowerCase())
  );
};

const ContactList = () => {
  const {token} = useAuth();
  const { data: contacts } = useFetchContactsQuery(token);

  const filterAll = useSelector((state) => state.filter);
  const items = filterAllContacts(contacts, filterAll);

  const [deleteContact] = useDeleteContactMutation();

  return (
    <List spacing={3} borderWidth="1px" rounded="md" overflow="hidden">
      {items?.map(({ id, name, number }) => (
        <ListItem key={id}>
          <ContactItem
            id={id}
            name={name}
            number={number}
            onDeleteContact={() => deleteContact({ id, token })}
          />
        </ListItem>
      ))}
    </List>
  );
};

export default ContactList;