import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion'; 
import { Plus, Edit, Trash2, LogOut, Package as PackageIcon, Search } from 'lucide-react';
import { usePackages } from '../contexts/PackageContext';
import { supabase } from '../../lib/supabase';

export const AdminDashboard = () => {
  const navigate = useNavigate();
  const { packages, deletePackage } = usePackages();
  const [searchTerm, setSearchTerm] = useState('');
  const [filterCategory, setFilterCategory] = useState('All');

  useEffect(() => {
    const checkUser = async () => {
      const { data } = await supabase.auth.getUser();

      if (!data.user) {
        navigate('/admin/login');
      }
    };

    checkUser();
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem('admin_authenticated');
    navigate('/admin/login');
  };

  // ✅ FIXED DELETE HANDLER
  const handleDelete = async (id: string, title: string) => {
    if (window.confirm(`Are you sure you want to delete "${title}"?`)) {
      await deletePackage(id);
    }
  };

  const filteredPackages = packages.filter(pkg => {
    const matchesSearch = pkg.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          pkg.destination.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = filterCategory === 'All' || pkg.category === filterCategory;
    return matchesSearch && matchesCategory;
  });

  const categories = ['All', ...Array.from(new Set(packages.map(pkg => pkg.category)))];

  return (
    <div className="min-h-screen bg-[var(--page-bg)] transition-colors">
      {/* Header */}
      <div className="bg-white dark:bg-slate-900 shadow-md transition-colors border-b border-transparent dark:border-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <PackageIcon className="w-8 h-8 text-orange-500" />
              <h1 className="text-2xl font-bold text-gray-900 dark:text-slate-100 font-[var(--font-playfair)]">Admin Dashboard</h1>
            </div>
            <button
              onClick={handleLogout}
              className="flex items-center space-x-2 px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors font-[var(--font-nunito)] font-[600]"
            >
              <LogOut className="w-4 h-4" />
              <span>Logout</span>
            </button>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="bg-white dark:bg-slate-900 border border-transparent dark:border-slate-800 p-6 rounded-xl shadow-md transition-colors">
            <div className="text-3xl font-bold text-orange-500 mb-2">{packages.length}</div>
            <div className="text-gray-600 dark:text-slate-400 font-[var(--font-nunito)] text-[14px]">Total Packages</div>
          </div>
          <div className="bg-white dark:bg-slate-900 border border-transparent dark:border-slate-800 p-6 rounded-xl shadow-md transition-colors">
            <div className="text-3xl font-bold text-cyan-500 mb-2">
              {new Set(packages.map(p => p.destination)).size}
            </div>
            <div className="text-gray-600 dark:text-slate-400 font-[var(--font-nunito)] text-[14px]">Destinations</div>
          </div>
          <div className="bg-white dark:bg-slate-900 border border-transparent dark:border-slate-800 p-6 rounded-xl shadow-md transition-colors">
            <div className="text-3xl font-bold text-amber-500 mb-2">
              {new Set(packages.map(p => p.category)).size}
            </div>
            <div className="text-gray-600 dark:text-slate-400 font-[var(--font-nunito)] text-[14px]">Categories</div>
          </div>
          <div className="bg-white dark:bg-slate-900 border border-transparent dark:border-slate-800 p-6 rounded-xl shadow-md transition-colors">
            <div className="text-3xl font-bold text-green-500 mb-2">
              {packages.filter(p => p.category === 'International').length}
            </div>
            <div className="text-gray-600 dark:text-slate-400 font-[var(--font-nunito)] text-[14px]">International</div>
          </div>
        </div>

        {/* Actions & Filters */}
        <div className="bg-white dark:bg-slate-900 border border-transparent dark:border-slate-800 p-6 rounded-xl shadow-md mb-8 transition-colors">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div className="flex-1 max-w-md">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search packages..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 dark:border-slate-800 bg-white dark:bg-slate-950 text-[var(--text-primary)] rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent outline-none font-[var(--font-nunito)] text-[14px]"
                />
              </div>
            </div>

            <div className="flex items-center gap-4">
              <select
                value={filterCategory}
                onChange={(e) => setFilterCategory(e.target.value)}
                className="px-4 py-2 border border-gray-300 dark:border-slate-800 bg-white dark:bg-slate-950 text-[var(--text-primary)] rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent outline-none font-[var(--font-nunito)] text-[14px]"
              >
                {categories.map(cat => (
                  <option key={cat} value={cat}>{cat}</option>
                ))}
              </select>

              <button
                onClick={() => navigate('/admin/package/new')}
                className="flex items-center space-x-2 px-6 py-2 bg-gradient-to-r from-orange-500 to-amber-500 text-white rounded-lg hover:from-orange-600 hover:to-amber-600 transition-all shadow-lg hover:shadow-xl font-[var(--font-nunito)] font-[600]"
              >
                <Plus className="w-5 h-5" />
                <span>Add Package</span>
              </button>
            </div>
          </div>
        </div>

        {/* Packages Table */}
        <div className="bg-white dark:bg-slate-900 border border-transparent dark:border-slate-800 rounded-xl shadow-md overflow-hidden transition-colors">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50 dark:bg-slate-950 border-b border-gray-200 dark:border-slate-800">
                <tr>
                  <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 dark:text-slate-400 uppercase tracking-wider">
                    Package
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 dark:text-slate-400 uppercase tracking-wider">
                    Destination
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 dark:text-slate-400 uppercase tracking-wider">
                    Category
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 dark:text-slate-400 uppercase tracking-wider">
                    Duration
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 dark:text-slate-400 uppercase tracking-wider">
                    Price (Standard)
                  </th>
                  <th className="px-6 py-4 text-right text-xs font-medium text-gray-500 dark:text-slate-400 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200 dark:divide-slate-800">
                {filteredPackages.map((pkg, index) => (
                  <motion.tr
                    key={pkg.id}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="hover:bg-gray-50 dark:hover:bg-slate-950 transition-colors border-b border-gray-200 dark:border-slate-800"
                  >
                    <td className="px-6 py-4">
                      <div className="flex items-center min-w-0">
                        <img
                          src={
                            pkg.coverImage ||
                            pkg.heroImage ||
                            "https://images.unsplash.com/photo-1507525428034-b723cf961d3e"
                          }
                          alt={pkg.title}
                          className="w-12 h-12 rounded-xl object-cover mr-4 flex-shrink-0"
                        />
                        <div>
                          <div className="font-semibold text-gray-900 dark:text-slate-100 truncate">
                            {pkg.title}
                          </div>
                          <div className="text-sm text-gray-500 dark:text-slate-450">{pkg.id}</div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-900 dark:text-slate-200">{pkg.destination}</td>
                    <td className="px-6 py-4">
                      <span className="px-3 py-1 text-xs font-medium rounded-full bg-orange-100 dark:bg-orange-950/30 text-orange-850 dark:text-orange-400">
                        {pkg.category}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-900 dark:text-slate-200">{pkg.duration}</td>
                    <td className="px-6 py-4 text-sm font-semibold text-gray-900 dark:text-slate-100">
                      ₹{pkg.pricing.standard.toLocaleString()}
                    </td>
                    <td className="px-6 py-4 text-right">
                      <div className="flex items-center justify-end space-x-2">
                        <button
                          onClick={() => navigate(`/admin/package/edit/${pkg.id}`)}
                          className="p-2 text-blue-600 hover:bg-blue-50 dark:hover:bg-blue-950/30 rounded-lg transition-colors"
                          title="Edit"
                        >
                          <Edit className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => handleDelete(pkg.id, pkg.title)}
                          className="p-2 text-red-600 hover:bg-red-50 dark:hover:bg-red-950/30 rounded-lg transition-colors"
                          title="Delete"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </td>
                  </motion.tr>
                ))}
              </tbody>
            </table>
          </div>

          {filteredPackages.length === 0 && (
            <div className="text-center py-12">
              <PackageIcon className="w-16 h-16 text-gray-300 dark:text-slate-700 mx-auto mb-4" />
              <p className="text-gray-500 dark:text-slate-400">No packages found</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
