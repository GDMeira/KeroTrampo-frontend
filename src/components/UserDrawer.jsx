import { Button, Drawer, DrawerBody, DrawerContent, DrawerHeader, DrawerOverlay, Image, Stack, useToast } from "@chakra-ui/react";
import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { headersAuth, pages, requisitions } from '../routes/routes';
import { useUser } from "../customHooks/User";


export default function UserDrawer({ onCloseDrawer, isOpenDrawer }) {
    const [user, setUser] = useUser(state => [state.user, state.setUser]);
    const [ isLoading, setIsLoading ] = useState(false) ;
    const navigate = useNavigate();
    const toast = useToast();

    async function signOut() {
        setIsLoading(true);

        axios.delete(requisitions.signOut, headersAuth(user.token))
            .then(() => {
                localStorage.removeItem('userKT');
                setUser(undefined);
                onCloseDrawer();
                navigate(pages.signIn);
            })
            .catch(err => {
                setIsLoading(false);
                toast({
                    title: 'Erro ao sair!',
                    status: 'error',
                    duration: 3000,
                    isClosable: true,
                    position: 'top-right'
                });
                localStorage.removeItem('userKT');
                navigate(pages.signIn);
            })
    }

    return (
        <Drawer placement='right' onClose={onCloseDrawer} isOpen={isOpenDrawer} width='40%'>
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
    )
}