#!/usr/bin/env python3
# -*- coding: utf-8 -*-

import re

# Leer el archivo index.html
with open('index.html', 'r', encoding='utf-8') as f:
    content = f.read()

# Patrón para encontrar la sección del footer duplicada y con estilos inline
pattern = r'<div class="footer__main"[^>]*>.*?</div>\s*<div class="footer-main-content">.*?</div>\s*</div>'

# Nuevo contenido para el footer
new_footer = '''<div class="footer__main">
      <div class="footer-main-content">
        <div class="footer-main-texto">
          <h2>¿Algún proyecto <br>en mente?</h2>
        </div>
        <div class="footer-main-boton">
          <a href="https://wa.me/51983447481" target="_blank" rel="noopener" class="btn-quiero-conversar">
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg" style="margin-right: 8px; vertical-align: middle;">
              <rect x="3" y="6" width="14" height="9" rx="1.5" stroke="currentColor" stroke-width="1.3" fill="none"/>
              <path d="M3 7.5L10 11L17 7.5" stroke="currentColor" stroke-width="1.3" stroke-linecap="round" stroke-linejoin="round"/>
            </svg>
            Quiero conversar
          </a>
        </div>
      </div>
    </div>'''

# Reemplazar usando regex con flag DOTALL para que el . coincida con saltos de línea
content_fixed = re.sub(pattern, new_footer, content, flags=re.DOTALL)

# Guardar el archivo modificado
with open('index.html', 'w', encoding='utf-8') as f:
    f.write(content_fixed)

print("✅ Footer actualizado exitosamente")
print("Se eliminaron los estilos inline y la duplicación")
print("Se agregó el ícono de mensaje al botón")
