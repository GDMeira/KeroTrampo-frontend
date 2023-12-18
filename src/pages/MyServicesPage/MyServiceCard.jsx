import { Button, Card, CardBody, Flex, Heading, Image, Stack, Text } from "@chakra-ui/react";
import { EditIcon } from '@chakra-ui/icons';
import { useNavigate } from "react-router-dom";
import { pages } from "../../routes/routes";
import { FaCheck, FaTimes } from "react-icons/fa";

export default function MyServiceCard({ service }) {
    const navigate = useNavigate();

    return (
        <>
            <Card
                mt='6'
                direction={{ base: 'column', sm: 'row' }}
                w='40%' minW={'130px'}
                h='200px'
                overflow='hidden'
                variant='outline'
                bg='none'
                display='flex'
                justifyContent='space-between'
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

                        <Flex align="center" justify='space-between'>
                            <Flex>
                                <Text color="alphaBlack.300" fontSize="xl" mr={2}>
                                    visível:
                                </Text>
                                {service.isVisible ? (
                                    <FaCheck color="green" size={20} />
                                ) : (
                                    <FaTimes color="red" />
                                )}
                            </Flex>
                            <Button 
                                variant='solid' 
                                colorScheme='red' 
                                size='sm' 
                                display='flex'
                                alignItems='center'
                                justifyContent='center'
                                onClick={() => navigate(pages.editService + service.id)}>
                                <EditIcon boxSize={6} />
                            </Button>
                        </Flex>



                    </CardBody>
                </Stack>
            </Card>
        </>
    )
}