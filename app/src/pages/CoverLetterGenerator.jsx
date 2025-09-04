import { useState } from 'react'
import { Container, Heading, Box } from '@chakra-ui/react'
import JobDescriptionForm from '../components/JobDescriptionForm'
import CoverLetterCard from '../components/CoverLetterCard'
import Loader from '../components/Loader'
import ToastNotification from '../components/ToastNotification'

const CoverLetterGenerator = () => {
  const [coverLetter, setCoverLetter] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [toast, setToast] = useState({ show: false, message: '', type: '' })

  const showToast = (message, type = 'error') => {
    setToast({ show: true, message, type })
    setTimeout(() => setToast({ show: false, message: '', type: '' }), 3000)
  }

  const generateCoverLetter = async (formData) => {
    setIsLoading(true)
    try {
      const response = await fetch('/api/cover-letter', {
        method: 'POST',
        body: formData,
      })
      
      if (!response.ok) {
        throw new Error('Cover letter generation failed')
      }
      
      const data = await response.json()
      setCoverLetter(data.coverLetter || data.text)
      showToast('Cover letter generated successfully!', 'success')
    } catch (error) {
      console.error('Error generating cover letter:', error)
      showToast('Failed to generate cover letter. Please try again.')
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <Container maxW="container.lg" py={8}>
      <Heading as="h2" size="xl" mb={6} textAlign="center">
        Cover Letter Generator
      </Heading>
      
      <Box 
        display="flex" 
        flexDirection={{ base: 'column', md: 'row' }} 
        gap={8}
        alignItems="flex-start"
      >
        <Box flex={{ md: 1 }} w="100%">
          <JobDescriptionForm onGenerate={generateCoverLetter} isLoading={isLoading} />
        </Box>
        
        <Box flex={{ md: 1 }} w="100%">
          {isLoading ? (
            <Loader message="Generating your cover letter..." />
          ) : coverLetter ? (
            <CoverLetterCard coverLetter={coverLetter} />
          ) : (
            <Box p={6} bg="white" borderRadius="md" boxShadow="md" textAlign="center">
              Enter a job description and upload your resume to generate a cover letter
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

export default CoverLetterGenerator