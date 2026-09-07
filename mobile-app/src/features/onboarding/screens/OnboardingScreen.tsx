import { useRouter } from 'expo-router';
import { useRef, useState } from 'react';
import {
  FlatList,
  type NativeScrollEvent,
  type NativeSyntheticEvent,
  TouchableOpacity,
  useColorScheme,
  useWindowDimensions,
  View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Button } from '@/components/ui/Button';
import { Typography } from '@/components/ui/Typography';
import { storage } from '@/core/storage/storage';
import { ROUTES } from '@/navigation/routes';
import { OnboardingSlide } from '../components/OnboardingSlide';
import { PaginationDots } from '../components/PaginationDots';
import type { OnboardingSlideData } from '../types';

const ONBOARDING_SLIDES: OnboardingSlideData[] = [
  {
    id: '1',
    badge: 'Smart & Focused',
    title: 'Organize Your Day Seamlessly',
    subtitle:
      'Capture tasks and prioritize your daily goals with speed, elegance, and zero clutter.',
    iconName: 'CheckCircle2',
    accentColor: '#3B82F6',
    iconBgColor: 'bg-blue-100 dark:bg-blue-900/40',
  },
  {
    id: '2',
    badge: 'Instant Productivity',
    title: 'Stay in the Flow Anywhere',
    subtitle: 'Lightning-fast interactions and instant sync keep your productivity effortless.',
    iconName: 'Zap',
    accentColor: '#F59E0B',
    iconBgColor: 'bg-amber-100 dark:bg-amber-900/40',
  },
  {
    id: '3',
    badge: 'Privacy & Security',
    title: 'Your Tasks, Safe & Secure',
    subtitle:
      'Robust architecture and data encryption ensure your information remains yours alone.',
    iconName: 'ShieldCheck',
    accentColor: '#10B981',
    iconBgColor: 'bg-emerald-100 dark:bg-emerald-900/40',
  },
];

interface OnboardingScreenProps {
  onComplete?: () => void;
}

export function OnboardingScreen({ onComplete }: OnboardingScreenProps) {
  const [activeIndex, setActiveIndex] = useState(0);
  const flatListRef = useRef<FlatList>(null);
  const { width } = useWindowDimensions();
  const isDark = useColorScheme() === 'dark';
  const router = useRouter();

  const handleScroll = (event: NativeSyntheticEvent<NativeScrollEvent>) => {
    const scrollPosition = event.nativeEvent.contentOffset.x;
    const index = Math.round(scrollPosition / width);
    setActiveIndex(index);
  };

  const completeOnboarding = async () => {
    await storage.setHasCompletedOnboarding(true);
    if (onComplete) {
      onComplete();
    } else {
      router.replace(ROUTES.HOME);
    }
  };

  const handleNext = () => {
    if (activeIndex < ONBOARDING_SLIDES.length - 1) {
      flatListRef.current?.scrollToIndex({
        index: activeIndex + 1,
        animated: true,
      });
    } else {
      completeOnboarding();
    }
  };

  const isLastSlide = activeIndex === ONBOARDING_SLIDES.length - 1;

  return (
    <SafeAreaView
      style={{
        flex: 1,
        backgroundColor: isDark ? '#090D16' : '#FFFFFF',
        justifyContent: 'space-between',
      }}
      className="flex-1 bg-white dark:bg-slate-950 justify-between"
    >
      {/* Top Bar / Skip Button */}
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'flex-end',
          alignItems: 'center',
          paddingHorizontal: 24,
          paddingTop: 8,
          height: 48,
        }}
      >
        {!isLastSlide ? (
          <TouchableOpacity
            onPress={completeOnboarding}
            style={{
              paddingHorizontal: 12,
              paddingVertical: 6,
              borderRadius: 9999,
            }}
            activeOpacity={0.7}
          >
            <Typography
              variant="body"
              style={{
                color: isDark ? '#64748B' : '#94A3B8',
                fontWeight: '600',
                fontSize: 14,
              }}
            >
              Skip
            </Typography>
          </TouchableOpacity>
        ) : null}
      </View>

      {/* Horizontal Carousel */}
      <View style={{ flex: 1, justifyContent: 'center' }}>
        <FlatList
          ref={flatListRef}
          data={ONBOARDING_SLIDES}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => <OnboardingSlide slide={item} />}
          horizontal
          pagingEnabled
          showsHorizontalScrollIndicator={false}
          onMomentumScrollEnd={handleScroll}
          bounces={false}
          style={{ flex: 1 }}
        />
      </View>

      {/* Bottom Controls */}
      <View
        style={{
          paddingHorizontal: 32,
          paddingBottom: 32,
          paddingTop: 16,
        }}
      >
        <PaginationDots total={ONBOARDING_SLIDES.length} activeIndex={activeIndex} />

        <Button
          label={isLastSlide ? 'Get Started' : 'Next'}
          onPress={handleNext}
          variant="primary"
          style={{
            width: '100%',
            borderRadius: 18,
            paddingVertical: 16,
            shadowColor: '#2563EB',
            shadowOffset: { width: 0, height: 6 },
            shadowOpacity: 0.3,
            shadowRadius: 12,
            elevation: 6,
          }}
        />
      </View>
    </SafeAreaView>
  );
}
