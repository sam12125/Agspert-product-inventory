import React, { useState } from "react";
import { Box, Button, useDisclosure, Heading } from "@chakra-ui/react";
import OrderTable from "./OrderTable";
import AddOrderModal from "./AddOrderModal";
import EditOrderModal from "./EditOrderModal ";

const ActiveOrdersPage = () => {
  const [orders, setOrders] = useState([
    {
      id: 1,
      customerName: "Spider",
      price: 100,
      lastModified: "24/05/2024 (11:07 PM)",
    },
    {
      id: 2,
      customerName: "Spider",
      price: 120,
      lastModified: "24/05/2024 (11:09 PM)",
    },
  ]);
  const [selectedOrder, setSelectedOrder] = useState(null);

  const {
    isOpen: isAddOpen,
    onOpen: onAddOpen,
    onClose: onAddClose,
  } = useDisclosure();
  const {
    isOpen: isEditOpen,
    onOpen: onEditOpen,
    onClose: onEditClose,
  } = useDisclosure();

  const handleAddOrder = (newOrder) => {
    setOrders([
      ...orders,
      {
        ...newOrder,
        id: orders.length + 1,
        lastModified: new Date().toLocaleString(),
      },
    ]);
  };

  const handleEditOrder = (order) => {
    setSelectedOrder(order);
    onEditOpen();
  };

  const handleUpdateOrder = (id, updatedOrder) => {
    setOrders(
      orders.map((order) =>
        order.id === id
          ? {
              ...order,
              ...updatedOrder,
              lastModified: new Date().toLocaleString(),
            }
          : order
      )
    );
  };

  return (
    <Box p={4}>
      <Button colorScheme="teal" onClick={onAddOpen} mb={4}>
        + Sale Order
      </Button>
      <Heading as="h1" mb={4}>
        Active Orders
      </Heading>
      <OrderTable orders={orders} onEdit={handleEditOrder} />
      <AddOrderModal
        isOpen={isAddOpen}
        onClose={onAddClose}
        onAdd={handleAddOrder}
      />
      {selectedOrder && (
        <EditOrderModal
          isOpen={isEditOpen}
          onClose={onEditClose}
          order={selectedOrder}
          onUpdate={handleUpdateOrder}
        />
      )}
    </Box>
  );
};

export default ActiveOrdersPage;
