/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { KPIMetric, BudgetCategory, ContentCalendarItem, ResponseScript, IncidentReport } from '../types';

export interface PolicySection {
  id: string;
  title: string;
  category: 'Overview' | 'Governance' | 'Operations' | 'Legal & Security' | 'Resources';
  content: string;
  citations?: string[];
  subsections?: { title: string; content: string }[];
}

export const policySections: PolicySection[] = [
  {
    id: 'executive-summary',
    title: 'Executive Summary',
    category: 'Overview',
    content: 'The Buganda Heritage and Tourism Board Library (BHTB Library) embraces social media as a strategic tool to advance its mission of preserving and promoting Buganda’s documentary heritage. By engaging diverse audiences online, the Library aims to expand access to cultural content, foster community outreach, and raise awareness of services and programs.',
    citations: ['IFLA Code of Ethics', 'ALA Guidelines', 'UNESCO Directives'],
    subsections: [
      {
        title: 'Core Commitments',
        content: 'Consistent with the IFLA Code of Ethics, which declares “the core mission of librarians…is to ensure access to information for all”, the Library’s social media policy emphasizes open, user-centered communication. It commits to professionalism, accuracy, transparency, and inclusiveness in all posts.'
      },
      {
        title: 'Governance Framework',
        content: 'This policy establishes a clear governance framework – defining roles, content approval workflows, and accountability – while aligning with Uganda’s legal standards (e.g. Data Protection and Privacy Act, 2019; Copyright and Neighbouring Rights Act; Computer Misuse Act, etc.) and with international best practices (ALA, IFLA, UNESCO).'
      },
      {
        title: 'Implementation & Strategy',
        content: 'Key provisions include a multiyear implementation plan with a centralized content calendar, platform-specific strategies (for Facebook, TikTok, etc.), staff training in social media skills, and a rigorous monitoring and evaluation system. Measurable performance indicators (followers, engagement rate, reach, response time) will be reported monthly and annually.'
      }
    ]
  },
  {
    id: 'mission-aims',
    title: 'Mission and Aims',
    category: 'Overview',
    content: 'Mission: Guided by the Library’s core mission to preserve and disseminate Buganda’s documentary heritage, this policy affirms that “the digital face of the library” (ALA) should extend that mission into the online sphere. In line with IFLA’s call to ensure information access “for all”, the Library will use social media to make cultural resources readily available, to educate the public, and to promote participation in heritage.',
    subsections: [
      {
        title: 'Standardize Content Processes',
        content: 'Establish clear procedures for creating, reviewing, approving, and publishing social media content to ensure consistency and quality.'
      },
      {
        title: 'Strengthen Communication',
        content: 'Provide accurate, timely information about the Library’s services, resources, programs, and cultural projects across all official channels.'
      },
      {
        title: 'Foster Engagement',
        content: 'Enable two-way interaction with users by responding promptly to inquiries, encouraging feedback, and building community relationships in a respectful manner.'
      },
      {
        title: 'Maintain Consistency & Coordination',
        content: 'Align all platform messaging with the Library’s mission and branding, using a centralized content calendar to prevent duplication and ensure a cohesive institutional voice.'
      },
      {
        title: 'Ensure Accountability',
        content: 'Clearly define roles, responsibilities, and approval authorities so that every social media post is traceable to trained staff and meets institutional standards.'
      },
      {
        title: 'Monitor and Improve',
        content: 'Track performance with defined metrics, report results, and continuously refine the strategy based on evidence (e.g. engagement and audience growth).'
      },
      {
        title: 'Protect Stakeholders',
        content: 'Safeguard patron privacy and intellectual property, comply with applicable laws, and create a safe online environment by prohibiting harmful or illegal content.'
      },
      {
        title: 'Promote Cultural Heritage',
        content: 'Use social media creatively (stories, videos, graphics) to highlight Buganda’s heritage, following UNESCO’s vision that “digital technologies have a profound impact…on the way we experience and access culture”.'
      }
    ]
  },
  {
    id: 'purpose-scope',
    title: 'Purpose and Scope',
    category: 'Overview',
    content: 'This Social Media Policy provides the guiding framework for all official library social media activities. It establishes the principles, standards, and procedures that ensure social media efforts align with the BHTB Library’s goals, values, and legal obligations.',
    subsections: [
      {
        title: 'Platforms Covered',
        content: 'All official library social media accounts (currently Facebook and TikTok) and any future channels (such as Instagram, X/Twitter, YouTube) adopted by the Library.'
      },
      {
        title: 'Personnel Covered',
        content: 'All library staff and designated social media officers who create, post, monitor, or respond on these accounts, including volunteers or contractors acting on the Library’s behalf.'
      },
      {
        title: 'Content Scope',
        content: 'All materials (text, images, video, links, comments) published on official library social media, as well as user-generated content interacting with the Library’s pages.'
      },
      {
        title: 'Audience Scope',
        content: 'Members of the public who follow or engage with the Library online, including patrons, researchers, partners, and external stakeholders.'
      },
      {
        title: 'Exclusions (Personal Accounts)',
        content: 'The Policy explicitly does not govern personal social media accounts of staff, except in cases where staff use personal channels to act as authorized representatives of the Library. Personal opinions expressed on personal accounts are not covered by this policy.'
      },
      {
        title: 'Public Access',
        content: 'Consistent with ALA best practices, the Library will make this policy publicly available on its website and link to it from each social media platform. This ensures transparency of purpose.'
      }
    ]
  },
  {
    id: 'policy-statement',
    title: 'Policy Statement',
    category: 'Overview',
    content: 'The Buganda Heritage and Tourism Board Library recognizes social media as an essential component of its communications and cultural outreach. Through an organized, professional, and accountable social media program, the Library commits to:',
    subsections: [
      {
        title: 'Accuracy and Relevance',
        content: 'Posting information that is factually correct, timely, and relevant to the Library’s mission of heritage preservation.'
      },
      {
        title: 'Professional Tone',
        content: 'Maintaining a consistent institutional “voice” on all platforms – friendly and engaging, yet always representing the Library as a whole, not an individual staff member.'
      },
      {
        title: 'Openness and Inclusivity',
        content: 'Encouraging broad participation from diverse community members, in accordance with international library ethics on equal access.'
      },
      {
        title: 'Transparency and Privacy',
        content: 'Being open about the Library’s positions and refraining from hidden agendas; respecting user privacy and clearly informing users about how their data will be used.'
      },
      {
        title: 'Responsiveness',
        content: 'Engaging constructively with users, answering inquiries promptly, and following established escalation procedures for serious issues.'
      },
      {
        title: 'Legal and Ethical Compliance',
        content: 'Abiding by all relevant laws (e.g. data protection, copyright) and library professional standards.'
      }
    ]
  },
  {
    id: 'objectives',
    title: 'Objectives',
    category: 'Overview',
    content: 'The specific objectives of this policy are to establish strong baselines across governance, standards, engagement, training, evaluation, and accessibility.',
    subsections: [
      {
        title: 'Governance',
        content: 'Develop a structured approval workflow so that all official social media content is vetted by qualified personnel before publication, ensuring quality control.'
      },
      {
        title: 'Standards',
        content: 'Establish clear guidelines for tone, branding, accessibility, and legal compliance in all posts.'
      },
      {
        title: 'Engagement',
        content: 'Increase meaningful two-way communication, aiming to respond to user inquiries within defined 24-48 hour timeframes.'
      },
      {
        title: 'Coordination',
        content: 'Ensure unified messaging across Facebook, TikTok, and other channels by using a shared content calendar and cross-platform consistency.'
      },
      {
        title: 'Accountability',
        content: 'Assign roles and approval authorities explicitly so every post is attributable to an authorized individual and conforms to policy.'
      },
      {
        title: 'Training & Evaluation',
        content: 'Build staff capacity in social media skills, define and track measurable KPIs (e.g. audience growth, engagement rate, reach, response time) to support data-driven decision-making.'
      },
      {
        title: 'Transparency & Promotion',
        content: 'Clearly communicate policy rules to both staff and public, archive activity per requirements, and leverage social media to raise public awareness of Buganda heritage.'
      }
    ]
  },
  {
    id: 'roles-responsibilities',
    title: 'Roles and Responsibilities',
    category: 'Governance',
    content: 'To ensure effective implementation, distinct roles are defined across BHTB Library Management, Social Media Officers, general Library Staff, and IT Personnel.',
    subsections: [
      {
        title: 'Library Management (Board/Director)',
        content: 'Approve this policy, allocate resources (budget, staff, technology), serve as final authority for policy interpretation, handle crisis communications, and approve official emergency statements.'
      },
      {
        title: 'Social Media Officers / Communication Staff',
        content: 'Create content, maintain the rolling content calendar, manage the online community (monitor and respond), collect analytics and compile monthly reports, ensure policy compliance, uphold brand consistency (using first-person plural "we"), and participate in ongoing training.'
      },
      {
        title: 'Library Staff and Volunteers',
        content: 'Support social media efforts by supplying accurate info, event photos, and content ideas; identify and report misinformation or security issues; follow approved procedures; and refer users to official channels for complex queries.'
      },
      {
        title: 'Communication Supervisors / Department Heads',
        content: 'Review and approve proposed content for accuracy, compliance, and tone; coordinate departmental plans; enforce policy adherence; and advise management on significant escalations (e.g. controversial posts, security breaches).'
      },
      {
        title: 'IT / Security Personnel',
        content: 'Set up and maintain secure account access (strong passwords, 2FA, limited admin rights), backup and archive social media content, and train staff on basic cybersecurity hygiene.'
      }
    ]
  },
  {
    id: 'guiding-principles',
    title: 'Guiding Principles',
    category: 'Operations',
    content: 'These core principles ground all social media activities at BHTB Library, aligning international standards with local community interests.',
    subsections: [
      {
        title: 'Transparency & Accountability',
        content: 'Library communications shall be open and honest. Content should identify its author/source and clarify positions, supporting "the fullest possible transparency" of public institutions. Every post must be documented so it can be traced back to its reviewer and author.'
      },
      {
        title: 'Professionalism',
        content: 'Social media is an extension of the Library’s service environment; all staff must behave professionally and respectfully online, writing from the point of view of “we” representing the institution.'
      },
      {
        title: 'Consistency & User-Centered Engagement',
        content: 'Unified voice, graphics, and hashtags (#BugandaHeritage) across all platforms. Users are treated with respect; concerns are acknowledged promptly and replies are constructive. Civil discourse and the welfare of young users are promoted.'
      },
      {
        title: 'Accuracy & Integrity of Information',
        content: 'All information is thoroughly fact-checked. Misinformation or rumors must not be published. The Library disclaims personal or unofficial opinions.'
      },
      {
        title: 'Accessibility & Inclusiveness',
        content: 'Content must be accessible to people with disabilities (alt text, captioning videos, readable fonts). The Library prohibits discrimination/harassment, remaining a culturally respectful, welcoming forum reflecting Buganda’s heritage.'
      },
      {
        title: 'Privacy & Ethical Standards',
        content: 'Rigorous protection of patron confidentiality online (Data Protection and Privacy Act, 2019). Strict compliance with copyright and Creative Commons licensing.'
      }
    ]
  },
  {
    id: 'legal-compliance',
    title: 'Legal and Regulatory Compliance',
    category: 'Legal & Security',
    content: 'The Library’s social media operations strictly comply with Ugandan national laws and international library frameworks.',
    subsections: [
      {
        title: 'Data Protection (Uganda Data Protection and Privacy Act, 2019)',
        content: 'Any personal data (name, photo, contact info) obtained via social media requires consent (e.g. signed consent forms) and secure handling. Privacy notices inform users of their rights.'
      },
      {
        title: 'Intellectual Property (Copyright and Neighbouring Rights Act)',
        content: 'Library posts respect copyright. Licensed images, music, or text are used with proper attribution or Creative Commons licenses. Users are reminded not to post copyrighted content without permission.'
      },
      {
        title: 'Computer Misuse Act, 2011',
        content: 'Enforcement of strong cybersecurity measures (passwords, 2FA) to prevent unauthorized access, hacking, and unlawful interference with systems.'
      },
      {
        title: 'Access to Information Act, 2005',
        content: 'As a public cultural institution, social media records (posts, comments) may be subject to public records requests. BHTB Archives all communications accordingly.'
      },
      {
        title: 'Ethical and Platform Policies',
        content: 'Adherence to IFLA Code of Ethics, ALA social media guidelines, and host platform terms of service (Facebook, TikTok, etc.).'
      }
    ]
  },
  {
    id: 'approval-workflow',
    title: 'Content Governance and Approval Workflow',
    category: 'Governance',
    content: 'A strict, structured workflow is maintained for all content to guarantee quality, accuracy, and institutional alignment:',
    subsections: [
      {
        title: '1. Content Planning',
        content: 'Social Media Officers collaborate with librarians and program managers to identify upcoming events or heritage topics. Ideas are logged in the Content Calendar.'
      },
      {
        title: '2. Drafting & Preparing Media',
        content: 'A responsible staff member writes the post text and prepares accompanying media (photos, graphics, video). All media must be high-quality and respect copyrights.'
      },
      {
        title: '3. Fact-Checking',
        content: 'Draft content is checked for accuracy and completeness. Archival sources, references, or publications are cited when making historical claims.'
      },
      {
        title: '4. Review and Editing',
        content: 'The draft is submitted to the Communication Supervisor. The reviewer checks for alignment with BHTB Library values, appropriate professional/inclusive tone, legal compliance, and accessibility.'
      },
      {
        title: '5. Formal Sign-Off',
        content: 'The Communication Supervisor or an authorized officer formally approves the post. No content can be published without this explicit sign-off.'
      },
      {
        title: '6. Scheduling and Publishing',
        content: 'Approved posts are scheduled or posted immediately according to the content calendar, targeting optimal times for engagement.'
      },
      {
        title: '7. Continuous Monitoring & Archiving',
        content: 'Staff monitor published posts for comments, feedback, or misinformation. Each published post and user interaction is archived in the Library’s records management system.'
      }
    ]
  },
  {
    id: 'prohibited-content',
    title: 'Prohibited Content',
    category: 'Legal & Security',
    content: 'To maintain a respectful, safe, and lawful online environment, the BHTB Library strictly prohibits and moderates:',
    subsections: [
      {
        title: 'Illegal or Unlawful Speech',
        content: 'Any content that violates Ugandan laws, including hate speech, terrorism advocacy, defamation, obscenity, harassment, child pornography, or abuse.'
      },
      {
        title: 'Copyright Violations',
        content: 'Posting any copyrighted text, images, video, or music without explicit permission, licensing, or fair-use justification.'
      },
      {
        title: 'Defamatory or False Information',
        content: 'Deliberate false statements, rumors, or misleading claims about persons, events, or Buganda history. Corrections will be made swiftly.'
      },
      {
        title: 'Extremist or Discriminatory Content',
        content: 'Content promoting racism, sexism, religious intolerance, tribalism, or discrimination of any kind. BHTB Library upholds equal access.'
      },
      {
        title: 'Sensitive Institutional Data',
        content: 'Confidential internal information (personnel matters, non-public financials, security protocols, private patron library records) shall never be disclosed.'
      },
      {
        title: 'Political Endorsements',
        content: 'The Library, as a public entity, will not support or oppose political parties, campaigns, or candidates.'
      },
      {
        title: 'Spam, Self-Promotion & Personal Opinions',
        content: 'Irrelevant advertising, chain messages, or solicitation. Staff personal opinions or editorials must not be represented as official Library views.'
      }
    ]
  },
  {
    id: 'moderation-rules',
    title: 'User Engagement and Moderation Rules',
    category: 'Operations',
    content: 'BHTB social media accounts are public forums. To preserve a welcoming environment, the following moderation principles are applied:',
    subsections: [
      {
        title: 'Response Timelines',
        content: 'Staff strive to reply to user queries and comments within 24–48 hours. Urgent issues (service outages, emergencies) receive same-day attention. Complaints requiring research are acknowledged within 24 hours.'
      },
      {
        title: 'Tone and Content of Replies',
        content: 'All replies will be courteous, helpful, and written in the institutional "we". Answers must directly address comments, encourage constructive engagement, and guide users to accurate archives.'
      },
      {
        title: 'Civility and Safety Enforcement',
        content: 'If a user comment violates prohibited rules, staff will: (1) Warn and remove: Issue a warning and remove the comment, (2) Block or ban: For repeated severe violations, block the user temporarily/permanently as a documented last resort.'
      },
      {
        title: 'Escalation Path',
        content: 'If a comment indicates imminent harm or illegal activity, notify leadership and law enforcement immediately. Sensitive incidents follow the escalation chain: Social Media Officer → Communication Supervisor → Library Director.'
      },
      {
        title: 'Record of Moderation & Disclosures',
        content: 'All removals, blocks, and bans must be documented with date, reason, and staff involved. A brief moderation policy statement is published on the website and linked from profiles for transparency.'
      }
    ]
  },
  {
    id: 'cybersecurity',
    title: 'Cybersecurity and Account Security',
    category: 'Legal & Security',
    content: 'BHTB Library implements tight security protocols to safeguard digital assets and user data from unauthorized access:',
    subsections: [
      {
        title: 'Secure Credentials & 2FA',
        content: 'Accounts require strong, unique passwords changed regularly and stored in a secure password manager. Two-factor authentication (2FA) must be enabled on all platforms.'
      },
      {
        title: 'Limited Admin Access',
        content: 'Only authorized trained social media staff hold login credentials. Administrative privileges (approving/deleting content) are restricted to senior communications officers or management.'
      },
      {
        title: 'Account Recovery',
        content: 'A secondary trusted contact (e.g., IT Head) is added to account recovery settings to facilitate prompt access if credentials are lost.'
      },
      {
        title: 'Device Security & Vendor Management',
        content: 'Staff must follow IT policies when accessing accounts (up-to-date antivirus, locked screens, avoiding public Wi-Fi). Third-party scheduling/management tools must be vetted by IT and comply with privacy rules.'
      }
    ]
  }
];

// Mock KPI metrics based on PDF (Page 15)
export const initialKpis: KPIMetric[] = [
  {
    id: 'kpi-1',
    metricName: 'New Facebook Followers',
    platform: 'Facebook',
    target: 50,
    actual: 62,
    trend: '+24%',
    trendPercent: 24,
    notes: 'Faster growth due to Buganda Heritage Month archive campaign.'
  },
  {
    id: 'kpi-2',
    metricName: 'Facebook Engagement Rate',
    platform: 'Facebook',
    target: 5.0,
    actual: 4.8,
    trend: '-5%',
    trendPercent: -5,
    notes: 'Slight dip below target. Comm team reviewing optimal posting hours.'
  },
  {
    id: 'kpi-3',
    metricName: 'TikTok Video Views',
    platform: 'TikTok',
    target: 10000,
    actual: 12500,
    trend: '+15%',
    trendPercent: 15,
    notes: 'Viral music video clip showing behind-the-scenes manuscript restoration.'
  },
  {
    id: 'kpi-4',
    metricName: 'Posts Published (All Channels)',
    platform: 'All',
    target: 20,
    actual: 23,
    trend: '+15%',
    trendPercent: 15,
    notes: 'Published extra historical heritage story posts due to high demand.'
  },
  {
    id: 'kpi-5',
    metricName: 'Avg. Response Time (Hours)',
    platform: 'General',
    target: 24,
    actual: 16,
    trend: 'On Track',
    trendPercent: 33, // Faster than target
    notes: 'Prompt replies through our centralized community dashboard.'
  },
  {
    id: 'kpi-6',
    metricName: 'Comments Addressed',
    platform: 'General',
    target: 100,
    actual: 100,
    trend: '100%',
    trendPercent: 0,
    notes: 'All incoming inquiries and feedback successfully addressed or escalated.'
  }
];

// Mock platform planning table based on PDF (Page 11-12)
export const platformPlan = [
  {
    platform: 'Facebook',
    contentTypes: 'Announcements, articles, event invitations, photo albums, heritage videos, live streams',
    objectives: 'Raise awareness of services and cultural programs. Drive attendance at events. Provide historical context about Buganda.',
    frequency: '3–5 posts/week',
    kpis: 'New Page Followers, Post Reach (impressions), Post Engagements (likes/comments/shares), Event RSVPs'
  },
  {
    platform: 'TikTok',
    contentTypes: 'Short heritage videos, archival "edits", staff/company culture clips, trending challenges',
    objectives: 'Engage youth and broader audiences with creative storytelling. Increase interest in cultural heritage through viral content.',
    frequency: '2–4 posts/week',
    kpis: 'Video Views, Likes and Shares, Video Completion Rate, Comments Received'
  },
  {
    platform: 'Instagram (Future)',
    contentTypes: 'Photographs of collections, infographics, short reels/stories',
    objectives: 'Showcase visual aspects of Buganda heritage. Promote exhibitions and new acquisitions.',
    frequency: '3–5 posts/week',
    kpis: 'Follower Growth, Post Reach, Engagement Rate'
  },
  {
    platform: 'Twitter/X (Future)',
    contentTypes: 'Quick updates, heritage facts ("On this day"), user interactions',
    objectives: 'Provide timely news and quick info bites. Engage with press and academic communities.',
    frequency: 'Daily to multiple times/day',
    kpis: 'Follower Growth, Retweets/likes, Mentions of the Library account'
  },
  {
    platform: 'YouTube (Future)',
    contentTypes: 'Longer videos: lectures, guided tours, documentary-style pieces',
    objectives: 'Offer in-depth cultural and educational content. Archive talks and presentations.',
    frequency: '2–4 videos/month',
    kpis: 'Subscribers, Video Views, Watch Time Minutes'
  }
];

// Budget Allocations based on PDF (Page 17-18)
export const initialBudget: BudgetCategory[] = [
  {
    id: 'b-1',
    category: 'Personnel',
    description: 'Salary for 1–2 FTE Social Media/Communications Officers (incl. benefits)',
    minCost: 50000,
    maxCost: 100000
  },
  {
    id: 'b-2',
    category: 'Training & Professional Development',
    description: 'Workshops, courses, conferences on social media skills and digital literacy',
    minCost: 5000,
    maxCost: 10000
  },
  {
    id: 'b-3',
    category: 'Content Creation',
    description: 'Photography, videography, graphic design, editing services',
    minCost: 5000,
    maxCost: 15000
  },
  {
    id: 'b-4',
    category: 'Software and Tools',
    description: 'Social media management platforms (Hootsuite), analytics, photo/video editing subscriptions',
    minCost: 2000,
    maxCost: 5000
  },
  {
    id: 'b-5',
    category: 'Hardware and Equipment',
    description: 'Smartphones, camera, microphones, computers for content creation',
    minCost: 3000,
    maxCost: 7000
  },
  {
    id: 'b-6',
    category: 'Internet and Hosting',
    description: 'High-speed internet, extra data for uploads, hosting fees',
    minCost: 1000,
    maxCost: 3000
  },
  {
    id: 'b-7',
    category: 'Marketing and Outreach',
    description: 'Paid promotion (boosting posts, ads), partnerships',
    minCost: 5000,
    maxCost: 10000
  },
  {
    id: 'b-8',
    category: 'Archiving and IT Security',
    description: 'Backup services, cybersecurity software/licenses',
    minCost: 1000,
    maxCost: 3000
  },
  {
    id: 'b-9',
    category: 'Miscellaneous & Contingency',
    description: 'Unforeseen expenses, small hardware replacements, etc.',
    minCost: 2000,
    maxCost: 5000
  }
];

// Mock Content Calendar Items based on Annex A (Page 19)
export const initialCalendarItems: ContentCalendarItem[] = [
  {
    id: 'cal-1',
    date: '2026-07-01',
    platform: 'Facebook',
    description: 'Post about Archive Renovation – before/after photos of the historical manuscripts wing and renovation story',
    owner: 'John (Archivist)',
    status: 'Drafting'
  },
  {
    id: 'cal-2',
    date: '2026-07-02',
    platform: 'TikTok',
    description: 'Behind-the-scenes of Document Digitization: Step-by-step restoration and scanning of 19th-century records',
    owner: 'Mary (Tech)',
    status: 'Scheduled'
  },
  {
    id: 'cal-3',
    date: '2026-07-05',
    platform: 'Facebook',
    description: 'Heritage Event Reminder – visual graphic and invite text to the upcoming Buganda Kingdom Lecture series',
    owner: 'Sarah (Outreach)',
    status: 'Scheduled'
  },
  {
    id: 'cal-4',
    date: '2026-07-06',
    platform: 'TikTok',
    description: 'Buganda Language Lesson – video featuring a short phrase of the day, pronounciation, and cultural context',
    owner: 'Kwame (Librarian)',
    status: 'Idea'
  }
];

// Response scripts based on Annex C (Page 20)
export const responseScripts: ResponseScript[] = [
  {
    id: 'script-1',
    category: 'General Inquiry Response',
    query: 'What are your opening hours on weekends?',
    response: 'Hello! Thank you for reaching out. Our main branch is open 9am–3pm on Saturdays and closed on Sundays. Let us know if you need any other info. 😊',
    commentType: 'general'
  },
  {
    id: 'script-2',
    category: 'Event Registration Link',
    query: 'I want to attend the cultural event next week, how do I sign up?',
    response: 'Great to hear you’re interested! You can register here: [Event Link]. Spaces are limited, so let us know soon if you have any trouble. We look forward to seeing you there!',
    commentType: 'registration'
  },
  {
    id: 'script-3',
    category: 'Content Request',
    query: 'Can you post more about Buganda artifacts?',
    response: 'Thank you for the suggestion! We do have some fascinating artifacts. We’ll schedule a series of posts on that topic soon. Stay tuned!',
    commentType: 'request'
  },
  {
    id: 'script-4',
    category: 'Complaint / Issue Escalation',
    query: 'Your website is down, I can’t access the digital archives!',
    response: 'We apologize for the inconvenience. We’re aware of the issue and are working to resolve it. I’ve informed our tech team, and I’ll update you here shortly once it’s fixed.',
    commentType: 'complaint'
  },
  {
    id: 'script-5',
    category: 'Inappropriate Comment Removal (Private)',
    query: '[Violates guidelines - e.g. hate speech or harassment]',
    response: 'Your comment was removed for violating our community standards. We welcome respectful discussion, but cannot allow hate speech or harassment on our page. Thank you for understanding.',
    commentType: 'inappropriate'
  }
];

// Mock Incident Logs based on Annex D (Page 21)
export const initialIncidents: IncidentReport[] = [
  {
    id: 'inc-1',
    dateTime: '2026-06-28T14:30',
    reportedBy: 'Kwame Ssewankambo',
    role: 'Librarian / Social Media Officer',
    type: 'Misinformation',
    description: 'A commenter posted false information regarding the ownership of BHTB Royal Manuscript collection on our Facebook post, claiming they were acquired illegally.',
    platformsAffected: 'Facebook',
    actionsTaken: 'Replied professionally citing official archives showing clean heritage transfers. Sent a polite private message requesting they refrain from spreading unsupported claims.',
    personsInvolved: 'Commenter @HeritageTruth, Kwame (Librarian)',
    escalatedTo: ['Communications Supervisor'],
    followUpActions: 'Monitor comment thread for further active comments. Pre-drafted verified lineage sheets.',
    resolution: 'The user deleted their comment after reading the official archive proof. Thread resolved.',
    preparedBy: 'Kwame Ssewankambo',
    signature: 'Kwame S.',
    datePrepared: '2026-06-28',
    status: 'Resolved'
  },
  {
    id: 'inc-2',
    dateTime: '2026-06-29T09:15',
    reportedBy: 'Mary Nsubuga',
    role: 'IT Support / Technical Officer',
    type: 'Security Breach',
    description: 'Suspicious login attempt detected on the Library TikTok account from an unknown IP address outside Uganda. Account was temporarily locked by TikTok.',
    platformsAffected: 'TikTok',
    actionsTaken: 'Changed passwords immediately using the password manager. Enabled Two-Factor Authentication (2FA) with authentication app. Audited connected third-party scheduling apps.',
    personsInvolved: 'Mary Nsubuga, IT Head',
    escalatedTo: ['Tech Lead', 'Communications Supervisor', 'Director'],
    followUpActions: 'Run full security scans on devices used to login. Confirm 2FA on Facebook as well.',
    resolution: 'Full pass audit completed. Account recovered. TikTok access restored safely.',
    preparedBy: 'Mary Nsubuga',
    signature: 'Mary N.',
    datePrepared: '2026-06-29',
    status: 'Resolved'
  }
];
