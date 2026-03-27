import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { motion } from 'framer-motion';
//import { motion } from 'motion/react';
import { Save, X, Plus, Trash2 } from 'lucide-react';
import { usePackages } from '../contexts/PackageContext';
import { Package } from '../data/packages';
import { supabase } from '../../lib/supabase';

export const AdminPackageForm = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const { getPackageById, addPackage, updatePackage } = usePackages();
  const isEdit = !!id;

  const [formData, setFormData] = useState<Package>({
    id: '',
    title: '',
    category: 'International',
    destination: '',
    duration: '',
    nights: 0,
    days: 0,
    coverImage: '',
    heroImage: '',
    shortDescription: '',
    highlights: [''],
    inclusions: [''],
    itinerary: [{ day: 1, title: '', description: '' }],
    pricing: { standard: 0, deluxe: 0, premium: 0 },
    priceUnit: 'per person'
  });

  
 useEffect(() => {
  const init = async () => {
    // 🔐 Check auth
    const { data } = await supabase.auth.getUser();
    if (!data.user) {
      navigate('/admin/login');
      return;
    }

    // ✏️ Edit mode
    if (isEdit && id) {
      const pkg = getPackageById(id);
      if (pkg) {
        setFormData(pkg);
      } else {
        navigate('/admin/dashboard');
      }
    }
  };

  init();
}, [id, isEdit, navigate, getPackageById]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handlePricingChange = (tier: 'standard' | 'deluxe' | 'premium', value: string) => {
    setFormData(prev => ({
      ...prev,
      pricing: { ...prev.pricing, [tier]: parseInt(value) || 0 }
    }));
  };

  const handleArrayChange = (field: 'highlights' | 'inclusions', index: number, value: string) => {
    setFormData(prev => ({
      ...prev,
      [field]: prev[field].map((item, i) => i === index ? value : item)
    }));
  };

  const addArrayItem = (field: 'highlights' | 'inclusions') => {
    setFormData(prev => ({
      ...prev,
      [field]: [...prev[field], '']
    }));
  };

  const removeArrayItem = (field: 'highlights' | 'inclusions', index: number) => {
    setFormData(prev => ({
      ...prev,
      [field]: prev[field].filter((_, i) => i !== index)
    }));
  };

  const handleItineraryChange = (index: number, field: 'title' | 'description', value: string) => {
    setFormData(prev => ({
      ...prev,
      itinerary: prev.itinerary.map((item, i) => 
        i === index ? { ...item, [field]: value } : item
      )
    }));
  };

  const addItineraryDay = () => {
    setFormData(prev => ({
      ...prev,
      itinerary: [...prev.itinerary, { 
        day: prev.itinerary.length + 1, 
        title: '', 
        description: '' 
      }]
    }));
  };

  const removeItineraryDay = (index: number) => {
    setFormData(prev => ({
      ...prev,
      itinerary: prev.itinerary.filter((_, i) => i !== index).map((item, i) => ({
        ...item,
        day: i + 1
      }))
    }));
  };
  const handleImageUpload = async (
  e: React.ChangeEvent<HTMLInputElement>,
  field: "coverImage" | "heroImage"
) => {
  const file = e.target.files?.[0];
  if (!file) return;

  const fileName = `${Date.now()}-${file.name}`;

  // Upload to Supabase Storage
  const { error } = await supabase.storage
    .from("packages")
    .upload(fileName, file);

  if (error) {
    console.error("Upload error:", error);
    return;
  }

  // Get public URL
  const { data } = supabase.storage
    .from("packages")
    .getPublicUrl(fileName);

  // Save URL in form
  setFormData((prev) => ({
    ...prev,
    [field]: data.publicUrl,
  }));
};

  const handleSubmit = async (e: React.FormEvent) => {
  e.preventDefault();

  const packageData = {
    ...formData,
    id: isEdit
      ? formData.id
      : formData.title.toLowerCase().replace(/[^a-z0-9]+/g, "-"),
    nights: parseInt(formData.nights.toString()),
    days: parseInt(formData.days.toString()),
  };

  if (isEdit) {
    updatePackage(packageData.id, packageData);
  } else {
    const { data, error } = await supabase
      .from("packages")
      .insert([packageData]);

    console.log("INSERT RESULT:", { data, error });

    if (error) {
      console.error("Insert error:", error);
      alert("❌ " + error.message);
console.error(error);
      return;
    }

    alert("✅ Package created successfully!");
  }

  navigate("/admin/dashboard");
};

  

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white rounded-xl shadow-lg p-8"
        >
          <div className="flex items-center justify-between mb-8">
            <h1 className="text-3xl font-bold text-gray-900">
              {isEdit ? 'Edit Package' : 'Add New Package'}
            </h1>
            <button
              onClick={() => navigate('/admin/dashboard')}
              className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-lg transition-colors"
            >
              <X className="w-6 h-6" />
            </button>
          </div>

          <form onSubmit={handleSubmit} className="space-y-8">
            {/* Basic Information */}
            <div>
              <h2 className="text-xl font-semibold text-gray-900 mb-4">Basic Information</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Package Title *
                  </label>
                  <input
                    type="text"
                    name="title"
                    value={formData.title}
                    onChange={handleChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent outline-none"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Category *
                  </label>
                  <select
                    name="category"
                    value={formData.category}
                    onChange={handleChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent outline-none"
                    required
                  >
                    <option value="International">International</option>
                    <option value="Domestic">Domestic</option>
                    <option value="Honeymoon">Honeymoon</option>
                    <option value="Pilgrimage">Pilgrimage</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Destination *
                  </label>
                  <input
                    type="text"
                    name="destination"
                    value={formData.destination}
                    onChange={handleChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent outline-none"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Duration *
                  </label>
                  <input
                    type="text"
                    name="duration"
                    value={formData.duration}
                    onChange={handleChange}
                    placeholder="e.g., 5 Nights 6 Days"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent outline-none"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Nights *
                  </label>
                  <input
                    type="number"
                    name="nights"
                    value={formData.nights}
                    onChange={handleChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent outline-none"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Days *
                  </label>
                  <input
                    type="number"
                    name="days"
                    value={formData.days}
                    onChange={handleChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent outline-none"
                    required
                  />
                </div>

                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Short Description *
                  </label>
                  <textarea
                    name="shortDescription"
                    value={formData.shortDescription}
                    onChange={handleChange}
                    rows={3}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent outline-none"
                    required
                  />
                </div>

                        <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Cover Image *
            </label>

            {/* Upload from computer */}
            <input
              type="file"
              accept="image/*"
              onChange={(e) => handleImageUpload(e, "coverImage")}
              className="w-full mb-2"
            />

            {/* OR paste URL */}
            <input
              type="url"
              name="coverImage"
              value={formData.coverImage}
              onChange={handleChange}
              placeholder="Or paste image URL"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg"
            />
          </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Hero Image *
              </label>

              {/* Upload from computer */}
              <input
                type="file"
                accept="image/*"
                onChange={(e) => handleImageUpload(e, "heroImage")}
                className="w-full mb-2"
              />

              {/* OR paste URL */}
              <input
                type="url"
                name="heroImage"
                value={formData.heroImage}
                onChange={handleChange}
                placeholder="Or paste image URL"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg"
              />
            </div>
              </div>
            </div>

            {/* Pricing */}
            <div>
              <h2 className="text-xl font-semibold text-gray-900 mb-4">Pricing</h2>
              <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Standard Price *
                  </label>
                  <input
                    type="number"
                    value={formData.pricing.standard}
                    onChange={(e) => handlePricingChange('standard', e.target.value)}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent outline-none"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Deluxe Price *
                  </label>
                  <input
                    type="number"
                    value={formData.pricing.deluxe}
                    onChange={(e) => handlePricingChange('deluxe', e.target.value)}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent outline-none"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Premium Price *
                  </label>
                  <input
                    type="number"
                    value={formData.pricing.premium}
                    onChange={(e) => handlePricingChange('premium', e.target.value)}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent outline-none"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Price Unit *
                  </label>
                  <select
                    name="priceUnit"
                    value={formData.priceUnit}
                    onChange={handleChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent outline-none"
                  >
                    <option value="per person">per person</option>
                    <option value="per couple">per couple</option>
                  </select>
                </div>
              </div>
            </div>

            {/* Highlights */}
            <div>
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-xl font-semibold text-gray-900">Highlights</h2>
                <button
                  type="button"
                  onClick={() => addArrayItem('highlights')}
                  className="flex items-center space-x-1 text-orange-500 hover:text-orange-600"
                >
                  <Plus className="w-4 h-4" />
                  <span className="text-sm">Add</span>
                </button>
              </div>
              <div className="space-y-3">
                {formData.highlights.map((highlight, index) => (
                  <div key={index} className="flex gap-2">
                    <input
                      type="text"
                      value={highlight}
                      onChange={(e) => handleArrayChange('highlights', index, e.target.value)}
                      placeholder={`Highlight ${index + 1}`}
                      className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent outline-none"
                    />
                    {formData.highlights.length > 1 && (
                      <button
                        type="button"
                        onClick={() => removeArrayItem('highlights', index)}
                        className="p-2 text-red-500 hover:bg-red-50 rounded-lg"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    )}
                  </div>
                ))}
              </div>
            </div>

            {/* Inclusions */}
            <div>
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-xl font-semibold text-gray-900">Inclusions</h2>
                <button
                  type="button"
                  onClick={() => addArrayItem('inclusions')}
                  className="flex items-center space-x-1 text-orange-500 hover:text-orange-600"
                >
                  <Plus className="w-4 h-4" />
                  <span className="text-sm">Add</span>
                </button>
              </div>
              <div className="space-y-3">
                {formData.inclusions.map((inclusion, index) => (
                  <div key={index} className="flex gap-2">
                    <input
                      type="text"
                      value={inclusion}
                      onChange={(e) => handleArrayChange('inclusions', index, e.target.value)}
                      placeholder={`Inclusion ${index + 1}`}
                      className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent outline-none"
                    />
                    {formData.inclusions.length > 1 && (
                      <button
                        type="button"
                        onClick={() => removeArrayItem('inclusions', index)}
                        className="p-2 text-red-500 hover:bg-red-50 rounded-lg"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    )}
                  </div>
                ))}
              </div>
            </div>

            {/* Itinerary */}
            <div>
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-xl font-semibold text-gray-900">Itinerary</h2>
                <button
                  type="button"
                  onClick={addItineraryDay}
                  className="flex items-center space-x-1 text-orange-500 hover:text-orange-600"
                >
                  <Plus className="w-4 h-4" />
                  <span className="text-sm">Add Day</span>
                </button>
              </div>
              <div className="space-y-4">
                {formData.itinerary.map((day, index) => (
                  <div key={index} className="p-4 border border-gray-200 rounded-lg">
                    <div className="flex items-center justify-between mb-3">
                      <h3 className="font-semibold text-gray-900">Day {day.day}</h3>
                      {formData.itinerary.length > 1 && (
                        <button
                          type="button"
                          onClick={() => removeItineraryDay(index)}
                          className="p-1 text-red-500 hover:bg-red-50 rounded"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      )}
                    </div>
                    <div className="space-y-3">
                      <input
                        type="text"
                        value={day.title}
                        onChange={(e) => handleItineraryChange(index, 'title', e.target.value)}
                        placeholder="Day title"
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent outline-none"
                      />
                      <textarea
                        value={day.description}
                        onChange={(e) => handleItineraryChange(index, 'description', e.target.value)}
                        placeholder="Day description"
                        rows={3}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent outline-none"
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Submit Buttons */}
            <div className="flex items-center justify-end space-x-4 pt-6 border-t border-gray-200">
              <button
                type="button"
                onClick={() => navigate('/admin/dashboard')}
                className="px-6 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="flex items-center space-x-2 px-6 py-2 bg-gradient-to-r from-orange-500 to-amber-500 text-white rounded-lg hover:from-orange-600 hover:to-amber-600 transition-all shadow-lg hover:shadow-xl"
              >
                <Save className="w-4 h-4" />
                <span>{isEdit ? 'Update Package' : 'Create Package'}</span>
              </button>
            </div>
          </form>
        </motion.div>
      </div>
    </div>
  );
};
