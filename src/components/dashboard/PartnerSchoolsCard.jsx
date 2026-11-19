import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { useRouter } from 'expo-router';
import { colors, fonts, radii } from '@/theme';
import { Card, Icon } from '@/components/ui';

export function PartnerSchoolsCard({ schools = [] }) {
  const router = useRouter();

  return (
    <Card style={styles.card} padding={0}>
      <View style={styles.header}>
        <Text style={styles.title}>
          Partner Schools ({schools.length} Active)
        </Text>
        <TouchableOpacity
          onPress={() => router.push('/schools/new')}
          hitSlop={{ top: 8, bottom: 8, left: 8, right: 8 }}
        >
          <Text style={styles.addSchoolBtn}>+ ADD SCHOOL</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.list}>
        {schools.map((school, index) => {
          const isLast = index === schools.length - 1;
          return (
            <TouchableOpacity
              key={school.id}
              style={[styles.schoolRow, !isLast && styles.borderBottom]}
              onPress={() => {
                router.push({
                  pathname: '/(tabs)/products',
                  params: { schoolId: school.id },
                });
              }}
              activeOpacity={0.7}
            >
              <View style={styles.iconCircle}>
                <Icon name="school" size={18} color={colors.primary} />
              </View>

              <View style={styles.schoolInfo}>
                <Text style={styles.schoolName}>{school.name}</Text>
                <Text style={styles.schoolMeta}>
                  {school.classRangeDisplay || school.classRange || (school.classes?.length ? `${school.classes[0]} to ${school.classes[school.classes.length - 1]}` : '')} • {school.productCount || 0} products
                </Text>
              </View>

              <Icon name="chevron-right" size={20} color={colors.muted} />
            </TouchableOpacity>
          );
        })}
      </View>
    </Card>
  );
}

const styles = StyleSheet.create({
  card: {
    marginHorizontal: 16,
    marginBottom: 24,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingTop: 16,
    paddingBottom: 12,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
  },
  title: {
    fontFamily: fonts.bold,
    fontSize: 15,
    color: colors.ink,
  },
  addSchoolBtn: {
    fontFamily: fonts.bold,
    fontSize: 12,
    color: colors.primary,
    letterSpacing: 0.5,
  },
  list: {
    paddingHorizontal: 16,
  },
  schoolRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
  },
  borderBottom: {
    borderBottomWidth: 1,
    borderBottomColor: '#F3F0EC',
  },
  iconCircle: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: colors.blush,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },
  schoolInfo: {
    flex: 1,
    marginRight: 8,
  },
  schoolName: {
    fontFamily: fonts.bold,
    fontSize: 13,
    color: colors.ink,
    marginBottom: 2,
  },
  schoolMeta: {
    fontFamily: fonts.regular,
    fontSize: 12,
    color: colors.muted,
  },
});
