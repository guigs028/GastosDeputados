/// <reference types="vite/client" />

// Declaração de tipos para arquivos CSS
declare module "*.css" {
  const content: Record<string, string>;
  export default content;
}

// Declaração de tipos para imagens
declare module "*.svg" {
  const content: string;
  export default content;
}

declare module "*.png" {
  const content: string;
  export default content;
}

declare module "*.jpg" {
  const content: string;
  export default content;
}

declare module "*.jpeg" {
  const content: string;
  export default content;
}

declare module "*.gif" {
  const content: string;
  export default content;
}

declare module "*.webp" {
  const content: string;
  export default content;
}
