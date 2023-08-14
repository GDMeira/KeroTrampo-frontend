import { Drawer, DrawerBody, DrawerContent, DrawerHeader, DrawerOverlay, Flex, IconButton, Image, Spacer, useDisclosure } from '@chakra-ui/react';
import { HamburgerIcon } from '@chakra-ui/icons';
import { CiLocationOn } from "react-icons/ci";
import brench from '../assets/brench.png';

export default function Header() {
    const { isOpen, onOpen, onClose } = useDisclosure();

    return (
        <Flex
            minWidth='max-content'
            minHeight='60px'
            alignItems='center'
            gap='2'
            position='fixed'
            top='0'
            zIndex='2'
            w='100%'
            bgColor='blackAlpha.800'
            color='whiteAlpha.700'
            opacity='0.93'
            padding='0px 10px'
        >
            <>
                <CiLocationOn />
            </>
            <Spacer />
            <Image
                objectFit='cover'
                maxW={{ base: '100%', sm: '200px' }}
                w='20vw'
                src={brench}
                alt='Service image'
                borderRadius='10px'
            />
            <Spacer />
            <HamburgerIcon h={20} onClick={onOpen} />
            <Drawer placement='right' onClose={onClose} isOpen={isOpen} width='40%'>
                <DrawerOverlay />
                <DrawerContent>
                    <DrawerHeader borderBottomWidth='1px'>Basic Drawer</DrawerHeader>
                    <DrawerBody>
                        <p>Some contents...</p>
                        <p>Some contents...</p>
                        <p>Some contents...</p>
                    </DrawerBody>
                </DrawerContent>
            </Drawer>
        </Flex>
    )
}