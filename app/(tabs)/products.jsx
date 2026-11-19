import React, { useState, useMemo } from 'react';
import {
  View,
  Text,
  FlatList,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';
import { useRouter, useLocalSearchParams } from 'expo-router';
import { colors, fonts, radii } from '@/theme';
import { TabHeaderCard } from '@/components/layout';
import {
  SearchBar,
  Chip,
  Icon,
  EmptyState,
  BottomSheet,
} from '@/components/ui';
import { ProductRow } from '@/components/products/ProductRow';
import { useAppStore } from '@/store/useAppStore';
import { PRODUCT_CATEGORIES } from '@/constants';

const SORT_OPTIONS = [
  { id: 'newest', label: 'Newest' },
  { id: 'price_asc', label: 'Price: Low to High' },
  { id: 'price_desc', label: 'Price: High to Low' },
  { id: 'name_asc', label: 'Name: A to Z' },
];

export function ProductListScreen() {
  const router = useRouter();
  const params = useLocalSearchParams();

  const products = useAppStore((s) => s.products);
  const schools = useAppStore((s) => s.schools);

  const [searchQuery, setSearchQuery] = useState('');
  const [selectedSchoolId, setSelectedSchoolId] = useState(params.schoolId || 'all');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [sortBy, setSortBy] = useState('newest');
  const [sortSheetVisible, setSortSheetVisible] = useState(false);

  // Filtered & Sorted products
  const filteredProducts = useMemo(() => {
    let result = [...(products || [])];

    // School filter
    if (selectedSchoolId !== 'all') {
      result = result.filter(
        (p) =>
          p.schoolId === selectedSchoolId ||
          (p.school && p.school.toLowerCase().includes(selectedSchoolId.toLowerCase()))
      );
    }

    // Category filter
    if (selectedCategory && selectedCategory.toLowerCase() !== 'all') {
      result = result.filter(
        (p) =>
          p.category &&
          (p.category.toLowerCase() === selectedCategory.toLowerCase() ||
           p.category.toLowerCase().includes(selectedCategory.toLowerCase()))
      );
    }

    // Search query
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase().trim();
      result = result.filter(
        (p) =>
          (p.name || '').toLowerCase().includes(q) ||
          (p.schoolName || p.school || '').toLowerCase().includes(q) ||
          (p.sku || '').toLowerCase().includes(q) ||
          (p.description || '').toLowerCase().includes(q)
      );
    }

    // Sort
    result.sort((a, b) => {
      const priceA = a.sellingPrice || a.price || 0;
      const priceB = b.sellingPrice || b.price || 0;

      switch (sortBy) {
        case 'price_asc':
          return priceA - priceB;
        case 'price_desc':
          return priceB - priceA;
        case 'name_asc':
          return (a.name || '').localeCompare(b.name || '');
        case 'newest':
        default:
          return String(b.id || '').localeCompare(String(a.id || ''));
      }
    });

    return result;
  }, [products, selectedSchoolId, selectedCategory, searchQuery, sortBy]);

  const activeSortLabel =
    SORT_OPTIONS.find((s) => s.id === sortBy)?.label || 'Newest';

  return (
    <View style={styles.screen}>
      <TabHeaderCard />

      {/* Page Title Row */}
      <View style={styles.pageTitleRow}>
        <Text style={styles.pageTitle}>Products</Text>
        <Text style={styles.pageSubtitle}>
          {products.length} {products.length === 1 ? 'item' : 'items'} catalog
        </Text>
      </View>

      {/* Search Bar */}
      <View style={styles.searchContainer}>
        <SearchBar
          value={searchQuery}
          onChangeText={setSearchQuery}
          placeholder="Search items, schools or SKU"
        />
      </View>

      {/* School Filter Chips */}
      <View style={styles.filtersWrapper}>
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.chipsScroll}
        >
          <Chip
            label="All schools"
            selected={selectedSchoolId === 'all'}
            onPress={() => setSelectedSchoolId('all')}
            size="sm"
          />
          {schools.map((s) => (
            <Chip
              key={s.id}
              label={s.name}
              selected={selectedSchoolId === s.id}
              onPress={() => setSelectedSchoolId(s.id)}
              size="sm"
            />
          ))}
        </ScrollView>
      </View>

      {/* Category Filter Chips */}
      <View style={styles.categoriesWrapper}>
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.chipsScroll}
        >
          {PRODUCT_CATEGORIES.map((cat) => {
            const catLabel = typeof cat === 'object' ? (cat.label || cat.id) : cat;
            const isSelected = selectedCategory === catLabel;
            return (
              <Chip
                key={catLabel}
                label={catLabel}
                selected={isSelected}
                onPress={() => setSelectedCategory(catLabel)}
                size="sm"
                variant="outline"
                textStyle={
                  isSelected
                    ? { color: colors.primary, fontFamily: fonts.bold }
                    : undefined
                }
                style={
                  isSelected
                    ? { backgroundColor: colors.blush, borderColor: colors.primary }
                    : undefined
                }
              />
            );
          })}
        </ScrollView>
      </View>

      {/* Showing count & Sort bar */}
      <View style={styles.resultsBar}>
        <Text style={styles.countText}>
          Showing {filteredProducts.length} items
        </Text>
        <TouchableOpacity
          onPress={() => setSortSheetVisible(true)}
          style={styles.sortButton}
          activeOpacity={0.7}
        >
          <Text style={styles.sortLabel}>Sort: {activeSortLabel}</Text>
          <Icon name="expand-more" size={16} color={colors.secondary} />
        </TouchableOpacity>
      </View>

      {/* Products FlatList */}
      <FlatList
        data={filteredProducts}
        keyExtractor={(item) => String(item.id)}
        renderItem={({ item }) => (
          <ProductRow
            product={item}
            onPress={() => {
              // Can navigate to edit screen or view details
              router.push({
                pathname: '/products/new',
                params: { editId: item.id },
              });
            }}
          />
        )}
        ListEmptyComponent={
          <EmptyState
            icon="inventory"
            title="No matching products"
            subtitle="Try clearing filters or changing your search terms."
            actionTitle="Reset Filters"
            onAction={() => {
              setSearchQuery('');
              setSelectedSchoolId('all');
              setSelectedCategory('All');
            }}
          />
        }
        contentContainerStyle={styles.listContent}
      />

      {/* Floating Action Button (FAB) */}
      <TouchableOpacity
        style={styles.fab}
        onPress={() => router.push('/products/new')}
        activeOpacity={0.85}
      >
        <Icon name="add" size={20} color="#FFFFFF" />
        <Text style={styles.fabText}>ADD PRODUCT</Text>
      </TouchableOpacity>

      {/* Sort Options Bottom Sheet */}
      <BottomSheet
        visible={sortSheetVisible}
        onClose={() => setSortSheetVisible(false)}
        title="Sort Products By"
      >
        <View style={styles.sortList}>
          {SORT_OPTIONS.map((opt) => {
            const isSelected = opt.id === sortBy;
            return (
              <TouchableOpacity
                key={opt.id}
                onPress={() => {
                  setSortBy(opt.id);
                  setSortSheetVisible(false);
                }}
                style={[
                  styles.sortOptionRow,
                  isSelected && styles.sortOptionRowActive,
                ]}
              >
                <Text
                  style={[
                    styles.sortOptionText,
                    isSelected && styles.sortOptionTextActive,
                  ]}
                >
                  {opt.label}
                </Text>
                {isSelected && (
                  <Icon name="check" size={18} color={colors.primary} />
                )}
              </TouchableOpacity>
            );
          })}
        </View>
      </BottomSheet>
    </View>
  );
}

export default ProductListScreen;

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: colors.background,
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
  searchContainer: {
    paddingHorizontal: 16,
    paddingTop: 12,
    paddingBottom: 8,
    backgroundColor: colors.surface,
  },
  filtersWrapper: {
    backgroundColor: colors.surface,
    paddingBottom: 8,
  },
  categoriesWrapper: {
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
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 10,
    backgroundColor: colors.background,
  },
  countText: {
    fontFamily: fonts.medium,
    fontSize: 12,
    color: colors.muted,
  },
  sortButton: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 2,
  },
  sortLabel: {
    fontFamily: fonts.semiBold,
    fontSize: 12,
    color: colors.secondary,
  },
  listContent: {
    paddingBottom: 90, // Leave space for FAB
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
  sortList: {
    paddingBottom: 10,
  },
  sortOptionRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 14,
    borderBottomWidth: 1,
    borderBottomColor: '#F3F0EC',
  },
  sortOptionRowActive: {
    backgroundColor: colors.blush,
    paddingHorizontal: 10,
    borderRadius: radii.md,
  },
  sortOptionText: {
    fontFamily: fonts.medium,
    fontSize: 14,
    color: colors.ink,
  },
  sortOptionTextActive: {
    fontFamily: fonts.bold,
    color: colors.primary,
  },
});
