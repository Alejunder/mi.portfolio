# Proyecto: SOLO FRONTEND – React + Vite + JavaScript

# Principios
- KISS: escribir la solución más simple y legible.
- YAGNI: no crear abstracciones de uso único.
- DRY: reutilizar por composición y módulos, no dentro del JSX.
- SOLID: un componente = una intención visual; la lógica fuera de UI.

# Arquitectura
- /components → presentación pura  
- /modules → lógica de dominio (Module pattern)  
- /stores → estado singleton + observer + signals  
- /strategies → comportamientos intercambiables  
- /commands → acciones del usuario  
- /factories → creación de objetos UI  
- /facades → simplificar libs externas  

# JavaScript
- Usar const y let; nunca var.
- Template literals y arrow functions para callbacks.
- Usar punto y coma y formateo con Prettier.
- try/catch en async del navegador.

# React
- Componentes funcionales con hooks.
- No hooks condicionales.
- Componentes pequeños y compuestos.
- Separar contenedores de UI y módulos de lógica.

# CSS
- Clases descriptivas y consistentes.
- Sin IDs para estilos.
- Preferir CSS Modules o clases utilitarias.
- consistencia entre componentes

# Patrones Permitidos (Frontend)
- Singleton → solo stores y facades  
- Module → ES modules autocontenidos  
- Observer → comunicación desacoplada  
- Signals → estado reactivo ligero  
- Factory → creación de comandos/estrategias  
- Strategy → reglas UX intercambiables  
- Decorator → extender funciones UI  
- Proxy → control de acceso a libs  
- Facade → API simple al componente  
- Command → acciones del usuario  
- Mediator → orquestar módulos  
- Iterator → galerías y colecciones  

# Prohibido – YAGNI
- lógica DRY dentro del render.
- utils genéricos sin dominio.
- if/switch gigantes en JSX.
- singletons para componentes visuales.
