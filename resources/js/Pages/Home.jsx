import React, { useState, useEffect } from "react";
import { Head, Link } from "@inertiajs/react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, A11y } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

import MainLayout from "@/Layouts/MainLayout";
import Card from "@/Components/common/Card";
import Button from "@/Components/common/Button";
import { useProperty } from "@/hooks/useProperty";
import { PropertyProvider } from "@/contexts/PropertyContext";
import findlandputih from "../../../public/assets/findland_white.svg";

// Import skeleton components
import CardSkeleton from "@/Components/common/CardSkeleton";
import PropertySectionSkeleton from "@/Components/common/PropertySectionSkeleton";
import HeroBannerSkeleton from "@/Components/common/HeroBannerSkeleton";

const PropertySection = ({ properties, isSlider = false }) => {
    const { formatPropertiesList } = useProperty();
    const formattedProperties = formatPropertiesList(properties);

    if (isSlider) {
        return (
            <Swiper
                modules={[Navigation, Pagination, A11y]}
                spaceBetween={20}
                slidesPerView={4} // Ubah dari 3 menjadi 4
                navigation={true}
                pagination={{ clickable: true }}
                className="pb-12 px-8 swiper-custom-navigation"
                loop={false}
                observer={true}
                observeParents={true}
                breakpoints={{
                    0: { slidesPerView: 2, spaceBetween: 10 },
                    640: { slidesPerView: 2, spaceBetween: 20 },
                    1024: { slidesPerView: 4, spaceBetween: 30 }, // Ubah dari 3 menjadi 4
                }}
            >
                {formattedProperties.map((property) => (
                    <SwiperSlide key={property.id} className="pb-3">
                        <div className="h-full">
                            <PropertyCard property={property} />
                        </div>
                    </SwiperSlide>
                ))}
            </Swiper>
        );
    }

    return (
        <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6 px-1">
            {formattedProperties.map((property) => (
                <div key={property.id} className="pb-1 pt-1">
                    <PropertyCard property={property} />
                </div>
            ))}
        </div>
    );
};

const PropertyCard = ({ property }) => {
    // Gunakan image yang sudah diformat oleh formatPropertyData
    // property.image sudah berisi path yang benar dari getPropertyImagePath
    return (
        <Link
            href={`/layanan/${
                property.status === "Dijual" ? "beli" : "sewa"
            }?selectedPropertyId=${property.id}`}
            preserveState
            preserveScroll
        >
            <Card
                image={property.image}
                title={property.title}
                status={property.status}
                price={property.formattedPrice}
                description={property.shortDescription}
                place={property.place}
                land_area={property.land_area}
                certificate_type={property.certificate_type}
            />
        </Link>
    );
};

const Home = ({ latestProperties, featuredProperties }) => {
    // State untuk loading
    const [loading, setLoading] = useState(true);

    // Preload gambar untuk transisi yang lebih halus
    useEffect(() => {
        // Fungsi untuk preload gambar
        const preloadImage = (src) => {
            return new Promise((resolve, reject) => {
                const img = new Image();
                img.onload = () => resolve();
                img.onerror = () => reject();
                img.src = src;
            });
        };

        // Preload hero banner
        const heroBanner = preloadImage("/assets/hero-banner.webp");

        // Preload gambar properti
        const propertyImages = [];
        if (latestProperties) {
            latestProperties.forEach((property) => {
                if (property.image) {
                    propertyImages.push(
                        preloadImage(`/storage/${property.image}`)
                    );
                }
            });
        }

        if (featuredProperties) {
            featuredProperties.forEach((property) => {
                if (property.image) {
                    propertyImages.push(
                        preloadImage(`/storage/${property.image}`)
                    );
                }
            });
        }

        // Tunggu semua gambar dimuat atau minimal 1 detik
        const minDelay = new Promise((resolve) => setTimeout(resolve, 1000));

        Promise.all([heroBanner, ...propertyImages, minDelay])
            .then(() => {
                // Setelah semua gambar dimuat, atur loading ke false
                setLoading(false);
            })
            .catch(() => {
                // Jika ada error, tetap atur loading ke false setelah 1.5 detik
                setTimeout(() => setLoading(false), 1500);
            });

        return () => {
            // Cleanup
        };
    }, [latestProperties, featuredProperties]);

    return (
        <PropertyProvider>
            <Head title="FindLand - Temukan Properti Impian Anda" />

            <div className="relative">
                <div
                    className={`transition-opacity duration-500 ${
                        loading ? "opacity-100" : "opacity-0 absolute inset-0"
                    }`}
                >
                    <HeroBannerSkeleton />
                </div>

                <div
                    className={`transition-opacity duration-500 ${
                        loading ? "opacity-0" : "opacity-100"
                    }`}
                >
                    <div className="relative w-full mt-7">
                        <img
                            src="/assets/hero-banner.jpg"
                            className="w-full h-96 object-cover rounded-3xl"
                            alt="Landing Page"
                        />
                        <div className="absolute font-extrabold text-md sm:text-3xl md:text-4xl lg:text-7xl text-color4 top-12 left-4 sm:left-10 md:left-16">
                            <h1>A perfect place to</h1>
                            <span>make memories</span>
                        </div>
                    </div>
                </div>
            </div>

            <section className="my-6">
                <h1 className="text-2xl md:text-4xl font-extrabold text-lowokwaru mb-6 flex justify-center">
                    Rekomendasi Villa
                </h1>

                <div className="relative">
                    {/* Skeleton untuk properti pilihan */}
                    <div
                        className={`transition-opacity duration-500 ${
                            loading
                                ? "opacity-100"
                                : "opacity-0 absolute inset-0 z-10"
                        }`}
                    >
                        <PropertySectionSkeleton isSlider count={3} />
                    </div>

                    {/* Konten asli */}
                    <div
                        className={`transition-opacity duration-500 ${
                            loading ? "opacity-0" : "opacity-100"
                        }`}
                    >
                        {featuredProperties && featuredProperties.length > 0 ? (
                            <PropertySection
                                key="featured-slider"
                                properties={featuredProperties}
                                isSlider
                            />
                        ) : (
                            <div className="text-center py-8">
                                <p className="text-gray-500">
                                    Properti pilihan akan segera hadir. Silakan
                                    cek kembali nanti.
                                </p>
                                <Link
                                    href="/layanan/beli"
                                    className="inline-block mt-4 px-6 py-2 bg-bunulrejo text-lowokwaru rounded-lg hover:bg-opacity-90 transition"
                                >
                                    Lihat Semua Properti
                                </Link>
                            </div>
                        )}
                    </div>
                </div>
            </section>
            <section className="my-6">
                <div className="flex justify-center items-center md:mt-20 mb-6">
                    <h1 className="text-2xl md:text-4xl font-extrabold text-lowokwaru mb-6">
                        Penginapan Villa Terbaru
                    </h1>
                    {/* <Link
                        href="/layanan/beli"
                        className="text-pandanwangi text-sm md:text-xl hover:underline hover:text-lowokwaru"
                    >
                        Lihat Semua
                    </Link> */}
                </div>

                <div className="relative">
                    {/* Skeleton untuk properti terbaru */}
                    <div
                        className={`transition-opacity duration-500 ${
                            loading
                                ? "opacity-100"
                                : "opacity-0 absolute inset-0 z-10"
                        }`}
                    >
                        <PropertySectionSkeleton isSlider count={6} />
                    </div>

                    {/* Konten asli */}
                    <div
                        className={`transition-opacity duration-500 ${
                            loading ? "opacity-0" : "opacity-100"
                        }`}
                    >
                        <PropertySection
                            key="latest-slider"
                            properties={latestProperties}
                            isSlider
                        />
                    </div>
                </div>
            </section>
            <section className="flex flex-col md:flex-row items-stretch gap-6 my-10 relative z-20">
                <div className="flex-1 flex flex-col justify-center">
                    <div className="mb-6">
                        <Link
                            href="/layanan/jual"
                            className="inline-flex items-center bg-lowokwaru text-white px-6 py-3 rounded-full font-jakarta font-medium"
                        >
                            Pasang Sekarang
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                className="h-5 w-5 ml-2"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="M14 5l7 7m0 0l-7 7m7-7H3"
                                />
                            </svg>
                        </Link>
                    </div>
                    <h2 className="font-jakarta font-bold text-left text-3xl md:text-4xl xl:text-5xl leading-tight text-lowokwaru">
                        <span className="block mb-2">
                            Mau villa cepat di sewa?
                        </span>
                        <span className="block mb-2">
                            Pasang saja di RoyaleVilla!
                        </span>
                        <span className="block"> Mudah dan cepat</span>
                    </h2>
                    <p className="font-jakarta text-xl md:text-2xl text-gray-600 mt-4"></p>
                </div>
                <div className="w-full md:w-1/2 flex-1">
                    <div className="rounded-3xl overflow-hidden">
                        <img
                            src="/assets/landingpage2.png"
                            alt="Landing Page"
                            className="w-full h-full object-cover"
                        />
                        <div className=" p-4 rounded-b-3xl">
                            <p className="font-jakarta text-sm text-gray-600">
                                RoyaleVilla, sebuah website inovatif yang
                                dirancang untuk mempermudah Anda dalam mencari,
                                membeli, dan menjual Villa dengan proses yang
                                cepat, aman, dan transparan.
                            </p>
                        </div>
                    </div>
                </div>
            </section>
        </PropertyProvider>
    );
};

Home.layout = (page) => <MainLayout children={page} />;

export default Home;
