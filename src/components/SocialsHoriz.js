import { FaGithub, FaYoutube, FaStackOverflow, FaDev, FaEnvelope } from 'react-icons/fa';
import { SiCredly } from 'react-icons/si';

export default function SocialsHoriz({ className = '' }) {
    return (
        <div className={`flex gap-4 text-white ${className}`}>
            <a
                href="https://github.com/hamdivazim"
                aria-label="GitHub"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-gray-400 transition-colors duration-200"
            >
                <FaGithub />
            </a>
            <a
                href="https://youtube.com/@hamdivazim"
                aria-label="YouTube"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-[#FF0000] transition-colors duration-200"
            >
                <FaYoutube />
            </a>
            <a
                href="https://dev.to/hamdivazim"
                aria-label="Dev.to"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-gray-400 transition-colors duration-200"
            >
                <FaDev />
            </a>
            <a
                href="https://www.credly.com/users/hamd-muhammad-waseem/badges#credly"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Credly"
                className="hover:text-[#F36C21] transition"
            >
                <SiCredly />
            </a>
            <a
                href="https://stackoverflow.com/users/19800717/hamdivazim"
                aria-label="Stack Overflow"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-[#F48024] transition-colors duration-200"
            >
                <FaStackOverflow />
            </a>
            <a
                href="mailto:hamd.waseem@hamdtel.co.uk"
                aria-label="Email"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-cyan-400 transition-colors duration-200"
            >
                <FaEnvelope />
            </a>
        </div>
    );
}
