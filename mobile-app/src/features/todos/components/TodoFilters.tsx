import { Search } from 'lucide-react-native';
import { Text, TouchableOpacity, useColorScheme, View } from 'react-native';
import { Input } from '@/components/ui/Input';

export type FilterStatus = 'all' | 'active' | 'completed';

interface TodoFiltersProps {
  filter: FilterStatus;
  onFilterChange: (status: FilterStatus) => void;
  searchQuery: string;
  onSearchChange: (query: string) => void;
}

export function TodoFilters({
  filter,
  onFilterChange,
  searchQuery,
  onSearchChange,
}: TodoFiltersProps) {
  const isDark = useColorScheme() === 'dark';

  const filterOptions: { label: string; value: FilterStatus }[] = [
    { label: 'All', value: 'all' },
    { label: 'Active', value: 'active' },
    { label: 'Completed', value: 'completed' },
  ];

  return (
    <View style={{ marginBottom: 16 }}>
      {/* Search Bar */}
      <Input
        placeholder="Search tasks..."
        value={searchQuery}
        onChangeText={onSearchChange}
        leftIcon={<Search size={16} color={isDark ? '#64748B' : '#94A3B8'} />}
        style={{ fontSize: 14 }}
      />

      {/* Filter Tabs */}
      <View
        style={{
          flexDirection: 'row',
          backgroundColor: isDark ? '#1E293B' : '#F1F5F9',
          borderRadius: 12,
          padding: 4,
        }}
      >
        {filterOptions.map((opt) => {
          const isSelected = filter === opt.value;
          return (
            <TouchableOpacity
              key={opt.value}
              onPress={() => onFilterChange(opt.value)}
              style={{
                flex: 1,
                paddingVertical: 8,
                borderRadius: 8,
                backgroundColor: isSelected ? (isDark ? '#334155' : '#FFFFFF') : 'transparent',
                alignItems: 'center',
                justifyContent: 'center',
                shadowColor: isSelected ? '#000' : 'transparent',
                shadowOffset: { width: 0, height: 2 },
                shadowOpacity: isSelected ? 0.1 : 0,
                shadowRadius: 4,
                elevation: isSelected ? 2 : 0,
              }}
              activeOpacity={0.8}
            >
              <Text
                style={{
                  fontSize: 13,
                  fontWeight: isSelected ? '700' : '500',
                  color: isSelected
                    ? isDark
                      ? '#FFFFFF'
                      : '#0F172A'
                    : isDark
                      ? '#94A3B8'
                      : '#64748B',
                }}
              >
                {opt.label}
              </Text>
            </TouchableOpacity>
          );
        })}
      </View>
    </View>
  );
}
