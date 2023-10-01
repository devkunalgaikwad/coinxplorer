import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { server } from '../../index'
import { Button, Container, HStack, Select} from '@chakra-ui/react';
import Loader from '../asset_components/Loader';
import FetchError from '../asset_components/FetchError'
import CoinsCard from '../asset_components/CoinsCard';

const Coins = () => {
const [coins,setCoins] = useState([]);
const [loading,setLoading] = useState(true);
const [error,setError] = useState(false);
const [page,setPage] = useState(1);
const [currency, setCurrency] = useState('inr');
const currencySymbol = currency ==='inr'?'₹':currency==='eur'?'€':'$'
const changePage = (page)=>{
    setPage(page);
    setLoading(true);
}
const btns = new Array(132).fill(1);
    useEffect(() => {
        const fetchCoins = async()=>{
            try {
                const {data} = await axios.get(`${server}/coins/markets?vs_currency=${currency}&page=${page}`)
                setCoins(data);
                setLoading(false);
            } catch (error) {
                setLoading(false);
                setError(true);
            };
        };
        fetchCoins();
    }, [currency,page]);

    if(error) return <FetchError message={'Error Occured while fetching data of coins'}/>

  return (
    <>
        <Container maxW={'container.xl'}>
            {loading? <Loader/>:<>
                <Select w={''} value={currency} onChange={(event) => setCurrency(event.target.value)} p={'8'} placeholder='Change currency'>
                    <option value='INR'>INR</option>
                    <option value='USD'>USD</option>
                    <option value='EUR'>EUR</option>
                </Select>
                <HStack wrap={'wrap'} justifyContent={'space-evenly'}>
                    {coins.map((i)=>(
                        <CoinsCard id={i.id} key={i.id} name={i.name} img={i.image} symbol={i.symbol} price={i.current_price} currencySymbol={currencySymbol}/>
                    ))}
                </HStack>
                <HStack w={'full'} overflow={'auto'} p={'8'}>
                    {btns.map((item,index)=>(
                            <Button bgColor={'blackAlpha.900'} color={'white'} onClick={()=>changePage(index+1)}>
                                {index+1}
                            </Button>
                        ))}
                </HStack>
            </>}
        </Container>
    </>
  )
}

export default Coins;