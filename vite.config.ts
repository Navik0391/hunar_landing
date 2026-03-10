import { defineConfig, Plugin } from "vite";
import tailwindcss from "@tailwindcss/vite";
import fs from "fs";
import path from "path";

function htmlIncludes(): Plugin {
  return {
    name: "html-includes",
    enforce: "pre",
    transformIndexHtml(html: string) {
      const includeRegex =
        /<include\s+src="([^"]+)"><\/include>|<include\s+src="([^"]+)"\s*\/>/g;
      return html.replace(
        includeRegex,
        (match: string, src1: string, src2: string) => {
          const src = src1 || src2;
          try {
            const filePath = path.resolve(process.cwd(), src);
            return fs.readFileSync(filePath, "utf-8");
          } catch (e) {
            console.error(`Could not include file: ${src}`, e);
            return match;
          }
        },
      );
    },
    handleHotUpdate({ file, server }: { file: string; server: any }) {
      if (file.endsWith(".html") && file.includes("/partials/")) {
        server.ws.send({
          type: "full-reload",
          path: "*",
        });
      }
    },
  };
}

export default defineConfig({
  plugins: [tailwindcss(), htmlIncludes()],
});
