import React, { createContext, useContext, useState, useEffect } from 'react';
import type { ReactNode } from 'react';
import { supabase } from '../../lib/supabase';
import { Package, packages as initialPackages } from '../data/packages';

interface PackageContextType {
  packages: Package[];
  addPackage: (pkg: Package) => void;
  updatePackage: (id: string, pkg: Package) => void;
  deletePackage: (id: string) => Promise<void>;
  applyPromoCode: (packageId: string, code: string) => { success: boolean; message: string; discount?: number };
  getPackageById: (id: string) => Package | undefined;
  
}

const PackageContext = createContext<PackageContextType | undefined>(undefined);

export function PackageProvider({ children }: { children: ReactNode }) {
const [packages, setPackages] = useState<Package[]>([]);


useEffect(() => {
  const fetchPackages = async () => {
    const { data, error } = await supabase
      .from("packages")
      .select("*");

    if (error) {
      console.error("Context fetch error:", error);
    } else {
      setPackages(data || []);
    }
  };

  fetchPackages();
}, []);

  const addPackage = (pkg: Package) => {
    setPackages(prev => [...prev, pkg]);
  };

  const updatePackage = (id: string, updatedPkg: Package) => {
    setPackages(prev => prev.map(pkg => pkg.id === id ? updatedPkg : pkg));
  };

 const deletePackage = async (id: string) => {
  const { error } = await supabase
    .from('packages')
    .delete()
    .eq('id', id);

  if (error) {
    console.error('❌ Delete failed:', error.message);
    return;
  }

  // update UI after DB delete
  setPackages(prev => prev.filter(pkg => pkg.id !== id));
};

  const getPackageById = (id: string) => {
  return packages.find(pkg => pkg.id === id);
};

  const applyPromoCode = (packageId: string, code: string) => {
    const pkg = packages.find(p => p.id === packageId);
    if (!pkg) {
      return { success: false, message: 'Package not found' };
    }

    if (!pkg.promoCode) {
      return { success: false, message: 'No promo code available for this package' };
    }

    if (pkg.promoCode.toUpperCase() !== code.toUpperCase()) {
      return { success: false, message: 'Invalid promo code' };
    }

    return {
      success: true,
      message: `Promo code applied! You get ${pkg.discount}% off`,
      discount: pkg.discount
    };
  };

  return (
    <PackageContext.Provider value={{ packages, addPackage, updatePackage, deletePackage, applyPromoCode, getPackageById }}>
      {children}
    </PackageContext.Provider>
  );
}

export function usePackages() {
  const context = useContext(PackageContext);
  if (!context) {
    throw new Error('usePackages must be used within PackageProvider');
  }
  return context;
}
