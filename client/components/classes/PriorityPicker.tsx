import { useContext } from 'react';
import Picker from '../layout/Picker';
import UserDataContext from '../../contexts/UserDataContext';
import { parseLabelColor, parsePriority } from '../../util/sgyFunctions';
import { Bookmark } from 'react-feather';


type PriorityPickerProps = {
    priority: number, setPriority: (p: number) => any,
    icon?: (priority: number) => JSX.Element,
    align?: 'right' | 'left'
};
export default function PriorityPicker(props: PriorityPickerProps) {
    const {priority, setPriority, icon, align} = props;
    const userData = useContext(UserDataContext);

    return (
        <Picker className="priority">
            {(open, setOpen) => <>
                <div>
                    {icon
                        ? icon(priority)
                        : <Bookmark color={parsePriority(priority, userData)} size={30} onClick={() => setOpen(!open)} />
                    }
                </div>

                <div className={"priority-picker" + (align === "right" ? ' right' : ' left')} hidden={!open}>
                    {[0, 1, 2, 3, -1].map(p =>
                        <div className="priority-picker-priority" key={p} onClick={() => setPriority(p)}>
                            <div
                                // TODO: see comment about extracting dots in UpcomingPalette.tsx
                                className="priority-picker-priority-dot"
                                style={{
                                    backgroundColor: p === priority ? parsePriority(p, userData) : 'var(--content-primary)',
                                    border: p === priority ? '' : '2px inset var(--secondary)'
                                }}
                            >
                                {p + 1}
                            </div>
                            <div>{p !== -1 ? `Priority ${p+1}` : 'No Priority'}</div>
                        </div>
                    )}
                </div>
            </>}
        </Picker>
    );
}
