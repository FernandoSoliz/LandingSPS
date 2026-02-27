#!/usr/bin/env python3
# -*- coding: utf-8 -*-

# Leer el archivo index.html
with open('index.html', 'r', encoding='utf-8') as f:
    content = f.read()

# Buscar la posición donde termina el footer__main y agregar el nuevo banner
search_text = '    </div>\n    <div class="footer__bottom">'
replacement_text = '''    </div>
    
    <!-- Banner con imagen de fondo -->
    <section class="banner-proyecto">
      <div class="banner-proyecto-overlay"></div>
    </section>
    
    <div class="footer__bottom">'''

# Hacer el reemplazo
if search_text in content:
    content = content.replace(search_text, replacement_text, 1)
    
    # Guardar el archivo
    with open('index.html', 'w', encoding='utf-8') as f:
        f.write(content)
    
    print("✅ Banner agregado exitosamente después del footer__main")
else:
    print("❌ No se encontró el texto para reemplazar")
    print("Buscando alternativas...")
