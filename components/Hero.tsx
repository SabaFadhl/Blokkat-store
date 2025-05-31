
export default function Hero() {
  return (
// <!-- Hero Section -->
      <div className="relative w-full h-96 mb-12 rounded-xl overflow-hidden">
        <div
          className="absolute inset-0 bg-gradient-to-r from-indigo-900/90 to-transparent z-10"
        ></div>
        <img
          src="/img/hero.jpg"
          alt="E-commerce Crypto Marketplace"
          className="absolute inset-0 w-full h-full object-cover object-top"
        />
        <div
          className="relative z-20 h-full flex flex-col justify-center px-10 max-w-2xl"
        >
          <h2 className="text-4xl font-bold text-white mb-4">Shop with Blokkat</h2>
          <p className="text-gray-200 mb-6">
            Discover a new way to shop online with cryptocurrency. Secure, fast,
            and convenient transactions for the digital age.
          </p>
          
        </div>
      </div>
  )
}