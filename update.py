with open('script.js', 'r', encoding='utf-8') as f:
    content = f.read()

index = content.find('// --- 3D Background with Three.js ---')
if index != -1:
    content = content[:index]
    with open('script.js', 'w', encoding='utf-8') as f:
        f.write(content)
