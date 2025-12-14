import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { logoutUser } from "../Redux/authSlice.js";
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
        {/* 🌿 NAVBAR */}
        <nav className="fixed top-0 left-0 w-full z-50 bg-white/70 backdrop-blur-xl shadow-md border-b border-gray-200">
          <div className="container mx-auto px-6 py-4 flex items-center justify-between">
            {/* 🌿 LEFT: LOGO + TITLE */}
            <div className="flex items-center space-x-3">
              <img
                src="data:image/png;base64,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"
                alt="Logo"
                className="w-10 h-10 object-cover rounded-full shadow"
              />
              <h1 className="text-4xl font-bold tracking-tight flex items-center space-x-2">
                <span className="bg-gradient-to-r from-blue-600 to-indigo-800 bg-clip-text text-transparent">
                  AdvoCare
                </span>
              </h1>
            </div>

            {/* 🌳 RIGHT: NAV LINKS + BUTTONS */}
            <div className="flex items-center space-x-10">
              {/* NAV LINKS */}
              <div className="hidden md:flex space-x-8 text-lg font-medium">
                <Link
                  className="text-gray-700 hover:text-blue-700 transition"
                  to="/"
                >
                  Home
                </Link>
                <Link
                  className="text-gray-700 hover:text-blue-700 transition"
                  to="/About"
                >
                  About
                </Link>
                <Link
                  className="text-gray-700 hover:text-blue-700 transition"
                  to="/Services"
                >
                  Services
                </Link>
                <Link
                  className="text-gray-700 hover:text-blue-700 transition"
                  to="/Contact"
                >
                  Contact
                </Link>
              </div>

              {/* LOGIN + REGISTER */}
              {!user && (
                <div className="flex items-center space-x-4">
                  <Link
                    to="/login"
                    className="px-5 py-2 bg-blue-600 text-white rounded-md shadow hover:bg-blue-700 transition font-semibold"
                  >
                    Login
                  </Link>

                  <Link
                    to="/register"
                    className="px-5 py-2 border border-blue-600 text-blue-700 bg-white rounded-md shadow hover:bg-blue-50 transition font-semibold"
                  >
                    Register
                  </Link>
                </div>
              )}
            </div>
          </div>
        </nav>

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
