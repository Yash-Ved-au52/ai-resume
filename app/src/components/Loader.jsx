import { Box, Spinner, VStack, Text, useBreakpointValue } from '@chakra-ui/react'

const Loader = ({ message = "Loading..." }) => {
  const spinnerSize = useBreakpointValue({ base: "lg", md: "xl" })
  
  return (
    <Box 
      p={{ base: 6, md: 8 }} 
      bg="white" 
      borderRadius="md" 
      boxShadow="md" 
      textAlign="center"
      display="flex"
      alignItems="center"
      justifyContent="center"
      minH="200px"
    >
      <VStack spacing={4}>
        <Spinner
          thickness="4px"
          speed="0.65s"
          emptyColor="gray.200"
          color="blue.500"
          size={spinnerSize}
        />
        <Text color="gray.600" fontSize={{ base: "sm", md: "md" }}>{message}</Text>
      </VStack>
    </Box>
  )
}

export default Loader