import { useEffect, useState } from "react";
import FooterMenu from "../../components/FooterMenu";
import Header from "../../components/Header";
import { PageSC } from "../../style/PageLayout";
import axios from "axios";
import { headersAuth, pages, requisitions } from "../../routes/routes";
import { Box, Button, Flex, Spinner, Text } from "@chakra-ui/react";
import { AddIcon } from '@chakra-ui/icons';
import MyServiceCard from "./MyServiceCard";
import { useNavigate } from "react-router-dom";
import SigninMessage from "../../components/SiginMessage";
import { useUser } from "../../customHooks/User";

export default function MyServicesPage() {
    const user = useUser(state => state.user);
    const [showSigninMessage, setShowSigninMessage] = useState(false);
    const [services, setServices] = useState(undefined);
    const navigate = useNavigate();

    useEffect(() => {
        axios.get(requisitions.getMyServices, headersAuth(user?.token))
            .then(res => {
                setServices(res.data);
            })
            .catch(error => {
                console.log(error)
                if (error.response.status === 401) {
                    setShowSigninMessage(true);
                } else {
                    alert(error.response.data.message);
                }
            });
    }, [])

    return (
        <PageSC>
            {showSigninMessage && <SigninMessage />}
            <Header />
            {!services && <Spinner size='xl' />}
            {services?.length === 0 || !services ? (
                <h1>Você ainda não tem trampos para mostrar.</h1>
            ) : (
                <>
                    <Box w='100%' pl={2}>
                        <Text
                            color='#000'
                            fontSize="3xl"
                            fontWeight="extrabold"
                        >
                            Seus trampos!
                        </Text>
                    </Box>
                    <Flex wrap='wrap' justifyContent='space-evenly'>
                        {services.map(service => <MyServiceCard key={service.id} service={service} />)}
                    </Flex>
                </>
            )}

            <Box w='100%' pl={2}>
                <Text
                    color='#000'
                    fontSize="3xl"
                    fontWeight="extrabold"
                >
                    Crie um novo trampo!
                </Text>
                <Button
                    mt={2}
                    variant='solid'
                    colorScheme='red'
                    size='lg'
                    onClick={() => navigate(pages.CreateService)}
                >
                    <AddIcon />
                </Button>
            </Box>


            <FooterMenu />
        </PageSC>
    )
}