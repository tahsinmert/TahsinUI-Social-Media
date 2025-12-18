'use client'

import { motion } from 'framer-motion'
import { Instagram, Twitter, Linkedin } from 'lucide-react'

export default function Footer() {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="bg-white border-t border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
          {/* Logo Column - Large */}
          <div className="md:col-span-2">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <h2 className="text-4xl font-serif font-bold text-[#15803D] mb-4">TahsinUI</h2>
              <p className="text-slate-600 max-w-md leading-relaxed font-medium">
                A sophisticated platform for editorial content, where design meets storytelling.
                Discover curated stories, insights, and inspiration.
              </p>
            </motion.div>
          </div>

          {/* Quick Links */}
          <div>
            <motion.h3
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="text-sm font-semibold text-slate-900 uppercase tracking-wider mb-4"
            >
              Quick Links
            </motion.h3>
            <motion.ul
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="space-y-3"
            >
              <li>
                <a
                  href="#home"
                  className="text-slate-600 hover:text-emerald-600 transition-colors duration-200 font-medium"
                >
                  Home
                </a>
              </li>
              <li>
                <a
                  href="#stories"
                  className="text-slate-600 hover:text-emerald-600 transition-colors duration-200 font-medium"
                >
                  Stories
                </a>
              </li>
              <li>
                <a
                  href="#about"
                  className="text-slate-600 hover:text-emerald-600 transition-colors duration-200 font-medium"
                >
                  About
                </a>
              </li>
              <li>
                <a
                  href="#newsletter"
                  className="text-slate-600 hover:text-emerald-600 transition-colors duration-200 font-medium"
                >
                  Newsletter
                </a>
              </li>
            </motion.ul>
          </div>

          {/* Follow Us */}
          <div>
            <motion.h3
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="text-sm font-semibold text-slate-900 uppercase tracking-wider mb-4"
            >
              Follow Us
            </motion.h3>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="flex items-center gap-4"
            >
              <motion.a
                href="#"
                whileHover={{ scale: 1.1, y: -2 }}
                whileTap={{ scale: 0.95 }}
                className="p-2 text-slate-600 hover:text-emerald-600 transition-colors duration-200"
                aria-label="Instagram"
              >
                <Instagram className="h-5 w-5" />
              </motion.a>
              <motion.a
                href="#"
                whileHover={{ scale: 1.1, y: -2 }}
                whileTap={{ scale: 0.95 }}
                className="p-2 text-slate-600 hover:text-emerald-600 transition-colors duration-200"
                aria-label="Twitter"
              >
                <Twitter className="h-5 w-5" />
              </motion.a>
              <motion.a
                href="#"
                whileHover={{ scale: 1.1, y: -2 }}
                whileTap={{ scale: 0.95 }}
                className="p-2 text-slate-600 hover:text-emerald-600 transition-colors duration-200"
                aria-label="LinkedIn"
              >
                <Linkedin className="h-5 w-5" />
              </motion.a>
            </motion.div>
          </div>
        </div>

        {/* Bottom Bar */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="pt-8 border-t border-slate-200 flex flex-col md:flex-row justify-between items-center gap-4"
        >
          <p className="text-sm text-slate-600 font-medium">
            © {currentYear} TahsinUI. All rights reserved.
          </p>
          <div className="flex items-center gap-6 text-sm text-slate-600 font-medium">
            <a href="#" className="hover:text-emerald-600 transition-colors duration-200">
              Privacy Policy
            </a>
            <a href="#" className="hover:text-emerald-600 transition-colors duration-200">
              Terms of Service
            </a>
          </div>
        </motion.div>
      </div>
    </footer>
  )
}

