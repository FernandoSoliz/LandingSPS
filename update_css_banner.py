import re

# Leer el archivo CSS
with open('css/style.css', 'r', encoding='utf-8') as f:
    css_content = f.read()

# Buscar todas las reglas .footer__main y agregar el background
# Usamos una función para reemplazar solo si no tiene ya background
def add_background(match):
    rule = match.group(0)
    # Si ya tiene background, no lo modificamos
    if 'background:' in rule or 'background-image:' in rule:
        return rule
    # Agregar background después de la llave de apertura
    return rule.replace('{', '{\n    background: url(\'../img/bannerproyecto.png\') center/cover no-repeat;')

# Reemplazar todas las ocurrencias de .footer__main
css_content = re.sub(
    r'\.footer__main\s*\{[^}]*\}',
    add_background,
    css_content,
    flags=re.DOTALL
)

# Guardar el archivo CSS
with open('css/style.css', 'w', encoding='utf-8') as f:
    f.write(css_content)

print("CSS actualizado exitosamente!")
print("Se agregó el background de bannerproyecto.png a todas las reglas .footer__main")
