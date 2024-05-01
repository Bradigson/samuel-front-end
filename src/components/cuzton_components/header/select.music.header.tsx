
import './select.music.header.scss';
import { Link} from 'react-router-dom';
import React, { useState, useEffect } from 'react';
const Header = ()=>{

    //para detectar cuando el scroll sea mayo a 60

    //paso 1
    const [isScrolled, setIsScrolled] = useState(false);    


    //paso 2
    const handleScroll = () => {
        const scrollTop = window.scrollY; 
        setIsScrolled(scrollTop > 250); // Ajusta el umbral según lo que prefieras
    };

    //opaso 3
    useEffect(() => {
        window.addEventListener('scroll', handleScroll);
        return () => {
        window.removeEventListener('scroll', handleScroll);
        };
    }, []);


    return (

        <header className={`header ${isScrolled ? 'header-scrolled' : ''}`}>

            <div className='header_nav-logo'>
                logo aca
            </div>

            <nav className="header-navbar">
                <Link to="/all_songs" className="header-link">Home</Link>
                <Link to="" className="header-link">Feature</Link>
                <Link to="" className="header-link">Client</Link>
                <Link to="" className="header-link">Price</Link>
                <Link to="" className="header-link">Contact</Link>
            </nav>
        </header>
       
    )
}



export default Header;


