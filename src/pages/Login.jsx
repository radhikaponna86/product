import { useState } from 'react';

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Login attempt:', { email, password });
  };

  return (
    <main className="flex items-center justify-center min-h-[calc(100vh-8rem)] bg-gradient-to-br from-slate-50 to-slate-100">
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
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent transition"
              required
            />
          </div>

          {/* Password Input */}
          <div>
            <label className="block text-sm font-medium text-slate-900 mb-2">Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter your password"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent transition"
              required
            />
          </div>

          {/* Sign In Button */}
          <button
            type="submit"
            className="w-full bg-amber-500 hover:bg-amber-600 text-white font-bold py-3 rounded-lg transition duration-300 shadow-md hover:shadow-lg mt-6"
          >
            Sign In
          </button>
        </form>

        {/* Footer Text */}
        <p className="text-center text-gray-600 text-sm mt-6">
          Don't have an account? <span className="text-amber-500 font-semibold cursor-pointer hover:underline">Sign Up</span>
        </p>
      </div>
    </main>
  );
}

export default Login;