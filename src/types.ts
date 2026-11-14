/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export interface ContentCalendarItem {
  id: string;
  date: string;
  platform: 'Facebook' | 'TikTok' | 'Instagram' | 'Twitter/X' | 'YouTube';
  description: string;
  owner: string;
  status: 'Idea' | 'Drafting' | 'Reviewing' | 'Scheduled' | 'Posted';
}

export interface ConsentFormSubmission {
  id: string;
  subjectName: string;
  affiliation: string;
  description: string;
  dateOfShoot: string;
  location: string;
  isMinor: boolean;
  parentName?: string;
  signatureData?: string;
  submittedAt: string;
}

export interface ResponseScript {
  id: string;
  category: string;
  query: string;
  response: string;
  commentType: 'general' | 'registration' | 'request' | 'complaint' | 'inappropriate';
}

export interface IncidentReport {
  id: string;
  dateTime: string;
  reportedBy: string;
  role: string;
  type: 'Security Breach' | 'Defamatory Content' | 'Harassment' | 'Misinformation' | 'Other';
  description: string;
  platformsAffected: string;
  actionsTaken: string;
  personsInvolved: string;
  escalatedTo: ('Tech Lead' | 'Communications Supervisor' | 'Director' | 'Legal')[];
  followUpActions: string;
  resolution: string;
  preparedBy: string;
  signature: string;
  datePrepared: string;
  status: 'Open' | 'Investigating' | 'Resolved';
}

export interface KPIMetric {
  id: string;
  metricName: string;
  platform: 'Facebook' | 'TikTok' | 'All' | 'General';
  target: string | number;
  actual: string | number;
  trend: string;
  trendPercent: number; // positive or negative
  notes: string;
}

export interface BudgetCategory {
  id: string;
  category: string;
  description: string;
  minCost: number;
  maxCost: number;
}
