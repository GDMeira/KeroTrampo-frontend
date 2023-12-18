import { Flex, Text } from "@chakra-ui/react";
import ServiceCard from "./ServiceCard";


export default function CategoryMenu({ category }) {
    return (
        category.service && (
            <>
                <Text color="#000" fontSize="3xl" fontWeight="extrabold" ml={3}>
                    {category.name}
                </Text>
                <Flex overflowX='scroll' align='center' justifyContent='flex-start' minW='100dvw' maxW={'100dvw'}>
                    {category.service.map(s => <ServiceCard key={s.id} service={s} />)}
                </Flex>
            </>
        )
    )
}