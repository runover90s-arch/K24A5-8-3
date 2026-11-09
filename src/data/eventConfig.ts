export interface EventConfig {
  title: string;
  subtitle: string;
  eventDate: string;
  timezone: string;
  schoolYearReference: string;
  currentClassName: string;
  sender: string;
  enableAudio: boolean;
  enableParticles: boolean;
  enableIntro: boolean;
  showCountdown: boolean;
}

/** Thay đổi nội dung và các công tắc tại duy nhất file này. */
export const eventConfig: EventConfig = {
  title: 'GALAXY LETTERS',
  subtitle: 'Một vũ trụ nhỏ, dành riêng cho bạn.',
  eventDate: '2027-03-08',
  timezone: 'Asia/Ho_Chi_Minh',
  schoolYearReference: '10A5 — 2024–2025',
  currentClassName: '', // Chưa xác nhận tên lớp hiện tại.
  sender: 'Một người bạn trong lớp',
  enableAudio: false,
  enableParticles: true,
  enableIntro: true,
  showCountdown: false
};
