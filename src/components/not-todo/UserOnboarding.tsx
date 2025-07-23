'use client';

import { useState } from 'react';
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

interface UserOnboardingProps {
  onUserCreated: (email: string) => void;
  isLoading?: boolean;
}

export function UserOnboarding({
  onUserCreated,
  isLoading,
}: UserOnboardingProps) {
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
          <CardTitle className="text-2xl font-bold bg-gradient-to-r from-foreground via-[#e00014] to-foreground bg-clip-text text-transparent">
            Welcome to Not-To-Do!
          </CardTitle>
          <CardDescription className="text-muted-foreground">
            Enter your email to get started with your personal not-to-do list
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
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
              {isLoading ? 'Setting up...' : 'Get Started'}
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
