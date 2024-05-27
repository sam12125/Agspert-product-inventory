import React, { useState } from "react";
import { Box, Heading, useDisclosure, Button } from "@chakra-ui/react";
import OrderTable from "./OrderTable";
import OrderModal from "./AddOrderModal"; // Assume this is the modal component

const CompletedOrdersPage = () => {
  const [orders, setOrders] = useState([
    // Sample data
    {
      id: 1,
      customerName: "John Doe",
      price: 100,
      lastModified: "2024-05-24 (10:50 PM)",
    },
    {
      id: 2,
      customerName: "Jane Smith",
      price: 150,
      lastModified: "2024-05-23 (08:35 PM)",
    },
  ]);
  const [selectedOrder, setSelectedOrder] = useState(null);
  const { isOpen, onOpen, onClose } = useDisclosure();

  const handleAddOrder = () => {
    setSelectedOrder(null); // Clear selected order when adding a new one
    onOpen();
  };

  const handleEdit = (order) => {
    setSelectedOrder(order);
    onOpen();
  };

  const addOrder = (newOrder) => {
    setOrders([...orders, { id: orders.length + 1, ...newOrder }]);
  };

  const editOrder = (updatedOrder) => {
    setOrders(
      orders.map((order) =>
        order.id === updatedOrder.id ? updatedOrder : order
      )
    );
  };

  return (
    <Box style={{ padding: "15px" }}>
      <Button colorScheme="teal" onClick={handleAddOrder} mb={4}>
        + Sale Order
      </Button>
      <Heading as="h1" mb={4}>
        Completed Sale Orders
      </Heading>
      <OrderTable orders={orders} onEdit={handleEdit} readOnly />
      <OrderModal
        isOpen={isOpen}
        onClose={onClose}
        order={selectedOrder}
        onAdd={addOrder}
        onEdit={editOrder}
        readOnly={selectedOrder !== null}
      />
    </Box>
  );
};

export default CompletedOrdersPage;
