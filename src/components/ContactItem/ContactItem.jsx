import React from "react";
import PropTypes from "prop-types";
import ContactForm from "../ContactForm/ContactForm";
import {
  Button,
  Heading,
  Text,
  Flex,
  Icon,
  Avatar,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalCloseButton,
} from "@chakra-ui/core";

import { useDisclosure } from "@chakra-ui/core";

export default function ContactItem({ id, name, number, onDeleteContact }) {
  const { isOpen, onOpen, onClose } = useDisclosure();

  const initialRef = React.useRef();
  const finalRef = React.useRef();

  return (
    <>
      <Flex
        py={2}
        px={2}
        borderRadius="md"
        bg="white.50"
        w="full"
        border="1px"
        borderColor="teal.500"
        my={1}
        justifyContent="space-between"
        alignItems="center"
      >
        <Flex>
          <Avatar mr={4} />
          <Flex flexDirection="column" alignItems="flex-start">
            <Heading fontSize={18} color="teal.900">
              {name}
            </Heading>
            <Text>
              <a href={`tel:${number}`}> {number}</a>
            </Text>
          </Flex>
        </Flex>

        <Flex>
          <Button
            variantColor="teal"
            variant="outline"
            width="100px"
            type="button"
            onClick={onOpen}
          >
            Edit <Icon name="edit" size="18px" ml={3} />
          </Button>

          <Button
            ml={3}
            variantColor="teal"
            width="100px"
            type="button"
            onClick={onDeleteContact}
          >
            Delete <Icon name="delete" size="18px" ml={3} />
          </Button>
        </Flex>
      </Flex>

      <Modal
        disableEnforceFocus={false}
        initialFocusRef={initialRef}
        finalFocusRef={finalRef}
        isOpen={isOpen}
        onClose={onClose}
      >
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Edit your contact</ModalHeader>
          <ModalCloseButton />
          <ModalBody px={6}>
            <ContactForm
              id={id}
              nameItem={name}
              numberItem={number}
              onCloseModal={onClose}
            />

            <Button
              onClick={onClose}
              width="45%"
              position="absolute"
              top="270px"
              right="28px"
            >
              Cancel
            </Button>
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
}

ContactItem.propTypes = {
  name: PropTypes.string.isRequired,
  number: PropTypes.string.isRequired,
  onDeleteContact: PropTypes.func.isRequired,
};