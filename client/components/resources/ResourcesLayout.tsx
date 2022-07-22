import {Suspense} from 'react';
import {Link, Outlet} from 'react-router-dom';
import ResourcesFallback from './ResourcesFallback';


// The layout for the resources subpages.
export default function ResourcesLayout() {
    return (
        <div className="container pt-24">
            <main className="px-4">
                <Link to="/utilities" className="block text-sm secondary text-inherit hover:no-underline -ml-4 mb-8">
                    ← Return to utilities
                </Link>
                <Suspense fallback={<ResourcesFallback />}>
                    <Outlet />
                </Suspense>
            </main>
        </div>
    )
}
