import { Box, Divider } from '@chakra-ui/react'
import React from 'react'
import { Link } from 'react-router-dom'
import { Link as ReactRouterLink } from 'react-router-dom'
import {AiFillHome} from 'react-icons/ai'
import {RiExchangeBoxFill} from 'react-icons/ri'
import {BiSolidCoin} from 'react-icons/bi'
import {FaRegNewspaper} from 'react-icons/fa'

const FooterNav = () => {
  return (
    <div className='fixed bottom-0 md:hidden'>
      <Divider/>
      <Box h={'8vh'} bg={'blackAlpha.600'} w={'100vw'}>
        <div className='flex flex-row items-center justify-between pt-1'>
          <Link as={ReactRouterLink} to='/'  className={'flex flex-col h-auto items-center justify-center w-full gap-x-4 text-md font-medium cursor-pointer hover:text-white transition text-neutral-400 bg-gradient-to-b from-transparent-800 py-1'}>
            <AiFillHome size={20}/>
            <p className='font-bold w-full text-center '>
                Home
            </p>
          </Link>
          <Link as={ReactRouterLink} to='/exchanges'  className={'flex flex-col h-auto items-center justify-center w-full gap-x-4 text-md font-medium cursor-pointer hover:text-white transition text-neutral-400 bg-gradient-to-b from-transparent-800 py-1'}>
            <RiExchangeBoxFill size={20}/>
            <p className='font-bold w-full text-center '>
                Exchanges
            </p>
          </Link>
          <Link as={ReactRouterLink} to='/coins'  className={'flex flex-col h-auto items-center justify-center w-full gap-x-4 text-md font-medium cursor-pointer hover:text-white transition text-neutral-400 bg-gradient-to-b from-transparent-800 py-1'}>
            <BiSolidCoin size={20}/>
            <p className='font-bold w-full text-center '>
                Coins
            </p>
          </Link>
          <Link as={ReactRouterLink} to='/news'  className={'flex flex-col h-auto items-center justify-center w-full gap-x-4 text-md font-medium cursor-pointer hover:text-white transition text-neutral-400 bg-gradient-to-b from-transparent-800 py-1'}>
            <FaRegNewspaper size={20}/>
            <p className='font-bold w-full text-center '>
                News
            </p>
          </Link>
        </div>
      </Box>
    </div>
  )
}

export default FooterNav