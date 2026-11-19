export const ALL_CLASSES = Object.freeze([
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
  'Class 9',
  'Class 10',
  'Class 11',
  'Class 12',
]);

export const CLASS_PRESETS = Object.freeze([
  {
    id: 'nursery-class5',
    label: 'Nursery to Class 5',
    classes: ALL_CLASSES.slice(0, 8),
  },
  {
    id: 'nursery-class8',
    label: 'Nursery to Class 8',
    classes: ALL_CLASSES.slice(0, 11),
  },
  {
    id: 'nursery-class12',
    label: 'Nursery to Class 12',
    classes: ALL_CLASSES.slice(0, 15),
  },
  {
    id: 'class1-class12',
    label: 'Class 1 to Class 12',
    classes: ALL_CLASSES.slice(3, 15),
  },
]);

/**
 * Checks if a selected array of classes matches any predefined preset exactly
 * @param {string[]} selectedClasses
 * @returns {string | null}
 */
export function getMatchingPresetId(selectedClasses = []) {
  if (!selectedClasses || selectedClasses.length === 0) return null;
  const set = new Set(selectedClasses);
  for (const preset of CLASS_PRESETS) {
    if (
      preset.classes.length === selectedClasses.length &&
      preset.classes.every((c) => set.has(c))
    ) {
      return preset.id;
    }
  }
  return null;
}
