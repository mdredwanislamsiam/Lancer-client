import React, { useEffect, useState } from 'react';
import defImg from "../assets/images/DefaultImage.jpg";
import { FaEnvelope, FaPhone, FaMapMarkerAlt, FaUser, FaFacebook, FaTwitter, FaLinkedin, FaGithub, FaInstagram } from 'react-icons/fa';
import InfoItem from '../components/infoPage/InfoItem';
import { useParams } from 'react-router';
import authAPIClient from '../services/auth-api-client';

const InfoPage = () => {
    const {  id } = useParams(); 
    console.log(id); 
    const [user, setUser] = useState(null); 

    const fetchUser = async () => {
        try {
            const res = await authAPIClient.get(`/users/${id}/`);
            console.log(res); 
            setUser(res.data)
        }
        catch (error) {
            console.log(error)
        }
    }

    useEffect(() => {
        fetchUser(); 
    }, [id])

    if (!user) return; 

    return (
        <div className="min-h-screen  text-white flex items-center justify-center p-4 relative overflow-hidden">
            <div className="relative w-full max-w-4xl bg-white/10  border border-white/20 rounded-3xl shadow-2xl overflow-hidden flex flex-col md:flex-row transition-all duration-500 group/card">
                
                {/* Left Side*/}
                <div className="w-full md:w-1/3 bg-black/20 p-8 flex flex-col items-center justify-center text-center border-r border-white/10 relative overflow-hidden">
                    <div className="relative w-48 h-48 mb-6 hover:scale-105 transition-transform duration-500">
                        <div className="absolute inset-0 bg-gradient-to-tr from-gray-500 to-black rounded-full opacity-75 blur-md"></div>
                        <img 
                            src={user?.image || defImg} 
                            alt="Profile" 
                            className="relative w-full h-full object-cover rounded-full border-4 border-white/20 shadow-lg z-10" 
                        />
                    </div>
                    <h1 className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-black to-[#3c6a95] mb-2">{user.username}</h1>
                    <p className="text-gray-600 font-medium tracking-wide">{user.role}</p>
                    
                    {/* Social Links */}
                    <div className="flex gap-4 mt-6">
                         {[FaFacebook, FaTwitter, FaLinkedin, FaGithub, FaInstagram].map((Icon, index) => (
                             <a key={index} href="#" className="p-2 bg-gray-500/45 rounded-full hover:bg-white/20 shadow-sm  hover:text-blue-800 transition-colors duration-300">
                                 <Icon size={18} />
                             </a>
                         ))}
                    </div>

                    <button className='mt-10 bg-black rounded-2xl px-5 py-1 font-semibold hover:bg-black/70 focus:scale-95 hover:scale-105 shadow-lg duration-300 transition-all'>
                        Contact Me
                    </button>
                </div>

                {/* Right Side */}
                <div className="w-full md:w-2/3 p-8 md:p-12 flex flex-col justify-center">
                    <div className="space-y-6">
                        {/* Header */}
                        <div className="border-b border-white/10 pb-4 mb-4">
                             <h2 className="text-2xl font-semibold text-black">Personal Information</h2>
                             <p className="text-sm text-gray-400 mt-1"></p>
                        </div>

                        {/* Info Grid */}
                        <div className="grid grid-cols-1 gap-6">
                            <InfoItem icon={FaUser} label="Full Name" value={user.first_name +" " +  user.last_name}/>
                            <InfoItem icon={FaEnvelope} label="Email Address" value={user.email} />
                            <InfoItem icon={FaPhone} label="Phone Number" value={user.phone_number} />
                            <InfoItem icon={FaMapMarkerAlt} label="Address" value={user.address} />
                        </div>

                        {/* Bio Section */}
                        <div className="mt-8 bg-white/5 p-6 rounded-2xl border border-white/5 hover:border-white/10 transition-colors">
                            <h3 className="text-lg font-semibold text-[#315991] mb-3">About Me</h3>
                            <p className="text-gray-700 leading-relaxed break-word text-sm">
                               {user.bio}
                            </p>
                        </div>
                    </div>
                </div>
                
                {/* Decorative Circle */}
                <div className="absolute -top-24 -right-24 w-64 h-64 bg-blue-500/10 rounded-full blur-3xl pointer-events-none"></div>
            </div>
        </div>
    );
};


export default InfoPage;