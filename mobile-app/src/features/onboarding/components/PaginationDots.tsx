import { View } from 'react-native';

interface PaginationDotsProps {
  total: number;
  activeIndex: number;
}

export function PaginationDots({ total, activeIndex }: PaginationDotsProps) {
  const dots = Array.from({ length: total }, (_, i) => `slide-dot-${i}`);

  return (
    <View className="flex-row items-center justify-center space-x-2 my-6">
      {dots.map((dotKey, index) => {
        const isActive = index === activeIndex;
        return (
          <View
            key={dotKey}
            className={`h-2.5 rounded-full transition-all duration-300 mx-1 ${
              isActive ? 'w-8 bg-blue-600 dark:bg-blue-500' : 'w-2.5 bg-slate-300 dark:bg-slate-700'
            }`}
          />
        );
      })}
    </View>
  );
}
