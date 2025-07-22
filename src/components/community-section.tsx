
// import Image from 'next/image';
// import { useState } from "react";

// export function CommunitySection() {
//   const [email, setEmail] = useState("");
//   const [name, setName] = useState("");
//   const [loading, setLoading] = useState(false);
//   const [message, setMessage] = useState("");
//   const [error, setError] = useState("");

//   async function handleSubscribe(e: React.FormEvent) {
//     e.preventDefault();
//     setLoading(true);
//     setMessage("");
//     setError("");
//     try {
//       const res = await fetch("/api/community-newsletter", {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify({ email, name }),
//       });
//       const result = await res.json();
//       if (!res.ok) throw new Error(result.error || "Subscription failed");
//       setMessage(result.message);
//       setEmail("");
//       setName("");
//     } catch (e: any) {
//       setError(e.message);
//     } finally {
//       setLoading(false);
//     }
//   }

//   return (
//     <section id="community-section">
//       <div className="community-container">
//         <div className="community-items">
//           <h2>join our community</h2>
//           <div className="community-box">
//             <Image
//               src="https://plus.unsplash.com/premium_photo-1669741908175-eb029fbc350f?q=80&w=1888&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
//               alt="Community member smiling"
//               width={500}
//               height={500}
//               data-ai-hint="smiling person"
//             />
//           </div>
//           <div className="community-box"></div>
//           <div className="community-box">
//             <Image
//               src="https://images.unsplash.com/photo-1473448912268-2022ce9509d8?q=80&w=2041&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
//               alt="Community event outdoors"
//               width={500}
//               height={500}
//               data-ai-hint="outdoor event"
//             />
//           </div>
//           <div className="community-box">
//             <span>Our community work tirelessly to make an impact</span>
//           </div>
//           <div className="community-box">
//             <Image
//               src="https://plus.unsplash.com/premium_photo-1682390303440-3972e3193494?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
//               alt="Community gathering"
//               width={500}
//               height={500}
//               data-ai-hint="people gathering"
//             />
//           </div>
//           <div className="community-box">
//             <span>Get updates from our newsletter</span>
//           </div>
//           {/* <div className="email-input-wrapper">
//             <input
//               type="text"
//               placeholder="Enter your email"
//               className="email-input"
//               aria-label="Email for newsletter"
//             />
//             <div className="email-input-icon">
//               <Image
//                 src="https://cdn4.iconfinder.com/data/icons/glyphs/24/icons_share-256.png"
//                 alt="Submit email"
//                 width={25}
//                 height={25}
//               />
//             </div>
//           </div> */}
          
//         </div>
//         <div className="community-box col-span-7 mt-8">
//             <form onSubmit={handleSubscribe} className="flex flex-col md:flex-row gap-2 items-center justify-center">
//               <input
//                 type="text"
//                 placeholder="Your Name (optional)"
//                 value={name}
//                 onChange={e => setName(e.target.value)}
//                 className="border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-accent bg-foreground/10 text-foreground placeholder:text-foreground/60"
//               />
//               <input
//                 type="email"
//                 placeholder="Your Email"
//                 value={email}
//                 onChange={e => setEmail(e.target.value)}
//                 required
//                 className="border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-accent bg-foreground/10 text-foreground placeholder:text-foreground/60"
//               />
//               <button
//                 type="submit"
//                 className="px-6 py-2 rounded bg-accent text-accent-foreground font-bold hover:bg-accent/90 transition"
//                 disabled={loading}
//               >
//                 {loading ? "Subscribing..." : "Subscribe"}
//               </button>
//             </form>
//             {message && <div className="mt-4 text-green-600 whitespace-pre-line text-center font-semibold">{message}</div>}
//             {error && <div className="mt-4 text-red-500 text-center">{error}</div>}
//           </div>
//       </div>
//     </section>
//   );
// }
import Image from "next/image";
import { useState } from "react";

export function CommunitySection() {
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [loading, setLoading] = useState(false);
  const [showPopup, setShowPopup] = useState(false);
  const [error, setError] = useState("");

  async function handleSubscribe(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const res = await fetch("/api/community-newsletter", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, name }),
      });
      const result = await res.json();
      if (!res.ok) throw new Error(result.error || "Subscription failed");

      // success: show popup
      setShowPopup(true);
      setEmail("");
      setName("");
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }

  return (
    <section
      id="community-section"
      className="relative min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-900 via-black to-gray-800 px-4"
    >
      {/* Content */}
      <div className="w-full max-w-2xl flex flex-col items-center text-center">
        <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
          Join our community
        </h2>

        {/* Form */}
        <form
          onSubmit={handleSubscribe}
          className="w-full bg-white/10 backdrop-blur-md p-6 rounded-2xl shadow-2xl flex flex-col md:flex-row gap-4 items-center justify-center"
        >
          <input
            type="text"
            placeholder="Your Name (optional)"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="flex-1 border border-white/40 rounded-lg px-4 py-3 bg-transparent text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-pink-400 transition"
          />
          <input
            type="email"
            placeholder="Your Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="flex-1 border border-white/40 rounded-lg px-4 py-3 bg-transparent text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-pink-400 transition"
          />
          <button
            type="submit"
            disabled={loading}
            className="px-6 py-3 rounded-lg bg-gradient-to-r from-pink-500 to-purple-500 text-white font-semibold shadow-lg hover:scale-[1.02] active:scale-95 transition disabled:opacity-50"
          >
            {loading ? "Subscribing..." : "Subscribe"}
          </button>
        </form>

        {error && (
          <div className="mt-4 text-red-400 font-medium">{error}</div>
        )}
      </div>

      {/* Success Popup */}
      {showPopup && (
        <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50">
          <div className="bg-white rounded-2xl shadow-2xl p-8 max-w-md w-full mx-4 text-center animate-fadeIn">
            <h3 className="text-2xl font-bold text-gray-800 mb-4">
              🎉 Thank you{ name ? `, ${name}` : "" }!
            </h3>
            <p className="text-gray-600 mb-6">
              You have successfully subscribed to our community newsletter.
            </p>
            <button
              onClick={() => setShowPopup(false)}
              className="px-6 py-3 rounded-lg bg-gradient-to-r from-pink-500 to-purple-500 text-white font-semibold hover:scale-105 transition"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </section>
  );
}
