// import 'bootstrap/dist/css/bootstrap.min.css';
// import RouteGuard from '@/components/RouteGuard';
// import '../styles/globals.css';
// import { SWRConfig } from 'swr';
// import Layout from '@/components/Layout';

// export default function MyApp({ Component, pageProps }) {
//     return (
//         <SWRConfig value={{
//             fetcher: async (url) => {
//                 const res = await fetch(url);
//                 if (!res.ok) {
//                     const error = new Error('An error occurred while fetching the data.');
//                     error.info = await res.json();
//                     error.status = res.status;
//                     throw error;
//                 }
//                 return res.json();
//             }
//         }}>
//             <Layout>
//                 <Component {...pageProps} />
//             </Layout>
//         </SWRConfig>
//     );
// }

// pages/_app.js
import 'bootstrap/dist/css/bootstrap.min.css';
import RouteGuard from '@/components/RouteGuard'; // Import RouteGuard
import '@/styles/globals.css';
import { SWRConfig } from 'swr';
import Layout from '@/components/Layout';

export default function MyApp({ Component, pageProps }) {
    return (
        <SWRConfig 
            value={{
                fetcher: async (url) => {
                    const res = await fetch(url);
                    if (!res.ok) {
                        const error = new Error('An error occurred while fetching the data.');
                        error.info = await res.json();
                        error.status = res.status;
                        throw error;
                    }
                    return res.json();
                }
            }}
        >
            <RouteGuard> 
                <Layout>
                    <Component {...pageProps} />
                </Layout>
            </RouteGuard>
        </SWRConfig>
    );
}
