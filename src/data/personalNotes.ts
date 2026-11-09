/**
 * Ghi chú riêng để chủ trang biên tập lại thư dựa trên sự thật, KHÔNG hiển thị công khai.
 * Không tự điền dữ liệu cá nhân hoặc tự bịa kỷ niệm.
 * Khi muốn thêm ghi chú thật, bổ sung ở đây rồi chỉnh trực tiếp lá thư tương ứng.
 */
export interface PersonalNote {
  sharedMemory?: string;
  realTrait?: string;
  preferredGreeting?: string;
  approvedByRecipient?: boolean;
}

export const personalNotes: Readonly<Record<number, PersonalNote>> = {};
