import { neon } from '@neondatabase/serverless';
import type { SacramentMeeting } from './type';

const sql = process.env.DATABASE_URL ? neon(process.env.DATABASE_URL) : null;
const ITEMS_PER_PAGE = 5;

const meetingFields = sql ? sql`
    id,
    to_char(date, 'YYYY-MM-DD') AS "date",
    meeting_type AS "meetingType",
    presiding,
    conducting,
    announcements,
    opening_hymn AS "openingHymn",
    opening_prayer AS "openingPrayer",
    ward_business AS "wardBusiness",
    stake_business AS "stakeBusiness",
    sacrament_hymn AS "sacramentHymn",
    speakers,
    closing_hymn AS "closingHymn",
    closing_prayer AS "closingPrayer"
` : null;

function searchPattern(query: string) {
    return `%${query.trim()}%`;
}

function requireDatabase() {
    if (!sql || !meetingFields) {
        throw new Error('DATABASE_URL is required to query meetings.');
    }

    return { sql, meetingFields };
}

export async function getMeetings(
    query = '',
    currentPage = 1,
    date?: string | null,
): Promise<SacramentMeeting[]> {
    const { sql, meetingFields } = requireDatabase();
    const searchTerm = searchPattern(query);
    const offset = Math.max(0, currentPage - 1) * ITEMS_PER_PAGE;

    const rows = await sql`
        SELECT ${meetingFields}
        FROM meetings
        WHERE (
            presiding ILIKE ${searchTerm}
            OR conducting ILIKE ${searchTerm}
            OR meeting_type ILIKE ${searchTerm}
            OR speakers::text ILIKE ${searchTerm}
        )
        ${date ? sql`AND date = ${date}` : sql``}
        ORDER BY date DESC
        LIMIT ${ITEMS_PER_PAGE} OFFSET ${offset}
    `;

    return rows as unknown as SacramentMeeting[];
}

export async function getMeetingsTotalPages(query = ''): Promise<number> {
    const { sql } = requireDatabase();
    const searchTerm = searchPattern(query);
    const rows = await sql`
        SELECT COUNT(*) AS count
        FROM meetings
        WHERE
            presiding ILIKE ${searchTerm}
            OR conducting ILIKE ${searchTerm}
            OR meeting_type ILIKE ${searchTerm}
            OR speakers::text ILIKE ${searchTerm}
    `;

    return Math.ceil(Number(rows[0].count) / ITEMS_PER_PAGE);
}

export async function getMeetingById(id: number): Promise<SacramentMeeting | null> {
    const { sql, meetingFields } = requireDatabase();
    const rows = await sql`
        SELECT ${meetingFields}
        FROM meetings
        WHERE id = ${id}
    `;

    return (rows[0] as unknown as SacramentMeeting) ?? null;
}

export async function getCurrentMeeting(today = new Date()): Promise<SacramentMeeting | null> {
    const { sql, meetingFields } = requireDatabase();
    const todayIso = today.toISOString().slice(0, 10);
    const rows = await sql`
        SELECT ${meetingFields}
        FROM meetings
        WHERE date >= ${todayIso}
        ORDER BY date ASC
        LIMIT 1
    `;

    return (rows[0] as unknown as SacramentMeeting) ?? null;
}

export async function addMeeting(
    data: Omit<SacramentMeeting, 'id'>,
): Promise<SacramentMeeting> {
    const { sql, meetingFields } = requireDatabase();
    const rows = await sql`
        INSERT INTO meetings (
            date, meeting_type, presiding, conducting, announcements,
            opening_hymn, opening_prayer, ward_business, stake_business,
            sacrament_hymn, speakers, closing_hymn, closing_prayer
        ) VALUES (
            ${data.date}, ${data.meetingType}, ${data.presiding}, ${data.conducting},
            ${data.announcements ?? []}, ${JSON.stringify(data.openingHymn)},
            ${data.openingPrayer}, ${JSON.stringify(data.wardBusiness)},
            ${data.stakeBusiness}, ${JSON.stringify(data.sacramentHymn)},
            ${JSON.stringify(data.speakers)}, ${JSON.stringify(data.closingHymn)},
            ${data.closingPrayer}
        )
        RETURNING ${meetingFields}
    `;

    return rows[0] as unknown as SacramentMeeting;
}

export async function updateMeeting(
    id: number,
    updates: Partial<SacramentMeeting>,
): Promise<SacramentMeeting | null> {
    const { sql, meetingFields } = requireDatabase();
    const rows = await sql`
        UPDATE meetings
        SET
            date = COALESCE(${updates.date ?? null}, date),
            meeting_type = COALESCE(${updates.meetingType ?? null}, meeting_type),
            presiding = COALESCE(${updates.presiding ?? null}, presiding),
            conducting = COALESCE(${updates.conducting ?? null}, conducting),
            announcements = COALESCE(${updates.announcements ?? null}, announcements),
            opening_hymn = COALESCE(${updates.openingHymn ? JSON.stringify(updates.openingHymn) : null}, opening_hymn),
            opening_prayer = COALESCE(${updates.openingPrayer ?? null}, opening_prayer),
            ward_business = COALESCE(${updates.wardBusiness ? JSON.stringify(updates.wardBusiness) : null}, ward_business),
            stake_business = COALESCE(${updates.stakeBusiness ?? null}, stake_business),
            sacrament_hymn = COALESCE(${updates.sacramentHymn ? JSON.stringify(updates.sacramentHymn) : null}, sacrament_hymn),
            speakers = COALESCE(${updates.speakers ? JSON.stringify(updates.speakers) : null}, speakers),
            closing_hymn = COALESCE(${updates.closingHymn ? JSON.stringify(updates.closingHymn) : null}, closing_hymn),
            closing_prayer = COALESCE(${updates.closingPrayer ?? null}, closing_prayer)
        WHERE id = ${id}
        RETURNING ${meetingFields}
    `;

    return (rows[0] as unknown as SacramentMeeting) ?? null;
}

export async function deleteMeeting(id: number): Promise<boolean> {
    const { sql } = requireDatabase();
    const rows = await sql`
        DELETE FROM meetings
        WHERE id = ${id}
        RETURNING id
    `;

    return rows.length > 0;
}
