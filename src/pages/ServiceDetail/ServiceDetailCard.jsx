import { Card, CardBody, Heading, Image, Stack, Text } from "@chakra-ui/react";
import { useEffect, useState } from "react";

export default function ServiceDetailCard({ serviceInfo }) {
    const { service, provider } = serviceInfo;
    const [currentImageIndex, setCurrentImageIndex] = useState(0);

    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentImageIndex((prevIndex) => (prevIndex + 1) % service.url.length);
        }, 3000); 

        return () => clearInterval(interval);
    }, [service.url.length]);

    function targetRegion() {
        switch (service.targetRegion) {
            case 'same city':
                return `Cidade de ${provider.city}-${provider.stateAcronym}`
                break;
            
            case 'same state':
                return `Estado de ${provider.state}`
                break;

            case 'everywhere':
                return `Qualquer região`
                break;
        
            default:
                break;
        }
    }

    return (
        <>
            <Card mt='5'
                direction={{ base: 'column', sm: 'row' }}
                w='100%'
                overflow='hidden'
                variant='outline'
                bg='none'
            >
                <Image
                    objectFit='cover'
                    maxW={{ base: '100%', sm: '200px' }}
                    h='200px'
                    src={service.url[currentImageIndex]}
                    alt='Service image'
                />

                <Stack>
                    <CardBody >
                        <Heading size='lx'>{service.name}</Heading>

                        <Text py='2' fontSize='0.7em' color='gray.400' textAlign='right'>
                            {service.category}
                        </Text>

                        <Text py='2' fontSize='0.8em'>
                            {service.description}
                        </Text>

                        <Text color='blue.300' fontSize='2xl'>
                            Custo médio R${(service.meanCost / 100).toFixed(2)}
                        </Text>

                        <Text fontSize='0.8em'>
                            Região de atendimento: {targetRegion()}
                        </Text>
                    </CardBody>
                </Stack>
            </Card>
        </>
    )
}