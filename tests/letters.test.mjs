import test from 'node:test';
import assert from 'node:assert/strict';
import { recipients } from '../dist/src/data/recipients.js';
import { letters } from '../dist/src/data/letters.js';
import { makeVisualSeed } from '../dist/src/utils/visualSeed.js';

const countWords = (s) => s.trim().split(/\s+/u).filter(Boolean).length;
test('24 thư đều gồm 3 đoạn với 120–180 từ tiếng Việt cho phần thân', () => {
  for(const r of recipients) {
    const content = letters[r.letterId];
    assert.equal(content.paragraphs.length,3,`Số đoạn thư ${r.stt}`);
    const total = countWords(content.paragraphs.join(' '));
    assert.ok(total>=120 && total<=180,`STT ${r.stt}: ${total} từ`);
    assert.equal(content.greeting, `Gửi ${r.displayName},`);
    assert.equal(content.ending,'Chúc mừng ngày 8/3/2027!');
  }
});
test('từng thư thực sự khác nội dung, không chỉ thay tên người nhận', () => {
  const bodies = recipients.map(r=>letters[r.letterId].paragraphs.join(' '));
  assert.equal(new Set(bodies).size,24);
  assert.equal(new Set(bodies.map(text=>text.slice(0,65))).size,24);
});
test('visual identity ổn định, không phụ thuộc random mỗi lần truy cập', () => {
  for(const r of recipients){
    const theme=makeVisualSeed(r.stt);
    assert.deepEqual(theme, makeVisualSeed(r.stt));
    assert.ok(theme.points.length>=6 && theme.points.length<=8);
    assert.ok(theme.accent.startsWith('#'));
  }
  assert.notDeepEqual(makeVisualSeed(18).points,makeVisualSeed(19).points);
});
