import { Link } from "@inertiajs/react";
import landingpage from "../../../public/assets/about-banner.png";
import MainLayout from "@/Layouts/MainLayout";
import Service from "../Components/AboutUs/Service";
import Review from "../Components/AboutUs/Review";
import Button from "@/Components/common/Button";
import FaqSection from "@/Components/Faq/FaqSection";

const AboutUs = ({ reviews, canReview, reviewMessage }) => {
    return (
        <>
            <section className="relative mt-4">
                <div className="rounded-3xl mt-12 max-w-8xl mx-auto relative">
                    <div className="flex flex-col space-y-8">
                        {/* Top section with title and description */}
                        <div className="flex flex-col md:flex-row md:justify-between md:items-start gap-8">
                            <div className="md:w-3/4">
                                <h1 className="text-4xl md:text-5xl lg:text-7xl font-bold text-lowokwaru leading-tight font-jakarta">
                                    A perfect place to
                                    <br />
                                    make memories
                                </h1>
                            </div>
                            <div className="md:w-3/5 space-y-4 mt-6">
                                <p className="text-gray-600 text-sm md:text-base font-jakarta">
                                    RoyaleVilla, sebuah website inovatif yang
                                    dirancang untuk mempermudah Anda dalam
                                    mencari, membeli, dan menjual Villa dengan
                                    proses yang cepat, aman, dan transparan.
                                </p>
                                <div className="space-y-1">
                                    <p className="text-lowokwaru text-sm font-jakarta">
                                        Mempersembahkan
                                    </p>
                                    <p className="text-lowokwaru text-xl md:text-2xl font-bold font-monument font-normal">
                                        RoyaleVilla
                                    </p>
                                </div>
                            </div>
                        </div>

                        {/* Bottom section with large image */}
                        <div className="w-full rounded-3xl overflow-hidden">
                            <img
                                src="/assets/about-banner.png"
                                alt="Modern Villa"
                                className="w-full h-auto object-cover rounded-3xl"
                            />
                        </div>
                    </div>
                </div>
            </section>
            <FaqSection />
            <Review
                reviews={reviews}
                canReview={canReview}
                reviewMessage={reviewMessage}
            />
            {/* <Service /> */}
        </>
    );
};

AboutUs.layout = (page) => <MainLayout children={page} />;
export default AboutUs;
