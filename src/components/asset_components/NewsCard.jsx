import { Card , CardBody, Image, Stack, Heading, Text, Divider,CardFooter } from '@chakra-ui/react'
import React from 'react'
import { Link } from 'react-router-dom'
import { Link as ReactRouterLink } from 'react-router-dom'
import {FiExternalLink} from 'react-icons/fi'

const NewsCard = ({title, createdAt, description, thumbnail,url}) => {
    const createdAtDate = new Date(createdAt);
    const formattedCreatedAt = createdAtDate.toLocaleString("en-US", {
        weekday: "short",
        day: "2-digit",
        month: "short",
        year: "numeric",
        hour: "2-digit",
        minute: "2-digit",
    });
  return (
    <Card maxW='sm'>
  <CardBody>
    <Image
      src={thumbnail}
      alt={'Author'}
      borderRadius='lg'
    />
    <Stack mt='6' spacing='3'>
      <Heading size='md'>{title}</Heading>
      <Text>
        {description}
      </Text>
    </Stack>
  </CardBody>
  <Divider />
  <CardFooter w={'full'} justifyContent={'space-between'}>
    <Text>{formattedCreatedAt}</Text>
    <Link as={ReactRouterLink} to={url}>
        <FiExternalLink size={20}/>
    </Link>
  </CardFooter>
</Card>
  )
}

export default NewsCard