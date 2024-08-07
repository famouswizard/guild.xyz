import { Header } from "@/components/Header"
import {
  Layout,
  LayoutBanner,
  LayoutContainer,
  LayoutHero,
  LayoutTitle,
} from "@/components/Layout"
import { LayoutHeadline, LayoutMain } from "@/components/Layout"
import { Center, Heading, Spinner } from "@chakra-ui/react"
import BackToGuildButton from "components/[guild]/BackToGuildButton"
import { EditGuildFormComponent } from "components/[guild]/EditGuild/EditGuildFormComponent"
import DeleteGuildButton from "components/[guild]/EditGuild/components/DeleteGuildButton"
import { GuildPageBanner } from "components/[guild]/GuildPageBanner"
import GuildTabs from "components/[guild]/Tabs/GuildTabs"
import { ThemeProvider } from "components/[guild]/ThemeContext"
import useGuild from "components/[guild]/hooks/useGuild"
import useGuildPermission from "components/[guild]/hooks/useGuildPermission"
import useUser from "components/[guild]/hooks/useUser"
import Card from "components/common/Card"
import Section from "components/common/Section"

const DashboardPage = () => {
  const { isDetailed } = useGuild()
  const { isOwner } = useGuildPermission()
  const { isSuperAdmin } = useUser()

  if (!isDetailed)
    return (
      <Center h="100vh" w="screen">
        <Spinner />
        <Heading fontFamily="display" size="md" ml="4" mb="1">
          Loading dashboard...
        </Heading>
      </Center>
    )

  return (
    <Layout>
      <LayoutHero>
        <LayoutBanner>
          <GuildPageBanner />
        </LayoutBanner>

        <Header />

        <LayoutContainer className="-mb-14 mt-6">
          <BackToGuildButton />
        </LayoutContainer>

        <LayoutHeadline className="pt-8">
          <LayoutTitle>Dashboard</LayoutTitle>
        </LayoutHeadline>
      </LayoutHero>

      <LayoutMain>
        <GuildTabs activeTab="SETTINGS" />

        <Card px={{ base: 5, md: 6 }} py={{ base: 6, md: 7 }} mb={4}>
          <EditGuildFormComponent />
        </Card>

        {(isOwner || isSuperAdmin) && (
          <Card px={{ base: 5, md: 6 }} py={{ base: 6, md: 7 }}>
            <Section title="Danger zone">
              <DeleteGuildButton />
            </Section>
          </Card>
        )}
      </LayoutMain>
    </Layout>
  )
}

const DashboardPageWrapper = () => (
  <ThemeProvider>
    <DashboardPage />
  </ThemeProvider>
)

export default DashboardPageWrapper
