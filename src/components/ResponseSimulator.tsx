/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useMemo } from 'react';
import { MessageSquare, Check, AlertCircle, Copy, Info, RefreshCw, Send, ArrowRight, BookOpen } from 'lucide-react';
import { responseScripts } from '../data/policyData';
import { ResponseScript } from '../types';

interface Challenge {
  id: string;
  senderName: string;
  avatarUrl: string;
  time: string;
  messageText: string;
  commentType: 'general' | 'registration' | 'request' | 'complaint' | 'inappropriate';
  options: {
    text: string;
    isCorrect: boolean;
    explanation: string;
  }[];
}

const trainingChallenges: Challenge[] = [
  {
    id: 'ch-1',
    senderName: 'Ssemata Robert',
    avatarUrl: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=100',
    time: '5m ago',
    messageText: 'What are your opening hours on weekends?',
    commentType: 'general',
    options: [
      {
        text: 'Hello! Thank you for reaching out. Our main branch is open 9am–3pm on Saturdays and closed on Sundays. Let us know if you need any other info. 😊',
        isCorrect: true,
        explanation: 'Excellent! This matches the exact official BHTB response guidelines, providing polite, accurate hours with first-person plural politeness.'
      },
      {
        text: 'We are open 9am-3pm on Saturday. Sunday is closed.',
        isCorrect: false,
        explanation: 'Too brief and lacks the welcoming tone outlined in Section 12: Content Standards.'
      },
      {
        text: 'I think we are open on Saturday but I am not entirely sure, try to check our main website page.',
        isCorrect: false,
        explanation: 'Fails "Accuracy and Fact-Checking" guidelines. Staff must never guess or state personal uncertainty.'
      }
    ]
  },
  {
    id: 'ch-2',
    senderName: 'Kato Ssenyonga',
    avatarUrl: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=100',
    time: '20m ago',
    messageText: 'I want to attend the cultural event next week, how do I sign up?',
    commentType: 'registration',
    options: [
      {
        text: 'Just turn up at the gate, we usually have plenty of space inside the library hall.',
        isCorrect: false,
        explanation: 'Inaccurate. Main events have strict seat capacities. Must route users to official RSVPs.'
      },
      {
        text: 'Great to hear you’re interested! You can register here: [Event Link]. Spaces are limited, so let us know soon if you have any trouble. We look forward to seeing you there!',
        isCorrect: true,
        explanation: 'Correct! Confirms seat constraints, links the registration tool directly, and uses warm welcoming vocabulary.'
      },
      {
        text: 'Fill out the form on our Facebook wall and wait for our approval email.',
        isCorrect: false,
        explanation: 'Inconvenient user journey and fails to utilize the central registration system.'
      }
    ]
  },
  {
    id: 'ch-3',
    senderName: 'Nassolo Brenda',
    avatarUrl: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=100',
    time: '1h ago',
    messageText: 'Can you post more about Buganda artifacts?',
    commentType: 'request',
    options: [
      {
        text: 'Thank you for the suggestion! We do have some fascinating artifacts. We’ll schedule a series of posts on that topic soon. Stay tuned!',
        isCorrect: true,
        explanation: 'Perfect! Encourages community curiosity, represents BHTB as a unified "We", and schedules actionable content.'
      },
      {
        text: 'Yes I can post that next Monday when I am back on shift.',
        isCorrect: false,
        explanation: 'Violates the "No Personal Pronouns" rule. Replies must represent BHTB ("We") rather than "I".'
      },
      {
        text: 'Our museum department handles artifacts. We only handle books here.',
        isCorrect: false,
        explanation: 'Unfriendly, siloed response that doesn\'t support the wider BHTB collaborative outreach.'
      }
    ]
  },
  {
    id: 'ch-4',
    senderName: 'Lugonzo Henry',
    avatarUrl: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&q=80&w=100',
    time: '2h ago',
    messageText: 'Your website is down, I can’t access the digital archives!',
    commentType: 'complaint',
    options: [
      {
        text: 'That is not our department, please email the IT team at tech@bhtb.org instead.',
        isCorrect: false,
        explanation: 'Creates a friction point for the user and violates prompt complaint handling.'
      },
      {
        text: 'It works fine on my computer, maybe try restarting your router or check your internet.',
        isCorrect: false,
        explanation: 'Defensive. Fails to acknowledge potential institutional issues and sounds uncooperative.'
      },
      {
        text: 'We apologize for the inconvenience. We’re aware of the issue and are working to resolve it. I’ve informed our tech team, and I’ll update you here shortly once it’s fixed.',
        isCorrect: true,
        explanation: 'Outstanding! Instantly acknowledges the glitch, apologizes professionally, outlines progress, and commits to follow up.'
      }
    ]
  },
  {
    id: 'ch-5',
    senderName: 'Anonymized User',
    avatarUrl: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&q=80&w=100',
    time: '3h ago',
    messageText: '[PROHIBITED CONTENT / OFFENSIVE STATEMENT IN THE STREAM]',
    commentType: 'inappropriate',
    options: [
      {
        text: 'You are a completely uncultured person. Do not write here ever again.',
        isCorrect: false,
        explanation: 'Highly unprofessional. Staff must remain courteous even under extreme provocation.'
      },
      {
        text: 'Your comment was removed for violating our community standards. We welcome respectful discussion, but cannot allow hate speech or harassment on our page. Thank you for understanding.',
        isCorrect: true,
        explanation: 'Perfect! This is the mandatory private response script for moderation removals, maintaining safe boundaries gracefully.'
      },
      {
        text: 'Why would you say such a mean thing on our public page?',
        isCorrect: false,
        explanation: 'Fails to execute the required "Warn and Remove" protocol, starting an unnecessary debate.'
      }
    ]
  }
];

export default function ResponseSimulator() {
  const [activeTab, setActiveTab] = useState<'simulator' | 'lookup'>('simulator');
  const [copiedId, setCopiedId] = useState<string | null>(null);

  // Simulator state
  const [currentChallengeIdx, setCurrentChallengeIdx] = useState(0);
  const [selectedOptionIdx, setSelectedOptionIdx] = useState<number | null>(null);
  const [score, setScore] = useState(0);
  const [answeredCount, setAnsweredCount] = useState(0);
  const [showExplanation, setShowExplanation] = useState(false);

  // Dictionary state
  const [lookupSearch, setLookupSearch] = useState('');

  const currentChallenge = trainingChallenges[currentChallengeIdx];

  const handleSelectOption = (idx: number) => {
    if (selectedOptionIdx !== null) return; // Answered already
    setSelectedOptionIdx(idx);
    setAnsweredCount(prev => prev + 1);
    if (currentChallenge.options[idx].isCorrect) {
      setScore(prev => prev + 1);
    }
    setShowExplanation(true);
  };

  const handleNextChallenge = () => {
    setSelectedOptionIdx(null);
    setShowExplanation(false);
    if (currentChallengeIdx < trainingChallenges.length - 1) {
      setCurrentChallengeIdx(prev => prev + 1);
    } else {
      // Completed, loop back or reset
      setCurrentChallengeIdx(0);
      setScore(0);
      setAnsweredCount(0);
    }
  };

  const handleCopyScript = (text: string, id: string) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const filteredScripts = useMemo(() => {
    return responseScripts.filter(script => 
      script.category.toLowerCase().includes(lookupSearch.toLowerCase()) ||
      script.query.toLowerCase().includes(lookupSearch.toLowerCase()) ||
      script.response.toLowerCase().includes(lookupSearch.toLowerCase())
    );
  }, [lookupSearch]);

  return (
    <div className="space-y-6" id="response-simulator">
      {/* Introduction Card */}
      <div className="bg-white rounded-3xl border border-amber-100 p-6 sm:p-8 flex flex-col sm:flex-row sm:items-center justify-between gap-6">
        <div>
          <div className="flex items-center gap-2 mb-2">
            <MessageSquare className="w-5 h-5 text-amber-700" />
            <h2 className="font-display font-bold text-xl sm:text-2xl text-gray-950">
              Annex C: Response Script Hub
            </h2>
          </div>
          <p className="text-xs text-gray-500 max-w-xl">
            Train volunteers and communications officers on BHTB approved dialogue standards, or copy verified response scripts instantly using our database lookup tool.
          </p>
        </div>

        {/* Tab switchers */}
        <div className="flex bg-gray-100 rounded-xl p-0.5 self-start sm:self-center">
          <button
            onClick={() => setActiveTab('simulator')}
            className={`px-4 py-2 rounded-lg text-xs font-semibold transition-all ${activeTab === 'simulator' ? 'bg-white shadow-xs text-gray-950' : 'text-gray-500'}`}
          >
            Interactive Trainer
          </button>
          <button
            onClick={() => setActiveTab('lookup')}
            className={`px-4 py-2 rounded-lg text-xs font-semibold transition-all ${activeTab === 'lookup' ? 'bg-white shadow-xs text-gray-950' : 'text-gray-500'}`}
          >
            Script Lookup
          </button>
        </div>
      </div>

      {activeTab === 'simulator' ? (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Left panel: Fake Social Media chat frame */}
          <div className="lg:col-span-5 bg-slate-50 border border-gray-200 rounded-3xl overflow-hidden flex flex-col justify-between shadow-xs">
            {/* Header of social app */}
            <div className="bg-white border-b border-gray-100 px-5 py-4 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-full bg-amber-600 flex items-center justify-center text-white font-bold text-xs">
                  BHTB
                </div>
                <div>
                  <h4 className="font-semibold text-xs text-gray-800">BHTB Library Support</h4>
                  <span className="text-[9px] text-emerald-600 font-medium">● Online Agent Training</span>
                </div>
              </div>
              <div className="bg-amber-50 text-amber-950 px-2.5 py-1 rounded-lg text-[10px] font-bold">
                Score: {score} / {answeredCount}
              </div>
            </div>

            {/* Chat stream body */}
            <div className="p-5 grow space-y-4 min-h-[300px]">
              {/* User comment */}
              <div className="flex items-start gap-3">
                <img 
                  src={currentChallenge.avatarUrl} 
                  alt={currentChallenge.senderName} 
                  className="w-8 h-8 rounded-full border border-gray-100 object-cover mt-1" 
                />
                <div className="space-y-1">
                  <div className="flex items-baseline gap-2">
                    <span className="font-semibold text-xs text-gray-700">{currentChallenge.senderName}</span>
                    <span className="text-[9px] text-gray-400 font-mono">{currentChallenge.time}</span>
                  </div>
                  <div className="bg-white border border-gray-100 rounded-2xl rounded-tl-xs p-3 shadow-xs max-w-xs">
                    <p className="text-xs text-gray-800 leading-relaxed">{currentChallenge.messageText}</p>
                  </div>
                </div>
              </div>

              {/* Bot reply (interactive selection preview) */}
              {selectedOptionIdx !== null && (
                <div className="flex items-start gap-3 flex-row-reverse">
                  <div className="w-8 h-8 rounded-full bg-amber-800 flex items-center justify-center text-white text-[10px] font-bold mt-1">
                    WE
                  </div>
                  <div className="space-y-1">
                    <div className="flex items-baseline justify-end gap-2">
                      <span className="font-semibold text-xs text-gray-700">Official BHTB Voice</span>
                      <span className="text-[9px] text-gray-400 font-mono">Just now</span>
                    </div>
                    <div className="bg-amber-600 text-white rounded-2xl rounded-tr-xs p-3 shadow-xs max-w-xs">
                      <p className="text-xs leading-relaxed">{currentChallenge.options[selectedOptionIdx].text}</p>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Footer of app / entry field */}
            <div className="bg-white border-t border-gray-100 p-3.5 flex items-center gap-3">
              <input
                type="text"
                disabled
                placeholder="Choose reply options below..."
                className="grow bg-gray-50 text-xs text-gray-400 border border-gray-100 rounded-xl px-3.5 py-2"
              />
              <button disabled className="p-2 bg-gray-100 text-gray-300 rounded-lg">
                <Send className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Right panel: Response Selection controls */}
          <div className="lg:col-span-7 bg-white rounded-3xl border border-amber-100 p-6 sm:p-8 space-y-6 flex flex-col justify-between">
            <div className="space-y-4">
              <span className="text-[10px] font-bold tracking-widest uppercase bg-amber-50 text-amber-800 px-3 py-1 rounded-full">
                Platform Challenge {currentChallengeIdx + 1} of {trainingChallenges.length}
              </span>
              <h3 className="font-display font-semibold text-gray-950 text-lg">
                Select BHTB Policy-Compliant Reply:
              </h3>
              <p className="text-xs text-gray-500">
                Read the user's inquiry on the simulated screen and tap the correct, authorized scripted option below:
              </p>

              {/* Options lists */}
              <div className="space-y-3 pt-2">
                {currentChallenge.options.map((opt, idx) => {
                  const isSelected = selectedOptionIdx === idx;
                  let borderClass = 'border-gray-200 hover:border-amber-400';
                  let bgClass = 'bg-white';
                  if (selectedOptionIdx !== null) {
                    if (opt.isCorrect) {
                      borderClass = 'border-emerald-500 bg-emerald-50/20';
                    } else if (isSelected) {
                      borderClass = 'border-rose-500 bg-rose-50/20';
                    } else {
                      borderClass = 'border-gray-100 opacity-60';
                    }
                  }

                  return (
                    <button
                      key={idx}
                      disabled={selectedOptionIdx !== null}
                      onClick={() => handleSelectOption(idx)}
                      className={`w-full text-left p-4 rounded-2xl border transition-all text-xs flex items-start gap-3 ${borderClass} ${bgClass}`}
                    >
                      <div className={`p-1.5 rounded-lg shrink-0 ${
                        selectedOptionIdx !== null && opt.isCorrect 
                          ? 'bg-emerald-100 text-emerald-700' 
                          : isSelected 
                            ? 'bg-rose-100 text-rose-700' 
                            : 'bg-gray-50 text-gray-400'
                      }`}>
                        {selectedOptionIdx !== null && opt.isCorrect ? <Check className="w-4 h-4" /> : <BookOpen className="w-4 h-4" />}
                      </div>
                      <span className="text-gray-800 leading-relaxed font-normal">{opt.text}</span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Explanation box and navigation */}
            {showExplanation && (
              <div className="space-y-4 mt-6 pt-6 border-t border-gray-100">
                <div className="p-4 bg-gray-50 rounded-2xl flex items-start gap-3">
                  <Info className="w-5 h-5 text-amber-700 shrink-0 mt-0.5" />
                  <div className="space-y-1">
                    <h4 className="font-semibold text-xs text-gray-800">
                      {currentChallenge.options[selectedOptionIdx!].isCorrect ? 'Correct Script Selected!' : 'Incorrect Script Selected'}
                    </h4>
                    <p className="text-[10px] text-gray-500 leading-relaxed">
                      {currentChallenge.options[selectedOptionIdx!].explanation}
                    </p>
                  </div>
                </div>

                <button
                  onClick={handleNextChallenge}
                  className="w-full py-3 bg-amber-950 hover:bg-amber-900 text-amber-100 font-semibold text-xs rounded-xl flex items-center justify-center gap-1.5"
                >
                  {currentChallengeIdx === trainingChallenges.length - 1 ? 'Reset & Train Again' : 'Next Challenge'}
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            )}
          </div>
        </div>
      ) : (
        /* Lookup Database Panel */
        <div className="bg-white border border-amber-100 rounded-3xl p-6 sm:p-8 space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div className="space-y-1">
              <h3 className="font-display font-semibold text-gray-900 text-lg">Approved Scripts Directory</h3>
              <p className="text-xs text-gray-500">Query and copy legal templates defined for communications staff:</p>
            </div>
            
            {/* Direct Search query */}
            <input
              type="text"
              placeholder="Query script category, message or reply templates..."
              value={lookupSearch}
              onChange={(e) => setLookupSearch(e.target.value)}
              className="px-4 py-2 bg-gray-50 border border-gray-200 rounded-xl text-xs text-gray-800 focus:outline-hidden focus:ring-2 focus:ring-amber-500/20 max-w-xs w-full"
            />
          </div>

          {/* Dictionary Stream Lists */}
          <div className="grid grid-cols-1 gap-6 pt-2">
            {filteredScripts.map(script => (
              <div key={script.id} className="p-5 rounded-2xl bg-amber-50/15 border border-amber-100/40 flex flex-col sm:flex-row items-start justify-between gap-6 hover:border-amber-200 transition-all">
                <div className="space-y-3 min-w-0 grow">
                  <div className="flex items-center gap-2">
                    <span className="text-[9px] font-bold bg-amber-100 text-amber-900 px-2.5 py-0.5 rounded-full uppercase tracking-wider">
                      {script.category}
                    </span>
                    <span className="text-[10px] font-mono text-gray-400">Class: {script.commentType}</span>
                  </div>

                  <div className="space-y-1.5">
                    <p className="text-xs text-gray-500">
                      <strong className="text-gray-600 block text-[10px] uppercase font-sans">Patron Comment:</strong> 
                      "{script.query}"
                    </p>
                    <p className="text-xs text-gray-800 leading-relaxed">
                      <strong className="text-amber-800 block text-[10px] uppercase font-sans">BHTB Library Reply Script:</strong> 
                      "{script.response}"
                    </p>
                  </div>
                </div>

                <button
                  onClick={() => handleCopyScript(script.response, script.id)}
                  className="shrink-0 px-3.5 py-2 border border-gray-200 hover:bg-gray-50 text-gray-600 rounded-xl text-xs font-semibold flex items-center gap-2 transition-all self-start sm:self-center"
                >
                  <Copy className="w-3.5 h-3.5" />
                  <span>{copiedId === script.id ? 'Copied' : 'Copy Response'}</span>
                </button>
              </div>
            ))}

            {filteredScripts.length === 0 && (
              <div className="text-center py-12 text-gray-400 text-xs">
                No approved scripts matched your query terms.
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
