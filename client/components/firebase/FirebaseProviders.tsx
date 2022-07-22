import {ReactNode} from 'react';
import { useFirebaseApp, useInitFirestore, AuthProvider, FunctionsProvider, FirestoreProvider, AnalyticsProvider } from 'reactfire';
import { getFirestore, initializeFirestore, enableIndexedDbPersistence, connectFirestoreEmulator } from 'firebase/firestore';
import { getAuth, connectAuthEmulator } from 'firebase/auth';
import { getFunctions, connectFunctionsEmulator } from 'firebase/functions';
import { getAnalytics } from 'firebase/analytics';


export default function FirebaseProviders(props: {children: ReactNode}) {
    const firebase = useFirebaseApp();

    // Initialize firebase SDKs
    const auth = getAuth(firebase);
    const functions = getFunctions(firebase);
    const analytics = getAnalytics(firebase);
    const firestore = getFirestore(firebase);

    // Set up emulators on dev build
    // TODO: should this go into a useEffect? this seems to spam the emulator connections quite a bit
    // though maybe that's ok
    if (process.env.NODE_ENV !== 'production') {
        connectAuthEmulator(auth, 'http://localhost:9099');
        connectFunctionsEmulator(functions, 'localhost', 5001);
        connectFirestoreEmulator(firestore, 'localhost', 8080);
    }

    return (
        <AuthProvider sdk={auth}>
            <FunctionsProvider sdk={functions}>
                <FirestoreProvider sdk={firestore}>
                    <AnalyticsProvider sdk={analytics}>
                        {props.children}
                    </AnalyticsProvider>
                </FirestoreProvider>
            </FunctionsProvider>
        </AuthProvider>
    )
}
