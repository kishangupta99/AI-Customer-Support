"use client"

import React, { useEffect, useRef, useState } from 'react'
import { AnimatePresence, motion } from "motion/react"
import axios from 'axios'
import { useRouter } from 'next/navigation'



const HomeClient = ({ email }: { email: string }) => {

    const [loading, setLoading] = useState(false)


    const handleLogin = () => {
        setLoading(true)
        window.location.href = "/api/auth/login"
    }

    const firstletter = email ? email[0].toUpperCase() : "";
    const [open, setOpen] = useState(false);
    // agr khi pe bhi click kre dashboard pe to login popup hat jaye...
    const popupRef = useRef<HTMLDivElement>(null)
    useEffect(() => {
        const handler = (e: MouseEvent) => {
            if (popupRef.current && !popupRef.current.contains(e.target as Node))
                setOpen(false)
        }
        document.addEventListener("mousedown", handler)
        return () => document.removeEventListener("mousedown", handler)

    }, [])

    // handle Logout
    const handleLogout = async () =>{
        try {
            const result = await axios.get("/api/auth/logout");
            window.location.href="/";

        } catch (error) {
            console.log(error)
        }
    }

    
    const navigate = useRouter()

    // card data map from here...
    const features = [
        {
            title:"Plug & play",
            desc: "Add the Chatbot to your site with a single script tag."
        },
        {
            title:"Admin controlled",
            desc: "You control exactly what the AI knows and answers."
        },
        {
            title:"Always online",
            desc: "Your customer get instant support 24/7."
        }
    ]

    return (
        <div className='min-h-screen bg-linear-to-br from-white to-zinc-50 text-zinc-900 overflow-x-hidden'>

            {/* Navbar */}
            <motion.div
                initial={{ y: -50 }}
                animate={{ y: 0 }}
                transition={{ duration: 0.5 }}
                className='fixed top-0 left-0 w-full z-50 bg-white/70 backdrop-blur-xl border-b border-zinc-200'
            >
                <div className='max-w-7xl mx-auto px-6 h-16 flex items-center justify-between'>
                    <div className='text-lg font-semibold tracking-tight'>Support  <span className='text-zinc-400'>AI</span></div>

                    {email ? <div className='relative' ref={popupRef}>
                        <button className='w-10 h-10 rounded-full bg-black text-white flex items-center
                        justify-center font-semibold hover:scale-105 transition'
                            onClick={() => setOpen(!open)}
                        >{firstletter}</button>


                        <AnimatePresence>
                            {open && (
                                <motion.div
                                    initial={{ opacity: 0, y: -8 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    exit={{ opacity: 0, y: -8 }}
                                    className='absolute right-0 mt-3 w-44 bg-white rounded-xl
                             border border-zinc-200 overflow-hidden'>
                                    <button 
                                    onClick={() => navigate.push("/dashboard")}
                                    className='w-full text-left px-4 py-3 text-sm hover:bg-zinc-100'>Dashboard</button>
                                    <button 
                                    onClick={handleLogout}
                                    className='block px-4 py-3 text-sm text-red-600 hover:bg-zinc-100'>Logout</button>

                                </motion.div>
                            )}
                        </AnimatePresence>



                    </div>
                        : <button
                            className='px-5 py-2 rounded-full bg-black text-white text-sm font-medium
                 hover:bg-zinc-800 transition disabled:opacity-60 flex items-center gap-2'
                            onClick={handleLogin}
                            disabled={loading}
                        >
                            {loading?"Loading...":"Login"}
                        </button>
                    }
                </div>

            </motion.div>



            {/* Home page UI */}
            <section className='pt-36 pb-18 px-6'>
                <div className='max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-20 items-center'>
                    {/* left div */}
                    <motion.div
                        initial={{ opacity: 0, y: 40 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.7 }}
                    >
                        <h1 className='text-4xl md:text-5xl font-semibold leading-tight'>
                            AI Customer Support <br /> Built for Modern Websites
                        </h1>
                        <p className='mt-6 text-lg text-zinc-600 max-w-xl'>
                            Add a powerful AI chatbot to your website in minutes. Let your customers
                            get instant answer using your own business knowledge.
                        </p>
                        <div className='mt-10 flex gap-4'>

                            {email ? <button 
                            className='px-7 py-3 rounded-xl bg-black text-white font-medium hover:bg-zinc-800
                            transition disabled:opacity-60'    onClick={() => navigate.push("/dashboard")}>Go to Dashboard</button>
                             :<button 
                             onClick={handleLogin}
                            className='px-7 py-3 rounded-xl bg-black text-white font-medium hover:bg-zinc-800
                            transition disabled:opacity-60'>Get Started</button>}
                            

                            <a href='#feature' className='px-7 py-3 rounded-xl border border-zinc-300 text-zinc-700
                             hover:bg-zinc-100 transition'>Learn More</a>
                        </div>


                    </motion.div>



                    {/* Right Div */}
                    <motion.div 
                    initial={{opacity:0, scale:0.85}}
                    animate={{opacity:1, scale:1}}
                    transition={{duration:0.7, delay:0.2}}
                    className='relative'>

                        {/* Ui for shown chatbot how it look like */}
                        <div className='rounded-2xl bg-white shadow-2xl border border-zinc-200 p-6'>
                            <div className='text-sm text-zinc-500 mb-3'>Live Chat Preview</div>
                            <div className='space-y-3'>
                                <div className='bg-black text-white rounded-lg px-4 py-2 text-sm ml-auto w-fit'>Do you offer cash on delivery?</div>
                                <div className='bg-zinc-100 rounded-lg px-4 py-2 text-sm w-fit'>Yes, Cash On Delivery is available.</div>
                            </div>

                        <motion.div
                        animate={{y: [0, -14, 0]}}
                        transition={{repeat:Infinity, duration:3}}
                        className='absolute -bottom-6 -right-6 w-14 h-14 rounded-full bg-black text-white flex items-center
                        justify-center shadow-xl'
                        >
                            💬
                         </motion.div>
                        </div>

                        
                    </motion.div>

                </div>
            </section>





            {/* Features Section */}
            <section
            id='feature'
            className='bg-zinc-50 py-28 px-6 border-t border-zinc-200 mt-28'
            >
                <div className='max-w-6xl mx-auto'>
                    <motion.h2
                    initial={{opacity:0, y:20}}
                    whileInView={{opacity:1, y:0}}
                    viewport={{once:false}}
                    transition={{duration:0.8}}
                     className='text-3xl font-semibold text-center'>
                        Why Buissnesses Choose SupportAI
                    </motion.h2>

                    {/* all three 3 cards */}
                    <div className='mt-16 grid grid-cols-1 md:grid-cols-3 gap-10'>
                        {features.map((f,index) =>(
                            <motion.div
                            key={index}
                            initial={{opacity:0, y:30}}
                            whileInView={{opacity:1, y:0}}
                            viewport={{once:false}}
                            transition={{delay:index*0.1}}
                            className='bg-white rounded-2xl p-8 shadow-lg border border-zinc-200'
                            >
                                <h1 className='text-lg font-medium'>{f.title}</h1>
                                <p className='mt-3 text-zinc-600 text-sm'>{f.desc}</p>
                            </motion.div>

                        ))}

                    </div>


                </div>

            </section>




            {/* Footer Section */}
            <footer className='py-10 text-center text-sm text-zinc-500'>
                &copy; {new Date().getFullYear()} SupportAI. All rights reserved(kishan)
            </footer>


        </div>
    )
}

export default HomeClient