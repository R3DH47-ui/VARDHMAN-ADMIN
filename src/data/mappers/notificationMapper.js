/**
 * Notification DTO Mapper.
 * Converts between backend API shape and UI model.
 */

export function mapNotificationFromApi(dto) {
  if (!dto) return dto;
  return {
    id: dto.id ?? dto._id ?? '',
    category: dto.category ?? '',
    type: dto.type ?? (dto.category || '').toUpperCase(),
    status: dto.status ?? (dto.read ? 'read' : 'unread'),
    read: Boolean(dto.read ?? dto.status === 'read'),
    group: (dto.group || 'TODAY').toUpperCase(),
    icon: dto.icon ?? 'notifications',
    iconType: dto.iconType ?? dto.icon_type ?? 'neutral',
    title: dto.title ?? '',
    time: dto.time ?? dto.timestamp ?? '',
    timestamp: dto.timestamp ?? dto.time ?? '',
    body: dto.body ?? dto.description ?? '',
    description: dto.description ?? dto.body ?? '',
    tags: Array.isArray(dto.tags) ? dto.tags : [],
    tag1: dto.tag1 ?? '',
    tag1Type: dto.tag1Type ?? null,
    tag2: dto.tag2 ?? null,
  };
}
