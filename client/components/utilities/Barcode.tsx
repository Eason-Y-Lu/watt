import { useState, useEffect, useContext } from 'react';
import UserDataContext from '../../contexts/UserDataContext';
import BarcodeRow from './BarcodeRow';

// Firestore
import {useAuth, useFirestore} from 'reactfire';
import {updateUserData} from '../../firebase/updateUserData';

const DEFAULT_BARCODE = '95000000'


export default function Barcode() {
    const auth = useAuth();
    const firestore = useFirestore();

    const userData = useContext(UserDataContext);
    const [barcodes, setBarcodes] = useState<[string, string][]>(JSON.parse(userData.barcodes));

    // Add a default barcode
    function addBarcode() {
        const newBarcodes: [string, string][] = [...barcodes, [`Barcode ${barcodes.length + 1}`, DEFAULT_BARCODE]];
        setBarcodes(newBarcodes);
        updateBarcodes();
    }
    // Remove a barcode at an index
    function removeBarcode(i: number) {
        barcodes.splice(i, 1);
        setBarcodes([...barcodes]);
        updateBarcodes();
    }
    // Update a barcode name at an index
    function updateBarcodeName(i: number, value: string) {
        barcodes[i][0] = value;
        setBarcodes([...barcodes]);
    }
    // Update a barcode value at an index
    function updateBarcodeValue(i: number, value: string) {
        barcodes[i][1] = value;
        setBarcodes([...barcodes]);
    }
    // Update user data with changed barcodes
    // Call this function in onBlur instead of onChange to prevent excessive writes
    const updateBarcodes = () => updateUserData('barcodes', JSON.stringify(barcodes), auth, firestore);

    // TODO: refresh the barcodes when userData changes
    // This needs some thought put into it, as refreshing on every userData update will cause overrides
    // see https://discord.com/channels/795043639214604370/796516703638781992/877008940687302677
    //useEffect(() => {
    //    setBarcodes(JSON.parse(userData.barcodes));
    //}, [userData.barcodes])

    // The barcode of the logged in user or DEFAULT_BARCODE if the user or email is null
    const youCode = auth.currentUser?.email
        ? '950' + auth.currentUser.email.slice(2, 7)
        : DEFAULT_BARCODE;


    return (
        <div>
            <h1>Barcode</h1>
            <hr />

            <BarcodeRow name="You" className="you" code={youCode} readOnly />

            {barcodes.map(([name, code], index) =>
                <BarcodeRow name={name} code={code}
                    // Providing a key causes the BarcodeRows to lose focus on state change for some reason
                    //key={`${name}${code}${index}`}
                    removeBarcode={removeBarcode.bind(null, index)}
                    updateBarcodeName={updateBarcodeName.bind(null, index)}
                    updateBarcodeValue={updateBarcodeValue.bind(null, index)}
                    updateBarcodes={updateBarcodes}
                />
            )}

            <button className="barcode-add-button" onClick={addBarcode}>ADD BARCODE</button>
        </div>
    );
}
