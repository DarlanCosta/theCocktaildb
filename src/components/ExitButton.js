import React from 'react';
import {
  AlertDialog,
  AlertDialogCloseButton,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogOverlay,
  Button,
  useDisclosure,
} from '@chakra-ui/react';
import { useHistory } from 'react-router-dom';
import { useDispatch } from 'react-redux';

export default function ExitButton({ label }) {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const cancelRef = React.useRef();
  const history = useHistory();
  const dispatch = useDispatch();

  const LogOut = () => {
    dispatch({
      type: '@auth/SIGN_IN',
      user: {
        id: null,
        name: null,
        email: null,
        token: null,
        signed: false,
      },
    });
    history.push('/');
  };

  return (
    <>
      <Button onClick={onOpen}>{label}</Button>
      <AlertDialog
        motionPreset="slideInBottom"
        leastDestructiveRef={cancelRef}
        onClose={onClose}
        isOpen={isOpen}
        isCentered
      >
        <AlertDialogOverlay />

        <AlertDialogContent>
          <AlertDialogHeader>Deseja realmente sair?</AlertDialogHeader>
          <AlertDialogCloseButton />
          <AlertDialogFooter>
            <Button ref={cancelRef} onClick={onClose}>
              No
            </Button>
            <Button
              onClick={() => LogOut()}
              type="button"
              colorScheme="blue"
              ml={3}
            >
              Yes
            </Button>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
}
