import React, { useState } from "react";
import { Head, useForm, Link } from "@inertiajs/react";
import AdminLayout from "@/Layouts/AdminLayout";
import Modal from "@/Components/Modal";
import axios from "axios";
import { motion } from "framer-motion";

const ReviewListing = ({ listing }) => {
    const [isEditing, setIsEditing] = useState(false);
    const [errorMessage, setErrorMessage] = useState("");
    const [submittedImages, setSubmittedImages] = useState(
        listing.land_photos || []
    );

    const [showModal, setShowModal] = useState(false);
    const [modalContent, setModalContent] = useState({
        title: "",
        message: "",
        type: "",
    });

    const { data, setData, post, processing } = useForm({
        status: "",
        admin_notes: "",
        property_details: {
            title: listing.full_name + " - Land Listing",
            description: listing.address,
            price: listing.monthly_income || 0,
            place: listing.address,
            desc_detail: "",
            maps: listing.maps_link || "",
            wa: listing.phone_number || "",
            land_area: null,
            certificate_type: null,
            featured: false,
            latitude: null,
            longitude: null,
            image: listing.land_photos[0] || null,
            images: listing.land_photos.slice(1) || [],
            status: listing.status || "Dijual",
        },
    });

    const [selectedMainImage, setSelectedMainImage] = useState(
        data.property_details.image
    );

    const selectAsMainImage = (image) => {
        setSelectedMainImage(image);
        setData("property_details", {
            ...data.property_details,
            image: image,
        });
    };

    const handleInputChange = (e) => {
        const { name, value, type, checked } = e.target;

        if (name.startsWith("property_details.")) {
            const propertyField = name.split(".")[1];
            setData("property_details", {
                ...data.property_details,
                [propertyField]: type === "checkbox" ? checked : value,
            });
        } else {
            setData(name, value);
        }
    };

    const handleApprove = (actionStatus) => {
        const formData = new FormData();

        formData.append("admin_status", actionStatus);
        formData.append("admin_notes", data.admin_notes || "");

        if (actionStatus === "approved") {
            // Nomor WhatsApp admin default
            const adminWhatsApp = "6287889601959"; // Ganti dengan nomor admin FindLand yang sebenarnya

            const propertyDetails = {
                title:
                    data.property_details.title ||
                    `${listing.full_name} - Land Listing`,
                description:
                    data.property_details.description || listing.address,
                price: data.property_details.price || 0,
                place: data.property_details.place || listing.address,
                desc_detail:
                    data.property_details.desc_detail || listing.address,
                maps:
                    data.property_details.maps ||
                    listing.maps_link ||
                    `https://maps.google.com/?q=${listing.address}`,
                wa: data.property_details.wa || adminWhatsApp,
                image:
                    selectedMainImage ||
                    data.property_details.image ||
                    listing.land_photos[0],
                images:
                    submittedImages.filter(
                        (img) => img !== selectedMainImage
                    ) ||
                    data.property_details.images ||
                    listing.land_photos.slice(1),
                status:
                    data.property_details.status || listing.status || "Dijual",
                featured: data.property_details.featured || false,
                land_area: data.property_details.land_area || null,
                certificate_type:
                    data.property_details.certificate_type || null,
                latitude: data.property_details.latitude || null,
                longitude: data.property_details.longitude || null,
            };

            formData.append(
                "property_details",
                JSON.stringify(propertyDetails)
            );
        }
        axios
            .post(route("admin.properties.approve", listing.id), formData)
            .then((response) => {
                setModalContent({
                    title: "Success",
                    message: `Property listing has been successfully ${actionStatus}`,
                    type: "success",
                });
                setShowModal(true);
                setTimeout(() => {
                    window.location.href = route("admin.properties.pending");
                }, 2000);
            })
            .catch((error) => {
                console.error("Error response:", error.response);
                let errorMessage = "";

                if (error.response?.data?.errors) {
                    errorMessage = Object.entries(error.response.data.errors)
                        .map(
                            ([field, messages]) =>
                                `${field}: ${messages.join(", ")}`
                        )
                        .join("\n");
                } else if (error.response?.data?.error) {
                    errorMessage = error.response.data.error;
                } else {
                    errorMessage = "An unexpected error occurred";
                }

                setModalContent({
                    title: "Error",
                    message: `Failed to ${actionStatus} listing:\n${errorMessage}`,
                    type: "error",
                });
                setShowModal(true);
            });
    };

    return (
        <AdminLayout>
            <Head title={`Review Listing - ${listing.full_name}`} />

            <Modal show={showModal} onClose={() => setShowModal(false)}>
                <div className="p-6">
                    <div
                        className={`text-xl font-bold mb-4 ${
                            modalContent.type === "success"
                                ? "text-green-600"
                                : "text-red-600"
                        }`}
                    >
                        {modalContent.title}
                    </div>
                    <div className="text-gray-600">{modalContent.message}</div>
                    <div className="mt-6 flex justify-end">
                        <button
                            onClick={() => setShowModal(false)}
                            className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600"
                        >
                            Close
                        </button>
                    </div>
                </div>
            </Modal>

            <div className="container mx-auto px-4 py-8">
                <div className="flex justify-between items-center mb-6">
                    <motion.div
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.3 }}
                    >
                        <h1 className="text-2xl font-bold text-blimping">
                            Review Property Listing
                        </h1>
                        <p className="text-gray-600">
                            Reviewing submission from {listing.full_name}
                        </p>
                    </motion.div>

                    <Link
                        href={route("admin.properties.pending")}
                        className="inline-flex items-center px-4 py-2 bg-bunulrejo text-lowokwaru rounded-md hover:bg-opacity-90 transition-colors"
                    >
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-4 w-4 mr-2"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="2"
                                d="M10 19l-7-7m0 0l7-7m-7 7h18"
                            />
                        </svg>
                        Back to Listings
                    </Link>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                    <div className="lg:col-span-2">
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.3, delay: 0.1 }}
                            className="bg-white shadow-lg rounded-xl overflow-hidden mb-6 border-t-4 border-pandanwangi"
                        >
                            <div className="bg-gradient-to-r from-blimping to-lowokwaru px-6 py-4">
                                <h2 className="text-lg font-semibold text-white flex items-center">
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        className="h-5 w-5 mr-2"
                                        fill="none"
                                        viewBox="0 0 24 24"
                                        stroke="currentColor"
                                    >
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth="2"
                                            d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                                        />
                                    </svg>
                                    Seller Information
                                </h2>
                            </div>
                            <div className="p-6">
                                <div className="grid md:grid-cols-2 gap-6">
                                    <div className="bg-gray-50 p-3 rounded-lg">
                                        <p className="font-medium text-gray-600 text-sm">
                                            Full Name:
                                        </p>
                                        <p className="text-gray-900 font-bold">
                                            {listing.full_name}
                                        </p>
                                    </div>
                                    <div className="bg-gray-50 p-3 rounded-lg">
                                        <p className="font-medium text-gray-600 text-sm">
                                            Birth Place & Date:
                                        </p>
                                        <p className="text-gray-900 font-bold">
                                            {listing.birth_place_date}
                                        </p>
                                    </div>
                                    <div className="bg-gray-50 p-3 rounded-lg">
                                        <p className="font-medium text-gray-600 text-sm">
                                            Address:
                                        </p>
                                        <p className="text-gray-900 font-bold">
                                            {listing.address}
                                        </p>
                                    </div>
                                    <div className="bg-gray-50 p-3 rounded-lg">
                                        <p className="font-medium text-gray-600 text-sm">
                                            KTP ID:
                                        </p>
                                        <p className="text-gray-900 font-bold">
                                            {listing.ktp_id}
                                        </p>
                                    </div>
                                    <div className="bg-gray-50 p-3 rounded-lg">
                                        <p className="font-medium text-gray-600 text-sm">
                                            Phone Number:
                                        </p>
                                        <p className="text-gray-900 font-bold">
                                            {listing.phone_number}
                                        </p>
                                    </div>
                                    <div className="bg-gray-50 p-3 rounded-lg">
                                        <p className="font-medium text-gray-600 text-sm">
                                            NPWP:
                                        </p>
                                        <p className="text-gray-900 font-bold">
                                            {listing.npwp}
                                        </p>
                                    </div>
                                    <div className="bg-gray-50 p-3 rounded-lg">
                                        <p className="font-medium text-gray-600 text-sm">
                                            Package:
                                        </p>
                                        <p className="text-gray-900 font-bold">
                                            {listing.package_id || "No package"}
                                        </p>
                                    </div>
                                    <div className="bg-gray-50 p-3 rounded-lg">
                                        <p className="font-medium text-gray-600 text-sm">
                                            Duration:
                                        </p>
                                        <p className="text-gray-900 font-bold">
                                            {listing.package_id
                                                ? `${
                                                      listing.package_id * 3
                                                  } months`
                                                : "N/A"}
                                        </p>
                                    </div>
                                    <div className="bg-gray-50 p-3 rounded-lg">
                                        <p className="font-medium text-gray-600 text-sm">
                                            Status Tanah:
                                        </p>
                                        <p className="text-gray-900 font-bold">
                                            {listing.status}
                                        </p>
                                    </div>
                                    <div className="bg-gray-50 p-3 rounded-lg">
                                        <p className="font-medium text-gray-600 text-sm">
                                            Status Pembayaran:
                                        </p>
                                        <p
                                            className={
                                                listing.is_paid
                                                    ? "text-green-600 font-bold"
                                                    : "text-red-600 font-bold"
                                            }
                                        >
                                            {listing.is_paid
                                                ? "Sudah Dibayar"
                                                : "Belum Dibayar"}
                                        </p>
                                    </div>
                                    <div className="bg-gray-50 p-3 rounded-lg">
                                        <p className="font-medium text-gray-600 text-sm">
                                            Google Maps Link:
                                        </p>
                                        <p>
                                            {listing.maps_link ? (
                                                <a
                                                    href={listing.maps_link}
                                                    target="_blank"
                                                    rel="noopener noreferrer"
                                                    className="text-blue-600 hover:underline"
                                                >
                                                    View on Maps
                                                </a>
                                            ) : (
                                                "Tidak ada"
                                            )}
                                        </p>
                                    </div>
                                    <div className="bg-gray-50 p-3 rounded-lg">
                                        <p className="font-medium text-gray-600 text-sm">
                                            Submitted At:
                                        </p>
                                        <p className="text-gray-900 font-bold">
                                            {new Date(
                                                listing.created_at
                                            ).toLocaleString()}
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </motion.div>

                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.3, delay: 0.2 }}
                            className="bg-white shadow-lg rounded-xl overflow-hidden mb-6 border-t-4 border-lowokwaru"
                        >
                            <div className="bg-gradient-to-r from-lowokwaru to-color4 px-6 py-4">
                                <h2 className="text-lg font-semibold text-white flex items-center">
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        className="h-5 w-5 mr-2"
                                        fill="none"
                                        viewBox="0 0 24 24"
                                        stroke="currentColor"
                                    >
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth="2"
                                            d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
                                        />
                                    </svg>
                                    Submitted Images
                                </h2>
                            </div>
                            <div className="p-6">
                                <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                                    {submittedImages.map((image, index) => (
                                        <div
                                            key={index}
                                            className="relative group"
                                        >
                                            <img
                                                src={`/storage/${image}`}
                                                alt={`Submitted image ${
                                                    index + 1
                                                }`}
                                                className={`w-full h-48 object-cover rounded-lg transition-all duration-200 ${
                                                    image === selectedMainImage
                                                        ? "ring-4 ring-pandanwangi"
                                                        : "hover:opacity-90"
                                                }`}
                                                onClick={() =>
                                                    selectAsMainImage(image)
                                                }
                                            />
                                            <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity bg-black bg-opacity-40 rounded-lg">
                                                <button
                                                    onClick={() =>
                                                        selectAsMainImage(image)
                                                    }
                                                    className="bg-pandanwangi text-white px-3 py-1 rounded-md text-sm"
                                                >
                                                    Set as Main
                                                </button>
                                            </div>
                                            {image === selectedMainImage && (
                                                <div className="absolute top-2 right-2">
                                                    <span className="bg-pandanwangi text-white px-2 py-1 rounded-md text-xs font-medium">
                                                        Main Image
                                                    </span>
                                                </div>
                                            )}
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </motion.div>

                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.3, delay: 0.3 }}
                            className="bg-white shadow-lg rounded-xl overflow-hidden mb-6 border-t-4 border-bunulrejo"
                        >
                            <div className="bg-gradient-to-r from-bunulrejo to-lowokwaru px-6 py-4 flex justify-between items-center">
                                <h2 className="text-lg font-semibold text-white flex items-center">
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        className="h-5 w-5 mr-2"
                                        fill="none"
                                        viewBox="0 0 24 24"
                                        stroke="currentColor"
                                    >
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth="2"
                                            d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"
                                        />
                                    </svg>
                                    {isEditing
                                        ? "Edit Property Details"
                                        : "Property Details"}
                                </h2>
                                <button
                                    onClick={() => setIsEditing(!isEditing)}
                                    className="text-white bg-lowokwaru bg-opacity-30 hover:bg-opacity-50 px-3 py-1 rounded-md text-sm flex items-center"
                                >
                                    {isEditing ? (
                                        <>
                                            <svg
                                                xmlns="http://www.w3.org/2000/svg"
                                                className="h-4 w-4 mr-1"
                                                fill="none"
                                                viewBox="0 0 24 24"
                                                stroke="currentColor"
                                            >
                                                <path
                                                    strokeLinecap="round"
                                                    strokeLinejoin="round"
                                                    strokeWidth="2"
                                                    d="M6 18L18 6M6 6l12 12"
                                                />
                                            </svg>
                                            Cancel
                                        </>
                                    ) : (
                                        <>
                                            <svg
                                                xmlns="http://www.w3.org/2000/svg"
                                                className="h-4 w-4 mr-1"
                                                fill="none"
                                                viewBox="0 0 24 24"
                                                stroke="currentColor"
                                            >
                                                <path
                                                    strokeLinecap="round"
                                                    strokeLinejoin="round"
                                                    strokeWidth="2"
                                                    d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 013.536-3.536m-1.086 5.572a1 1 0 011.086-.894 1 1 0 01.894 1.086 1 1 0 01-.894 1.086 1 1 0 01-1.086.894z"
                                                />
                                            </svg>
                                            Edit
                                        </>
                                    )}
                                </button>
                            </div>
                            <div className="p-6">
                                {isEditing ? (
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                                Title
                                            </label>
                                            <input
                                                type="text"
                                                name="property_details.title"
                                                value={
                                                    data.property_details.title
                                                }
                                                onChange={handleInputChange}
                                                className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-bunulrejo focus:border-transparent"
                                            />
                                        </div>
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                                Price (Rp)
                                            </label>
                                            <input
                                                type="number"
                                                name="property_details.price"
                                                value={
                                                    data.property_details.price
                                                }
                                                onChange={handleInputChange}
                                                className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-bunulrejo focus:border-transparent"
                                            />
                                        </div>
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                                Location
                                            </label>
                                            <input
                                                type="text"
                                                name="property_details.place"
                                                value={
                                                    data.property_details.place
                                                }
                                                onChange={handleInputChange}
                                                className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-bunulrejo focus:border-transparent"
                                            />
                                        </div>
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                                Status
                                            </label>
                                            <select
                                                name="property_details.status"
                                                value={
                                                    data.property_details.status
                                                }
                                                onChange={handleInputChange}
                                                className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-bunulrejo focus:border-transparent"
                                            >
                                                <option value="Dijual">
                                                    Dijual
                                                </option>
                                                <option value="Disewa">
                                                    Disewa
                                                </option>
                                                <option value="Terjual">
                                                    Terjual
                                                </option>
                                            </select>
                                        </div>
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                                Land Area (m²)
                                            </label>
                                            <input
                                                type="number"
                                                name="property_details.land_area"
                                                value={
                                                    data.property_details
                                                        .land_area || ""
                                                }
                                                onChange={handleInputChange}
                                                className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-bunulrejo focus:border-transparent"
                                            />
                                        </div>
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                                Certificate Type
                                            </label>
                                            <select
                                                name="property_details.certificate_type"
                                                value={
                                                    data.property_details
                                                        .certificate_type || ""
                                                }
                                                onChange={handleInputChange}
                                                className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-bunulrejo focus:border-transparent"
                                            >
                                                <option value="">
                                                    Select Certificate Type
                                                </option>
                                                <option value="SHM">SHM</option>
                                                <option value="HGB">HGB</option>
                                                <option value="AJB">AJB</option>
                                                <option value="PPJB">
                                                    PPJB
                                                </option>
                                                <option value="Other">
                                                    Other
                                                </option>
                                            </select>
                                        </div>
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                                Google Maps Link
                                            </label>
                                            <input
                                                type="text"
                                                name="property_details.maps"
                                                value={
                                                    data.property_details.maps
                                                }
                                                onChange={handleInputChange}
                                                className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-bunulrejo focus:border-transparent"
                                            />
                                        </div>
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                                WhatsApp Contact
                                            </label>
                                            <input
                                                type="text"
                                                name="property_details.wa"
                                                value={data.property_details.wa}
                                                onChange={handleInputChange}
                                                className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-bunulrejo focus:border-transparent"
                                                placeholder="Format: 628xxxxxxxxxx"
                                            />
                                        </div>
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                                Latitude
                                            </label>
                                            <input
                                                type="text"
                                                name="property_details.latitude"
                                                value={
                                                    data.property_details
                                                        .latitude || ""
                                                }
                                                onChange={handleInputChange}
                                                className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-bunulrejo focus:border-transparent"
                                            />
                                        </div>
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                                Longitude
                                            </label>
                                            <input
                                                type="text"
                                                name="property_details.longitude"
                                                value={
                                                    data.property_details
                                                        .longitude || ""
                                                }
                                                onChange={handleInputChange}
                                                className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-bunulrejo focus:border-transparent"
                                            />
                                        </div>
                                        <div className="md:col-span-2">
                                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                                Description
                                            </label>
                                            <textarea
                                                name="property_details.description"
                                                value={
                                                    data.property_details
                                                        .description
                                                }
                                                onChange={handleInputChange}
                                                rows="3"
                                                className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-bunulrejo focus:border-transparent"
                                            ></textarea>
                                        </div>
                                        <div className="md:col-span-2">
                                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                                Detailed Description
                                            </label>
                                            <textarea
                                                name="property_details.desc_detail"
                                                value={
                                                    data.property_details
                                                        .desc_detail
                                                }
                                                onChange={handleInputChange}
                                                rows="5"
                                                className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-bunulrejo focus:border-transparent"
                                            ></textarea>
                                        </div>
                                        <div className="md:col-span-2">
                                            <div className="flex items-center">
                                                <input
                                                    type="checkbox"
                                                    name="property_details.featured"
                                                    checked={
                                                        data.property_details
                                                            .featured
                                                    }
                                                    onChange={handleInputChange}
                                                    className="h-4 w-4 text-bunulrejo focus:ring-bunulrejo border-gray-300 rounded"
                                                />
                                                <label className="ml-2 block text-sm text-gray-700">
                                                    Feature this property (will
                                                    appear in featured section)
                                                </label>
                                            </div>
                                        </div>
                                    </div>
                                ) : (
                                    <div className="grid md:grid-cols-2 gap-6">
                                        <div className="bg-gray-50 p-3 rounded-lg">
                                            <p className="font-medium text-gray-600 text-sm">
                                                Title:
                                            </p>
                                            <p className="text-gray-900 font-bold">
                                                {data.property_details.title}
                                            </p>
                                        </div>
                                        <div className="bg-gray-50 p-3 rounded-lg">
                                            <p className="font-medium text-gray-600 text-sm">
                                                Price:
                                            </p>
                                            <p className="text-gray-900 font-bold">
                                                Rp{" "}
                                                {parseInt(
                                                    data.property_details.price
                                                ).toLocaleString()}
                                            </p>
                                        </div>
                                        <div className="bg-gray-50 p-3 rounded-lg">
                                            <p className="font-medium text-gray-600 text-sm">
                                                Location:
                                            </p>
                                            <p className="text-gray-900 font-bold">
                                                {data.property_details.place}
                                            </p>
                                        </div>
                                        <div className="bg-gray-50 p-3 rounded-lg">
                                            <p className="font-medium text-gray-600 text-sm">
                                                Status:
                                            </p>
                                            <p className="text-gray-900 font-bold">
                                                {data.property_details.status}
                                            </p>
                                        </div>
                                        <div className="bg-gray-50 p-3 rounded-lg">
                                            <p className="font-medium text-gray-600 text-sm">
                                                Land Area:
                                            </p>
                                            <p className="text-gray-900 font-bold">
                                                {data.property_details.land_area
                                                    ? `${data.property_details.land_area} m²`
                                                    : "Not specified"}
                                            </p>
                                        </div>
                                        <div className="bg-gray-50 p-3 rounded-lg">
                                            <p className="font-medium text-gray-600 text-sm">
                                                Certificate Type:
                                            </p>
                                            <p className="text-gray-900 font-bold">
                                                {data.property_details
                                                    .certificate_type ||
                                                    "Not specified"}
                                            </p>
                                        </div>
                                        <div className="bg-gray-50 p-3 rounded-lg">
                                            <p className="font-medium text-gray-600 text-sm">
                                                Google Maps:
                                            </p>
                                            <p>
                                                {data.property_details.maps ? (
                                                    <a
                                                        href={
                                                            data
                                                                .property_details
                                                                .maps
                                                        }
                                                        target="_blank"
                                                        rel="noopener noreferrer"
                                                        className="text-blue-600 hover:underline"
                                                    >
                                                        View on Maps
                                                    </a>
                                                ) : (
                                                    "Not specified"
                                                )}
                                            </p>
                                        </div>
                                        <div className="bg-gray-50 p-3 rounded-lg">
                                            <p className="font-medium text-gray-600 text-sm">
                                                WhatsApp Contact:
                                            </p>
                                            <p className="text-gray-900 font-bold">
                                                {data.property_details.wa}
                                            </p>
                                        </div>
                                        <div className="bg-gray-50 p-3 rounded-lg">
                                            <p className="font-medium text-gray-600 text-sm">
                                                Featured:
                                            </p>
                                            <p className="text-gray-900 font-bold">
                                                {data.property_details.featured
                                                    ? "Yes"
                                                    : "No"}
                                            </p>
                                        </div>
                                        <div className="bg-gray-50 p-3 rounded-lg">
                                            <p className="font-medium text-gray-600 text-sm">
                                                Coordinates:
                                            </p>
                                            <p className="text-gray-900 font-bold">
                                                {data.property_details
                                                    .latitude &&
                                                data.property_details.longitude
                                                    ? `${data.property_details.latitude}, ${data.property_details.longitude}`
                                                    : "Not specified"}
                                            </p>
                                        </div>
                                        <div className="bg-gray-50 p-3 rounded-lg md:col-span-2">
                                            <p className="font-medium text-gray-600 text-sm">
                                                Description:
                                            </p>
                                            <p className="text-gray-900">
                                                {
                                                    data.property_details
                                                        .description
                                                }
                                            </p>
                                        </div>
                                        <div className="bg-gray-50 p-3 rounded-lg md:col-span-2">
                                            <p className="font-medium text-gray-600 text-sm">
                                                Detailed Description:
                                            </p>
                                            <p className="text-gray-900">
                                                {data.property_details
                                                    .desc_detail ||
                                                    "No detailed description provided."}
                                            </p>
                                        </div>
                                    </div>
                                )}
                            </div>
                        </motion.div>
                    </div>
                    <div className="lg:col-span-1">
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.3, delay: 0.6 }}
                            className="bg-white shadow-lg rounded-xl overflow-hidden mb-6 border-t-4 border-bunulrejo"
                        >
                            <div className="bg-gradient-to-r from-bunulrejo to-lowokwaru px-6 py-4 flex justify-between items-center">
                                <h2 className="text-lg font-semibold text-white flex items-center">
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        className="h-5 w-5 mr-2"
                                        fill="none"
                                        viewBox="0 0 24 24"
                                        stroke="currentColor"
                                    >
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth="2"
                                            d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"
                                        />
                                    </svg>
                                    {isEditing
                                        ? "Edit Property Details"
                                        : "Property Details"}
                                </h2>
                                <button
                                    onClick={() => setIsEditing(!isEditing)}
                                    className="text-white bg-lowokwaru bg-opacity-30 hover:bg-opacity-50 px-3 py-1 rounded-md text-sm flex items-center"
                                >
                                    {isEditing ? (
                                        <>
                                            <svg
                                                xmlns="http://www.w3.org/2000/svg"
                                                className="h-4 w-4 mr-1"
                                                fill="none"
                                                viewBox="0 0 24 24"
                                                stroke="currentColor"
                                            >
                                                <path
                                                    strokeLinecap="round"
                                                    strokeLinejoin="round"
                                                    strokeWidth="2"
                                                    d="M6 18L18 6M6 6l12 12"
                                                />
                                            </svg>
                                            Cancel
                                        </>
                                    ) : (
                                        <>
                                            <svg
                                                xmlns="http://www.w3.org/2000/svg"
                                                className="h-4 w-4 mr-1"
                                                fill="none"
                                                viewBox="0 0 24 24"
                                                stroke="currentColor"
                                            >
                                                <path
                                                    strokeLinecap="round"
                                                    strokeLinejoin="round"
                                                    strokeWidth="2"
                                                    d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 013.536-3.536m-1.086 5.572a1 1 0 011.086-.894 1 1 0 01.894 1.086 1 1 0 01-.894 1.086 1 1 0 01-1.086.894z"
                                                />
                                            </svg>
                                            Edit
                                        </>
                                    )}
                                </button>
                            </div>
                            <div className="p-6">
                                {isEditing ? (
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                                Title
                                            </label>
                                            <input
                                                type="text"
                                                name="property_details.title"
                                                value={
                                                    data.property_details.title
                                                }
                                                onChange={handleInputChange}
                                                className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-bunulrejo focus:border-transparent"
                                            />
                                        </div>
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                                Price (Rp)
                                            </label>
                                            <input
                                                type="number"
                                                name="property_details.price"
                                                value={
                                                    data.property_details.price
                                                }
                                                onChange={handleInputChange}
                                                className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-bunulrejo focus:border-transparent"
                                            />
                                        </div>
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                                Location
                                            </label>
                                            <input
                                                type="text"
                                                name="property_details.place"
                                                value={
                                                    data.property_details.place
                                                }
                                                onChange={handleInputChange}
                                                className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-bunulrejo focus:border-transparent"
                                            />
                                        </div>
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                                Status
                                            </label>
                                            <select
                                                name="property_details.status"
                                                value={
                                                    data.property_details.status
                                                }
                                                onChange={handleInputChange}
                                                className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-bunulrejo focus:border-transparent"
                                            >
                                                <option value="Dijual">
                                                    Dijual
                                                </option>
                                                <option value="Disewa">
                                                    Disewa
                                                </option>
                                                <option value="Terjual">
                                                    Terjual
                                                </option>
                                            </select>
                                        </div>
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                                Land Area (m²)
                                            </label>
                                            <input
                                                type="number"
                                                name="property_details.land_area"
                                                value={
                                                    data.property_details
                                                        .land_area || ""
                                                }
                                                onChange={handleInputChange}
                                                className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-bunulrejo focus:border-transparent"
                                            />
                                        </div>
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                                Certificate Type
                                            </label>
                                            <select
                                                name="property_details.certificate_type"
                                                value={
                                                    data.property_details
                                                        .certificate_type || ""
                                                }
                                                onChange={handleInputChange}
                                                className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-bunulrejo focus:border-transparent"
                                            >
                                                <option value="">
                                                    Select Certificate Type
                                                </option>
                                                <option value="SHM">SHM</option>
                                                <option value="HGB">HGB</option>
                                                <option value="AJB">AJB</option>
                                                <option value="PPJB">
                                                    PPJB
                                                </option>
                                                <option value="Other">
                                                    Other
                                                </option>
                                            </select>
                                        </div>
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                                Google Maps Link
                                            </label>
                                            <input
                                                type="text"
                                                name="property_details.maps"
                                                value={
                                                    data.property_details.maps
                                                }
                                                onChange={handleInputChange}
                                                className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-bunulrejo focus:border-transparent"
                                            />
                                        </div>
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                                WhatsApp Contact
                                            </label>
                                            <input
                                                type="text"
                                                name="property_details.wa"
                                                value={data.property_details.wa}
                                                onChange={handleInputChange}
                                                className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-bunulrejo focus:border-transparent"
                                                placeholder="Format: 628xxxxxxxxxx"
                                            />
                                        </div>
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                                Latitude
                                            </label>
                                            <input
                                                type="text"
                                                name="property_details.latitude"
                                                value={
                                                    data.property_details
                                                        .latitude || ""
                                                }
                                                onChange={handleInputChange}
                                                className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-bunulrejo focus:border-transparent"
                                            />
                                        </div>
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                                Longitude
                                            </label>
                                            <input
                                                type="text"
                                                name="property_details.longitude"
                                                value={
                                                    data.property_details
                                                        .longitude || ""
                                                }
                                                onChange={handleInputChange}
                                                className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-bunulrejo focus:border-transparent"
                                            />
                                        </div>
                                        <div className="md:col-span-2">
                                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                                Description
                                            </label>
                                            <textarea
                                                name="property_details.description"
                                                value={
                                                    data.property_details
                                                        .description
                                                }
                                                onChange={handleInputChange}
                                                rows="3"
                                                className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-bunulrejo focus:border-transparent"
                                            ></textarea>
                                        </div>
                                        <div className="md:col-span-2">
                                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                                Detailed Description
                                            </label>
                                            <textarea
                                                name="property_details.desc_detail"
                                                value={
                                                    data.property_details
                                                        .desc_detail
                                                }
                                                onChange={handleInputChange}
                                                rows="5"
                                                className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-bunulrejo focus:border-transparent"
                                            ></textarea>
                                        </div>
                                        <div className="md:col-span-2">
                                            <div className="flex items-center">
                                                <input
                                                    type="checkbox"
                                                    name="property_details.featured"
                                                    checked={
                                                        data.property_details
                                                            .featured
                                                    }
                                                    onChange={handleInputChange}
                                                    className="h-4 w-4 text-bunulrejo focus:ring-bunulrejo border-gray-300 rounded"
                                                />
                                                <label className="ml-2 block text-sm text-gray-700">
                                                    Feature this property (will
                                                    appear in featured section)
                                                </label>
                                            </div>
                                        </div>
                                    </div>
                                ) : (
                                    <div className="grid md:grid-cols-2 gap-6">
                                        <div className="bg-gray-50 p-3 rounded-lg">
                                            <p className="font-medium text-gray-600 text-sm">
                                                Title:
                                            </p>
                                            <p className="text-gray-900 font-bold">
                                                {data.property_details.title}
                                            </p>
                                        </div>
                                        <div className="bg-gray-50 p-3 rounded-lg">
                                            <p className="font-medium text-gray-600 text-sm">
                                                Price:
                                            </p>
                                            <p className="text-gray-900 font-bold">
                                                Rp{" "}
                                                {parseInt(
                                                    data.property_details.price
                                                ).toLocaleString()}
                                            </p>
                                        </div>
                                        <div className="bg-gray-50 p-3 rounded-lg">
                                            <p className="font-medium text-gray-600 text-sm">
                                                Location:
                                            </p>
                                            <p className="text-gray-900 font-bold">
                                                {data.property_details.place}
                                            </p>
                                        </div>
                                        <div className="bg-gray-50 p-3 rounded-lg">
                                            <p className="font-medium text-gray-600 text-sm">
                                                Status:
                                            </p>
                                            <p className="text-gray-900 font-bold">
                                                {data.property_details.status}
                                            </p>
                                        </div>
                                        <div className="bg-gray-50 p-3 rounded-lg">
                                            <p className="font-medium text-gray-600 text-sm">
                                                Land Area:
                                            </p>
                                            <p className="text-gray-900 font-bold">
                                                {data.property_details.land_area
                                                    ? `${data.property_details.land_area} m²`
                                                    : "Not specified"}
                                            </p>
                                        </div>
                                        <div className="bg-gray-50 p-3 rounded-lg">
                                            <p className="font-medium text-gray-600 text-sm">
                                                Certificate Type:
                                            </p>
                                            <p className="text-gray-900 font-bold">
                                                {data.property_details
                                                    .certificate_type ||
                                                    "Not specified"}
                                            </p>
                                        </div>
                                        <div className="bg-gray-50 p-3 rounded-lg">
                                            <p className="font-medium text-gray-600 text-sm">
                                                Google Maps:
                                            </p>
                                            <p>
                                                {data.property_details.maps ? (
                                                    <a
                                                        href={
                                                            data
                                                                .property_details
                                                                .maps
                                                        }
                                                        target="_blank"
                                                        rel="noopener noreferrer"
                                                        className="text-blue-600 hover:underline"
                                                    >
                                                        View on Maps
                                                    </a>
                                                ) : (
                                                    "Not specified"
                                                )}
                                            </p>
                                        </div>
                                        <div className="bg-gray-50 p-3 rounded-lg">
                                            <p className="font-medium text-gray-600 text-sm">
                                                WhatsApp Contact:
                                            </p>
                                            <p className="text-gray-900 font-bold">
                                                {data.property_details.wa}
                                            </p>
                                        </div>
                                        <div className="bg-gray-50 p-3 rounded-lg">
                                            <p className="font-medium text-gray-600 text-sm">
                                                Featured:
                                            </p>
                                            <p className="text-gray-900 font-bold">
                                                {data.property_details.featured
                                                    ? "Yes"
                                                    : "No"}
                                            </p>
                                        </div>
                                        <div className="bg-gray-50 p-3 rounded-lg">
                                            <p className="font-medium text-gray-600 text-sm">
                                                Coordinates:
                                            </p>
                                            <p className="text-gray-900 font-bold">
                                                {data.property_details
                                                    .latitude &&
                                                data.property_details.longitude
                                                    ? `${data.property_details.latitude}, ${data.property_details.longitude}`
                                                    : "Not specified"}
                                            </p>
                                        </div>
                                        <div className="bg-gray-50 p-3 rounded-lg md:col-span-2">
                                            <p className="font-medium text-gray-600 text-sm">
                                                Description:
                                            </p>
                                            <p className="text-gray-900">
                                                {
                                                    data.property_details
                                                        .description
                                                }
                                            </p>
                                        </div>
                                        <div className="bg-gray-50 p-3 rounded-lg md:col-span-2">
                                            <p className="font-medium text-gray-600 text-sm">
                                                Detailed Description:
                                            </p>
                                            <p className="text-gray-900">
                                                {data.property_details
                                                    .desc_detail ||
                                                    "No detailed description provided."}
                                            </p>
                                        </div>
                                    </div>
                                )}
                            </div>
                        </motion.div>
                    </div>

                    <div className="lg:col-span-1">
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.3, delay: 0.5 }}
                            className="bg-white shadow-lg rounded-xl overflow-hidden mb-6 border-t-4 border-pandanwangi"
                        >
                            <div className="bg-gradient-to-r from-pandanwangi to-blimping px-6 py-4">
                                <h2 className="text-lg font-semibold text-white flex items-center">
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        className="h-5 w-5 mr-2"
                                        fill="none"
                                        viewBox="0 0 24 24"
                                        stroke="currentColor"
                                    >
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth="2"
                                            d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                                        />
                                    </svg>
                                    Admin Actions
                                </h2>
                            </div>
                            <div className="p-6">
                                <div className="mb-6">
                                    <label className="block text-sm font-medium text-gray-700 mb-2">
                                        Admin Notes
                                    </label>
                                    <textarea
                                        name="admin_notes"
                                        value={data.admin_notes}
                                        onChange={handleInputChange}
                                        rows="4"
                                        className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-pandanwangi focus:border-transparent"
                                        placeholder="Add notes about this listing review..."
                                    ></textarea>
                                </div>

                                <div className="space-y-3">
                                    <button
                                        onClick={() =>
                                            handleApprove("approved")
                                        }
                                        disabled={processing}
                                        className="w-full bg-green-600 hover:bg-green-700 disabled:bg-green-400 text-white font-semibold py-3 px-4 rounded-lg transition-colors duration-200 flex items-center justify-center"
                                    >
                                        {processing ? (
                                            <>
                                                <svg
                                                    className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
                                                    xmlns="http://www.w3.org/2000/svg"
                                                    fill="none"
                                                    viewBox="0 0 24 24"
                                                >
                                                    <circle
                                                        className="opacity-25"
                                                        cx="12"
                                                        cy="12"
                                                        r="10"
                                                        stroke="currentColor"
                                                        strokeWidth="4"
                                                    ></circle>
                                                    <path
                                                        className="opacity-75"
                                                        fill="currentColor"
                                                        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                                                    ></path>
                                                </svg>
                                                Processing...
                                            </>
                                        ) : (
                                            <>
                                                <svg
                                                    xmlns="http://www.w3.org/2000/svg"
                                                    className="h-5 w-5 mr-2"
                                                    fill="none"
                                                    viewBox="0 0 24 24"
                                                    stroke="currentColor"
                                                >
                                                    <path
                                                        strokeLinecap="round"
                                                        strokeLinejoin="round"
                                                        strokeWidth="2"
                                                        d="M5 13l4 4L19 7"
                                                    />
                                                </svg>
                                                Approve Listing
                                            </>
                                        )}
                                    </button>

                                    <button
                                        onClick={() =>
                                            handleApprove("rejected")
                                        }
                                        disabled={processing}
                                        className="w-full bg-red-600 hover:bg-red-700 disabled:bg-red-400 text-white font-semibold py-3 px-4 rounded-lg transition-colors duration-200 flex items-center justify-center"
                                    >
                                        {processing ? (
                                            <>
                                                <svg
                                                    className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
                                                    xmlns="http://www.w3.org/2000/svg"
                                                    fill="none"
                                                    viewBox="0 0 24 24"
                                                >
                                                    <circle
                                                        className="opacity-25"
                                                        cx="12"
                                                        cy="12"
                                                        r="10"
                                                        stroke="currentColor"
                                                        strokeWidth="4"
                                                    ></circle>
                                                    <path
                                                        className="opacity-75"
                                                        fill="currentColor"
                                                        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                                                    ></path>
                                                </svg>
                                                Processing...
                                            </>
                                        ) : (
                                            <>
                                                <svg
                                                    xmlns="http://www.w3.org/2000/svg"
                                                    className="h-5 w-5 mr-2"
                                                    fill="none"
                                                    viewBox="0 0 24 24"
                                                    stroke="currentColor"
                                                >
                                                    <path
                                                        strokeLinecap="round"
                                                        strokeLinejoin="round"
                                                        strokeWidth="2"
                                                        d="M6 18L18 6M6 6l12 12"
                                                    />
                                                </svg>
                                                Reject Listing
                                            </>
                                        )}
                                    </button>
                                </div>

                                <div className="mt-6 p-4 bg-gray-50 rounded-lg">
                                    <h4 className="text-sm font-medium text-gray-700 mb-2">
                                        Review Guidelines:
                                    </h4>
                                    <ul className="text-xs text-gray-600 space-y-1">
                                        <li>
                                            • Verify all seller information is
                                            complete
                                        </li>
                                        <li>
                                            • Check image quality and relevance
                                        </li>
                                        <li>
                                            • Ensure property details are
                                            accurate
                                        </li>
                                        <li>
                                            • Confirm payment status if required
                                        </li>
                                    </ul>
                                </div>
                            </div>
                        </motion.div>
                    </div>
                </div>
            </div>
        </AdminLayout>
    );
};

export default ReviewListing;
