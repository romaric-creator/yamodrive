import { motion } from 'framer-motion'

function App() {
  return (
    <div className="min-h-screen bg-gray-900 flex items-center justify-center">
      <motion.h1
        className="text-4xl font-bold text-white"
        initial={{ opacity: 0, y: -30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        Yamodrive 🚗
      </motion.h1>
    </div>
  )
}

export default App
