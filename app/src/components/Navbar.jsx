import { useState } from 'react'
import { 
  Flex, Heading, Button, Spacer, useColorModeValue, 
  IconButton, useBreakpointValue, Drawer, DrawerBody, 
  DrawerHeader, DrawerOverlay, DrawerContent, DrawerCloseButton,
  VStack, useDisclosure, Box
} from '@chakra-ui/react'
import { Link, useLocation } from 'react-router-dom'
import { HamburgerIcon } from '@chakra-ui/icons'

const Navbar = () => {
  const location = useLocation()
  const bg = useColorModeValue('white', 'gray.800')
  const { isOpen, onOpen, onClose } = useDisclosure()
  const isMobile = useBreakpointValue({ base: true, md: false })
  
  return (
    <>
      <Flex 
        as="nav" 
        align="center" 
        justify="space-between" 
        wrap="wrap" 
        padding={{ base: 3, md: 4 }} 
        bg={bg}
        boxShadow="md"
        position="sticky"
        top="0"
        zIndex="1000"
      >
        <Heading as={Link} to="/" size={{ base: "md", md: "lg" }} color="blue.600">
          AI Resume Analyzer
        </Heading>
        
        <Spacer />
        
        {isMobile ? (
          <IconButton
            icon={<HamburgerIcon />}
            variant="outline"
            aria-label="Open menu"
            onClick={onOpen}
          />
        ) : (
          <Flex align="center">
            <Button 
              as={Link} 
              to="/analyze" 
              variant="ghost" 
              mr={2}
              size="md"
              colorScheme={location.pathname === '/analyze' ? 'blue' : 'gray'}
            >
              Resume Analysis
            </Button>
            <Button 
              as={Link} 
              to="/cover-letter" 
              variant="ghost"
              size="md"
              colorScheme={location.pathname === '/cover-letter' ? 'blue' : 'gray'}
            >
              Cover Letter
            </Button>
          </Flex>
        )}
      </Flex>

      {/* Mobile Drawer */}
      <Drawer isOpen={isOpen} placement="right" onClose={onClose}>
        <DrawerOverlay />
        <DrawerContent>
          <DrawerCloseButton />
          <DrawerHeader borderBottomWidth="1px">Menu</DrawerHeader>
          <DrawerBody>
            <VStack spacing={4} mt={4} align="stretch">
              <Button 
                as={Link} 
                to="/analyze" 
                variant={location.pathname === '/analyze' ? 'solid' : 'ghost'}
                colorScheme="blue"
                onClick={onClose}
                size="lg"
                justifyContent="flex-start"
              >
                Resume Analysis
              </Button>
              <Button 
                as={Link} 
                to="/cover-letter" 
                variant={location.pathname === '/cover-letter' ? 'solid' : 'ghost'}
                colorScheme="blue"
                onClick={onClose}
                size="lg"
                justifyContent="flex-start"
              >
                Cover Letter Generator
              </Button>
            </VStack>
          </DrawerBody>
        </DrawerContent>
      </Drawer>
    </>
  )
}

export default Navbar