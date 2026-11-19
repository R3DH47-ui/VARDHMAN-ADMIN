import React, { useState, useMemo } from 'react';
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
import { Card, FormField, Toggle, BottomSheet, Icon } from '@/components/ui';
import { LogoUploader } from '@/components/schools/LogoUploader';
import { ClassChipGrid } from '@/components/schools/ClassChipGrid';
import { useAppStore } from '@/store/useAppStore';
import { AFFILIATION_BOARDS } from '@/constants';
import { ALL_CLASSES } from '@/utils/classes';

export default function AddSchoolScreen() {
  const router = useRouter();
  const params = useLocalSearchParams();
  const editId = params.editId;

  const schools = useAppStore((s) => s.schools);
  const addSchool = useAppStore((s) => s.addSchool);
  const updateSchool = useAppStore((s) => s.updateSchool);

  // If editing an existing school
  const existingSchool = useMemo(
    () => (editId ? schools.find((s) => s.id === editId) : null),
    [editId, schools]
  );

  // Form states (Pre-filled with Greenfield Public School defaults if empty or matches Figma screenshot)
  const [logoUri, setLogoUri] = useState(
    existingSchool?.logo ||
      'https://images.unsplash.com/photo-1546410531-bb4caa6b424d?w=200&auto=format&fit=crop'
  );
  const [schoolName, setSchoolName] = useState(
    existingSchool?.name || 'Greenfield Public School'
  );
  const [affiliationBoard, setAffiliationBoard] = useState(
    existingSchool?.affiliationBoard || 'CBSE (Central Board of Secondary Education)'
  );
  const [address, setAddress] = useState(
    existingSchool?.address ||
      'Plot 14, Sector 6, Dwarka, New Delhi - 110075'
  );
  const [selectedClasses, setSelectedClasses] = useState(
    existingSchool?.classes || [
      'Nursery',
      'LKG',
      'UKG',
      'Class 1',
      'Class 2',
      'Class 3',
      'Class 4',
      'Class 5',
      'Class 6',
      'Class 7',
      'Class 8',
    ]
  );
  const [showInCustomerApp, setShowInCustomerApp] = useState(
    existingSchool?.isVisibleInApp !== undefined
      ? existingSchool.isVisibleInApp
      : true
  );

  // Modal & submission state
  const [boardSheetVisible, setBoardSheetVisible] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSaveSchool = async () => {
    const trimmedName = schoolName.trim();
    if (!trimmedName) {
      Alert.alert('Validation Error', 'Please enter school name.');
      return;
    }
    if (trimmedName.length < 2) {
      Alert.alert('Validation Error', 'School name must be at least 2 characters.');
      return;
    }
    if (trimmedName.length > 150) {
      Alert.alert('Validation Error', 'School name must not exceed 150 characters.');
      return;
    }
    if (address.trim().length > 300) {
      Alert.alert('Validation Error', 'Address must not exceed 300 characters.');
      return;
    }
    if (selectedClasses.length === 0) {
      Alert.alert('Validation Error', 'Please select at least one class.');
      return;
    }

    setIsSubmitting(true);
    try {
      const schoolPayload = {
        name: trimmedName,
        affiliationBoard,
        address: address.trim(),
        classes: selectedClasses,
        classRangeDisplay: `${selectedClasses[0]} to ${selectedClasses[selectedClasses.length - 1]}`,
        logo: logoUri,
        isVisibleInApp: showInCustomerApp,
        productCount: existingSchool?.productCount || 0,
      };

      if (existingSchool) {
        await updateSchool(existingSchool.id, schoolPayload);
        Alert.alert('Success', 'School details updated!', [
          { text: 'OK', onPress: () => router.back() },
        ]);
      } else {
        await addSchool(schoolPayload);
        Alert.alert('Success', 'New school added successfully!', [
          { text: 'OK', onPress: () => router.back() },
        ]);
      }
    } catch (err) {
      Alert.alert('Error', err.message || 'Failed to save school.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      style={styles.screen}
    >
      <AppHeader
        title={existingSchool ? 'Admin Edit School' : 'Admin Add School'}
        subtitle="PORTAL ADMIN"
        showBack
        rightActions={
          <View style={styles.avatarCircle}>
            <Text style={styles.avatarText}>RK</Text>
          </View>
        }
      />

      <ScrollView
        style={styles.container}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* Card 1: Crest / Logo */}
        <Card style={styles.formCard}>
          <LogoUploader logoUri={logoUri} onChangeLogo={setLogoUri} />
        </Card>

        {/* Card 2: School Details */}
        <Card style={styles.formCard}>
          <FormField
            label="School Name"
            value={schoolName}
            onChangeText={setSchoolName}
            placeholder="e.g. Greenfield Public School"
            required
          />

          {/* Affiliation Board Picker */}
          <FormField
            label="Affiliation Board"
            value={affiliationBoard}
            editable={false}
            onPress={() => setBoardSheetVisible(true)}
            rightIcon={<Icon name="expand-more" size={20} color={colors.secondary} />}
          />

          {/* Address & Campus Location */}
          <FormField
            label="Address & Campus Location"
            value={address}
            onChangeText={setAddress}
            placeholder="Campus address, sector, city, pin code..."
            multiline
            numberOfLines={2}
          />
        </Card>

        {/* Card 3: Classes Covered */}
        <Card style={styles.formCard}>
          <Text style={styles.cardHeader}>Classes covered by this school</Text>
          <Text style={styles.cardSub}>Select every class this school has.</Text>

          <ClassChipGrid
            selectedClasses={selectedClasses}
            onChangeClasses={setSelectedClasses}
            availableClasses={ALL_CLASSES}
            showPresets={true}
          />
        </Card>

        {/* Card 4: Customer App Visibility */}
        <Card style={styles.formCard}>
          <Toggle
            value={showInCustomerApp}
            onValueChange={setShowInCustomerApp}
            label="Show in customer app"
            description="Make school and uniform catalog visible to parents"
          />
        </Card>
      </ScrollView>

      {/* Sticky Action Bar */}
      <StickyActionBar
        leftTitle="CANCEL"
        onLeftPress={() => router.back()}
        rightTitle="SAVE SCHOOL"
        onRightPress={handleSaveSchool}
        rightLoading={isSubmitting}
      />

      {/* Affiliation Board Bottom Sheet */}
      <BottomSheet
        visible={boardSheetVisible}
        onClose={() => setBoardSheetVisible(false)}
        title="Select Affiliation Board"
      >
        <View style={styles.boardList}>
          {AFFILIATION_BOARDS.map((board) => {
            const boardName = typeof board === 'object' ? (board.label || board.value) : board;
            const isSelected = boardName === affiliationBoard;
            return (
              <TouchableOpacity
                key={boardName}
                onPress={() => {
                  setAffiliationBoard(boardName);
                  setBoardSheetVisible(false);
                }}
                style={[
                  styles.boardOptionRow,
                  isSelected && styles.boardOptionRowActive,
                ]}
              >
                <Text
                  style={[
                    styles.boardOptionText,
                    isSelected && styles.boardOptionTextActive,
                  ]}
                >
                  {boardName}
                </Text>
                {isSelected && (
                  <Icon name="check" size={18} color={colors.primary} />
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
    marginBottom: 2,
  },
  cardSub: {
    fontFamily: fonts.regular,
    fontSize: 12,
    color: colors.muted,
    marginBottom: 12,
  },
  boardList: {
    paddingBottom: 10,
  },
  boardOptionRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 14,
    borderBottomWidth: 1,
    borderBottomColor: '#F3F0EC',
  },
  boardOptionRowActive: {
    backgroundColor: colors.blush,
    paddingHorizontal: 10,
    borderRadius: radii.md,
  },
  boardOptionText: {
    fontFamily: fonts.medium,
    fontSize: 14,
    color: colors.ink,
    flex: 1,
    marginRight: 8,
  },
  boardOptionTextActive: {
    fontFamily: fonts.bold,
    color: colors.primary,
  },
});
