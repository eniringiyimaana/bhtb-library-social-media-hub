/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useRef } from 'react';
import { ShieldAlert, Printer, CheckCircle2, FileCheck, Signature, Edit2, RotateCcw, Download } from 'lucide-react';
import { motion } from 'motion/react';
import { jsPDF } from 'jspdf';

export default function ReleaseForm() {
  const [subjectName, setSubjectName] = useState('');
  const [affiliation, setAffiliation] = useState('');
  const [description, setDescription] = useState('');
  const [shootDate, setShootDate] = useState('2026-07-01');
  const [location, setLocation] = useState('BHTB Main Archival Branch');
  const [isMinor, setIsMinor] = useState(false);
  const [parentName, setParentName] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);
  
  // Signature pad states
  const [signatureType, setSignatureType] = useState<'draw' | 'type'>('type');
  const [typedSignature, setTypedSignature] = useState('');
  const [drawnSignature, setDrawnSignature] = useState<string | null>(null);
  
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [isDrawing, setIsDrawing] = useState(false);

  // Drawing functions for signature
  const startDrawing = (e: React.MouseEvent<HTMLCanvasElement> | React.TouchEvent<HTMLCanvasElement>) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    ctx.strokeStyle = '#1e3a8a'; // Royal blue ink
    ctx.lineWidth = 2;
    ctx.lineCap = 'round';

    // Get coordinates
    const rect = canvas.getBoundingClientRect();
    const x = ('touches' in e) ? e.touches[0].clientX - rect.left : e.clientX - rect.left;
    const y = ('touches' in e) ? e.touches[0].clientY - rect.top : e.clientY - rect.top;

    ctx.beginPath();
    ctx.moveTo(x, y);
    setIsDrawing(true);
  };

  const draw = (e: React.MouseEvent<HTMLCanvasElement> | React.TouchEvent<HTMLCanvasElement>) => {
    if (!isDrawing) return;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const rect = canvas.getBoundingClientRect();
    const x = ('touches' in e) ? e.touches[0].clientX - rect.left : e.clientX - rect.left;
    const y = ('touches' in e) ? e.touches[0].clientY - rect.top : e.clientY - rect.top;

    ctx.lineTo(x, y);
    ctx.stroke();

    if ('touches' in e) {
      e.preventDefault(); // Disable scrolling when signing on mobile
    }
  };

  const stopDrawing = () => {
    if (!isDrawing) return;
    setIsDrawing(false);
    
    // Save image data
    const canvas = canvasRef.current;
    if (canvas) {
      setDrawnSignature(canvas.toDataURL());
    }
  };

  const clearCanvas = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    setDrawnSignature(null);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!subjectName || !description) return;
    if (isMinor && !parentName) return;
    
    setIsSubmitted(true);
  };

  const handleResetForm = () => {
    setSubjectName('');
    setAffiliation('');
    setDescription('');
    setShootDate('2026-07-01');
    setLocation('BHTB Main Archival Branch');
    setIsMinor(false);
    setParentName('');
    setTypedSignature('');
    setDrawnSignature(null);
    setIsSubmitted(false);
  };

  const handlePrint = () => {
    window.print();
  };

  const handleExportPDF = () => {
    const doc = new jsPDF({
      orientation: 'portrait',
      unit: 'mm',
      format: 'a4'
    });

    const margin = 15;
    const width = 210;
    const height = 297;
    const contentWidth = width - (margin * 2);

    // Draw Double Border (Amber / Dark Brown colors)
    doc.setDrawColor(120, 53, 4); // #78350f (amber-950)
    doc.setLineWidth(1.0);
    doc.rect(margin, margin, contentWidth, height - (margin * 2));
    
    doc.setLineWidth(0.4);
    doc.rect(margin + 1.5, margin + 1.5, contentWidth - 3.0, height - (margin * 2) - 3.0);

    // 1. Header Section
    doc.setTextColor(120, 53, 4); // #78350f
    doc.setFont('Helvetica', 'bold');
    doc.setFontSize(14);
    doc.text('BUGANDA HERITAGE AND TOURISM BOARD', width / 2, 30, { align: 'center' });

    doc.setTextColor(17, 24, 39); // Gray 900
    doc.setFontSize(11);
    doc.text('BHTB LIBRARY – SOCIAL MEDIA & ARCHIVAL DIVISION', width / 2, 37, { align: 'center' });

    doc.setTextColor(156, 163, 175); // Gray 400
    doc.setFont('Courier', 'bold');
    doc.setFontSize(8.5);
    doc.text('IMAGE / VIDEO RELEASE CONSENT FORM', width / 2, 43, { align: 'center' });

    // Header divider line
    doc.setDrawColor(217, 119, 6); // amber-600
    doc.setLineWidth(0.5);
    doc.line(margin + 10, 48, width - margin - 10, 48);

    // 2. Core Legal Text
    doc.setTextColor(31, 41, 55); // Gray 800
    doc.setFont('Times', 'normal');
    doc.setFontSize(10.5);
    
    const introText = `I hereby grant permission to the Buganda Heritage and Tourism Board Library (the "Library") to use photographs and/or video recordings of ${isMinor ? 'my child' : 'me'} or my property for use in the Library's official social media networks, website archives, and kingdom promotional materials.`;
    const splitIntro = doc.splitTextToSize(introText, contentWidth - 20);
    doc.text(splitIntro, margin + 10, 56);

    // Calculate Y offset after text
    let currentY = 56 + (splitIntro.length * 4.8) + 4;

    // 3. Grid / Table of Details (Adaptive Design)
    const descText = description || 'Photography and digital documentation during the royal historical artifact gallery exhibit.';
    const splitDesc = doc.splitTextToSize(descText, contentWidth - 26);
    const descHeight = Math.max(14, splitDesc.length * 4.5 + 5);
    const tableHeight = 13 + descHeight + 13;
    
    doc.setDrawColor(217, 119, 6); // amber-600/50
    doc.setLineWidth(0.3);
    doc.setFillColor(255, 255, 255);
    doc.rect(margin + 10, currentY, contentWidth - 20, tableHeight, 'FD');
    
    // Vertical divider (halfway) for Row 1 and Row 3
    doc.line(width / 2, currentY, width / 2, currentY + 13);
    doc.line(width / 2, currentY + 13 + descHeight, width / 2, currentY + tableHeight);
    
    // Horizontal dividers
    doc.line(margin + 10, currentY + 13, width - margin - 10, currentY + 13);
    doc.line(margin + 10, currentY + 13 + descHeight, width - margin - 10, currentY + 13 + descHeight);
    
    // Content for Row 1: Subject & Affiliation
    doc.setFont('Helvetica', 'bold');
    doc.setFontSize(7.5);
    doc.setTextColor(120, 53, 4); // amber-950
    doc.text('SUBJECT OF RELEASE', margin + 14, currentY + 4);
    doc.setTextColor(17, 24, 39);
    doc.setFont('Helvetica', 'bold');
    doc.setFontSize(9.5);
    doc.text(subjectName || 'Juliet Namubiru', margin + 14, currentY + 9);
    
    doc.setFont('Helvetica', 'bold');
    doc.setFontSize(7.5);
    doc.setTextColor(120, 53, 4);
    doc.text('AFFILIATION', width / 2 + 4, currentY + 4);
    doc.setTextColor(55, 65, 81);
    doc.setFont('Helvetica', 'normal');
    doc.setFontSize(9.5);
    doc.text(affiliation || 'Public Citizen', width / 2 + 4, currentY + 9);
    
    // Content for Row 2: Description (Full Width row)
    doc.setFont('Helvetica', 'bold');
    doc.setFontSize(7.5);
    doc.setTextColor(120, 53, 4);
    doc.text('DESCRIPTION OF IMAGES / VIDEO ASSETS', margin + 14, currentY + 13 + 4);
    doc.setTextColor(55, 65, 81);
    doc.setFont('Helvetica', 'normal');
    doc.setFontSize(9);
    doc.text(splitDesc, margin + 14, currentY + 13 + 8);
    
    // Content for Row 3: Location & Date
    doc.setFont('Helvetica', 'bold');
    doc.setFontSize(7.5);
    doc.setTextColor(120, 53, 4);
    doc.text('LOCATION OF SHOOT', margin + 14, currentY + 13 + descHeight + 4);
    doc.setTextColor(55, 65, 81);
    doc.setFont('Helvetica', 'normal');
    doc.setFontSize(9.5);
    doc.text(location, margin + 14, currentY + 13 + descHeight + 9);
    
    doc.setFont('Helvetica', 'bold');
    doc.setFontSize(7.5);
    doc.setTextColor(120, 53, 4);
    doc.text('DATE OF CAPTURE', width / 2 + 4, currentY + 13 + descHeight + 4);
    doc.setTextColor(55, 65, 81);
    doc.setFont('Courier', 'bold');
    doc.setFontSize(9.5);
    doc.text(shootDate, width / 2 + 4, currentY + 13 + descHeight + 9);
    
    currentY += tableHeight + 6;

    // 4. Minor Clause (if applicable)
    if (isMinor) {
      doc.setFillColor(254, 251, 236); // amber-50
      doc.setDrawColor(254, 243, 199); // amber-100
      doc.rect(margin + 10, currentY, contentWidth - 20, 16, 'F');
      doc.rect(margin + 10, currentY, contentWidth - 20, 16, 'D');

      doc.setFont('Helvetica', 'bold');
      doc.setFontSize(7.5);
      doc.setTextColor(120, 53, 4); // amber-950
      doc.text('Minor Subject Clause:', margin + 13, currentY + 4);
      
      doc.setFont('Helvetica', 'normal');
      doc.setFontSize(8.5);
      doc.setTextColor(120, 53, 4);
      doc.text('As the parent/guardian of the minor named above, I warrant that I have authority to execute this release on their behalf.', margin + 13, currentY + 8);
      
      doc.setFont('Helvetica', 'bold');
      doc.text(`Guardian Name: ${parentName || '(Please fill parent/guardian name)'}`, margin + 13, currentY + 13);
      
      currentY += 21;
    }

    // 5. Ending fineprint
    doc.setTextColor(107, 114, 128); // Gray 500
    doc.setFont('Times', 'normal');
    doc.setFontSize(9);
    const splitTerms = doc.splitTextToSize('I understand that I will receive no monetary compensation or royalties for these visual assets. I release the Library and its authorized representatives from any future claims arising out of this capture.', contentWidth - 20);
    doc.text(splitTerms, margin + 10, currentY);

    currentY += 15;

    // 6. Signatures and Seal divider
    doc.setDrawColor(254, 243, 199);
    doc.setLineWidth(0.5);
    doc.line(margin + 10, currentY, width - margin - 10, currentY);

    currentY += 8;

    // Signature Title
    doc.setFont('Helvetica', 'bold');
    doc.setFontSize(7.5);
    doc.setTextColor(156, 163, 175);
    doc.text('AUTHORIZED SIGNATURE', margin + 10, currentY);

    // Draw the signature
    if (signatureType === 'type') {
      doc.setFont('Times', 'italic');
      doc.setFontSize(16);
      doc.setTextColor(30, 58, 138); // blue-900 (ink color)
      const sigInitials = typedSignature || subjectName?.split(' ').map(n => n[0]).join('.') || 'J.N.';
      doc.text(sigInitials, margin + 13, currentY + 9);
    } else if (drawnSignature) {
      try {
        doc.addImage(drawnSignature, 'PNG', margin + 10, currentY + 1, 40, 10);
      } catch (err) {
        console.error('Error adding signature image to PDF:', err);
      }
    }

    // Signature line
    doc.setDrawColor(156, 163, 175);
    doc.setLineWidth(0.3);
    doc.line(margin + 10, currentY + 14, margin + 60, currentY + 14);

    doc.setFont('Helvetica', 'normal');
    doc.setFontSize(8.5);
    doc.setTextColor(107, 114, 128);
    doc.text(isMinor ? 'Parent/Guardian Signature' : 'Subject Signature', margin + 10, currentY + 18);


    // 7. Stamp / Approval (Right aligned)
    const rightAlignX = width - margin - 10;
    doc.setFont('Helvetica', 'bold');
    doc.setFontSize(7.5);
    doc.setTextColor(156, 163, 175);
    doc.text('BHTB LIBRARY STAMP', rightAlignX, currentY, { align: 'right' });

    // Draw circular approved stamp
    doc.setDrawColor(5, 150, 105); // emerald-600
    doc.setLineWidth(0.5);
    
    const stampCenterX = rightAlignX - 22;
    const stampCenterY = currentY + 8;
    
    doc.circle(stampCenterX, stampCenterY, 7, 'D');
    doc.circle(stampCenterX, stampCenterY, 6.3, 'D');
    
    doc.setFont('Helvetica', 'bold');
    doc.setFontSize(5.5);
    doc.setTextColor(5, 150, 105);
    doc.text('APPROVED', stampCenterX, stampCenterY - 0.8, { align: 'center' });
    doc.text('BHTB', stampCenterX, stampCenterY + 2.2, { align: 'center' });

    doc.setFont('Courier', 'bold');
    doc.setFontSize(8);
    doc.setTextColor(156, 163, 175);
    doc.text(`Date: ${shootDate}`, rightAlignX, currentY + 18, { align: 'right' });

    // Save PDF
    const filename = `BHTB_Consent_Release_${subjectName.trim().replace(/\s+/g, '_') || 'Draft'}.pdf`;
    doc.save(filename);
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-8" id="release-form">
      {/* Form Input Columns */}
      <div className={`lg:col-span-5 ${isSubmitted ? 'hidden lg:block' : 'block'}`}>
        <div className="bg-[#1E293B] rounded-3xl border border-slate-700/50 p-6 sm:p-8 space-y-6 shadow-2xl">
          <div className="flex items-center gap-2 border-b border-slate-800 pb-3">
            <FileCheck className="w-5 h-5 text-indigo-400" />
            <h3 className="font-display font-semibold text-white text-lg">Annex B: Consent Creator</h3>
          </div>

          <p className="text-xs text-slate-400 leading-relaxed">
            Per Uganda’s <strong>Data Protection & Privacy Act 2019</strong>, any media featuring members of the public require signed releases. Fill the credentials below to generate an authorized release form.
          </p>

          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Subject Name */}
            <div className="space-y-1">
              <label className="text-xs font-semibold text-slate-400">Subject Full Name</label>
              <input
                type="text"
                required
                placeholder="e.g. Juliet Namubiru"
                value={subjectName}
                onChange={(e) => setSubjectName(e.target.value)}
                className="w-full text-xs border border-slate-700 rounded-xl p-2.5 bg-[#0F172A] text-slate-200 focus:outline-hidden focus:border-indigo-500 placeholder-slate-500"
              />
            </div>

            {/* Affiliation */}
            <div className="space-y-1">
              <label className="text-xs font-semibold text-slate-400">Affiliation (Optional)</label>
              <input
                type="text"
                placeholder="e.g. Makerere University Researcher"
                value={affiliation}
                onChange={(e) => setAffiliation(e.target.value)}
                className="w-full text-xs border border-slate-700 rounded-xl p-2.5 bg-[#0F172A] text-slate-200 focus:outline-hidden focus:border-indigo-500 placeholder-slate-500"
              />
            </div>

            {/* Description of images/video */}
            <div className="space-y-1">
              <label className="text-xs font-semibold text-slate-400">Description of Media Content</label>
              <textarea
                required
                rows={2}
                placeholder="e.g. Photography and interview regarding the royal drum exhibit."
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                className="w-full text-xs border border-slate-700 rounded-xl p-2.5 bg-[#0F172A] text-slate-200 focus:outline-hidden focus:border-indigo-500 placeholder-slate-500 resize-none"
              />
            </div>

            {/* Date and Location of shoot */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-1">
                <label className="text-xs font-semibold text-slate-400">Shoot Date</label>
                <input
                  type="date"
                  required
                  value={shootDate}
                  onChange={(e) => setShootDate(e.target.value)}
                  className="w-full text-xs border border-slate-700 rounded-xl p-2.5 bg-[#0F172A] text-slate-200 focus:outline-hidden focus:border-indigo-500"
                />
              </div>

              <div className="space-y-1">
                <label className="text-xs font-semibold text-slate-400">Location</label>
                <input
                  type="text"
                  required
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                  className="w-full text-xs border border-slate-700 rounded-xl p-2.5 bg-[#0F172A] text-slate-200 focus:outline-hidden focus:border-indigo-500"
                />
              </div>
            </div>

            {/* Minor Toggle Checkbox */}
            <div className="flex items-center gap-2.5 p-3 rounded-xl bg-slate-800/40 border border-slate-700/50">
              <input
                type="checkbox"
                id="is-minor-checkbox"
                checked={isMinor}
                onChange={(e) => setIsMinor(e.target.checked)}
                className="w-4 h-4 rounded-sm text-indigo-500 focus:ring-indigo-500 border-slate-700 bg-[#0F172A]"
              />
              <label htmlFor="is-minor-checkbox" className="text-xs font-semibold text-slate-200 select-none">
                Subject is a minor (under 18 years)
              </label>
            </div>

            {/* Parent Guardian input if minor */}
            {isMinor && (
              <div className="space-y-1">
                <label className="text-xs font-semibold text-slate-400">Parent/Guardian Name</label>
                <input
                  type="text"
                  required={isMinor}
                  placeholder="e.g. Arthur Ssemwanga"
                  value={parentName}
                  onChange={(e) => setParentName(e.target.value)}
                  className="w-full text-xs border border-slate-700 rounded-xl p-2.5 bg-[#0F172A] text-slate-200 focus:outline-hidden focus:border-indigo-500 placeholder-slate-500"
                />
              </div>
            )}

            {/* Signature Box selector */}
            <div className="space-y-2 pt-2">
              <div className="flex items-center justify-between">
                <label className="text-xs font-semibold text-slate-400">Authorize Signature</label>
                <div className="flex bg-[#0F172A] rounded-lg p-0.5 text-[10px] font-medium border border-slate-800">
                  <button
                    type="button"
                    onClick={() => setSignatureType('type')}
                    className={`px-2 py-1 rounded-md transition-all cursor-pointer ${signatureType === 'type' ? 'bg-slate-800 shadow-md text-white font-bold' : 'text-slate-500'}`}
                  >
                    Type Initials
                  </button>
                  <button
                    type="button"
                    onClick={() => setSignatureType('draw')}
                    className={`px-2 py-1 rounded-md transition-all cursor-pointer ${signatureType === 'draw' ? 'bg-slate-800 shadow-md text-white font-bold' : 'text-slate-500'}`}
                  >
                    Draw Signature
                  </button>
                </div>
              </div>

              {signatureType === 'type' ? (
                <input
                  type="text"
                  required={signatureType === 'type'}
                  placeholder="Type full legal initials, e.g. J.N."
                  value={typedSignature}
                  onChange={(e) => setTypedSignature(e.target.value)}
                  className="w-full text-xs border border-slate-700 rounded-xl p-2.5 bg-[#0F172A] text-slate-200 focus:outline-hidden focus:border-indigo-500 placeholder-slate-500"
                />
              ) : (
                <div className="space-y-2">
                  <div className="border border-slate-700 rounded-xl overflow-hidden bg-[#0F172A]">
                    <canvas
                      ref={canvasRef}
                      width={300}
                      height={100}
                      onMouseDown={startDrawing}
                      onMouseMove={draw}
                      onMouseUp={stopDrawing}
                      onMouseLeave={stopDrawing}
                      onTouchStart={startDrawing}
                      onTouchMove={draw}
                      onTouchEnd={stopDrawing}
                      className="w-full h-24 bg-white cursor-crosshair touch-none"
                    />
                  </div>
                  <button
                    type="button"
                    onClick={clearCanvas}
                    className="text-[10px] text-slate-400 hover:text-slate-200 flex items-center gap-1 font-medium cursor-pointer"
                  >
                    <RotateCcw className="w-3 h-3 text-indigo-400" />
                    Clear signature lines
                  </button>
                </div>
              )}
            </div>

            {/* Submit */}
            <button
              type="submit"
              className="w-full py-3 bg-indigo-600 hover:bg-indigo-500 text-white font-semibold text-xs rounded-full shadow-lg shadow-indigo-500/20 transition-all flex items-center justify-center gap-1.5 cursor-pointer"
            >
              <Signature className="w-4 h-4" />
              Generate Official Release
            </button>
          </form>
        </div>
      </div>

      {/* Interactive Official Release PDF-styled Preview column */}
      <div className={`lg:col-span-7 ${isSubmitted ? 'col-span-12' : 'col-span-7'}`}>
        <div className="bg-[#1E293B] rounded-3xl border border-slate-700/50 p-6 sm:p-8 space-y-6 shadow-2xl flex flex-col justify-between">
          <div className="flex items-center justify-between border-b border-slate-800 pb-3">
            <h3 className="font-display font-semibold text-white text-lg">Document Release View</h3>
            {isSubmitted && (
              <div className="flex items-center gap-2">
                <button
                  onClick={handlePrint}
                  className="px-3 py-1.5 bg-slate-850 hover:bg-slate-800 border border-slate-700 text-slate-300 hover:text-white rounded-lg text-xs font-semibold flex items-center gap-1.5 transition-all cursor-pointer"
                >
                  <Printer className="w-3.5 h-3.5 text-indigo-400" />
                  Print Release
                </button>
                <button
                  onClick={handleExportPDF}
                  className="px-3 py-1.5 bg-indigo-600 hover:bg-indigo-500 text-white rounded-lg text-xs font-semibold flex items-center gap-1.5 transition-all cursor-pointer shadow-lg shadow-indigo-500/20"
                >
                  <Download className="w-3.5 h-3.5 text-white" />
                  Export PDF
                </button>
                <button
                  onClick={handleResetForm}
                  className="px-3 py-1.5 bg-indigo-500/10 text-indigo-400 border border-indigo-500/20 rounded-lg text-xs font-semibold flex items-center gap-1.5 transition-all cursor-pointer"
                >
                  <Edit2 className="w-3.5 h-3.5" />
                  Edit details
                </button>
              </div>
            )}
          </div>

          {/* Legal Document Container */}
          <div className="border-4 border-double border-amber-800 p-6 bg-white rounded-2xl shadow-md text-slate-900 space-y-6 relative overflow-hidden" id="printable-release-document">
            {/* Buganda Crest seal background */}
            <div className="absolute right-0 bottom-0 opacity-5 translate-x-12 translate-y-12">
              <FileCheck className="w-96 h-96 text-amber-900" />
            </div>

            {/* Header */}
            <div className="text-center space-y-1.5 border-b border-amber-200 pb-4">
              <h4 className="font-display font-bold text-amber-950 text-sm tracking-wider uppercase">
                Buganda Heritage and Tourism Board
              </h4>
              <h3 className="font-display font-bold text-base text-gray-950">
                BHTB LIBRARY – SOCIAL MEDIA & ARCHIVAL DIVISION
              </h3>
              <p className="font-mono text-[9px] text-gray-400 uppercase tracking-widest">
                Image / Video Release Consent Form
              </p>
            </div>

            {/* Core Legal Text */}
            <div className="text-xs text-gray-800 space-y-4 leading-relaxed font-serif">
              <p>
                I hereby grant permission to the <strong>Buganda Heritage and Tourism Board Library (the “Library”)</strong> 
                to use photographs and/or video recordings of {isMinor ? 'my child' : 'me'} or my property for use in the Library’s 
                official social media networks, website archives, and kingdom promotional materials.
              </p>

              {/* Grid of details */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 border-t border-b border-amber-100 py-3 my-4 font-sans text-[11px] not-italic text-slate-700">
                <div>
                  <span className="text-gray-400 font-semibold block uppercase text-[9px]">Subject of Release</span>
                  <span className="font-bold text-gray-900">{subjectName || 'Juliet Namubiru (Draft)'}</span>
                </div>
                <div>
                  <span className="text-gray-400 font-semibold block uppercase text-[9px]">Affiliation</span>
                  <span className="text-gray-700">{affiliation || 'Public Citizen'}</span>
                </div>
                <div className="sm:col-span-2">
                  <span className="text-gray-400 font-semibold block uppercase text-[9px]">Description of Images/Video Assets</span>
                  <span className="text-gray-700">{description || 'Photography and digital documentation during the royal historical artifact gallery exhibit.'}</span>
                </div>
                <div>
                  <span className="text-gray-400 font-semibold block uppercase text-[9px]">Location of Shoot</span>
                  <span className="text-gray-700 font-medium">{location}</span>
                </div>
                <div>
                  <span className="text-gray-400 font-semibold block uppercase text-[9px]">Date of Capture</span>
                  <span className="text-gray-700 font-mono font-medium">{shootDate}</span>
                </div>
              </div>

              {isMinor && (
                <p className="bg-amber-50/50 p-2.5 rounded-lg border border-amber-100 text-[10px] font-sans text-amber-950">
                  <strong>Minor Subject Clause:</strong> As the parent/guardian of the minor named above, I warrant that I have authority to execute this release on their behalf.
                  <br />
                  <span className="font-bold">Guardian Name:</span> {parentName || '(Please fill parent/guardian name)'}
                </p>
              )}

              <p className="text-[10px] text-gray-500 leading-normal">
                I understand that I will receive no monetary compensation or royalties for these visual assets. 
                I release the Library and its authorized representatives from any future claims arising out of this capture.
              </p>
            </div>

            {/* Signatures & Seal */}
            <div className="flex items-end justify-between border-t border-amber-100 pt-6 mt-6">
              <div className="space-y-1 text-slate-800">
                <span className="text-gray-400 font-bold uppercase text-[9px] block">Authorized Signature</span>
                <div className="h-10 flex items-center pl-2 min-w-[120px]">
                  {signatureType === 'type' ? (
                    <span className="font-display font-semibold text-lg italic text-blue-900 tracking-wider">
                      {typedSignature || subjectName?.split(' ').map(n => n[0]).join('.') || 'J.N.'}
                    </span>
                  ) : drawnSignature ? (
                    <img src={drawnSignature} alt="Signature" className="h-full object-contain" />
                  ) : (
                    <span className="text-gray-300 italic text-xs">Waiting for draw...</span>
                  )}
                </div>
                <div className="border-t border-gray-400 w-36 pt-1">
                  <span className="text-[10px] text-gray-500 block">
                    {isMinor ? 'Parent/Guardian Signature' : 'Subject Signature'}
                  </span>
                </div>
              </div>

              <div className="text-right space-y-1">
                <span className="text-gray-400 font-bold uppercase text-[9px] block">BHTB Library Stamp</span>
                <div className="inline-block p-1 border-2 border-dashed border-emerald-600 rounded-full rotate-12 opacity-60">
                  <div className="border border-emerald-600 rounded-full px-2.5 py-1 text-[9px] font-bold text-emerald-600 uppercase tracking-wide">
                    APPROVED BHTB
                  </div>
                </div>
                <span className="text-[9px] text-gray-400 block font-mono">Date: {shootDate}</span>
              </div>
            </div>
          </div>

          {/* Success Info message */}
          {!isSubmitted && (
            <div className="flex items-start gap-3 bg-[#0F172A]/50 border border-slate-800 p-4 rounded-2xl">
              <ShieldAlert className="w-5 h-5 text-indigo-400 shrink-0 mt-0.5" />
              <div className="space-y-1">
                <h4 className="font-semibold text-xs text-white">Draft Release Form</h4>
                <p className="text-[10px] text-slate-400 leading-relaxed">
                  Fill in the input details on the left hand panel and authorize the digital signature to convert this draft into a printable official kingdom release form.
                </p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
