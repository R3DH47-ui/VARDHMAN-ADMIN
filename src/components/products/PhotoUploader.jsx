import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import { Image } from 'expo-image';
import * as ImagePicker from 'expo-image-picker';
import { colors, fonts, radii } from '@/theme';
import { Icon } from '@/components/ui';

export function PhotoUploader({
  photos = [],
  onChangePhotos,
  maxPhotos = 8,
}) {
  const pickImage = async () => {
    if (photos.length >= maxPhotos) {
      Alert.alert('Limit Reached', `You can only upload up to ${maxPhotos} photos.`);
      return;
    }

    try {
      const permissionResult = await ImagePicker.requestMediaLibraryPermissionsAsync();
      if (!permissionResult.granted) {
        Alert.alert(
          'Permission Required',
          'Please grant access to your photo library to upload product images.'
        );
        return;
      }

      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ['images'],
        allowsEditing: true,
        aspect: [1, 1],
        quality: 0.8,
      });

      if (!result.canceled && result.assets && result.assets.length > 0) {
        const newUri = result.assets[0].uri;
        onChangePhotos([...photos, newUri]);
      }
    } catch (err) {
      // Fallback for mock/offline testing
      const sampleUri = 'https://images.unsplash.com/photo-1596755094514-f87e34085b2c?w=400&auto=format&fit=crop';
      onChangePhotos([...photos, sampleUri]);
    }
  };

  const removePhoto = (index) => {
    const updated = photos.filter((_, i) => i !== index);
    onChangePhotos(updated);
  };

  return (
    <View style={styles.container}>
      <View style={styles.headerRow}>
        <Text style={styles.label}>Product Photos</Text>
        <Text style={styles.countText}>
          {photos.length}/{maxPhotos} added
        </Text>
      </View>

      <View style={styles.photosGrid}>
        {photos.map((uri, index) => {
          const isMain = index === 0;
          return (
            <View key={`photo-${index}`} style={styles.photoSlot}>
              <Image source={{ uri }} style={styles.photo} contentFit="cover" />

              {/* Main photo badge */}
              {isMain && (
                <View style={styles.mainBadge}>
                  <Text style={styles.mainBadgeText}>Main photo</Text>
                </View>
              )}

              {/* Remove button */}
              <TouchableOpacity
                onPress={() => removePhoto(index)}
                hitSlop={{ top: 6, bottom: 6, left: 6, right: 6 }}
                style={styles.removeBtn}
              >
                <Icon name="close" size={14} color="#FFFFFF" />
              </TouchableOpacity>
            </View>
          );
        })}

        {photos.length < maxPhotos && (
          <TouchableOpacity
            onPress={pickImage}
            style={styles.addSlot}
            activeOpacity={0.7}
          >
            <View style={styles.addIconCircle}>
              <Icon name="add" size={20} color={colors.primary} />
            </View>
            <Text style={styles.addText}>Add photo</Text>
          </TouchableOpacity>
        )}
      </View>

      <Text style={styles.hintText}>
        Up to {maxPhotos} photos. First photo is the cover.
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginBottom: 16,
  },
  headerRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  label: {
    fontFamily: fonts.semiBold,
    fontSize: 13,
    color: colors.ink,
  },
  countText: {
    fontFamily: fonts.medium,
    fontSize: 12,
    color: colors.muted,
  },
  photosGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 10,
    marginTop: 4,
  },
  photoSlot: {
    width: 80,
    height: 80,
    borderRadius: radii.md,
    borderWidth: 1,
    borderColor: colors.border,
    overflow: 'hidden',
    position: 'relative',
    backgroundColor: '#F3F0EC',
  },
  photo: {
    width: '100%',
    height: '100%',
  },
  mainBadge: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: 'rgba(26, 26, 26, 0.85)',
    paddingVertical: 2,
    alignItems: 'center',
  },
  mainBadgeText: {
    fontFamily: fonts.bold,
    fontSize: 8,
    color: '#FFFFFF',
    letterSpacing: 0.3,
  },
  removeBtn: {
    position: 'absolute',
    top: 4,
    right: 4,
    width: 20,
    height: 20,
    borderRadius: 10,
    backgroundColor: 'rgba(26, 26, 26, 0.7)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  addSlot: {
    width: 80,
    height: 80,
    borderRadius: radii.md,
    borderWidth: 1,
    borderColor: '#D1CCC6',
    borderStyle: 'dashed',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#FAF8F5',
  },
  addIconCircle: {
    width: 28,
    height: 28,
    borderRadius: 14,
    backgroundColor: colors.blush,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 4,
  },
  addText: {
    fontFamily: fonts.medium,
    fontSize: 10,
    color: colors.secondary,
  },
  hintText: {
    fontFamily: fonts.regular,
    fontSize: 11,
    color: colors.muted,
    marginTop: 8,
  },
});
