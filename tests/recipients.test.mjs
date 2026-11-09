import test from 'node:test';
import assert from 'node:assert/strict';
import { recipients, recipientByStt } from '../dist/src/data/recipients.js';
import { letters } from '../dist/src/data/letters.js';

const expected = new Map([
  [1,'Lê Thị Kim Anh'],[5,'Trần Hoàng Mỹ Đình'],[6,'Cao Ngọc Gia Hân'],
  [8,'Hoàng Thị Anh Hồng'],[10,'Phạm Voòng Xuân Hương'],[17,'Vũ Trần Minh Khuê'],
  [18,'Lee Huan Ling'],[19,'Trần Thị Ánh Minh'],[20,'Trương Hoàng Giáng My'],
  [22,'Đoàn Trần Bảo Ngọc'],[23,'Đào Nguyễn Ánh Ngọc'],[24,'Phan Nguyễn Khánh Ngọc'],
  [25,'Nguyễn Hồng Ngọc'],[32,'Nguyễn Thị Phương Thảo'],[33,'Lý Minh Thư'],
  [35,'Phan Ngọc Anh Thư'],[36,'Trần Võ Anh Thư'],[40,'Đoàn Thị Tường Vy'],
  [41,'Lê Ngọc Tường Vy'],[42,'Bùi Thị Thanh Xuân'],[43,'Trần Như Ý'],
  [44,'Nguyễn Thùy Hải Yến'],[45,'Nguyễn Thụy Nhất Linh'],[46,'Phạm Nguyễn Thiên Nga']
]);

test('đúng 24 người nhận, đúng tất cả 24 STT MỚI và họ tên', () => {
  assert.equal(recipients.length, 24);
  assert.equal(new Set(recipients.map(r => r.stt)).size, 24);
  assert.deepEqual([...recipients.map(r => [r.stt,r.fullName])], [...expected]);
  for(const [stt,name] of expected) assert.equal(recipientByStt.get(stt)?.fullName, name);
});
test('không có thư tại STT 34 của Thông', () => {
  assert.equal(recipientByStt.has(34),false);
  assert.equal(recipientByStt.has(19),true);
});
test('hai bạn đã chuyển lớp vẫn nhận thư riêng ở STT 45–46', () => {
  assert.equal(recipientByStt.get(45)?.isFormerClassmate,true);
  assert.equal(recipientByStt.get(46)?.isFormerClassmate,true);
  assert.notEqual(recipientByStt.get(45)?.letterId, recipientByStt.get(46)?.letterId);
});
test('không trùng letterId, không liên kết đến thư không tồn tại', () => {
  assert.equal(new Set(recipients.map(r=>r.letterId)).size, 24);
  assert.equal(Object.keys(letters).length,24);
  for(const r of recipients) assert.ok(letters[r.letterId],`${r.stt} không có thư`);
});
