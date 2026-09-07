import openpyxl
from openpyxl.styles import Font, Alignment, PatternFill, Border, Side
import re

user_excel_path = r'D:\Working_Bao\Đám cưới\Hình Cưới\THÔNG TIN CHỈNH SỬA HÌNH ẢNH.xlsx'
txt_path = r'D:\Working_Bao\Đám cưới\Hình Cưới\Final filter\Ghi_chu_sua_anh.txt'
output_excel_path = r'D:\Working_Bao\Đám cưới\Hình Cưới\Final filter\Danh_sach_hinh_can_sua_Tong_Hop.xlsx'


# 1. Load User's Excel file data
wb_user = openpyxl.load_workbook(user_excel_path)
ws_user = wb_user.active

user_data = {} # map code -> {'content': str, 'note': str}

for r in range(2, ws_user.max_row + 1):
    stt_val = ws_user.cell(row=r, column=1).value
    code_val = ws_user.cell(row=r, column=2).value
    content_val = ws_user.cell(row=r, column=3).value
    note_val = ws_user.cell(row=r, column=4).value
    
    if code_val:
        code_clean = str(code_val).strip()
        if not code_clean.upper().endswith(".JPG"):
            code_filename = code_clean + ".JPG"
        else:
            code_filename = code_clean
            
        content_str = str(content_val).strip() if content_val else ""
        note_str = str(note_val).strip() if note_val else ""
        
        user_data[code_filename] = {
            'user_content': content_str,
            'user_note': note_str
        }

# 2. Parse AI Text File
with open(txt_path, "r", encoding="utf-8") as f:
    text_content = f.read()

photo_blocks = re.split(r"-{40,}", text_content)

ai_data = {}

for block in photo_blocks:
    match = re.search(r"\[\d+\]\s+([\w\d\._]+)", block)
    if not match:
        continue
    code = match.group(1).strip()
    
    lines = [line.strip() for line in block.split("\n") if line.strip()]
    content_lines = []
    rotate_note = ""
    
    for line in lines:
        if line.startswith("[") or line.startswith("="):
            continue
        cleaned = line.replace("**", "").strip()
        if "Xoay ảnh:" in cleaned or "Xoay & Bố cục:" in cleaned:
            rotate_note = cleaned.replace("• Xoay ảnh:", "").replace("• Xoay & Bố cục:", "").replace("•", "").strip()
        else:
            content_lines.append(cleaned)
            
    ai_data[code] = {
        'ai_content': "\n".join(content_lines).strip(),
        'ai_rotate': rotate_note
    }

# 3. Combine Data smoothly without headers/prefixes
photo_codes_order = list(ai_data.keys())

combined_rows = []

for idx, code in enumerate(photo_codes_order, start=1):
    u_info = user_data.get(code, {'user_content': '', 'user_note': ''})
    a_info = ai_data.get(code, {'ai_content': '', 'ai_rotate': ''})
    
    u_content = u_info['user_content']
    u_note = u_info['user_note']
    a_content = a_info['ai_content']
    a_rotate = a_info['ai_rotate']
    
    # Merge Content cleanly: User points first, then detailed technical points
    content_parts = []
    if u_content:
        content_parts.append(u_content)
    if a_content:
        content_parts.append(a_content)
        
    merged_content = "\n\n".join(content_parts)
    
    # Merge Notes cleanly
    note_parts = []
    if u_note:
        note_parts.append(u_note)
    if a_rotate:
        note_parts.append(f"Xoay ảnh: {a_rotate}")
    elif not u_note:
        note_parts.append("Khung đứng chuẩn")
        
    merged_note = "\n".join(note_parts)
    
    combined_rows.append((idx, code, merged_content, merged_note))

# 4. Generate Clean Excel File
wb = openpyxl.Workbook()
ws = wb.active
ws.title = "Ghi Chú Retouch"
ws.views.sheetView[0].showGridLines = True

# Title Row
ws.merge_cells("A1:D1")
title = ws["A1"]
title.value = "DANH SÁCH CHI TIẾT CÁC ĐIỂM CẦN CHỈNH SỬA HÌNH CƯỚI"
title.font = Font(name="Segoe UI", size=15, bold=True, color="1F4E79")
title.alignment = Alignment(horizontal="center", vertical="center")
ws.row_dimensions[1].height = 38

# Headers
headers = ["STT", "Mã hình chỉnh sửa", "Nội dung chỉnh sửa", "Note"]
ws.row_dimensions[2].height = 26

header_fill = PatternFill(start_color="1F4E79", end_color="1F4E79", fill_type="solid")
header_font = Font(name="Segoe UI", size=11, bold=True, color="FFFFFF")
thin_border = Border(
    left=Side(style='thin', color='D9D9D9'),
    right=Side(style='thin', color='D9D9D9'),
    top=Side(style='thin', color='D9D9D9'),
    bottom=Side(style='thin', color='D9D9D9')
)

for c_idx, h in enumerate(headers, start=1):
    cell = ws.cell(row=2, column=c_idx, value=h)
    cell.fill = header_fill
    cell.font = header_font
    cell.alignment = Alignment(horizontal="center", vertical="center")
    cell.border = thin_border

# Fill Rows
zebra_fill = PatternFill(start_color="F7F9FB", end_color="F7F9FB", fill_type="solid")

for stt, code, content, note in combined_rows:
    r = stt + 2
    ws.cell(row=r, column=1, value=stt)
    ws.cell(row=r, column=2, value=code)
    ws.cell(row=r, column=3, value=content)
    ws.cell(row=r, column=4, value=note)
    
    c1 = ws.cell(row=r, column=1)
    c2 = ws.cell(row=r, column=2)
    c3 = ws.cell(row=r, column=3)
    c4 = ws.cell(row=r, column=4)
    
    c1.alignment = Alignment(horizontal="center", vertical="top")
    c2.alignment = Alignment(horizontal="center", vertical="top")
    c3.alignment = Alignment(horizontal="left", vertical="top", wrap_text=True)
    c4.alignment = Alignment(horizontal="left", vertical="top", wrap_text=True)
    
    font_body = Font(name="Segoe UI", size=10)
    c1.font = font_body
    c2.font = Font(name="Segoe UI", size=10.5, bold=True, color="002060")
    c3.font = font_body
    c4.font = Font(name="Segoe UI", size=10, italic=True, color="C00000" if ("hình in" in note.lower() or "Xoay" in note) else "333333")
    
    for c in [c1, c2, c3, c4]:
        c.border = thin_border
        if stt % 2 == 0:
            c.fill = zebra_fill

ws.column_dimensions['A'].width = 8
ws.column_dimensions['B'].width = 22
ws.column_dimensions['C'].width = 85
ws.column_dimensions['D'].width = 35

wb.save(output_excel_path)
print("Updated Excel smoothly!")
