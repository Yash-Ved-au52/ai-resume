import { 
  Box, 
  VStack, 
  Progress, 
  Text, 
  Heading, 
  List, 
  ListItem, 
  ListIcon,
  Badge,
  useBreakpointValue
} from '@chakra-ui/react'
import { CheckCircleIcon, WarningIcon } from '@chakra-ui/icons'

const AnalysisResultCard = ({ result }) => {
  const { score, strengths, weaknesses, suggestions } = result
  const headingSize = useBreakpointValue({ base: "sm", md: "md" })

  const getScoreColor = (score) => {
    if (score >= 80) return 'green'
    if (score >= 60) return 'yellow'
    return 'red'
  }

  return (
    <Box p={{ base: 4, md: 6 }} bg="white" borderRadius="md" boxShadow="md">
      <VStack spacing={6} align="stretch">
        <Box textAlign="center">
          <Heading as="h3" size={{ base: "md", md: "lg" }} mb={2}>
            ATS Score
          </Heading>
          <Badge 
            colorScheme={getScoreColor(score)} 
            fontSize={{ base: "lg", md: "xl" }} 
            p={2} 
            borderRadius="md"
          >
            {score}/100
          </Badge>
          <Progress 
            value={score} 
            colorScheme={getScoreColor(score)} 
            size="lg" 
            mt={2} 
            borderRadius="full"
          />
        </Box>
        
        {strengths && strengths.length > 0 && (
          <Box>
            <Heading as="h4" size={headingSize} mb={3} color="green.600">
              Strengths
            </Heading>
            <List spacing={2}>
              {strengths.map((strength, index) => (
                <ListItem key={index} fontSize={{ base: "sm", md: "md" }}>
                  <ListIcon as={CheckCircleIcon} color="green.500" />
                  {strength}
                </ListItem>
              ))}
            </List>
          </Box>
        )}
        
        {weaknesses && weaknesses.length > 0 && (
          <Box>
            <Heading as="h4" size={headingSize} mb={3} color="red.600">
              Areas for Improvement
            </Heading>
            <List spacing={2}>
              {weaknesses.map((weakness, index) => (
                <ListItem key={index} fontSize={{ base: "sm", md: "md" }}>
                  <ListIcon as={WarningIcon} color="red.500" />
                  {weakness}
                </ListItem>
              ))}
            </List>
          </Box>
        )}
        
        {suggestions && suggestions.length > 0 && (
          <Box>
            <Heading as="h4" size={headingSize} mb={3} color="blue.600">
              Suggestions
            </Heading>
            <List spacing={2}>
              {suggestions.map((suggestion, index) => (
                <ListItem key={index} fontSize={{ base: "sm", md: "md" }}>
                  <ListIcon as={CheckCircleIcon} color="blue.500" />
                  {suggestion}
                </ListItem>
              ))}
            </List>
          </Box>
        )}
      </VStack>
    </Box>
  )
}

export default AnalysisResultCard