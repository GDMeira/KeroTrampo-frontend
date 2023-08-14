import { Button, Card, CardBody, CardFooter, Divider, Flex, Heading, Image, Spacer, Stack, Text } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
import { pages } from "../../routes/routes";

export default function ServiceCard({ service }) {
    const navigate = useNavigate();

    return (
        <>
            <Card mt='3'
                ml={3}
                direction={{ base: 'column', sm: 'row' }}
                w='150px'
                h='200px'
                overflow='hidden'
                variant='outline'
                bg='none'
                
            >
                <Image
                    objectFit='cover'
                    maxW={{ base: '100%', sm: '200px' }}
                    src={service.url}
                    alt='Service image'
                    h='100px'
                />

                <Flex>
                    <CardBody p='0'>
                        <Heading size='lg' fontSize='0.45em'>{service.name}</Heading>

                        <Text color='blue.300' fontSize='md'>
                            R${(service.meanCost / 100).toFixed(2)}
                        </Text>
                        <Spacer/>
                        <Button variant='solid' colorScheme='blue' onClick={() => navigate(pages.serviceDetails + service.id)}>
                            Detalhes
                        </Button>
                    </CardBody>
                </Flex>
            </Card>
        </>
    )
}