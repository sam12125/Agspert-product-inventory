import React, { useState, useEffect } from "react";
import { Box, Heading, useDisclosure, Button } from "@chakra-ui/react";
import OrderTable from "./OrderTable";
import OrderModal from "./AddOrderModal";

const CompletedOrdersPage = () => {
  const [orders, setOrders] = useState([]);
  const [selectedOrder, setSelectedOrder] = useState(null);
  const { isOpen, onOpen, onClose } = useDisclosure();

  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders = async () => {
    try {
      const resp = await fetch("https://json-server-1-qh4z.onrender.com/data");
      const data = await resp.json();
      const completedOrders = data.filter((order) => order.paid === true);
      setOrders(completedOrders);
    } catch (error) {
      console.error("Error fetching orders:", error);
    }
  };

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
