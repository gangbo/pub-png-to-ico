'use client'
import React, { useState, useCallback } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { Upload, Download } from 'lucide-react';
import { useToast } from "@/components/ui/use-toast";

const PngToIcoConverter: React.FC = () => {
    const [selectedFile, setSelectedFile] = useState<File | null>(null);
    const [convertedImage, setConvertedImage] = useState<string | null>(null);
    const [isConverting, setIsConverting] = useState(false);
    const { toast } = useToast();

    const handleConvert = useCallback(async (file: File) => {
        setIsConverting(true);
        const formData = new FormData();
        formData.append('file', file);

        try {
            const response = await fetch('/api/convert-png-to-ico', {
                method: 'POST',
                body: formData,
            });

            if (!response.ok) {
                throw new Error('Conversion failed');
            }

            const blob = await response.blob();
            setConvertedImage(URL.createObjectURL(blob));
            toast({
                title: "Conversion successful",
                description: "Your PNG has been converted to ICO.",
            });
        } catch (error) {
            console.error('Error:', error);
            toast({
                title: "Conversion failed",
                description: "An error occurred during conversion. Please try again.",
                variant: "destructive",
            });
        } finally {
            setIsConverting(false);
        }
    }, [toast]);

    const handleFileChange = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
        if (event.target.files && event.target.files[0]) {
            const file = event.target.files[0];
            if (file.type !== 'image/png') {
                toast({
                    title: "Invalid file type",
                    description: "Please select a PNG file.",
                    variant: "destructive",
                });
                return;
            }
            setSelectedFile(file);
            setConvertedImage(null);
            handleConvert(file);
        }
    }, [handleConvert, toast]);

    const handleDownload = useCallback(() => {
        if (convertedImage) {
            const link = document.createElement('a');
            link.href = convertedImage;
            link.download = 'converted.ico';
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
        }
    }, [convertedImage]);

    return (
        <div className="container mx-auto p-4">
            <Card className="p-6">
                <h1 className="text-2xl font-bold mb-4">PNG to ICO Converter</h1>
                <div className="space-y-4">
                    <div className={"py-4"}>
                        <Input
                            type="file"
                            accept=".png"
                            onChange={handleFileChange}
                        />
                    </div>
                    {isConverting && (
                        <div className="text-center text-gray-600">
                            Converting...
                        </div>
                    )}
                    {convertedImage && (
                        <div className="flex items-start space-x-4">
                            <img src={convertedImage} alt="Converted ICO" className="max-w-[200px] h-auto" />
                            <Button onClick={handleDownload} className="flex-shrink-0">
                                Download ICO
                                <Download className="ml-2 h-4 w-4" />
                            </Button>
                        </div>
                    )}
                </div>
            </Card>
        </div>
    );
};

export default PngToIcoConverter;