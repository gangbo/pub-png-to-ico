import { FileImage, Github } from 'lucide-react';
import Link from "next/link";
const Footer: React.FC = () => (
    <footer className="bg-gray-100 text-gray-600 p-4 mt-8">
        <div className="container mx-auto flex flex-col md:flex-row justify-between items-center">
            <div className="text-sm mb-4 md:mb-0">
                © 2024 PNG-to-ICO.com. All rights reserved.
            </div>
            <div className="flex space-x-4 items-center">
                {/*<Link href="/privacy" className="text-sm hover:text-violet-700">Privacy Policy</Link>*/}
                {/*<Link href="/terms" className="text-sm hover:text-violet-700">Terms of Service</Link>*/}
                {/*<a href="https://github.com/yourusername" className="text-gray-500 hover:text-violet-700"><Github size={20} /></a>*/}
            </div>
        </div>
    </footer>
);

export default Footer;