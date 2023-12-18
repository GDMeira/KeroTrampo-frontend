import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import styled from "styled-components";
import { pages, requisitions } from "../../routes/routes";
import { useState } from "react";
import Logo from "../../components/Logo";
import { PageSC } from "../../style/PageLayout";
import { Button, Flex, Input, InputGroup, InputLeftAddon, InputRightElement, Spinner, Stack, useToast } from '@chakra-ui/react';
import { BsSkipForwardFill } from "react-icons/bs";

export default function SignUpPage() {
    const [formStates, setFormStates] = useState({
        name: '',
        email: '',
        phone: '',
        image: '',
        password: '',
        checkPassword: ''
    })

    const [disable, setDisable] = useState(false);
    const [show, setShow] = useState(false)
    const handleClick = () => setShow(!show)

    const navigate = useNavigate();
    const toast = useToast();

    async function handleSubmit(e) {
        e.preventDefault();

        if (formStates.password !== formStates.checkPassword) {
            return toast({
                title: 'Confirmação de senha está incorreta!',
                status: 'error',
                duration: 3000,
                isClosable: true,
                position: 'top-right'
            });
        }

        const newUser = { ...formStates };
        delete newUser.checkPassword;
        setDisable(true);

        axios.post(requisitions.postSignUp, newUser)
            .then(() => {
                setDisable(false);
                navigate(pages.signIn);
                toast({
                    title: 'Cadastro realizado com sucesso!',
                    status: 'success',
                    duration: 3000,
                    isClosable: true,
                    position: 'top-right'
                });
            })
            .catch(() => {
                setDisable(false);
                toast({
                    title: 'Erro ao cadastrar!',
                    status: 'error',
                    duration: 3000,
                    isClosable: true,
                    position: 'top-right'
                });
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
                        <div>Cadastro</div>
                    </TopBox>

                    <Stack spacing={5} mt={30} mb={30} >
                        <Input
                            id="name"
                            placeholder="Nome"
                            _placeholder={{ color: 'gray.700' }}
                            type="text"
                            value={formStates.name}
                            onChange={e => handleChange(e)}
                            autoComplete="name"
                            required
                            disabled={disable}
                        />
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
                        <InputGroup>
                            <InputLeftAddon bg="none" >
                                +55
                            </InputLeftAddon>
                            <Input
                                id="phone"
                                type='tel'
                                placeholder='Número de telefone'
                                _placeholder={{ color: 'gray.700' }}
                                autoComplete="phone"
                                value={formStates.phone}
                                onChange={e => handleChange(e)}
                                required
                                disabled={disable}
                            />
                        </InputGroup>
                        <Input
                            id="image"
                            placeholder="Link da sua imagem"
                            _placeholder={{ color: 'gray.700' }}
                            type="text"
                            value={formStates.image}
                            onChange={e => handleChange(e)}
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

                        <InputGroup>
                            <Input
                                id="checkPassword"
                                placeholder="Confirme a senha"
                                _placeholder={{ color: 'gray.700' }}
                                type={show ? 'text' : 'password'}
                                autoComplete="new-password"
                                value={formStates.checkPassword}
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
                                "Cadastrar"
                            )}
                        </button>
                        <LinkToSignIn to={pages.signIn}>
                            Já tem uma conta? Entre agora!
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