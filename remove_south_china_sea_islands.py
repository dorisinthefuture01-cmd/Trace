import json

# 读取 JSON 文件
with open('lib/data/chinaProvincePaths.json', 'r', encoding='utf-8') as f:
    data = json.load(f)

# 找到海南的数据
for province in data['provinces']:
    if province['label'] == '海南省 南海诸岛' or province['label'] == '海南省':
        print(f"找到海南数据: {province['slug']}")
        print(f"原始路径长度: {len(province['d'])}")
        
        # 移除南海诸岛的部分（小点点）
        # 南海诸岛通常是由多个小路径组成的，我们只保留主要的海南岛屿部分
        # 简单处理：保留前半部分路径，移除后半部分的小点点
        d = province['d']
        # 找到路径中的 M 命令，通常主要岛屿会有一个主要的 M 命令
        # 我们只保留第一个 M 命令开始的路径，移除后续的小点点
        m_count = 0
        new_d = []
        for part in d.split(' '):
            if part.startswith('M'):
                m_count += 1
                if m_count > 1:
                    break
            new_d.append(part)
        
        new_d_str = ' '.join(new_d)
        print(f"新路径长度: {len(new_d_str)}")
        
        # 更新路径
        province['d'] = new_d_str
        # 恢复标签为海南省
        province['label'] = '海南省'
        
        break

# 保存修改后的 JSON 文件
with open('lib/data/chinaProvincePaths.json', 'w', encoding='utf-8') as f:
    json.dump(data, f, ensure_ascii=False, indent=2)

print("修改完成，已移除南海诸岛的小点点")
