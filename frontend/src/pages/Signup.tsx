import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import {
  User,
  Mail,
  Lock,
  Eye,
  EyeOff,
  Building,
  CheckCircle,
  XCircle,
  Brain,
  ArrowRight,
  Sparkles,
  Github,
  Linkedin,
  AlertCircle,
} from "lucide-react";
import PasswordStrength from "../components/common/UI/PasswordStrength";
import { useAuth } from "../contexts/AuthContext";
import "./Signup.css";

const Signup = () => {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    company: "",
    password: "",
    confirmPassword: "",
    acceptTerms: false,
    receiveUpdates: true,
  });

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);
  const [step, setStep] = useState(1);

  const navigate = useNavigate();
  const { login } = useAuth();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const validateStep1 = () => {
    if (!formData.firstName.trim()) {
      setError("First name is required");
      return false;
    }
    if (!formData.lastName.trim()) {
      setError("Last name is required");
      return false;
    }
    if (!formData.company.trim()) {
      setError("Company name is required");
      return false;
    }
    return true;
  };

  const validateStep2 = () => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!formData.email.trim()) {
      setError("Email is required");
      return false;
    }
    if (!emailRegex.test(formData.email)) {
      setError("Please enter a valid email address");
      return false;
    }
    if (formData.password.length < 8) {
      setError("Password must be at least 8 characters long");
      return false;
    }
    if (formData.password !== formData.confirmPassword) {
      setError("Passwords do not match");
      return false;
    }
    if (!formData.acceptTerms) {
      setError("You must accept the terms and conditions");
      return false;
    }
    return true;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (step === 1) {
      if (validateStep1()) {
        setStep(2);
      }
      return;
    }

    if (!validateStep2()) {
      return;
    }

    setLoading(true);

    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 2000));

      // Create user account (demo)
      const userData = {
        id: Date.now(),
        name: `${formData.firstName} ${formData.lastName}`,
        email: formData.email,
        company: formData.company,
        role: "admin",
        avatar: formData.firstName[0] + formData.lastName[0],
        plan: "Professional Trial",
      };

      // Auto login after signup
      await login(formData.email, "password");
      setSuccess(true);

      // Redirect to dashboard after 3 seconds
      setTimeout(() => {
        navigate("/app/dashboard");
      }, 3000);
    } catch (err) {
      setError("Failed to create account. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleSocialSignup = (provider: string) => {
    // For demo purposes
    alert(`Signing up with ${provider} (demo mode)`);
  };

  const handleDemoSignup = async () => {
    setFormData({
      firstName: "Demo",
      lastName: "User",
      email: "demo@logsentinel.ai",
      company: "LogSentinel AI",
      password: "demo123",
      confirmPassword: "demo123",
      acceptTerms: true,
      receiveUpdates: true,
    });
    setStep(2);
  };

  const fadeInUp = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.6 },
  };

  if (success) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-900 via-purple-900 to-blue-900 p-4">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="w-full max-w-md text-center"
        >
          <div className="mb-8">
            <div className="relative inline-block">
              <div className="absolute inset-0 bg-gradient-to-r from-green-500 to-emerald-500 rounded-full blur-xl opacity-50"></div>
              <div className="relative w-24 h-24 bg-gradient-to-r from-green-500 to-emerald-500 rounded-full flex items-center justify-center mx-auto mb-6">
                <CheckCircle className="w-12 h-12 text-white" />
              </div>
            </div>
            <h1 className="text-3xl font-bold text-white mb-4">
              Welcome to LogSentinel AI!
            </h1>
            <p className="text-blue-200">
              Your account has been created successfully. You will be redirected
              to your dashboard.
            </p>
          </div>

          <div className="bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-xl rounded-3xl border border-white/20 shadow-2xl p-8">
            <div className="space-y-6">
              <div className="text-left">
                <h3 className="text-lg font-semibold text-white mb-4">
                  Account Details:
                </h3>
                <div className="space-y-3">
                  <div className="flex items-center space-x-3">
                    <User className="w-5 h-5 text-blue-400" />
                    <div>
                      <p className="text-sm text-gray-400">Name</p>
                      <p className="text-white">
                        {formData.firstName} {formData.lastName}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-3">
                    <Mail className="w-5 h-5 text-blue-400" />
                    <div>
                      <p className="text-sm text-gray-400">Email</p>
                      <p className="text-white">{formData.email}</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-3">
                    <Building className="w-5 h-5 text-blue-400" />
                    <div>
                      <p className="text-sm text-gray-400">Company</p>
                      <p className="text-white">{formData.company}</p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="pt-6">
                <div className="flex items-center justify-center space-x-4 mb-6">
                  <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
                  <span className="text-green-400 font-medium">
                    Setting up your dashboard...
                  </span>
                </div>
                <Link
                  to="/app/dashboard"
                  className="inline-flex items-center justify-center w-full py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-semibold rounded-xl hover:from-blue-700 hover:to-purple-700 transition-all shadow-lg hover:shadow-xl"
                >
                  Go to Dashboard Now
                  <ArrowRight className="ml-2 w-5 h-5" />
                </Link>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-900 via-purple-900 to-blue-900 p-4 relative overflow-hidden">
      {/* Background elements */}
      <div className="absolute inset-0">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-blue-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob"></div>
        <div className="absolute top-1/3 right-1/4 w-96 h-96 bg-purple-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-2000"></div>
        <div className="absolute bottom-1/4 left-1/2 w-96 h-96 bg-pink-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-4000"></div>
      </div>

      <div className="relative w-full max-w-4xl grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Left side - Branding & Benefits */}
        <motion.div
          {...fadeInUp}
          className="hidden lg:flex flex-col justify-center p-8 text-white"
        >
          <div className="mb-12">
            <div className="flex items-center space-x-3 mb-8">
              <div className="relative">
                <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-purple-600 rounded-xl blur opacity-75"></div>
                <div className="relative bg-gray-900 p-3 rounded-xl">
                  <Brain className="w-10 h-10 text-white" />
                </div>
              </div>
              <div>
                <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
                  LogSentinel AI
                </h1>
                <p className="text-blue-200 text-sm">
                  Intelligent Log Monitoring
                </p>
              </div>
            </div>

            <h2 className="text-5xl font-bold mb-6 leading-tight">
              Start Your
              <span className="block text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400">
                14-Day Free Trial
              </span>
            </h2>

            <p className="text-xl text-blue-100 mb-12">
              Join thousands of engineering teams using AI to monitor, analyze,
              and secure their systems.
            </p>
          </div>

          {/* Benefits List */}
          <div className="space-y-8">
            <div className="flex items-start space-x-4">
              <div className="w-12 h-12 bg-gradient-to-r from-blue-500/20 to-purple-500/20 rounded-xl flex items-center justify-center flex-shrink-0">
                <Sparkles className="w-6 h-6 text-blue-300" />
              </div>
              <div>
                <h3 className="text-lg font-semibold text-white mb-2">
                  No Credit Card Required
                </h3>
                <p className="text-blue-200">
                  Get full access to all features for 14 days. No commitment.
                </p>
              </div>
            </div>

            <div className="flex items-start space-x-4">
              <div className="w-12 h-12 bg-gradient-to-r from-green-500/20 to-emerald-500/20 rounded-xl flex items-center justify-center flex-shrink-0">
                <CheckCircle className="w-6 h-6 text-green-300" />
              </div>
              <div>
                <h3 className="text-lg font-semibold text-white mb-2">
                  Setup in 5 Minutes
                </h3>
                <p className="text-blue-200">
                  Connect your first server in minutes with our easy setup
                  wizard.
                </p>
              </div>
            </div>

            <div className="flex items-start space-x-4">
              <div className="w-12 h-12 bg-gradient-to-r from-orange-500/20 to-red-500/20 rounded-xl flex items-center justify-center flex-shrink-0">
                <Brain className="w-6 h-6 text-orange-300" />
              </div>
              <div>
                <h3 className="text-lg font-semibold text-white mb-2">
                  AI-Powered Insights
                </h3>
                <p className="text-blue-200">
                  Get predictive alerts and anomaly detection from day one.
                </p>
              </div>
            </div>
          </div>

          {/* Trust indicators */}
          <div className="mt-12 pt-8 border-t border-white/10">
            <p className="text-blue-200 mb-4">
              Trusted by engineering teams at:
            </p>
            <div className="grid grid-cols-3 gap-4 text-center">
              <div className="text-sm text-gray-400">TechCorp</div>
              <div className="text-sm text-gray-400">StartupX</div>
              <div className="text-sm text-gray-400">CloudScale</div>
            </div>
          </div>
        </motion.div>

        {/* Right side - Signup Form */}
        <motion.div
          {...fadeInUp}
          transition={{ delay: 0.2 }}
          className="bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-xl rounded-3xl border border-white/20 shadow-2xl overflow-hidden"
        >
          <div className="p-8 md:p-12">
            {/* Progress Steps */}
            <div className="flex items-center justify-between mb-10">
              <div className="flex items-center space-x-4">
                <div
                  className={`w-10 h-10 rounded-full flex items-center justify-center ${step >= 1 ? "bg-gradient-to-r from-blue-500 to-purple-600" : "bg-gray-800"}`}
                >
                  <span className="text-white font-bold">1</span>
                </div>
                <div className="hidden sm:block">
                  <div className="text-sm text-gray-400">Step 1</div>
                  <div className="text-white font-medium">Personal Info</div>
                </div>
              </div>

              <div className="h-1 flex-1 mx-4 bg-gray-700">
                <div
                  className="h-full bg-gradient-to-r from-blue-500 to-purple-600 transition-all duration-500"
                  style={{ width: step >= 2 ? "100%" : "0%" }}
                />
              </div>

              <div className="flex items-center space-x-4">
                <div
                  className={`w-10 h-10 rounded-full flex items-center justify-center ${step >= 2 ? "bg-gradient-to-r from-blue-500 to-purple-600" : "bg-gray-800"}`}
                >
                  <span className="text-white font-bold">2</span>
                </div>
                <div className="hidden sm:block">
                  <div className="text-sm text-gray-400">Step 2</div>
                  <div className="text-white font-medium">Account Setup</div>
                </div>
              </div>
            </div>

            {/* Mobile Branding */}
            <div className="lg:hidden flex items-center justify-center mb-8">
              <div className="flex items-center space-x-3">
                <div className="relative">
                  <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-purple-600 rounded-xl blur opacity-75"></div>
                  <div className="relative bg-gray-900 p-3 rounded-xl">
                    <Brain className="w-10 h-10 text-white" />
                  </div>
                </div>
                <div>
                  <h1 className="text-2xl font-bold text-white">Sign Up</h1>
                  <p className="text-blue-300 text-sm">Start your free trial</p>
                </div>
              </div>
            </div>

            {/* Form Header */}
            <div className="text-center mb-8">
              <h2 className="text-3xl font-bold text-white mb-3">
                {step === 1 ? "Create Your Account" : "Setup Your Password"}
              </h2>
              <p className="text-blue-200">
                {step === 1
                  ? "Tell us about yourself"
                  : "Create secure credentials"}
              </p>
            </div>

            {/* Error Message */}
            {error && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className="flex items-center space-x-3 p-4 rounded-xl bg-red-900/30 border border-red-800 text-red-200 mb-6"
              >
                <AlertCircle className="w-5 h-5 flex-shrink-0" />
                <span className="text-sm">{error}</span>
              </motion.div>
            )}

            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Step 1: Personal Information */}
              {step === 1 && (
                <>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    <div>
                      <label
                        htmlFor="firstName"
                        className="block text-sm font-medium text-blue-200 mb-2"
                      >
                        First Name *
                      </label>
                      <div className="relative">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                          <User className="h-5 w-5 text-gray-400" />
                        </div>
                        <input
                          id="firstName"
                          name="firstName"
                          type="text"
                          required
                          value={formData.firstName}
                          onChange={handleChange}
                          className="w-full pl-10 pr-4 py-4 bg-gray-900/50 border border-gray-700 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                          placeholder="John"
                        />
                      </div>
                    </div>

                    <div>
                      <label
                        htmlFor="lastName"
                        className="block text-sm font-medium text-blue-200 mb-2"
                      >
                        Last Name *
                      </label>
                      <div className="relative">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                          <User className="h-5 w-5 text-gray-400" />
                        </div>
                        <input
                          id="lastName"
                          name="lastName"
                          type="text"
                          required
                          value={formData.lastName}
                          onChange={handleChange}
                          className="w-full pl-10 pr-4 py-4 bg-gray-900/50 border border-gray-700 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                          placeholder="Doe"
                        />
                      </div>
                    </div>
                  </div>

                  <div>
                    <label
                      htmlFor="company"
                      className="block text-sm font-medium text-blue-200 mb-2"
                    >
                      Company Name *
                    </label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <Building className="h-5 w-5 text-gray-400" />
                      </div>
                      <input
                        id="company"
                        name="company"
                        type="text"
                        required
                        value={formData.company}
                        onChange={handleChange}
                        className="w-full pl-10 pr-4 py-4 bg-gray-900/50 border border-gray-700 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                        placeholder="Acme Inc"
                      />
                    </div>
                  </div>

                  {/* Demo Signup Button */}
                  <button
                    type="button"
                    onClick={handleDemoSignup}
                    className="w-full flex items-center justify-center space-x-3 py-4 px-6 bg-gradient-to-r from-gray-800 to-gray-900 hover:from-gray-900 hover:to-black border border-gray-700 rounded-xl text-white font-semibold transition-all duration-200 hover:shadow-lg"
                  >
                    <Sparkles className="w-5 h-5" />
                    <span>Fill with Demo Data</span>
                  </button>
                </>
              )}

              {/* Step 2: Account Setup */}
              {step === 2 && (
                <>
                  <div>
                    <label
                      htmlFor="email"
                      className="block text-sm font-medium text-blue-200 mb-2"
                    >
                      Work Email *
                    </label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <Mail className="h-5 w-5 text-gray-400" />
                      </div>
                      <input
                        id="email"
                        name="email"
                        type="email"
                        required
                        value={formData.email}
                        onChange={handleChange}
                        className="w-full pl-10 pr-4 py-4 bg-gray-900/50 border border-gray-700 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                        placeholder="john@company.com"
                      />
                    </div>
                  </div>

                  <div>
                    <label
                      htmlFor="password"
                      className="block text-sm font-medium text-blue-200 mb-2"
                    >
                      Password *
                    </label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <Lock className="h-5 w-5 text-gray-400" />
                      </div>
                      <input
                        id="password"
                        name="password"
                        type={showPassword ? "text" : "password"}
                        required
                        value={formData.password}
                        onChange={handleChange}
                        className="w-full pl-10 pr-12 py-4 bg-gray-900/50 border border-gray-700 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                        placeholder="Create a strong password"
                      />
                      <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute inset-y-0 right-0 pr-3 flex items-center"
                      >
                        {showPassword ? (
                          <EyeOff className="h-5 w-5 text-gray-400 hover:text-gray-300" />
                        ) : (
                          <Eye className="h-5 w-5 text-gray-400 hover:text-gray-300" />
                        )}
                      </button>
                    </div>

                    {/* Password Strength Indicator */}
                    {formData.password && (
                      <PasswordStrength password={formData.password} />
                    )}
                  </div>

                  <div>
                    <label
                      htmlFor="confirmPassword"
                      className="block text-sm font-medium text-blue-200 mb-2"
                    >
                      Confirm Password *
                    </label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <Lock className="h-5 w-5 text-gray-400" />
                      </div>
                      <input
                        id="confirmPassword"
                        name="confirmPassword"
                        type={showConfirmPassword ? "text" : "password"}
                        required
                        value={formData.confirmPassword}
                        onChange={handleChange}
                        className="w-full pl-10 pr-12 py-4 bg-gray-900/50 border border-gray-700 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                        placeholder="Confirm your password"
                      />
                      <button
                        type="button"
                        onClick={() =>
                          setShowConfirmPassword(!showConfirmPassword)
                        }
                        className="absolute inset-y-0 right-0 pr-3 flex items-center"
                      >
                        {showConfirmPassword ? (
                          <EyeOff className="h-5 w-5 text-gray-400 hover:text-gray-300" />
                        ) : (
                          <Eye className="h-5 w-5 text-gray-400 hover:text-gray-300" />
                        )}
                      </button>
                    </div>
                    {formData.confirmPassword && (
                      <div className="mt-2 flex items-center space-x-2">
                        {formData.password === formData.confirmPassword ? (
                          <>
                            <CheckCircle className="w-4 h-4 text-green-500" />
                            <span className="text-xs text-green-400">
                              Passwords match
                            </span>
                          </>
                        ) : (
                          <>
                            <XCircle className="w-4 h-4 text-red-500" />
                            <span className="text-xs text-red-400">
                              Passwords do not match
                            </span>
                          </>
                        )}
                      </div>
                    )}
                  </div>

                  <div className="space-y-4">
                    <div className="flex items-start">
                      <input
                        id="acceptTerms"
                        name="acceptTerms"
                        type="checkbox"
                        checked={formData.acceptTerms}
                        onChange={handleChange}
                        className="h-4 w-4 mt-1 text-blue-600 focus:ring-blue-500 border-gray-600 rounded bg-gray-800"
                      />
                      <label
                        htmlFor="acceptTerms"
                        className="ml-2 text-sm text-blue-200"
                      >
                        I agree to the{" "}
                        <a
                          href="#"
                          className="text-blue-400 hover:text-blue-300 transition-colors"
                        >
                          Terms of Service
                        </a>{" "}
                        and{" "}
                        <a
                          href="#"
                          className="text-blue-400 hover:text-blue-300 transition-colors"
                        >
                          Privacy Policy
                        </a>
                      </label>
                    </div>

                    <div className="flex items-start">
                      <input
                        id="receiveUpdates"
                        name="receiveUpdates"
                        type="checkbox"
                        checked={formData.receiveUpdates}
                        onChange={handleChange}
                        className="h-4 w-4 mt-1 text-blue-600 focus:ring-blue-500 border-gray-600 rounded bg-gray-800"
                      />
                      <label
                        htmlFor="receiveUpdates"
                        className="ml-2 text-sm text-blue-200"
                      >
                        Send me product updates, tips, and security best
                        practices
                      </label>
                    </div>
                  </div>

                  {/* Social Signup */}
                  <div>
                    <div className="flex items-center my-6">
                      <div className="flex-1 h-px bg-gray-700"></div>
                      <span className="px-4 text-gray-400 text-sm">
                        Or sign up with
                      </span>
                      <div className="flex-1 h-px bg-gray-700"></div>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <button
                        type="button"
                        onClick={() => handleSocialSignup("GitHub")}
                        className="flex items-center justify-center space-x-2 py-3 rounded-xl bg-gray-800/50 hover:bg-gray-800 transition-colors border border-gray-700"
                      >
                        <Github className="w-5 h-5 text-white" />
                        <span className="text-white text-sm">GitHub</span>
                      </button>
                      <button
                        type="button"
                        onClick={() => handleSocialSignup("LinkedIn")}
                        className="flex items-center justify-center space-x-2 py-3 rounded-xl bg-gray-800/50 hover:bg-gray-800 transition-colors border border-gray-700"
                      >
                        <Linkedin className="w-5 h-5 text-blue-400" />
                        <span className="text-white text-sm">LinkedIn</span>
                      </button>
                    </div>
                  </div>
                </>
              )}

              {/* Action Buttons */}
              <div className="space-y-4">
                <button
                  type="submit"
                  disabled={loading}
                  className="w-full relative group"
                >
                  <div className="absolute inset-0 bg-gradient-to-r from-blue-600 to-purple-600 rounded-xl blur opacity-75 group-hover:opacity-100 transition-opacity"></div>
                  <div className="relative w-full flex items-center justify-center space-x-3 py-4 px-6 bg-gradient-to-r from-blue-600 to-purple-600 rounded-xl hover:from-blue-700 hover:to-purple-700 focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 shadow-lg hover:shadow-xl">
                    {loading ? (
                      <>
                        <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                        <span className="text-white font-semibold">
                          {step === 1 ? "Continuing..." : "Creating Account..."}
                        </span>
                      </>
                    ) : (
                      <>
                        <span className="text-white font-semibold text-lg">
                          {step === 1
                            ? "Continue to Account Setup"
                            : "Start Free Trial"}
                        </span>
                        <ArrowRight className="w-5 h-5" />
                      </>
                    )}
                  </div>
                </button>

                {step === 2 && (
                  <button
                    type="button"
                    onClick={() => setStep(1)}
                    className="w-full py-4 px-6 bg-gray-800/50 hover:bg-gray-800 border border-gray-700 rounded-xl text-white font-semibold transition-all duration-200 hover:shadow-lg"
                  >
                    ← Back to Personal Info
                  </button>
                )}
              </div>
            </form>

            {/* Login Link */}
            <div className="mt-8 text-center">
              <p className="text-blue-200">
                Already have an account?{" "}
                <Link
                  to="/login"
                  className="text-blue-400 hover:text-blue-300 font-semibold transition-colors"
                >
                  Sign in here
                </Link>
              </p>
            </div>

            {/* Trial Info */}
            <div className="mt-8 p-4 bg-gradient-to-r from-blue-900/30 to-purple-900/30 rounded-xl border border-blue-800/30">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-white font-semibold">14-Day Free Trial</p>
                  <p className="text-blue-300 text-sm">
                    No credit card required
                  </p>
                </div>
                <div className="text-right">
                  <p className="text-2xl font-bold text-white">$0</p>
                  <p className="text-blue-300 text-sm">Professional Plan</p>
                </div>
              </div>
            </div>
          </div>

          {/* Footer */}
          <div className="px-8 py-4 bg-gradient-to-r from-blue-900/30 via-purple-900/30 to-pink-900/30 border-t border-white/10">
            <div className="flex flex-wrap items-center justify-center gap-6">
              <div className="flex items-center space-x-2">
                <CheckCircle className="w-4 h-4 text-green-400" />
                <span className="text-xs text-gray-400">
                  No credit card needed
                </span>
              </div>
              <div className="h-4 w-px bg-gray-700"></div>
              <div className="flex items-center space-x-2">
                <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                <span className="text-xs text-gray-400">Cancel anytime</span>
              </div>
              <div className="h-4 w-px bg-gray-700"></div>
              <div className="flex items-center space-x-2">
                <Lock className="w-4 h-4 text-blue-400" />
                <span className="text-xs text-gray-400">
                  Enterprise security
                </span>
              </div>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Floating particles */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(15)].map((_, i) => (
          <div
            key={i}
            className="absolute w-1 h-1 bg-blue-400 rounded-full animate-float"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 5}s`,
              opacity: Math.random() * 0.5 + 0.2,
            }}
          />
        ))}
      </div>
    </div>
  );
};

export default Signup;
