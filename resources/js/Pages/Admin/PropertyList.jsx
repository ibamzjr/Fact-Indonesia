import React from "react";
import { Head, Link } from "@inertiajs/react";
import AdminLayout from "@/Layouts/AdminLayout";
import { motion } from "framer-motion";

const PropertyList = ({ totalListings, properties, listType }) => {
    // Menentukan data yang akan ditampilkan berdasarkan props yang diterima
    const displayData = totalListings || properties;

    const getStatusBadge = (status) => {
        switch (status) {
            case "approved":
                return "bg-green-100 text-green-600 border border-green-200";
            case "pending":
                return "bg-yellow-100 text-yellow-600 border border-yellow-200";
            case "rejected":
                return "bg-red-100 text-red-600 border border-red-200";
            default:
                return "bg-gray-100 text-gray-600 border border-gray-200";
        }
    };

    return (
        <AdminLayout>
            <Head title={listType === "pending" ? "Pending Properties" : "Total Properties"} />
            
            <motion.div 
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
                className="mb-6"
            >
                <h1 className="text-2xl font-bold text-gray-800">
                    {listType === "pending" ? "Pending Properties" : "Total Properties"}
                </h1>
                <p className="text-gray-600 mt-1">
                    {listType === "pending" 
                        ? "Review and manage properties waiting for approval" 
                        : "View and manage all property listings in the system"}
                </p>
            </motion.div>

            {displayData &&
            displayData.data &&
            displayData.data.length === 0 ? (
                <div className="bg-white rounded-xl shadow-sm p-12 text-center">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16 mx-auto text-gray-400 mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
                    </svg>
                    <p className="text-lg text-gray-600">No listings found.</p>
                </div>
            ) : (
                <div className="bg-white rounded-xl shadow-sm overflow-hidden">
                    <div className="overflow-x-auto">
                        <table className="w-full">
                            <thead>
                                <tr className="bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    <th className="px-6 py-4">Full Name</th>
                                    <th className="px-6 py-4">Payment Status</th>
                                    <th className="px-6 py-4">Duration</th>
                                    <th className="px-6 py-4">Submitted At</th>
                                    <th className="px-6 py-4">Status</th>
                                    <th className="px-6 py-4 text-center">Actions</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-200">
                                {displayData &&
                                    displayData.data &&
                                    displayData.data.map((listing) => (
                                        <motion.tr
                                            key={listing.id}
                                            initial={{ opacity: 0 }}
                                            animate={{ opacity: 1 }}
                                            transition={{ duration: 0.2 }}
                                            className="hover:bg-gray-50"
                                        >
                                            <td className="px-6 py-4 whitespace-nowrap">
                                                <div className="font-medium text-gray-900">{listing.full_name}</div>
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap">
                                                <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                                                    listing.is_paid
                                                        ? "bg-green-100 text-green-800"
                                                        : "bg-red-100 text-red-800"
                                                }`}>
                                                    {listing.is_paid
                                                        ? "Paid"
                                                        : "Unpaid"}
                                                </span>
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap text-gray-700">
                                                {listing.package_id
                                                    ? `${listing.package_id * 3} months`
                                                    : "N/A"}
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap text-gray-700">
                                                {new Date(listing.created_at).toLocaleDateString()} 
                                                <span className="text-gray-500 text-xs ml-1">
                                                    {new Date(listing.created_at).toLocaleTimeString()}
                                                </span>
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap">
                                                <span className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusBadge(listing.admin_status)}`}>
                                                    {listing.admin_status || "N/A"}
                                                </span>
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap text-center">
                                                <Link
                                                    href={route(
                                                        "admin.properties.review",
                                                        listing.id
                                                    )}
                                                    className="inline-flex items-center px-4 py-2 bg-blimbing text-white text-sm font-medium rounded-md hover:bg-opacity-90 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blimbing"
                                                >
                                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                                                    </svg>
                                                    Review
                                                </Link>
                                            </td>
                                        </motion.tr>
                                    ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            )}
        </AdminLayout>
    );
};

export default PropertyList;
