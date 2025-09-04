// App.jsx
import { ChakraProvider, Box } from '@chakra-ui/react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Navbar from './components/Navbar'
import Home from './pages/Home'
import ResumeAnalysis from './pages/ResumeAnalysis'
import CoverLetterGenerator from './pages/CoverLetterGenerator'

function App() {
  return (
    <ChakraProvider>
      <Router>
        <Box minH="100vh" bg="gray.50">
          <Navbar />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/analyze" element={<ResumeAnalysis />} />
            <Route path="/cover-letter" element={<CoverLetterGenerator />} />
          </Routes>
        </Box>
      </Router>
    </ChakraProvider>
  )
}

export default App