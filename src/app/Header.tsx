'use client'
import React, { useState } from 'react';
import Link from 'next/link';
import { FileImage, Menu, X } from 'lucide-react';

const Header: React.FC = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen);
    };

    return (
        <header className="bg-violet-700 text-white p-4">
            <div className="container mx-auto flex justify-between items-center">
                <Link href="/" className="flex items-center space-x-2 text-xl font-bold">
                    <FileImage size={24} />
                    <span>PNG-to-ICO.com</span>
                </Link>

                {/* Desktop Navigation */}
                <nav className="hidden md:block">
                    <ul className="flex space-x-4">
                        <li><Link href="/" className="hover:text-violet-200">Home</Link></li>
                        {/*<li><Link href="/about" className="hover:text-violet-200">About</Link></li>*/}
                        {/*<li><Link href="/contact" className="hover:text-violet-200">Contact</Link></li>*/}
                    </ul>
                </nav>

                {/* Mobile Menu Button */}
                <button className="md:hidden" onClick={toggleMenu}>
                    {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
                </button>
            </div>

            {/* Mobile Navigation */}
            {isMenuOpen && (
                <nav className="md:hidden mt-4">
                    <ul className="flex flex-col space-y-2">
                        <li><Link href="/" className="block hover:text-violet-200" onClick={toggleMenu}>Home</Link></li>
                        <li><Link href="/about" className="block hover:text-violet-200" onClick={toggleMenu}>About</Link></li>
                        <li><Link href="/contact" className="block hover:text-violet-200" onClick={toggleMenu}>Contact</Link></li>
                    </ul>
                </nav>
            )}
        </header>
    );
};

export default Header;