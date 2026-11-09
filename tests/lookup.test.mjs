import test from 'node:test';
import assert from 'node:assert/strict';
import { validateStt } from '../dist/src/utils/validateStt.js';
import { recipientByStt } from '../dist/src/data/recipients.js';

for (const [input,stt] of [['1',1],['01',1],[' 19 ',19],['18',18],['33',33],['35',35],['36',36],['45',45],['46',46]]) {
  test(`parse STT ${JSON.stringify(input)} → ${stt}`, () => assert.deepEqual(validateStt(input), {ok:true,stt}));
}
for (const raw of ['',' ','0','47','-1','1.1','abc','1e1','1,0','12abc','19.0','Infinity','1 0']) {
  test(`loại input không hợp lệ ${JSON.stringify(raw)}`, () => assert.equal(validateStt(raw).ok,false));
}
test('valid STT không có nghĩa là có thư; không lộ tên tại STT 34', () => {
  assert.deepEqual(validateStt('34'),{ok:true,stt:34});
  assert.equal(recipientByStt.get(34),undefined);
});
