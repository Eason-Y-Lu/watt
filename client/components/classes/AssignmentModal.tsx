import { useContext, useState } from 'react';
import {Dialog} from '@headlessui/react';
import { useAuth, useFirestore } from 'reactfire';
import { Square, CheckSquare, Link, Edit, Trash2, SkipBack } from 'react-feather';
import {DateTime} from 'luxon';

// Components
import CenteredModal from '../layout/CenteredModal';
import CreateAssignmentModal from './CreateAssignmentModal';
import {AssignmentTimestamp} from './Assignments';
import {AssignmentTags} from './AssignmentTags';
import PriorityPicker from './PriorityPicker';

// Context
import UserDataContext from '../../contexts/UserDataContext';

// Utilities
import {AssignmentBlurb, deleteCustomAssignment, deleteModifiedAssignment, updateAssignment} from '../../util/sgyAssignments';
import {DATE_MED_NO_YEAR} from '../../util/dateFormats';


type AssignmentModalProps = {item: AssignmentBlurb, open: boolean, setOpen: (open: boolean) => any};
export default function AssignmentModal(props: AssignmentModalProps) {
    const {item, open, setOpen} = props;

    const userData = useContext(UserDataContext);
    const auth = useAuth();
    const firestore = useFirestore();

    const [editing, setEditing] = useState(false);
    const deleteCustom = () => {
        setOpen(false);
        return deleteCustomAssignment(item.id, userData, auth, firestore);
    }
    const reset = () =>
        deleteModifiedAssignment(item.id, userData, auth, firestore);

    const toggleCompleted = () =>
        updateAssignment({ ...item, completed: !item.completed }, userData, auth, firestore);

    const setPriority = (priority: number) => {
        if (priority === item.priority) return;
        return updateAssignment({ ...item, priority: priority }, userData, auth, firestore)
    }

    const isCustomAssignment = item.id.startsWith('W');
    const modified = !isCustomAssignment && userData.sgy.custom.modified.some(a => a.id === item.id);

    const CompletedIcon = !item.completed ? Square : CheckSquare;


    return (
        <CenteredModal className="item-modal relative flex flex-col gap-4 bg-sidebar dark:bg-sidebar-dark rounded-md max-w-lg max-h-[90%] p-6 mx-2" isOpen={open} setIsOpen={setOpen}>
            <section>
                <AssignmentTags className="mb-1.5" item={item} period />
                <span className="flex items-center gap-2">
                    {item.timestamp && (
                        <CompletedIcon
                            size={24}
                            className="cursor-pointer flex-none"
                            onClick={() => toggleCompleted()}
                        />
                    )}
                    {isCustomAssignment ? (
                        <Dialog.Title className="text-lg font-semibold break-words min-w-0">
                            {item.name}
                        </Dialog.Title>
                    ) : (
                        <a href={item.link} className="text-inherit dark:text-inherit" target="_blank" rel="noopener noreferrer">
                            <Dialog.Title className="text-lg font-semibold break-words min-w-0">
                                {item.name}
                            </Dialog.Title>
                        </a>
                    )}
                </span>
            </section>

            {item.description && (
                <section className="overflow-scroll scroll-smooth scrollbar-none whitespace-pre-wrap">
                    <Dialog.Description className="break-words min-w-0">
                        {item.description.trim()}
                    </Dialog.Description>
                </section>
            )}

            {item.timestamp && (
                <section className="flex gap-3 items-center">
                    <PriorityPicker priority={item.priority} setPriority={setPriority} />

                    <AssignmentTimestamp>
                        {item.timestamp.toLocaleString(DateTime.TIME_SIMPLE)} on {item.timestamp.toLocaleString(DATE_MED_NO_YEAR)}
                    </AssignmentTimestamp>

                    <Edit
                        className="cursor-pointer text-theme dark:text-theme-dark ml-auto"
                        onClick={() => setEditing(true)}
                    />
                    {isCustomAssignment && (
                        <Trash2
                            className="cursor-pointer text-theme dark:text-theme-dark"
                            onClick={deleteCustom}
                        />
                    )}
                    {modified && (
                        <SkipBack
                            className="cursor-pointer text-theme dark:text-theme-dark"
                            onClick={reset}
                        />
                    )}
                    <CreateAssignmentModal open={editing} setOpen={setEditing} item={item} />
                </section>
            )}
        </CenteredModal>
    )
}
