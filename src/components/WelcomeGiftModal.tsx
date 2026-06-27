"use client";

import { useState, useEffect, useRef } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { Sparkles, Gift, Mail, Phone, User, Check, Copy } from "lucide-react";
import {
  generateVoucherCode,
  getRandomDiscount,
  getRandomQuote,
  isFirstVisit,
  completeFirstVisit,
} from "@/utils/welcomeGift";

type FlowStep = "idle" | "gift" | "opening" | "reveal" | "modal" | "success" | "closed";

export default function WelcomeGiftModal() {
  const [step, setStep] = useState<FlowStep>("idle");
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [errors, setErrors] = useState<{ name?: string; phone?: string; email?: string }>({});
  
  const videoRef = useRef<HTMLVideoElement | null>(null);
  
  // Stored values generated once on mount
  const [voucherCode, setVoucherCode] = useState("");
  const [discount, setDiscount] = useState(0);
  const [quote, setQuote] = useState("");
  const [expiryDate, setExpiryDate] = useState("");
  const [copied, setCopied] = useState(false);


  // Initialize values and check first visit
  useEffect(() => {
    // Developer convenience: clear localStorage if URL has reset_welcome parameter
    if (typeof window !== "undefined") {
      const urlParams = new URLSearchParams(window.location.search);
      if (urlParams.get("reset_welcome") === "true") {
        localStorage.removeItem("matchaman_first_visit_completed");
        window.history.replaceState({}, document.title, window.location.pathname);
      }
    }

    // Generate values
    setVoucherCode(generateVoucherCode());
    setDiscount(getRandomDiscount());
    setQuote(getRandomQuote());
    
    // Calculate expiry date (3 days from now)
    const expiry = new Date();
    expiry.setDate(expiry.getDate() + 3);
    const options: Intl.DateTimeFormatOptions = { month: "long", day: "numeric", year: "numeric" };
    setExpiryDate(expiry.toLocaleDateString("en-US", options));

    // Delay popup by 800ms if it's the user's first visit
    if (isFirstVisit()) {
      const timer = setTimeout(() => {
        setStep("gift");
      }, 800);
      return () => clearTimeout(timer);
    }
  }, []);

  // Programmatic play trigger for mobile video when modal opens
  useEffect(() => {
    if (step === "modal" && videoRef.current) {
      videoRef.current.play().catch((err) => {
        console.log("Autoplay was prevented on mobile:", err);
      });
    }
  }, [step]);

  const handleOpenGift = () => {
    if (step !== "gift") return;
    setStep("opening");
    
    // Simulate 1.5 second opening sequence
    setTimeout(() => {
      setStep("reveal");
    }, 1500);
  };

  const handleCopyCode = () => {
    navigator.clipboard.writeText(voucherCode);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    const newErrors: { name?: string; phone?: string; email?: string } = {};
    if (!name.trim()) {
      newErrors.name = "Full Name is required";
    }
    if (!phone.trim()) {
      newErrors.phone = "Phone Number is required";
    } else if (!/^\d+$/.test(phone)) {
      newErrors.phone = "Phone Number must contain digits only";
    }
    if (!email.trim()) {
      newErrors.email = "Email Address is required";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      newErrors.email = "Please enter a valid email address";
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    setErrors({});
    setStep("success");
  };

  const handleClose = () => {
    completeFirstVisit();
    setStep("closed");
  };

  if (step === "idle" || step === "closed") return null;

  return (
    <>
      <AnimatePresence>
        {step === "gift" || step === "opening" || step === "reveal" ? (
          /* STAGE 1: Fullscreen Overlay & Interactive Gift Box / Reveal */
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-charcoal/70 backdrop-blur-md z-[90] flex flex-col items-center justify-center p-6"
          >
            {/* Sparkles / Floating Particles Background */}
            <div className="absolute inset-0 pointer-events-none overflow-hidden">
              {Array.from({ length: 20 }).map((_, i) => (
                <motion.div
                  key={i}
                  initial={{
                    opacity: 0,
                    x: Math.random() * 400 - 200,
                    y: Math.random() * 400 - 200,
                    scale: 0.5,
                  }}
                  animate={{
                    opacity: [0, 0.8, 0],
                    x: Math.random() * 400 - 200,
                    y: [100, -250],
                    scale: [0.5, Math.random() * 1.5 + 0.5, 0.2],
                  }}
                  transition={{
                    duration: Math.random() * 3 + 2,
                    repeat: Infinity,
                    ease: "easeOut",
                  }}
                  className="absolute w-2 h-2 rounded-full"
                  style={{
                    backgroundColor: i % 2 === 0 ? "#D4AF37" : "#6B8E23",
                    left: "50%",
                    top: "50%",
                  }}
                />
              ))}
            </div>

            {step === "reveal" ? (
              /* STAGE 2B: Voucher Reveal */
              <motion.div
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ duration: 0.5 }}
                className="text-center max-w-md relative z-10 flex flex-col items-center gap-6"
              >
                <div className="text-center">
                  <span className="font-serif text-sm italic tracking-widest text-gold font-semibold block mb-2">
                    Congratulations!
                  </span>
                  <h2 className="font-serif text-3xl md:text-4xl text-cream font-bold leading-tight tracking-wide mb-2">
                    🎁 Your Matchaman Welcome Gift
                  </h2>
                  <p className="text-cream/80 text-xs md:text-sm tracking-wide font-light">
                    You unlocked a welcome voucher code!
                  </p>
                </div>

                {/* Floating Ticket Voucher Card */}
                <motion.div
                  animate={{ y: [0, -8, 0] }}
                  transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                  className="relative w-80 bg-gradient-to-br from-cream to-cream-dark border-2 border-gold/40 rounded-2xl shadow-2xl py-6 px-6 text-left border-dashed"
                >
                  {/* Notch Circles */}
                  <div className="absolute top-1/2 left-[-10px] -translate-y-1/2 w-5 h-5 rounded-full bg-charcoal/70 border-r-2 border-gold/40" />
                  <div className="absolute top-1/2 right-[-10px] -translate-y-1/2 w-5 h-5 rounded-full bg-charcoal/70 border-l-2 border-gold/40" />

                  <div className="flex justify-between items-start">
                    <div>
                      <p className="text-[9px] text-charcoal/40 uppercase tracking-widest font-semibold">Welcome Gift</p>
                      <h4 className="font-serif text-2xl font-extrabold text-matcha mt-0.5">
                        {discount}% OFF
                      </h4>
                    </div>
                    <div className="bg-gold/10 text-gold-dark px-2 py-0.5 rounded text-[8px] font-extrabold tracking-wider uppercase border border-gold/20">
                      Unlocked
                    </div>
                  </div>

                  <div className="border-t border-charcoal/10 border-dashed my-3.5" />

                  <div className="mb-3.5">
                    <p className="text-[8px] text-charcoal/40 uppercase tracking-widest font-bold">Voucher Code</p>
                    <div className="flex items-center justify-between bg-charcoal/5 border border-charcoal/10 rounded-lg px-3 py-2 mt-1 font-mono font-bold text-base text-charcoal tracking-widest">
                      <span>{voucherCode}</span>
                    </div>
                  </div>

                  <div>
                    <p className="text-[8px] text-charcoal/40 uppercase tracking-widest font-bold font-serif">Usable For</p>
                    <p className="text-[10px] text-charcoal font-medium mt-0.5">
                      Your first drink order.
                    </p>
                  </div>
                </motion.div>

                <button
                  onClick={() => setStep("modal")}
                  className="px-8 py-4 bg-matcha hover:bg-matcha-dark text-cream border-2 border-gold/30 hover:border-gold font-bold tracking-widest text-xs uppercase rounded-full shadow-lg transition-all duration-300 flex items-center gap-2 cursor-pointer mt-4"
                >
                  <span>Claim My Gift</span>
                </button>
              </motion.div>
            ) : (
              /* Gift box rendering (step === "gift" || step === "opening") */
              <motion.div
                initial={{ scale: 0.9, y: 20 }}
                animate={{ scale: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="text-center max-w-md relative z-10 flex flex-col items-center"
              >
                <h2 className="font-serif text-3xl md:text-4xl text-cream mb-2 font-bold flex items-center gap-2 tracking-wide">
                  Welcome to Matchaman 🍵
                </h2>
                <p className="text-cream/80 text-sm md:text-base mb-10 tracking-wide font-light">
                  We prepared an exclusive welcome gift just for you.
                </p>

                {/* Interactive Gift Box */}
                <div
                  onClick={handleOpenGift}
                  className="cursor-pointer group relative flex items-center justify-center w-56 h-56 transition-transform duration-300 hover:scale-105"
                >
                  {/* Glow ring */}
                  <motion.div
                    animate={step === "opening" ? { scale: [1, 2, 3], opacity: [0.5, 0.8, 0] } : { scale: [1, 1.1, 1] }}
                    transition={{ duration: step === "opening" ? 1.5 : 2, repeat: step === "opening" ? 0 : Infinity }}
                    className="absolute w-44 h-44 rounded-full bg-gradient-to-tr from-matcha/30 to-gold/30 blur-[30px] -z-10"
                  />

                  {/* The Box Body and Lid */}
                  <motion.div
                    animate={
                      step === "opening"
                        ? {
                            rotate: [-3, 3, -3, 3, -3, 3, 0],
                            x: [-2, 2, -2, 2, -2, 2, 0],
                          }
                        : {
                            y: [0, -8, 0],
                          }
                    }
                    transition={{
                      duration: step === "opening" ? 0.4 : 5,
                      repeat: step === "opening" ? 2 : Infinity,
                      ease: "easeInOut",
                    }}
                    className="relative w-40 h-40 flex flex-col items-center justify-end"
                  >
                    {/* Lid */}
                    <motion.div
                      animate={
                        step === "opening"
                          ? { y: -70, rotate: -20, opacity: 0, scale: 0.8 }
                          : { y: 0, rotate: 0, opacity: 1 }
                      }
                      transition={{ duration: 0.8, ease: "easeOut" }}
                      className="absolute top-2 w-[104%] h-8 bg-matcha rounded-md shadow-md z-10 flex justify-center"
                    >
                      {/* Ribbon */}
                      <div className="w-6 h-full bg-gold" />
                      {/* Bow ribbon ties */}
                      <div className="absolute -top-6 w-14 h-6 flex justify-center items-end">
                        <div className="w-7 h-7 border-4 border-gold rounded-full mr-[-4px]" />
                        <div className="w-7 h-7 border-4 border-gold rounded-full ml-[-4px]" />
                      </div>
                    </motion.div>

                    {/* Box Body */}
                    <div className="w-36 h-28 bg-matcha-dark relative rounded-b-lg shadow-lg flex justify-center overflow-hidden border border-matcha-light/20">
                      <div className="w-6 h-full bg-gold absolute" />
                      <div className="h-6 w-full bg-gold absolute top-[30%]" />
                    </div>
                  </motion.div>
                </div>

                <motion.button
                  onClick={handleOpenGift}
                  disabled={step === "opening"}
                  whileTap={{ scale: 0.95 }}
                  className="mt-10 px-8 py-4 bg-matcha hover:bg-matcha-dark text-cream border-2 border-gold/30 hover:border-gold font-bold tracking-widest text-xs uppercase rounded-full shadow-lg transition-all duration-300 flex items-center gap-2 cursor-pointer"
                >
                  <Gift className="w-4 h-4" />
                  {step === "opening" ? "Opening Gift..." : "Open My Gift"}
                </motion.button>
              </motion.div>
            )}
          </motion.div>
        ) : (
          /* STAGE 3: Voucher Information Modal */
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-charcoal/70 backdrop-blur-md z-[90] flex items-center justify-center p-4 md:p-6 overflow-y-auto"
          >
            <motion.div
              initial={{ scale: 0.95, y: 15 }}
              animate={{ scale: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="relative w-[95vw] md:w-[60vw] max-w-[1100px] h-[90vh] md:h-[75vh] min-h-[550px] glass bg-cream/90 backdrop-blur-xl border border-cream-dark/50 shadow-2xl rounded-3xl overflow-hidden flex flex-col md:flex-row"
            >
              {/* LEFT COLUMN (Desktop): Video & Quote / Stacks on top on mobile */}
              <div className="w-full md:w-1/2 h-[40%] md:h-full p-6 flex flex-col border-b md:border-b-0 md:border-r border-charcoal/5 justify-between">
                {/* Autoplay Promo Video */}
                <div className="relative w-full h-[75%] rounded-2xl overflow-hidden bg-charcoal/5 border border-charcoal/10 shadow-inner">
                  <video
                    ref={videoRef}
                    autoPlay
                    muted
                    loop
                    playsInline
                    {...{ webkitPlaysInline: true }}
                    className="w-full h-full object-cover"
                  >
                    <source src="/videos/Welcome.mp4" type="video/mp4" />
                    Your browser does not support the video tag.
                  </video>
                  {/* Subtle glass play tag overlay */}
                  <div className="absolute top-4 left-4 glass px-3 py-1.5 rounded-full flex items-center gap-2">
                    <div className="w-2 h-2 rounded-full bg-matcha animate-pulse" />
                    <span className="text-[10px] font-bold text-charcoal tracking-wider uppercase">Matchaman Atelier</span>
                  </div>
                </div>

                {/* Random quote container */}
                <div className="h-[25%] flex items-center justify-center px-2 py-4">
                  <p className="font-serif italic text-charcoal/70 text-xs md:text-base text-center leading-relaxed font-medium">
                    "{quote}"
                  </p>
                </div>
              </div>

              {/* RIGHT COLUMN: Form or Success Card */}
              <div className="w-full md:w-1/2 h-[60%] md:h-full p-6 md:p-10 flex flex-col justify-between overflow-y-auto">
                <AnimatePresence mode="wait">
                  {step === "modal" ? (
                    /* STAGE 3A: Voucher Form */
                    <motion.div
                      key="form"
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -20 }}
                      transition={{ duration: 0.4 }}
                      className="flex flex-col flex-grow justify-between gap-6"
                    >
                      <div>
                        <h2 className="font-serif text-2xl md:text-3xl text-charcoal leading-tight font-extrabold mb-3">
                          Your Exclusive Welcome Gift
                        </h2>
                        <p className="text-charcoal-light text-xs md:text-sm leading-relaxed font-light">
                          Chào mừng dến với dại gia dình Matchaman. Hãy nhập thông tin của bạn dể có thể nhận dược voucher {voucherCode} dể có thể giảm {discount}% cho dơn nước dầu tiên của bạn.
                        </p>
                      </div>

                      {/* Input fields */}
                      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                        {/* Name */}
                        <div className="flex flex-col gap-1">
                          <label className="text-[10px] text-charcoal/50 uppercase tracking-widest font-semibold ml-1">Full Name</label>
                          <div className="relative flex items-center">
                            <User className="absolute left-3.5 w-4 h-4 text-charcoal/30" />
                            <input
                              type="text"
                              value={name}
                              onChange={(e) => setName(e.target.value)}
                              placeholder="e.g. Kenji Sato"
                              className="w-full pl-11 pr-4 py-3 bg-cream border border-charcoal/10 rounded-xl text-charcoal text-sm outline-none focus:border-matcha transition-colors"
                            />
                          </div>
                          {errors.name && (
                            <span className="text-[10px] text-red-500 font-medium ml-1 mt-0.5">{errors.name}</span>
                          )}
                        </div>

                        {/* Phone */}
                        <div className="flex flex-col gap-1">
                          <label className="text-[10px] text-charcoal/50 uppercase tracking-widest font-semibold ml-1">Phone Number</label>
                          <div className="relative flex items-center">
                            <Phone className="absolute left-3.5 w-4 h-4 text-charcoal/30" />
                            <input
                              type="tel"
                              value={phone}
                              onChange={(e) => setPhone(e.target.value.replace(/\D/g, ""))}
                              placeholder="e.g. 0912345678"
                              className="w-full pl-11 pr-4 py-3 bg-cream border border-charcoal/10 rounded-xl text-charcoal text-sm outline-none focus:border-matcha transition-colors"
                            />
                          </div>
                          {errors.phone && (
                            <span className="text-[10px] text-red-500 font-medium ml-1 mt-0.5">{errors.phone}</span>
                          )}
                        </div>

                        {/* Email */}
                        <div className="flex flex-col gap-1">
                          <label className="text-[10px] text-charcoal/50 uppercase tracking-widest font-semibold ml-1">Email Address</label>
                          <div className="relative flex items-center">
                            <Mail className="absolute left-3.5 w-4 h-4 text-charcoal/30" />
                            <input
                              type="email"
                              value={email}
                              onChange={(e) => setEmail(e.target.value)}
                              placeholder="e.g. kenji@example.com"
                              className="w-full pl-11 pr-4 py-3 bg-cream border border-charcoal/10 rounded-xl text-charcoal text-sm outline-none focus:border-matcha transition-colors"
                            />
                          </div>
                          {errors.email && (
                            <span className="text-[10px] text-red-500 font-medium ml-1 mt-0.5">{errors.email}</span>
                          )}
                        </div>

                        <button
                          type="submit"
                          className="w-full mt-2 py-3.5 bg-matcha hover:bg-matcha-dark text-cream font-bold tracking-widest text-xs uppercase rounded-full shadow transition-all duration-300 hover:scale-[1.01] cursor-pointer"
                        >
                          Reserve My Voucher
                        </button>
                      </form>

                      {/* Spacer for bottom close button */}
                      <div className="h-10" />
                    </motion.div>
                  ) : (
                    /* STAGE 3B: Success Voucher Card */
                    <motion.div
                      key="success"
                      initial={{ opacity: 0, scale: 0.95 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.95 }}
                      transition={{ duration: 0.4 }}
                      className="flex flex-col flex-grow items-center justify-center text-center gap-6"
                    >
                      <div className="w-14 h-14 bg-matcha/10 text-matcha rounded-full flex items-center justify-center">
                        <Sparkles className="w-7 h-7" />
                      </div>
                      <div>
                        <h3 className="font-serif text-xl md:text-2xl text-charcoal font-extrabold mb-1.5">
                          Thank you for joining Matchaman 🍵
                        </h3>
                        <p className="text-charcoal-light text-xs md:text-sm max-w-sm">
                          Your voucher has been successfully reserved.
                        </p>
                      </div>

                      {/* Premium ticket */}
                      <motion.div
                        initial={{ y: 20, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        transition={{ delay: 0.2, duration: 0.5 }}
                        className="relative w-full max-w-sm bg-gradient-to-br from-cream to-cream-dark border-2 border-gold/40 rounded-2xl shadow-xl overflow-hidden py-5 px-6 text-left border-dashed"
                      >
                        {/* Notch Circles */}
                        <div className="absolute top-1/2 left-[-10px] -translate-y-1/2 w-5 h-5 rounded-full bg-cream/90 md:bg-cream/10 border-r-2 border-gold/40" />
                        <div className="absolute top-1/2 right-[-10px] -translate-y-1/2 w-5 h-5 rounded-full bg-cream/90 md:bg-cream/10 border-l-2 border-gold/40" />

                        <div className="flex justify-between items-start">
                          <div>
                            <p className="text-[9px] text-charcoal/40 uppercase tracking-widest font-semibold">Welcome Gift</p>
                            <h4 className="font-serif text-2xl font-extrabold text-matcha mt-0.5">
                              {discount}% OFF
                            </h4>
                          </div>
                          <div className="bg-gold/10 text-gold-dark px-2 py-0.5 rounded text-[8px] font-extrabold tracking-wider uppercase border border-gold/20">
                            Claimed
                          </div>
                        </div>

                        <div className="border-t border-charcoal/10 border-dashed my-3.5" />

                        <div className="mb-3.5">
                          <p className="text-[8px] text-charcoal/40 uppercase tracking-widest font-bold">Voucher Code</p>
                          <div className="flex items-center justify-between bg-charcoal/5 border border-charcoal/10 rounded-lg px-3 py-2 mt-1 font-mono font-bold text-base text-charcoal tracking-widest">
                            <span>{voucherCode}</span>
                            <button
                              onClick={handleCopyCode}
                              className="text-[10px] font-sans text-matcha hover:text-matcha-dark uppercase tracking-wider font-extrabold cursor-pointer transition-colors"
                            >
                              {copied ? "Copied" : "Copy"}
                            </button>
                          </div>
                        </div>

                        <div>
                          <p className="text-[8px] text-charcoal/40 uppercase tracking-widest font-bold">Expiration</p>
                          <p className="text-[10px] text-charcoal font-medium mt-0.5">
                            Valid until {expiryDate} (3 days)
                          </p>
                        </div>
                      </motion.div>

                      {/* Spacer for bottom close button */}
                      <div className="h-10" />
                    </motion.div>
                  )}
                </AnimatePresence>

                {/* Return Button - Fixed relative to the container right bottom */}
                <div className="absolute bottom-4 right-4 md:bottom-6 md:right-6">
                  <button
                    onClick={handleClose}
                    className="px-6 py-2.5 rounded-full bg-charcoal hover:bg-matcha text-cream text-[10px] font-bold tracking-widest uppercase transition-all duration-300 hover:scale-105 shadow-md flex items-center gap-1.5 cursor-pointer"
                  >
                    Return to Homepage
                  </button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
