
import Navbar from "../components/Navbar"
import Hero from "../components/Hero"
import Products from "../components/Products"


export default function Home() {
  return (
    <div>
      <Navbar />
      <main className="container mx-auto pt-24 px-4 pb-16">
      <Hero/>
      <Products/>
      </main>
    </div>
  )
}
