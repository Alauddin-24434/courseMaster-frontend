"use client"

import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { RequirementsSection } from "@/components/requirements-section"
import { useTranslation } from "react-i18next"

export default function RequirementsPage() {
  const { t } = useTranslation()

  return (
    <>
      <Header />
      <main className="min-h-screen bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="space-y-12">
            {/* Header */}
            <div className="space-y-4">
              <h1 className="text-4xl font-serif font-bold">{t("requirements.title") || "System Requirements"}</h1>
              <p className="text-xl text-muted-foreground max-w-2xl">
                {t("requirements.subtitle") ||
                  "Ensure you have the necessary requirements to get the best learning experience on CourseMaster"}
              </p>
            </div>

            {/* Requirements Grid */}
            <RequirementsSection />

            {/* Additional Info */}
            <div className="bg-gradient-to-r from-primary/10 to-secondary/10 rounded-lg p-8 border border-primary/20">
              <h2 className="text-2xl font-serif font-bold mb-4">{t("requirements.need_help") || "Need Help?"}</h2>
              <p className="text-muted-foreground mb-6">
                If you're experiencing issues accessing the platform, please check the following:
              </p>
              <ul className="space-y-3 list-disc list-inside text-muted-foreground">
                <li>Clear your browser cache and cookies</li>
                <li>Try using a different browser to isolate the issue</li>
                <li>Ensure your internet connection is stable</li>
                <li>Disable browser extensions that might interfere with the site</li>
                <li>Update your browser to the latest version</li>
              </ul>
              <p className="mt-6 text-sm">
                Still having issues?{" "}
                <a href="/contact" className="text-primary font-medium hover:underline">
                  Contact our support team
                </a>
              </p>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  )
}
