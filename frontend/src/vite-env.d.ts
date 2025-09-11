/// <reference types="vite/client" />

// Declarações de tipos para arquivos CSS
// Isso permite que o TypeScript reconheça importações de arquivos .css
declare module "*.css" {
  const content: string;
  export default content;
}

// Declarações para outros tipos de arquivos que podem ser importados
declare module "*.module.css" {
  const classes: { readonly [key: string]: string };
  export default classes;
}

declare module "*.scss" {
  const content: string;
  export default content;
}

declare module "*.module.scss" {
  const classes: { readonly [key: string]: string };
  export default classes;
}

// Declarações para arquivos de imagem
declare module "*.png" {
  const src: string;
  export default src;
}

declare module "*.jpg" {
  const src: string;
  export default src;
}

declare module "*.jpeg" {
  const src: string;
  export default src;
}

declare module "*.gif" {
  const src: string;
  export default src;
}

declare module "*.svg" {
  const src: string;
  export default src;
}
