"""Tùy chọn: python -m pip install playwright; python -m playwright install chromium.
Chạy khi server đang mở bằng npm run preview. Nhóm này không dùng trong GitHub Actions
vì không muốn cài Chromium nặng cho mọi đợt publish.
"""
from pathlib import Path
import os
from playwright.sync_api import sync_playwright

ROOT = Path(__file__).resolve().parents[1]
OUTPUT = ROOT / 'docs'
OUTPUT.mkdir(exist_ok=True)
URL = 'http://127.0.0.1:4173/'
SIZES = [(320, 568), (360, 780), (375, 812), (390, 844), (414, 896), (430, 932), (768, 1024), (1280, 800), (844, 390)]

with sync_playwright() as p:
    browser = p.chromium.launch(headless=True, executable_path=os.getenv('CHROMIUM_PATH') or None, args=['--no-sandbox', '--disable-dev-shm-usage'])
    reports = []
    for width, height in SIZES:
        ctx = browser.new_context(viewport={'width': width, 'height': height}, device_scale_factor=1, is_mobile=width <= 430, has_touch=width <= 430, reduced_motion='reduce')
        page = ctx.new_page()
        errors = []
        page.on('pageerror', lambda error: errors.append(str(error)))
        page.goto(URL, wait_until='networkidle')
        page.locator('.entry-begin').wait_for(state='visible', timeout=7000)
        page.locator('.entry-begin').click()
        try:
            page.locator('.skip-intro').wait_for(state='visible', timeout=10000)
        except Exception:
            page.locator('.entry-fallback').click()
            page.locator('.skip-intro').wait_for(state='visible', timeout=10000)
        if width == 390:
            page.screenshot(path=str(OUTPUT/'preview-intro-mobile.png'))
        if width == 1280:
            page.screenshot(path=str(OUTPUT/'preview-intro-desktop.png'))
        page.locator('.skip-intro').click()
        page.locator('#student-stt').fill('19')
        page.locator('.lookup-btn').click()
        page.locator('#letter-heading').wait_for(state='visible', timeout=12000)
        assert page.locator('#letter-heading').inner_text() == 'Gửi Ánh Minh,'
        assert page.locator('.letter-body p').count() == 3
        if width == 390:
            page.screenshot(path=str(OUTPUT/'preview-letter-mobile.png'))
        letter_scroll = page.locator('.letter-scroll')
        letter_scroll.evaluate('(el) => el.scrollTo(0, el.scrollHeight)')
        page.locator('.wish-star').click()
        page.locator('#closing-title').wait_for(state='visible')
        if width == 390:
            page.screenshot(path=str(OUTPUT/'preview-closing-mobile.png'))
        overflow = page.evaluate('document.documentElement.scrollWidth - innerWidth')
        assert overflow <= 1, f'Horizontal overflow at {width}x{height}: {overflow}'
        assert not errors, f'JS errors at {width}x{height}: {errors}'
        reports.append(f'{width}×{height}: PASS intro → lookup → letter → closing, no JS error, no horizontal overflow')
        ctx.close()

    # Phân biệt nhiều STT, so khớp đúng tên trên giao diện và các trường hợp ngoại lệ.
    ctx = browser.new_context(viewport={'width': 390, 'height': 844}, reduced_motion='reduce')
    page = ctx.new_page()
    page.goto(URL, wait_until='networkidle')
    page.locator('.entry-begin').click()
    try:
        page.locator('.skip-intro').wait_for(state='visible', timeout=8000)
    except Exception:
        page.locator('.entry-fallback').click()
    page.locator('.skip-intro').click()
    page.locator('#student-stt').fill('34')
    page.locator('.lookup-btn').click()
    assert 'chưa có thư riêng' in page.locator('#lookup-error').inner_text()
    for value, label in [('01','Kim Anh'),('5','Mỹ Đình'),('18','Ling'),('33','Minh Thư'),('35','Anh Thư'),('36','Võ Anh Thư'),('45','Nhất Linh'),('46','Thiên Nga')]:
        page.locator('#student-stt').fill(value)
        page.locator('.lookup-btn').click()
        page.locator('#letter-heading').wait_for(state='visible', timeout=6000)
        assert page.locator('#letter-heading').inner_text() == f'Gửi {label},', value
        page.locator('.letter-actions .soft-btn').nth(1).click()
        page.locator('#student-stt').wait_for(state='visible')
    reports.append('STT 34 + 8 STT đặc biệt: PASS')
    ctx.close()

    # Chạy cảnh nhận diện đầy đủ không bỏ qua, kiểm tra thời gian và phong thư.
    ctx = browser.new_context(viewport={'width': 390,'height':844}, reduced_motion='no-preference')
    page = ctx.new_page()
    page.goto(URL,wait_until='networkidle')
    page.locator('.entry-begin').click()
    try:
        page.locator('.skip-intro').wait_for(state='visible', timeout=11000)
    except Exception:
        page.locator('.entry-fallback').click()
    page.locator('.skip-intro').click()
    page.locator('#student-stt').fill('19')
    page.locator('.lookup-btn').click()
    page.locator('#morph-object[data-stage="envelope"]').wait_for(timeout=6500)
    page.locator('#letter-heading').wait_for(state='visible',timeout=8500)
    assert page.locator('.letter-body p').count()==3
    assert page.locator('#morph-object').get_attribute('data-stage')=='letter'
    reports.append('Full morph path (no reduced motion): PASS')
    ctx.close()

    # Tải trực tiếp standalone: chứa toàn bộ mã, không tải .js ngoài.
    standalone = (ROOT / 'standalone' / 'index.html').resolve().as_uri()
    ctx = browser.new_context(viewport={'width':390,'height':844},reduced_motion='reduce')
    page = ctx.new_page()
    errors=[]
    page.on('pageerror',lambda error: errors.append(str(error)))
    page.goto(standalone,wait_until='load')
    page.locator('.entry-begin').click()
    try:
        page.locator('.skip-intro').wait_for(state='visible', timeout=8000)
    except Exception:
        page.locator('.entry-fallback').click()
    page.locator('.skip-intro').click()
    page.locator('#student-stt').fill('19')
    page.locator('.lookup-btn').click()
    page.locator('#letter-heading').wait_for(state='visible',timeout=6000)
    assert not errors,errors
    reports.append('Stand-alone 1-file HTML: PASS')
    ctx.close()
    browser.close()
print('\n'.join(reports))
