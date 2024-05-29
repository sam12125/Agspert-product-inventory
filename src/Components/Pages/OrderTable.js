import React from "react";
import { Table, Thead, Tbody, Tr, Th, Td, Button } from "@chakra-ui/react";
import { EditIcon } from "@chakra-ui/icons";

const OrderTable = ({ orders, onEdit, readOnly }) => {
  return (
    <Table variant="simple">
      <Thead>
        <Tr>
          <Th>ID</Th>
          <Th>Customer Name</Th>
          <Th>Price (₹)</Th>
          <Th>Last Modified</Th>
          <Th>Edit/View</Th>
        </Tr>
      </Thead>
      <Tbody>
        {orders.map((order) => (
          <Tr key={order.id}>
            <Td>{order.id}</Td>
            <Td>{order.customerName}</Td>
            <Td>{order.price}</Td>
            <Td>{order.lastModified}</Td>
            <Td>
              <Button size="sm" onClick={() => onEdit(order)}>
                <EditIcon />
              </Button>
            </Td>
          </Tr>
        ))}
      </Tbody>
    </Table>
  );
};

export default OrderTable;
