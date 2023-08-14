import { Image } from '@chakra-ui/react';
import logo from '../assets/logo.png';

export default function Logo() {
    return (
        <Image
            objectFit='cover'
            maxW={{ base: '100%', sm: '200px' }}
            w='80vw'
            src={logo}
            alt='Service image'
            borderRadius='10px'
        />
    )
}