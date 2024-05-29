import React, { useState, useEffect } from "react";
import { Box, Button, useDisclosure, Heading } from "@chakra-ui/react";
import OrderTable from "./OrderTable";
import AddOrderModal from "./AddOrderModal";
import EditOrderModal from "./EditOrderModal";

const ActiveOrdersPage = () => {
  const [orders, setOrders] = useState([]);
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

  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders = async () => {
    try {
      const resp = await fetch("http://localhost:8080/data");
      const data = await resp.json();
      const activeOrders = data.filter((order) => order.paid === true);
      setOrders(activeOrders);
    } catch (error) {
      console.error("Error fetching orders:", error);
    }
  };

  const handleAddOrder = (newOrder) => {
    setOrders([
      ...orders,
      {
        ...newOrder,
        id: orders.length + 1,
        lastModified: new Date().toLocaleString(),
        paid: true, // Assuming new orders are paid by default
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
        Active Sale Orders
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
