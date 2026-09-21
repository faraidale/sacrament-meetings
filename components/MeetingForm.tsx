'use client';

import { useActionState } from 'react';
import type { FormState } from '@/lib/actions';
import type { SacramentMeeting } from '@/lib/type';

const emptyMeeting: Omit<SacramentMeeting, 'id'> = {
    date: '',
    meetingType: 'regular',
    presiding: '',
    conducting: '',
    announcements: [],
    openingHymn: { number: 0, title: '' },
    openingPrayer: '',
    wardBusiness: [],
    stakeBusiness: false,
    sacramentHymn: { number: 0, title: '' },
    speakers: [],
    closingHymn: { number: 0, title: '' },
    closingPrayer: '',
};

type FormAction = (state: FormState, formData: FormData) => Promise<FormState>;

function ErrorMessage({ name, errors }: { name: string; errors?: Record<string, string[]> }) {
    return <p id={`${name}-error`} aria-live="polite" className="mt-1 text-sm text-[#800000]">{errors?.[name]?.join(' ')}</p>;
}

export default function MeetingForm({ action, meeting }: { action: FormAction; meeting?: SacramentMeeting }) {
    const [state, formAction, isPending] = useActionState(action, { message: '' });
    const values = meeting ?? { ...emptyMeeting, openingHymn: { ...emptyMeeting.openingHymn }, sacramentHymn: { ...emptyMeeting.sacramentHymn }, closingHymn: { ...emptyMeeting.closingHymn } };

    function fieldError(name: string) {
        return state.errors?.[name] ?? [];
    }

    function errorId(name: string) {
        return `${name}-error`;
    }

    function fieldProps(name: string) {
        const errors = fieldError(name);
        return {
            id: name,
            name,
            'aria-invalid': errors.length > 0,
            'aria-describedby': errorId(name),
        };
    }

    return (
        <form action={formAction} className="grid gap-6 rounded-2xl border border-[#800000]/10 bg-white p-6 shadow-sm sm:p-8">
            {state.message && <p role="alert" className="rounded-lg bg-[#f4f1ea] p-4 text-sm font-semibold text-[#800000]">{state.message}</p>}
            <div className="grid gap-5 sm:grid-cols-2">
                <div>
                    <label htmlFor="date" className="block text-sm font-semibold text-[#2c2522]">Meeting date</label>
                    <input type="date" defaultValue={values.date} {...fieldProps('date')} className="form-input" />
                    <ErrorMessage errors={state.errors} name="date" />
                </div>
                <div>
                    <label htmlFor="meetingType" className="block text-sm font-semibold text-[#2c2522]">Meeting type</label>
                    <select defaultValue={values.meetingType} {...fieldProps('meetingType')} className="form-input">
                        <option value="regular">Regular</option><option value="testimony">Testimony</option><option value="stake">Stake</option><option value="general">General</option><option value="special">Special</option>
                    </select>
                    <ErrorMessage errors={state.errors} name="meetingType" />
                </div>
                <div>
                    <label htmlFor="presiding" className="block text-sm font-semibold text-[#2c2522]">Presiding</label>
                    <input defaultValue={values.presiding} {...fieldProps('presiding')} className="form-input" />
                    <ErrorMessage errors={state.errors} name="presiding" />
                </div>
                <div>
                    <label htmlFor="conducting" className="block text-sm font-semibold text-[#2c2522]">Conducting</label>
                    <input defaultValue={values.conducting} {...fieldProps('conducting')} className="form-input" />
                    <ErrorMessage errors={state.errors} name="conducting" />
                </div>
            </div>

            <fieldset className="grid gap-5 border-t border-[#800000]/10 pt-6 sm:grid-cols-2">
                <legend className="mb-1 font-serif text-2xl text-[#800000]">Opening</legend>
                <div>
                    <label htmlFor="openingHymnNumber" className="block text-sm font-semibold text-[#2c2522]">Opening hymn number</label>
                    <input type="number" min="0" defaultValue={values.openingHymn.number} {...fieldProps('openingHymnNumber')} className="form-input" />
                    <ErrorMessage errors={state.errors} name="openingHymnNumber" />
                </div>
                <div>
                    <label htmlFor="openingHymnTitle" className="block text-sm font-semibold text-[#2c2522]">Opening hymn title</label>
                    <input defaultValue={values.openingHymn.title} {...fieldProps('openingHymnTitle')} className="form-input" />
                    <ErrorMessage errors={state.errors} name="openingHymnTitle" />
                </div>
                <div className="sm:col-span-2">
                    <label htmlFor="openingPrayer" className="block text-sm font-semibold text-[#2c2522]">Opening prayer</label>
                    <input defaultValue={values.openingPrayer} {...fieldProps('openingPrayer')} className="form-input" />
                    <ErrorMessage errors={state.errors} name="openingPrayer" />
                </div>
            </fieldset>

            <fieldset className="grid gap-5 border-t border-[#800000]/10 pt-6 sm:grid-cols-2">
                <legend className="mb-1 font-serif text-2xl text-[#800000]">Sacrament</legend>
                <div>
                    <label htmlFor="sacramentHymnNumber" className="block text-sm font-semibold text-[#2c2522]">Sacrament hymn number</label>
                    <input type="number" min="0" defaultValue={values.sacramentHymn.number} {...fieldProps('sacramentHymnNumber')} className="form-input" />
                    <ErrorMessage errors={state.errors} name="sacramentHymnNumber" />
                </div>
                <div>
                    <label htmlFor="sacramentHymnTitle" className="block text-sm font-semibold text-[#2c2522]">Sacrament hymn title</label>
                    <input defaultValue={values.sacramentHymn.title} {...fieldProps('sacramentHymnTitle')} className="form-input" />
                    <ErrorMessage errors={state.errors} name="sacramentHymnTitle" />
                </div>
            </fieldset>

            <fieldset className="grid gap-5 border-t border-[#800000]/10 pt-6">
                <legend className="mb-1 font-serif text-2xl text-[#800000]">Messages and closing</legend>
                <div>
                    <label htmlFor="speakers" className="block text-sm font-semibold text-[#2c2522]">Speakers JSON</label>
                    <textarea defaultValue={JSON.stringify(values.speakers)} {...fieldProps('speakers')} className="form-input min-h-24 font-mono text-sm" />
                    <ErrorMessage errors={state.errors} name="speakers" />
                </div>
                <div>
                    <label htmlFor="wardBusiness" className="block text-sm font-semibold text-[#2c2522]">Ward business JSON</label>
                    <textarea defaultValue={JSON.stringify(values.wardBusiness)} {...fieldProps('wardBusiness')} className="form-input min-h-20 font-mono text-sm" />
                    <ErrorMessage errors={state.errors} name="wardBusiness" />
                </div>
                <div>
                    <label htmlFor="announcements" className="block text-sm font-semibold text-[#2c2522]">Announcements, one per line</label>
                    <textarea defaultValue={values.announcements?.join('\n')} {...fieldProps('announcements')} className="form-input min-h-20" />
                    <ErrorMessage errors={state.errors} name="announcements" />
                </div>
                <label htmlFor="stakeBusiness" className="flex items-center gap-3 text-sm font-semibold text-[#2c2522]">
                    <input id="stakeBusiness" type="checkbox" name="stakeBusiness" defaultChecked={values.stakeBusiness} aria-describedby="stakeBusiness-error" /> Stake business included
                </label>
                <p id="stakeBusiness-error" aria-live="polite" className="sr-only" />
                <div>
                    <label htmlFor="closingHymnNumber" className="block text-sm font-semibold text-[#2c2522]">Closing hymn number</label>
                    <input type="number" min="0" defaultValue={values.closingHymn.number} {...fieldProps('closingHymnNumber')} className="form-input" />
                    <ErrorMessage errors={state.errors} name="closingHymnNumber" />
                </div>
                <div>
                    <label htmlFor="closingHymnTitle" className="block text-sm font-semibold text-[#2c2522]">Closing hymn title</label>
                    <input defaultValue={values.closingHymn.title} {...fieldProps('closingHymnTitle')} className="form-input" />
                    <ErrorMessage errors={state.errors} name="closingHymnTitle" />
                </div>
                <div>
                    <label htmlFor="closingPrayer" className="block text-sm font-semibold text-[#2c2522]">Closing prayer</label>
                    <input defaultValue={values.closingPrayer} {...fieldProps('closingPrayer')} className="form-input" />
                    <ErrorMessage errors={state.errors} name="closingPrayer" />
                </div>
            </fieldset>

            <button type="submit" disabled={isPending} className="meeting-card-link w-fit disabled:cursor-wait disabled:opacity-60">
                {isPending ? 'Saving...' : meeting ? 'Save changes' : 'Create meeting'}
            </button>
        </form>
    );
}
