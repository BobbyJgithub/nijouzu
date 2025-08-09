'use client'

import React, { useState } from 'react';
import Link from 'next/link';

export default function LoginPage() {
    const [showPassword, setShowPassword] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [formData, setFormData] = useState({ email: '', password: '' });

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);

        // Simulate Api Call
        try {
            await new Promise((resolve) => setTimeout(resolve, 2000));
            console.log('Login successful:', formData);
        } catch (error) {
            console.error("Login failed:", error);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <main className="min-h-screen bg-base-100 text-base-content">
            <div className="flex flex-col items-center justify-center min-h-screen p-8">
                <div className="w-full max-w-4xl">


                    {/* Header */}
                    <div className="text-center mb-12">
                        <h1 className="text-6xl font-bold mb-4">🗾 Nijouzu</h1>
                        <p className="text-base-content/70">
                            Welcome back to your Japanese learning journey
                        </p>
                    </div>

                    <div className="card bg-base-100 border border-base-200 shadow-lg card-lg w-lg">
                        <form onSubmit={handleSubmit} className="card-body flex flex-col items-center justify-center" noValidate>
                            <div className="card-title text-2xl">Sign In</div>
                            <div className="card-actions">
                                <div className="flex flex-col gap-8 justify-center items-center mt-5">
                                    <div>
                                        {/** Email Input */}
                                        <label className="input w-xs">
                                            <svg className="h-[1em] opacity-50" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                                                <g
                                                    strokeLinejoin="round"
                                                    strokeLinecap="round"
                                                    strokeWidth="2.5"
                                                    fill="none"
                                                    stroke="currentColor"
                                                >
                                                    <rect width="20" height="16" x="2" y="4" rx="2"></rect>
                                                    <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"></path>
                                                </g>
                                            </svg>
                                            <input
                                                type="email"
                                                name="email"
                                                placeholder="Email"
                                                value={formData.email}
                                                onChange={handleInputChange}
                                                required />
                                        </label>
                                    </div>
                                    <div>
                                        {/** Password Input */}
                                        <label className="input w-xs">
                                            <svg className="h-[1em] opacity-50" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                                                <g
                                                    strokeLinejoin="round"
                                                    strokeLinecap="round"
                                                    strokeWidth="2.5"
                                                    fill="none"
                                                    stroke="currentColor"
                                                >
                                                    <path
                                                        d="M2.586 17.414A2 2 0 0 0 2 18.828V21a1 1 0 0 0 1 1h3a1 1 0 0 0 1-1v-1a1 1 0 0 1 1-1h1a1 1 0 0 0 1-1v-1a1 1 0 0 1 1-1h.172a2 2 0 0 0 1.414-.586l.814-.814a6.5 6.5 0 1 0-4-4z"
                                                    ></path>
                                                    <circle cx="16.5" cy="7.5" r=".5" fill="currentColor"></circle>
                                                </g>
                                            </svg>
                                            <input
                                                type={showPassword ? "text" : "password"}
                                                required
                                                placeholder="Password"
                                                value={formData.password}
                                                onChange={handleInputChange}
                                                name="password"
                                            />
                                            <button
                                                type="button"
                                                onClick={() => setShowPassword(!showPassword)}
                                                className="btn btn-ghost btn-sm btn-link"
                                            >
                                                {showPassword ? (
                                                    <svg className="h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                                        <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24" />
                                                        <line x1="1" y1="1" x2="23" y2="23" />
                                                    </svg>
                                                ) : (
                                                    <svg className="h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                                        <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
                                                        <circle cx="12" cy="12" r="3" />
                                                    </svg>
                                                )}
                                            </button>
                                        </label>
                                    </div>
                                    <div>
                                        {/* Remember & Forgot Password */}
                                        <div className="flex items-center justify-between text-sm">
                                            <label className="flex items-center gap-2 cursor-pointer">
                                                <input type="checkbox" className="checkbox checkbox-xs" />
                                                <span className="text-base-content/70">Remember me</span>
                                            </label>
                                            <span className="mx-10"></span>
                                            <Link href="/forgot-password" className="link link-info">
                                                Forgot password?
                                            </Link>
                                        </div>
                                    </div>
                                    <button
                                        type="submit"
                                        disabled={isLoading}
                                        className="btn rounded-field btn-primary btn-sm w-3xs"
                                    >
                                        {isLoading && <span className="loading loading-spinner loading-sm"></span>}
                                        {isLoading ? 'Signing in...' : 'Sign In'}
                                    </button>
                                </div>
                            </div>
                            {/* Register Link */}
                            <div className="text-center text-sm text-base-content/80 mt-4">
                                Don't have an account?{' '}
                                <Link href="/register" className="link link-info">
                                    Create one here
                                </Link>
                            </div>
                        </form>
                    </div>
                    <div className="text-center mt-6">
                        <p className="text-xs text-base-content/50">
                            頑張って！ (Ganbatte!) - Good luck with your studies!
                        </p>
                    </div>
                </div>
            </div >
        </main >
    )
}
