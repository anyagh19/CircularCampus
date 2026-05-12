"use client"

import React, { useEffect, useState } from 'react';
import { ArrowLeft, ShoppingBag } from 'lucide-react';
import Link from 'next/link';
import axios from 'axios';
import api from '@/api/api';

function AddProductForm() {
//   const [formData, setFormData] = useState({
//     productName: '',
//     productDescription: '',
//     productImageUrl: '',
//     productCategory: '',
//     productPrice: '',
//   });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [productName , setProductName] = useState('')
  const [productDescription , setProductDescription] = useState('')
  const [productImageUrl , setProductImageUrl] = useState('')
  const [productCategory , setProductCategory] = useState('')
  const [productPrice , setProductPrice] = useState('')
  const [campusCode, setCampusCode] = useState('');
  const [studentId, setStudentId] = useState('');

  useEffect(() => {
    const fetchCampusCodeAndStudentId = async () => {
        const res = await axios.get('/api/campus-code')
        setCampusCode(res.data.campusCode)

        const res1 = await axios.get('/api/studentId')
        setStudentId(res1.data.studentId)
    }
    fetchCampusCodeAndStudentId()
  } , [])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    try {
        const res = await api.post(`/Product/create_product/${campusCode}/${studentId}` , {
            productName : productName,
            productDescription : productDescription,
            productCategory : productCategory,
            productImageUrl : productImageUrl,
            productPrice : parseInt(productPrice)
        })
        if(res.status == 200){
            console.log("successs")
        }
    } catch (error) {
        setIsSubmitting(false)
        console.log("unsuccess" , error)
    }
  }

  return (
    <div className="min-h-screen bg-white font-sans text-neutral-900 antialiased selection:bg-neutral-100">
      {/* Minimalist top bar */}
      <div className="border-b border-neutral-100">
        <div className="max-w-xl mx-auto px-4 py-4 flex items-center justify-between">
          <Link
            href="/products"
            className="flex items-center gap-1 text-sm text-neutral-500 hover:text-neutral-900 transition-colors"
          >
            <ArrowLeft size={16} />
            Back
          </Link>
          <div className="flex items-center gap-2">
            <ShoppingBag size={18} className="text-neutral-700" />
            <span className="font-semibold tracking-tight">UniMart</span>
          </div>
          <div className="w-14" /> {/* spacer for symmetry */}
        </div>
      </div>

      {/* Form Container – narrow, focused */}
      <main className="max-w-xl mx-auto px-4 py-10">
        <h1 className="text-2xl font-semibold tracking-tight text-neutral-900 mb-2">Add Product</h1>
        <p className="text-sm text-neutral-500 mb-8">List an item for sale on your campus marketplace.</p>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Product Name */}
          <div>
            <label htmlFor="productName" className="block text-sm font-medium text-neutral-700 mb-1.5">
              Product Name <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              id="productName"
              name="productName"
              required
              value={productName}
              onChange={e => setProductName(e.target.value)}
              placeholder="e.g. Calculus Textbook, 9th Edition"
              className="w-full px-4 py-2.5 text-sm bg-neutral-50 border border-neutral-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-neutral-200 focus:border-neutral-300 transition placeholder:text-neutral-400"
            />
          </div>

          {/* Description */}
          <div>
            <label htmlFor="productDescription" className="block text-sm font-medium text-neutral-700 mb-1.5">
              Description <span className="text-red-500">*</span>
            </label>
            <textarea
              id="productDescription"
              name="productDescription"
              required
              rows={3}
              value={productDescription}
              onChange={e => setProductDescription(e.target.value)}
              placeholder="Condition, usage time, any extra details..."
              className="w-full px-4 py-2.5 text-sm bg-neutral-50 border border-neutral-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-neutral-200 focus:border-neutral-300 transition placeholder:text-neutral-400 resize-none"
            />
          </div>

          {/* Image URL */}
          <div>
            <label htmlFor="productImageUrl" className="block text-sm font-medium text-neutral-700 mb-1.5">
              Image URL <span className="text-red-500">*</span>
            </label>
            <input
              type="url"
              id="productImageUrl"
              name="productImageUrl"
              required
              value={productImageUrl}
              onChange={e => setProductImageUrl(e.target.value)}
              placeholder="https://example.com/image.jpg"
              className="w-full px-4 py-2.5 text-sm bg-neutral-50 border border-neutral-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-neutral-200 focus:border-neutral-300 transition placeholder:text-neutral-400"
            />
          </div>

          {/* Category & Price in a row */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label htmlFor="productCategory" className="block text-sm font-medium text-neutral-700 mb-1.5">
                Category <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                id="productCategory"
                name="productCategory"
                required
                value={productCategory}
                onChange={e => setProductCategory(e.target.value)}
                placeholder="Textbooks"
                className="w-full px-4 py-2.5 text-sm bg-neutral-50 border border-neutral-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-neutral-200 focus:border-neutral-300 transition placeholder:text-neutral-400"
              />
            </div>
            <div>
              <label htmlFor="productPrice" className="block text-sm font-medium text-neutral-700 mb-1.5">
                Price ($) <span className="text-red-500">*</span>
              </label>
              <input
                type="number"
                id="productPrice"
                name="productPrice"
                required
                min="0"
                step="0.01"
                value={productPrice}
                onChange={e => setProductPrice(e.target.value)}
                placeholder="0.00"
                className="w-full px-4 py-2.5 text-sm bg-neutral-50 border border-neutral-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-neutral-200 focus:border-neutral-300 transition placeholder:text-neutral-400"
              />
            </div>
          </div>

          

          {/* Submit Button */}
          <div className="pt-2">
            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full py-2.5 px-4 text-sm font-medium text-white bg-neutral-900 hover:bg-neutral-800 rounded-xl transition disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isSubmitting ? 'Listing...' : 'List Product'}
            </button>
          </div>
        </form>
      </main>
    </div>
  );
}

export default AddProductForm;