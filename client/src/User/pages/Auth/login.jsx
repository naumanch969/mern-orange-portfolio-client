import React from 'react'
import './login.css'

const login = () => {

    return (
        <div className='wrapper relative bg-[#1c1c1c] w-[300px] h-[430px] rounded-[8px] overflow-hidden ' >
            <div className="absolute flex flex-col inset-[2px] rounded-[8px] z-[10] bg-[#28292d] px-[20px] py-[50px]  ">
                <h2 className='text-orange text-center tracking-[0.1em] font-medium ' >Sign In</h2>
                <div className="inputBox relative w-full mt-[35px] ">
                    <input type="text" required='required' className='pt-[20px] px-[10px] pb-[10px] relative w-full bg-transparent border-none outline-none text-[#23242a] text-[1em] tracking-[0.5em] z-10 ' />
                    <label className='absolute left-0 pt-[20px] px-0 pb-[10px] text-[1em] text-[#8f8f8f] pointer-events-none tracking-[.5em] transition-[.5s] ' >Username</label>
                    <i className='absolute left-0 bottom-0 w-full h-[2px] bg-orange rounded-[4px] transition-[.5s] pointer-events-none z-[9' ></i>
                </div>
                <div className="inputBox relative w-full mt-[35px] ">
                    <input type="password" required='required' className='pt-[20px] px-[10px] pb-[10px] relative w-full bg-transparent border-none outline-none text-[#23242a] text-[1em] tracking-[0.5em] z-10 ' />
                    <label className='absolute left-0 pt-[20px] px-0 pb-[10px] text-[1em] text-[#8f8f8f] pointer-events-none tracking-[.5em] transition-[.5s] ' >Password</label>
                    <i className='absolute left-0 bottom-0 w-full h-[2px] bg-orange rounded-[4px] transition-[.5s] pointer-events-none z-[9' ></i>
                </div>
                <div className="flex justify-between">
                    <a href="#" className='hover:text-orange my-[10px] text-[0.75em] text-[#8f8f8f] decoration-none ' >Forget Password</a>
                    <a href="#" className='hover:text-orange my-[10px] text-[0.75em] text-[#8f8f8f] decoration-none ' >Signup</a>
                </div>
                <input type="submit" value="Login" className='active:opacity-80 border-none outline-none bg-orange py-[11px] px-[25px] w-[100px] mt-[10px] rounded-[4px] font-semibold cursor-pointer ' />
            </div>
        </div>
    )
}

export default login