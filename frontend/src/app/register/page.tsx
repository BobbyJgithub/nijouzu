'use client'

import { useState } from 'react';
import Link from 'next/link';

export default function Home() {
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [formData, setFormData] = useState({ username: '', email: '', password: '', confirmPassword: '' });
    // Initialized as an object where each key is a string and each value is a string.
    const [formErrors, setFormErrors] = useState<{ [key: string]: string }>({});

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData((prev) => {
            const updated = { ...prev, [name]: value };
            // Real-time confirmPassword validation
            if (name === 'confirmPassword' || (name === 'password' && prev.confirmPassword)) {
                if (updated.password !== updated.confirmPassword) {
                    setFormErrors((prevErrs) => ({ ...prevErrs, confirmPassword: 'Passwords do not match' }));
                } else {
                    setFormErrors((prevErrs) => ({ ...prevErrs, confirmPassword: '' }));
                }
            }
            return updated;
        });

        // Clear errors for other fields when start typing
        if (formErrors[name] && name !== 'confirmPassword') {
            setFormErrors((prev) => ({ ...prev, [name]: '' }));
        }
    };

    const validateForm = () => {
        const newErrors: { [key: string]: string } = {};

        // Basic validation rules
        // Must be between 3 and 24 characters and only contain letters, numbers, or dash
        if (!formData.username || formData.username.length < 3 || formData.username.length > 24 || !/^[a-zA-Z0-9-]+$/.test(formData.username)) {
            newErrors.username = 'Username must be between 3 and 24 characters and can only contain letters, numbers, and dashes';
        }
        if (!formData.email || !/\S+@\S+\.\S+/.test(formData.email)) {
            newErrors.email = 'Please enter a valid email address';
        }
        if (!formData.password || formData.password.length < 6 || !/[A-Z]/.test(formData.password) || !/[0-9]/.test(formData.password)) {
            newErrors.password = 'Password must be at least 6 characters and contain at least one uppercase letter and one number';
        }
        if (formData.password !== formData.confirmPassword) {
            newErrors.confirmPassword = 'Passwords do not match';
        }

        setFormErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    }

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!validateForm()) {
            return; // Stop submission if validation fails
        }

        setIsLoading(true);

        try {
            await new Promise((resolve) => setTimeout(resolve, 2000)); // Simulate API call
            console.log('Registration successful:', formData);
        } catch (error) {
            console.error('Registration failed:', error);
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
                            Start your Japanese learning journey
                        </p>
                    </div>

                    <div className="card bg-base-100 border border-base-200 shadow-lg card-lg w-lg">
                        <form onSubmit={handleSubmit} className="card-body flex flex-col items-center justify-center" noValidate>
                            <div className="card-title text-2xl">Create Account</div>
                            <div className="card-actions">
                                <div className="flex flex-col gap-8 justify-center items-center mt-5">
                                    {/* Username Input */}
                                    <div>
                                        <label className="input validator w-xs">
                                            <svg className="h-[1em] opacity-50" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                                                <g
                                                    strokeLinejoin="round"
                                                    strokeLinecap="round"
                                                    strokeWidth="2.5"
                                                    fill="none"
                                                    stroke="currentColor"
                                                >
                                                    <path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2"></path>
                                                    <circle cx="12" cy="7" r="4"></circle>
                                                </g>
                                            </svg>
                                            <input
                                                type="text"
                                                required
                                                placeholder="Username"
                                                pattern="[A-Za-z][A-Za-z0-9\-]*"
                                                minLength={3}
                                                maxLength={24}
                                                title="Only letters, numbers or dash"
                                                name="username"
                                                value={formData.username}
                                                onChange={handleInputChange}
                                            />
                                        </label>
                                        <p className="validator-hint hidden">
                                            Must be 3 to 24 characters
                                            <br />containing only letters, numbers or dash
                                        </p>
                                    </div>
                                    <div>
                                        {/** Email Input */}
                                        <label className="input validator w-xs">
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
                                                pattern="\S+@\S+\.\S+"
                                                required />
                                        </label>
                                        <p className="validator-hint hidden">Must be a valid email address</p>
                                    </div>
                                    <div>
                                        {/** Password Input */}
                                        <label className="input validator w-xs">
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
                                                minLength={6}
                                                pattern="(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,}"
                                                title="Must be more than 6 characters, including at least one number, one lowercase letter, and one uppercase letter"
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
                                        <p className="validator-hint hidden">
                                            Must be more than 6 characters, including:
                                            <br />At least one number <br />At least one lowercase letter <br />At least one uppercase letter
                                        </p>
                                    </div>
                                    <div>
                                        {/** Confirm Password Input */}
                                        <label className={`input w-xs${formErrors.confirmPassword ? ' input-error' : (formData.confirmPassword && !formErrors.confirmPassword ? ' input-success' : '')}`}>
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
                                                type={showConfirmPassword ? "text" : "password"}
                                                required
                                                placeholder="Confirm Password"
                                                value={formData.confirmPassword}
                                                onChange={handleInputChange}
                                                name="confirmPassword"
                                            />
                                            <button
                                                type="button"
                                                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                                                className="btn btn-ghost btn-sm btn-link"
                                            >
                                                {showConfirmPassword ? (
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
                                        {formErrors.confirmPassword && (
                                            <p className="text-error text-xs mt-1">{formErrors.confirmPassword}</p>
                                        )}
                                    </div>
                                    <button
                                        type="submit"
                                        disabled={isLoading}
                                        className="btn rounded-field btn-primary btn-sm w-3xs"
                                    >
                                        {isLoading && <span className="loading loading-spinner loading-sm"></span>}
                                        {isLoading ? 'Creating Account...' : 'Create Account'}
                                    </button>
                                </div>
                            </div>
                            {/* Login Link */}
                            <div className="text-center text-sm text-base-content/70 mt-4">
                                Already have an account?{' '}
                                <Link href="/login" className="link link-info">
                                    Sign in here
                                </Link>
                            </div>
                        </form>
                    </div>
                    <div className="text-center mt-6">
                        <p className="text-xs text-base-content/50">
                            いらっしゃいませ！ (Irasshaimase!) - Welcome!
                        </p>
                    </div>
                </div>
            </div >
        </main >
    )
}
