import { Circle, Icon, useColorModeValue } from "@chakra-ui/react"
import AvailabilityTags from "components/[guild]/RolePlatforms/components/PlatformCard/components/AvailabilityTags"
import useGuild from "components/[guild]/hooks/useGuild"
import useGuildPermission from "components/[guild]/hooks/useGuildPermission"
import { useClaimedReward } from "hooks/useClaimedReward"
import { CardPropsHook } from "rewards/types"
import { GuildPlatformWithOptionalId } from "types"
import { secretTextData } from "./data"

const useSecretTextCardProps: CardPropsHook = (
  guildPlatform: GuildPlatformWithOptionalId
) => {
  const bgColor = useColorModeValue("gray.700", "gray.600")

  const { roles } = useGuild()
  const platformGuildData = guildPlatform.platformGuildData

  const rolePlatform = roles
    ?.flatMap((role) => role.rolePlatforms)
    .find((rp) => rp.guildPlatformId === guildPlatform.id)

  const { isAdmin } = useGuildPermission()
  const { claimed } = useClaimedReward(rolePlatform?.id)

  return {
    name: platformGuildData?.name || secretTextData.name,
    type: "TEXT",
    image: platformGuildData?.imageUrl ?? (
      <Circle size={10} bgColor={bgColor}>
        <Icon as={secretTextData.icon} boxSize={5} color="white" />
      </Circle>
    ),
    info: rolePlatform && <AvailabilityTags rolePlatform={rolePlatform} mt={1} />,
    shouldHide: !isAdmin && claimed,
  }
}

export default useSecretTextCardProps
