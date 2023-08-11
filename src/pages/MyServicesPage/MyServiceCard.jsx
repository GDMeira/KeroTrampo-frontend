import { Button, Card, CardBody, Flex, Heading, Image, Stack, Text } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
import { pages } from "../../routes/routes";
import { FaCheck, FaTimes } from "react-icons/fa";

export default function MyServiceCard({ service }) {
    const navigate = useNavigate();

    return (
        <>
            <Card mt='4'
                direction={{ base: 'column', sm: 'row' }}
                w='40%'
                overflow='hidden'
                variant='outline'
                bg='none'
            >
                <Image
                    objectFit='cover'
                    maxW={{ base: '100%', sm: '200px' }}
                    h='100px'
                    src={service.url}
                    alt='Service image'
                />

                <Stack>
                    <CardBody p='0'>
                        <Heading size='sm'>{service.name}</Heading>

                        <Text color='blue.300' fontSize='lg'>
                            R${(service.meanCost / 100).toFixed(2)}
                        </Text>

                        <Flex align="center">
                            <Text color="alphaBlack.300" fontSize="xl" mr={2}>
                                visível: 
                            </Text>
                            {service.isVisible ? (
                                <FaCheck color="green" size={20}/>
                            ) : (
                                <FaTimes color="red" />
                            )}
                        </Flex>

                        <Button variant='solid' colorScheme='blue' onClick={() => navigate(pages.editService + service.id)}>
                            Editar
                        </Button>

                    </CardBody>
                </Stack>
            </Card>
        </>
    )
}