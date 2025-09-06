import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { heroBannerApi, HeroBanner as HeroBannerType } from '../services/api';

// Import fallback banner images
import desktopBanner1 from '../assets/Banners/Desktop/1 - DEsktop.png';
import mobileBanner1 from '../assets/Banners/Phone/1 - Mobile Banner.png';

const HeroBanner: React.FC = () => {
  const [banners, setBanners] = useState<HeroBannerType[]>([]);
  const [currentBanner, setCurrentBanner] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [isDesktop, setIsDesktop] = useState(false);

  useEffect(() => {
    const handleResize = () => setIsDesktop(window.innerWidth >= 768);
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    const fetchBanners = async () => {
      try {
        const response = await heroBannerApi.getAllBanners();
        if (response.success && response.data && response.data.length > 0) {
          setBanners(response.data);
        } else {
          setError(true);
        }
      } catch (error) {
        console.error('Failed to fetch hero banners:', error);
        setError(true);
      } finally {
        setLoading(false);
      }
    };

    fetchBanners();
  }, []);

  useEffect(() => {
    if (banners.length > 1) {
      const interval = setInterval(() => {
        setCurrentBanner((prev) => (prev + 1) % banners.length);
      }, 5000);
      return () => clearInterval(interval);
    }
  }, [banners.length]);

  if (loading) {
    return (
      <div className="w-full h-64 md:h-96 bg-gray-200 animate-pulse rounded-lg"></div>
    );
  }

  // Show fallback banner if API fails or no banners
  if (error || !banners.length) {
    return (
      <div className="relative w-full h-64 md:h-96 overflow-hidden rounded-lg shadow-lg">
        <img
          src={isDesktop ? desktopBanner1 : mobileBanner1}
          alt="O2 Nutrition - Premium Supplements"
          className="w-full h-full object-cover"
        />
      </div>
    );
  }

  const banner = banners[currentBanner];

  return (
    <div className="relative w-full h-64 md:h-96 overflow-hidden rounded-lg shadow-lg">
      <img
        src={banner.desktopImage?.url || (isDesktop ? desktopBanner1 : mobileBanner1)}
        alt={banner.desktopImage?.alt || banner.title || 'Hero Banner'}
        className="w-full h-full object-cover"
        onError={(e) => {
          e.currentTarget.src = isDesktop ? desktopBanner1 : mobileBanner1;
        }}
      />
      
      {(banner.title || banner.description || banner.ctaText) && (
        <div className="absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center">
          <div className="text-center text-white px-4 max-w-2xl">
            {banner.title && (
              <h1 className="text-3xl md:text-5xl font-bold mb-4">
                {banner.title}
              </h1>
            )}
            
            {banner.description && (
              <p className="text-lg md:text-xl mb-6 opacity-90">
                {banner.description}
              </p>
            )}
            
            {banner.ctaText && banner.ctaLink && (
              <Link
                to={banner.ctaLink}
                className="inline-block bg-[#F9A245] hover:bg-[#e8933a] text-white font-semibold px-8 py-3 rounded-lg transition-colors duration-300"
              >
                {banner.ctaText}
              </Link>
            )}
          </div>
        </div>
      )}

      {banners.length > 1 && (
        <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2">
          {banners.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentBanner(index)}
              className={`w-3 h-3 rounded-full transition-colors ${
                index === currentBanner ? 'bg-white' : 'bg-white/50'
              }`}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default HeroBanner;