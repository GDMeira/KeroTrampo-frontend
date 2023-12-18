import { useEffect, useState } from "react";
import { useUser } from "../customHooks/User";
import styled from "styled-components";
import { Input, Select, Spinner, Stack, useToast } from "@chakra-ui/react";
import axios from "axios";
import { headersAuth, requisitions } from "../routes/routes";

export default function ProviderForm() {
    const [user, setUser] = useUser(state => [state.user, state.setUser]);

    const [serviceParams, setServiceParams] = useState(undefined);

    const [formStates, setFormStates] = useState({
        state: user?.adress.state || '',
        city: user?.adress.city || '',
        streetAvenue: user?.adress.streetAvenue || '',
        number: user?.adress.number || '',
        complement: user?.adress.complement || '',
        description: user?.description || '',
    })

    const [disable, setDisable] = useState(false);

    const toast = useToast();

    useEffect(() => {
        axios.get(requisitions.getAllParams)
            .then(resp => {
                setServiceParams(resp.data);
            })
            .catch(() => toast({
                title: 'Erro ao acessar serviços!',
                status: 'error',
                duration: 3000,
                isClosable: true,
                position: 'top-right'
            }));
    }, []);

    async function handleSubmit(e) {
        e.preventDefault();

        const adress = { ...formStates };
        delete adress.state;
        setDisable(true);

        axios.post(requisitions.postAdress, adress, headersAuth(user.token))
            .then(() => {
                setUser({ isProvider: true, adress: adress });
                localStorage.setItem("userKT", JSON.stringify({ ...user, isProvider: true, adress: adress }));
                setDisable(false);
            })
            .catch(() => {
                toast({
                    title: 'Erro ao logar!',
                    status: 'error',
                    duration: 3000,
                    isClosable: true,
                    position: 'top-right'
                });
                setDisable(false);
            })
    }

    function handleChange(e) {
        const newFormStates = { ...formStates };
        newFormStates[e.target.id] = e.target.value;
        setFormStates(newFormStates);
    }

    if (!serviceParams) {
        return <Spinner size='xl' />
    }

    return (
        <ContainerSC>
            <form onSubmit={e => handleSubmit(e)}>
                <Stack spacing={5} mt={30} mb={30} >
                    <Select
                        name="state"
                        id="state"
                        placeholder="Estado"
                        value={formStates.state}
                        onChange={handleChange}
                        disabled={disable}
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
                        id="city"
                        placeholder="Cidade"
                        value={formStates.city}
                        onChange={handleChange}
                        disabled={disable}
                        mt={2}
                    >
                        {serviceParams.locations.find(location => location.name === formStates.state)?.cities.map((city) => (
                            <option key={city} value={city}>
                                {city}
                            </option>
                        ))}
                    </Select>

                    <Input
                        id="streetAvenue"
                        placeholder="Rua/Avenida"
                        _placeholder={{ color: 'gray.700' }}
                        type="text"
                        value={formStates.streetAvenue}
                        onChange={e => handleChange(e)}
                        required
                        disabled={disable}
                    />

                    <Input
                        id="number"
                        placeholder="Número"
                        _placeholder={{ color: 'gray.700' }}
                        type="number"
                        value={formStates.number}
                        onChange={e => handleChange(e)}
                        required
                        disabled={disable}
                    />

                    <Input
                        id="complement"
                        placeholder="Complemento"
                        _placeholder={{ color: 'gray.700' }}
                        type="text"
                        value={formStates.complement}
                        onChange={e => handleChange(e)}
                        required
                        disabled={disable}
                    />

                    <Input
                        id="description"
                        placeholder="Sua descrição como provedor de serviços"
                        _placeholder={{ color: 'gray.700' }}
                        type="text"
                        value={formStates.description}
                        onChange={e => handleChange(e)}
                        required
                        disabled={disable}
                    />

                </Stack>

                <BottomBox>
                    <button
                        type="submit"
                        disabled={disable}
                    >
                        {disable ? (
                            <Spinner color='gray.500' />
                        ) : (
                            "Enviar"
                        )}
                    </button>
                </BottomBox>
            </form>
        </ContainerSC>
    )
}

const ContainerSC = styled.main`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-between;
`

const BottomBox = styled.div`
  display: flex;
  flex-direction: column;

button {
  background-color: #F6E4C4;
  border: none;
  border-radius: 8px;
  height: 50px;
  font-size: 19px;
  cursor: pointer;
  margin-bottom: 20px;
  width: 250px;
  align-self: center;
  display: flex;
  justify-content: center; 
  align-items: center;
}
`