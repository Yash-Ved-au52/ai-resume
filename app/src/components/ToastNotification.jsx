import { Alert, AlertIcon, AlertTitle, Box, useBreakpointValue } from '@chakra-ui/react'

const ToastNotification = ({ message, type = 'error' }) => {
  const position = useBreakpointValue({ 
    base: { bottom: "4", left: "4", right: "4" },
    md: { bottom: "4", right: "4" }
  })
  
  return (
    <Box position="fixed" zIndex="1000" {...position}>
      <Alert status={type} variant="solid" borderRadius="md">
        <AlertIcon />
        <AlertTitle mr={2} fontSize={{ base: "sm", md: "md" }}>{message}</AlertTitle>
      </Alert>
    </Box>
  )
}

export default ToastNotification