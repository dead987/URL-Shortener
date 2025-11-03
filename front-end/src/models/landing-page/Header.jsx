import { useNavigate, Link } from 'react-router-dom';
import { Link2, ArrowRight, Zap, Shield, BarChart3 } from 'lucide-react';

const Header = () => {
    const navigate = useNavigate();

    const token = typeof window !== 'undefined' ? localStorage.getItem('token') : null;
    const isLoggedIn = Boolean(token);

    const handleLogout = () => {
        try {
            localStorage.removeItem('token');
            localStorage.removeItem('userEmail');
        } catch (e) {
            // ignore
        }
        navigate('/login');
    };

    const handleGetStarted = () => {
        navigate('/register');
    };

    return (
        <div className="relative min-h-screen bg-gradient-to-br from-[#0f172a] via-[#1e293b] to-[#0f172a] overflow-hidden">
            {/* Premium Dark Background Image with Overlay */}
            <div 
                className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1451187580459-43490279c0fa?q=80&w=2072&auto=format&fit=crop')] bg-cover bg-center opacity-20"
            ></div>
            
            {/* Gradient Overlay */}
            <div className="absolute inset-0 bg-gradient-to-b from-slate-900/50 via-slate-900/70 to-slate-900/90"></div>

            {/* Animated background elements */}
            <div className="absolute inset-0 overflow-hidden">
                <div className="absolute top-20 right-20 w-96 h-96 bg-slate-700/20 rounded-full mix-blend-overlay filter blur-3xl opacity-30 animate-blob"></div>
                <div className="absolute bottom-20 left-20 w-96 h-96 bg-slate-600/20 rounded-full mix-blend-overlay filter blur-3xl opacity-30 animate-blob animation-delay-2000"></div>
            </div>

            {/* Grid pattern overlay */}
            <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_80%_50%_at_50%_50%,black,transparent)]"></div>

            {/* Navigation */}
            <nav className="relative z-10 border-b border-white/5 bg-slate-900/50 backdrop-blur-md">
                <div className="max-w-7xl mx-auto px-10 sm:px-10">
                    <div className="flex items-center justify-between h-16">
                        {/* Logo */}
                        <Link to="/" className="flex items-center space-x-2 group">
                            <div className="w-8 h-8 bg-gradient-to-br from-slate-600 to-slate-700 rounded-lg flex items-center justify-center group-hover:from-slate-500 group-hover:to-slate-600 transition-all">
                                <Link2 className="w-5 h-5 text-slate-100" />
                            </div>
                            <span className="text-lg font-semibold text-slate-100 tracking-tight">URLify</span>
                        </Link>

                        {/* Center Navigation */}
                        <ul className="hidden md:flex items-center space-x-8 ml-20">
                            {/* <li>
                                <Link to="/" className="text-slate-300 hover:text-white transition-colors text-sm font-medium">
                                    Home
                                </Link>
                            </li> */}
                            {/* <li>
                                <a href="#features" className="text-slate-300 hover:text-white transition-colors text-sm font-medium">
                                    Features
                                </a>
                            </li> */}
                            {/* <li>
                                <a href="#about" className="text-slate-300 hover:text-white transition-colors text-sm font-medium">
                                    About
                                </a>
                            </li> */}
                            {isLoggedIn && (
                                <li>
                                    <Link to="/dashboard" className="text-slate-300 hover:text-white transition-colors text-sm font-medium">
                                        Dashboard
                                    </Link>
                                </li>
                            )}
                        </ul>

                        {/* Right Navigation */}
                        <div className="flex items-center space-x-4">
                            {isLoggedIn ? (
                                <button
                                    onClick={handleLogout}
                                    className="px-4 py-2 text-sm font-medium text-slate-300 hover:text-white transition-colors"
                                >
                                    Logout
                                </button>
                            ) : (
                                <>
                                    <Link
                                        to="/login"
                                        className="px-4 py-2 text-sm font-medium text-slate-300 hover:text-white transition-colors"
                                    >
                                        Login
                                    </Link>
                                    <Link
                                        to="/register"
                                        className="px-4 py-2 bg-slate-700 hover:bg-slate-600 text-slate-100 text-sm font-medium rounded-lg transition-all"
                                    >
                                        Register
                                    </Link>
                                </>
                            )}
                        </div>
                    </div>
                </div>
            </nav>

            {/* Hero Section */}
            <div className="relative z-10 max-w-7xl mx-auto px-6 sm:px-8">
                <div className="flex flex-col items-center justify-center min-h-[calc(100vh-4rem)] text-center">
                    {/* Badge */}
                    <div className="inline-flex items-center space-x-2 px-4 py-2 bg-slate-800/50 backdrop-blur-sm border border-slate-700/50 rounded-full mb-8">
                        <Zap className="w-4 h-4 text-slate-400" />
                        <span className="text-xs text-slate-300 font-medium">Fast, Secure & Reliable</span>
                    </div>

                    {/* Main Heading */}
                    <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold text-white mb-6 tracking-tight">
                        Shorten URLs
                        <br />
                        <span className="bg-gradient-to-r from-slate-300 to-slate-500 bg-clip-text text-transparent">
                            Track Performance
                        </span>
                    </h1>

                    {/* Subheading */}
                    <p className="text-lg sm:text-xl text-slate-400 max-w-2xl mb-12 leading-relaxed">
                        Transform long, complex URLs into short, memorable links. Monitor clicks, analyze traffic, and optimize your digital presence.
                    </p>

                    {/* CTA Buttons */}
                    <div className="flex flex-col sm:flex-row items-center gap-4">
                        <button
                            onClick={handleGetStarted}
                            className="px-8 py-3.5 bg-slate-700 hover:bg-slate-600 text-white font-medium rounded-lg transition-all transform hover:scale-[1.02] shadow-lg flex items-center group"
                        >
                            Get Started Free
                            <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
                        </button>
                        <a
                            href="#features"
                            className="px-8 py-3.5 bg-transparent border border-slate-600 hover:border-slate-500 text-slate-300 hover:text-white font-medium rounded-lg transition-all"
                        >
                            Learn More
                        </a>
                    </div>

                    {/* Stats Section */}
                    <div className="grid grid-cols-3 gap-8 mt-20 pt-12 border-t border-slate-800/50">
                        <div className="text-center">
                            <p className="text-3xl font-bold text-white mb-1">10K+</p>
                            <p className="text-sm text-slate-400">URLs Shortened</p>
                        </div>
                        <div className="text-center">
                            <p className="text-3xl font-bold text-white mb-1">99.9%</p>
                            <p className="text-sm text-slate-400">Uptime</p>
                        </div>
                        <div className="text-center">
                            <p className="text-3xl font-bold text-white mb-1">5K+</p>
                            <p className="text-sm text-slate-400">Active Users</p>
                        </div>
                    </div>
                </div>
            </div>

            {/* Features Section */}
            <div id="features" className="relative z-10 max-w-7xl mx-auto px-6 sm:px-8 pb-20">
                <div className="grid md:grid-cols-3 gap-8">
                    {/* Feature 1 */}
                    <div className="bg-slate-800/40 backdrop-blur-xl rounded-2xl border border-slate-700/50 p-8 hover:border-slate-600/50 transition-all">
                        <div className="w-12 h-12 bg-slate-700/50 rounded-xl flex items-center justify-center mb-4">
                            <Zap className="w-6 h-6 text-slate-300" />
                        </div>
                        <h3 className="text-xl font-semibold text-white mb-3">Lightning Fast</h3>
                        <p className="text-slate-400 text-sm leading-relaxed">
                            Generate shortened URLs instantly with our optimized infrastructure. No delays, no waiting.
                        </p>
                    </div>

                    {/* Feature 2 */}
                    <div className="bg-slate-800/40 backdrop-blur-xl rounded-2xl border border-slate-700/50 p-8 hover:border-slate-600/50 transition-all">
                        <div className="w-12 h-12 bg-slate-700/50 rounded-xl flex items-center justify-center mb-4">
                            <Shield className="w-6 h-6 text-slate-300" />
                        </div>
                        <h3 className="text-xl font-semibold text-white mb-3">Secure & Private</h3>
                        <p className="text-slate-400 text-sm leading-relaxed">
                            Enterprise-grade security with encrypted links and privacy-first architecture.
                        </p>
                    </div>

                    {/* Feature 3 */}
                    <div className="bg-slate-800/40 backdrop-blur-xl rounded-2xl border border-slate-700/50 p-8 hover:border-slate-600/50 transition-all">
                        <div className="w-12 h-12 bg-slate-700/50 rounded-xl flex items-center justify-center mb-4">
                            <BarChart3 className="w-6 h-6 text-slate-300" />
                        </div>
                        <h3 className="text-xl font-semibold text-white mb-3">Track Analytics</h3>
                        <p className="text-slate-400 text-sm leading-relaxed">
                            Monitor clicks, locations, and referrers with detailed analytics dashboard.
                        </p>
                    </div>
                </div>
            </div>

            {/* Animation styles */}
            <style jsx>{`
                @keyframes blob {
                    0% { transform: translate(0px, 0px) scale(1); }
                    33% { transform: translate(30px, -50px) scale(1.1); }
                    66% { transform: translate(-20px, 20px) scale(0.9); }
                    100% { transform: translate(0px, 0px) scale(1); }
                }
                .animate-blob {
                    animation: blob 7s infinite;
                }
                .animation-delay-2000 {
                    animation-delay: 2s;
                }
            `}</style>
        </div>
    );
};

export default Header;
