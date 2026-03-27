
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
//import { motion } from 'motion/react';
import { Lock, User } from 'lucide-react';
import { Link } from 'react-router-dom';
import { supabase } from '../../lib/supabase';

export const AdminLogin = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  
  
 const handleLogin = async (e: React.FormEvent) => {
  console.log("FORM SUBMITTED 🔥");
    e.preventDefault();
    setError('');

    const { data, error } = await supabase.auth.signInWithPassword({
      email: email,
      password,

      
    });
    console.log("DATA:", data);
console.log("ERROR:", error);

    if (error) {
      setError(error.message);
    } else {
      // 🔐 ADMIN ONLY ACCESS
      /*
      if (data.user?.email !== 'arpitguptaeditz@gmail.com') {
        await supabase.auth.signOut();
        setError('Not authorized');
        return;
      }*/
console.log("NAVIGATING NOW 🚀");
navigate('/admin/dashboard');
      navigate('/admin/dashboard');
    }
  };

    /*
    // Simple demo authentication - email: admin, password: admin123
    if (email === 'admin' && password === 'admin123') {
      localStorage.setItem('admin_authenticated', 'true');
      navigate('/admin/dashboard');
    } else {
      setError('Invalid credentials. Use email: admin, password: admin123');
    }
  };
*/
  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-amber-50 to-cyan-50 flex items-center justify-center p-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white rounded-2xl shadow-2xl p-8 w-full max-w-md"
      >
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-orange-500 to-amber-500 rounded-full mb-4">
            <Lock className="w-8 h-8 text-white" />
          </div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Admin Login</h1>
          <p className="text-gray-600">Access the admin dashboard</p>
        </div>

        <form onSubmit={handleLogin} className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Email
            </label>
            <div className="relative">
              <User className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent outline-none"
                placeholder="Enter Email"
                required
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Password
            </label>
            <div className="relative">
              <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent outline-none"
                placeholder="Enter password"
                required
              />
            </div>
          </div>

          {error && (
            <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg text-sm">
              {error}
            </div>
          )}

          <button
            type="submit"
            className="w-full bg-gradient-to-r from-orange-500 to-amber-500 text-white font-semibold py-3 rounded-lg hover:from-orange-600 hover:to-amber-600 transition-all duration-300 shadow-lg hover:shadow-xl"
          >
            Login to Dashboard
          </button>
        </form>


        <div className="mt-4 text-center">
  <button
    onClick={() => navigate('/')}
    className="text-orange-500 hover:text-orange-600 font-medium"
  >
    ← Back to Home
  </button>
  
</div>
      </motion.div>
    </div>
  );
};
