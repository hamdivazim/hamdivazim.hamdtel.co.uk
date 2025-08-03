import SocialsHoriz from "./SocialsHoriz";

export default function Footer() {
    return (
        <div className="row-start-3 flex gap-[24px] flex-wrap items-center justify-center bg-indigo-950 text-gray-400 py-4 text-xs font-sans">
            <p>Created by Hamd Waseem.</p>
            <SocialsHoriz className="text-lg" />
        </div>
    )
};