/**
 * School DTO Mapper.
 * Converts between backend API shape and UI model.
 */

export function mapSchoolFromApi(dto) {
  if (!dto) return dto;
  return {
    id: dto.id ?? dto._id ?? '',
    name: dto.name ?? '',
    shortName: dto.shortName ?? dto.short_name ?? '',
    classRange: dto.classRange ?? dto.class_range ?? '',
    classRangeDisplay: dto.classRangeDisplay ?? dto.classRange ?? '',
    classes: Array.isArray(dto.classes) ? dto.classes : [],
    productCount: Number(dto.productCount ?? dto.product_count) || 0,
    affiliationBoard: dto.affiliationBoard ?? dto.affiliation_board ?? '',
    affiliationCode: dto.affiliationCode ?? dto.affiliation_code ?? '',
    address: dto.address ?? '',
    showInCustomerApp: Boolean(dto.showInCustomerApp ?? dto.show_in_customer_app ?? true),
    logoUri: dto.logoUri ?? dto.logo_url ?? null,
  };
}

export function mapSchoolToApi(form) {
  if (!form) return form;
  return {
    name: (form.name || '').trim(),
    shortName: (form.shortName || '').trim(),
    classRange: form.classRange || '',
    classes: Array.isArray(form.classes) ? form.classes : [],
    affiliationBoard: form.affiliationBoard || '',
    affiliationCode: (form.affiliationCode || '').trim(),
    address: (form.address || '').trim(),
    showInCustomerApp: Boolean(form.showInCustomerApp),
  };
}
