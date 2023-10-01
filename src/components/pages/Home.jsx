import { Box, Heading, Image, Table, Text, Th, Tr, TableContainer,TableCaption,Thead,Tbody,Td } from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import axios from "axios";
import { server } from "../..";
import HeroSection from "../asset_components/HeroSection";

const Home = () => {
  const [trending,setTrending] = useState([]);
  const [loading,setLoading] = useState(true)
  const [bitcoin, setBitcoin] = useState([])
  const [error,setError] = useState(false)
  useEffect(() => {
    const fetchTrending = async () => {
      try {
        const {data} = await axios.get(`${server}/search/trending`);
        setTrending(data.coins);
        setLoading(false);
      } catch (err) {
        setError(true);
        setLoading(false);
      }
    };
    fetchTrending();
  },[]);
  useEffect(() => {
    const fetchTrending = async () => {
      try {
        const {data} = await axios.get(`${server}/coins/bitcoin`);
        setBitcoin(data.market_data.current_price.inr)
      } catch (err) {
        throw new Error(err)
      }
    };
    fetchTrending();
  },[]);
  return (
    <>
    <HeroSection/>
    <Box>
    <Heading mt={'10px'} textAlign={'center'}>Treading Coins</Heading>
      <TableContainer m={'30px 10vw'}>
                    <Table variant={'simple'}>
                        <TableCaption>
                          Data is updated every 10 minutes
                        </TableCaption>
                        <Thead>
                            <Tr>
                                <Th textAlign={'right'}>Name</Th>
                                <Th>Symbol</Th>
                                <Th>ID or Coin ID</Th>
                                <Th>Market Cap Rank</Th>
                                <Th>Price(in INR)</Th>
                                <Th>Score</Th>
                            </Tr>
                        </Thead>
                        <Tbody>
                            {trending.map((i) => (
                                <Tr key={i.id}>
                                    <Td display={'flex'} alignItems={'center'} justifyContent={'space-between'} ><img src={i.item.small} alt="" />{i.item.name}</Td>
                                    <Td>{i.item.symbol} </Td>
                                    <Td>{i.item.id} </Td>
                                    <Td>{i.item.market_cap_rank} </Td>
                                    <Td>{(i.item.price_btc*bitcoin).toFixed(2)} </Td>
                                    <Td>{i.item.score} </Td>
                                </Tr>
                            ))}
                        </Tbody>
                    </Table>
                </TableContainer>
            </Box>
    </>
  );
};

export default Home;
