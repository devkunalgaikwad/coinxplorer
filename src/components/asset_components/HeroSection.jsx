import { Button} from '@chakra-ui/react'

const HeroSection = () => {
  return (
    <div className='flex bg-inherit max-w-[1440px] h-[90vh] items-center px-auto'>
        <div className='flex justify-between flex-row w-full md:mx-24 mx-10 my-auto'>
            <div className='flex flex-col min-w-[40vw] justify-center items-start'>
                <p className='md:text-xl text-sm'>Unlocking the Potential of <br className='flex md:hidden'/> <span className='text-[#FFA500] font-bold'>Digital Currency</span></p>
                <h1 className='flex md:text-7xl text-4xl flex-col '>Let's Unlock the<br/>Power of <span className='text-[#FFA500] font-bold'>Your Crypto</span></h1>
                <Button color={'white'} bg={'orange'} w={40} className='my-5'>
                    Bitcoin
                </Button>
                <div className='flex flex-row gap-3 mt-9'>
                    <div className='flex flex-col'>
                        <h3 className='text-[#9c742a] font-semibold text-xl'>All time High</h3>
                        <div className='text-neutral-500 text-md' >
                            <p>"Bitcoin : $454855"</p>
                            <p>"Ethereum : $45645</p>
                        </div>
                    </div>
                    <div className='flex flex-col'>
                        <h3  className='text-[#9c742a] font-semibold text-xl'>Digital Gold</h3>
                        <p className='text-neutral-500 text-md'>BTC: $1T Market Cap</p>
                    </div>
                    <div className='flex flex-col'>
                        <h3  className='text-[#9c742a] font-semibold text-xl'>Crypto Adoption</h3>
                        <p className='text-neutral-500 text-md'>Metric: "100M+ Users"</p>
                    </div>
                </div>
            </div>
            <div className='relative hidden  w-auto md:flex'>
                <img src="./laptop_logo.png" alt="Logo"width={1060} className='min-w-[170%]' />
            </div>
        </div>
    </div>
  )
}

export default HeroSection