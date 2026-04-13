import json

# 读取 JSON 文件
with open('lib/data/chinaProvincePaths.json', 'r', encoding='utf-8') as f:
    data = json.load(f)

print("JSON 文件解析成功！")
print(f"总共有 {len(data['provinces'])} 个省份")

# 查找海南数据
for province in data['provinces']:
    if province['slug'] == 'hainan':
        print(f"海南数据: {province['slug']} - {province['label']}")
        print(f"路径长度: {len(province['d'])}")
        print(f"路径: {province['d']}")
        break
