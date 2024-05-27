import React from "react";
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
  FormLabel,
  FormControl,
} from "@chakra-ui/react";
import { useForm, Controller } from "react-hook-form";

const EditOrderModal = ({ isOpen, onClose, order, onUpdate }) => {
  const { handleSubmit, control, reset } = useForm({
    defaultValues: {
      customerName: order.customerName,
      price: order.price,
    },
  });

  const onSubmit = (data) => {
    onUpdate(order.id, data);
    reset();
    onClose();
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Edit Order</ModalHeader>
        <ModalCloseButton />
        <form onSubmit={handleSubmit(onSubmit)}>
          <ModalBody>
            <FormControl>
              <FormLabel>Customer Name</FormLabel>
              <Controller
                name="customerName"
                control={control}
                render={({ field }) => <Input {...field} />}
              />
            </FormControl>
            <FormControl mt={4}>
              <FormLabel>Price (₹)</FormLabel>
              <Controller
                name="price"
                control={control}
                render={({ field }) => <Input {...field} />}
              />
            </FormControl>
          </ModalBody>
          <ModalFooter>
            <Button colorScheme="blue" mr={3} type="submit">
              Update
            </Button>
            <Button onClick={onClose}>Cancel</Button>
          </ModalFooter>
        </form>
      </ModalContent>
    </Modal>
  );
};

export default EditOrderModal;
