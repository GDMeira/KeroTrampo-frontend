import { Button, Drawer, DrawerBody, DrawerContent, DrawerHeader, DrawerOverlay, Flex, IconButton, Spacer, useDisclosure } from '@chakra-ui/react';
import { HamburgerIcon } from '@chakra-ui/icons';

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
            <h1>Localização</h1>
            <Spacer />
            <h1>Header</h1>
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