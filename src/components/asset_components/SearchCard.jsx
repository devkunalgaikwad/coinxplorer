import React, { useState } from 'react'
import {Text, Image, HStack} from '@chakra-ui/react'
import axios from 'axios'
import {useParams} from 'react-router-dom'
import { server } from '../..'

const SearchCard = ({name,img,id}) => {
  const [coinDetail, setCoinDetail] = useState([])
  const params = useParams();
  const coinSearch = async()=>{
    try{
      const {data} = await axios.get(`${server}/coin/${params.id}`)
      setCoinDetail(data);
      console.log(id)
      console.log(data)
    } catch(error){
      console.log(error)
    }
    coinSearch();
  }
  return (
    <>
        <a target={'Blank'}>
            <HStack w={'52'} display={'flex'} justifyContent={'space-between'} shadow={'lg'} p={'8'} borderRadius={'lg'} transition={'all 0.5s'} m={'4'} css={{'&:hover':{transform:'scale(1.1)'}}}>
              <Image src={img} w={'8'}/>
              <Text>{name}</Text>
            </HStack>
        </a>
    </>
  )
}

export default SearchCard