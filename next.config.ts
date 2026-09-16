import createNextIntlPlugin from "next-intl/plugin";
import type { NextConfig } from "next";
import { networkInterfaces } from "node:os";

const nextConfig: NextConfig = {
  // DHCP puede cambiar la IP entre sesiones. Autorizar únicamente direcciones
  // del propio equipo al arrancar permite probar el desarrollo desde un móvil
  // real sin depender de una IP escrita manualmente.
  allowedDevOrigins: Object.values(networkInterfaces()).flatMap((interfaces) =>
    (interfaces ?? [])
      .filter(
        (red) =>
          red.family === "IPv4" &&
          !red.internal,
      )
      .map((red) => red.address),
  ),

  // El círculo negro con la "N" que aparece sobre la web en next dev es un
  // indicador de Next.js, no un control de Alred. Lo ocultamos para que las
  // pruebas en móvil físico no se confundan con la interfaz real.
  // Los errores de compilación/runtime se siguen mostrando normalmente.
  devIndicators: false,
};

const withNextIntl =
  createNextIntlPlugin();

export default withNextIntl(
  nextConfig,
);
