import React, { useState, useEffect } from "react";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Button,
  Input,
} from "@chakra-ui/react";

const OrderModal = ({ isOpen, onClose, order, onAdd, onEdit, readOnly }) => {
  const [customerName, setCustomerName] = useState("");
  const [price, setPrice] = useState("");

  useEffect(() => {
    if (order) {
      setCustomerName(order.customerName);
      setPrice(order.price);
    } else {
      setCustomerName("");
      setPrice("");
    }
  }, [order]);

  const handleSave = () => {
    const now = new Date();
    const formattedDateTime = `${
      now.toISOString().split("T")[0]
    } (${now.toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit",
      hour12: true,
    })})`;
    const newOrder = {
      customerName,
      price,
      lastModified: formattedDateTime,
    };
    if (order) {
      onEdit({ ...order, ...newOrder });
    } else {
      onAdd(newOrder);
    }
    onClose();
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>{order ? "Edit Order" : "Add Order"}</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <Input
            placeholder="Customer Name"
            value={customerName}
            onChange={(e) => setCustomerName(e.target.value)}
            isReadOnly={readOnly}
          />
          <Input
            placeholder="Price"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            isReadOnly={readOnly}
            mt={4}
          />
        </ModalBody>
        {!readOnly && (
          <ModalFooter>
            <Button colorScheme="teal" onClick={handleSave}>
              Save
            </Button>
          </ModalFooter>
        )}
      </ModalContent>
    </Modal>
  );
};

export default OrderModal;
