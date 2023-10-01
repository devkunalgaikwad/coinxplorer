import { Box, Container, Image, Select,Stat,StatArrow,StatHelpText,StatLabel,StatNumber,Text,VStack, Badge, Progress, HStack } from '@chakra-ui/react';
import React, { useEffect, useState } from 'react'
import Loader from '../asset_components/Loader';
import {useParams} from 'react-router-dom'
import axios from 'axios';
import { server } from '../..';
import FetchError from '../asset_components/FetchError'
import Chart from '../asset_components/Chart';

const CoinsDetails = () => {

  const [coins,setCoins] = useState([]);
  const [loading,setLoading] = useState(true);
  const [error,setError] = useState(false);
  const [currency, setCurrency] = useState("inr");
  const params = useParams();
  const currencySymbol = currency ==='inr'?'₹':currency==='eur'?'€':'$';
  const [days,setDays] = useState('24h');
  const [chartarr,setChartarr] = useState([]);
  const btns = ['24h','7d','14d','30d','60d','200d','1y','max']
  const switchChartStats=(key)=>{
    switch (key){
      case '24h':
        setDays('24h')
        setLoading(true)
        break;
        case '7d':
        setDays('7d')
        setLoading(true)
        break;
        case '14d':
        setDays('14d')
        setLoading(true)
        break;
        case '30d':
        setDays('30d')
        setLoading(true)
        break;
        case '60d':
        setDays('60d')
        setLoading(true)
        break;
        case '200d':
        setDays('200d')
        setLoading(true)
        break;
        case '1y':
        setDays('365d')
        setLoading(true)
        break;
        case 'max':
        setDays('max')
        setLoading(true)
        break;
      default:
        setDays('24h')
        setLoading(true)
        break;
    }
  }

  useEffect(() => {
    const fetchCoins = async()=>{
        try {
            const {data} = await axios.get(`${server}/coins/${params.id}`);
            const {data:chartData} =await axios.get(`${server}/coins/${params.id}/market_chart?vs_currency=${currency}&days=${days}`)
            setCoins(data);
            setLoading(false);
            setChartarr(chartData.prices);
        } catch (error) {
            setLoading(false);
            setError(true);
        };
    };
    fetchCoins();
}, [params.id,currency,days]);

if(error) return <FetchError message={`Error is occured while fetching data about coin of id ${params.id}`}/>

  return (
    <Container maxW={'container.xl'}>
      {
        loading?<Loader/>:(
          <>
            <Box w={'80vw'} borderWidth={1}>
              <Chart currency={currencySymbol} arr ={chartarr} days={days}/>
              <Box display={'flex'} justifyContent={'space-between'}>
                <Select w={'40vw'} value={currency} onChange={(event) => setCurrency(event.target.value)} p={'8'} placeholder='Change currency'>
                  <option value="inr">INR</option>
                  <option value="usd">USD</option>
                  <option value='eur'>EUR</option>
                </Select>
                <Select w={'40vw'} value={days} onChange={(event) => switchChartStats(event.target.value)} p={'8'} placeholder='Change currency'>
                  {btns.map((i) => (
                    <option key={i} value={i}>
                      {i}
                    </option>
                  ))}
                </Select>
              </Box>
              <VStack spacing={'4'} p='16' alignItems={'flex-start'}>
                <Text fontSize={'small'} alignSelf={'center'}>
                  Last updated data on {Date(coins.market_data.last_updated).split('G')[0]}
                </Text>
                <Image src={coins.image.large} w={'16'} h={'16'} objectFit={'contain'}/>
                <Stat>
                <StatLabel>
                  {coins.name}
                </StatLabel>
                <StatNumber>
                  {currencySymbol}
                  {coins.market_data.current_price[currency]}
                </StatNumber>
                <StatHelpText>
                  <StatArrow type={(coins.market_data.price_change_percentage_24h >= 0)?'increase':'decrease'}/>
                    {coins.market_data.price_change_percentage_24h}%
                  </StatHelpText>
              </Stat>
              <Badge fontSize={'2xl'} bgColor={'blackAlpha.900'} color={'whiteAlpha.700'}>
                {`#${coins.market_cap_rank}`}
              </Badge>
              <CustomBar high={`${coins.market_data.high_24h[currency]}`} low={`${coins.market_data.low_24h[currency]}`}/>
              <Box w={'full'}>
                <Item title ={'Max Supply'} value={coins.market_data.max_supply}/>
                <Item title ={'Criculating Supply'} value={coins.market_data.circulating_supply}/>
                <Item title ={'Market Capital'} value={`${currencySymbol}${coins.market_data.market_cap[currency]}`}/>
                <Item title ={'All Time Low'} value={`${currencySymbol}${coins.market_data.atl[currency]}`}/>
                <Item title ={'All Time High'} value={`${currencySymbol}${coins.market_data.ath[currency]}`}/>
              </Box>
              </VStack>
            </Box>
          </>
        )
      }
    </Container>
  )
}

const CustomBar =({high,low}) => {
  return(<VStack w={'full'}>
    <Progress value={50} colorScheme='teal' w={'full'}/>
    <HStack justifyContent={'space-between'} w={'full'}>
      <Badge children ={low} colorScheme={'red'}/>
      <Text fontSize={'sm'}>24H Range</Text>
      <Badge children ={high} colorScheme={'green'}/>
    </HStack>
  </VStack>)
}

const Item=({title, value})=>{
  return(
    <HStack justifyContent={'space-between'} w={'full'} my={'4'}>
      <Text fontFamily={"Bebas Neue"} letterSpacing={'widest'}>{title}</Text>
      <Text>{value}</Text>
    </HStack>
  )
}
;
export default CoinsDetails;