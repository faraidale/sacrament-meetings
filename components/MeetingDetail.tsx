'use client';
import type { SacramentMeeting } from '@/lib/type';

export default function MeetingDetail({ meeting }: { meeting: SacramentMeeting }) {
    const dateObj = new Date(meeting.date);
    const formattedDate = dateObj.toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' });

    return (
        <article className="meeting-program">
            <header className="program-cover">
                <div className="program-kicker"><span />Colne Valley Ward</div>
                <h1>Sacrament Meeting</h1>
                <p className="program-date">{formattedDate}</p>
                <p className="program-subtitle">An order of worship, reflection, and fellowship</p>
                {meeting.stakeBusiness && (
                    <p className="program-alert">Stake Business</p>
                )}
            </header>

            <div className="program-meta">
                <div><span>Presiding</span><strong>{meeting.presiding}</strong></div>
                <div><span>Conducting</span><strong>{meeting.conducting}</strong></div>
            </div>

            {meeting.announcements && meeting.announcements.length > 0 && (
                <section className="program-note">
                    <h2>Announcements</h2>
                    <ul>
                        {meeting.announcements.map((ann, i) => (
                            <li key={i}>{ann}</li>
                        ))}
                    </ul>
                </section>
            )}

            <div className="program-body">
                <section className="program-section">
                    <div className="section-heading"><span>01</span><h2>Opening</h2></div>
                    <div className="program-item"><span>Opening Hymn</span><strong>{meeting.openingHymn.title} <em>No. {meeting.openingHymn.number}</em></strong></div>
                    <div className="program-item"><span>Invocation</span><strong>{meeting.openingPrayer}</strong></div>
                </section>

                {meeting.wardBusiness.length > 0 && (
                    <section className="program-section">
                        <div className="section-heading"><span>02</span><h2>Ward & Stake Business</h2></div>
                        {meeting.wardBusiness.map((biz, i) => (
                            <div className="business-item" key={i}>{biz.description}</div>
                        ))}
                    </section>
                )}

                <section className="program-section sacrament-section">
                    <div className="section-heading"><span>03</span><h2>The Sacrament</h2></div>
                    <div className="program-item"><span>Sacrament Hymn</span><strong>{meeting.sacramentHymn.title} <em>No. {meeting.sacramentHymn.number}</em></strong></div>
                    <p className="sacrament-note">Administration of the Sacrament</p>
                </section>

                <section className="program-section">
                    <div className="section-heading"><span>04</span><h2>Messages & Music</h2></div>
                    <div className="speaker-grid">
                        {meeting.speakers.map((speaker, i) => (
                            <div className="speaker-card" key={i}>
                                <span>{speaker.type === 'musical-number' ? 'Musical Number' : 'Speaker'}</span>
                                <strong>{speaker.name}</strong>
                                {speaker.topic && <em>{speaker.topic}</em>}
                            </div>
                        ))}
                    </div>
                </section>

                <section className="program-section">
                    <div className="section-heading"><span>05</span><h2>Closing</h2></div>
                    <div className="program-item"><span>Closing Hymn</span><strong>{meeting.closingHymn.title} <em>No. {meeting.closingHymn.number}</em></strong></div>
                    <div className="program-item"><span>Benediction</span><strong>{meeting.closingPrayer}</strong></div>
                </section>
            </div>

            <div className="program-actions print:hidden">
                <button onClick={() => window.print()} className="print-button"><span aria-hidden="true">↗</span> Print program</button>
            </div>
        </article>
    );
}
