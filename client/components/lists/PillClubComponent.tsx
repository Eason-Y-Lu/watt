import { useState } from 'react';
import ClubComponentModal from './ClubComponentModal';
import {Club} from './ClubComponent';


export default function PillClubComponent(props: Club & {id: string}) {
    const {name} = props;
    const [modal, setModal] = useState(false);

    return (
        <>
            <span className="text-sm cursor-pointer px-2.5 py-1 secondary rounded-full bg-black/5 dark:bg-black/20 hover:bg-black/10 dark:hover:bg-black/40 transition duration-75" onClick={() => setModal(true)}>
                {name}
            </span>
            <ClubComponentModal {...props} isOpen={modal} setIsOpen={setModal} />
        </>
    );
}
