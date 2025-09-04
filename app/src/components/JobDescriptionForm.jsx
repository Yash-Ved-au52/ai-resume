import { useState } from 'react'
import { 
  Box, 
  Button, 
  FormControl, 
  FormLabel, 
  Input, 
  Textarea,
  VStack,
  Text 
} from '@chakra-ui/react'
import { AttachmentIcon } from '@chakra-ui/icons'

const JobDescriptionForm = ({ onGenerate, isLoading }) => {
  const [jobDescription, setJobDescription] = useState('')
  const [selectedFile, setSelectedFile] = useState(null)

  const handleFileChange = (e) => {
    setSelectedFile(e.target.files[0])
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    if (!jobDescription || !selectedFile) return
    
    const formData = new FormData()
    formData.append('jobDescription', jobDescription)
    formData.append('resume', selectedFile)
    onGenerate(formData)
  }

  return (
    <Box 
      as="form" 
      onSubmit={handleSubmit} 
      p={6} 
      bg="white" 
      borderRadius="md" 
      boxShadow="md"
    >
      <VStack spacing={4}>
        <FormControl isRequired>
          <FormLabel>Job Description</FormLabel>
          <Textarea
            value={jobDescription}
            onChange={(e) => setJobDescription(e.target.value)}
            placeholder="Paste the job description here..."
            minH="200px"
          />
        </FormControl>
        
        <FormControl isRequired>
          <FormLabel>Upload your resume (PDF)</FormLabel>
          <Input
            type="file"
            accept=".pdf"
            onChange={handleFileChange}
            p={1}
          />
        </FormControl>
        
        {selectedFile && (
          <Text fontSize="sm" color="gray.600">
            Selected: {selectedFile.name}
          </Text>
        )}
        
        <Button
          type="submit"
          colorScheme="green"
          isLoading={isLoading}
          loadingText="Generating"
          isDisabled={!jobDescription || !selectedFile}
          leftIcon={<AttachmentIcon />}
          w="100%"
        >
          Generate Cover Letter
        </Button>
        
        <Text fontSize="sm" color="gray.500" textAlign="center">
          Our AI will generate a tailored cover letter based on your resume and the job description
        </Text>
      </VStack>
    </Box>
  )
}

export default JobDescriptionForm