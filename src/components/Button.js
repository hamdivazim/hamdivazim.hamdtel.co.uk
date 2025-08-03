import Link from "next/link";
import clsx from "clsx";

export default function Button({ accented = false, href, className = "", children, ...props }) {
    const baseClasses =
        "inline-flex items-center justify-center px-4 py-2 rounded-xl font-medium transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 whitespace-nowrap font-sans";
    const styleClasses = accented
        ? "bg-cyan-600 text-white hover:bg-cyan-700 focus:ring-cyan-700"
        : "bg-white/10 text-white hover:bg-white/20 border border-white/20 focus:ring-white";

    const combinedClasses = clsx(baseClasses, styleClasses, className);

    if (href) {
        const isInternal = href.startsWith("/");

        return isInternal ? (
            <Link href={href} className={combinedClasses} {...props}>
                {children}
            </Link>
        ) : (
            <a
                href={href}
                className={combinedClasses}
                target="_blank"
                rel="noopener noreferrer"
                {...props}
            >
                {children}
            </a>
        );
    }

    return (
        <button className={combinedClasses} {...props}>
            {children}
        </button>
    );
}
