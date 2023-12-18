import { AlertDialog, AlertDialogBody, AlertDialogCloseButton, AlertDialogContent, AlertDialogFooter, AlertDialogHeader, AlertDialogOverlay, Button, useDisclosure } from "@chakra-ui/react"
import React from "react"
import { useNavigate } from "react-router-dom";
import { pages } from "../routes/routes";
import ProviderForm from "./ProviderForm";
import { useUser } from "../customHooks/User";

export default function ProviderMessage() {
  const cancelRef = React.useRef();
  const navigate = useNavigate();
  const [user, setAdress] = useUser(state => [state.user, state.setAdress]);

  return (
    <>
      <AlertDialog
        motionPreset='slideInBottom'
        leastDestructiveRef={cancelRef}
        isOpen={!user.isProvider}
        isCentered
      >
        <AlertDialogOverlay />

        <AlertDialogContent>
          <AlertDialogHeader>Torne-se provedor de serviços</AlertDialogHeader>
          <AlertDialogBody>
            Parece que você ainda não é um provedor, preencha o formulário para se tornar um.
            <ProviderForm />
          </AlertDialogBody>
          <AlertDialogFooter>
            <Button onClick={() => navigate(pages.home)}>
              Voltar para home
            </Button>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  )
}