import { Head, Link } from "@inertiajs/react";
import { motion } from "framer-motion";
import AdminLayout from "@/Layouts/AdminLayout";
import { useState } from "react";

const StatCard = ({ title, value, icon, color, percentage }) => {
    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
            className="bg-white rounded-xl shadow-sm p-6 border-l-4 hover:shadow-md transition-shadow"
            style={{ borderLeftColor: color }}
        >
            <div className="flex justify-between items-start">
                <div>
                    <p className="text-sm font-medium text-gray-500">{title}</p>
                    <h3 className="text-3xl font-bold mt-1" style={{ color }}>
                        {value}
                    </h3>
                    {percentage && (
                        <div className="flex items-center mt-2">
                            <span className={`text-xs font-medium ${percentage >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                                {percentage >= 0 ? '+' : ''}{percentage}%
                            </span>
                            <span className="text-xs text-gray-500 ml-1">dari bulan lalu</span>
                        </div>
                    )}
                </div>
                <div className="p-3 rounded-lg" style={{ backgroundColor: `${color}20` }}>
                    {icon}
                </div>
            </div>
        </motion.div>
    );
};

const AdminDashboard = ({ auth, propertyStats, recentListings }) => {
    const [timeFilter, setTimeFilter] = useState('week');
    
    return (
        <AdminLayout>
            <Head title="Admin Dashboard" />
            
            <div className="flex justify-between items-center mb-8">
                <div>
                    <h1 className="text-2xl font-bold text-gray-800">Dashboard Overview</h1>
                    <p className="text-gray-500 mt-1">Welcome back, Admin!</p>
                </div>
                <div className="flex space-x-2 bg-gray-100 p-1 rounded-lg">
                    {['week', 'month', 'year'].map((period) => (
                        <button
                            key={period}
                            onClick={() => setTimeFilter(period)}
                            className={`px-4 py-2 text-sm font-medium rounded-md transition-colors ${
                                timeFilter === period
                                    ? 'bg-white text-blimping shadow-sm'
                                    : 'text-gray-600 hover:text-blimping'
                            }`}
                        >
                            {period.charAt(0).toUpperCase() + period.slice(1)}
                        </button>
                    ))}
                </div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                <StatCard
                    title="Total Properties"
                    value={propertyStats.total_properties}
                    percentage={12}
                    color="#4F46E5"
                    icon={
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-indigo-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                        </svg>
                    }
                />
                
                <StatCard
                    title="Pending Properties"
                    value={propertyStats.pending_properties}
                    percentage={-5}
                    color="#F59E0B"
                    icon={
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-amber-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                    }
                />
                
                <StatCard
                    title="Active Properties"
                    value={propertyStats.active_properties}
                    percentage={8}
                    color="#10B981"
                    icon={
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-emerald-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                    }
                />
            </div>
            
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <div className="lg:col-span-2">
                    <div className="bg-white rounded-xl shadow-sm p-6 h-full">
                        <div className="flex justify-between items-center mb-6">
                            <h2 className="text-lg font-semibold text-gray-800">Recent Listings</h2>
                            <Link href={route('admin.properties.pending')} className="text-sm font-medium text-blimping hover:underline">
                                View All
                            </Link>
                        </div>
                        
                        <div className="overflow-x-auto">
                            <table className="min-w-full divide-y divide-gray-200">
                                <thead>
                                    <tr>
                                        <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                            Property
                                        </th>
                                        <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                            Owner
                                        </th>
                                        <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                            Status
                                        </th>
                                        <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                            Date
                                        </th>
                                        <th className="px-4 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                                            Action
                                        </th>
                                    </tr>
                                </thead>
                                <tbody className="bg-white divide-y divide-gray-200">
                                    {recentListings && recentListings.map((listing, index) => (
                                        <tr key={index} className="hover:bg-gray-50">
                                            <td className="px-4 py-4 whitespace-nowrap">
                                                <div className="flex items-center">
                                                    <div className="h-10 w-10 flex-shrink-0 rounded-md bg-gray-200 overflow-hidden">
                                                        {listing.land_photos && listing.land_photos[0] && (
                                                            <img 
                                                                src={`/storage/${listing.land_photos[0]}`} 
                                                                alt="Property" 
                                                                className="h-10 w-10 object-cover"
                                                            />
                                                        )}
                                                    </div>
                                                    <div className="ml-4">
                                                        <div className="text-sm font-medium text-gray-900">
                                                            {listing.full_name || 'Property #' + listing.id}
                                                        </div>
                                                        <div className="text-sm text-gray-500">
                                                            {listing.status}
                                                        </div>
                                                    </div>
                                                </div>
                                            </td>
                                            <td className="px-4 py-4 whitespace-nowrap">
                                                <div className="text-sm text-gray-900">{listing.full_name}</div>
                                                <div className="text-sm text-gray-500">{listing.phone_number}</div>
                                            </td>
                                            <td className="px-4 py-4 whitespace-nowrap">
                                                <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-yellow-100 text-yellow-800">
                                                    {listing.admin_status || 'pending'}
                                                </span>
                                            </td>
                                            <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-500">
                                                {listing.created_at}
                                            </td>
                                            <td className="px-4 py-4 whitespace-nowrap text-right text-sm font-medium">
                                                <Link 
                                                    href={route('admin.properties.review', listing.id)} 
                                                    className="text-blimping hover:text-blimping/80"
                                                >
                                                    Review
                                                </Link>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
                
                <div className="lg:col-span-1">
                    <div className="bg-white rounded-xl shadow-sm p-6 h-full">
                        <h2 className="text-lg font-semibold text-gray-800 mb-6">Activity Overview</h2>
                        
                        <div className="space-y-6">
                            <div>
                                <div className="flex justify-between items-center mb-2">
                                    <span className="text-sm font-medium text-gray-600">New Listings</span>
                                    <span className="text-sm font-semibold text-gray-900">65%</span>
                                </div>
                                <div className="w-full bg-gray-200 rounded-full h-2">
                                    <div className="bg-blue-600 h-2 rounded-full" style={{ width: '65%' }}></div>
                                </div>
                            </div>
                            
                            <div>
                                <div className="flex justify-between items-center mb-2">
                                    <span className="text-sm font-medium text-gray-600">Approved</span>
                                    <span className="text-sm font-semibold text-gray-900">40%</span>
                                </div>
                                <div className="w-full bg-gray-200 rounded-full h-2">
                                    <div className="bg-green-500 h-2 rounded-full" style={{ width: '40%' }}></div>
                                </div>
                            </div>
                            
                            <div>
                                <div className="flex justify-between items-center mb-2">
                                    <span className="text-sm font-medium text-gray-600">Pending</span>
                                    <span className="text-sm font-semibold text-gray-900">25%</span>
                                </div>
                                <div className="w-full bg-gray-200 rounded-full h-2">
                                    <div className="bg-yellow-500 h-2 rounded-full" style={{ width: '25%' }}></div>
                                </div>
                            </div>
                            
                            <div>
                                <div className="flex justify-between items-center mb-2">
                                    <span className="text-sm font-medium text-gray-600">Rejected</span>
                                    <span className="text-sm font-semibold text-gray-900">10%</span>
                                </div>
                                <div className="w-full bg-gray-200 rounded-full h-2">
                                    <div className="bg-red-500 h-2 rounded-full" style={{ width: '10%' }}></div>
                                </div>
                            </div>
                        </div>
                        
                        <div className="mt-8 pt-6 border-t border-gray-200">
                            <h3 className="text-sm font-medium text-gray-600 mb-4">Recent Activity</h3>
                            
                            <div className="space-y-4">
                                {[1, 2, 3].map((_, index) => (
                                    <div key={index} className="flex items-start">
                                        <div className="flex-shrink-0 h-8 w-8 rounded-full bg-indigo-100 flex items-center justify-center">
                                            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-indigo-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4v16m8-8H4" />
                                            </svg>
                                        </div>
                                        <div className="ml-3">
                                            <p className="text-sm font-medium text-gray-900">New property added</p>
                                            <p className="text-xs text-gray-500">2 hours ago</p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </AdminLayout>
    );
};

export default AdminDashboard;
