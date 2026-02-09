import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import {
  Lock,
  LogIn,
  Eye,
  EyeOff,
  Mail,
  Brain,
  Shield,
  AlertCircle,
  CheckCircle,
  Sparkles,
  Github,
  Twitter,
  Linkedin,
  UserPlus,
  ArrowRight,
  User,
  Users,
  ShieldCheck,
  Eye as EyeIcon,
  FileText,
  Code,
  Server,
  Database,
  Key,
  Settings,
  Bell,
  Activity,
  BarChart,
  Cpu,
  Zap,
} from "lucide-react";
import { useAuth } from "../contexts/AuthContext";
import "./Login.css";

interface LoginFormData {
  email: string;
  password: string;
  organization?: string;
  role?: string;
}

interface UserRole {
  id: string;
  name: string;
  description: string;
  icon: React.ReactNode;
  permissions: string[];
  color: string;
  defaultRedirect: string;
}

interface Organization {
  id: string;
  name: string;
  domain: string;
  logo?: string;
}

const Login: React.FC = () => {
  const [formData, setFormData] = useState<LoginFormData>({
    email: "",
    password: "",
    organization: "",
    role: "",
  });
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [rememberMe, setRememberMe] = useState<boolean>(false);
  const [error, setError] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const [showDemoCredentials, setShowDemoCredentials] =
    useState<boolean>(false);
  const [isSignupMode, setIsSignupMode] = useState<boolean>(false);
  const [selectedRole, setSelectedRole] = useState<string>("");
  const [selectedOrg, setSelectedOrg] = useState<string>("");
  const [organizations, setOrganizations] = useState<Organization[]>([]);
  const [showOrgSelector, setShowOrgSelector] = useState<boolean>(false);
  const [showRoleSelector, setShowRoleSelector] = useState<boolean>(false);

  const { login, loginWithRole } = useAuth();
  const navigate = useNavigate();

  // User Roles Configuration
  const userRoles: UserRole[] = [
    {
      id: "super_admin",
      name: "Super Admin",
      description: "Full system access and global management",
      icon: <Settings className="w-5 h-5" />,
      permissions: [
        "manage_all_organizations",
        "global_settings",
        "view_all_logs",
        "manage_users",
        "billing_access",
        "system_configuration",
      ],
      color: "from-red-500 to-pink-600",
      defaultRedirect: "/admin/dashboard",
    },
    {
      id: "org_admin",
      name: "Organization Admin",
      description: "Manage organization settings and users",
      icon: <Users className="w-5 h-5" />,
      permissions: [
        "manage_org_users",
        "org_settings",
        "view_org_logs",
        "manage_log_sources",
        "create_api_keys",
        "configure_alerts",
      ],
      color: "from-blue-500 to-cyan-600",
      defaultRedirect: "/org/dashboard",
    },
    {
      id: "security_analyst",
      name: "Security Analyst",
      description: "Monitor security logs and investigate incidents",
      icon: <ShieldCheck className="w-5 h-5" />,
      permissions: [
        "real_time_monitoring",
        "view_security_alerts",
        "incident_investigation",
        "create_dashboards",
        "run_ai_queries",
        "export_reports",
      ],
      color: "from-green-500 to-emerald-600",
      defaultRedirect: "/security/dashboard",
    },
    {
      id: "developer",
      name: "Developer",
      description: "Access application logs and performance metrics",
      icon: <Code className="w-5 h-5" />,
      permissions: [
        "view_app_logs",
        "performance_monitoring",
        "log_ingestion",
        "custom_alerts",
        "api_access",
        "debug_access",
      ],
      color: "from-purple-500 to-violet-600",
      defaultRedirect: "/dev/dashboard",
    },
    {
      id: "viewer",
      name: "Viewer",
      description: "Read-only access to dashboards and reports",
      icon: <EyeIcon className="w-5 h-5" />,
      permissions: [
        "view_dashboards",
        "read_logs",
        "export_reports",
        "view_analytics",
        "no_write_access",
      ],
      color: "from-gray-500 to-gray-600",
      defaultRedirect: "/viewer/dashboard",
    },
    {
      id: "auditor",
      name: "Auditor",
      description: "Access audit logs and compliance reports",
      icon: <FileText className="w-5 h-5" />,
      permissions: [
        "audit_logs_access",
        "compliance_reports",
        "user_activity_logs",
        "export_audit_trails",
        "read_only",
      ],
      color: "from-amber-500 to-orange-600",
      defaultRedirect: "/audit/dashboard",
    },
    {
      id: "api_user",
      name: "API User",
      description: "Service account for programmatic access",
      icon: <Key className="w-5 h-5" />,
      permissions: [
        "api_access",
        "limited_endpoints",
        "machine_to_machine",
        "rate_limited",
        "no_ui_access",
      ],
      color: "from-indigo-500 to-blue-600",
      defaultRedirect: "/api/docs",
    },
  ];

  // Demo credentials for different roles
  const demoCredentials = {
    super_admin: { email: "admin@logsentinel.ai", password: "Admin@2024" },
    org_admin: { email: "orgadmin@acme.com", password: "OrgAdmin@2024" },
    security_analyst: { email: "security@acme.com", password: "Security@2024" },
    developer: { email: "dev@acme.com", password: "Developer@2024" },
    viewer: { email: "viewer@acme.com", password: "Viewer@2024" },
    auditor: { email: "auditor@acme.com", password: "Auditor@2024" },
    api_user: { email: "api@acme.com", password: "ApiUser@2024" },
  };

  // Sample organizations (in real app, fetch from API)
  const sampleOrganizations: Organization[] = [
    { id: "acme", name: "Acme Corporation", domain: "acme.com", logo: "🏢" },
    {
      id: "techcorp",
      name: "TechCorp Inc",
      domain: "techcorp.com",
      logo: "💻",
    },
    {
      id: "cloudscale",
      name: "CloudScale",
      domain: "cloudscale.io",
      logo: "☁️",
    },
    { id: "startupx", name: "StartupX", domain: "startupx.dev", logo: "🚀" },
  ];

  useEffect(() => {
    // Auto-detect organization from email domain
    if (formData.email.includes("@")) {
      const domain = formData.email.split("@")[1];
      const org = sampleOrganizations.find((o) => o.domain === domain);
      if (org) {
        setSelectedOrg(org.id);
        setFormData((prev) => ({ ...prev, organization: org.id }));
      }
    }
  }, [formData.email]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleLoginSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      // If role is selected, use role-based login
      if (selectedRole) {
        const result = await loginWithRole(
          formData.email,
          formData.password,
          selectedRole,
          selectedOrg || undefined,
        );

        if (result.success) {
          const role = userRoles.find((r) => r.id === selectedRole);
          navigate(role?.defaultRedirect || "/app/dashboard");
        } else {
          setError(result.message || "Invalid credentials for this role");
        }
      } else {
        // Regular login
        const result = await login(formData.email, formData.password);

        if (result.success) {
          navigate("/app/dashboard");
        } else {
          setError(result.message || "Invalid email or password");
        }
      }
    } catch (err) {
      setError("An unexpected error occurred. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleRoleDemoLogin = async (roleId: string) => {
    const credentials = demoCredentials[roleId as keyof typeof demoCredentials];
    if (!credentials) return;

    setFormData({
      email: credentials.email,
      password: credentials.password,
      organization: selectedOrg,
      role: roleId,
    });

    setSelectedRole(roleId);
    setShowDemoCredentials(true);

    const result = await loginWithRole(
      credentials.email,
      credentials.password,
      roleId,
      selectedOrg || undefined,
    );

    if (result.success) {
      const role = userRoles.find((r) => r.id === roleId);
      navigate(role?.defaultRedirect || "/app/dashboard");
    } else {
      setError(`Demo login failed for ${roleId} role`);
    }
  };

  const handleOrgSelect = (orgId: string) => {
    setSelectedOrg(orgId);
    setFormData((prev) => ({ ...prev, organization: orgId }));
    setShowOrgSelector(false);
  };

  const handleRoleSelect = (roleId: string) => {
    setSelectedRole(roleId);
    setFormData((prev) => ({ ...prev, role: roleId }));
    setShowRoleSelector(false);
  };

  const getSelectedRole = () => {
    return userRoles.find((role) => role.id === selectedRole);
  };

  const fadeInUp = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.6 },
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-900 via-purple-900 to-blue-900 p-4 relative overflow-hidden">
      {/* Background elements */}
      <div className="absolute inset-0">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-blue-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob"></div>
        <div className="absolute top-1/3 right-1/4 w-96 h-96 bg-purple-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-2000"></div>
        <div className="absolute bottom-1/4 left-1/2 w-96 h-96 bg-pink-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-4000"></div>
      </div>

      <div className="relative w-full max-w-6xl grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Left side - Branding & Features */}
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
                  AI Log Monitoring System
                </h1>
                <p className="text-blue-200 text-sm">
                  Role-Based Access Control
                </p>
              </div>
            </div>

            <h2 className="text-5xl font-bold mb-6 leading-tight">
              Role-Specific
              <span className="block text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400">
                Access Control
              </span>
            </h2>

            <p className="text-xl text-blue-100 mb-12">
              Different roles, different views. Access only what you need with
              our granular permission system.
            </p>
          </div>

          {/* Role Benefits */}
          <div className="space-y-8">
            <div className="flex items-start space-x-4">
              <div className="w-12 h-12 bg-gradient-to-r from-blue-500/20 to-purple-500/20 rounded-xl flex items-center justify-center">
                <ShieldCheck className="w-6 h-6 text-blue-300" />
              </div>
              <div>
                <h3 className="text-lg font-semibold text-white mb-1">
                  Least Privilege Principle
                </h3>
                <p className="text-blue-200">
                  Users get only the permissions they need to perform their job
                  functions.
                </p>
              </div>
            </div>

            <div className="flex items-start space-x-4">
              <div className="w-12 h-12 bg-gradient-to-r from-green-500/20 to-emerald-500/20 rounded-xl flex items-center justify-center">
                <Activity className="w-6 h-6 text-green-300" />
              </div>
              <div>
                <h3 className="text-lg font-semibold text-white mb-1">
                  Real-time Monitoring
                </h3>
                <p className="text-blue-200">
                  Security analysts get instant alerts while developers see
                  performance metrics.
                </p>
              </div>
            </div>

            <div className="flex items-start space-x-4">
              <div className="w-12 h-12 bg-gradient-to-r from-purple-500/20 to-pink-500/20 rounded-xl flex items-center justify-center">
                <BarChart className="w-6 h-6 text-purple-300" />
              </div>
              <div>
                <h3 className="text-lg font-semibold text-white mb-1">
                  Custom Dashboards
                </h3>
                <p className="text-blue-200">
                  Each role gets tailored dashboards with relevant metrics and
                  controls.
                </p>
              </div>
            </div>
          </div>

          {/* Role Statistics */}
          <div className="mt-12 pt-8 border-t border-white/10">
            <p className="text-blue-200 mb-4">Active Users by Role:</p>
            <div className="grid grid-cols-2 gap-4">
              {userRoles.slice(0, 4).map((role) => (
                <div
                  key={role.id}
                  className="flex items-center justify-between p-3 bg-white/5 rounded-lg"
                >
                  <div className="flex items-center space-x-3">
                    <div
                      className={`w-8 h-8 rounded-lg bg-gradient-to-r ${role.color} flex items-center justify-center`}
                    >
                      {role.icon}
                    </div>
                    <span className="text-white text-sm">{role.name}</span>
                  </div>
                  <span className="text-blue-300 font-bold">
                    {Math.floor(Math.random() * 500) + 100}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </motion.div>

        {/* Right side - Login Form */}
        <motion.div
          {...fadeInUp}
          transition={{ delay: 0.2 }}
          className="bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-xl rounded-3xl border border-white/20 shadow-2xl overflow-hidden"
        >
          <div className="p-8 md:p-12">
            {/* Header */}
            <div className="flex items-center justify-between mb-8">
              <div className="flex items-center space-x-3">
                <div className="relative">
                  <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-purple-600 rounded-xl blur opacity-75"></div>
                  <div className="relative bg-gray-900 p-3 rounded-xl">
                    <Brain className="w-8 h-8 text-white" />
                  </div>
                </div>
                <div>
                  <h1 className="text-2xl font-bold text-white">
                    {selectedRole ? getSelectedRole()?.name : "LogSentinel AI"}
                  </h1>
                  <p className="text-blue-300 text-sm">
                    {selectedRole
                      ? getSelectedRole()?.description
                      : "Role-Based Login"}
                  </p>
                </div>
              </div>
            </div>

            {/* Selected Role Badge */}
            {selectedRole && (
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="mb-6"
              >
                <div
                  className={`p-4 rounded-xl bg-gradient-to-r ${getSelectedRole()?.color} bg-opacity-10 border border-white/10`}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <div
                        className={`w-10 h-10 rounded-lg bg-gradient-to-r ${getSelectedRole()?.color} flex items-center justify-center`}
                      >
                        {getSelectedRole()?.icon}
                      </div>
                      <div>
                        <p className="text-white font-semibold">
                          Selected Role
                        </p>
                        <p className="text-blue-200 text-sm">
                          {getSelectedRole()?.name}
                        </p>
                      </div>
                    </div>
                    <button
                      onClick={() => setSelectedRole("")}
                      className="text-gray-400 hover:text-white transition-colors"
                    >
                      ✕
                    </button>
                  </div>
                </div>
              </motion.div>
            )}

            {/* Organization Selector */}
            {!selectedOrg && (
              <div className="mb-6">
                <button
                  onClick={() => setShowOrgSelector(!showOrgSelector)}
                  className="w-full p-4 rounded-xl bg-gray-800/50 border border-gray-700 hover:bg-gray-800 transition-all text-left"
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <Building className="w-5 h-5 text-gray-400" />
                      <div>
                        <p className="text-white">Select Organization</p>
                        <p className="text-gray-400 text-sm">
                          Choose your company or workspace
                        </p>
                      </div>
                    </div>
                    <ChevronDown className="w-5 h-5 text-gray-400" />
                  </div>
                </button>

                <AnimatePresence>
                  {showOrgSelector && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: "auto" }}
                      exit={{ opacity: 0, height: 0 }}
                      className="mt-2"
                    >
                      <div className="space-y-2 p-2 bg-gray-900/50 rounded-lg border border-gray-700">
                        {sampleOrganizations.map((org) => (
                          <button
                            key={org.id}
                            onClick={() => handleOrgSelect(org.id)}
                            className="w-full p-3 rounded-lg hover:bg-gray-800 transition-colors text-left flex items-center space-x-3"
                          >
                            <div className="w-8 h-8 rounded-lg bg-gray-800 flex items-center justify-center">
                              <span className="text-lg">{org.logo}</span>
                            </div>
                            <div>
                              <p className="text-white">{org.name}</p>
                              <p className="text-gray-400 text-sm">
                                {org.domain}
                              </p>
                            </div>
                          </button>
                        ))}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            )}

            {/* Role Selection */}
            {!selectedRole && (
              <div className="mb-6">
                <div className="mb-4">
                  <h3 className="text-lg font-semibold text-white mb-2">
                    Select Your Role
                  </h3>
                  <p className="text-blue-200 text-sm">
                    Choose the role that matches your responsibilities
                  </p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {userRoles.map((role) => (
                    <button
                      key={role.id}
                      onClick={() => handleRoleSelect(role.id)}
                      className={`p-4 rounded-xl border transition-all hover:scale-[1.02] ${
                        selectedRole === role.id
                          ? `border-transparent bg-gradient-to-r ${role.color} bg-opacity-20`
                          : "bg-gray-800/50 border-gray-700 hover:bg-gray-800"
                      }`}
                    >
                      <div className="flex items-start space-x-3">
                        <div
                          className={`w-10 h-10 rounded-lg flex items-center justify-center ${selectedRole === role.id ? `bg-gradient-to-r ${role.color}` : "bg-gray-700"}`}
                        >
                          {role.icon}
                        </div>
                        <div className="text-left">
                          <p className="text-white font-medium">{role.name}</p>
                          <p className="text-gray-400 text-xs mt-1">
                            {role.description}
                          </p>
                        </div>
                      </div>
                    </button>
                  ))}
                </div>

                {/* Quick Role Demo Buttons */}
                <div className="mt-6">
                  <p className="text-blue-200 text-sm mb-3">
                    Try demo with role:
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {userRoles.map((role) => (
                      <button
                        key={role.id}
                        onClick={() => handleRoleDemoLogin(role.id)}
                        className="px-3 py-2 rounded-lg bg-gray-800 hover:bg-gray-700 text-white text-sm transition-colors flex items-center space-x-2"
                      >
                        <span>{role.name}</span>
                        <Sparkles className="w-3 h-3" />
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {/* Login Form */}
            <form onSubmit={handleLoginSubmit} className="space-y-6">
              {error && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="flex items-center space-x-3 p-4 rounded-xl bg-red-900/30 border border-red-800 text-red-200"
                >
                  <AlertCircle className="w-5 h-5 flex-shrink-0" />
                  <span className="text-sm">{error}</span>
                </motion.div>
              )}

              {showDemoCredentials && selectedRole && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="flex items-center space-x-3 p-4 rounded-xl bg-blue-900/30 border border-blue-800 text-blue-200"
                >
                  <CheckCircle className="w-5 h-5 flex-shrink-0" />
                  <div className="text-sm">
                    <p className="font-semibold">
                      {getSelectedRole()?.name} demo credentials loaded!
                    </p>
                    <p>Click "Sign In" to continue.</p>
                  </div>
                </motion.div>
              )}

              {/* Email Input */}
              <div className="space-y-2">
                <label
                  htmlFor="email"
                  className="block text-sm font-medium text-blue-200"
                >
                  Work Email
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
                    onChange={handleInputChange}
                    className="w-full pl-10 pr-4 py-4 bg-gray-900/50 border border-gray-700 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                    placeholder="you@company.com"
                  />
                </div>
              </div>

              {/* Password Input */}
              <div className="space-y-2">
                <div className="flex justify-between items-center">
                  <label
                    htmlFor="password"
                    className="block text-sm font-medium text-blue-200"
                  >
                    Password
                  </label>
                  <Link
                    to="/forgot-password"
                    className="text-sm text-blue-400 hover:text-blue-300 transition-colors"
                  >
                    Forgot password?
                  </Link>
                </div>
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
                    onChange={handleInputChange}
                    className="w-full pl-10 pr-12 py-4 bg-gray-900/50 border border-gray-700 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                    placeholder="••••••••"
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
              </div>

              {/* Remember Me */}
              <div className="flex items-center">
                <input
                  id="remember-me"
                  type="checkbox"
                  checked={rememberMe}
                  onChange={(e) => setRememberMe(e.target.checked)}
                  className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-600 rounded bg-gray-800"
                />
                <label
                  htmlFor="remember-me"
                  className="ml-2 block text-sm text-blue-200"
                >
                  Remember me for 30 days
                </label>
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={loading || !selectedRole}
                className="w-full relative group"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-blue-600 to-purple-600 rounded-xl blur opacity-75 group-hover:opacity-100 transition-opacity"></div>
                <div className="relative w-full flex items-center justify-center space-x-3 py-4 px-6 bg-gradient-to-r from-blue-600 to-purple-600 rounded-xl hover:from-blue-700 hover:to-purple-700 focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 shadow-lg hover:shadow-xl">
                  {loading ? (
                    <>
                      <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                      <span className="text-white font-semibold">
                        Signing in as {getSelectedRole()?.name}...
                      </span>
                    </>
                  ) : (
                    <>
                      <LogIn className="w-5 h-5" />
                      <span className="text-white font-semibold text-lg">
                        {!selectedRole
                          ? "Select a Role First"
                          : `Sign In as ${getSelectedRole()?.name}`}
                      </span>
                    </>
                  )}
                </div>
              </button>
            </form>

            {/* Demo Login Button */}
            <button
              type="button"
              onClick={() => handleRoleDemoLogin(selectedRole || "developer")}
              className="w-full mt-4 flex items-center justify-center space-x-3 py-4 px-6 bg-gray-800/50 hover:bg-gray-800 border border-gray-700 rounded-xl text-white font-semibold transition-all duration-200 hover:shadow-lg"
            >
              <Sparkles className="w-5 h-5" />
              <span>Try Demo Account</span>
            </button>

            {/* Role Permissions Preview */}
            {selectedRole && (
              <div className="mt-8 p-4 bg-gradient-to-r from-gray-900/50 to-gray-800/50 rounded-xl border border-gray-700">
                <h4 className="text-white font-semibold mb-3">
                  Role Permissions:
                </h4>
                <div className="space-y-2">
                  {getSelectedRole()
                    ?.permissions.slice(0, 3)
                    .map((permission, index) => (
                      <div key={index} className="flex items-center space-x-2">
                        <CheckCircle className="w-4 h-4 text-green-500" />
                        <span className="text-blue-200 text-sm">
                          {permission
                            .replace(/_/g, " ")
                            .replace(/\b\w/g, (l) => l.toUpperCase())}
                        </span>
                      </div>
                    ))}
                  {getSelectedRole()!.permissions.length > 3 && (
                    <p className="text-gray-400 text-sm mt-2">
                      +{getSelectedRole()!.permissions.length - 3} more
                      permissions
                    </p>
                  )}
                </div>
              </div>
            )}

            {/* Sign Up Link */}
            <div className="mt-8 text-center">
              <p className="text-blue-200">
                Need a different role or don't have an account?{" "}
                <Link
                  to="/signup"
                  className="text-blue-400 hover:text-blue-300 font-semibold transition-colors"
                >
                  Contact Admin
                </Link>
              </p>
            </div>

            {/* Back to Home */}
            <div className="mt-8 text-center">
              <Link
                to="/"
                className="inline-flex items-center text-blue-400 hover:text-blue-300 transition-colors group"
              >
                <span className="mr-2">←</span>
                Back to homepage
                <span className="ml-2 opacity-0 group-hover:opacity-100 transition-opacity">
                  🏠
                </span>
              </Link>
            </div>
          </div>

          {/* Footer with Role Info */}
          <div className="px-8 py-4 bg-gradient-to-r from-blue-900/30 via-purple-900/30 to-pink-900/30 border-t border-white/10">
            <div className="flex items-center justify-center space-x-6">
              <div className="flex items-center space-x-2">
                <ShieldCheck className="w-4 h-4 text-green-400" />
                <span className="text-xs text-gray-400">Role-Based Access</span>
              </div>
              <div className="h-4 w-px bg-gray-700"></div>
              <div className="flex items-center space-x-2">
                <Activity className="w-4 h-4 text-blue-400" />
                <span className="text-xs text-gray-400">
                  Real-time Permissions
                </span>
              </div>
              <div className="h-4 w-px bg-gray-700"></div>
              <div className="flex items-center space-x-2">
                <EyeIcon className="w-4 h-4 text-purple-400" />
                <span className="text-xs text-gray-400">Audit Logging</span>
              </div>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Floating particles effect */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(20)].map((_, i) => (
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

// Add missing icon component
const Building: React.FC<{ className?: string }> = ({ className }) => (
  <svg
    className={className}
    fill="none"
    viewBox="0 0 24 24"
    stroke="currentColor"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"
    />
  </svg>
);

const ChevronDown: React.FC<{ className?: string }> = ({ className }) => (
  <svg
    className={className}
    fill="none"
    viewBox="0 0 24 24"
    stroke="currentColor"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M19 9l-7 7-7-7"
    />
  </svg>
);

export default Login;
