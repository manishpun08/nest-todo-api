import { CheckCircle2, Globe, LogOut, Moon, Shield, Sparkles } from 'lucide-react-native';
import { useState } from 'react';
import { ScrollView, Text, TouchableOpacity, useColorScheme, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Card } from '@/components/ui/Card';
import { ConfirmDialog } from '@/components/ui/ConfirmDialog';
import { Typography } from '@/components/ui/Typography';
import { useAuth } from '@/features/auth/hooks/useAuth';
import { useToast } from '@/providers/ToastProvider';

export default function ProfileScreen() {
  const isDark = useColorScheme() === 'dark';
  const { user, logout } = useAuth();
  const toast = useToast();
  const [showLogoutConfirm, setShowLogoutConfirm] = useState(false);

  const handleConfirmLogout = async () => {
    setShowLogoutConfirm(false);
    try {
      await logout();
      toast.showInfo('You have been signed out successfully.', 'Signed Out');
    } catch {
      toast.showError('Could not sign out completely', 'Notice');
    }
  };

  const initial = user?.name
    ? user.name.charAt(0).toUpperCase()
    : user?.email
      ? user.email.charAt(0).toUpperCase()
      : 'U';

  return (
    <SafeAreaView
      style={{
        flex: 1,
        backgroundColor: isDark ? '#090D16' : '#F8FAFC',
      }}
    >
      <ScrollView
        contentContainerStyle={{
          paddingHorizontal: 20,
          paddingTop: 16,
          paddingBottom: 40,
        }}
        showsVerticalScrollIndicator={false}
      >
        {/* Screen Header */}
        <View style={{ marginBottom: 20 }}>
          <Text
            style={{
              fontSize: 13,
              fontWeight: '600',
              color: isDark ? '#94A3B8' : '#64748B',
              textTransform: 'uppercase',
              letterSpacing: 0.5,
              marginBottom: 2,
            }}
          >
            Account & Preferences
          </Text>
          <Typography
            variant="h1"
            style={{
              fontSize: 26,
              fontWeight: '800',
              color: isDark ? '#FFFFFF' : '#0F172A',
            }}
          >
            My Profile
          </Typography>
        </View>

        {/* User Info Hero Card */}
        <Card
          style={{
            padding: 22,
            marginBottom: 20,
            alignItems: 'center',
            backgroundColor: isDark ? '#1E293B' : '#FFFFFF',
          }}
        >
          {/* Avatar Circle */}
          <View
            style={{
              width: 80,
              height: 80,
              borderRadius: 40,
              backgroundColor: '#2563EB',
              alignItems: 'center',
              justifyContent: 'center',
              marginBottom: 14,
              shadowColor: '#2563EB',
              shadowOffset: { width: 0, height: 6 },
              shadowOpacity: 0.35,
              shadowRadius: 12,
              elevation: 6,
            }}
          >
            <Text style={{ fontSize: 32, fontWeight: '800', color: '#FFFFFF' }}>{initial}</Text>
          </View>

          <Text
            style={{
              fontSize: 20,
              fontWeight: '800',
              color: isDark ? '#FFFFFF' : '#0F172A',
              marginBottom: 4,
            }}
          >
            {user?.name || 'Todo User'}
          </Text>

          <Text
            style={{
              fontSize: 14,
              color: isDark ? '#94A3B8' : '#64748B',
              marginBottom: 12,
            }}
          >
            {user?.email || 'user@example.com'}
          </Text>

          {/* Account Tier Badge */}
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              backgroundColor: isDark ? 'rgba(59, 130, 246, 0.2)' : '#EFF6FF',
              paddingHorizontal: 12,
              paddingVertical: 5,
              borderRadius: 20,
              borderWidth: 1,
              borderColor: isDark ? 'rgba(59, 130, 246, 0.4)' : '#BFDBFE',
            }}
          >
            <Sparkles size={14} color="#3B82F6" style={{ marginRight: 6 }} />
            <Text style={{ fontSize: 12, fontWeight: '700', color: '#3B82F6' }}>
              Full Access Sync
            </Text>
          </View>
        </Card>

        {/* System & Sync Status Card */}
        <Card style={{ padding: 18, marginBottom: 20 }}>
          <Text
            style={{
              fontSize: 15,
              fontWeight: '700',
              color: isDark ? '#FFFFFF' : '#0F172A',
              marginBottom: 14,
            }}
          >
            System Status
          </Text>

          <View style={{ gap: 14 }}>
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                alignItems: 'center',
              }}
            >
              <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                <Globe size={18} color="#3B82F6" style={{ marginRight: 10 }} />
                <Text style={{ fontSize: 14, color: isDark ? '#E2E8F0' : '#334155' }}>
                  Cloud Synchronization
                </Text>
              </View>
              <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                <CheckCircle2 size={16} color="#10B981" style={{ marginRight: 4 }} />
                <Text style={{ fontSize: 13, fontWeight: '600', color: '#10B981' }}>Connected</Text>
              </View>
            </View>

            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                alignItems: 'center',
              }}
            >
              <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                <Moon size={18} color="#A855F7" style={{ marginRight: 10 }} />
                <Text style={{ fontSize: 14, color: isDark ? '#E2E8F0' : '#334155' }}>
                  Theme Mode
                </Text>
              </View>
              <Text
                style={{ fontSize: 13, fontWeight: '600', color: isDark ? '#94A3B8' : '#64748B' }}
              >
                {isDark ? 'Dark Theme' : 'Light Theme'}
              </Text>
            </View>

            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                alignItems: 'center',
              }}
            >
              <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                <Shield size={18} color="#10B981" style={{ marginRight: 10 }} />
                <Text style={{ fontSize: 14, color: isDark ? '#E2E8F0' : '#334155' }}>
                  Data Protection
                </Text>
              </View>
              <Text style={{ fontSize: 13, fontWeight: '600', color: '#10B981' }}>Active</Text>
            </View>
          </View>
        </Card>

        {/* Sign Out Button */}
        <TouchableOpacity
          onPress={() => setShowLogoutConfirm(true)}
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'center',
            backgroundColor: isDark ? 'rgba(239, 68, 68, 0.12)' : '#FEF2F2',
            borderWidth: 1.5,
            borderColor: isDark ? 'rgba(239, 68, 68, 0.3)' : '#FECACA',
            paddingVertical: 16,
            borderRadius: 16,
            marginBottom: 24,
          }}
          activeOpacity={0.7}
        >
          <LogOut size={18} color="#EF4444" style={{ marginRight: 8 }} />
          <Text style={{ fontSize: 15, fontWeight: '700', color: '#EF4444' }}>
            Sign Out of Account
          </Text>
        </TouchableOpacity>

        {/* App Footer */}
        <View style={{ alignItems: 'center' }}>
          <Text style={{ fontSize: 12, color: isDark ? '#64748B' : '#94A3B8' }}>
            Todo API & Mobile Monorepo v1.0.0
          </Text>
        </View>
      </ScrollView>

      {/* Sign Out Confirmation Modal */}
      <ConfirmDialog
        visible={showLogoutConfirm}
        title="Sign Out"
        message="Are you sure you want to sign out? You will need your email and password to log back in."
        confirmText="Sign Out"
        cancelText="Cancel"
        isDestructive
        onConfirm={handleConfirmLogout}
        onCancel={() => setShowLogoutConfirm(false)}
      />
    </SafeAreaView>
  );
}
