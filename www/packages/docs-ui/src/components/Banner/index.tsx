import clsx from "clsx"
import React from "react"

type BannerProps = {
  children: React.ReactNode
}

export const Banner = ({ children }: BannerProps) => {
  return (
    <div
      className={clsx(
        "px-docs_1.5 py-docs_0.75 flex gap-docs_0.5 justify-center items-center",
        "bg-medusa-contrast-bg-base text-medusa-contrast-fg-primary",
        "text-compact-small-plus sticky top-0 flex-wrap"
      )}
    >
      {children}
    </div>
  )
}
