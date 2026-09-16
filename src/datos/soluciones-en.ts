export type SolucionEn = {
  hero: {
    titulo: string;
    descripcion: string;
  };
  seo: {
    title: string;
    description: string;
  };
  selector?: {
    titulo: string;
    descripcion: string;
  };
  enfoque?: {
    titulo: string;
    tituloSecundario?: string;
    descripcion: string;
  };
};

export const solucionesEn: Record<string, SolucionEn> = {
  "software-a-medida": {
    hero: {
      titulo: "Software built around how your business works.",
      descripcion: "We design specific tools for processes that generic software cannot handle properly.",
    },
    seo: {
      title: "Custom software for businesses | Alred",
      description: "We build custom software and internal tools adapted to the way each business operates.",
    },
    selector: {
      titulo: "Custom software",
      descripcion: "Applications designed from scratch to fit your processes and goals completely.",
    },
    enfoque: {
      titulo: "We do not start with a fixed tool.",
      descripcion: "We analyse your processes, understand your needs and design the simplest, most effective solution. Technology comes after the problem is clear.",
    },
  },
  automatizaciones: {
    hero: {
      titulo: "Fewer manual tasks.\nMore time for your business.",
      descripcion: "We automate repetitive processes, information transfers, alerts and tasks that currently depend on manual work.",
    },
    seo: {
      title: "Business automation | Alred",
      description: "We automate business processes to reduce manual work, errors and time lost between tools.",
    },
    selector: {
      titulo: "Automation",
      descripcion: "Remove repetitive tasks, connect processes and let your business run with less manual intervention.",
    },
    enfoque: {
      titulo: "We do not start with a fixed tool.",
      descripcion: "We analyse your processes, understand your needs and design the simplest, most effective solution. Technology comes after the problem is clear.",
    },
  },
  integraciones: {
    hero: {
      titulo: "Your tools can\nwork together.",
      descripcion: "We connect platforms, applications and systems so information moves between them without duplicated work.",
    },
    seo: {
      title: "Software integrations | Alred",
      description: "We connect business software, platforms and tools to centralise information and avoid manual processes.",
    },
    selector: {
      titulo: "Integrations",
      descripcion: "Connect your tools so information flows between them without duplicated work.",
    },
    enfoque: {
      titulo: "We do not start with a fixed tool.",
      descripcion: "We analyse your processes, understand your needs and design the simplest, most effective solution. Technology comes after the problem is clear.",
    },
  },
  "herramientas-internas": {
    hero: {
      titulo: "A tool designed\nfor your team.",
      descripcion: "We create internal applications to organise operations, customers, work, documentation and business-specific processes.",
    },
    seo: {
      title: "Internal tools for businesses | Alred",
      description: "We create internal tools and management applications adapted to each team's processes.",
    },
    enfoque: {
      titulo: "We start with how your business works.",
      descripcion: "We analyse your processes, understand your needs and design the simplest, most effective solution for your team.",
    },
  },
  dashboards: {
    hero: {
      titulo: "Clear information\nto understand what is happening.",
      descripcion: "We centralise relevant data in dashboards designed to show metrics, status and activity without searching across different systems.",
    },
    seo: {
      title: "Dashboards and reporting | Alred",
      description: "We design dashboards and reporting tools to centralise business metrics, data and activity.",
    },
    selector: {
      titulo: "Dashboards",
      descripcion: "Turn your data into useful information and get a clear view of what is happening in your business.",
    },
    enfoque: {
      titulo: "We do not start with a fixed tool.",
      descripcion: "We analyse your processes, understand your needs and design the simplest, most effective solution. Technology comes after the problem is clear.",
    },
  },
  "marketing-digital": {
    hero: {
      titulo: "Marketing you can\nmeasure and improve.",
      descripcion: "We build connected campaigns and measurement systems to understand what attracts customers, what converts and where investment is worthwhile.",
    },
    seo: {
      title: "Measurable digital marketing for businesses | Alred",
      description: "Digital marketing campaigns connected to analytics, dashboards, promotional codes, QR, SEO and metrics that show real results.",
    },
    selector: {
      titulo: "Digital marketing",
      descripcion: "Connected campaigns, analytics and dashboards to see what works and turn data into decisions.",
    },
    enfoque: {
      titulo: "It is not just about launching campaigns.",
      tituloSecundario: "It is about knowing what is working.",
      descripcion: "We connect campaigns, websites, promotions and data to understand which actions generate visits, enquiries, bookings or sales. That lets you measure real results and improve every decision with clear information.",
    },
  },
};
