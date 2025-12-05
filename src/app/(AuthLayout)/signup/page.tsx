"use client"

import { SignupForm } from "@/components/auth-Form/signup-form"

import { useTranslation } from "react-i18next"
// import { GradientOrb } from "@/components/gradient-orb"

export default function SignupPage() {

  const { t } = useTranslation();

  return (
    <>

      <main className="min-h-screen bg-gradient-to-br from-background via-background to-muted/30 flex items-center justify-center py-12 px-4">
  

        <div className="w-full max-w-md relative z-10">
          <div className="bg-background border border-border rounded-2xl shadow-xl p-8">
            <div className="mb-8 text-center">
                          <h1 className="text-3xl font-bold mb-2">{t("auth.start_learning")}</h1>
            
            </div>

            <SignupForm />

           
          </div>
        </div>
      </main>
  
    </>
  )
}
