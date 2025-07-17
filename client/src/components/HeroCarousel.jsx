import React from 'react'
import {
    Carousel,
    CarouselContent,
    CarouselItem,
    CarouselNext,
    CarouselPrevious,
} from "@/components/ui/carousel"
// import Autoplay from 'embla-carousel-autoplay'
// import Autoplay from "embla-carousel-autoplay"

const HeroCarousel = () => {
    return (
        <div className="w-[85%] md:w-[95%] sm:w-[90%]  mx-auto mb-16 relative">
            <Carousel
                className="w-full font-serif
"
            // plugins={[Autoplay({ delay: 2000, stopOnInteraction: false })]}
            >
                <CarouselContent>
                    <CarouselItem className="h-[430px] ">
                        <div className='size-full  bg-[url(https://res.cloudinary.com/dutqyxxou/image/upload/v1752737991/overhead-view-businesswoman-working-computer-office-place-your-text-ideal-blog-flat-lay-white-background_1_poas0l.jpg)] bg-center bg-no-repeat bg-cover rounded-2xl'>
                            <div className="relative z-10 flex h-full items-center rounded-2xl justify-center bg-black/50 ">
                                <div className="text-center text-white px-4 sm:w-1/3">
                                    <h2 className="text-3xl sm:text-6xl font-bold">Inspire Your Thoughts</h2>
                                    <p className="mt-2 text-base sm:text-xl">Where creativity meets clarity.</p>
                                </div>
                            </div>


                        </div>

                    </CarouselItem>
                    <CarouselItem className="h-[430px] ">
                        <div className='size-full  bg-[url(https://res.cloudinary.com/dutqyxxou/image/upload/v1752738064/teamwork-making-online-blog_1_vagurs.jpg)] bg-center bg-no-repeat bg-cover rounded-2xl'>
                            <div className="relative z-10 flex h-full items-center rounded-2xl justify-center bg-black/50 ">
                                <div className="text-center text-white px-4 sm:w-1/3">
                                    <h2 className="text-3xl sm:text-6xl font-bold">Mind Drape Brings Clarity</h2>
                                    <p className="mt-2 text-base sm:text-xl">Every idea carefully draped for your journey.</p>
                                </div>
                            </div>


                        </div>

                    </CarouselItem>
                    
                </CarouselContent  >
                <CarouselPrevious className='absolute top-[50%] bottom-[-50%]  left-2  ' />
                <CarouselNext className='absolute top-[50%] bottom-[-50%] right-2 ' />
            </Carousel>
        </div>

    )
}

export default HeroCarousel
