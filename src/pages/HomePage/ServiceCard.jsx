import { Button, Card, CardBody, CardFooter, Divider, Heading, Image, Stack, Text } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
import { pages } from "../../routes/routes";

export default function ServiceCard({ service }) {
    const navigate = useNavigate();

    return (
        <>
            <Card mt='5'
                direction={{ base: 'column', sm: 'row' }}
                w='90%'
                overflow='hidden'
                variant='outline'
                bg='none'
            >
                <Image
                    objectFit='cover'
                    maxW={{ base: '100%', sm: '200px' }}
                    src={service.url}
                    alt='Service image'
                    h='200px'
                />

                <Stack>
                    <CardBody p='0'>
                        <Heading size='lg'>{service.name}</Heading>

                        <Text py='2' fontSize='0.5em' color='gray.400' textAlign='right'>
                            {service.category}
                        </Text>

                        <Text py='2' fontSize='0.5em'>
                            {service.description}
                        </Text>

                        <Text color='blue.300' fontSize='2xl'>
                            Custo médio R${(service.meanCost / 100).toFixed(2)}
                        </Text>

                        <Button variant='solid' colorScheme='blue' onClick={() => navigate(pages.serviceDetails + service.id)}>
                            Ver detalhes
                        </Button>
                    </CardBody>
                </Stack>
            </Card>
            <Divider w='94%'mt='3'/>
        </>
    )
}