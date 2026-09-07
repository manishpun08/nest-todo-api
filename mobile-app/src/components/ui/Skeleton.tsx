import { useEffect, useRef } from 'react';
import { Animated, type DimensionValue, StyleSheet, useColorScheme, View } from 'react-native';

export interface SkeletonProps {
  width?: DimensionValue;
  height?: DimensionValue;
  borderRadius?: number;
  style?: object;
}

export function Skeleton({ width = '100%', height = 20, borderRadius = 8, style }: SkeletonProps) {
  const isDark = useColorScheme() === 'dark';
  const opacityAnim = useRef(new Animated.Value(0.3)).current;

  useEffect(() => {
    const pulse = Animated.loop(
      Animated.sequence([
        Animated.timing(opacityAnim, {
          toValue: 0.8,
          duration: 800,
          useNativeDriver: true,
        }),
        Animated.timing(opacityAnim, {
          toValue: 0.3,
          duration: 800,
          useNativeDriver: true,
        }),
      ]),
    );
    pulse.start();

    return () => pulse.stop();
  }, [opacityAnim]);

  return (
    <Animated.View
      style={[
        styles.skeleton,
        {
          width,
          height,
          borderRadius,
          backgroundColor: isDark ? '#334155' : '#E2E8F0',
          opacity: opacityAnim,
        },
        style,
      ]}
    />
  );
}

export function TodoCardSkeleton() {
  const isDark = useColorScheme() === 'dark';

  return (
    <View
      style={[
        styles.cardSkeleton,
        {
          backgroundColor: isDark ? '#1E293B' : '#FFFFFF',
          borderColor: isDark ? '#334155' : '#E2E8F0',
        },
      ]}
    >
      <View style={{ flexDirection: 'row', alignItems: 'center', gap: 12 }}>
        <Skeleton width={24} height={24} borderRadius={12} />
        <View style={{ flex: 1, gap: 8 }}>
          <Skeleton width="75%" height={16} borderRadius={6} />
          <Skeleton width="45%" height={12} borderRadius={4} />
        </View>
        <Skeleton width={32} height={32} borderRadius={8} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  skeleton: {
    overflow: 'hidden',
  },
  cardSkeleton: {
    borderRadius: 16,
    borderWidth: 1,
    padding: 16,
    marginBottom: 10,
  },
});
