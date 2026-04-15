"use client";

import Link from "next/link";
import { useState } from "react";
import { ArrowLeft, School, Mail, Lock, User, ShieldCheck, NotebookTabs } from "lucide-react";
import api from "@/api/api";
import { useRouter } from "next/navigation";

export default function LoginForm() {
    const [isLoading, setIsLoading] = useState(false);
    const [cred, setCred] = useState('')
    const [password, setPassword] = useState('')

    const router = useRouter();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        // Basic validation
        if (!cred || !password) return;

        setIsLoading(true);
        try {
            const response = await api.post('/Auth/login', {
                Identifier: cred,
                Password: password
            });

            if (response.status === 200) {
                router.push("/dashboard"); 
                // window.location.href = "/auth/login"; 
            }
        } catch (error: any) {
            console.error("Registration Error:", error.response?.data || error.message);
            alert(error.response?.data?.message || "Network Error: Is the backend running?");
        } finally {
            setIsLoading(false); // Spinner stops exactly when request ends
        }
    };
    return (
        <div className="min-h-screen bg-white flex flex-col justify-center items-center px-6 py-12">
            {/* Back Button */}
            <Link
                href="/"
                className="absolute top-8 left-8 flex items-center gap-2 text-zinc-500 hover:text-zinc-900 transition-colors text-sm font-medium"
            >
                <ArrowLeft className="w-4 h-4" />
                Back to Home
            </Link>

            <div className="w-full max-w-[400px] space-y-8">
                {/* Header */}
                <div className="text-center space-y-2">
                    <div className="inline-flex items-center justify-center w-12 h-12 rounded-2xl bg-green-50 text-green-600 mb-4">
                        <School className="w-6 h-6" />
                    </div>
                    <h1 className="text-3xl font-bold tracking-tight text-zinc-900">Enter the circle</h1>
                    <p className="text-zinc-500 text-sm">
                        Login with your campus account to start trading sustainably.
                    </p>
                </div>

                {/* Form */}
                <form onSubmit={handleSubmit} className="space-y-4">
                    <div className="space-y-4">
                      
                       

                        {/* University Email */}
                        <div className="relative">
                            <Mail className="absolute left-4 top-3.5 w-5 h-5 text-zinc-400" />
                            <input
                                type="email"
                                placeholder="Credential Email or PRN"
                                required
                                value={cred}
                                onChange={e => setCred(e.target.value)}
                                className="w-full pl-12 pr-4 py-3 bg-zinc-50 border border-zinc-100 rounded-2xl focus:outline-none focus:ring-2 focus:ring-green-500/20 focus:border-green-500 transition-all placeholder:text-zinc-400"
                            />
                        </div>

                        {/* Password */}
                        <div className="relative">
                            <Lock className="absolute left-4 top-3.5 w-5 h-5 text-zinc-400" />
                            <input
                                type="password"
                                placeholder="Create Password"
                                required
                                value={password}
                                onChange={e => setPassword(e.target.value)}
                                className="w-full pl-12 pr-4 py-3 bg-zinc-50 border border-zinc-100 rounded-2xl focus:outline-none focus:ring-2 focus:ring-green-500/20 focus:border-green-500 transition-all placeholder:text-zinc-400"
                            />
                        </div>
                    </div>

                    <div className="flex items-start gap-3 py-2">
                        <ShieldCheck className="w-5 h-5 text-green-600 mt-0.5" />
                        <p className="text-[12px] text-zinc-500 leading-tight">
                            By registering, you agree to our community guidelines. We only allow verified students to ensure campus safety.
                        </p>
                    </div>

                    <button
                        type="submit"
                        disabled={isLoading}
                        className="w-full py-4 bg-zinc-900 text-white rounded-2xl font-semibold hover:bg-zinc-800 transition-all active:scale-[0.98] disabled:opacity-70 disabled:cursor-not-allowed"
                    >
                        {isLoading ? "Logging in..." : "Login"}
                    </button>
                </form>

                <p className="text-center text-sm text-zinc-500">
                    create an account?{" "}
                    <Link href="/auth/register_campus" className="text-green-600 font-semibold hover:underline">
                        Register
                    </Link>
                </p>
            </div>
        </div>
    );
}