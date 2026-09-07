import { CheckCircle2, ShieldCheck, Sparkles, Zap } from 'lucide-react-native';
import { useColorScheme, useWindowDimensions, View } from 'react-native';
import { Typography } from '@/components/ui/Typography';
import type { OnboardingSlideData } from '../types';

interface OnboardingSlideProps {
  slide: OnboardingSlideData;
}

const ICONS = {
  Sparkles,
  CheckCircle2,
  Zap,
  ShieldCheck,
};

export function OnboardingSlide({ slide }: OnboardingSlideProps) {
  const { width } = useWindowDimensions();
  const isDark = useColorScheme() === 'dark';
  const IconComponent = ICONS[slide.iconName] || Sparkles;

  return (
    <View
      style={{
        width,
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        paddingHorizontal: 32,
      }}
      className="px-8 items-center justify-center flex-1"
    >
      {/* Visual Illustration Card */}
      <View
        style={{
          width: 140,
          height: 140,
          borderRadius: 28,
          backgroundColor: isDark ? 'rgba(30, 41, 59, 0.8)' : 'rgba(239, 246, 255, 0.9)',
          borderWidth: 1.5,
          borderColor: isDark ? 'rgba(51, 65, 85, 0.6)' : 'rgba(191, 219, 254, 0.8)',
          alignItems: 'center',
          justifyContent: 'center',
          marginBottom: 36,
          shadowColor: slide.accentColor,
          shadowOffset: { width: 0, height: 10 },
          shadowOpacity: isDark ? 0.35 : 0.15,
          shadowRadius: 20,
          elevation: 8,
        }}
      >
        <IconComponent size={64} color={slide.accentColor} strokeWidth={2.2} />
      </View>

      {/* Badge */}
      <View
        style={{
          paddingHorizontal: 14,
          paddingVertical: 6,
          borderRadius: 9999,
          backgroundColor: isDark ? 'rgba(30, 58, 138, 0.3)' : '#EFF6FF',
          borderWidth: 1,
          borderColor: isDark ? 'rgba(37, 99, 235, 0.4)' : '#BFDBFE',
          marginBottom: 16,
        }}
      >
        <Typography
          variant="caption"
          style={{
            color: isDark ? '#60A5FA' : '#2563EB',
            fontWeight: '700',
            letterSpacing: 0.8,
            textTransform: 'uppercase',
            fontSize: 12,
          }}
        >
          {slide.badge}
        </Typography>
      </View>

      {/* Title */}
      <Typography
        variant="h1"
        style={{
          textAlign: 'center',
          fontWeight: '800',
          fontSize: 26,
          lineHeight: 32,
          color: isDark ? '#FFFFFF' : '#0F172A',
          marginBottom: 12,
        }}
      >
        {slide.title}
      </Typography>

      {/* Subtitle */}
      <Typography
        variant="body"
        style={{
          textAlign: 'center',
          color: isDark ? '#94A3B8' : '#64748B',
          fontSize: 15,
          lineHeight: 22,
          paddingHorizontal: 8,
        }}
      >
        {slide.subtitle}
      </Typography>
    </View>
  );
}
