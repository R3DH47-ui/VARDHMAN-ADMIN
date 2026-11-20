/**
 * Product DTO Mapper.
 * Converts between backend API shape and UI model.
 * When the backend uses different field names, change only here.
 */

/**
 * Map a backend product response to the UI model.
 * @param {Object} dto - Raw product object from API
 * @returns {Object} UI product model
 */
export function mapProductFromApi(dto) {
  if (!dto) return dto;
  return {
    id: dto.id ?? dto._id ?? '',
    name: dto.name ?? '',
    schoolId: dto.schoolId ?? dto.school_id ?? '',
    school: dto.school ?? dto.schoolName ?? '',
    classes: dto.classes ?? dto.classRange ?? '',
    price: Number(dto.price) || 0,
    mrp: Number(dto.mrp) || 0,
    stock: Number(dto.stock) || 0,
    draft: Boolean(dto.draft ?? dto.isDraft),
    category: dto.category ?? '',
    gender: dto.gender ?? 'Unisex',
    sku: dto.sku ?? '',
    image: dto.image ?? dto.imageUrl ?? (Array.isArray(dto.photos) ? dto.photos[0] : null),
    photos: Array.isArray(dto.photos) ? dto.photos : (dto.image ? [dto.image] : []),
    description: dto.description ?? '',
    sizes: Array.isArray(dto.sizes)
      ? dto.sizes.map((s) => ({
          size: Number(s.size) || 0,
          stock: Number(s.stock) || 0,
        }))
      : [],
  };
}

/**
 * Map a UI product form payload to the backend API shape.
 * @param {Object} form - UI form values
 * @returns {Object} API request payload
 */
export function mapProductToApi(form) {
  if (!form) return form;
  return {
    name: (form.name || '').trim(),
    schoolId: form.schoolId || '',
    school: form.school || '',
    classes: form.classes || '',
    price: Number(form.price) || 0,
    mrp: Number(form.mrp) || 0,
    stock: Number(form.stock) || 0,
    draft: Boolean(form.draft),
    category: form.category || '',
    gender: form.gender || 'Unisex',
    sku: (form.sku || '').trim(),
    image: form.image || form.photos?.[0] || null,
    photos: Array.isArray(form.photos) ? form.photos : (form.image ? [form.image] : []),
    description: (form.description || '').trim(),
    sizes: Array.isArray(form.sizes) ? form.sizes : [],
  };
}
