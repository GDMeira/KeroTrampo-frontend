import { Button, Card, CardBody, CardFooter, CardHeader, Heading, Image, Text } from "@chakra-ui/react";
import { FaWhatsapp } from "react-icons/fa";


export default function ProviderCard({ serviceInfo }) {
    const { service, provider } = serviceInfo;
    const message = encodeURIComponent(`Olá, gostaria de conversar sobre o serviço ${service.name} postado no KeroTrampo.`);
    const whatsappLink = `https://api.whatsapp.com/send?phone=+55${provider.phone}&text=${message}`;

    return (
        <Card bg='none'>
            <CardHeader display='flex' flexDirection='column' alignItems='center'>
                <Image
                    borderRadius='full'
                    boxSize='150px'
                    src={provider.image}
                    alt='Dan Abramov'
                    fallbackSrc='https://thumbs.dreamstime.com/b/profil-vectoriel-avatar-par-d%C3%A9faut-utilisateur-179376714.jpg'
                />
                <Heading size='md'> {provider.name}</Heading>
            </CardHeader>
            <CardBody>
                <Text fontSize='0.7em'>{provider.description}</Text>
            </CardBody>
            <CardFooter display='flex' justifyContent='center' alignItems='center'>
                <Button as="a" href={whatsappLink} target="_blank" rel="noopener noreferrer" leftIcon={<FaWhatsapp />}>
                    {provider.phone}
                </Button>
            </CardFooter>
        </Card>
    )
}