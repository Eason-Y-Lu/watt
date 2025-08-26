import {ReactNode, useState} from 'react';

// Components
import {SectionHeader} from '../../components/layout/HeaderPage';
import CenteredModal from '../../components/layout/CenteredModal';
import CloseButton from '../../components/layout/CloseButton';


export default function PhoneNumbers() {
    return (
        <>
            <SectionHeader className="mb-5">Wellness Phone Numbers</SectionHeader>
            <section className="flex flex-col gap-3">
                <PhoneCard name="Lorem ipsum dolor sit amet" element={<Phone1 />}>
                    Lorem ipsum dolor sit amet
                </PhoneCard>
            </section>
        </>
    );
}

type PhoneCardProps = {name: string, element: JSX.Element, children: ReactNode};
function PhoneCard(props: PhoneCardProps) {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <>
            <div className="flex items-center gap-4 rounded-lg shadow-md px-5 py-4 cursor-pointer bg-gray-100 dark:bg-background hover:bg-gray-50/50 dark:hover:bg-content-secondary transition duration-200" onClick={() => setIsOpen(true)}>
                <h3>{props.name}</h3>
                <p className="font-light">
                    {props.children}
                </p>
            </div>

            <CenteredModal className="relative p-6 md:py-7 md:px-8 mx-2 bg-content rounded-lg shadow-xl box-content max-w-prose max-h-[90%] overflow-y-auto scrollbar-none" isOpen={isOpen} setIsOpen={setIsOpen}>
                <CloseButton className="absolute top-4 right-4 md:right-6" onClick={() => setIsOpen(false)} />
                {props.element}
            </CenteredModal>
        </>
    )
}

function Phone1() {
    return (
        <div className="space-y-4">
            <h2 className="text-xl font-semibold">Crisis & Emergency</h2>
            <div className="space-y-3">
                <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-700 rounded p-3">
                    <h3 className="font-medium text-red-800 dark:text-red-200">Emergency Services</h3>
                    <p className="text-red-700 dark:text-red-300 font-bold text-lg">911</p>
                    <p className="text-sm text-red-600 dark:text-red-400">For immediate medical, fire, or police emergencies</p>
                </div>
                <div>
                    <h3 className="font-medium">Lorem ipsum dolor sit amet</h3>
                    <p className="font-bold text-lg">xxx-xxx-xxxx</p>
                    <p className="text-sm text-secondary">Lorem ipsum dolor sit amet</p>
                </div>
            </div>
        </div>
    );
}
