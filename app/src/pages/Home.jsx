import { Box, Container, Heading, Text, VStack, Button, SimpleGrid, useBreakpointValue } from '@chakra-ui/react'
import { Link } from 'react-router-dom'
// import { CheckCircleIcon } from '@chakra-ui/icons'

const Home = () => {
  const buttonSize = useBreakpointValue({ base: "md", md: "lg" })
  
  return (
    <Container maxW="container.lg" py={{ base: 6, md: 10 }}>
      <VStack spacing={8} textAlign="center">
        <Heading as="h1" size={{ base: "xl", md: "2xl" }} color="blue.600" pt={{ base: 2, md: 0 }}>
          Welcome to AI Resume Analyzer
        </Heading>
        
        <Text fontSize={{ base: "lg", md: "xl" }} color="gray.600" px={{ base: 2, md: 0 }}>
          Enhance your job application with our AI-powered resume analysis and cover letter generation
        </Text>
        
        <SimpleGrid columns={{ base: 1, md: 2 }} spacing={6} width="100%" mt={4}>
          <Button 
            as={Link} 
            to="/analyze" 
            colorScheme="blue" 
            size={buttonSize}
            height={{ base: "50px", md: "60px" }}
            fontSize={{ base: "md", md: "lg" }}
          >
            Upload Resume for ATS Analysis
          </Button>
          <Button 
            as={Link} 
            to="/cover-letter" 
            colorScheme="green" 
            size={buttonSize}
            height={{ base: "50px", md: "60px" }}
            fontSize={{ base: "md", md: "lg" }}
          >
            Generate Cover Letter
          </Button>
        </SimpleGrid>
        
        <Box pt={8} width="100%">
          <Text fontWeight="bold" fontSize={{ base: "lg", md: "xl" }} mb={4}>How it works:</Text>
          <SimpleGrid columns={{ base: 1, md: 3 }} spacing={6} width="100%">
            <VStack bg="white" p={4} borderRadius="md" boxShadow="base" spacing={3}>
              <Box color="blue.500" fontSize="2xl">1</Box>
              <Text fontWeight="medium">Upload your resume</Text>
              <Text fontSize="sm" textAlign="center">Submit your resume for ATS compatibility analysis</Text>
            </VStack>
            <VStack bg="white" p={4} borderRadius="md" boxShadow="base" spacing={3}>
              <Box color="blue.500" fontSize="2xl">2</Box>
              <Text fontWeight="medium">Get AI feedback</Text>
              <Text fontSize="sm" textAlign="center">Receive a score and improvement suggestions</Text>
            </VStack>
            <VStack bg="white" p={4} borderRadius="md" boxShadow="base" spacing={3}>
              <Box color="blue.500" fontSize="2xl">3</Box>
              <Text fontWeight="medium">Generate cover letter</Text>
              <Text fontSize="sm" textAlign="center">Create tailored cover letters for specific jobs</Text>
            </VStack>
          </SimpleGrid>
        </Box>
      </VStack>
    </Container>
  )
}

export default Home