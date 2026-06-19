export type NavigationLink = {
  label: string;
  href: string;
};

export const headerNavigationLinks: NavigationLink[] = [
  { label: "Cursos", href: "/cursos" },
  { label: "Historias", href: "/historias" },
  { label: "Comunidad", href: "/comunidad" },
  { label: "Contacto", href: "/contacto" },
];

export const footerNavigationLinks: NavigationLink[] = [
  { label: "Inicio", href: "/" },
  ...headerNavigationLinks,
  { label: "Facilitadores", href: "/facilitadores" },
];
