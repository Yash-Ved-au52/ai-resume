import { useState } from 'react'
import { 
  Box, 
  VStack, 
  Textarea, 
  Button, 
  Heading, 
  HStack,
  useToast,
  Text as ChakraText
} from '@chakra-ui/react'
import { CopyIcon, DownloadIcon } from '@chakra-ui/icons'

const CoverLetterCard = ({ coverLetter }) => {
  const [isCopied, setIsCopied] = useState(false)
  const toast = useToast()

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(coverLetter)
      setIsCopied(true)
      toast({
        title: 'Copied to clipboard',
        status: 'success',
        duration: 2000,
        isClosable: true,
      })
      setTimeout(() => setIsCopied(false), 2000)
    } catch (err) {
      console.error('Failed to copy text: ', err)
      toast({
        title: 'Failed to copy',
        status: 'error',
        duration: 2000,
        isClosable: true,
      })
    }
  }

  const handleDownload = () => {
    const element = document.createElement('a')
    const file = new Blob([coverLetter], { type: 'text/plain' })
    element.href = URL.createObjectURL(file)
    element.download = 'cover-letter.txt'
    document.body.appendChild(element)
    element.click()
    document.body.removeChild(element)
  }

  return (
    <Box p={6} bg="white" borderRadius="md" boxShadow="md">
      <VStack spacing={4} align="stretch">
        <Heading as="h3" size="lg" textAlign="center">
          Generated Cover Letter
        </Heading>
        
        <Textarea
          value={coverLetter}
          readOnly
          minH="300px"
          fontFamily="mono"
          fontSize="sm"
        />
        
        <HStack spacing={4} justify="center">
          <Button
            onClick={handleCopy}
            leftIcon={<CopyIcon />}
            colorScheme="blue"
            variant="outline"
          >
            {isCopied ? 'Copied!' : 'Copy Text'}
          </Button>
          
          <Button
            onClick={handleDownload}
            leftIcon={<DownloadIcon />}
            colorScheme="green"
            variant="outline"
          >
            Download
          </Button>
        </HStack>
        
        <ChakraText fontSize="sm" color="gray.500" textAlign="center" pt={2}>
          Review and customize the generated cover letter before sending it with your application
        </ChakraText>
      </VStack>
    </Box>
  )
}

export default CoverLetterCard
