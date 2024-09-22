# Challenge Pokemon

Esta aplicación te permite explorar una lista completa de Pokémon, consultar información detallada sobre cada uno de ellos y añadir tus favoritos a una lista personalizada. Descubre características de cada Pokémon, mientras construyes tu propia colección de favoritos.
## API 

#### Todos los ítems

```http
  GET https://pokeapi.co/api/v2/pokemon?offset=0&limit=649
```

| Parámetro | Tipo     | Descripción                |
| :-------- | :------- | :------------------------- |
| `offset` | `number` |  Índice desde el cual comienza a obtener resultados |
| `limit` | `number` |  Límite de resultados por petición |

#### Obtener ítem

```http
  GET https://pokeapi.co/api/v2/pokemon/${name}
```

| Parámetro | Tipo     | Descripción                       |
| :-------- | :------- | :-------------------------------- |
| `name`      | `string` | **Obligatorio**. Nombre del ítem a buscar |




## Tecnología

Vue CLI, Vue.js, Vuex, Vue Router, Vuetify



## Requisitos previos

Antes de ejecutar el proyecto, asegúrate de tener instalado **Node.js v.18.19** y **npm v.10.2** en tu máquina.



## Ejecutar localmente

Clonar el proyecto

```bash
  git clone https://github.com/StephanieRose94/ChallengePokemon.git
```

Ir al directorio del proyecto

```bash
  cd ChallengePokemon
```

Instalar dependencias

```bash
  npm install
```

Ejecutar servidor local

```bash
  npm run serve
```