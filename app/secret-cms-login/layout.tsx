import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Sign In - WAE CMS",
  robots: {
    index: false,
    follow: false,
  },
}

export default function SecretCmsLoginLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <>{children}</>
}
