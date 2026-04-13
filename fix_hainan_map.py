import json

# 读取 JSON 文件
with open('lib/data/chinaProvincePaths.json', 'r', encoding='utf-8') as f:
    data = json.load(f)

# 找到海南的数据
for province in data['provinces']:
    if province['slug'] == 'hainan':
        print(f"找到海南数据: {province['slug']}")
        print(f"原始标签: {province['label']}")
        
        # 只保留主要的海南岛屿路径
        # 这是一个简化的路径，只包含海南岛的主要轮廓
        province['d'] = "M512.5,438.5L515.9,443.9L513.4,444.1L509.8,454L501.6,459.1L493,455.6L492.5,447.4L499,443.3L497.5,443.2L498.6,441.2L509.3,439.2L511.7,441.1Z"
        province['label'] = "海南省"
        
        print(f"修改后的标签: {province['label']}")
        print(f"修改后的路径长度: {len(province['d'])}")
        break

# 保存修改后的 JSON 文件
with open('lib/data/chinaProvincePaths.json', 'w', encoding='utf-8') as f:
    json.dump(data, f, ensure_ascii=False, indent=2)

print("修改完成，已移除南海诸岛的小点点")
