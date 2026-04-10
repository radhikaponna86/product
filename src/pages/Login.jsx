import { useState } from 'react';
import { GoogleLogin } from '@react-oauth/google';

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState({});
  const [touched, setTouched] = useState({});
  const [loading, setLoading] = useState(false);

  // Validation functions
  const validateEmail = (value) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!value) return 'Email is required';
    if (!emailRegex.test(value)) return 'Please enter a valid email address';
    return '';
  };

  const validatePassword = (value) => {
    if (!value) return 'Password is required';
    if (value.length < 6) return 'Password must be at least 6 characters';
    return '';
  };

  // Handle field blur
  const handleBlur = (field) => {
    setTouched({ ...touched, [field]: true });
    
    let error = '';
    if (field === 'email') {
      error = validateEmail(email);
    } else if (field === 'password') {
      error = validatePassword(password);
    }
    
    setErrors({ ...errors, [field]: error });
  };

  // Handle field change
  const handleEmailChange = (e) => {
    const value = e.target.value;
    setEmail(value);
    if (touched.email) {
      setErrors({ ...errors, email: validateEmail(value) });
    }
  };

  const handlePasswordChange = (e) => {
    const value = e.target.value;
    setPassword(value);
    if (touched.password) {
      setErrors({ ...errors, password: validatePassword(value) });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Validate all fields
    const emailError = validateEmail(email);
    const passwordError = validatePassword(password);
    
    const newErrors = {
      email: emailError,
      password: passwordError,
    };
    
    setErrors(newErrors);
    setTouched({ email: true, password: true });
    
    // Submit only if no errors
    if (!emailError && !passwordError) {
      setLoading(true);
      console.log('Login attempt:', { email, password });
      // Add login API call here
      setTimeout(() => setLoading(false), 1000);
    }
  };

  // Handle Google Login
  const handleGoogleCallback = (credentialResponse) => {
    try {
      const { credential } = credentialResponse;
      if (credential) {
        console.log('Google login successful');
        console.log('JWT Token:', credential);
        // Send credential to your backend
        // const response = await fetch('/api/auth/google', {
        //   method: 'POST',
        //   headers: { 'Content-Type': 'application/json' },
        //   body: JSON.stringify({ token: credential })
        // });
        // const data = await response.json();
        // Handle successful login - store token, redirect to dashboard, etc.
      }
    } catch (error) {
      console.error('Google callback error:', error);
    }
  };

  const handleGoogleError = () => {
    console.log('Google login failed');
    setErrors({ ...errors, google: 'Google login failed. Please try again.' });
  };

  return (
    <main className="flex items-center justify-center min-h-[calc(100vh-8rem)] bg-linear-to-br from-slate-50 to-slate-100">
      <div className="bg-white rounded-lg shadow-lg p-8 w-full max-w-md">
        <h2 className="text-3xl font-bold text-slate-900 mb-2 text-center">Sign In</h2>
        <p className="text-gray-600 text-center mb-8">Welcome back to MyStore</p>

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Email Input */}
          <div>
            <label className="block text-sm font-medium text-slate-900 mb-2">Email</label>
            <input
              type="email"
              value={email}
              onChange={handleEmailChange}
              onBlur={() => handleBlur('email')}
              placeholder="Enter your email"
              className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 transition ${
                touched.email && errors.email
                  ? 'border-red-500 focus:ring-red-500 focus:border-transparent'
                  : 'border-gray-300 focus:ring-amber-500 focus:border-transparent'
              }`}
            />
            {touched.email && errors.email && (
              <p className="text-red-500 text-sm mt-1">{errors.email}</p>
            )}
          </div>

          {/* Password Input */}
          <div>
            <label className="block text-sm font-medium text-slate-900 mb-2">Password</label>
            <input
              type="password"
              value={password}
              onChange={handlePasswordChange}
              onBlur={() => handleBlur('password')}
              placeholder="Enter your password"
              className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 transition ${
                touched.password && errors.password
                  ? 'border-red-500 focus:ring-red-500 focus:border-transparent'
                  : 'border-gray-300 focus:ring-amber-500 focus:border-transparent'
              }`}
            />
            {touched.password && errors.password && (
              <p className="text-red-500 text-sm mt-1">{errors.password}</p>
            )}
          </div>

          {/* Sign In Button */}
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-amber-500 hover:bg-amber-600 disabled:bg-amber-400 text-white font-bold py-3 rounded-lg transition duration-300 shadow-md hover:shadow-lg mt-6"
          >
            {loading ? 'Signing In...' : 'Sign In'}
          </button>
        </form>

        {/* Divider */}
        <div className="flex items-center my-6">
          <div className="flex-grow border-t border-gray-300"></div>
          <span className="px-3 text-gray-500 text-sm">or</span>
          <div className="flex-grow border-t border-gray-300"></div>
        </div>

        {/* Google Login Component */}
        <div className="flex justify-center">
          <GoogleLogin
            onSuccess={handleGoogleCallback}
            onError={handleGoogleError}
            size="large"
            text="signin_with"
            theme="outline"
          />
        </div>

        {/* Footer Text */}
        <p className="text-center text-gray-600 text-sm mt-6">
          Don't have an account? <span className="text-amber-500 font-semibold cursor-pointer hover:underline">Sign Up</span>
        </p>
      </div>
    </main>
  );
}

export default Login;