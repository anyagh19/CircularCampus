"use client"

import React, { useState } from 'react';
import { Search, User, ShoppingBag } from 'lucide-react';
import Link from 'next/link';
import { Dialog, DialogContent, DialogTrigger } from '@/Components/ui/dialog';
import { Button } from '@/Components/ui/button';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/Components/ui/dropdown-menu';

// Mock product data – replace with your API fetch
const MOCK_PRODUCTS = [
    {
        id: 1,
        name: "Calculus Textbook, 9th Edition",
        price: 45.00,
        campusCode: "4077",
        imageUrl: "https://images.unsplash.com/photo-1544947950-fa07a98d237f?w=400&h=300&fit=crop",
        sellerInitials: "AS",
        condition: "Like New"
    },
    {
        id: 2,
        name: "TI-84 Plus Calculator",
        price: 60.00,
        campusCode: "4077",
        imageUrl: "https://images.unsplash.com/photo-1611174797136-5d96f9e4e14a?w=400&h=300&fit=crop",
        sellerInitials: "JD",
        condition: "Good"
    },
    {
        id: 3,
        name: "Ergonomic Desk Chair",
        price: 120.00,
        campusCode: "4112",
        imageUrl: "https://images.unsplash.com/photo-1592078615290-033ee5849e6f?w=400&h=300&fit=crop",
        sellerInitials: "MK",
        condition: "Excellent"
    },
    {
        id: 4,
        name: "MacBook Pro 2022 (M2)",
        price: 1100.00,
        campusCode: "4077",
        imageUrl: "https://images.unsplash.com/photo-1611186871348-b1ce696e52c9?w=400&h=300&fit=crop",
        sellerInitials: "AS",
        condition: "Used - Mint"
    },
    {
        id: 5,
        name: "Organic Chemistry Lab Coat",
        price: 25.00,
        campusCode: "4112",
        imageUrl: "https://images.unsplash.com/photo-1614181825044-6d8e0ca0136c?w=400&h=300&fit=crop",
        sellerInitials: "NW",
        condition: "New"
    },
    {
        id: 6,
        name: "Bicycle - Hybrid 21 Speed",
        price: 200.00,
        campusCode: "4077",
        imageUrl: "https://images.unsplash.com/photo-1485965120184-e220f721d03e?w=400&h=300&fit=crop",
        sellerInitials: "TR",
        condition: "Used"
    },
];

function Page() {
    const [searchTerm, setSearchTerm] = useState('');

    const filteredProducts = MOCK_PRODUCTS.filter(product =>
        product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        product.campusCode.includes(searchTerm)
    );

    return (
        <div className="min-h-screen bg-white font-sans text-neutral-900 antialiased selection:bg-neutral-100">
            {/* Navbar – minimalist with user sign */}
            <nav className="sticky top-0 z-10 bg-white/80 backdrop-blur-md border-b border-neutral-100">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex items-center justify-between h-16">
                        {/* Left: Logo / Brand */}
                        <div className="flex items-center gap-2">
                            <ShoppingBag size={20} className="text-neutral-700" />
                            <span className="text-lg font-semibold tracking-tight text-neutral-900">CampusMart</span>
                        </div>

                        {/* Right: Action */}

                        {/* <div className="w-7 h-7 rounded-full bg-neutral-200 flex items-center justify-center">
                <User size={14} className="text-neutral-600" />
              </div> */}
                        <DropdownMenu>
                            <DropdownMenuTrigger>
                                <div className="w-7 h-7 rounded-full bg-neutral-200 flex items-center justify-center">
                <User size={14} className="text-neutral-600" />
              </div>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent>
                                <Link href="/student" >
                                    <DropdownMenuItem>Profile</DropdownMenuItem>
                                </Link>
                                <Link href="/products/add-product">
                                    <DropdownMenuItem>Add Product</DropdownMenuItem>
                                </Link>
                                <Link href="/products/my">
                                    <DropdownMenuItem>My Products</DropdownMenuItem>
                                </Link>
                                <Link href="/chats">
                                    <DropdownMenuItem>Chats</DropdownMenuItem>
                                </Link>
                                <Link href="/logout">
                                    <DropdownMenuItem>Log Out</DropdownMenuItem>
                                </Link>
                            </DropdownMenuContent>
                        </DropdownMenu>

                    </div>
                </div>
            </nav>

            {/* Main Content */}
            <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                {/* Page Heading */}
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-8">
                    <div>
                        <h1 className="text-2xl font-semibold tracking-tight text-neutral-900">Campus Marketplace</h1>
                        <p className="mt-1 text-sm text-neutral-500">Buy & sell from students around you</p>
                    </div>
                    <div className="relative w-full sm:w-64">
                        <Search size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-neutral-400" />
                        <input
                            type="text"
                            placeholder="Search by name or campus code"
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="w-full pl-10 pr-4 py-2.5 text-sm bg-neutral-50 border border-neutral-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-neutral-200 focus:border-neutral-300 transition placeholder:text-neutral-400"
                        />
                    </div>
                </div>

                {/* Product Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
                    {filteredProducts.map((product) => (
                        <ProductCard key={product.id} product={product} />
                    ))}
                </div>

                {/* Empty State */}
                {filteredProducts.length === 0 && (
                    <div className="text-center py-16">
                        <p className="text-neutral-400 text-sm">No products found.</p>
                    </div>
                )}
            </main>
        </div>
    );
}

// Minimalist Product Card
const ProductCard = ({ product }) => (
    <div className="group bg-white border border-neutral-200 rounded-2xl overflow-hidden hover:border-neutral-300 transition duration-200 cursor-pointer">
        {/* Image */}
        <div className="relative h-48 w-full overflow-hidden bg-neutral-100">
            <img
                src={product.imageUrl}
                alt={product.name}
                className="h-full w-full object-cover group-hover:scale-105 transition-transform duration-500"
                loading="lazy"
            />
            {/* Seller Badge */}
            <div className="absolute top-3 left-3">
                <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-medium bg-white/80 backdrop-blur-sm text-neutral-700 shadow-sm">
                    <span className="w-4 h-4 rounded-full bg-neutral-300 flex items-center justify-center text-[10px] font-bold text-neutral-600">
                        {product.sellerInitials}
                    </span>
                    {product.campusCode}
                </span>
            </div>
        </div>

        {/* Details */}
        <div className="p-4">
            <div className="flex items-start justify-between gap-2">
                <h3 className="text-sm font-medium text-neutral-900 leading-snug line-clamp-2 flex-1">{product.name}</h3>
            </div>
            <div className="mt-2 flex items-center justify-between">
                <span className="text-base font-semibold text-neutral-900">${product.price.toFixed(2)}</span>
                <span className="text-xs text-neutral-400 bg-neutral-100 px-2 py-0.5 rounded-full">{product.condition}</span>
            </div>
        </div>
    </div>
);

export default Page;