import {
  Box,
  Center,
  Flex,
  HStack,
  Heading,
  Skeleton,
  SkeletonCircle,
  Stack,
  Tag,
  TagLabel,
  TagLeftIcon,
  Text,
  VStack,
  useColorMode,
  useColorModeValue,
} from "@chakra-ui/react"
import Button from "components/common/Button"
import Card from "components/common/Card"
import Image from "next/image"
import { Clock } from "phosphor-react"
import { useThemeContext } from "../ThemeContext"

const LeaderboardAirdropCard = () => {
  const { colorMode } = useColorMode()
  const modalBg = colorMode === "dark" ? "var(--chakra-colors-gray-700)" : "#FFFFFF"
  const { textColor } = useThemeContext()
  const bgFile = useColorModeValue("bg_light.svg", "bg.svg")

  return (
    <Card
      border={"2px solid transparent"}
      height={100}
      position={"relative"}
      display="flex"
      flexDirection="row"
      alignItems="center"
      background={`linear-gradient(${modalBg}, ${modalBg}) padding-box, linear-gradient(to bottom, #F5E4A0, ${modalBg}) border-box`}
      _before={{
        content: '""',
        position: "absolute",
        top: 0,
        bottom: 0,
        left: 0,
        right: 0,
        bg: `linear-gradient(to top right, ${modalBg} 30%, transparent), url('/landing/${bgFile}')`,
        bgSize: "400px",
        bgRepeat: "no-repeat",
        bgPosition: "top 7px right 7px",
        opacity: "0.07",
      }}
      _after={{
        content: '""',
        position: "absolute",
        top: 0,
        bottom: 0,
        left: 0,
        right: 0,
        bg: `url('/img/confetti_overlay.png'), linear-gradient(to right, #705E47, transparent)`,
        bgSize: "250px",
        bgRepeat: "no-repeat",
        bgPosition: "top 0px left -20px",
        opacity: "1",
        zIndex: "0",
      }}
    >
      <HStack
        spacing={1}
        pl={{ base: "85px", sm: "120px" }}
        pr={6}
        alignItems={"center"}
        w="full"
        zIndex={1}
        position={"relative"}
      >
        <Box
          position={"absolute"}
          left={{ base: "-28px", sm: "0px" }}
          top={{ base: "-25px", sm: "-16px" }}
          zIndex={-1}
        >
          <Image
            priority
            src={"/img/cup.png"}
            alt="Cup"
            width={150}
            height={100}
            draggable={false}
            objectFit="cover"
            style={{ objectPosition: "-30px 0px" }}
          />
        </Box>
        <Stack spacing={0} overflow={"hidden"}>
          <Text
            color={"GrayText"}
            fontSize={{ base: "sm", sm: "md" }}
            overflow={"hidden"}
            whiteSpace={"nowrap"}
            textOverflow={"ellipsis"}
          >
            You're eligible to claim
          </Text>
          <Flex flexDir={"row"} alignItems={"center"} gap={4}>
            <Heading
              fontSize={{ base: "large", sm: "x-large" }}
              fontFamily="display"
              color={textColor}
              mt={0}
              mb={"4px"}
            >
              5 UNI
            </Heading>
            <HStack gap={1} display={{ lg: "inherit", base: "none" }}>
              <Tag height={"fit-content"}>
                <TagLeftIcon as={Clock} mr={1} />
                <TagLabel>Claim ends in 4 days</TagLabel>
              </Tag>
              <Tag height={"fit-content"}>
                <TagLeftIcon as={Clock} mr={1} />
                <TagLabel>75/100 available</TagLabel>
              </Tag>
            </HStack>
          </Flex>
        </Stack>

        <Button
          size={{ base: "sm", sm: "md" }}
          flexShrink={0}
          colorScheme="primary"
          ml="auto"
        >
          Claim
        </Button>
      </HStack>
    </Card>
  )
}

const LeaderboardAirdopSkeleton = () => {
  const positionBgColor = useColorModeValue("gray.50", "blackAlpha.300")
  const positionBorderColor = useColorModeValue("gray.200", "gray.600")

  return (
    <Card>
      <HStack spacing={0}>
        <Center
          minW={{ base: 16, sm: 24 }}
          maxW={{ base: 16, sm: 24 }}
          placeSelf="stretch"
          bgColor={positionBgColor}
          borderRightWidth={1}
          borderRightColor={positionBorderColor}
        >
          <Skeleton boxSize={{ base: 6, sm: 8 }} />
        </Center>
        <HStack spacing={4} px={{ base: 5, md: 6 }} py={{ base: 5, md: 7 }}>
          <SkeletonCircle boxSize={10} />

          <VStack alignItems="start" spacing={0}>
            <Skeleton w={48} />
            <Skeleton w={24} h={4} />
          </VStack>
        </HStack>
      </HStack>
    </Card>
  )
}

export default LeaderboardAirdropCard
export { LeaderboardAirdopSkeleton }
