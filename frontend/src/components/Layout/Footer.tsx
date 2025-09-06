import React from 'react';
import { Link } from 'react-router-dom';
import { Facebook, Instagram, Youtube, Mail, Phone, MapPin } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';


const Footer: React.FC = () => {
  return (
    <footer style={{ backgroundColor: '#121212' }} className="border-t border-border text-white font-sans">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10">

          {/* Brand Info */}
          <div className="space-y-5">
            <div className="flex items-center space-x-3">
              <span className="text-xl font-bold text-white">O2 Nutrition</span>
            </div>
            <p className="text-sm text-primary">
              Make Yourself Stronger Than Your Best Excuses.
            </p>
            <p className="text-sm text-gray-400">
              Trusted supplement store based in Delhi, empowering fitness lovers across India with premium nutrition and expert guidance.
            </p>
            <div>
              <h4 className="text-lg font-semibold text-white mb-2">Connect with Us</h4>
              <div className="flex space-x-4">
                <Instagram className="h-6 w-6 text-[#F9A245] hover:text-[#e8913d] cursor-pointer transition-colors" />
                <Facebook className="h-6 w-6 text-[#F9A245] hover:text-[#e8913d] cursor-pointer transition-colors" />
                <Youtube className="h-6 w-6 text-[#F9A245] hover:text-[#e8913d] cursor-pointer transition-colors" />
              </div>


            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-5">
            <h4 className="text-lg font-semibold text-white">Quick Links</h4>
            <ul className="space-y-3 text-gray-400 text-sm">
              {[
                { name: 'Home', href: '/' },
                { name: 'Shop All Products', href: '/shop' },
                { name: 'About Us', href: '/about' },
                { name: 'Contact', href: '/contact' },
                { name: 'My Account', href: '/account' },
              ].map((link) => (
                <li key={link.name}>
                  <Link to={link.href} className="hover:text-primary transition-colors">
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Customer Support */}
          <div className="space-y-5">
            <h4 className="text-lg font-semibold text-white">Customer Support</h4>
            <ul className="space-y-3 text-gray-400 text-sm">
              <li>
                <a href="mailto:support@o2nutrition.com" className="hover:text-primary transition-colors">
                  support@o2nutrition.com
                </a>
              </li>
              <li>
                <a href="tel:+91123456789" className="hover:text-primary transition-colors">
                  +91-123456789
                </a>
              </li>
              <li>
                <Link to="/faqs" className="hover:text-primary transition-colors">
                  FAQs
                </Link>
              </li>
              <li>
                <Link to="/shipping-returns" className="hover:text-primary transition-colors">
                  Shipping & Returns
                </Link>
              </li>
              <li>
                <Link to="/track-order" className="hover:text-primary transition-colors">
                  Track Your Order
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact Us */}
          <div className="space-y-5 text-gray-400 text-sm">
            <h4 className="text-lg font-semibold text-white">Contact Us</h4>
            <div className="flex items-start space-x-3">
              <MapPin className="h-5 w-5 text-primary mt-1" />
              <div className="leading-relaxed">
                <p>Shop No. 14A, G. Floor</p>
                <p>Pocket-2, Paschim Puri</p>
                <p>Pitampura Club Road, Opp. Gurudwara</p>
                <p>New Delhi - 110063</p>
              </div>
            </div>
            <div className="flex items-center space-x-3">
              <Phone className="h-5 w-5 text-primary" />
              <span>+91-98888-99909</span>
            </div>
            <div className="flex items-center space-x-3">
              <Mail className="h-5 w-5 text-primary" />
              <span>o2nutrition@gmail.com</span>
            </div>
          </div>
        </div>

        {/* Subscribe Now Section */}
        <div className="mt-12 bg-[#1a1a1a] rounded-xl p-6 sm:p-8 shadow-lg text-center">
  <h4 className="text-lg sm:text-xl font-semibold text-white mb-3">Subscribe to Our Newsletter</h4>
  <p className="text-sm text-gray-400 mb-4 max-w-xl mx-auto">
    Get exclusive offers, fitness tips, and product updates straight to your inbox.
  </p>
  <form onSubmit={(e) => e.preventDefault()} className="w-full max-w-2xl mx-auto flex flex-col sm:flex-row items-center gap-3">
    <input
      type="email"
      placeholder="Enter your email"
      required
      className="w-full sm:flex-1 px-4 py-2 rounded-md bg-[#2a2a2a] text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-primary"
    />
    <Button type="submit" className="w-full sm:w-auto bg-primary text-white hover:bg-primary-dark transition">
      Subscribe Now
    </Button>
  </form>
</div>

        <Separator className="my-10 bg-gray-700" />

        {/* Bottom Footer */}
        <div className="flex flex-col justify-center items-center space-y-4 text-center">
          <p className="text-gray-400 text-sm">
            © {new Date().getFullYear()} O2 Nutrition. All rights reserved.
          </p>
          <div className="flex items-center space-x-6" style={{ fontSize: '16px' }}>
            <Link to="/disclaimer" className="text-gray-400 hover:text-primary transition-colors">
              Disclaimer
            </Link>
            <span className="text-gray-500">|</span>
            <span className="text-gray-400">💳 100% Secure Payments</span>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
