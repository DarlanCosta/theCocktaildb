import React, { useCallback, useEffect, useRef, useState } from 'react';
import {
  Input,
  Icon,
  Select,
  Box,
  HStack,
  AlertDialog,
} from '@chakra-ui/react';

import { useForm } from 'react-hook-form';
import { RiSearchLine } from 'react-icons/ri';
import { useHistory } from 'react-router-dom';
import api from '../../services/api';

export function SearchBar() {
  const [options, setOptions] = useState([]);
  const [visible, setVisible] = useState('hidden');

  const history = useHistory();

  const selOption = useRef(null);

  const { register, watch } = useForm();
  const handleSearch = useCallback(() => {
    history.push(`/drinkdetails?id=${selOption.current.value}`);
  }, []);

  useEffect(() => {
    setVisible(watch('search').length <= 0 ? 'hidden' : 'visible');
    const loadIngredients = async () => {
      try {
        const { data } = await api.get(`search.php?s=${watch('search')}`);
        const result = data.drinks.map(drink => ({
          id: drink.idDrink,
          drink: drink.strDrink,
        }));
        setOptions(result);
      } catch (error) {
        AlertDialog(error);
      }
    };
    loadIngredients();
  }, [watch('search')]);

  return (
    <Box mt="12">
      <HStack>
        <Input
          name="search"
          color="gray.50"
          variant="unstyled"
          fontSize="20"
          px="4"
          mr="4"
          bg="gray.700"
          placeholder="Search drink"
          _placeholder={{ color: 'gray.400' }}
          {...register('search')}
        />

        <Icon
          as={RiSearchLine}
          fontSize="40"
          _hover={{ cursor: 'pointer' }}
          onClick={handleSearch}
        />
      </HStack>

      <Select ref={selOption} visibility={visible}>
        {options.map(opt => {
          return <option value={opt.id}>{opt.drink}</option>;
        })}
      </Select>
    </Box>
  );
}
