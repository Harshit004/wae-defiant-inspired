import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "WAE | Activist-Led Sustainable Hydration Solutions",
  description:
    "Redefining water through sustainable hydration solutions, WAE is an activist company committed to innovation and lasting impact.",
  robots: {
    index: false,
    follow: false,
  },
}

export default function HomeV2Layout({
  children,
}: {
  children: React.ReactNode
}) {
  return <>{children}</>
}
