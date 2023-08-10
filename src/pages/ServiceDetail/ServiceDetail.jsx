import { useEffect, useState } from "react";
import FooterMenu from "../../components/FooterMenu";
import Header from "../../components/Header";
import { PageSC } from "../../style/PageLayout";
import axios from "axios";
import { requisitions } from "../../routes/routes";
import { Spinner } from "@chakra-ui/react";
import { useParams } from "react-router-dom";
import ServiceDetailCard from "./ServiceDetailCard";
import ProviderCard from "./ProviderCard";

export default function ServiceDetail() {
    const [serviceInfo, setServiceInfo] = useState(undefined);
    const { id } = useParams();

    useEffect(() => {
        axios.get(requisitions.getServiceDetail + id)
            .then(res => {
                setServiceInfo({ service: res.data[0].service, provider: res.data[0].provider })
            })
            .catch(error => alert(error.response.data.message));
    }, [])

    return (
        <PageSC>
            <Header />
            {!serviceInfo && <Spinner size='xl' />}
            {serviceInfo?.service && (
                <>
                    <ServiceDetailCard serviceInfo={serviceInfo} />
                    <ProviderCard provider={serviceInfo.provider} />
                </>
            )}
            <FooterMenu />
        </PageSC>
    )
}