import React, { useState, useEffect } from "react";
import ReactSelect from "react-select";
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
  Select,
  Box,
  Flex, // Import Flex from Chakra UI for centering the button
} from "@chakra-ui/react";

const OrderModal = ({ isOpen, onClose, order, onAdd, onEdit, readOnly }) => {
  const [customerName, setCustomerName] = useState("");
  const [price, setPrice] = useState("");
  const [paid, setPaid] = useState("");
  const [selectedProducts, setSelectedProducts] = useState([]);

  useEffect(() => {
    if (order) {
      setCustomerName(order.customerName);
      setPrice(order.price);
      setPaid(String(order.paid)); // Convert boolean to string
      setSelectedProducts(order.products || []); // Initialize with existing order products
    } else {
      setCustomerName("");
      setPrice("");
      setPaid(""); // Set to empty string initially
      setSelectedProducts([]);
    }
  }, [order]);

  const handleSave = async () => {
    try {
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
        paid: paid === "true", // Convert string to boolean
        products: selectedProducts,
        lastModified: formattedDateTime,
      };
      if (order) {
        onEdit({ ...order, ...newOrder });
      } else {
        onAdd(newOrder);
      }

      // Make POST request to localhost:8080
      const response = await fetch("http://localhost:8080/data", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newOrder),
      });

      if (!response.ok) {
        throw new Error("Failed to save order");
      }

      onClose();
      window.location.reload();
    } catch (error) {
      console.error("Error saving order:", error);
    }
  };

  const productOptions = [
    { value: "product1", label: "Product 1" },
    { value: "product2", label: "Product 2" },
    { value: "product3", label: "Product 3" },
    { value: "product4", label: "Product 4" },
    { value: "product5", label: "Product 5" },
    // Add more products as needed
  ];

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>{order ? "Edit Order" : "Add Order"}</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <Box mb={4} width="100%" height="auto">
            <ReactSelect
              isMulti
              name="products"
              options={productOptions}
              className="basic-multi-select"
              classNamePrefix="select"
              value={selectedProducts}
              onChange={setSelectedProducts}
              isDisabled={readOnly}
            />
          </Box>
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
          <Select
            placeholder="Paid"
            value={paid}
            onChange={(e) => setPaid(e.target.value)}
            isReadOnly={readOnly}
            mt={4}
          >
            <option value="true">Yes</option>
            <option value="false">No</option>
          </Select>
        </ModalBody>
        {!readOnly && (
          <ModalFooter>
            <Flex width="100%" justifyContent="center">
              <Button colorScheme="teal" onClick={handleSave}>
                Save
              </Button>
            </Flex>
          </ModalFooter>
        )}
      </ModalContent>
    </Modal>
  );
};

export default OrderModal;
