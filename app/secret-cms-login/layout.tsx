import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Sign In | WAE Content Management System",
  description: "Official internal administration portal for WAE Limited. Authorized administrative personnel only.",
  robots: {
    index: false,
    follow: false,
    nocache: true,
  },
  alternates: {
    canonical: "https://www.waecorp.com/secret-cms-login",
  },
}

export default function SecretCmsLoginLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <>{children}</>
}
