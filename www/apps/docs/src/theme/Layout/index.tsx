import React, { useEffect } from "react"
import clsx from "clsx"
import ErrorBoundary from "@docusaurus/ErrorBoundary"
import {
  PageMetadata,
  SkipToContentFallbackId,
  ThemeClassNames,
} from "@docusaurus/theme-common"
import { useKeyboardNavigation } from "@docusaurus/theme-common/internal"
import SkipToContent from "@theme/SkipToContent"
import Navbar from "@theme/Navbar"
import LayoutProvider from "@theme/Layout/Provider"
import ErrorPageContent from "@theme/ErrorPageContent"
import type { Props } from "@theme/Layout"
import useIsBrowser from "@docusaurus/useIsBrowser"
import { useLocation } from "@docusaurus/router"
import { useAnalytics } from "docs-ui"
import { Banner } from "docs-ui"
import { ExclamationCircleSolid, TriangleRightMini } from "@medusajs/icons"
import Link from "@docusaurus/Link"

export default function Layout(props: Props): JSX.Element {
  const {
    children,
    wrapperClassName,
    // Not really layout-related, but kept for convenience/retro-compatibility
    title,
    description,
  } = props

  useKeyboardNavigation()
  const isBrowser = useIsBrowser()
  const location = useLocation()
  const { track } = useAnalytics()

  useEffect(() => {
    if (isBrowser) {
      const handlePlay = () => {
        track("video_played")
      }

      const videos = document.querySelectorAll("video")
      videos.forEach((video) =>
        video.addEventListener("play", handlePlay, {
          once: true,
          capture: true,
        })
      )

      return () => {
        videos.forEach((video) => video.removeEventListener("play", handlePlay))
      }
    }
  }, [isBrowser, location.pathname])

  return (
    <LayoutProvider>
      <PageMetadata title={title} description={description} />

      <SkipToContent />
      <div className="sticky top-0 z-[400]">
        <Banner>
          <ExclamationCircleSolid className="text-medusa-contrast-fg-secondary" />
          <span>
            You&apos;re viewing the documentation for v1, which isn&apos;t the
            latest Medusa version.
          </span>
          <Link
            to="https://docs.medusajs.com"
            className={clsx(
              "inline-flex gap-0.25 items-center rounded-xs",
              "text-medusa-contrast-fg-primary hover:text-medusa-contrast-fg-secondary group"
            )}
          >
            <span>Latest documentation</span>
            <TriangleRightMini className="group-hover:translate-x-docs_0.125 transition-transform" />
          </Link>
        </Banner>
        <Navbar />
      </div>

      <div
        id={SkipToContentFallbackId}
        className={clsx(
          ThemeClassNames.wrapper.main,
          "flex-auto flex-grow flex-shrink-0",
          wrapperClassName
        )}
      >
        <ErrorBoundary fallback={(params) => <ErrorPageContent {...params} />}>
          {children}
        </ErrorBoundary>
      </div>
    </LayoutProvider>
  )
}
