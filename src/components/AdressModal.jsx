import { Button, FormControl, FormLabel, Input, Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay } from "@chakra-ui/react";


export default function AdressModal({ isOpenModal, onCloseModal }) {
    return (
        <Modal
            isOpen={isOpenModal}
            onClose={onCloseModal}
        >
            <ModalOverlay />
            <ModalContent>
                <ModalHeader>Atualize seu endereço</ModalHeader>
                <ModalCloseButton />
                <ModalBody pb={6}>
                    <FormControl>
                        <FormLabel>Cidade</FormLabel>
                        <Input autoFocus placeholder='First name' />
                    </FormControl>

                    <FormControl mt={4}>
                        <FormLabel>Estado</FormLabel>
                        <Input placeholder='Last name' />
                    </FormControl>
                </ModalBody>

                <ModalFooter>
                    <Button colorScheme='blue' mr={3}>
                        Save
                    </Button>
                    <Button onClick={onCloseModal}>Cancel</Button>
                </ModalFooter>
            </ModalContent>
        </Modal>
    )
}