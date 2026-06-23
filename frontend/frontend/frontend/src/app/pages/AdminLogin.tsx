
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
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-amber-50 to-cyan-50 dark:from-slate-950 dark:via-slate-900 dark:to-slate-950 flex items-center justify-center p-4 transition-colors">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white dark:bg-slate-900 border border-transparent dark:border-slate-800 rounded-2xl shadow-2xl p-8 w-full max-w-md transition-colors"
      >
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-orange-500 to-amber-500 rounded-full mb-4">
            <Lock className="w-8 h-8 text-white" />
          </div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-slate-100 mb-2 font-[var(--font-playfair)]">Admin Login</h1>
          <p className="text-gray-600 dark:text-slate-400">Access the admin dashboard</p>
        </div>

        <form onSubmit={handleLogin} className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-slate-350 mb-2 font-[var(--font-nunito)]">
              Email
            </label>
            <div className="relative">
              <User className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full pl-10 pr-4 py-3 border border-gray-300 dark:border-slate-800 rounded-lg bg-white dark:bg-slate-950 text-[var(--text-primary)] focus:ring-2 focus:ring-orange-500 focus:border-transparent outline-none font-[var(--font-nunito)]"
                placeholder="Enter Email"
                required
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-slate-350 mb-2 font-[var(--font-nunito)]">
              Password
            </label>
            <div className="relative">
              <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full pl-10 pr-4 py-3 border border-gray-300 dark:border-slate-800 rounded-lg bg-white dark:bg-slate-950 text-[var(--text-primary)] focus:ring-2 focus:ring-orange-500 focus:border-transparent outline-none font-[var(--font-nunito)]"
                placeholder="Enter password"
                required
              />
            </div>
          </div>

          {error && (
            <div className="bg-red-50 dark:bg-red-950/20 border border-red-200 dark:border-red-900/30 text-red-700 dark:text-red-400 px-4 py-3 rounded-lg text-sm">
              {error}
            </div>
          )}

          <button
            type="submit"
            className="w-full bg-gradient-to-r from-orange-500 to-amber-500 text-white font-semibold py-3 rounded-lg hover:from-orange-600 hover:to-amber-600 transition-all duration-300 shadow-lg hover:shadow-xl font-[var(--font-nunito)]"
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
