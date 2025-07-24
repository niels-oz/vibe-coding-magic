'use client';

import { useLanguage } from '@/contexts/LanguageContext';
import { Language } from '@/lib/i18n';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

export function LanguageSelector() {
  const { language, setLanguage } = useLanguage();

  const languages: { value: Language; label: string; flag: string }[] = [
    { value: 'cgn', label: 'Kölsch', flag: '🏰' },
    { value: 'en', label: 'English', flag: '🇬🇧' },
  ];

  return (
    <Select value={language} onValueChange={(value: Language) => setLanguage(value)}>
      <SelectTrigger className="w-auto min-w-[120px] border-border/60 focus:border-[#e00014]/50 focus:ring-[#e00014]/20 transition-all duration-200">
        <SelectValue>
          <div className="flex items-center gap-2">
            <span>{languages.find(l => l.value === language)?.flag}</span>
            <span className="text-sm">{languages.find(l => l.value === language)?.label}</span>
          </div>
        </SelectValue>
      </SelectTrigger>
      <SelectContent className="border-border/60">
        {languages.map((lang) => (
          <SelectItem
            key={lang.value}
            value={lang.value}
            className="focus:bg-[#e00014]/10 focus:text-[#e00014] cursor-pointer"
          >
            <div className="flex items-center gap-2">
              <span>{lang.flag}</span>
              <span className="text-sm font-medium">{lang.label}</span>
            </div>
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
}