"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { motion, AnimatePresence } from "framer-motion";
import { Calendar, Clock, Users, Phone, MessageCircle, CheckCircle2 } from "lucide-react";

type ReservationData = {
  name: string;
  phone: string;
  date: string;
  time: string;
  guests: number;
  requests?: string;
};

export default function Reservation() {
  const [isSubmitted, setIsSubmitted] = useState(false);
  const { register, handleSubmit, formState: { errors } } = useForm<ReservationData>();

  const onSubmit = (data: ReservationData) => {
    console.log("Reservation data:", data);
    setIsSubmitted(true);
    setTimeout(() => setIsSubmitted(false), 5000);
  };

  const timeSlots = [];
  for (let hour = 8; hour <= 22; hour++) {
    timeSlots.push(`${hour}:00 ${hour < 12 ? 'AM' : 'PM'}`);
    if (hour < 22) timeSlots.push(`${hour}:30 ${hour < 12 ? 'AM' : 'PM'}`);
  }

  return (
    <section id="reserve" className="py-24 md:py-32 bg-espresso relative overflow-hidden">
      {/* Decorative Spice Dots */}
      <div className="absolute top-10 left-10 opacity-20 hidden md:block">
        <div className="grid grid-cols-4 gap-4">
          {[...Array(16)].map((_, i) => (
            <div key={i} className="w-2 h-2 bg-saffron rounded-full" />
          ))}
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 relative z-10">
        <div className="text-center mb-16">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="font-serif text-4xl md:text-6xl text-cream mb-4"
          >
            Book Your <span className="italic text-saffron">Table</span>
          </motion.h2>
          <p className="text-cream/60">Join us for an unforgettable artisan experience.</p>
        </div>

        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          className="bg-cream p-8 md:p-12 rounded-[2.5rem] shadow-2xl"
        >
          <AnimatePresence mode="wait">
            {!isSubmitted ? (
              <motion.form
                key="form"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onSubmit={handleSubmit(onSubmit)}
                className="grid grid-cols-1 md:grid-cols-2 gap-6"
              >
                {/* Name */}
                <div className="space-y-2">
                  <label className="text-xs font-bold uppercase tracking-widest text-espresso/60 ml-1">Full Name</label>
                  <input
                    {...register("name", { required: "Name is required" })}
                    type="text"
                    placeholder="Enter your name"
                    className="w-full bg-white border border-espresso/10 p-4 rounded-2xl focus:ring-2 focus:ring-terracotta outline-none transition-all"
                  />
                  {errors.name && <p className="text-red-500 text-xs mt-1">{errors.name.message}</p>}
                </div>

                {/* Phone */}
                <div className="space-y-2">
                  <label className="text-xs font-bold uppercase tracking-widest text-espresso/60 ml-1">Phone Number</label>
                  <div className="relative">
                    <span className="absolute left-4 top-1/2 -translate-y-1/2 text-espresso/40 font-bold">+91</span>
                    <input
                      {...register("phone", { 
                        required: "Phone is required",
                        pattern: { value: /^[6-9]\d{9}$/, message: "Invalid Indian phone number" }
                      })}
                      type="tel"
                      placeholder="98765 43210"
                      className="w-full bg-white border border-espresso/10 p-4 pl-12 rounded-2xl focus:ring-2 focus:ring-terracotta outline-none transition-all"
                    />
                  </div>
                  {errors.phone && <p className="text-red-500 text-xs mt-1">{errors.phone.message}</p>}
                </div>

                {/* Date */}
                <div className="space-y-2">
                  <label className="text-xs font-bold uppercase tracking-widest text-espresso/60 ml-1">Date</label>
                  <div className="relative">
                    <Calendar className="absolute right-4 top-1/2 -translate-y-1/2 w-5 h-5 text-espresso/20" />
                    <input
                      {...register("date", { required: "Date is required" })}
                      type="date"
                      className="w-full bg-white border border-espresso/10 p-4 rounded-2xl focus:ring-2 focus:ring-terracotta outline-none transition-all"
                    />
                  </div>
                </div>

                {/* Time */}
                <div className="space-y-2">
                  <label className="text-xs font-bold uppercase tracking-widest text-espresso/60 ml-1">Preferred Time</label>
                  <div className="relative">
                    <Clock className="absolute right-4 top-1/2 -translate-y-1/2 w-5 h-5 text-espresso/20" />
                    <select
                      {...register("time", { required: "Time is required" })}
                      className="w-full bg-white border border-espresso/10 p-4 rounded-2xl focus:ring-2 focus:ring-terracotta outline-none transition-all appearance-none"
                    >
                      {timeSlots.map(slot => (
                        <option key={slot} value={slot}>{slot}</option>
                      ))}
                    </select>
                  </div>
                </div>

                {/* Guests */}
                <div className="space-y-2">
                  <label className="text-xs font-bold uppercase tracking-widest text-espresso/60 ml-1">Number of Guests</label>
                  <div className="relative">
                    <Users className="absolute right-4 top-1/2 -translate-y-1/2 w-5 h-5 text-espresso/20" />
                    <input
                      {...register("guests", { required: true, min: 1, max: 10 })}
                      type="number"
                      min="1"
                      max="10"
                      className="w-full bg-white border border-espresso/10 p-4 rounded-2xl focus:ring-2 focus:ring-terracotta outline-none transition-all"
                    />
                  </div>
                </div>

                {/* Requests */}
                <div className="space-y-2 md:col-span-2">
                  <label className="text-xs font-bold uppercase tracking-widest text-espresso/60 ml-1">Special Requests (Optional)</label>
                  <textarea
                    {...register("requests")}
                    placeholder="Anything we should know? (Birthday, allergies, etc.)"
                    rows={3}
                    className="w-full bg-white border border-espresso/10 p-4 rounded-2xl focus:ring-2 focus:ring-terracotta outline-none transition-all resize-none"
                  />
                </div>

                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  type="submit"
                  className="md:col-span-2 bg-terracotta text-cream py-5 rounded-2xl text-lg font-bold shadow-xl shadow-terracotta/20 hover:bg-espresso transition-all relative overflow-hidden group"
                >
                  <span className="relative z-10">Confirm Reservation</span>
                  <div className="absolute inset-0 bg-white/10 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-500" />
                </motion.button>
              </motion.form>
            ) : (
              <motion.div
                key="success"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="flex flex-col items-center text-center py-12"
              >
                <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mb-6">
                  <CheckCircle2 className="w-10 h-10 text-green-600" />
                </div>
                <h3 className="font-serif text-3xl font-bold text-espresso mb-2">🎉 Table Reserved!</h3>
                <p className="text-espresso/60 max-w-sm">
                  We've received your request. A confirmation will be sent to your WhatsApp shortly.
                </p>
                <button 
                  onClick={() => setIsSubmitted(false)}
                  className="mt-8 text-sm font-bold text-terracotta uppercase tracking-widest hover:underline"
                >
                  Make another booking
                </button>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>

        {/* Alternate Contact */}
        <div className="mt-16 text-center space-y-6">
          <p className="text-cream/40 uppercase tracking-[0.2em] text-sm font-bold">Or call us directly</p>
          <div className="flex flex-col md:flex-row items-center justify-center gap-6">
            <a 
              href="tel:+919876543210" 
              className="flex items-center gap-3 text-cream text-2xl font-serif hover:text-saffron transition-colors"
            >
              <Phone className="w-6 h-6 text-saffron" />
              +91 98765 43210
            </a>
            <a 
              href="https://wa.me/919876543210" 
              target="_blank"
              className="flex items-center gap-3 bg-green-500/10 border border-green-500/20 text-green-500 px-6 py-3 rounded-full hover:bg-green-500 hover:text-white transition-all font-bold"
            >
              <MessageCircle className="w-5 h-5" />
              WhatsApp Us
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
