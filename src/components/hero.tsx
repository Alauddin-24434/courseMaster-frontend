"use client"

import { useEffect, useRef, useState } from "react"
import Link from "next/link"
import { useTranslation } from "react-i18next"
import { ArrowRight, Sparkles } from "lucide-react"

export function HeroAnimated() {
  const { t } = useTranslation()
  
  const ref = useRef<HTMLDivElement>(null)
  const [isInView, setIsInView] = useState(false)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsInView(true)
        }
      },
      { threshold: 0.1 },
    )

    if (ref.current) {
      observer.observe(ref.current)
    }

    return () => observer.disconnect()
  }, [])

  return (
    <section
      ref={ref}
      className="relative min-h-screen w-full  overflow-hidden "
    >


      {/* Content */}
      <div className="relative z-10 container mx-auto  px-4 sm:px-6 lg:px-8 min-h-screen flex flex-col justify-center">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Left content */}
          <div className="space-y-8">
            <div
              className={`transition-all duration-1000 ${
                isInView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
              }`}
            >
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-primary/10 rounded-full border border-primary/20">
                <Sparkles className="w-4 h-4 text-primary animate-pulse" />
                <span className="text-sm font-medium text-primary">{t("home.featured")}</span>
              </div>
            </div>

            <div
              className={`transition-all duration-1000 delay-200 ${
                isInView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
              }`}
            >
              <h1 className="text-5xl sm:text-6xl lg:text-7xl font-serif font-bold text-balance leading-tight">
                {t("home.title")}
              </h1>
            </div>

            <div
              className={`transition-all duration-1000 delay-300 ${
                isInView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
              }`}
            >
              <p className="text-lg sm:text-xl text-muted-foreground max-w-lg text-balance leading-relaxed">
                {t("home.subtitle")}
              </p>
            </div>

            <div
              className={`flex flex-col sm:flex-row gap-4 transition-all duration-1000 delay-400 ${
                isInView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
              }`}
            >
              <Link
                href="/courses"
                className="px-8 py-4 bg-primary text-primary-foreground rounded-lg font-semibold hover:shadow-lg hover:scale-105 transition transform flex items-center gap-2 justify-center"
              >
                {t("home.cta")}
                <ArrowRight className="w-5 h-5" />
              </Link>
              <Link
                href="#"
                className="px-8 py-4 border-2 border-primary/30 text-foreground rounded-lg font-semibold hover:bg-primary/5 hover:border-primary/60 transition"
              >
                Watch Demo
              </Link>
            </div>

            {/* Stats */}
            <div
              className={`grid grid-cols-3 gap-4 pt-8 transition-all duration-1000 delay-500 ${
                isInView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
              }`}
            >
              <div className="space-y-2">
                <p className="text-3xl sm:text-4xl font-bold text-primary">10K+</p>
                <p className="text-sm text-muted-foreground">Courses</p>
              </div>
              <div className="space-y-2">
                <p className="text-3xl sm:text-4xl font-bold text-primary">50K+</p>
                <p className="text-sm text-muted-foreground">Students</p>
              </div>
              <div className="space-y-2">
                <p className="text-3xl sm:text-4xl font-bold text-primary">500+</p>
                <p className="text-sm text-muted-foreground">Instructors</p>
              </div>
            </div>
          </div>

          {/* Right side - Hero image with floating cards */}
          <div className="relative h-96 lg:h-full hidden lg:flex items-center justify-center">
            {/* Hero image */}
            <div
              className={`relative w-80 h-80 transition-all duration-1000 delay-300 ${
                isInView ? "opacity-100 scale-100" : "opacity-0 scale-90"
              }`}
            >
              <img
  src="/hero.jpg"
  alt="Learning illustration"
  className="w-full h-full object-cover rounded-3xl shadow-2xl scale-x-[-1]"
/>

            </div>

            {/* Floating card 1 - Top right */}
            <div
              className={`absolute top-8 right-0 bg-card border border-border rounded-xl p-4 shadow-xl w-48 transition-all duration-1000 delay-400 ${
                isInView ? "opacity-100 translate-x-0 translate-y-0" : "opacity-0 translate-x-10 -translate-y-10"
              } animate-float`}
            >
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-primary/20 rounded-lg flex items-center justify-center">
                  <Sparkles className="w-5 h-5 text-primary" />
                </div>
                <div>
                  <p className="font-semibold text-sm">Expert Instructors</p>
                  <p className="text-xs text-muted-foreground">Learn from best</p>
                </div>
              </div>
            </div>

            {/* Floating card 2 - Bottom left */}
            <div
              className={`absolute bottom-8 left-0 bg-card border border-border rounded-xl p-4 shadow-xl w-48 transition-all duration-1000 delay-500 ${
                isInView ? "opacity-100 translate-x-0 translate-y-0" : "opacity-0 -translate-x-10 translate-y-10"
              } animate-float animation-delay-1000`}
            >
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-secondary/20 rounded-lg flex items-center justify-center">
                  <span className="text-sm font-bold text-secondary">✓</span>
                </div>
                <div>
                  <p className="font-semibold text-sm">Lifetime Access</p>
                  <p className="text-xs text-muted-foreground">Learn forever</p>
                </div>
              </div>
            </div>

            {/* Floating card 3 - Middle right */}
            <div
              className={`absolute top-1/2 -right-8 bg-card border border-border rounded-xl p-4 shadow-xl w-48 transition-all duration-1000 delay-600 ${
                isInView ? "opacity-100 translate-x-0" : "opacity-0 translate-x-10"
              } animate-float animation-delay-2000`}
            >
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-accent/20 rounded-lg flex items-center justify-center">
                  <span className="text-sm font-bold text-accent">★</span>
                </div>
                <div>
                  <p className="font-semibold text-sm">4.9/5 Rating</p>
                  <p className="text-xs text-muted-foreground">Student rated</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10">
        <div className="flex flex-col items-center gap-2 animate-bounce">
          <p className="text-xs text-muted-foreground uppercase tracking-widest">Scroll to explore</p>
          <svg className="w-5 h-5 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
          </svg>
        </div>
      </div>
    </section>
  )
}
