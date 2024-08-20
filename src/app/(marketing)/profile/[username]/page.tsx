import { Header } from "@/components/Header"
import {
  Layout,
  LayoutBanner,
  LayoutFooter,
  LayoutHero,
  LayoutMain,
} from "@/components/Layout"
import { SWRProvider } from "@/components/SWRProvider"
import { Anchor } from "@/components/ui/Anchor"
import { Guild, Role, Schemas } from "@guildxyz/types"
import { ArrowRight } from "@phosphor-icons/react/dist/ssr"
import { ActivityLogAction } from "components/[guild]/activity/constants"
import { env } from "env"
import Image from "next/image"
import { notFound, redirect } from "next/navigation"
import { Profile } from "../_components/Profile"
import { ProfileColorBanner } from "../_components/ProfileColorBanner"

// TODO: use env var for this url when it is changed to this value.
// next-server throws fetch error if we modify the env var in memory
// const api = "https://api.guild.xyz"

const api = env.NEXT_PUBLIC_API

async function ssrFetcher<T>(...args: Parameters<typeof fetch>) {
  return (await fetch(...args)).json() as T
}

const fetchPublicProfileData = async ({ username }: { username: string }) => {
  const activitiesRequest = new URL(`v2/profiles/${username}/activity`, api)
  const contributionsRequest = new URL(`v2/profiles/${username}/contributions`, api)
  const profileRequest = new URL(`v2/profiles/${username}`, api)
  const profileResponse = await fetch(profileRequest, {
    next: {
      tags: ["profile"],
      revalidate: 3600,
    },
  })

  if (profileResponse.status === 404) notFound()
  if (!profileResponse.ok) redirect("/error")

  const profile = (await profileResponse.json()) as Schemas["Profile"]
  const contributions = await ssrFetcher<Schemas["Contribution"][]>(
    contributionsRequest,
    {
      next: {
        tags: ["contributions"],
        revalidate: 3600,
      },
    }
  )
  const activities = await ssrFetcher<ActivityLogAction[]>(activitiesRequest, {
    next: {
      tags: ["contributions"],
      revalidate: 60,
    },
  })
  const roleRequests = contributions.map(
    ({ roleId, guildId }) => new URL(`v2/guilds/${guildId}/roles/${roleId}`, api)
  )
  const guildRequests = contributions.map(
    ({ guildId }) => new URL(`v2/guilds/${guildId}`, api)
  )
  const guilds = await Promise.all(
    guildRequests.map((req) =>
      ssrFetcher<Guild>(req, {
        next: {
          revalidate: 3 * 3600,
        },
      })
    )
  )
  const roles = await Promise.all(
    roleRequests.map((req) =>
      ssrFetcher<Role>(req, {
        next: {
          revalidate: 3 * 3600,
        },
      })
    )
  )
  const guildsZipped = Object.fromEntries(
    guildRequests.map(({ pathname }, i) => [pathname, guilds[i]])
  )
  const rolesZipped = Object.fromEntries(
    roleRequests.map(({ pathname }, i) => [pathname, roles[i]])
  )
  return {
    profile,
    fallback: {
      [activitiesRequest.pathname]: activities,
      [profileRequest.pathname]: profile,
      [contributionsRequest.pathname]: contributions,
      ...guildsZipped,
      ...rolesZipped,
    },
  }
}

const Page = async ({ params: { username } }: { params: { username: string } }) => {
  const { fallback, profile } = await fetchPublicProfileData({ username })

  const isBgColor = profile.backgroundImageUrl?.startsWith("#")

  return (
    <SWRProvider
      value={{
        fallback,
      }}
    >
      <Layout
        style={
          isBgColor ? { ["--banner" as string]: profile.backgroundImageUrl } : {}
        }
      >
        <LayoutHero className="pb-4 md:pb-10">
          <Header />
          <LayoutBanner className="-bottom-[600px]">
            {isBgColor ? (
              <ProfileColorBanner />
            ) : (
              profile.backgroundImageUrl && (
                <Image
                  src={profile.backgroundImageUrl}
                  fill
                  sizes="100vw"
                  alt="profile background image"
                  style={{
                    filter: "brightness(50%)",
                    objectFit: "cover",
                  }}
                />
              )
            )}
            <div className="absolute inset-0 bg-gradient-to-t from-background" />
          </LayoutBanner>
        </LayoutHero>
        <LayoutMain className="top-0">
          <Profile />
        </LayoutMain>
        <LayoutFooter className="pt-28 pb-5">
          <p className="text-center font-medium text-muted-foreground">
            Guild Profiles are currently in invite only early access, only available
            to{" "}
            <Anchor
              href={"#"}
              className="inline-flex items-center gap-1"
              variant="muted"
            >
              Subscribers
              <ArrowRight />
            </Anchor>
          </p>
        </LayoutFooter>
      </Layout>
    </SWRProvider>
  )
}

// biome-ignore lint/style/noDefaultExport: page route
export default Page
