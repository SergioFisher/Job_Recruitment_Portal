export default function Footer() {
    return (
        <footer className="bg-gray-100 py-6 mt-12">
            <div className="max-w-7xl mx-auto text-center text-gray-500 text-sm">
                © {new Date().getFullYear()} JobFinder. All rights reserved.
            </div>
        </footer>
    );
}
