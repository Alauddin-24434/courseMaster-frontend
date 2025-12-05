"use client";



import { useTranslation } from "react-i18next";
import { LoginForm } from "@/components/auth-Form/login-form";

export default function LoginPage() {

  const { t } = useTranslation();


  return (
    <>
  
      <main className="min-h-screen bg-gradient-to-br from-background via-background to-muted/30 flex items-center justify-center py-12 px-4">
        <div className="absolute inset-0 overflow-hidden pointer-events-none"></div>
        <div className="w-full max-w-md relative z-10">
          <div className="bg-background border border-border rounded-2xl shadow-xl p-8">
            <div className="mb-8 text-center">
              <h1 className="text-3xl font-bold mb-2">{t("auth.welcome_back")}</h1>
              <p className="text-muted-foreground">{t("auth.enter_credentials")}</p>
            </div>

            <LoginForm />

          
          </div>

          <p className="text-center text-sm text-muted-foreground mt-6">
            {t("auth.demo_credentials")}
            <br />
            Student: student@coursemaster.com / password123
            <br />
            Admin: admin@coursemaster.com / admin123
          </p>
        </div>
      </main>
    
    </>
  );
}
