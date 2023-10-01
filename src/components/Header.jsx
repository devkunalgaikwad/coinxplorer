import { Box, Button, HStack, Input, useColorMode , useDisclosure, InputGroup, InputRightElement, Heading, Text } from '@chakra-ui/react'
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import {MdDarkMode , MdLightMode, MdSearch} from 'react-icons/md'
import {
  Drawer,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
} from '@chakra-ui/react';
import axios from 'axios';
import { server } from '..';
import SearchCard from './asset_components/SearchCard';
import FetchError from '../components/asset_components/FetchError'

const Header = () => {
  const { colorMode, toggleColorMode } = useColorMode();
  const { isOpen, onOpen, onClose } = useDisclosure()
  const [coinInput,setCoinInput] = useState('');
  const [coinResult , setCoinResult] =useState([]);
  const [loading,setLoading] = useState(true);
  const [error,setError] = useState(false);
  const [ping, setPing] = useState([])
  const handleSearch= async()=>{
    const fetchCoinType = async()=>{
      try{
        const {data} = await axios.get(`${server}/search?query=${coinInput}`)
        setCoinResult(data);
        setLoading(false)
      }catch(error){
        setLoading(false)
        setError(true)
      }
    }
    fetchCoinType();
  }
  useEffect(() => {
    const fetch = async () => {
      try {
        const {data} = await axios.get(`${server}/ping`);
        setPing(data.gecko_says)
      } catch (err) {
      }
    };
    fetch();
  },[]);

  return (
    <>
      <Box display={'flex'} alignContent={'center'} justifyContent={'space-between'} p={'10px'} >
        <Heading ml={'10px'}>CoinXplorer</Heading>
        <Box minW={'20vw'} display={'flex'} justifyContent={'space-between'}>
          <Button variant={'unstyled'} >
              <Link to='/'>Home</Link>
          </Button>
          <Button variant={'unstyled'} >
              <Link to='/exchanges'>Exchange</Link>
          </Button>
          <Button variant={'unstyled'} >
              <Link to='/coins'>Coins</Link>
          </Button>
        </Box>
        <Box minW={'9vw'} display={'flex'} alignContent={'center'} justifyContent={'space-between'}>
          <Text className='flex text-center items-center'>Server Status :<span className='font-semibold'>{ping}</span></Text>
          <Button onClick={toggleColorMode} borderRadius={'full'} m={'0 10px'} >
            Change to {colorMode === 'light' ? <MdDarkMode/>: <MdLightMode/>}
          </Button>
          <Button borderRadius={'full'} onClick={onOpen}>
            <MdSearch/>
          </Button>
          <Drawer
        isOpen={isOpen}
        placement='right'
        onClose={onClose}
        size={'xl'}
      >
        <DrawerOverlay/>
        <DrawerContent>
          <InputGroup maxW={'60%'} justifyContent={'center'} >
            <Input placeholder='Search for coin atleast three letters'm={'4'} onChange={(event)=>setCoinInput(event.target.value)} value={coinInput} />
            <InputRightElement m={'4'}>
              <Button onClick={handleSearch}>Ok</Button>
            </InputRightElement>
          </InputGroup>
          <DrawerCloseButton m={'10px'} />
          {coinResult.coins && coinResult.coins.length > 0 ? (
            <HStack wrap={'wrap'} justifyContent={'space-evenly'}>
              {coinResult.coins.map((i) => (
                <SearchCard name={i.name} key={i.id} img={i.large}/>
              ))}
            </HStack>
            ) : (
            <FetchError message={'Unable to find coin'} typeError={'Search error'}/>
          )}
        </DrawerContent>
      </Drawer>
        </Box>
      </Box>
    </>
  )
}

export default Header;
