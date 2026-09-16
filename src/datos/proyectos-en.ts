export type ProyectoEn = {
  heroTitulo: string;
  heroDescripcion: string;
  categoria: string;
  descripcion: string;
  imagenAlt: string;
  funciones: string[];
};

export const proyectosEn: Record<string, ProyectoEn> = {
  "index-clima": {
    heroTitulo: "Digital project for Index Clima",
    heroDescripcion:
      "An internal tool built to help the team work with more clarity, reduce scattered tasks and keep control of the business in one place.",
    categoria: "Internal management · Quotes · Automation",
    descripcion:
      "A digital solution to centralise processes, quotes and internal tools around how the business really works.",
    imagenAlt: "Management system developed for Index Clima",
    funciones: [
      "Internal management",
      "Quotes",
      "Automations",
      "Holded integration",
      "Cost control",
      "Checklists",
    ],
  },

  "la-baranda": {
    heroTitulo: "Digital project for La Baranda",
    heroDescripcion:
      "We designed a connected solution to organise the business's daily activity and streamline bookings, payments, alerts and staff.",
    categoria: "Bookings · Management · Automation",
    descripcion:
      "Bookings, payments, alerts and internal tools connected around the business's daily operation.",
    imagenAlt: "Booking system developed for La Baranda",
    funciones: [
      "Online bookings",
      "Payments",
      "Reminders",
      "Notifications",
      "Internal management",
      "Management dashboard",
    ],
  },

  "top-led-canarias": {
    heroTitulo: "Ecommerce experience for Top Led Canarias",
    heroDescripcion:
      "A shopping experience designed to better present the catalogue, guide navigation and make it easier to reach each product on any device.",
    categoria: "Ecommerce · Catalogue · Digital experience",
    descripcion:
      "Modernisation of the ecommerce store, catalogue navigation and shopping experience to make products easier to reach.",
    imagenAlt: "Ecommerce store developed for Top Led Canarias",
    funciones: [
      "Ecommerce",
      "Catalogue",
      "Navigation",
      "Collections",
      "Mobile experience",
      "Responsive design",
    ],
  },

  "tu-fiesta-party": {
    heroTitulo: "Digital system for Tu Fiesta Party",
    heroDescripcion:
      "A solution designed to organise event and booking management, centralise information and streamline communication with each client.",
    categoria: "Events · Bookings · Digital management",
    descripcion:
      "A digital solution focused on centralising event management, bookings and client communication.",
    imagenAlt: "Software developed for Tu Fiesta Party",
    funciones: [
      "Event management",
      "Bookings",
      "Clients",
      "Internal organisation",
      "Communication",
      "Management dashboard",
    ],
  },
};
