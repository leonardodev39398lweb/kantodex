# KantoDex

Pokédex responsiva dos 151 Pokémon da primeira geração, criada com React, TypeScript e Vite. Os dados vêm da PokéAPI e os favoritos ficam salvos no navegador.

## Rodar no VS Code

1. Instale Node.js LTS.
2. Abra a pasta `kantodex` no VS Code.
3. Abra o terminal integrado e execute:

```bash
npm install
npm run dev
```

4. Abra o endereço local mostrado pelo Vite (normalmente `http://localhost:5173`).

Para gerar a versão de produção: `npm run build`.

## Tecnologias

React, TypeScript, Vite, Tailwind CSS, Lucide React e PokéAPI. A API pública precisa estar acessível para carregar os dados. Nomes em português são mostrados quando a PokéAPI os oferece; caso contrário, usa-se o nome original.
