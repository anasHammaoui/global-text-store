'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function RootPage() {
  const router = useRouter();

  useEffect(() => {
    // Get user's language preference
    const userLanguage = navigator.language || 'en';
    const locale = userLanguage.startsWith('fr') ? 'fr' : 'en';
    
    // Redirect to the appropriate locale
    router.replace(`/${locale}`);
  }, [router]);

  // Show loading while redirecting
  return (
    <div className="flex items-center justify-center min-h-screen">
      <div className="text-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900 mx-auto mb-4"></div>
        <p>Redirecting...</p>
      </div>
    </div>
  );
}
