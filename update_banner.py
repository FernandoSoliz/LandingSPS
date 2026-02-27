import re

# Leer el archivo
with open('index.html', 'r', encoding='utf-8') as f:
    content = f.read()

# Reemplazar el div footer__main para añadir la imagen de fondo
content = content.replace(
    '<div class="footer__main">',
    '<div class="footer__main" style="background: url(\'img/bannerproyecto.png\') center/cover no-repeat;">'
)

# Guardar el archivo
with open('index.html', 'w', encoding='utf-8') as f:
    f.write(content)

print("Banner actualizado exitosamente!")
print("Se agregó la imagen de fondo bannerproyecto.png a la sección footer__main")
