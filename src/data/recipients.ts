export interface Recipient {
  stt: number;
  fullName: string;
  displayName: string;
  letterId: string;
  isFormerClassmate?: boolean;
  needsReview?: boolean;
  enabled?: boolean;
  theme?: { accent: string; secondary: string };
}

/**
 * STT MỚI đã đối chiếu đúng với Master Prompt đính chính.
 * Không lưu 22 người không nhận thư, số 34 dành cho Thông và KHÔNG có thư.
 * Xin đối chiếu cách hiển thị họ tên và sự đồng ý của người nhận trước khi xuất bản.
 */
export const recipients: readonly Recipient[] = [
  { stt: 1, fullName: 'Lê Thị Kim Anh', displayName: 'Kim Anh', letterId: 'letter-1' },
  { stt: 5, fullName: 'Trần Hoàng Mỹ Đình', displayName: 'Mỹ Đình', letterId: 'letter-5' },
  { stt: 6, fullName: 'Cao Ngọc Gia Hân', displayName: 'Gia Hân', letterId: 'letter-6' },
  { stt: 8, fullName: 'Hoàng Thị Anh Hồng', displayName: 'Anh Hồng', letterId: 'letter-8' },
  { stt: 10, fullName: 'Phạm Voòng Xuân Hương', displayName: 'Xuân Hương', letterId: 'letter-10' },
  { stt: 17, fullName: 'Vũ Trần Minh Khuê', displayName: 'Minh Khuê', letterId: 'letter-17' },
  { stt: 18, fullName: 'Lee Huan Ling', displayName: 'Ling', letterId: 'letter-18' },
  { stt: 19, fullName: 'Trần Thị Ánh Minh', displayName: 'Ánh Minh', letterId: 'letter-19' },
  { stt: 20, fullName: 'Trương Hoàng Giáng My', displayName: 'Giáng My', letterId: 'letter-20' },
  { stt: 22, fullName: 'Đoàn Trần Bảo Ngọc', displayName: 'Bảo Ngọc', letterId: 'letter-22' },
  { stt: 23, fullName: 'Đào Nguyễn Ánh Ngọc', displayName: 'Ánh Ngọc', letterId: 'letter-23' },
  { stt: 24, fullName: 'Phan Nguyễn Khánh Ngọc', displayName: 'Khánh Ngọc', letterId: 'letter-24' },
  { stt: 25, fullName: 'Nguyễn Hồng Ngọc', displayName: 'Hồng Ngọc', letterId: 'letter-25' },
  { stt: 32, fullName: 'Nguyễn Thị Phương Thảo', displayName: 'Phương Thảo', letterId: 'letter-32' },
  { stt: 33, fullName: 'Lý Minh Thư', displayName: 'Minh Thư', letterId: 'letter-33' },
  { stt: 35, fullName: 'Phan Ngọc Anh Thư', displayName: 'Anh Thư', letterId: 'letter-35' },
  { stt: 36, fullName: 'Trần Võ Anh Thư', displayName: 'Võ Anh Thư', letterId: 'letter-36' },
  { stt: 40, fullName: 'Đoàn Thị Tường Vy', displayName: 'Tường Vy', letterId: 'letter-40' },
  { stt: 41, fullName: 'Lê Ngọc Tường Vy', displayName: 'Ngọc Tường Vy', letterId: 'letter-41' },
  { stt: 42, fullName: 'Bùi Thị Thanh Xuân', displayName: 'Thanh Xuân', letterId: 'letter-42' },
  { stt: 43, fullName: 'Trần Như Ý', displayName: 'Như Ý', letterId: 'letter-43' },
  { stt: 44, fullName: 'Nguyễn Thùy Hải Yến', displayName: 'Hải Yến', letterId: 'letter-44' },
  { stt: 45, fullName: 'Nguyễn Thụy Nhất Linh', displayName: 'Nhất Linh', letterId: 'letter-45', isFormerClassmate: true },
  { stt: 46, fullName: 'Phạm Nguyễn Thiên Nga', displayName: 'Thiên Nga', letterId: 'letter-46', isFormerClassmate: true }
];

export const recipientByStt: ReadonlyMap<number, Recipient> = new Map(
  recipients.map((recipient) => [recipient.stt, recipient])
);
