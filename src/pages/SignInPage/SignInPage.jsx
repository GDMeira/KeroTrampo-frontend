import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import styled from "styled-components";
import { pages, requisitions } from "../../routes/routes";
import { useState } from "react";
import Logo from "../../components/Logo";
import { PageSC } from "../../style/PageLayout";
import { Button, Flex, Input, InputGroup, InputRightElement, Spinner, Stack } from '@chakra-ui/react';
import { BsSkipForwardFill } from "react-icons/bs";
import { useUser } from "../../customHooks/User";

export default function SignInPage() {
    const [formStates, setFormStates] = useState({
        email: '',
        password: ''
    })

    const [disable, setDisable] = useState(false);
    const [show, setShow] = useState(false)
    const handleClick = () => setShow(!show)

    // const { user, setUser } = useContext(AuthContext)
    const [user, setUser] = useUser(state => [state.user, state.setUser]);

    const navigate = useNavigate();

    async function handleSubmit(e) {
        e.preventDefault();

        const user = { ...formStates };
        setDisable(true);

        axios.post(requisitions.postSignIn, user)
            .then((res) => {
                const newUser = {
                    token: res.data.token,
                    image: res.data.image,
                    name: res.data.name,
                    isProvider: res.data.isProvider,
                    description: res.data.description,
                    phone: res.data.phone,
                    id: res.data.id,
                    adress: {
                        streetAvenue: res.data.streetAvenue,
                        number: res.data.number,
                        complement: res.data.complement,
                        city: res.data.city,
                        state: res.data.state
                    }
                }
                console.log(newUser)
                setUser(newUser);
                localStorage.setItem("userKT", JSON.stringify(newUser));
                setDisable(false);
                navigate(pages.home);
            })
            .catch(error => {
                alert(error.response.data.message);
                setDisable(false);
            })
    }

    function handleChange(e) {
        const newFormStates = { ...formStates };
        newFormStates[e.target.id] = e.target.value;
        setFormStates(newFormStates);
    }

    return (
        <PageSC>
            <ContainerSC>
                <form onSubmit={e => handleSubmit(e)}>
                    <TopBox >
                        <Logo />
                        <div>Sign in</div>
                    </TopBox>

                    <Stack spacing={5} mt={30} mb={30} >
                        <Input
                            id="email"
                            placeholder="E-mail"
                            _placeholder={{ color: 'gray.700' }}
                            type="email"
                            autoComplete="username"
                            value={formStates.email}
                            onChange={e => handleChange(e)}
                            required
                            disabled={disable}
                        />

                        <InputGroup size='md'>
                            <Input
                                id="password"
                                placeholder="Senha"
                                _placeholder={{ color: 'gray.700' }}
                                type={show ? 'text' : 'password'}
                                autoComplete="new-password"
                                value={formStates.password}
                                onChange={e => handleChange(e)}
                                required
                                minLength={4}
                                disabled={disable}
                            />
                            <InputRightElement width='4.5rem'>
                                <Button h='1.75rem' size='sm' bg="blackAlpha.400" onClick={handleClick}>
                                    {show ? 'Hide' : 'Show'}
                                </Button>
                            </InputRightElement>
                        </InputGroup>
                    </Stack>

                    <BottomBox>
                        <button
                            type="submit"
                            disabled={disable}
                        >
                            {disable ? (
                                <Spinner color='gray.500' />
                            ) : (
                                "Entrar"
                            )}
                        </button>
                        <LinkToSignIn to={pages.signUp}>
                            Não tem uma conta? Cadastre-se agora!
                        </LinkToSignIn>
                    </BottomBox>
                </form>
            </ContainerSC>
            <Flex w='84vw' mt={7} align='center' justify='flex-end'>
                <BsSkipForwardFill onClick={() => navigate(pages.home)} />
            </Flex>
        </PageSC>

    )
}

const ContainerSC = styled.main`
    display: flex;
    align-items: center;
    justify-content: space-between;
`

const TopBox = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
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

const LinkToSignIn = styled(Link)`
  align-self: center;
  font-size: 18px;
  color: #000;
  text-decoration: underline;
`;