import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import { Image } from 'expo-image';
import * as ImagePicker from 'expo-image-picker';
import { colors, fonts, radii } from '@/theme';
import { Icon } from '@/components/ui';

export function LogoUploader({ logoUri, onChangeLogo }) {
  const pickLogo = async () => {
    try {
      const perm = await ImagePicker.requestMediaLibraryPermissionsAsync();
      if (!perm.granted) {
        Alert.alert('Permission Denied', 'Please grant photo library access.');
        return;
      }

      const res = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ['images'],
        allowsEditing: true,
        aspect: [1, 1],
        quality: 0.9,
      });

      if (!res.canceled && res.assets && res.assets.length > 0) {
        onChangeLogo(res.assets[0].uri);
      }
    } catch (e) {
      // Mock fallback
      onChangeLogo('https://images.unsplash.com/photo-1546410531-bb4caa6b424d?w=200&auto=format&fit=crop');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.label}>Institutional Crest / Logo</Text>

      {logoUri ? (
        <View style={styles.previewContainer}>
          <Image source={{ uri: logoUri }} style={styles.previewImage} contentFit="contain" />
          <View style={styles.previewMeta}>
            <Text style={styles.uploadedText}>Crest uploaded</Text>
            <TouchableOpacity onPress={pickLogo} style={styles.changeBtn}>
              <Text style={styles.changeText}>Change</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => onChangeLogo(null)} style={styles.removeBtn}>
              <Text style={styles.removeText}>Remove</Text>
            </TouchableOpacity>
          </View>
        </View>
      ) : (
        <TouchableOpacity onPress={pickLogo} style={styles.uploadBox} activeOpacity={0.7}>
          <View style={styles.iconCircle}>
            <Icon name="cloud-upload" size={24} color={colors.primary} />
          </View>
          <Text style={styles.uploadTitle}>Institutional Crest / Logo</Text>
          <Text style={styles.uploadSub}>PNG or JPG, up to 2 MB</Text>
          <Text style={styles.uploadHint}>Used on student spec-sheets & storefront</Text>
        </TouchableOpacity>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginBottom: 16,
  },
  label: {
    fontFamily: fonts.semiBold,
    fontSize: 12,
    color: colors.secondary,
    textTransform: 'uppercase',
    letterSpacing: 0.5,
    marginBottom: 8,
  },
  uploadBox: {
    borderWidth: 1,
    borderColor: '#D1CCC6',
    borderStyle: 'dashed',
    borderRadius: radii.md,
    backgroundColor: '#FAF8F5',
    padding: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  iconCircle: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: colors.blush,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 10,
  },
  uploadTitle: {
    fontFamily: fonts.bold,
    fontSize: 13,
    color: colors.ink,
    marginBottom: 2,
  },
  uploadSub: {
    fontFamily: fonts.regular,
    fontSize: 11,
    color: colors.muted,
    marginBottom: 4,
  },
  uploadHint: {
    fontFamily: fonts.regular,
    fontSize: 10,
    color: '#9CA3AF',
  },
  previewContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.surface,
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: radii.md,
    padding: 12,
    gap: 14,
  },
  previewImage: {
    width: 64,
    height: 64,
    borderRadius: radii.md,
    backgroundColor: '#F3F0EC',
  },
  previewMeta: {
    flex: 1,
  },
  uploadedText: {
    fontFamily: fonts.bold,
    fontSize: 13,
    color: colors.ink,
    marginBottom: 4,
  },
  changeBtn: {
    paddingVertical: 2,
  },
  changeText: {
    fontFamily: fonts.semiBold,
    fontSize: 12,
    color: colors.primary,
  },
  removeBtn: {
    paddingVertical: 2,
    marginTop: 2,
  },
  removeText: {
    fontFamily: fonts.regular,
    fontSize: 11,
    color: colors.error,
  },
});
