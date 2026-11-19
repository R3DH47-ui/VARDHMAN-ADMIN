import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { colors, fonts, radii } from '@/theme';

export function OverviewCard({
  actionCount = 2,
  greeting = 'Good morning, Rakesh',
  subtitle = 'High dispatch volume scheduled for Greenfield & DAV today.',
  progressPercent = 76,
}) {
  return (
    <View style={styles.card}>
      <View style={styles.headerRow}>
        <Text style={styles.microHeader}>OPERATIONAL OVERVIEW</Text>
        <View style={styles.actionPill}>
          <Text style={styles.actionPillText}>{actionCount} ACTION ITEMS</Text>
        </View>
      </View>

      <Text style={styles.greeting}>{greeting}</Text>
      <Text style={styles.subtitle}>{subtitle}</Text>

      <View style={styles.progressContainer}>
        <View style={styles.progressHeader}>
          <Text style={styles.progressLabel}>Dispatch Target</Text>
          <Text style={styles.progressValue}>{progressPercent}% Target</Text>
        </View>
        <View style={styles.progressTrack}>
          <View style={[styles.progressFill, { width: `${progressPercent}%` }]} />
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: colors.heroCardBg,
    borderRadius: radii.card,
    padding: 18,
    marginHorizontal: 16,
    marginTop: 14,
    marginBottom: 16,
  },
  headerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 12,
  },
  microHeader: {
    fontFamily: fonts.bold,
    fontSize: 10,
    color: colors.heroMuted,
    letterSpacing: 1.2,
  },
  actionPill: {
    backgroundColor: colors.heroActionPillBg,
    borderColor: colors.heroActionPillBorder,
    borderWidth: 1,
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: radii.full,
  },
  actionPillText: {
    fontFamily: fonts.bold,
    fontSize: 9,
    color: colors.heroActionPillText,
    letterSpacing: 0.5,
  },
  greeting: {
    fontFamily: fonts.bold,
    fontSize: 18,
    color: '#FFFFFF',
    marginBottom: 4,
  },
  subtitle: {
    fontFamily: fonts.regular,
    fontSize: 12,
    color: colors.heroSub,
    lineHeight: 17,
    marginBottom: 16,
  },
  progressContainer: {
    marginTop: 4,
  },
  progressHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 6,
  },
  progressLabel: {
    fontFamily: fonts.medium,
    fontSize: 11,
    color: colors.heroMuted,
  },
  progressValue: {
    fontFamily: fonts.semiBold,
    fontSize: 11,
    color: '#FFFFFF',
  },
  progressTrack: {
    height: 6,
    backgroundColor: colors.progressTrack,
    borderRadius: 3,
    overflow: 'hidden',
  },
  progressFill: {
    height: '100%',
    backgroundColor: colors.primary,
    borderRadius: 3,
  },
});
