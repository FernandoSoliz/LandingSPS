import re

# Leer el archivo
with open('index.html', 'r', encoding='utf-8') as f:
    content = f.read()

# Buscar y reemplazar el Slide 2 completo
# Primero encontramos donde empieza el Slide 2
pattern = r'(<!-- Slide 2 \(2 cards\) -->.*?<div class="testimonio-slide">)(.*?)(</div>\s*</div>\s*</div>\s*</section>)'

# El nuevo contenido para el Slide 2 (solo 2 testimonios)
new_slide2 = '''
            <article class="testimonio-card">
              <span class="testimonio-quotes" aria-hidden="true">"</span>
              <p class="testimonio-text">"En Sapiens siempre encontré recursos para seguir aprendiendo. Es una empresa que realmente te facilita las cosas para que puedas enfocarte en tu trabajo, sin tener que preocuparte por nada más. Siempre sentí ese apoyo y acompañamiento."</p>
              <div class="testimonio-persona">
                <img src="img/juan.webp" alt="Juan Carlos Asto" class="testimonio-avatar" loading="lazy">
                <div>
                  <div class="testimonio-nombre">Juan Carlos Asto</div>
                  <div class="testimonio-cargo">Scrum Master</div>
                </div>
              </div>
            </article>

            <article class="testimonio-card">
              <span class="testimonio-quotes" aria-hidden="true">"</span>
              <p class="testimonio-text">"Me sentí muy a gusto trabajando aquí: hay un excelente ambiente y un equipo siempre dispuesto a colaborar y apoyar en todo. En mi caso, me brindaron todo lo necesario para desarrollarme profesional y laboralmente, y considero que es una gran empresa que impulsa a los profesionales y los ayuda a insertarse y crecer en el mundo profesional."</p>
              <div class="testimonio-persona">
                <img src="img/alex.png" alt="Alex Medina" class="testimonio-avatar" loading="lazy">
                <div>
                  <div class="testimonio-nombre">Alex Medina</div>
                  <div class="testimonio-cargo">RPA</div>
                </div>
              </div>
            </article>
          '''

# Reemplazar
content_new = re.sub(pattern, r'\1' + new_slide2 + r'\3', content, flags=re.DOTALL)

# Guardar el archivo
with open('index.html', 'w', encoding='utf-8') as f:
    f.write(content_new)

print("Cambios realizados exitosamente!")
print("Se eliminó el testimonio duplicado de Richard de la página 2 del carrusel.")
