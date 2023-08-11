import { useContext, useEffect, useState } from "react";
import FooterMenu from "../../components/FooterMenu";
import Header from "../../components/Header";
import { PageSC } from "../../style/PageLayout";
import axios from "axios";
import { headersAuth, requisitions } from "../../routes/routes";
import { Flex, SimpleGrid, Spinner } from "@chakra-ui/react";
import MyServiceCard from "./MyServiceCard";
import AuthContext from "../../contexts/AuthContext";

export default function MyServicesPage() {
    const { user, setUser } = useContext(AuthContext)
    const [services, setServices] = useState(undefined);

    useEffect(() => {
        axios.get(requisitions.getMyServices, headersAuth(user?.token))
            .then(res => {
                setServices(res.data);
            })
            .catch(error => alert(error.response.data.message));
    }, [])

    return (
        <PageSC>
            <Header />
            {!services && <Spinner size='xl' />}
            {services?.length === 0 || !services ? (
                <h1>Você ainda não tem trampos para mostrar.</h1>
            ) : (
                <Flex wrap='wrap' justifyContent='space-evenly'>
                    {services.map(service => <MyServiceCard key={service.id} service={service} />)}
                </Flex>
            )}
            <FooterMenu />
        </PageSC>
    )
}