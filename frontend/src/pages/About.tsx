import React from "react";
import { Users, Target, Award, Heart } from "lucide-react";

const About: React.FC = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="bg-gradient-hero py-16">
        <div className="container mx-auto px-4 text-center">
          <h1 className="font-heading font-bold text-4xl lg:text-5xl text-foreground mb-6">
            About Us
          </h1>
          <p className="font-body text-xl text-muted-foreground max-w-2xl mx-auto">
            Your trusted partner in health and fitness, providing premium nutrition products 
            to help you achieve your wellness goals.
          </p>
        </div>
      </section>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">

        {/* Mission & Vision */}
        <div className="grid md:grid-cols-2 gap-12 mb-16">
          <div className="bg-white rounded-lg p-8 shadow-md">
            <Target className="w-12 h-12 text-[#F9A246] mb-4" />
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Our Mission</h2>
            <p className="text-gray-600 leading-relaxed">
              To empower individuals on their fitness journey by providing high-quality, 
              scientifically-backed nutrition products that support optimal health and performance.
            </p>
          </div>
          
          <div className="bg-white rounded-lg p-8 shadow-md">
            <Heart className="w-12 h-12 text-[#F9A246] mb-4" />
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Our Vision</h2>
            <p className="text-gray-600 leading-relaxed">
              To become the leading nutrition brand that transforms lives through premium products, 
              expert guidance, and unwavering commitment to customer wellness.
            </p>
          </div>
        </div>

        {/* Values */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">Our Values</h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center">
              <Award className="w-16 h-16 text-[#F9A246] mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-gray-900 mb-3">Quality First</h3>
              <p className="text-gray-600">
                We source only the finest ingredients and maintain the highest quality standards 
                in all our products.
              </p>
            </div>
            
            <div className="text-center">
              <Users className="w-16 h-16 text-[#F9A246] mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-gray-900 mb-3">Customer Focus</h3>
              <p className="text-gray-600">
                Your health goals are our priority. We're committed to providing exceptional 
                service and support.
              </p>
            </div>
            
            <div className="text-center">
              <Target className="w-16 h-16 text-[#F9A246] mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-gray-900 mb-3">Innovation</h3>
              <p className="text-gray-600">
                We continuously research and develop new products to meet evolving 
                health and fitness needs.
              </p>
            </div>
          </div>
        </div>

        {/* Story */}
        <div className="bg-white rounded-lg p-8 shadow-md">
          <h2 className="text-3xl font-bold text-gray-900 mb-6">Our Story</h2>
          <div className="prose prose-lg max-w-none text-gray-600">
            <p className="mb-4">
              Founded with a passion for health and wellness, O2 Nutrition began as a vision 
              to make premium nutrition accessible to everyone. Our journey started when our 
              founders recognized the gap between high-quality nutrition products and affordability.
            </p>
            <p className="mb-4">
              Today, we're proud to serve thousands of customers across the country, offering 
              a comprehensive range of supplements, proteins, vitamins, and wellness products. 
              Our team of nutrition experts and fitness enthusiasts work tirelessly to curate 
              products that deliver real results.
            </p>
            <p>
              At O2 Nutrition, we believe that good health is not a luxury—it's a right. 
              That's why we're committed to providing authentic, effective, and affordable 
              nutrition solutions for every stage of your fitness journey.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;