import { Banner } from "docs-ui"
import Navbar from ".."
import { ExclamationCircleSolid, TriangleRightMini } from "@medusajs/icons"
import Link from "next/link"
import clsx from "clsx"

export const NavbarWithBanner = () => {
  return (
    <div className="sticky top-0 z-50">
      <Banner>
        <ExclamationCircleSolid className="text-medusa-contrast-fg-secondary" />
        <span>
          You&apos;re viewing the documentation for v1, which isn&apos;t the
          latest Medusa version.
        </span>
        <Link
          href="https://docs.medusajs.com"
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
  )
}
