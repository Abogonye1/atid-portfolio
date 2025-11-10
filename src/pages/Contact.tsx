import React, { useRef } from "react";
import Navigation from "@/components/Navigation";
import { useState } from "react";
import { supabase } from "@/lib/supabaseClient";
import { toast } from "@/components/ui/sonner";

const Contact = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const formRef = useRef<HTMLFormElement | null>(null);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const trimmedName = name.trim();
    const trimmedEmail = email.trim();
    const trimmedMessage = message.trim();

    if (!trimmedName || !trimmedEmail || !trimmedMessage) {
      toast.error("Please fill out all required fields.");
      return;
    }

    // Honeypot detection: if hidden field is filled, simulate success and skip backend
    const hpVal = ((new FormData(e.currentTarget).get("hp") as string | null) ?? "").trim();
    if (hpVal) {
      toast.success("Message sent successfully!");
      setName("");
      setEmail("");
      setMessage("");
      return;
    }

    setLoading(true);
    type InvokeResult = { data: unknown; error: { message?: string } | null };
    const INVOKE_TIMEOUT_MS = import.meta.env.MODE === "test"
      ? 100
      : Number.parseInt(String(import.meta.env.VITE_CONTACT_TIMEOUT_MS ?? 12000));

    const invokePromise = supabase.functions.invoke("contact", {
      body: JSON.stringify({ name: trimmedName, email: trimmedEmail, message: trimmedMessage }),
    }) as Promise<InvokeResult>;

    const timeoutPromise = new Promise<InvokeResult>((resolve) => {
      setTimeout(() => resolve({ data: null, error: { message: "timeout" } }), INVOKE_TIMEOUT_MS);
    });

    try {
      const { data, error } = await Promise.race([invokePromise, timeoutPromise]);

      if (error) {
        if (error.message === "timeout") {
          toast.error("Request timed out. Please try again.");
        } else {
          toast.error("Failed to send message.");
        }
        return;
      }

      toast.success("Message sent successfully!");
      setName("");
      setEmail("");
      setMessage("");
    } catch (err) {
      toast.error("Failed to send message.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Navigation />
      <main className="min-h-screen bg-background text-foreground">
      <section className="w-full mr-auto mb-8 ml-auto" aria-labelledby="contact-heading">
        <div className="max-w-7xl sm:px-6 lg:px-8 mr-auto ml-auto pr-4 pl-4">
          <div className="relative overflow-hidden ring-1 ring-white/10 bg-white/5 rounded-3xl backdrop-blur">
            {/* Content */}
            <div className="relative z-10 md:p-12 lg:p-16 pt-8 pr-8 pb-8 pl-8">
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
                {/* Form card */}
                <div className="lg:col-span-5">
                  <div className="ring-1 ring-white/20 bg-white/95 rounded-2xl pt-6 pr-6 pb-6 pl-6 shadow-lg backdrop-blur">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-[11px] text-neutral-500 uppercase tracking-wider">NomadIQ Support</p>
                        <h1 id="contact-heading" className="mt-1 text-2xl sm:text-3xl font-semibold tracking-tight text-neutral-900">
                          Have a question?
                        </h1>
                      </div>
                      <div className="h-9 w-9 rounded-lg bg-neutral-900 text-white flex items-center justify-center" aria-hidden="true">
                        {/* message-square icon */}
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-4 w-4">
                          <path d="M22 17a2 2 0 0 1-2 2H6.828a2 2 0 0 0-1.414.586l-2.202 2.202A.71.71 0 0 1 2 21.286V5a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2z"></path>
                        </svg>
                      </div>
                    </div>

                    <form ref={formRef} onSubmit={handleSubmit} className="mt-6 space-y-4 contact-form" aria-describedby="contact-legal">
                      {/* Honeypot field (hidden from users) */}
                      <input
                        type="text"
                        id="hp"
                        name="hp"
                        autoComplete="off"
                        tabIndex={-1}
                        aria-hidden="true"
                        className="hidden"
                      />
                      <div>
                        <label htmlFor="ct-name" className="block text-xs text-neutral-600">Your name<span className="text-neutral-400"> *</span></label>
                        <input
                          id="ct-name"
                          name="name"
                          type="text"
                          required
                          value={name}
                          onChange={(e) => setName(e.target.value)}
                          placeholder="Jane Doe"
                          className="mt-1 w-full pl-3 pr-3 py-2.5 text-sm rounded-xl ring-1 ring-black/10 focus:ring-2 focus:ring-neutral-900 outline-none bg-white placeholder:text-neutral-400"
                        />
                      </div>
                      <div>
                        <label htmlFor="ct-email" className="block text-xs text-neutral-600">Email<span className="text-neutral-400"> *</span></label>
                        <div className="relative mt-1">
                          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-4 w-4 text-neutral-400 absolute left-3 top-1/2 -translate-y-1/2" aria-hidden="true">
                            <path d="m22 7-8.991 5.727a2 2 0 0 1-2.009 0L2 7"></path>
                          <rect x="2" y="4" width="20" height="16" rx="2"></rect>
                          </svg>
                          <input
                            id="ct-email"
                            name="email"
                            type="email"
                            required
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            placeholder="you@example.com"
                            className="w-full pl-9 pr-3 py-2.5 text-sm rounded-xl ring-1 ring-black/10 focus:ring-2 focus:ring-neutral-900 outline-none bg-white placeholder:text-neutral-400"
                          />
                        </div>
                      </div>
                      <div>
                        <label htmlFor="ct-msg" className="block text-xs text-neutral-600">Message</label>
                        <textarea
                          id="ct-msg"
                          rows={4}
                          name="message"
                          required
                          value={message}
                          onChange={(e) => setMessage(e.target.value)}
                          placeholder="How can we help?"
                          className="mt-1 w-full resize-y pl-3 pr-3 py-2.5 text-sm rounded-xl ring-1 ring-black/10 focus:ring-2 focus:ring-neutral-900 outline-none bg-white placeholder:text-neutral-400"
                        ></textarea>
                      </div>
                      <button
                        type="submit"
                        disabled={loading}
                        aria-disabled={loading}
                        className={`w-full inline-flex items-center justify-center rounded-xl px-4 py-3 text-sm font-semibold transition-colors ${loading ? "bg-neutral-700 text-white cursor-not-allowed opacity-70" : "bg-neutral-900 text-white hover:bg-neutral-800"}`}
                        aria-label="Send message"
                      >
                        {loading ? (
                          <>
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-4 w-4 mr-2 animate-spin" aria-hidden="true">
                              <circle cx="12" cy="12" r="10" className="opacity-25"></circle>
                              <path d="M12 2a10 10 0 0 1 10 10" className="opacity-75"></path>
                            </svg>
                            Sending...
                          </>
                        ) : (
                          <>
                            Send message
                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-4 w-4 ml-2" aria-hidden="true">
                              <path d="M5 12h14"></path>
                              <path d="m12 5 7 7-7 7"></path>
                            </svg>
                          </>
                        )}
                      </button>
                      <p id="contact-legal" className="text-[11px] text-neutral-500">By submitting, you agree to our Terms and Privacy Policy.</p>
                    </form>
                  </div>
                </div>

                {/* Copy + highlights */}
                <div className="lg:col-span-7">
                  <h2 className="text-4xl sm:text-5xl lg:text-6xl leading-[1.05] font-semibold text-white tracking-tight">Let's talk.</h2>
                  <p className="text-base sm:text-lg max-w-2xl text-white/80 mt-4">
                    Tell us about your travel needs—support, partnerships, or bulk bookings. We reply within one business day.
                  </p>

                  <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 gap-6">
                    <div className="flex items-start gap-3">
                      <div className="h-9 w-9 rounded-lg bg-white/10 backdrop-blur ring-1 ring-white/15 flex items-center justify-center text-white/90" aria-hidden="true">
                        {/* clock-3 icon */}
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-4 w-4">
                          <path d="M12 6v6h4"></path>
                          <circle cx="12" cy="12" r="10"></circle>
                        </svg>
                      </div>
                      <div>
                        <p className="text-white font-semibold text-sm">Quick response</p>
                        <p className="text-white/70 text-xs">Most messages receive a reply in under 24h.</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <div className="h-9 w-9 rounded-lg bg-white/10 backdrop-blur ring-1 ring-white/15 flex items-center justify-center text-white/90" aria-hidden="true">
                        {/* route icon */}
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-4 w-4">
                          <circle cx="6" cy="19" r="3"></circle>
                          <path d="M9 19h8.5a3.5 3.5 0 0 0 0-7h-11a3.5 3.5 0 0 1 0-7H15"></path>
                          <circle cx="18" cy="5" r="3"></circle>
                        </svg>
                      </div>
                      <div>
                        <p className="text-white font-semibold text-sm">Clear next steps</p>
                        <p className="text-white/70 text-xs">We'll follow up with a concise plan and timeline.</p>
                      </div>
                    </div>
                  </div>

                  {/* Quick submit card: click to submit the form */}
                  <div className="mt-8">
                    <div
                      className={`inline-flex gap-3 ring-1 ring-white/20 bg-white/95 rounded-2xl px-3 py-3 shadow-lg backdrop-blur items-center select-none ${loading ? "opacity-60 cursor-not-allowed" : "cursor-pointer"}`}
                      role="button"
                      tabIndex={0}
                      aria-label="Submit your inquiry"
                      aria-disabled={loading}
                      onClick={() => {
                        if (loading) return;
                        formRef.current?.requestSubmit();
                      }}
                      onKeyDown={(e) => {
                        if (loading) return;
                        if (e.key === 'Enter' || e.key === ' ') {
                          e.preventDefault();
                          formRef.current?.requestSubmit();
                        }
                      }}
                    >
                      <div className="h-12 w-12 rounded-xl bg-neutral-900 text-white flex items-center justify-center" aria-hidden="true">
                        {/* send icon */}
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-5 w-5">
                          <path d="M5 12h14"></path>
                          <path d="m12 5 7 7-7 7"></path>
                        </svg>
                      </div>
                      <div className="min-w-0">
                        <p className="text-neutral-900 font-semibold tracking-tight truncate">Submit inquiry</p>
                        <p className="text-[11px] text-neutral-500 leading-none">Click to send using the form</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
    </>
  );
};

export default Contact;