"use client";

import { useRef, useState } from "react";
import { uploadFile } from "@/lib/supabase";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";

type UploadImageButtonProps = {
  onUpload?: (url: string) => void;
};

export function UploadImageButton({ onUpload }: UploadImageButtonProps) {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [uploading, setUploading] = useState(false);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files?.[0]) {
      setSelectedFile(event.target.files[0]);
    }
  };

  const handleUpload = async () => {
    if (selectedFile) {
      setUploading(true);
      const url = await uploadFile(selectedFile);
      setUploading(false);
      setSelectedFile(null);
      if (onUpload && url) {
        onUpload(url);
      }
    }
  };

  return (
    <>
      <input
        type="file"
        accept="image/*"
        ref={fileInputRef}
        onChange={handleFileChange}
        className="hidden"
      />
      <Button
        type="button"
        size="icon"
        variant="outline"
        onClick={() => fileInputRef.current?.click()}
        disabled={uploading}
        className="self-stretch" // Esto ayuda a igualar la altura con el input si es necesario
      >
        <Plus className="w-5 h-5" />
      </Button>
      {selectedFile && (
        <Button
          type="button"
          onClick={handleUpload}
          disabled={uploading}
          className="ml-2"
        >
          {uploading ? "Subiendo..." : "Subir imagen"}
        </Button>
      )}
    </>
  );
}
