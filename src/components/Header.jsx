import { Flex, Image, Text, useDisclosure as useDisclosureDrawer, 
    useDisclosure as useDisclosureModal } from '@chakra-ui/react';
import { HamburgerIcon } from '@chakra-ui/icons';
import { CiLocationOn } from "react-icons/ci";
import brench from '../assets/brench.png';
import AdressModal from './AdressModal';
import UserDrawer from './UserDrawer';
import { useUser } from '../customHooks/User';

export default function Header() {
    const user = useUser(state => state.user);
    const { isOpen: isOpenDrawer, onOpen: onOpenDrawer, onClose: onCloseDrawer } = useDisclosureDrawer();
    const { isOpen: isOpenModal, onOpen: onOpenModal, onClose: onCloseModal } = useDisclosureModal();

    return (
        <Flex
            minWidth='max-content'
            h='60px'
            alignItems='center'
            justifyContent='space-around'
            position='fixed'
            top='0'
            zIndex='2'
            w='100%'
            bgColor='blackAlpha.800'
            color='whiteAlpha.700'
            opacity='0.93'
        >
            <Flex flexDir='column' alignItems='center' onClick={onOpenModal}>
                <CiLocationOn />
                {user !== undefined && (
                    <Text fontSize='xs'>
                        {user.adress.city} - {user.adress.state}
                    </Text>
                )}
            </Flex>

            <Image
                objectFit='cover'
                w='20vw'
                src={brench}
                alt='Service image'
                borderRadius='10px'
            />

            <HamburgerIcon h={20} onClick={onOpenDrawer} />

            <UserDrawer isOpenDrawer={isOpenDrawer} onCloseDrawer={onCloseDrawer} />
            <AdressModal isOpenModal={isOpenModal} onCloseModal={onCloseModal} />
        </Flex>
    )
}