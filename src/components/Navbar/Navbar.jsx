import React, { useContext, useEffect, useState } from 'react';
import { NavLink, useNavigate } from "react-router-dom";
import { FaBars, FaTimes } from 'react-icons/fa';
import logo from '../../assets/logo.svg';
import './Navbar.module.css';
import { CounterContext } from '../../../context/counterContext';
import { CartContext } from '../../../context/cartContext';


function Navbar() {
    const [isOpen, setIsOpen] = useState(false);
const { Login,setLogin } = useContext(CounterContext); 
    const toggleMenu = () => {
        setIsOpen(!isOpen);
       
        
       
    };
  
function Logout(){
    setLogin(null);
    localStorage.removeItem('usertoken');
    localStorage.removeItem('userToken');

    navigate('/login')
}
let navigate =useNavigate()
let{cart}= useContext(CartContext)

    return (
        <div className="   flex justify-between items-center z-50 fixed w-full p-2 top-0 bg-gray-100 lg:flex-row">
       
        <div className="flex items-center gap-8">
            <img src={logo} alt="Logo" className="h-10" />
       
            <ul className="hidden lg:flex gap-4">
                {Login !== null && (
                    <>
                        <NavLink to='/home'>Home</NavLink>
                        <NavLink to='/about'>Wish List</NavLink>
                        <NavLink to='/cart'>Cart</NavLink>
                        <NavLink to='/categories'>Category</NavLink>
                        <NavLink to='/brand'>Brand</NavLink>
                        <NavLink to='/products'>Products</NavLink>
                    </>
                )}
            </ul>
        </div>
    
        {/* Right Section: Cart, Logout, and Social Icons */}
        <div className="flex items-center gap-4">
            <NavLink to='/cart'>
            {Login !== null &&<>            <i class="fa-solid fa-cart-shopping fa-2x relative top-5"></i> <h2 className='bg-green-400 text-center p-0.5 relative left-5 bottom-7 me-3  '>{cart ? cart.numOfCartItems : 0}</h2>
                </>}
            </NavLink>
        
            
            {Login === null ? (
                <>
                    <NavLink to='/login'>Login</NavLink>
                    <NavLink to='/register'>Register</NavLink>
                </>
            ) : (
                <span onClick={Logout} className="cursor-pointer">Logout</span>
            )}
    
            {/* Social Media Icons */}
            <i className='fab fa-facebook mx-1 my-1'></i>
            <i className='fab fa-youtube mx-1 my-1'></i>
            <i className='fab fa-instagram mx-1 my-1'></i>
    
            {/* Mobile Menu Button */}
            <button onClick={toggleMenu} className="lg:hidden text-2xl">
                {isOpen ? <FaTimes /> : <FaBars />}
            </button>
        </div>
    
        {/* Mobile Navigation Menu */}
        {isOpen && (
            <div className="absolute top-16 left-0 w-full bg-sky-50 p-5 flex flex-col lg:hidden">
                {Login !== null && (
                    <>
                        <NavLink to='/home'>Home</NavLink>
                        <NavLink to='/about'>About</NavLink>
                        <NavLink to='/cart'>Cart</NavLink>
                        <NavLink to='/categories'>Category</NavLink>
                        <NavLink to='/brand'>Brand</NavLink>
                        <NavLink to='/products'>Products</NavLink>
                    </>
                )}
            </div>
        )}
    </div>
    
    );
}

export default Navbar;
