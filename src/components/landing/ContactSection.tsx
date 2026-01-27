import { motion } from "framer-motion";
import { useState } from "react";
import { Mail, Clock, Sparkles } from "lucide-react";

const ContactSection = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    inquiryType: "",
    message: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle form submission
    console.log(formData);
  };

  return (
    <section className="relative py-32 lg:py-48 overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0">
        <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-border to-transparent" />

        {/* Large ambient glow */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[1000px] h-[800px] bg-primary/5 rounded-full blur-3xl" />

        {/* Grid background */}
        <div className="absolute inset-0 bg-grid opacity-20" />
      </div>

      <div className="relative container mx-auto px-4">
        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-20"
        >
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
            <span className="text-foreground">Let's Build Something</span>
            <br />
            <span className="text-gradient-primary">Amazing Together</span>
          </h2>

          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Have a project in mind? I'd love to hear from you. Drop me a message and
            I'll get back to you within 24 hours.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-5 gap-12 lg:gap-16 max-w-6xl mx-auto">
          {/* Contact form */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="lg:col-span-3"
          >
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid md:grid-cols-2 gap-6">
                {/* Name field */}
                <div>
                  <label className="block text-sm font-medium text-foreground mb-2">
                    Name <span className="text-primary">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) =>
                      setFormData({ ...formData, name: e.target.value })
                    }
                    className="w-full px-4 py-3 rounded-xl bg-secondary/50 border border-border focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-all text-foreground placeholder:text-muted-foreground"
                    placeholder="Your name"
                  />
                </div>

                {/* Email field */}
                <div>
                  <label className="block text-sm font-medium text-foreground mb-2">
                    Email <span className="text-primary">*</span>
                  </label>
                  <input
                    type="email"
                    required
                    value={formData.email}
                    onChange={(e) =>
                      setFormData({ ...formData, email: e.target.value })
                    }
                    className="w-full px-4 py-3 rounded-xl bg-secondary/50 border border-border focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-all text-foreground placeholder:text-muted-foreground"
                    placeholder="your@email.com"
                  />
                </div>
              </div>

              {/* Inquiry type */}
              <div>
                <label className="block text-sm font-medium text-foreground mb-2">
                  Inquiry Type
                </label>
                <select
                  value={formData.inquiryType}
                  onChange={(e) =>
                    setFormData({ ...formData, inquiryType: e.target.value })
                  }
                  className="w-full px-4 py-3 rounded-xl bg-secondary/50 border border-border focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-all text-foreground"
                >
                  <option value="">Select an option</option>
                  <option value="consultation">Consultation</option>
                  <option value="collaboration">Project Collaboration</option>
                  <option value="general">General Inquiry</option>
                </select>
              </div>

              {/* Message field */}
              <div>
                <label className="block text-sm font-medium text-foreground mb-2">
                  Message <span className="text-primary">*</span>
                </label>
                <textarea
                  required
                  value={formData.message}
                  onChange={(e) =>
                    setFormData({ ...formData, message: e.target.value })
                  }
                  rows={5}
                  className="w-full px-4 py-3 rounded-xl bg-secondary/50 border border-border focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-all text-foreground placeholder:text-muted-foreground resize-none"
                  placeholder="Tell me about your project..."
                />
              </div>

              {/* Submit button */}
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                type="submit"
                className="group relative w-full px-8 py-4 rounded-xl font-semibold text-primary-foreground overflow-hidden"
              >
                {/* Animated gradient background */}
                <motion.div
                  className="absolute inset-0 bg-gradient-to-r from-primary via-primary/80 to-primary"
                  animate={{
                    backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"],
                  }}
                  transition={{ duration: 5, repeat: Infinity, ease: "linear" }}
                  style={{ backgroundSize: "200% 100%" }}
                />
                <div className="absolute inset-0 glow-primary opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                <span className="relative z-10 flex items-center justify-center gap-2">
                  Send Message
                  <motion.span
                    animate={{ x: [0, 4, 0] }}
                    transition={{ duration: 1.5, repeat: Infinity }}
                  >
                    →
                  </motion.span>
                </span>
              </motion.button>
            </form>
          </motion.div>

          {/* Contact info */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="lg:col-span-2 space-y-8"
          >
            <div className="p-6 rounded-2xl glass">
              <h3 className="text-xl font-bold text-foreground mb-6">Get in Touch</h3>

              {/* Email */}
              <div className="flex items-start gap-4 mb-6">
                <div className="p-3 rounded-xl bg-primary/10">
                  <Mail className="w-5 h-5 text-primary" />
                </div>
                <div>
                  <h4 className="font-medium text-foreground">Direct Email</h4>
                  <a
                    href="mailto:your@email.com"
                    className="text-muted-foreground hover:text-primary transition-colors"
                  >
                    your@email.com
                  </a>
                </div>
              </div>

              {/* Response time */}
              <div className="flex items-start gap-4 mb-6">
                <div className="p-3 rounded-xl bg-accent/10">
                  <Clock className="w-5 h-5 text-accent" />
                </div>
                <div>
                  <h4 className="font-medium text-foreground">Response Time</h4>
                  <p className="text-muted-foreground">
                    Usually within 24 hours during business days
                  </p>
                </div>
              </div>

              {/* Available for */}
              <div className="flex items-start gap-4">
                <div className="p-3 rounded-xl bg-primary/10">
                  <Sparkles className="w-5 h-5 text-primary" />
                </div>
                <div>
                  <h4 className="font-medium text-foreground mb-2">Available For</h4>
                  <ul className="space-y-1 text-sm text-muted-foreground">
                    <li>• AI/ML consulting and strategy</li>
                    <li>• LLM application development</li>
                    <li>• Full-stack AI integrations</li>
                    <li>• Technical workshops and talks</li>
                  </ul>
                </div>
              </div>
            </div>

            {/* Social connect hint */}
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.5 }}
              className="p-6 rounded-2xl border-gradient"
            >
              <h4 className="font-medium text-foreground mb-2">Connect on Social</h4>
              <p className="text-sm text-muted-foreground">
                Follow me on social media for AI insights, project updates, and industry
                trends.
              </p>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;
