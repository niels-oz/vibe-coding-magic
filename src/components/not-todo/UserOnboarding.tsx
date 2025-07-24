'use client';

import { useState } from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { LanguageSelector } from '@/components/LanguageSelector';

interface UserOnboardingProps {
  onUserCreated: (email: string) => void;
  isLoading?: boolean;
}

export function UserOnboarding({
  onUserCreated,
  isLoading,
}: UserOnboardingProps) {
  const { t } = useLanguage();
  const [email, setEmail] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email.trim()) {
      onUserCreated(email.trim());
    }
  };

  return (
    <div className="w-full max-w-md mx-auto p-6">
      <Card className="border-border/50 shadow-lg shadow-black/10">
        <CardHeader className="text-center">
          <div className="flex justify-end mb-4">
            <LanguageSelector />
          </div>
          <CardTitle className="text-2xl font-bold bg-gradient-to-r from-foreground via-[#e00014] to-foreground bg-clip-text text-transparent">
            {t.welcomeToApp}
          </CardTitle>
          <CardDescription className="text-muted-foreground">
            {t.enterEmailToStart}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="email">{t.email}</Label>
              <Input
                id="email"
                type="email"
                placeholder="your@email.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                disabled={isLoading}
                required
              />
            </div>
            <Button
              type="submit"
              className="w-full"
              disabled={!email.trim() || isLoading}
            >
              {isLoading ? t.settingUp : t.getStarted}
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
