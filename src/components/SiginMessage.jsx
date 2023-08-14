import { AlertDialog, AlertDialogBody, AlertDialogCloseButton, AlertDialogContent, AlertDialogFooter, AlertDialogHeader, AlertDialogOverlay, Button, useDisclosure } from "@chakra-ui/react"
import React from "react"
import { useNavigate } from "react-router-dom";
import { pages } from "../routes/routes";

export default function SigninMessage() {
    const { onClose } = useDisclosure();
    const cancelRef = React.useRef();
    const navigate = useNavigate();
  
    return (
      <>
        <AlertDialog
          motionPreset='slideInBottom'
          leastDestructiveRef={cancelRef}
          onClose={onClose}
          isOpen={true}
          isCentered
        >
          <AlertDialogOverlay />
  
          <AlertDialogContent>
            <AlertDialogHeader>Acesso não permitido</AlertDialogHeader>
            <AlertDialogBody>
              Parece que você ainda não fez login. Deseja fazer login ou voltar para home?
            </AlertDialogBody>
            <AlertDialogFooter>
              <Button onClick={() => navigate(pages.home)}>
                Home
              </Button>
              <Button colorScheme='teal' ml={3} onClick={() => navigate(pages.signIn)}>
                Login
              </Button>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </>
    )
  }