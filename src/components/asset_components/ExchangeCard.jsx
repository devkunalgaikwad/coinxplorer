import { Tbody, Tr, Td} from '@chakra-ui/react';
import React from 'react'

const ExchangeCard = ({name,img,rank,url,score,volume,country}) => {
  return (
    <>
        <a href={url} target={'Blank'}>
            <Tbody>
              {
                <Tr>
                  <Td>{name}{img}</Td>
                  <Td>{rank}</Td>
                  <Td>{score}</Td>
                  <Td>{volume}</Td>
                  <Td>{country}</Td>
                </Tr>
              }
            </Tbody>
        </a>
    </>
  )
}

export default ExchangeCard;