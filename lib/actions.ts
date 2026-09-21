'use server';

import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';
import { z } from 'zod';
import {
    addMeeting,
    deleteMeeting,
    getMeetingById,
    updateMeeting,
} from './meetings-db';
import type { MeetingType, SacramentMeeting, SpeakerItem, WardBusinessItem } from './type';

const meetingTypes = ['testimony', 'regular', 'stake', 'general', 'special'] as const;
const jsonArray = z.string().default('[]').refine((value) => {
    try {
        return Array.isArray(JSON.parse(value));
    } catch {
        return false;
    }
}, 'Enter a valid JSON array.');

const MeetingFormSchema = z.object({
    date: z.string().min(1, 'Date is required.'),
    meetingType: z.enum(meetingTypes),
    presiding: z.string().trim().min(1, 'Presiding is required.'),
    conducting: z.string().trim().min(1, 'Conducting is required.'),
    openingHymnNumber: z.coerce.number().int().min(0, 'Enter a valid hymn number.'),
    openingHymnTitle: z.string().trim().min(1, 'Opening hymn title is required.'),
    openingPrayer: z.string().trim().min(1, 'Opening prayer is required.'),
    wardBusiness: jsonArray,
    stakeBusiness: z.boolean(),
    sacramentHymnNumber: z.coerce.number().int().min(0, 'Enter a valid hymn number.'),
    sacramentHymnTitle: z.string().trim().min(1, 'Sacrament hymn title is required.'),
    speakers: jsonArray,
    closingHymnNumber: z.coerce.number().int().min(0, 'Enter a valid hymn number.'),
    closingHymnTitle: z.string().trim().min(1, 'Closing hymn title is required.'),
    closingPrayer: z.string().trim().min(1, 'Closing prayer is required.'),
    announcements: z.string().default(''),
});

export type FormState = {
    message: string;
    errors?: Record<string, string[]>;
};

function formDataToObject(formData: FormData) {
    return {
        date: String(formData.get('date') ?? ''),
        meetingType: String(formData.get('meetingType') ?? ''),
        presiding: String(formData.get('presiding') ?? ''),
        conducting: String(formData.get('conducting') ?? ''),
        openingHymnNumber: String(formData.get('openingHymnNumber') ?? ''),
        openingHymnTitle: String(formData.get('openingHymnTitle') ?? ''),
        openingPrayer: String(formData.get('openingPrayer') ?? ''),
        wardBusiness: String(formData.get('wardBusiness') ?? '[]'),
        stakeBusiness: formData.get('stakeBusiness') === 'on',
        sacramentHymnNumber: String(formData.get('sacramentHymnNumber') ?? ''),
        sacramentHymnTitle: String(formData.get('sacramentHymnTitle') ?? ''),
        speakers: String(formData.get('speakers') ?? '[]'),
        closingHymnNumber: String(formData.get('closingHymnNumber') ?? ''),
        closingHymnTitle: String(formData.get('closingHymnTitle') ?? ''),
        closingPrayer: String(formData.get('closingPrayer') ?? ''),
        announcements: String(formData.get('announcements') ?? ''),
    };
}

function toMeeting(data: z.infer<typeof MeetingFormSchema>): Omit<SacramentMeeting, 'id'> {
    return {
        date: data.date,
        meetingType: data.meetingType as MeetingType,
        presiding: data.presiding,
        conducting: data.conducting,
        announcements: data.announcements.split('\n').map((item) => item.trim()).filter(Boolean),
        openingHymn: { number: data.openingHymnNumber, title: data.openingHymnTitle },
        openingPrayer: data.openingPrayer,
        wardBusiness: JSON.parse(data.wardBusiness) as WardBusinessItem[],
        stakeBusiness: data.stakeBusiness,
        sacramentHymn: { number: data.sacramentHymnNumber, title: data.sacramentHymnTitle },
        speakers: JSON.parse(data.speakers) as SpeakerItem[],
        closingHymn: { number: data.closingHymnNumber, title: data.closingHymnTitle },
        closingPrayer: data.closingPrayer,
    };
}

function validationState(result: z.ZodSafeParseError<z.infer<typeof MeetingFormSchema>>): FormState {
    const errors: Record<string, string[]> = {};
    for (const issue of result.error.issues) {
        const field = String(issue.path[0] ?? 'form');
        errors[field] = [...(errors[field] ?? []), issue.message];
    }

    return { message: 'Please correct the highlighted fields.', errors };
}

export async function createMeeting(
    _previousState: FormState,
    formData: FormData,
): Promise<FormState> {
    const result = MeetingFormSchema.safeParse(formDataToObject(formData));
    if (!result.success) return validationState(result);

    try {
        await addMeeting(toMeeting(result.data));
    } catch (error) {
        console.error('Failed to create meeting', error);
        throw new Error('Unable to create the meeting. Please try again.');
    }

    revalidatePath('/meetings');
    redirect('/meetings');
}

export async function updateMeetingAction(
    id: number,
    _previousState: FormState,
    formData: FormData,
): Promise<FormState> {
    const result = MeetingFormSchema.safeParse(formDataToObject(formData));
    if (!result.success) return validationState(result);

    try {
        const meeting = await getMeetingById(id);
        if (!meeting) return { message: 'That meeting no longer exists.' };
        await updateMeeting(id, toMeeting(result.data));
    } catch (error) {
        console.error('Failed to update meeting', error);
        throw new Error('Unable to update the meeting. Please try again.');
    }

    revalidatePath('/meetings');
    revalidatePath(`/meetings/${id}`);
    redirect('/meetings');
}

export async function deleteMeetingAction(id: number): Promise<void> {
    try {
        await deleteMeeting(id);
    } catch (error) {
        console.error('Failed to delete meeting', error);
        throw new Error('Unable to delete the meeting. Please try again.');
    }

    revalidatePath('/meetings');
    redirect('/meetings');
}