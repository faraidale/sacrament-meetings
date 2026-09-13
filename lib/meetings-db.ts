import type { SacramentMeeting } from './type';

const meetings: SacramentMeeting[] = [
    {
        id: 1,
        date: '2026-09-13',
        meetingType: 'regular',
        presiding: 'Bishop Rwambiwa',
        conducting: 'Brother Ndlovu',
        openingHymn: { number: 19, title: 'We Thank Thee, O God, for a Prophet' },
        openingPrayer: 'Sister Lesedi',
        wardBusiness: [{ description: 'Sustaining of new Primary presidency' }],
        stakeBusiness: false,
        sacramentHymn: { number: 169, title: "As Now We Take the Sacrament" },
        speakers: [
            { name: 'Sister Chidavaenzi', topic: 'Faith in Jesus Christ', type: 'speaker' },
            { name: 'Brother Duncan', topic: 'Enduring to the End', type: 'speaker' }
        ],
        closingHymn: { number: 85, title: 'How Firm a Foundation' },
        closingPrayer: 'Brother Mutasa',
        announcements: ['Ward Temple Trip next Saturday', 'Youth activity on Wednesday']
    },
    {
        id: 2,
        date: '2026-09-20',
        meetingType: 'testimony',
        presiding: 'Bishop Rwambiwa',
        conducting: 'Brother Ndlovu',
        openingHymn: { number: 134, title: 'I Believe in Christ' },
        openingPrayer: 'Brother Moyo',
        wardBusiness: [],
        stakeBusiness: false,
        sacramentHymn: { number: 172, title: 'In Humility, Our Savior' },
        speakers: [],
        closingHymn: { number: 152, title: 'God Be with You Till We Meet Again' },
        closingPrayer: 'Sister Dumukwa',
        announcements: ['Fast Sunday', 'Tithing settlement sign-ups available']
    },
    {
        id: 3,
        date: '2026-09-27',
        meetingType: 'regular',
        presiding: 'Bishop Rwambiwa',
        conducting: 'Brother Makunda',
        openingHymn: { number: 27, title: 'Praise to the Man' },
        openingPrayer: 'Sister Shumba',
        wardBusiness: [{ description: 'Releasing the Sunday School presidency' }],
        stakeBusiness: false,
        sacramentHymn: { number: 173, title: 'While of These Emblems We Partake' },
        speakers: [
            { name: 'Brother Shumba', topic: 'The Power of Prayer', type: 'speaker' },
            { name: 'Ward Choir', topic: 'Redeemer of Israel', type: 'musical-number' }
        ],
        closingHymn: { number: 220, title: 'Lord, I Would Follow Thee' },
        closingPrayer: 'Brother Shumba',
        announcements: ['Stake Conference next week']
    },
    {
        id: 4,
        date: '2026-10-04',
        meetingType: 'stake',
        presiding: 'Stake President Chitiyo',
        conducting: 'Brother Chikosi',
        openingHymn: { number: 5, title: 'High on the Mountain Top' },
        openingPrayer: 'Sister Mapfumo',
        wardBusiness: [],
        stakeBusiness: true,
        sacramentHymn: { number: 0, title: 'N/A' },
        speakers: [
            { name: 'Sister Nkomo', topic: 'Ministering', type: 'speaker' },
            { name: 'Stake President Chitiyo', topic: 'Building Zion together', type: 'speaker' }
        ],
        closingHymn: { number: 30, title: 'Come, Come, Ye Saints' },
        closingPrayer: 'Brother Sibanda',
        announcements: ['Stake conference begins at 10:00 a.m.']
    },
    {
        id: 5,
        date: '2026-10-11',
        meetingType: 'general',
        presiding: 'Bishop Rwambiwa',
        conducting: 'Brother Makunda',
        openingHymn: { number: 26, title: 'Joseph Smith’s First Prayer' },
        openingPrayer: 'Brother Ncube',
        wardBusiness: [],
        stakeBusiness: false,
        sacramentHymn: { number: 171, title: 'With Humble Heart' },
        speakers: [
            { name: 'Primary Children', topic: 'I Am a Child of God', type: 'musical-number' },
            { name: 'Sister Ncube', topic: 'Hope and Healing', type: 'speaker' }
        ],
        closingHymn: { number: 270, title: 'I’ll Go Where You Want Me to Go' },
        closingPrayer: 'Sister Makunda',
        announcements: ['Ward Potluck after the meeting']
    }
];

export function getMeetings(date?: string | null): SacramentMeeting[] {
    if (date) return meetings.filter(m => m.date === date);
    return meetings;
}

export function getMeetingById(id: number): SacramentMeeting | null {
    return meetings.find(m => m.id === id) ?? null;
}

export function getCurrentMeeting(today = new Date()): SacramentMeeting | null {
    const todayIso = [
        today.getFullYear(),
        String(today.getMonth() + 1).padStart(2, '0'),
        String(today.getDate()).padStart(2, '0')
    ].join('-');

    return meetings.find(meeting => meeting.date >= todayIso) ?? null;
}