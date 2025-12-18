import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { logoutUser } from "../Redux/authSlice.js";
import React from "react";
import Navbar from "../pages/NavBar";

// import logo from "../assets/LOGO.png";
// import MapComponent from "./MapComponent";
export default function Home({ user }) {
  const dispatch = useDispatch();
  const { isAuthenticated } = useSelector((state) => state.auth);

  // Logout user if they navigate back to home page using browser back button
  // Only logout if user is actually authenticated (has valid token and isAuthenticated is true)
  useEffect(() => {
    const token = localStorage.getItem("accessToken");
    const role = localStorage.getItem("role");

    // Only logout if:
    // 1. There's a token in localStorage
    // 2. User is authenticated in Redux
    // 3. User has a role (meaning they were actually logged in)
    if (token && isAuthenticated && role) {
      // User is logged in but navigated to home page - logout them
      dispatch(logoutUser());
    }
  }, [dispatch, isAuthenticated]);
  // 🌿 IMAGE SLIDER DATA
  const sliderImages = [
    {
      image:
        "https://st4.depositphotos.com/25985398/39496/i/450/depositphotos_394965726-stock-photo-professional-women-lawyers-work-law.jpg",
      title: "Justice Should Never Be A Privilege",
      message:
        "Every voice matters. Every citizen deserves equal access to justice, support, and legal awareness.",
    },
    {
      image:
        "https://images.unsplash.com/photo-1521791136064-7986c2920216?auto=format&fit=crop&w=1600&q=60",
      title: "Empowering Communities, One Case at a Time",
      message:
        "When citizens, lawyers and NGOs unite, justice becomes a reality — not a distant dream.",
    },
    {
      image:
        "https://previews.123rf.com/images/olivier26/olivier261810/olivier26181000018/111832907-legal-symbol-with-scales-of-justice-golden-sign-embossed-on-black-paper-background-3d-illustration.jpg",
      title: "Your Rights Matter. Your Story Matters.",
      message:
        "No one should fight alone. Together, we stand for fairness, dignity, and human rights.",
    },
    {
      image:
        "https://www.esade.edu/wp-content/uploads/2024/07/abogado-asesorando-pareja.jpg",
      title: "A Platform Built for Hope and Change",
      message:
        "Connecting citizens to legal support and social organizations who truly care.",
    },
  ];

  // 🌿 SLIDER STATE
  const [currentSlide, setCurrentSlide] = useState(0);

  // 🌿 AUTO SLIDER LOGIC
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % sliderImages.length);
    }, 2000);

    return () => clearInterval(interval);
  }, [sliderImages.length]);

  // 🌿 UI STARTS HERE
  return (
    <>
      {/* <MapComponent></MapComponent> */}
      <div className="w-full">
        {/* 🌿 NAVBAR */}
        <Navbar />
        {/* 🌿 HERO SECTION WITH AUTO SLIDER */}
        <section className="relative h-[85vh] w-full overflow-hidden">
          {/* Background Image */}
          <div
            className="absolute inset-0 h-full w-full bg-cover bg-center transition-all duration-1000"
            style={{
              backgroundImage: `url(${sliderImages[currentSlide].image})`,
            }}
          ></div>

          {/* Overlay */}
          <div className="absolute inset-0 bg-black/60"></div>

          {/* Hero Content */}
          <div className="relative z-10 flex flex-col items-center justify-center h-full text-center px-6">
            <h1 className="text-4xl md:text-6xl text-white font-extrabold drop-shadow-lg leading-snug">
              {sliderImages[currentSlide].title}
            </h1>

            <p className="mt-6 text-lg md:text-2xl text-gray-200 max-w-3xl leading-relaxed drop-shadow-xl">
              {sliderImages[currentSlide].message}
            </p>
          </div>
        </section>

        {/* 🌿 SOCIAL MESSAGE SECTION (Bright + Animated) */}
        <section className="relative py-20 bg-gradient-to-b from-blue-50 via-white to-blue-100">
          <div className="container mx-auto px-6">
            <h2 className="text-4xl md:text-5xl font-extrabold text-center text-gray-900 mb-8 animate-fadeIn">
              Justice Is Everyone’s Right —{" "}
              <span className="text-blue-600">Not a Luxury</span>
            </h2>

            <p className="text-lg text-gray-700 text-center max-w-4xl mx-auto leading-relaxed animate-fadeIn delay-200">
              Millions silently face injustice — wrongful arrests, domestic
              violence, exploitation and discrimination. Our mission is to bring
              citizens, lawyers and NGOs together to create a fairer, safer,
              more compassionate society.
            </p>

            {/* Cards */}
            <div className="grid md:grid-cols-3 gap-10 mt-14">
              {/* Card 1 */}
              <div className="p-8 rounded-2xl bg-white shadow-lg border border-blue-100 hover:shadow-2xl hover:-translate-y-2 transition-all duration-300 animate-slideUp">
                <h3 className="text-2xl font-bold text-blue-700">
                  ⚖️ Wrongful Arrests
                </h3>
                <p className="mt-4 text-gray-600">
                  We help individuals who were unfairly detained or charged by
                  connecting them with immediate legal support.
                </p>
              </div>

              {/* Card 2 */}
              <div className="p-8 rounded-2xl bg-white shadow-lg border border-green-100 hover:shadow-2xl hover:-translate-y-2 transition-all duration-300 animate-slideUp delay-150">
                <h3 className="text-2xl font-bold text-green-700">
                  💚 Domestic Violence
                </h3>
                <p className="mt-4 text-gray-600">
                  Survivors deserve protection, guidance and justice. We connect
                  them with NGOs and trusted legal experts.
                </p>
              </div>

              {/* Card 3 */}
              <div className="p-8 rounded-2xl bg-white shadow-lg border border-red-100 hover:shadow-2xl hover:-translate-y-2 transition-all duration-300 animate-slideUp delay-300">
                <h3 className="text-2xl font-bold text-red-700">
                  🛑 Human Rights Abuse
                </h3>
                <p className="mt-4 text-gray-600">
                  From discrimination to violence — we support communities
                  fighting for their dignity and fundamental rights.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* 🌿 SERVICE CARDS SECTION — NEW & IMPROVED */}
        <section className="py-24 bg-gradient-to-b from-white to-green-50">
          <div className="container mx-auto px-6">
            <h2 className="text-4xl md:text-5xl font-extrabold text-center text-gray-900 mb-10 animate-fadeIn">
              How We Support Every Step of Justice
            </h2>

            <p className="text-center text-lg text-gray-600 max-w-3xl mx-auto mb-16">
              Our platform bridges citizens, pro bono lawyers, and NGOs to build
              a safer, fairer society — one verified case at a time. 🌿
            </p>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
              {/* Citizens */}
              <div
                className="relative bg-white/70 backdrop-blur-xl border border-green-200 rounded-3xl 
          shadow-xl hover:shadow-3xl hover:-translate-y-3 hover:rotate-1 transition-all duration-500 p-8 animate-slideUp"
              >
                <div className="absolute -top-6 left-6 bg-green-600 text-white px-4 py-1 rounded-full shadow-lg text-sm tracking-wide">
                  Citizens
                </div>

                <img
                  src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQCA7R-zr5mHHCX6CdFFzGoC9dBIKnfVKi0dg&s"
                  className="h-56 w-full object-cover rounded-2xl mb-6 shadow-sm"
                />

                <h3 className="text-2xl font-bold text-gray-900">
                  Guidance for Every Citizen
                </h3>

                <p className="text-gray-700 mt-3">
                  From domestic issues to cybercrime — citizens receive verified
                  legal guidance, document assistance, and NGO support tailored
                  to their case.
                </p>

                <ul className="mt-5 text-gray-700 space-y-2 text-sm">
                  <li>• Upload case details securely</li>
                  <li>• Receive matched legal experts instantly</li>
                  <li>• Track your case through a personalized dashboard</li>
                </ul>
              </div>

              {/* Lawyers */}
              <div
                className="relative bg-white/70 backdrop-blur-xl border border-blue-200 rounded-3xl 
          shadow-xl hover:shadow-3xl hover:-translate-y-3 hover:-rotate-1 transition-all duration-500 p-8 animate-slideUp delay-200"
              >
                <div className="absolute -top-6 left-6 bg-blue-600 text-white px-4 py-1 rounded-full shadow-lg text-sm tracking-wide">
                  Lawyers
                </div>

                <img
                  src="https://www.lawpreptutorial.com/blog/wp-content/uploads/2024/05/karuna-nundy.jpg"
                  className="h-56 w-full object-cover rounded-2xl mb-6 shadow-sm"
                />

                <h3 className="text-2xl font-bold text-gray-900">
                  Support from Pro Bono Lawyers
                </h3>

                <p className="text-gray-700 mt-3">
                  Verified advocates take up meaningful cases, empowering
                  vulnerable groups and strengthening access to justice.
                </p>

                <ul className="mt-5 text-gray-700 space-y-2 text-sm">
                  <li>• Work on high-impact pro bono cases</li>
                  <li>• Secure document exchange and chat with citizens</li>
                  <li>• Manage cases through a dedicated lawyer dashboard</li>
                </ul>
              </div>

              {/* NGOs */}
              <div
                className="relative bg-white/70 backdrop-blur-xl border border-indigo-200 rounded-3xl 
          shadow-xl hover:shadow-3xl hover:-translate-y-3 hover:rotate-1 transition-all duration-500 p-8 animate-slideUp delay-300"
              >
                <div className="absolute -top-6 left-6 bg-indigo-600 text-white px-4 py-1 rounded-full shadow-lg text-sm tracking-wide">
                  NGOs
                </div>

                <img
                  src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQaGeBlODmjwVUMF47IA4F0YDEuj7igdpnVTw&s"
                  className="h-56 w-full object-cover rounded-2xl mb-6 shadow-sm"
                />

                <h3 className="text-2xl font-bold text-gray-900">
                  NGOs Empowering Justice
                </h3>

                <p className="text-gray-700 mt-3">
                  Partner NGOs help verify cases, offer social support, and
                  coordinate with lawyers to ensure citizens receive complete
                  protection.
                </p>

                <ul className="mt-5 text-gray-700 space-y-2 text-sm">
                  <li>• Case verification & community outreach</li>
                  <li>• Provide counselling and on-ground assistance</li>
                  <li>• Monitor progress through impact dashboards</li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* 🌿 FOOTER */}
        <footer className="bg-gray-900 text-gray-300 py-12 mt-16">
          <div className="container mx-auto px-6 grid grid-cols-1 md:grid-cols-4 gap-10">
            <div>
              <h2 className="text-2xl font-extrabold text-white">
                AdvoCare 🌿
              </h2>
              <p className="mt-4 text-gray-400">
                We believe justice is a right, not a privilege. Our mission is
                to connect citizens, lawyers, and NGOs to make legal help
                accessible.
              </p>
            </div>

            <div>
              <h3 className="text-xl font-semibold text-white mb-4">
                Quick Links
              </h3>
              <ul className="space-y-2">
                <li>
                  <Link className="hover:text-white" to="/">
                    Home
                  </Link>
                </li>
                <li>
                  <Link className="hover:text-white" to="/about">
                    About Us
                  </Link>
                </li>
                <li>
                  <Link className="hover:text-white" to="/services">
                    Our Services
                  </Link>
                </li>
                <li>
                  <Link className="hover:text-white" to="/contact">
                    Contact
                  </Link>
                </li>
              </ul>
            </div>

            <div>
              <h3 className="text-xl font-semibold text-white mb-4">
                Get Help
              </h3>
              <ul className="space-y-2">
                <li>
                  <Link className="hover:text-white" to="/register">
                    Register
                  </Link>
                </li>
                <li>
                  <Link className="hover:text-white" to="/login">
                    Login
                  </Link>
                </li>
                <li>
                  <Link className="hover:text-white" to="/faq">
                    FAQ
                  </Link>
                </li>
                <li>
                  <Link className="hover:text-white" to="/support">
                    Support
                  </Link>
                </li>
              </ul>
            </div>

            <div>
              <h3 className="text-xl font-semibold text-white mb-4">
                Stay Connected
              </h3>
              <p className="text-gray-400 mb-4">
                Follow us for updates & awareness.
              </p>
              <div className="flex space-x-4 text-2xl">
                <a href="#" className="hover:text-white">
                  📘
                </a>
                <a href="#" className="hover:text-white">
                  🐦
                </a>
                <a href="#" className="hover:text-white">
                  📸
                </a>
                <a href="#" className="hover:text-white">
                  🎥
                </a>
              </div>
            </div>
          </div>

          <div className="border-t border-gray-700 mt-12 pt-6 text-center text-gray-400">
            © {new Date().getFullYear()} AdvoCare. All Rights Reserved.
          </div>
        </footer>
      </div>
    </>
  );
}
