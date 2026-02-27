#!/usr/bin/env python3
# -*- coding: utf-8 -*-

# Leer el archivo index.html
with open('index.html', 'r', encoding='utf-8') as f:
    content = f.read()

# Eliminar el banner agregado y el </div> extra
old_text = '''    </div>
    </div>
    
    <!-- Banner con imagen de fondo -->
    <section class="banner-proyecto">
      <div class="banner-proyecto-overlay"></div>
    </section>
    
    <div class="footer__bottom">'''

new_text = '''    </div>
    </div>
    <div class="footer__bottom">'''

# Hacer el reemplazo
if old_text in content:
    content = content.replace(old_text, new_text, 1)
    
    # Guardar el archivo
    with open('index.html', 'w', encoding='utf-8') as f:
        f.write(content)
    
    print("✅ Banner eliminado exitosamente del HTML")
else:
    print("❌ No se encontró el banner para eliminar")
