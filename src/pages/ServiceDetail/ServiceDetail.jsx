import { useEffect, useState } from "react";
import FooterMenu from "../../components/FooterMenu";
import Header from "../../components/Header";
import { PageSC } from "../../style/PageLayout";
import axios from "axios";
import { pages, requisitions } from "../../routes/routes";
import { Spinner, useToast } from "@chakra-ui/react";
import { useNavigate, useParams } from "react-router-dom";
import ServiceDetailCard from "./ServiceDetailCard";
import ProviderCard from "./ProviderCard";

export default function ServiceDetail() {
    const [serviceInfo, setServiceInfo] = useState(undefined);
    const { id } = useParams();
    const toast = useToast();
    const navigate = useNavigate();

    useEffect(() => {
        axios.get(requisitions.getServiceDetail + id)
            .then(res => {
                setServiceInfo({ service: res.data[0].service, provider: res.data[0].provider })
            })
            .catch(error => {
                toast({
                    title: 'Erro ao carregar serviço!',
                    status: 'error',
                    duration: 3000,
                    isClosable: true,
                    position: 'top-right'
                });
                navigate(pages.servicesByCategories);
            });
    }, [])

    return (
        <PageSC>
            <Header />
            {!serviceInfo && <Spinner size='xl' />}
            {serviceInfo?.service && (
                <>
                    <ServiceDetailCard serviceInfo={serviceInfo} />
                    <ProviderCard serviceInfo={serviceInfo} />
                </>
            )}
            <FooterMenu />
        </PageSC>
    )
}