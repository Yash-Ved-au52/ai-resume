import { useState } from 'react'
import { 
  Box, 
  Button, 
  FormControl, 
  FormLabel, 
  Input, 
  VStack,
  Text,
  useBreakpointValue
} from '@chakra-ui/react'
import { AttachmentIcon } from '@chakra-ui/icons'

const ResumeUploadForm = ({ onAnalysis, isLoading }) => {
  const [selectedFile, setSelectedFile] = useState(null)
  const buttonSize = useBreakpointValue({ base: "md", md: "lg" })

  const handleFileChange = (e) => {
    setSelectedFile(e.target.files[0])
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    if (!selectedFile) return
    
    const formData = new FormData()
    formData.append('resume', selectedFile)
    onAnalysis(formData)
  }

  return (
    <Box 
      as="form" 
      onSubmit={handleSubmit} 
      p={{ base: 4, md: 6 }} 
      bg="white" 
      borderRadius="md" 
      boxShadow="md"
    >
      <VStack spacing={4}>
        <FormControl isRequired>
          <FormLabel fontSize={{ base: "sm", md: "md" }}>Upload your resume (PDF)</FormLabel>
          <Input
            type="file"
            accept=".pdf"
            onChange={handleFileChange}
            p={1}
            fontSize={{ base: "sm", md: "md" }}
          />
        </FormControl>
        
        {selectedFile && (
          <Text fontSize="sm" color="gray.600">
            Selected: {selectedFile.name}
          </Text>
        )}
        
        <Button
          type="submit"
          colorScheme="blue"
          isLoading={isLoading}
          loadingText="Analyzing"
          isDisabled={!selectedFile}
          leftIcon={<AttachmentIcon />}
          w="100%"
          size={buttonSize}
        >
          Analyze Resume
        </Button>
        
        <Text fontSize="sm" color="gray.500" textAlign="center">
          Our AI will analyze your resume for ATS compatibility and provide improvement suggestions
        </Text>
      </VStack>
    </Box>
  )
}

export default ResumeUploadForm