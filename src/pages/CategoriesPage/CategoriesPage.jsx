import { useEffect, useState } from "react";
import FooterMenu from "../../components/FooterMenu";
import Header from "../../components/Header";
import { PageSC } from "../../style/PageLayout";
import axios from "axios";
import { requisitions } from "../../routes/routes";
import { Box, Spinner, Text } from "@chakra-ui/react";
import CategoryMenu from "./CategoryMenu";

export default function CategoriesPage() {
    const [services, setServices] = useState(undefined);

    useEffect(() => {
        axios.get(requisitions.getServicesByCategories)
            .then(res => {
                setServices(res.data);
            })
            .catch(error => alert(error.response.data.message));
    }, []);



    return (
        <PageSC>
            <Header />
            {!services && <Spinner size='xl' />}
            {services?.length === 0 || !services ? (
                <h1>Ainda não temos serviços para mostrar.</h1>
            ) : (
                <>
                    <Box w="90vw" pb={4}>
                        <Text color="#000" fontSize="3xl" fontWeight="extrabold">
                            Trampos por categoria:
                        </Text>
                    </Box>
                    {services.map(category => <CategoryMenu key={category.id} category={category} />)}
                </>
            )}
            <FooterMenu />
        </PageSC>
    )
}