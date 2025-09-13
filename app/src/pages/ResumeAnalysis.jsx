import { useState } from 'react'
import { Container, Heading, Box } from '@chakra-ui/react'
import ResumeUploadForm from '../components/ResumeUploadForm'
import AnalysisResultCard from '../components/AnalysisResultCard'
import Loader from '../components/Loader'
import ToastNotification from '../components/ToastNotification'

const ResumeAnalysis = () => {
  const [analysisResult, setAnalysisResult] = useState(null)
  const [isLoading, setIsLoading] = useState(false)
  const [toast, setToast] = useState({ show: false, message: '', type: '' })

  const showToast = (message, type = 'error') => {
    setToast({ show: true, message, type })
    setTimeout(() => setToast({ show: false, message: '', type: '' }), 3000)
  }

  const handleAnalysis = async (formData) => {
    setIsLoading(true)
    try {
      const response = await fetch('http://localhost:5000/api/analyze-resume', {
        method: 'POST',
        body: formData,
      })
      
      if (!response.ok) {
        throw new Error('Analysis failed')
      }
      
      const data = await response.json()
      setAnalysisResult(data)
      showToast('Analysis completed successfully!', 'success')
    } catch (error) {
      console.error('Error analyzing resume:', error)
      showToast('Failed to analyze resume. Please try again.')
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <Container maxW="container.lg" py={8}>
      <Heading as="h2" size="xl" mb={6} textAlign="center">
        Resume ATS Analysis
      </Heading>
      
      <Box 
        display="flex" 
        flexDirection={{ base: 'column', md: 'row' }} 
        gap={8}
        alignItems="flex-start"
      >
        <Box flex={{ md: 1 }} w="100%">
          <ResumeUploadForm onAnalysis={handleAnalysis} isLoading={isLoading} />
        </Box>
        
        <Box flex={{ md: 1 }} w="100%">
          {isLoading ? (
            <Loader message="Analyzing your resume..." />
          ) : analysisResult ? (
            <AnalysisResultCard result={analysisResult} />
          ) : (
            <Box p={6} bg="white" borderRadius="md" boxShadow="md" textAlign="center">
              Upload your resume to see the analysis results
            </Box>
          )}
        </Box>
      </Box>
      
      {toast.show && (
        <ToastNotification message={toast.message} type={toast.type} />
      )}
    </Container>
  )
}

export default ResumeAnalysis