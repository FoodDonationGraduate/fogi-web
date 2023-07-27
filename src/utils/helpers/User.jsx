export const getUserTypeLabel = (userType) => {
  switch (userType) {
    case 'donee': return 'Người nhận';
    case 'donor': return 'Người cho';
    case 'volunteer': return 'Tình nguyện viên';
    case 'director': return 'Điều phối viên';
    case 'warehouse_keeper': return 'Quản lý kho';
    default: return undefined;
  }
};