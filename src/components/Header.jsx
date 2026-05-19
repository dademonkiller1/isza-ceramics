import { motion } from 'framer-motion'
import { Link, NavLink } from 'react-router-dom'

export default function Header({ menuOpen, onToggle }) {
  const linkClass = ({ isActive }) =>
    `text-[11px] font-medium tracking-[0.2em] uppercase transition-colors ${
      isActive ? 'text-white' : 'text-white/70 hover:text-white'
    }`

  return (
    <motion.header
      initial={{ y: -24, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: 'easeOut' }}
      className="fixed inset-x-0 top-0 z-50 mix-blend-difference"
    >
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-6 sm:px-8 lg:px-12">
        <Link to="/">
          <motion.span
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3, duration: 0.6 }}
            className="font-heading text-lg font-bold tracking-[0.15em] text-white uppercase"
          >
            ISZA
          </motion.span>
        </Link>

        <nav className="hidden items-center gap-10 md:flex">
          <NavLink to="/" className={linkClass} end>
            Home
          </NavLink>
          <NavLink to="/collection" className={linkClass}>
            Collection
          </NavLink>
          <NavLink to="/about" className={linkClass}>
            Journal
          </NavLink>
        </nav>

        <motion.button
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          onClick={onToggle}
          className="relative z-50 flex h-6 w-6 flex-col items-center justify-center gap-1.5 md:hidden"
          aria-label="Toggle menu"
        >
          <motion.span
            animate={menuOpen ? { rotate: 45, y: 4.5 } : { rotate: 0, y: 0 }}
            className="block h-[1.5px] w-5 origin-center bg-white"
          />
          <motion.span
            animate={menuOpen ? { opacity: 0 } : { opacity: 1 }}
            className="block h-[1.5px] w-5 bg-white"
          />
          <motion.span
            animate={menuOpen ? { rotate: -45, y: -4.5 } : { rotate: 0, y: 0 }}
            className="block h-[1.5px] w-5 origin-center bg-white"
          />
        </motion.button>
      </div>
    </motion.header>
  )
}
