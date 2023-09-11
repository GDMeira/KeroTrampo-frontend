import { Button, Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay, Select, Spinner } from "@chakra-ui/react";
import axios from "axios";
import { requisitions } from "../routes/routes";
import { useEffect, useState } from "react";
import { useUser } from "../customHooks/User";


export default function AdressModal({ isOpenModal, onCloseModal }) {
    const [user, setAdress] = useUser(state => [state.user, state.setAdress]);
    const [serviceParams, setServiceParams] = useState(undefined);

    const [formData, setFormData] = useState({
        state: user?.adress.state || '',
        city: user?.adress.city || ''
    });

    useEffect(() => {
        axios.get(requisitions.getAllParams)
            .then(resp => {
                console.log(resp.data);
                setServiceParams(resp.data);
            })
            .catch(error => alert(error.response.data.message));
    }, []);

    function handleInputChange(e) {
        let newData;
        const { name, value } = e.target;
        newData = {
            ...formData,
            [name]: value
        }

        setFormData(newData);
    };

    function handleSubmit(e) {
        const newAdress = {
                city: formData.city,
                state: formData.state
        }
        setAdress(newAdress);
        console.log(user)
        //if (user.token) 

        onCloseModal();
    }


    return (
        <Modal
            isOpen={isOpenModal}
            onClose={onCloseModal}
        >
            <ModalOverlay />
            <ModalContent>
                {!serviceParams ? (<Spinner size='xl' />) : (
                    <>
                        <ModalHeader>Atualize seu endereço</ModalHeader>
                        <ModalCloseButton />
                        <ModalBody pb={6}>
                            <Select
                                name="state"
                                placeholder="Estado"
                                value={formData.state}
                                onChange={handleInputChange}
                                mt={2}
                            >
                                {serviceParams.locations.map((location) => (
                                    <option key={location.name} value={location.name}>
                                        {location.name}
                                    </option>
                                ))}
                            </Select>
                            <Select
                                name="city"
                                placeholder="Cidade"
                                value={formData.city}
                                onChange={handleInputChange}
                                mt={2}
                            >
                                {serviceParams.locations.find(location => location.name === formData.state)?.cities.map((city) => (
                                    <option key={city} value={city}>
                                        {city}
                                    </option>
                                ))}
                            </Select>
                        </ModalBody>

                        <ModalFooter>
                            <Button colorScheme='blue' mr={3} onClick={handleSubmit}>
                                Save
                            </Button>
                            <Button onClick={onCloseModal}>Cancel</Button>
                        </ModalFooter>
                    </>
                )}
            </ModalContent>
        </Modal>
    )
}