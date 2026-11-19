import React, { useState, useEffect, useMemo } from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
  Alert,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import { useRouter, useLocalSearchParams } from 'expo-router';
import { colors, fonts, radii } from '@/theme';
import { AppHeader, StickyActionBar } from '@/components/layout';
import {
  Card,
  FormField,
  SegmentedControl,
  Chip,
  Toggle,
  BottomSheet,
  Icon,
} from '@/components/ui';
import { PhotoUploader } from '@/components/products/PhotoUploader';
import { SizeStockTable } from '@/components/products/SizeStockTable';
import { ClassChipGrid } from '@/components/schools/ClassChipGrid';
import { useAppStore } from '@/store/useAppStore';
import { PRODUCT_CATEGORIES, GENDERS } from '@/constants';

export default function AddProductScreen() {
  const router = useRouter();
  const params = useLocalSearchParams();
  const editId = params.editId ? Number(params.editId) : null;

  const schools = useAppStore((s) => s.schools);
  const products = useAppStore((s) => s.products);
  const addProduct = useAppStore((s) => s.addProduct);
  const updateProduct = useAppStore((s) => s.updateProduct);

  // Existing product if editing
  const existingProduct = editId ? products.find((p) => p.id === editId) : null;

  // Form states
  const [photos, setPhotos] = useState(
    existingProduct?.photos || [
      'https://images.unsplash.com/photo-1596755094514-f87e34085b2c?w=400&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1576995853123-5a10305d93c0?w=400&auto=format&fit=crop',
    ]
  );
  const [schoolId, setSchoolId] = useState(
    existingProduct?.schoolId || schools[0]?.id || 'greenfield-public-school'
  );
  const [selectedClasses, setSelectedClasses] = useState(
    existingProduct?.classes || ['Class 3', 'Class 4', 'Class 5']
  );
  const [name, setName] = useState(existingProduct?.name || 'White Half Sleeve Shirt');
  const [category, setCategory] = useState(existingProduct?.category || 'Shirts and tops');
  const [gender, setGender] = useState(existingProduct?.gender || 'Boys');
  const [description, setDescription] = useState(
    existingProduct?.description ||
      'Formal poly-cotton uniform shirt with embroidered school crest on pocket. Breathable, easy-iron fabric.'
  );
  const [sellingPrice, setSellingPrice] = useState(
    String(existingProduct?.sellingPrice || existingProduct?.price || '449')
  );
  const [mrp, setMrp] = useState(String(existingProduct?.mrp || '520'));
  const [sizes, setSizes] = useState(
    existingProduct?.sizes || [
      { size: '22', stock: '34' },
      { size: '24', stock: '18' },
      { size: '26', stock: '3' },
      { size: '28', stock: '0' },
    ]
  );
  const [includeInSet, setIncludeInSet] = useState(
    existingProduct?.isSetItem !== undefined ? existingProduct.isSetItem : true
  );
  const [setItems, setSetItems] = useState([
    { id: '1', name: 'White Half Sleeve Shirt', price: '449' },
    { id: '2', name: 'Navy Trousers', price: '590' },
    { id: '3', name: 'School Belt', price: '120' },
  ]);

  // Modal states
  const [schoolSheetVisible, setSchoolSheetVisible] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Selected school data
  const selectedSchool = useMemo(
    () => schools.find((s) => s.id === schoolId) || schools[0],
    [schools, schoolId]
  );

  // Available classes for selected school
  const availableClasses = selectedSchool?.classes || [];

  const handlePublish = async () => {
    const trimmedName = name.trim();
    if (!trimmedName) {
      Alert.alert('Validation Error', 'Please enter an item name.');
      return;
    }
    if (trimmedName.length > 100) {
      Alert.alert('Validation Error', 'Item name must not exceed 100 characters.');
      return;
    }

    const numPrice = Number(sellingPrice);
    if (!sellingPrice.trim() || isNaN(numPrice) || numPrice <= 0 || numPrice > 100000) {
      Alert.alert('Validation Error', 'Please enter a valid selling price between ₹1 and ₹1,00,000.');
      return;
    }

    const numMrp = mrp.trim() ? Number(mrp) : numPrice;
    if (isNaN(numMrp) || numMrp <= 0 || numMrp > 100000) {
      Alert.alert('Validation Error', 'Please enter a valid MRP between ₹1 and ₹1,00,000.');
      return;
    }

    if (numPrice > numMrp) {
      Alert.alert(
        'Validation Error',
        `Selling price (₹${numPrice}) cannot be greater than MRP (₹${numMrp}).`
      );
      return;
    }

    if (description.trim().length > 1000) {
      Alert.alert('Validation Error', 'Description must not exceed 1000 characters.');
      return;
    }

    // Size validation: unique sizes, non-negative stock
    const seenSizes = new Set();
    for (const s of sizes) {
      const sKey = String(s.size || '').trim().toLowerCase();
      if (!sKey) {
        Alert.alert('Validation Error', 'All sizes in the inventory table must have a size label.');
        return;
      }
      if (seenSizes.has(sKey)) {
        Alert.alert('Validation Error', `Duplicate size "${s.size}" found. Each size must be unique.`);
        return;
      }
      seenSizes.add(sKey);

      const sStock = Number(s.stock);
      if (isNaN(sStock) || sStock < 0 || !Number.isInteger(sStock) || sStock > 50000) {
        Alert.alert('Validation Error', `Stock for size "${s.size}" must be a whole number between 0 and 50,000.`);
        return;
      }
    }

    setIsSubmitting(true);
    try {
      const productPayload = {
        name: trimmedName,
        schoolId,
        schoolName: selectedSchool?.name || '',
        category,
        gender,
        description: description.trim(),
        sellingPrice: numPrice,
        price: numPrice,
        mrp: numMrp,
        classes: selectedClasses,
        classesSummary: selectedClasses.length > 0
          ? `${selectedClasses[0]} - ${selectedClasses[selectedClasses.length - 1]}`
          : '',
        photos,
        image: photos[0] || null,
        sizes,
        isSetItem: includeInSet,
        totalStock: sizes.reduce((sum, s) => sum + (Number(s.stock) || 0), 0),
      };

      if (existingProduct) {
        await updateProduct(existingProduct.id, productPayload);
        Alert.alert('Success', 'Product updated successfully!', [
          { text: 'OK', onPress: () => router.back() },
        ]);
      } else {
        await addProduct(productPayload);
        Alert.alert('Success', 'Product published successfully!', [
          { text: 'OK', onPress: () => router.back() },
        ]);
      }
    } catch (err) {
      Alert.alert('Error', err.message || 'Failed to save product.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleSaveDraft = () => {
    Alert.alert('Draft Saved', 'Your product changes have been saved to local draft.', [
      { text: 'OK' },
    ]);
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      style={styles.screen}
    >
      <AppHeader
        title={existingProduct ? 'Admin Edit Product' : 'Admin Add Product'}
        subtitle={existingProduct ? existingProduct.name : 'New uniform item'}
        showBack
        rightActions={
          <View style={styles.headerRight}>
            <TouchableOpacity
              onPress={handleSaveDraft}
              hitSlop={{ top: 8, bottom: 8, left: 8, right: 8 }}
            >
              <Text style={styles.draftText}>Save draft</Text>
            </TouchableOpacity>
            <View style={styles.avatarCircle}>
              <Text style={styles.avatarText}>RK</Text>
            </View>
          </View>
        }
      />

      <ScrollView
        style={styles.container}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* Card 1: Product Photos */}
        <Card style={styles.formCard}>
          <PhotoUploader photos={photos} onChangePhotos={setPhotos} />
        </Card>

        {/* Card 2: School & Class Mapping */}
        <Card style={styles.formCard}>
          <Text style={styles.cardHeader}>School & Class Mapping</Text>

          {/* School Selector Dropdown */}
          <FormField
            label="School"
            value={selectedSchool?.name || ''}
            editable={false}
            onPress={() => setSchoolSheetVisible(true)}
            rightIcon={<Icon name="expand-more" size={20} color={colors.secondary} />}
          />

          {/* Class Chips (Scoped to selected school's classes) */}
          <Text style={styles.subLabel}>Applies to classes</Text>
          <ClassChipGrid
            selectedClasses={selectedClasses}
            onChangeClasses={setSelectedClasses}
            availableClasses={availableClasses}
            showPresets={false}
          />
        </Card>

        {/* Card 3: Item Details */}
        <Card style={styles.formCard}>
          <Text style={styles.cardHeader}>Item Details</Text>

          <FormField
            label="Item name"
            value={name}
            onChangeText={setName}
            placeholder="e.g. White Half Sleeve Shirt"
            required
          />

          {/* Category Horizontal Chips */}
          <Text style={styles.subLabel}>Category</Text>
          <View style={styles.categoryChipsGrid}>
            {PRODUCT_CATEGORIES.filter((c) => (typeof c === 'string' ? c.toLowerCase() !== 'all' : c.id !== 'all')).map((cat) => {
              const catLabel = typeof cat === 'object' ? (cat.label || cat.id) : cat;
              return (
                <Chip
                  key={catLabel}
                  label={catLabel}
                  selected={category === catLabel}
                  onPress={() => setCategory(catLabel)}
                  size="sm"
                  variant="dark"
                />
              );
            })}
          </View>

          {/* Gender Segmented Control */}
          <Text style={[styles.subLabel, { marginTop: 14 }]}>For</Text>
          <SegmentedControl
            options={GENDERS}
            value={gender}
            onChange={setGender}
          />

          {/* Description */}
          <FormField
            label="Description"
            value={description}
            onChangeText={setDescription}
            placeholder="Fabric specs, features, washing instructions..."
            multiline
            numberOfLines={3}
            style={{ marginTop: 14 }}
          />
        </Card>

        {/* Card 4: Price & Stock */}
        <Card style={styles.formCard}>
          <Text style={styles.cardHeader}>Price & Stock</Text>

          <View style={styles.priceRow}>
            <View style={styles.priceCol}>
              <FormField
                label="Selling Price (₹)"
                value={sellingPrice}
                onChangeText={setSellingPrice}
                keyboardType="numeric"
                prefix={<Text style={styles.currencyPrefix}>₹</Text>}
                required
              />
            </View>
            <View style={styles.priceCol}>
              <FormField
                label="MRP (₹)"
                value={mrp}
                onChangeText={setMrp}
                keyboardType="numeric"
                prefix={<Text style={styles.currencyPrefix}>₹</Text>}
              />
            </View>
          </View>

          {/* Size & Stock Table */}
          <SizeStockTable sizes={sizes} onChangeSizes={setSizes} />
        </Card>

        {/* Card 5: Complete Uniform Set */}
        <Card style={styles.formCard}>
          <Text style={styles.cardHeader}>Complete Uniform Set</Text>

          <Toggle
            value={includeInSet}
            onValueChange={setIncludeInSet}
            label="Include in complete set"
            description="Promote as a mandatory package for admission"
          />

          {includeInSet && (
            <View style={styles.setSection}>
              <Text style={styles.setSubHeader}>Items in this package:</Text>
              {setItems.map((item, idx) => (
                <View key={item.id} style={styles.setItemRow}>
                  <View style={styles.setItemLeft}>
                    <View style={styles.setBullet} />
                    <Text style={styles.setItemName}>{item.name}</Text>
                    <Text style={styles.setItemPrice}>• ₹{item.price}</Text>
                  </View>
                  <TouchableOpacity
                    onPress={() =>
                      setSetItems(setItems.filter((i) => i.id !== item.id))
                    }
                    hitSlop={{ top: 8, bottom: 8, left: 8, right: 8 }}
                  >
                    <Icon name="close" size={16} color={colors.muted} />
                  </TouchableOpacity>
                </View>
              ))}

              <TouchableOpacity
                style={styles.addItemBtn}
                onPress={() => {
                  Alert.prompt
                    ? Alert.prompt('Add Item', 'Enter uniform item name:', (val) => {
                        if (val) {
                          setSetItems([
                            ...setItems,
                            { id: String(Date.now()), name: val, price: '250' },
                          ]);
                        }
                      })
                    : setSetItems([
                        ...setItems,
                        {
                          id: String(Date.now()),
                          name: 'White Socks (Pair)',
                          price: '90',
                        },
                      ]);
                }}
              >
                <Icon name="add" size={16} color={colors.ink} />
                <Text style={styles.addItemBtnText}>+ ADD ITEM TO SET</Text>
              </TouchableOpacity>
            </View>
          )}
        </Card>
      </ScrollView>

      {/* Sticky Action Bar */}
      <StickyActionBar
        leftTitle="PREVIEW"
        onLeftPress={() =>
          Alert.alert('Preview', `Previewing ${name} for ${selectedSchool?.name}`)
        }
        rightTitle={existingProduct ? 'UPDATE ITEM' : 'PUBLISH ITEM'}
        onRightPress={handlePublish}
        rightLoading={isSubmitting}
      />

      {/* School Picker Bottom Sheet */}
      <BottomSheet
        visible={schoolSheetVisible}
        onClose={() => setSchoolSheetVisible(false)}
        title="Select School"
      >
        <View style={styles.schoolList}>
          {schools.map((school) => {
            const isSelected = school.id === schoolId;
            return (
              <TouchableOpacity
                key={school.id}
                onPress={() => {
                  setSchoolId(school.id);
                  // Reset selected classes to subset of this school
                  setSelectedClasses(school.classes.slice(0, 3));
                  setSchoolSheetVisible(false);
                }}
                style={[
                  styles.schoolOptionRow,
                  isSelected && styles.schoolOptionRowActive,
                ]}
              >
                <View>
                  <Text
                    style={[
                      styles.schoolOptionName,
                      isSelected && styles.schoolOptionNameActive,
                    ]}
                  >
                    {school.name}
                  </Text>
                  <Text style={styles.schoolOptionMeta}>
                    {school.affiliationBoard} • {school.productCount || 0} products
                  </Text>
                </View>
                {isSelected && (
                  <Icon name="check" size={20} color={colors.primary} />
                )}
              </TouchableOpacity>
            );
          })}
        </View>
      </BottomSheet>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: colors.background,
  },
  headerRight: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  draftText: {
    fontFamily: fonts.semiBold,
    fontSize: 12,
    color: colors.muted,
  },
  avatarCircle: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: '#E8E3DE',
    alignItems: 'center',
    justifyContent: 'center',
  },
  avatarText: {
    fontFamily: fonts.bold,
    fontSize: 12,
    color: colors.ink,
  },
  container: {
    flex: 1,
  },
  scrollContent: {
    padding: 16,
    gap: 16,
  },
  formCard: {
    marginBottom: 0,
  },
  cardHeader: {
    fontFamily: fonts.bold,
    fontSize: 15,
    color: colors.ink,
    marginBottom: 14,
  },
  subLabel: {
    fontFamily: fonts.semiBold,
    fontSize: 12,
    color: colors.secondary,
    textTransform: 'uppercase',
    letterSpacing: 0.5,
    marginBottom: 8,
  },
  categoryChipsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
    marginBottom: 6,
  },
  priceRow: {
    flexDirection: 'row',
    gap: 12,
  },
  priceCol: {
    flex: 1,
  },
  currencyPrefix: {
    fontFamily: fonts.bold,
    fontSize: 14,
    color: colors.secondary,
  },
  setSection: {
    marginTop: 14,
    paddingTop: 12,
    borderTopWidth: 1,
    borderTopColor: '#F3F0EC',
  },
  setSubHeader: {
    fontFamily: fonts.medium,
    fontSize: 12,
    color: colors.muted,
    marginBottom: 8,
  },
  setItemRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 8,
    paddingHorizontal: 10,
    backgroundColor: '#FAF8F5',
    borderRadius: radii.sm,
    marginBottom: 6,
  },
  setItemLeft: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  setBullet: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: colors.primary,
    marginRight: 8,
  },
  setItemName: {
    fontFamily: fonts.medium,
    fontSize: 13,
    color: colors.ink,
  },
  setItemPrice: {
    fontFamily: fonts.regular,
    fontSize: 12,
    color: colors.muted,
    marginLeft: 6,
  },
  addItemBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: '#D1CCC6',
    borderStyle: 'dashed',
    borderRadius: radii.md,
    paddingVertical: 10,
    marginTop: 8,
    gap: 6,
  },
  addItemBtnText: {
    fontFamily: fonts.bold,
    fontSize: 11,
    color: colors.ink,
    letterSpacing: 0.5,
  },
  schoolList: {
    paddingBottom: 10,
  },
  schoolOptionRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#F3F0EC',
  },
  schoolOptionRowActive: {
    backgroundColor: colors.blush,
    paddingHorizontal: 10,
    borderRadius: radii.md,
  },
  schoolOptionName: {
    fontFamily: fonts.bold,
    fontSize: 14,
    color: colors.ink,
    marginBottom: 2,
  },
  schoolOptionNameActive: {
    color: colors.primary,
  },
  schoolOptionMeta: {
    fontFamily: fonts.regular,
    fontSize: 11,
    color: colors.muted,
  },
});
