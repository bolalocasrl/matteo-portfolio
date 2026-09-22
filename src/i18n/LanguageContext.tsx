import { createContext, useContext, useEffect, useState } from 'react'
import { type ReactNode } from 'react'
import { translations } from './translations'
import type { Language, Translations } from './translations'

interface LanguageContextType {
  lang: Language
  setLang: (lang: Language) => void
  t: Translations
}

const LanguageContext = createContext<LanguageContextType>({
  lang: 'en',
  setLang: () => {},
  t: translations.en,
})

const LANGUAGES: Language[] = ['en', 'it', 'es']

// Saved choice first, otherwise the browser language, otherwise English
function getInitialLanguage(): Language {
  try {
    const saved = localStorage.getItem('lang') as Language | null
    if (saved && LANGUAGES.includes(saved)) return saved
  } catch { /* storage blocked */ }
  const browser = navigator.language.slice(0, 2) as Language
  return LANGUAGES.includes(browser) ? browser : 'en'
}

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [lang, setLangState] = useState<Language>(getInitialLanguage)
  const t = translations[lang]

  const setLang = (l: Language) => {
    setLangState(l)
    try { localStorage.setItem('lang', l) } catch { /* storage blocked */ }
  }

  useEffect(() => {
    document.documentElement.lang = lang
  }, [lang])
  return (
    <LanguageContext.Provider value={{ lang, setLang, t }}>
      {children}
    </LanguageContext.Provider>
  )
}

export function useLanguage() {
  return useContext(LanguageContext)
}
