import { mountApp } from './App.js';

const root = document.querySelector<HTMLElement>('#app');
if (!root) throw new Error('Không tìm thấy phần tử #app');
mountApp(root);
