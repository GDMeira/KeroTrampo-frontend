import { Button, Drawer, DrawerBody, DrawerContent, DrawerHeader, DrawerOverlay, Flex, Image, Spacer, Stack, useDisclosure } from '@chakra-ui/react';
import { HamburgerIcon } from '@chakra-ui/icons';
import { CiLocationOn } from "react-icons/ci";
import brench from '../assets/brench.png';
import axios from 'axios';
import { headersAuth, pages, requisitions } from '../routes/routes';
import { useNavigate } from 'react-router-dom';
import { useContext, useState } from 'react';
import AuthContext from '../contexts/AuthContext';

export default function Header() {
    const { user, setUser } = useContext(AuthContext)
    const { isOpen, onOpen, onClose } = useDisclosure();
    const [ isLoading, setIsLoading ] = useState(false) ;
    const navigate = useNavigate();

    async function signOut() {
        setIsLoading(true);

        axios.delete(requisitions.signOut, headersAuth(user.token))
            .then(() => {
                onClose();
                localStorage.removeItem('userKT');
                setUser(undefined);
                navigate(pages.signIn);
            })
            .catch(err => {
                setIsLoading(false);
                alert(err.response.data.message);
            })
    }

    return (
        <Flex
            minWidth='max-content'
            h='60px'
            alignItems='center'
            gap='2'
            position='fixed'
            top='0'
            zIndex='2'
            w='100%'
            bgColor='blackAlpha.800'
            color='whiteAlpha.700'
            opacity='0.93'
            padding='0px 10px'
        >
            <>
                <CiLocationOn />
            </>
            <Spacer />
            <Image
                objectFit='cover'
                w='20vw'
                src={brench}
                alt='Service image'
                borderRadius='10px'
            />
            <Spacer />
            <HamburgerIcon h={20} onClick={onOpen} />
            <Drawer placement='right' onClose={onClose} isOpen={isOpen} width='40%'>
                <DrawerOverlay />
                <DrawerContent>
                    <DrawerHeader
                        borderBottomWidth='1px'
                        display='flex'
                        flexDir='column'
                        justifyContent='center'
                        alignItems='center'

                    >
                        <Image
                            borderRadius='full'
                            h='150px'
                            w='150px'
                            src={(!user || user.image === '') ? 'https://www.pngitem.com/pimgs/m/150-1503945_transparent-user-png-default-user-image-png-png.png' : user.image}
                            alt='Dan Abramov'
                        />
                        {user !== undefined && user.name}
                    </DrawerHeader>
                    <DrawerBody>
                        {user !== undefined ? (
                            <Stack spacing={3}>
                                <Button variant="link" size="md" color="blue.500">
                                    Atualizar dados da conta
                                </Button>
                                <Button variant="link" size="md" color="blue.500">
                                    Alterar endereço
                                </Button>
                                <Button onClick={() => signOut()} variant="link" size="md" color="red.500" isLoading={isLoading}>
                                    Sair
                                </Button>
                            </Stack>
                        ) : (
                            <Stack spacing={3}>
                                <Button onClick={() => navigate(pages.signIn)} variant="link" size="md" color="blue.500" isLoading={isLoading}>
                                    Fazer login
                                </Button>
                                <Button onClick={() => navigate(pages.signUp)} variant="link" size="md" color="blue.500" isLoading={isLoading}>
                                    Não tem uma conta? Cadastre-se agora!
                                </Button>
                            </Stack>
                        )}
                    </DrawerBody>
                </DrawerContent>
            </Drawer>
        </Flex>
    )
}