import {ReactNode} from 'react';


// A restyled bootstrap Tab component to be wrapped by StateTab and NavTab.
type TabProps = {children: ReactNode, active: boolean, onClick?: () => void};
export default function Tab(props: TabProps) {
    const {children, active, onClick} = props;

    return (
        <button className={`flex-grow cursor-pointer ${active ? 'text-primary dark:text-primary-dark bg-content dark:bg-content-dark shadow-content dark:shadow-content-dark' : 'secondary bg-content-secondary dark:bg-content-secondary-dark shadow-content-secondary dark:shadow-content-secondary-dark'} shadow-[0_0.25rem] rounded-t py-2 px-4`} onClick={onClick}>
            {children}
        </button>
    )
}
