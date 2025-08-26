import {ReactNode, useState} from 'react';

// Components
import {SectionHeader} from '../../components/layout/HeaderPage';
import CenteredModal from '../../components/layout/CenteredModal';
import CloseButton from '../../components/layout/CloseButton';


export default function Links() {
    return (
        <>
            <SectionHeader className="mb-5">Wellness Links</SectionHeader>
            <section className="flex flex-col gap-3">
                <WellnessCard name="Lorem ipsum dolor sit amet" element={<Link1 />}>
                    Lorem ipsum dolor sit amet.
                </WellnessCard>
            </section>
        </>
    );
}

type WellnessCardProps = {name: string, element: JSX.Element, children: ReactNode};
function WellnessCard(props: WellnessCardProps) {
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

function Link1() {
    return (
        <div className="space-y-4">
            <h2 className="text-xl font-semibold">Lorem ipsum dolor sit amet</h2>
            <div className="space-y-3">
                <div>
                    <h3 className="font-medium">Lorem ipsum dolor sit amet</h3>
                    <p className="text-sm text-secondary">Lorem ipsum dolor sit amet</p>
                    <a href="https://www.test.test/" target="_blank" rel="noopener noreferrer" className="text-theme underline text-sm">
                        Lorem ipsum dolor sit amet
                    </a>
                </div>
            </div>
        </div>
    );
}
