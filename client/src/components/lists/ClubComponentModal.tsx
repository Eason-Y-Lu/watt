import { useContext } from 'react';
import { Dialog } from '@headlessui/react';
import { Club } from '@watt/shared/data/clubs';

// Components
import CenteredModal from '../layout/CenteredModal';
import OutlineButton, { DangerOutlineButton } from '../layout/OutlineButton';
import Badge from '../layout/Badge';

// Context
import UserDataContext from '../../contexts/UserDataContext';

// Firestore
import { useAuth, useFirestore, useUser } from 'reactfire';
import { updateUserData } from '../../util/firestore';


type ClubComponentModalProps = Club & {
    id: string, isOpen: boolean, setIsOpen: (open: boolean) => void
}
export default function ClubComponentModal(props: ClubComponentModalProps) {
    const { name, desc, id, room, day, time, prez, advisor, email, coadvisor, coemail, isOpen, setIsOpen } = props;

    // Firestore
    const auth = useAuth();
    const firestore = useFirestore();
    const { status, data: user } = useUser();

    const userData = useContext(UserDataContext);
    const pinned = userData.clubs.includes(id);

    // Functions to update pins
    const addToPinned = async () => {
        setIsOpen(false);
        await updateUserData('clubs', [...userData.clubs, id], auth, firestore);
    }
    const removeFromPinned = async () => {
        setIsOpen(false);
        await updateUserData('clubs', userData.clubs.filter(clubID => clubID !== id), auth, firestore);
    }

    const clubInputId = {
        'Monday': '1696394268',
        'Tuesday': '1286398699',
        'Wednesday': '1790776594',
        'Thursday': '438816767',
        'Friday': '834410885'
    }[day.split(',')[0]];

    // Prefill the form link from club and user name, if it exists
    const prefilledData = {
        ...(clubInputId && {
            [`entry.${clubInputId}`]: name
        }),
        ...(user && {
            ['entry.2019720537']: `950${user.email?.match(/\d+/)}`,
            ['entry.245716957']: day.split(',')[0],
            ['emailAddress']: user.email,
            ['entry.878125936']: user.displayName
        })
    } as Record<string, string>;

    const prefilledLink = `https://docs.google.com/forms/d/e/1FAIpQLSf_K0HpLJBe6SlmX8feUc_xCb2_bs75MLyzf8p2N3G1QcDA8Q/viewform?${new URLSearchParams(prefilledData)}`;

    return (
        <CenteredModal className="relative flex flex-col bg-content rounded-md max-w-md max-h-[90%] mx-2 p-6 shadow-xl" isOpen={isOpen} setIsOpen={setIsOpen}>
            <Dialog.Title className="text-xl font-semibold mb-3 pr-6">
                {name}{props.new && <Badge className="ml-2">New</Badge>}
            </Dialog.Title>
            <section className="flex gap-6 justify-between">
                <div className="basis-1/3">
                    <p><strong className="text-secondary font-medium">Day:</strong> {day}</p>
                    <p><strong className="text-secondary font-medium">Time:</strong> {time}</p>
                    <p><strong className="text-secondary font-medium">Location:</strong> {room}</p>
                </div>
                <div className="text-right">
                    <p><strong className="text-secondary font-medium">President(s):</strong> {prez}</p>
                    <p><strong className="text-secondary font-medium">Advisor(s):</strong> {advisor}{coadvisor && ', ' + coadvisor}</p>
                    <p><strong className="text-secondary font-medium">Email(s):</strong> {email}{coemail && ', ' + coemail}</p>
                </div>
            </section>
            <hr className="my-3" />

            <section className="mb-4 overflow-scroll scroll-smooth scrollbar-none">
                <Dialog.Description>{desc}</Dialog.Description>
            </section>

            <section className="flex gap-3 flex-wrap justify-end">
                {pinned ? (
                    <OutlineButton onClick={removeFromPinned}>
                        Remove from my list
                    </OutlineButton>
                ) : (
                    <OutlineButton onClick={addToPinned}>
                        Add to my list
                    </OutlineButton>
                )}
                <a href={prefilledLink} tabIndex={-1} target="_blank" rel="noopener noreferrer">
                    <OutlineButton>Check In</OutlineButton>
                </a>
                <DangerOutlineButton onClick={() => setIsOpen(false)}>
                    Close
                </DangerOutlineButton>
            </section>
        </CenteredModal>
    )
}
