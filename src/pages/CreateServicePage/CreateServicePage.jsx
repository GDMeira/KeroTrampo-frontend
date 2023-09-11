import { Spinner } from "@chakra-ui/react";
import FooterMenu from "../../components/FooterMenu";
import Header from "../../components/Header";
import { PageSC } from "../../style/PageLayout";
import CreateServiceForm from "./CreateServiceForm";
import { useEffect, useState } from "react";
import axios from "axios";
import { headersAuth, requisitions } from "../../routes/routes";
import { useUser } from "../../customHooks/User";


export default function CreateServicePage() {
    const user = useUser(state => state.user);
    const [serviceParams, setServiceParams] = useState(0);

    useEffect(() => {
        axios.get(requisitions.getServiceParams, headersAuth(user.token))
            .then(resp => setServiceParams(resp.data))
            .catch(error => alert(error.response.data.message));
    }, [])

    return (
        <PageSC>
            <Header />
            {serviceParams === 0 ? (
                <Spinner size='xl' />
            ) : (
                <CreateServiceForm serviceParams={serviceParams} user={user} />
            )}

            <FooterMenu />
        </PageSC>
    )
}