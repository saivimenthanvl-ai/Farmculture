import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Mail, Phone, MapPin, Send, CheckCircle, AlertCircle, LogIn, Lock, Info, ShieldCheck } from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";
import { useLanguage } from "@/contexts/LanguageContext";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";
import { db } from "@/lib/firebase";
import SEOHead from "@/components/SEOHead";

export const ContactUsPage: React.FC = () => {
  const { user } = useAuth();
  const { t } = useLanguage();
  const navigate = useNavigate();

  const [subject, setSubject] = useState("");
  const [category, setCategory] = useState("Technical Support");
  const [message, setMessage] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [ticketId, setTicketId] = useState<string | null>(null);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) {
      navigate("/auth/login?returnTo=/contact");
      return;
    }

    setSubmitting(true);
    setError(null);

    // Validate inputs
    const trimmedSubject = subject.trim();
    const trimmedMessage = message.trim();

    if (trimmedSubject.length < 3) {
      setError("Subject must be at least 3 characters.");
      setSubmitting(false);
      return;
    }

    if (trimmedMessage.length < 10) {
      setError("Message must be at least 10 characters.");
      setSubmitting(false);
      return;
    }

    try {
      // Record contact request in Firestore under authenticated UID
      const docRef = await addDoc(collection(db, "support_requests"), {
        userId: user.uid,
        userEmail: user.email,
        displayName: user.displayName || "Farmer",
        category,
        subject: trimmedSubject,
        message: trimmedMessage,
        status: "open",
        createdAt: serverTimestamp(),
      });

      setTicketId(docRef.id);
      setSubmitted(true);
      setSubject("");
      setMessage("");
    } catch (err: any) {
      console.error("[ContactUs] Ticket submission failure:", err);
      setError(err?.message || "Failed to submit support request. Please verify network or authentication status.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-6 md:p-8 bg-white rounded-2xl shadow-lg space-y-8 text-gray-800">
      <SEOHead
        title="Contact Technical Support & Agronomic Inquiries"
        description="Submit support tickets, report mandi quote discrepancies, request data erasure assistance, or contact Farmculture AI engineers."
        canonicalPath="/contact"
      />
      <div>
        <h1 className="text-3xl font-extrabold text-gray-900">
          {t("footerNav.contactUs") || "Contact & Support"}
        </h1>
        <p className="text-sm text-gray-600 mt-2 leading-relaxed">
          {t("contact.subtitle") ||
            "Reach out to the Farmculture AI team for technical support, market rate corrections, feedback, or statutory privacy inquiries."}
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Contact Info Cards */}
        <div className="space-y-4 md:col-span-1">
          <div className="p-4 bg-emerald-50 rounded-xl border border-emerald-100 space-y-2">
            <Mail className="w-5 h-5 text-emerald-600" />
            <h3 className="font-bold text-sm text-gray-800">Direct Support Email</h3>
            <p className="text-xs text-gray-600 font-mono">support@farmculture.ai</p>
            <p className="text-[11px] text-gray-500">
              Inquiries reviewed within standard business hours.
            </p>
          </div>

          <div className="p-4 bg-blue-50 rounded-xl border border-blue-100 space-y-2">
            <Phone className="w-5 h-5 text-blue-600" />
            <h3 className="font-bold text-sm text-gray-800">Public Agronomic Helpline</h3>
            <p className="text-xs text-gray-600">Kisan Call Centre (Toll Free): 1800-180-1551</p>
            <p className="text-[11px] text-gray-500">
              Government of India agricultural extension service (independent reference).
            </p>
          </div>

          <div className="p-4 bg-gray-50 rounded-xl border border-gray-200 space-y-2">
            <MapPin className="w-5 h-5 text-gray-600" />
            <h3 className="font-bold text-sm text-gray-800">Development Hubs</h3>
            <p className="text-xs text-gray-600">Bangalore &amp; New Delhi, India</p>
            <p className="text-[11px] text-gray-500">Open-source software initiative</p>
          </div>

          {/* Privacy Desk Note */}
          <div className="p-4 bg-purple-50 rounded-xl border border-purple-100 space-y-2">
            <ShieldCheck className="w-5 h-5 text-purple-600" />
            <h3 className="font-bold text-sm text-gray-800">Public Privacy Desk</h3>
            <p className="text-xs text-gray-600 leading-relaxed">
              For privacy, data access, or account deletion inquiries without signing in, email our privacy desk directly at{" "}
              <a href="mailto:support@farmculture.ai?subject=Privacy%20Inquiry" className="font-bold text-purple-700 underline">
                support@farmculture.ai
              </a>
              .
            </p>
          </div>
        </div>

        {/* Message Form / Authentication Gate */}
        <div className="md:col-span-2 bg-gray-50 p-6 rounded-xl border border-gray-200">
          <h2 className="text-lg font-bold text-gray-800 mb-4 flex items-center gap-2">
            <Send className="w-4 h-4 text-emerald-600" />
            Submit an Inquiry
          </h2>

          {submitted ? (
            <div className="p-6 bg-emerald-50 border border-emerald-200 rounded-xl text-center space-y-3">
              <CheckCircle className="w-10 h-10 text-emerald-600 mx-auto" />
              <h3 className="text-base font-bold text-emerald-900">Inquiry Received</h3>
              <p className="text-xs text-emerald-800 leading-relaxed max-w-sm mx-auto">
                Your ticket has been recorded with reference number:
              </p>
              <div className="inline-block px-3 py-1 bg-white border border-emerald-300 rounded font-mono text-xs font-bold text-emerald-900">
                #{ticketId}
              </div>
              <p className="text-xs text-gray-600 leading-relaxed max-w-sm mx-auto mt-2">
                Our support team will inspect your request and reply to your registered account email.
              </p>
              <button
                onClick={() => {
                  setSubmitted(false);
                  setTicketId(null);
                }}
                className="mt-3 text-xs font-semibold text-emerald-800 underline block mx-auto"
              >
                Submit Another Inquiry
              </button>
            </div>
          ) : user ? (
            /* Authenticated Form */
            <form onSubmit={handleSubmit} className="space-y-4">
              {error && (
                <div className="p-3 bg-red-50 border border-red-200 text-red-700 rounded-lg text-xs flex items-center gap-2">
                  <AlertCircle className="w-4 h-4 text-red-600 shrink-0" />
                  <span>{error}</span>
                </div>
              )}
              <div className="p-3 bg-white rounded-lg border border-gray-200 flex items-center justify-between text-xs text-gray-600">
                <span>
                  Sending as: <strong>{user.displayName || user.email}</strong>
                </span>
                <span className="px-2 py-0.5 rounded-full text-[10px] font-semibold bg-emerald-100 text-emerald-800">
                  Authenticated User
                </span>
              </div>

              <div>
                <label className="block text-xs font-semibold text-gray-700 mb-1">
                  Inquiry Category
                </label>
                <select
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg text-xs bg-white focus:outline-none focus:ring-2 focus:ring-emerald-500"
                >
                  <option>Technical Support</option>
                  <option>Mandi Market Price Inaccuracy Report</option>
                  <option>Crop Diagnosis Feedback</option>
                  <option>Data Partnership &amp; Research</option>
                  <option>Account Deletion Request</option>
                  <option>Privacy &amp; Data Rights Request</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-semibold text-gray-700 mb-1">
                  Subject Line
                </label>
                <input
                  type="text"
                  required
                  placeholder="Summary of your inquiry..."
                  value={subject}
                  onChange={(e) => setSubject(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg text-xs focus:outline-none focus:ring-2 focus:ring-emerald-500"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-gray-700 mb-1">
                  Detailed Message
                </label>
                <textarea
                  required
                  rows={4}
                  placeholder="Describe your inquiry, affected crop, or observation in detail..."
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg text-xs focus:outline-none focus:ring-2 focus:ring-emerald-500"
                />
              </div>

              <button
                type="submit"
                disabled={submitting}
                className="w-full py-2.5 px-4 bg-emerald-600 hover:bg-emerald-700 disabled:bg-gray-400 text-white font-semibold text-xs rounded-lg transition-colors flex items-center justify-center gap-2"
              >
                {submitting ? "Submitting Ticket..." : "Submit Support Ticket"}
              </button>
            </form>
          ) : (
            /* Guest State */
            <div className="text-center py-8 space-y-4">
              <div className="w-12 h-12 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center mx-auto">
                <Lock className="w-6 h-6" />
              </div>
              <h3 className="text-base font-bold text-gray-800">
                Sign In to Send an Authenticated Support Ticket
              </h3>
              <p className="text-xs text-gray-600 max-w-sm mx-auto leading-relaxed">
                Signing in ensures your inquiry is linked to your account and that ticket status updates reach you securely.
              </p>
              <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-2">
                <Link
                  to="/auth/login?returnTo=/contact"
                  className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg bg-emerald-600 text-white text-xs font-semibold hover:bg-emerald-700 transition-colors shadow-sm"
                >
                  <LogIn className="w-4 h-4" />
                  Sign In to Continue
                </Link>
                <a
                  href="mailto:support@farmculture.ai"
                  className="inline-flex items-center gap-2 px-4 py-2.5 rounded-lg border border-gray-300 text-gray-700 text-xs font-semibold hover:bg-gray-100 transition-colors"
                >
                  <Mail className="w-4 h-4" />
                  Email Support Directly
                </a>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ContactUsPage;
