import os
import json
import re

root_dir = r"c:\Users\Bekhruz\Desktop\DSAT Platform\DSAT_English"

def transform_qa(file_path):
    try:
        with open(file_path, 'r', encoding='utf-8') as f:
            data = json.load(f)
        
        new_data = []
        for item in data:
            if 'options' in item and isinstance(item['options'], dict):
                options_list = []
                # Sort keys to ensure A, B, C, D order
                for key in sorted(item['options'].keys()):
                    options_list.append(f"{key}) {item['options'][key]}")
                item['options'] = options_list
            new_data.append(item)
            
        new_path = os.path.join(os.path.dirname(file_path), "qa.json")
        with open(new_path, 'w', encoding='utf-8') as f:
            json.dump(new_data, f, indent=4)
            
        print(f"Processed and renamed: {file_path} -> {new_path}")
        os.remove(file_path)
    except Exception as e:
        print(f"Error processing {file_path}: {e}")

def transform_article(file_path):
    try:
        with open(file_path, 'r', encoding='utf-8') as f:
            content = f.read()
            
        # Remove frontmatter
        # Pattern: Start of file, ---, content, ---, newline
        new_content = re.sub(r'^---\n.*?\n---\n\n?', '', content, flags=re.DOTALL)
        
        new_path = os.path.join(os.path.dirname(file_path), "article.md")
        with open(new_path, 'w', encoding='utf-8') as f:
            f.write(new_content)
            
        print(f"Processed and renamed: {file_path} -> {new_path}")
        os.remove(file_path)
    except Exception as e:
        print(f"Error processing {file_path}: {e}")

def main():
    for dirpath, dirnames, filenames in os.walk(root_dir):
        for filename in filenames:
            if filename == "QA.json":
                transform_qa(os.path.join(dirpath, filename))
            elif filename == "Article.md":
                transform_article(os.path.join(dirpath, filename))

if __name__ == "__main__":
    main()
