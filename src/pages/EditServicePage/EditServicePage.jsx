import { useContext, useEffect, useState } from "react";
import FooterMenu from "../../components/FooterMenu";
import Header from "../../components/Header";
import { PageSC } from "../../style/PageLayout";
import axios from "axios";
import { headersAuth, requisitions } from "../../routes/routes";
import { Spinner } from "@chakra-ui/react";
import { useParams } from "react-router-dom";
import AuthContext from "../../contexts/AuthContext";
import EditServiceForm from "./EditServiceForm";

export default function EditServicePage() {
    const { user, setUser } = useContext(AuthContext)
    const [service, setService] = useState(undefined);
    const { id } = useParams();

    useEffect(() => {
        axios.get(requisitions.getMyServiceDetail + id, headersAuth(user.token))
            .then(res => {
                setService(res.data)
            })
            .catch(error => alert(error.response.data.message));
    }, [])

    return (
        <PageSC>
            <Header />
            {!service && <Spinner size='xl' />}
            {service?.name && (
                <EditServiceForm service={service} id={id} user={user} />
            )}
            <FooterMenu />
        </PageSC>
    )
}