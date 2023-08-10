import { useEffect, useState } from "react";
import FooterMenu from "../../components/FooterMenu";
import Header from "../../components/Header";
import { PageSC } from "../../style/PageLayout";
import axios from "axios";
import { requisitions } from "../../routes/routes";
import { Spinner } from "@chakra-ui/react";
import ServiceCard from "./ServiceCard";

export default function HomePage() {
    const [services, setServices] = useState(undefined);

    useEffect(() => {
        axios.get(requisitions.getServices)
            .then(res => {
                setServices(res.data)
            })
            .catch(error => alert(error.response.data.message));
    }, [])

    return (
        <PageSC>
            <Header />
            {!services && <Spinner size='xl' />}
            {services?.length === 0 || !services ? (
                <h1>Ainda não temos serviços para mostrar.</h1>
            ) : (
                services.map(service => <ServiceCard key={service.id} service={service} />)
            )}
            <FooterMenu />
        </PageSC>
    )
}