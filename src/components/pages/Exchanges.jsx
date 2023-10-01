import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { server } from '../../index'
import { Container, Table, TableCaption, TableContainer,Thead, Tbody, Th, Tr, Td} from '@chakra-ui/react';
import Loader from '../asset_components/Loader';
import FetchError from '../asset_components/FetchError'
import {BiLinkExternal} from 'react-icons/bi'

const Exchanges = () => {
const [exchanges,setExchanges] = useState([]);
const [loading,setLoading] = useState(true);
const [error,setError] = useState(false);
    useEffect(() => {
        const fetchExchanges = async()=>{
            try {
                const {data} = await axios.get(`${server}/exchanges`)
                setExchanges(data);
                setLoading(false);
            } catch (error) {
                setLoading(false);
                setError(true);
            };
        };
        fetchExchanges();
    }, []);

    if(error) return <FetchError message={'Error Occured while fetching data'}/>

  return (
    <>
        <Container maxW={'container.xl'}>
            {loading? <Loader/>:<>
                <TableContainer>
                    <Table variant={'simple'}>
                        <TableCaption>
                            Exchanges sites of coins
                        </TableCaption>
                        <Thead>
                            <Tr>
                                <Th display={'flex'}justifyContent={'flex-end'}>Name</Th>
                                <Th>Trust Rank</Th>
                                <Th>Trust Score</Th>
                                <Th>Trade volume</Th>
                                <Th>Country</Th>
                                <Th>Go to site</Th>
                            </Tr>
                        </Thead>
                        <Tbody>
                            {exchanges.map((i) => (
                                <Tr key={i.id}>
                                    <Td display={'flex'} alignItems={'center'} justifyContent={'space-between'} ><img src={i.image} alt={i.name}/> {i.name}</Td>
                                    <Td>{i.trust_score_rank} </Td>
                                    <Td>{i.trust_score} </Td>
                                    <Td>{i.trade_volume_24h_btc} </Td>
                                    <Td>{i.country} </Td>
                                    <Td><a href={i.url} target="_blank" rel="noopener noreferrer">
                                        <BiLinkExternal />
                                        </a>
                                    </Td>
                                </Tr>
                            ))}
                        </Tbody>
                    </Table>
                </TableContainer>
                {/* <HStack wrap={'wrap'} justifyContent={'space-evenly'}>
                    <HStack w={'80vw'} display={'flex'}>
                        <Text m={'0 10vw'}>Name</Text>
                        <Text>Trust Sorce</Text>
                    </HStack>
                    {exchanges.map((i)=>(
                        <ExchangeCard key={i.id} name={i.name} img={i.image} rank={i.trust_score_rank} url={i.url} score={i.trust_score}/>
                    ))}
                </HStack> */}
            </>}
            
        </Container>
    </>
  )
}

export default Exchanges;