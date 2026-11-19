import React, { useState, useMemo } from 'react';
import {
  View,
  Text,
  FlatList,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';
import { useRouter } from 'expo-router';
import { colors, fonts, radii } from '@/theme';
import { TabHeaderCard } from '@/components/layout';
import { SearchBar, Chip, Icon, EmptyState } from '@/components/ui';
import { SchoolRow } from '@/components/schools/SchoolRow';
import { useAppStore } from '@/store/useAppStore';

const BOARDS = ['All boards', 'CBSE', 'ICSE', 'State Board'];

export function SchoolsScreen() {
  const router = useRouter();
  const schools = useAppStore((s) => s.schools);

  const [searchQuery, setSearchQuery] = useState('');
  const [selectedBoard, setSelectedBoard] = useState('All boards');

  const filteredSchools = useMemo(() => {
    let result = [...(schools || [])];

    if (selectedBoard !== 'All boards') {
      result = result.filter(
        (s) =>
          s.affiliationBoard &&
          s.affiliationBoard.toLowerCase().includes(selectedBoard.toLowerCase())
      );
    }

    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase().trim();
      result = result.filter(
        (s) =>
          s.name.toLowerCase().includes(q) ||
          (s.address && s.address.toLowerCase().includes(q)) ||
          (s.affiliationBoard && s.affiliationBoard.toLowerCase().includes(q))
      );
    }

    return result;
  }, [schools, selectedBoard, searchQuery]);

  return (
    <View style={styles.screen}>
      <TabHeaderCard />

      {/* Page Title Row */}
      <View style={styles.pageTitleRow}>
        <Text style={styles.pageTitle}>Partner Schools</Text>
        <Text style={styles.pageSubtitle}>
          {schools.length} affiliated institutions
        </Text>
      </View>

      {/* Search Bar */}
      <View style={styles.searchContainer}>
        <SearchBar
          value={searchQuery}
          onChangeText={setSearchQuery}
          placeholder="Search school name, board or address"
        />
      </View>

      {/* Board Filter Chips */}
      <View style={styles.filtersWrapper}>
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.chipsScroll}
        >
          {BOARDS.map((board) => (
            <Chip
              key={board}
              label={board}
              selected={selectedBoard === board}
              onPress={() => setSelectedBoard(board)}
              size="sm"
            />
          ))}
        </ScrollView>
      </View>

      {/* Results Header */}
      <View style={styles.resultsBar}>
        <Text style={styles.countText}>
          Showing {filteredSchools.length} {filteredSchools.length === 1 ? 'school' : 'schools'}
        </Text>
      </View>

      {/* Schools FlatList */}
      <FlatList
        data={filteredSchools}
        keyExtractor={(item) => String(item.id)}
        renderItem={({ item }) => (
          <SchoolRow
            school={item}
            onPress={() => {
              router.push({
                pathname: '/schools/new',
                params: { editId: item.id },
              });
            }}
          />
        )}
        ItemSeparatorComponent={() => <View style={styles.cardGap} />}
        ListHeaderComponent={() => <View style={styles.listTopPad} />}
        ListFooterComponent={() => <View style={styles.listBottomPad} />}
        ListEmptyComponent={
          <EmptyState
            icon="school"
            title="No schools found"
            subtitle="Try clearing filters or search terms."
            actionTitle="Reset Search"
            onAction={() => {
              setSearchQuery('');
              setSelectedBoard('All boards');
            }}
          />
        }
        contentContainerStyle={styles.listContent}
      />

      {/* Floating Action Button (FAB) */}
      <TouchableOpacity
        style={styles.fab}
        onPress={() => router.push('/schools/new')}
        activeOpacity={0.85}
      >
        <Icon name="add" size={20} color="#FFFFFF" />
        <Text style={styles.fabText}>ADD SCHOOL</Text>
      </TouchableOpacity>
    </View>
  );
}

export default SchoolsScreen;

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: colors.background,
  },
  searchContainer: {
    paddingHorizontal: 16,
    paddingTop: 12,
    paddingBottom: 8,
    backgroundColor: colors.surface,
  },
  filtersWrapper: {
    backgroundColor: colors.surface,
    paddingBottom: 10,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
  },
  chipsScroll: {
    paddingHorizontal: 16,
    gap: 8,
  },
  resultsBar: {
    paddingHorizontal: 16,
    paddingVertical: 10,
    backgroundColor: colors.background,
  },
  countText: {
    fontFamily: fonts.medium,
    fontSize: 12,
    color: colors.muted,
  },
  listContent: {
    paddingBottom: 4,
  },
  cardGap: {
    height: 12,
  },
  listTopPad: {
    height: 4,
  },
  listBottomPad: {
    height: 110,
  },
  fab: {
    position: 'absolute',
    bottom: 20,
    right: 20,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.primary,
    paddingVertical: 12,
    paddingHorizontal: 18,
    borderRadius: radii.full,
    gap: 6,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.25,
    shadowRadius: 6,
    elevation: 6,
  },
  fabText: {
    fontFamily: fonts.bold,
    fontSize: 12,
    color: '#FFFFFF',
    letterSpacing: 0.5,
  },
  pageTitleRow: {
    paddingHorizontal: 16,
    paddingTop: 4,
    paddingBottom: 10,
    backgroundColor: colors.background,
  },
  pageTitle: {
    fontFamily: fonts.bold,
    fontSize: 20,
    color: colors.ink,
    lineHeight: 24,
  },
  pageSubtitle: {
    fontFamily: fonts.regular,
    fontSize: 12,
    color: colors.muted,
    marginTop: 2,
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },
});
