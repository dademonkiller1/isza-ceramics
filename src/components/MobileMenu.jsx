import { motion, AnimatePresence } from 'framer-motion'
import { Link } from 'react-router-dom'

const links = [
  { label: 'Home', to: '/' },
  { label: 'Collection', to: '/collection' },
  { label: 'Journal', to: '/about' },
  { label: 'Atelier', to: '/collection' },
]

export default function MobileMenu({ open, onClose }) {
  return (
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-40 flex flex-col items-center justify-center bg-navy-900"
        >
          <nav className="flex flex-col items-center gap-10">
            {links.map((link, i) => (
              <motion.div
                key={link.label}
                initial={{ opacity: 0, y: 24 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 16 }}
                transition={{ delay: 0.1 + i * 0.08 }}
              >
                <Link
                  to={link.to}
                  onClick={onClose}
                  className="font-heading text-3xl font-light tracking-wide text-white/80 transition-colors hover:text-white sm:text-4xl"
                >
                  {link.label}
                </Link>
              </motion.div>
            ))}
          </nav>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ delay: 0.5 }}
            className="absolute bottom-12 text-[10px] tracking-[0.2em] text-white/30 uppercase"
          >
            Fine ceramics since 2025
          </motion.p>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
