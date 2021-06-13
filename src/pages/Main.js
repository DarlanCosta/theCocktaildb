import React from 'react';
import {
  Flex,
  Input,
  Button,
  Link,
  Stack,
  Text,
  Box,
  useColorModeValue,
  useToast,
} from '@chakra-ui/react';

import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { ColorModeSwitcher } from '../components/ColorModeSwitcher';
import Logo from '../components/ui/Logo';
import ApiServer from '../services/ApiServer';

export default function Main() {
  const toast = useToast();
  const dispatch = useDispatch();
  const history = useHistory();

  async function handleSignIn(email, password) {
    setValue('password', '');
    setFocus('password');

    try {
      const { data } = await ApiServer.post('/sessions', {
        email,
        password,
      });

      if (data) {
        dispatch({
          type: '@auth/SIGN_IN',
          user: {
            id: data.user.id,
            name: data.user.name,
            email: data.user.email,
            token: data.token,
            signed: true,
          },
        });
        history.push('/landing');
      }
    } catch (error) {
      toast({
        title: 'Atenção.',
        description: 'Nome de usuário ou senha inválidos',
        status: 'error',
        duration: 1500,
        isClosable: true,
      });
    }
  }

  const signInFormSchema = yup.object().shape({
    email: yup
      .string()
      .required('E-mail Obrigatório')
      .email('E-mail inválido'),
    password: yup.string().required('Senha obrigatória'),
  });

  const { register, formState, watch, setValue, setFocus } = useForm({
    resolver: yupResolver(signInFormSchema),
  });
  const { errors } = formState;
  return (
    <Flex
      width="100vw"
      height="100vh"
      alignItems="center"
      justifyContent="center"
      justify="center"
      justifyItems="center"
      flexDirection="column"
    >
      <Box mr="8" alignItems="center">
        <ColorModeSwitcher />
        <Logo width="200px" />
        <Text fontSize="30">Welcome to the app</Text>
        <Text fontSize="20" color="blue.700">
          Choose your drink and enjoy!
        </Text>
      </Box>

      <Box
        mt="4"
        as="form"
        width="100%"
        maxWidth={360}
        p="4"
        borderRadius={8}
        flexDir="column"
      >
        <Stack spacing="4">
          <Input
            bg={useColorModeValue('white', 'blue.700')}
            name="email"
            type="email"
            placeholder="E-mail"
            errorBorderColor="crimson"
            error={errors.email}
            {...register('email')}
          />
          <p>{errors.email}</p>
          <Input
            bg={useColorModeValue('white', 'blue.700')}
            name="password"
            type="password"
            placeholder="Password"
            error={errors.password}
            {...register('password')}
          />
        </Stack>
        <Box mt="6" mb="6">
          <Button
            colorScheme="blue"
            color="white"
            size="lg"
            mr="12"
            onClick={() => handleSignIn(watch('email'), watch('password'))}
          >
            Fazer Login
          </Button>

          <Link fontSize="lg" justifySelf="self-end" href="/newuser">
            Cadastrar
          </Link>
        </Box>
      </Box>
    </Flex>
  );
}
