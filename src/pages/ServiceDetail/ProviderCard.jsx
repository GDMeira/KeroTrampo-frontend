import { Button, Card, CardBody, CardFooter, CardHeader, Heading, Image, Text } from "@chakra-ui/react";


export default function ProviderCard({ provider }) {

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
                <Button>Telefone para contato: {provider.phone}</Button>
            </CardFooter>
        </Card>
    )
}