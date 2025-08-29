import React from 'react';
import { 
  Utensils, 
  GraduationCap, 
  Mail, 
  Phone, 
  MapPin,
  Facebook,
  Twitter,
  Instagram,
  Heart
} from 'lucide-react';

export const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-white border-t border-gray-200 mt-auto">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand Section */}
          <div className="col-span-1 md:col-span-2">
            <div className="flex items-center space-x-3 mb-4">
              <div className="w-10 h-10 bg-blue-600 rounded-lg flex items-center justify-center">
                <Utensils className="w-6 h-6 text-white" />
              </div>
              <div>
                <h3 className="text-xl font-bold text-gray-900">UniFood</h3>
                <div className="flex items-center space-x-1 text-sm text-gray-600">
                  <GraduationCap className="w-4 h-4" />
                  <span>IIIT Kottayam</span>
                </div>
              </div>
            </div>
            <p className="text-gray-600 mb-4 max-w-md">
              Streamlining food ordering and enhancing the dining experience for the IIIT Kottayam community. 
              Order ahead, skip the queue, and enjoy fresh, delicious meals.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-gray-400 hover:text-blue-600 transition-colors">
                <Facebook className="w-5 h-5" />
              </a>
              <a href="#" className="text-gray-400 hover:text-blue-600 transition-colors">
                <Twitter className="w-5 h-5" />
              </a>
              <a href="#" className="text-gray-400 hover:text-blue-600 transition-colors">
                <Instagram className="w-5 h-5" />
              </a>
            </div>
          </div>

          {/* Contact Information */}
          <div>
            <h4 className="text-lg font-semibold text-gray-900 mb-4">Contact Us</h4>
            <div className="space-y-3">
              <div className="flex items-center space-x-3">
                <MapPin className="w-4 h-4 text-gray-600" />
                <span className="text-sm text-gray-600">
                  IIIT Kottayam Campus<br />
                  Kottayam, Kerala 686635
                </span>
              </div>
              <div className="flex items-center space-x-3">
                <Phone className="w-4 h-4 text-gray-600" />
                <span className="text-sm text-gray-600">+91 481 2597000</span>
              </div>
              <div className="flex items-center space-x-3">
                <Mail className="w-4 h-4 text-gray-600" />
                <span className="text-sm text-gray-600">canteen@iiitkottayam.ac.in</span>
              </div>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-lg font-semibold text-gray-900 mb-4">Quick Links</h4>
            <div className="space-y-2">
              <a href="#" className="block text-sm text-gray-600 hover:text-blue-600 transition-colors">
                About IIIT Kottayam
              </a>
              <a href="#" className="block text-sm text-gray-600 hover:text-blue-600 transition-colors">
                Canteen Hours
              </a>
              <a href="#" className="block text-sm text-gray-600 hover:text-blue-600 transition-colors">
                Nutritional Information
              </a>
              <a href="#" className="block text-sm text-gray-600 hover:text-blue-600 transition-colors">
                Feedback & Support
              </a>
              <a href="#" className="block text-sm text-gray-600 hover:text-blue-600 transition-colors">
                Privacy Policy
              </a>
              <a href="#" className="block text-sm text-gray-600 hover:text-blue-600 transition-colors">
                Terms of Service
              </a>
            </div>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="border-t border-gray-200 pt-6 mt-8">
          <div className="flex flex-col md:flex-row items-center justify-between">
            <p className="text-sm text-gray-600">
              © {currentYear} UniFood - IIIT Kottayam. All rights reserved.
            </p>
            <div className="flex items-center space-x-1 text-sm text-gray-600 mt-2 md:mt-0">
              <span>Made with</span>
              <Heart className="w-4 h-4 text-red-500 fill-current" />
              <span>for the IIIT Kottayam community</span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};