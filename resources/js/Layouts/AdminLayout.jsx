import React, { useState } from "react";
import { Link, usePage } from "@inertiajs/react";
import { motion } from "framer-motion";

const AdminLayout = ({ children }) => {
    const { url } = usePage();
    const [isCollapsed, setIsCollapsed] = useState(false);

    const menuItems = [
        { 
            name: "Dashboard", 
            route: "admin.dashboard", 
            icon: (
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                </svg>
            ) 
        },
        { 
            name: "Total Listings", 
            route: "admin.properties.total", 
            icon: (
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                </svg>
            ) 
        },
        { 
            name: "Pending Listings", 
            route: "admin.properties.pending", 
            icon: (
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
            ) 
        }
        // Menghapus menu Users dan Settings yang belum memiliki route
    ];

    const isActive = (route) => {
        return url.startsWith(`/admin/${route.split('.')[1]}`);
    };

    return (
        <div className="min-h-screen bg-gray-50 flex">
            {/* Sidebar */}
            <motion.div 
                className={`${isCollapsed ? 'w-20' : 'w-64'} bg-gradient-to-b from-blimbing to-color4 text-white transition-all duration-300 ease-in-out shadow-xl z-10`}
                initial={{ x: -10, opacity: 0.8 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ duration: 0.3 }}
            >
                <div className="p-6 flex items-center justify-between">
                    {!isCollapsed && (
                        <motion.h2 
                            className="text-2xl font-bold text-white"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 0.2 }}
                        >
                            Admin Panel
                        </motion.h2>
                    )}
                    <button 
                        onClick={() => setIsCollapsed(!isCollapsed)}
                        className="p-2 rounded-full hover:bg-white/10 transition-colors"
                    >
                        {isCollapsed ? (
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 5l7 7-7 7M5 5l7 7-7 7" />
                            </svg>
                        ) : (
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M11 19l-7-7 7-7m8 14l-7-7 7-7" />
                            </svg>
                        )}
                    </button>
                </div>
                
                <div className="mt-6">
                    {menuItems.map((item, index) => (
                        <Link
                            key={index}
                            href={route(item.route)}
                            className={`flex items-center py-3 px-6 ${
                                isActive(item.route)
                                    ? "bg-white/20 border-l-4 border-white"
                                    : "hover:bg-white/10 border-l-4 border-transparent"
                            } transition-all duration-200`}
                        >
                            <span className="text-white">{item.icon}</span>
                            {!isCollapsed && (
                                <span className="ml-3 text-white font-medium">{item.name}</span>
                            )}
                        </Link>
                    ))}
                </div>
                
                <div className="absolute bottom-0 left-0 right-0 p-6">
                    <Link
                        href={route('home')}
                        className="flex items-center py-2 px-4 rounded-lg bg-white/10 hover:bg-white/20 transition-colors"
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                        </svg>
                        {!isCollapsed && <span className="ml-2 text-white">Back to Site</span>}
                    </Link>
                </div>
            </motion.div>
            
            {/* Main Content */}
            <div className="flex-1 overflow-x-hidden">
                {/* Top Bar */}
                <div className="bg-white shadow-sm py-4 px-6 flex justify-between items-center">
                    <h1 className="text-xl font-semibold text-gray-800">
                        Admin Dashboard
                    </h1>
                    <div className="flex items-center space-x-4">
                        <div className="relative">
                            <button className="p-2 rounded-full hover:bg-gray-100 transition-colors">
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-gray-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
                                </svg>
                            </button>
                        </div>
                        <div className="h-8 w-8 rounded-full bg-blimbing flex items-center justify-center text-white font-bold">
                            A
                        </div>
                    </div>
                </div>
                
                {/* Page Content */}
                <div className="p-6">
                    <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.3 }}
                        className="bg-white rounded-xl shadow-sm p-6"
                    >
                        {children}
                    </motion.div>
                </div>
            </div>
        </div>
    );
};

export default AdminLayout;
