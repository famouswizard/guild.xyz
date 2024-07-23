import { cn } from "@/lib/utils"
import { Slot } from "@radix-ui/react-slot"
import clsx from "clsx"
import { PropsWithChildren, ReactNode } from "react"
import { forwardRef } from "react"

/* -------------------------------------------------------------------------------------------------
 * Layout
 * -----------------------------------------------------------------------------------------------*/

interface LayoutProps extends React.HTMLAttributes<HTMLDivElement> {}

const Layout = ({ children, className, ...props }: LayoutProps) => (
  <div className={cn("flex min-h-screen flex-col", className)} {...props}>
    {children}
  </div>
)

/* -------------------------------------------------------------------------------------------------
 * LayoutContainer
 * -----------------------------------------------------------------------------------------------*/

interface LayoutContainerProps extends React.HTMLAttributes<HTMLDivElement> {
  asChild?: boolean
}

const LayoutContainer = forwardRef<HTMLDivElement, LayoutContainerProps>(
  ({ children, className, asChild = false }, ref) => {
    const Comp = asChild ? Slot : "div"
    return (
      <Comp
        className={clsx("mx-auto max-w-screen-lg px-4 sm:px-8 md:px-10", className)}
        ref={ref}
      >
        {children}
      </Comp>
    )
  }
)

/* -------------------------------------------------------------------------------------------------
 * LayoutHero
 * -----------------------------------------------------------------------------------------------*/

const LayoutHero = ({ children }: PropsWithChildren) => (
  <div className="relative">{children}</div>
)

/* -------------------------------------------------------------------------------------------------
 * LayoutHeadline
 * -----------------------------------------------------------------------------------------------*/

interface LayoutHeadlineProps {
  title: ReactNode
}

const LayoutHeadline = ({ title }: LayoutHeadlineProps) => (
  <LayoutContainer>
    <h1 className="pt-9 pb-14 font-bold font-display text-4xl text-white tracking-tight sm:text-5xl">
      {title}
    </h1>
  </LayoutContainer>
)

/* -------------------------------------------------------------------------------------------------
 * LayoutBannerBackground
 * -----------------------------------------------------------------------------------------------*/

interface LayoutBannerBackgroundProps {
  className?: string
}

const LayoutBannerBackground = ({ className }: LayoutBannerBackgroundProps) => (
  <div className={cn("absolute inset-0 bg-banner", className)} />
)

/* -------------------------------------------------------------------------------------------------
 * LayoutBanner
 * -----------------------------------------------------------------------------------------------*/

interface LayoutBannerProps extends PropsWithChildren {
  className?: string
}

const LayoutBanner = ({ children, className }: LayoutBannerProps) => (
  <div
    className={cn(
      "-z-10 -bottom-28 absolute inset-x-0 top-0 overflow-hidden",
      className
    )}
  >
    {children}
  </div>
)

/* -------------------------------------------------------------------------------------------------
 * LayoutMain
 * -----------------------------------------------------------------------------------------------*/

const LayoutMain = ({ children, ...props }: LayoutContainerProps) => (
  <main>
    <LayoutContainer {...props}>{children}</LayoutContainer>
  </main>
)

/* -------------------------------------------------------------------------------------------------
 * LayoutFooter
 * -----------------------------------------------------------------------------------------------*/

const LayoutFooter = ({ children, ...props }: LayoutContainerProps) => (
  <footer className="mt-auto">
    <LayoutContainer {...props}>{children}</LayoutContainer>
  </footer>
)

/* -----------------------------------------------------------------------------------------------*/

export {
  LayoutBanner,
  LayoutBannerBackground,
  LayoutFooter,
  LayoutHeadline,
  LayoutHero,
  LayoutMain,
  LayoutContainer,
  Layout,
}
