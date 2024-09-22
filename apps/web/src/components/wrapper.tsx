import { ReactNode } from 'react';

export default function Wrapper({ children }: { children: ReactNode }) {
    return (
        <div className="bg-white pt-15"> {/* Added pt-20 to offset the fixed navbar height */}
            <div className="max-w-full sm:max-w-2xl lg:max-w-4xl xl:max-w-7xl mx-auto p-4 sm:p-6 lg:p-8">
                {children}
            </div>
        </div>
    );
}