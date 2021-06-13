import React from 'react';
import {
  Flex,
  Button,
  Stack,
  Input,
  Heading,
  Code,
  toast,
  useColorModeValue,
} from '@chakra-ui/react';
import { useForm } from 'react-hook-form';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { useHistory } from 'react-router-dom';
import ApiServer from '../services/ApiServer';

const signInFormSchema = yup.object().shape({
  name: yup.string().required('Nome Obrigatório'),
  email: yup
    .string()
    .required('E-mail Obrigatório')
    .email('E-mail inválido'),
  pass: yup.string().required('Senha obrigatória'),
  passconfirmation: yup
    .string()
    .oneOf([yup.ref('pass'), null], 'A senha não é igual'),
});

export default function NewUser() {
  const onSubmit = async values => {
    try {
      await ApiServer.post('/users', {
        name: values.name,
        email: values.email,
        pass: values.pass,
        passconfirmation: values.passconfirmation,
      });

      history.push('/');
    } catch (error) {
      console.log(error);
      toast({
        title: 'Atenção.',
        description: error.toString(),
        status: 'error',
        duration: 9000,
        isClosable: true,
      });
    }
  };
  const history = useHistory();

  const { register, formState, handleSubmit } = useForm({
    resolver: yupResolver(signInFormSchema),
  });
  const { errors } = formState;
  return (
    <Flex
      width="100vw"
      height="100vh"
      alignItems="center"
      justifyContent="center"
    >
      <Flex
        as="form"
        width="100%"
        maxWidth={360}
        bg="gray.800"
        p="4"
        borderRadius={8}
        flexDir="column"
        alignItems="center"
        onSubmit={handleSubmit(onSubmit)}
      >
        <Heading color={useColorModeValue('white', 'blue.700')} mb="2.5">
          Novo usuário
        </Heading>
        <Stack spacing="2">
          <Input
            name="name"
            type="name"
            placeholder="Name"
            color="white"
            error={errors.name}
            {...register('name')}
          />
          <Code>{errors.name?.message}</Code>

          <Input
            name="email"
            type="email"
            placeholder="E-mail"
            color="white"
            error={errors.email}
            {...register('email')}
          />
          <Code>{errors.email?.message}</Code>

          <Input
            name="pass"
            type="password"
            placeholder="Senha"
            color="white"
            error={errors.password}
            {...register('pass')}
          />
          <Code>{errors.pass?.message}</Code>

          <Input
            name="passconfirmation"
            type="password"
            placeholder="Confirmação de senha"
            color="white"
            error={errors.passconfirmation}
            {...register('passconfirmation')}
          />
          <Code>{errors.passconfirmation?.message}</Code>
        </Stack>

        <Button
          isLoading={formState.isSubmitting}
          marginTop="6"
          colorScheme="blue"
          size="lg"
          type="submit"
        >
          Cadastrar
        </Button>
      </Flex>
    </Flex>
  );
}
