export default function AboutPage() {
  return (
    <div className="bg-gray-900 min-h-screen text-white">
      <div className="container mx-auto px-4 py-16">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-4xl md:text-5xl font-bold mb-8 bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent text-center">
            About Laptop Store
          </h1>
          
          <div className="grid md:grid-cols-2 gap-12 items-center mb-16">
            <div>
              <h2 className="text-2xl font-bold mb-4">Your Trusted Technology Partner</h2>
              <p className="text-gray-300 mb-6 leading-relaxed">
                We are Kenya's premier laptop retailer, specializing in high-quality laptops 
                for professionals, students, gamers, and creative enthusiasts. With years of 
                experience in the technology industry, we understand what our customers need.
              </p>
              <p className="text-gray-300 leading-relaxed">
                Our curated selection includes the latest models from top brands like Dell, 
                Apple, Lenovo, ASUS, and more, ensuring you get the perfect device for your 
                specific requirements and budget.
              </p>
            </div>
            <div className="bg-gradient-to-br from-blue-600/20 to-purple-600/20 rounded-2xl p-8 border border-blue-500/30">
              <h3 className="text-xl font-semibold mb-4">Why Choose Us?</h3>
              <ul className="space-y-3">
                <li className="flex items-center gap-3">
                  <span className="text-green-400">✓</span>
                  <span>Authentic products with warranty</span>
                </li>
                <li className="flex items-center gap-3">
                  <span className="text-green-400">✓</span>
                  <span>Competitive prices in Kenya</span>
                </li>
                <li className="flex items-center gap-3">
                  <span className="text-green-400">✓</span>
                  <span>Expert consultation via WhatsApp</span>
                </li>
                <li className="flex items-center gap-3">
                  <span className="text-green-400">✓</span>
                  <span>Fast delivery across Kenya</span>
                </li>
                <li className="flex items-center gap-3">
                  <span className="text-green-400">✓</span>
                  <span>After-sales support</span>
                </li>
              </ul>
            </div>
          </div>

          <div className="bg-gray-800/50 rounded-2xl p-8 border border-gray-700 mb-16">
            <h2 className="text-2xl font-bold mb-6 text-center">Our Process</h2>
            <div className="grid md:grid-cols-3 gap-8">
              <div className="text-center">
                <div className="w-16 h-16 bg-blue-600 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl font-bold">1</span>
                </div>
                <h3 className="text-lg font-semibold mb-2">Browse & Choose</h3>
                <p className="text-gray-400">
                  Explore our extensive catalog and find the perfect laptop for your needs
                </p>
              </div>
              <div className="text-center">
                <div className="w-16 h-16 bg-purple-600 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl font-bold">2</span>
                </div>
                <h3 className="text-lg font-semibold mb-2">Chat on WhatsApp</h3>
                <p className="text-gray-400">
                  Contact us directly for pricing, availability, and personalized recommendations
                </p>
              </div>
              <div className="text-center">
                <div className="w-16 h-16 bg-green-600 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl font-bold">3</span>
                </div>
                <h3 className="text-lg font-semibold mb-2">Get Delivered</h3>
                <p className="text-gray-400">
                  Receive your laptop with secure packaging and full warranty coverage
                </p>
              </div>
            </div>
          </div>

          <div className="text-center bg-gradient-to-r from-blue-600/20 to-purple-600/20 rounded-2xl p-8 border border-blue-500/30">
            <h2 className="text-2xl font-bold mb-4">Ready to Find Your Perfect Laptop?</h2>
            <p className="text-gray-300 mb-6">
              Get in touch with our experts for personalized recommendations and the best deals.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a 
                href="https://wa.me/254720363215?text=Hello!%20I%20need%20help%20choosing%20a%20laptop." 
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center px-6 py-3 bg-green-600 hover:bg-green-700 rounded-lg font-medium transition-colors"
              >
                <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M17.472 14.382c-.297-.15-1.758-.867-2.03-.967-.273-.1-.473-.15-.673.15-.197.295-.771.964-.944 1.162-.175.195-.349.21-.646.075-.3-.15-1.263-.465-2.403-1.485-.888-.795-1.484-1.77-1.66-2.07-.173-.297-.018-.458.13-.606.136-.135.298-.345.446-.523.146-.181.194-.301.297-.496.1-.21.049-.375-.025-.524-.075-.15-.672-1.62-.922-2.206-.24-.584-.487-.51-.672-.516-.172-.008-.371-.01-.57-.01-.2 0-.523.074-.797.36-.273.3-1.045 1.02-1.045 2.475s1.07 2.865 1.219 3.075c.149.195 2.105 3.195 5.1 4.485.714.3 1.27.489 1.704.625.714.227 1.365.195 1.879.118.57-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.135-.27-.21-.57-.345m-5.446 7.443h-.016c-1.77 0-3.524-.48-5.055-1.38l-.36-.214-3.75.975 1.005-3.645-.239-.375a9.878 9.878 0 01-1.52-5.26c.006-5.445 4.493-9.885 10.029-9.885 2.7 0 5.23 1.039 7.13 2.925a9.9 9.9 0 012.922 7.122c-.008 5.444-4.494 9.885-10.03 9.885M20.52 3.449A12.022 12.022 0 0012.015 0C5.462 0 .152 5.304.148 11.822c-.002 2.04.54 4.023 1.563 5.77L0 24l6.335-1.652c1.746.943 3.71 1.444 5.68 1.447h.006c6.553 0 11.864-5.306 11.869-11.822a11.907 11.907 0 00-3.37-8.524"/>
                </svg>
                Chat on WhatsApp
              </a>
              <a 
                href="/products"
                className="inline-flex items-center px-6 py-3 border border-blue-400 text-blue-400 hover:bg-blue-900/30 rounded-lg font-medium transition-colors"
              >
                Browse Laptops
                <svg className="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
