import { Button, Card, Stack, Text, CardBody, Heading, CardFooter } from '@chakra-ui/react'
import axios from 'axios';
import React, { useEffect, useState } from 'react'
import NewsCard from '../asset_components/NewsCard';
import Loader from '../asset_components/Loader';
import FetchError from '../asset_components/FetchError'

const News = () => {
    const [newsData, setNewsData] = useState([]);
    const [error, seterror] = useState(false)
    const [loading, setloading] = useState(true)
    useEffect(() => {
        const fetchData = async () => {
            const options = {
                method: 'GET',
                url: 'https://cryptocurrency-news2.p.rapidapi.com/v1/coindesk',
                headers: {
                    'X-RapidAPI-Key': 'ef7dcc8a17msh00983ca5a2cafadp1231ccjsn9baad106b619',
                    'X-RapidAPI-Host': 'cryptocurrency-news2.p.rapidapi.com'
                }
            };

            try {
                const response = await axios.request(options);
                setNewsData(response.data.data);
                setloading(false)
            } catch (error) {
                seterror(true)
                setloading(false)
                throw new Error(error)

            }
        };

        fetchData();
    }, []);
    if(error) return <FetchError typeError={'Network Error ...!'} message={'Check your internet.'}/>
  return (
    <div className='flex flex-wrap w-[100vw] mx-auto my-4 gap-4 justify-center'>
        {loading? <Loader/>:
        <>
            {newsData.map((i)=>(
                <NewsCard key={i.title} title={i.title} thumbnail={i.thumbnail} description={i.description} url={i.url} createdAt={i.createdAt}/>
            ))}
        </>}
    </div>
  )
}

export default News