import { useRef } from "react";
import { Button } from "@/components/ui/button";
import { JSXPreview } from "@/components/ui/jsx-preview";
import { Download } from "lucide-react";
import domtoimage from "dom-to-image-more";

// Este componente envuelve JSXPreview y agrega el botón de captura
export function JSXPreviewWithCapture({ jsx }: { jsx: string }) {
  const previewRef = useRef<HTMLDivElement>(null);

  const handleCapture = async () => {
    if (!previewRef.current) return;
    try {
      // Captura el contenido del componente como imagen usando dom-to-image-more
      const dataUrl = await domtoimage.toPng(previewRef.current, {
        cacheBust: true,
        bgcolor: undefined, // Usa el fondo original
      });
      // Descarga la imagen
      const link = document.createElement("a");
      link.download = "componente-nutricion.png";
      link.href = dataUrl;
      link.click();
    } catch (err) {
      alert("No se pudo capturar la imagen. Intenta con otro navegador.");
    }
  };

  return (
    <div className="relative group">
      <div ref={previewRef}>
        <JSXPreview jsx={jsx} />
      </div>
      <Button
        type="button"
        size="icon"
        variant="secondary"
        className="absolute top-2 right-2 opacity-80 group-hover:opacity-100"
        onClick={handleCapture}
        title="Descargar imagen"
      >
        <Download className="w-4 h-4" />
      </Button>
    </div>
  );
}
