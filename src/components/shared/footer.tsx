"use client"

import Link from "next/link"
import { Facebook, Twitter, Linkedin, Youtube } from "lucide-react"

export function Footer() {
  return (
    <footer className="bg-card border-t border-border">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          {/* Brand */}
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 bg-primary  rounded-lg flex items-center justify-center">
                <span className="text-primary-foreground font-bold">C</span>
              </div>
              <span className="font-serif font-bold">CourseMaster</span>
            </div>
            <p className="text-sm text-muted-foreground">Learn anything, anytime, from anywhere.</p>
            <div className="flex gap-4">
              <a href="#" className="p-2 bg-muted rounded-lg hover:bg-primary hover:text-primary-foreground transition">
                <Facebook className="w-4 h-4" />
              </a>
              <a href="#" className="p-2 bg-muted rounded-lg hover:bg-primary hover:text-primary-foreground transition">
                <Twitter className="w-4 h-4" />
              </a>
              <a href="#" className="p-2 bg-muted rounded-lg hover:bg-primary hover:text-primary-foreground transition">
                <Linkedin className="w-4 h-4" />
              </a>
              <a href="#" className="p-2 bg-muted rounded-lg hover:bg-primary hover:text-primary-foreground transition">
                <Youtube className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Links */}
          <div className="space-y-4">
            <h4 className="font-semibold">Product</h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li>
                <Link href="#" className="hover:text-foreground transition">
                  Features
                </Link>
              </li>
              <li>
                <Link href="#" className="hover:text-foreground transition">
                  Pricing
                </Link>
              </li>
              <li>
                <Link href="#" className="hover:text-foreground transition">
                  Security
                </Link>
              </li>
              <li>
                <Link href="#" className="hover:text-foreground transition">
                  Roadmap
                </Link>
              </li>
            </ul>
          </div>

          <div className="space-y-4">
            <h4 className="font-semibold">Company</h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li>
                <Link href="#" className="hover:text-foreground transition">
                  About
                </Link>
              </li>
              <li>
                <Link href="#" className="hover:text-foreground transition">
                  Blog
                </Link>
              </li>
              <li>
                <Link href="#" className="hover:text-foreground transition">
                  Careers
                </Link>
              </li>
              <li>
                <Link href="#" className="hover:text-foreground transition">
                  Contact
                </Link>
              </li>
            </ul>
          </div>

          <div className="space-y-4">
            <h4 className="font-semibold">Legal</h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li>
                <Link href="#" className="hover:text-foreground transition">
                  Privacy
                </Link>
              </li>
              <li>
                <Link href="#" className="hover:text-foreground transition">
                  Terms
                </Link>
              </li>
              <li>
                <Link href="#" className="hover:text-foreground transition">
                  License
                </Link>
              </li>
              <li>
                <Link href="#" className="hover:text-foreground transition">
                  Settings
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-border pt-8">
          <p className="text-center text-sm text-muted-foreground">© 2025 CourseMaster. All rights reserved.</p>
        </div>
      </div>
    </footer>
  )
}
