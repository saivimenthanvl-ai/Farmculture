import { describe, it, expect } from 'vitest';
import {
  validateCropImage,
  analyzeCropLeaf,
} from '../lib/cropDiagnosisService';

describe('FC-01 Crop Diagnosis Verification & Abstention Tests', () => {
  it('rejects empty 0-byte images', () => {
    const emptyFile = new File([], 'empty.jpg', { type: 'image/jpeg' });
    const result = validateCropImage(emptyFile);
    expect(result.valid).toBe(false);
    expect(result.error).toContain('empty');
  });

  it('rejects oversized files > 5MB', () => {
    const largeBuffer = new Uint8Array(6 * 1024 * 1024);
    const largeFile = new File([largeBuffer], 'large.jpg', { type: 'image/jpeg' });
    const result = validateCropImage(largeFile);
    expect(result.valid).toBe(false);
    expect(result.error).toContain('exceeds 5MB');
  });

  it('rejects unsupported file formats like pdf or text', () => {
    const badFile = new File(['test'], 'doc.pdf', { type: 'application/pdf' });
    const result = validateCropImage(badFile);
    expect(result.valid).toBe(false);
    expect(result.error).toContain('Unsupported image format');
  });

  it('abstains with clear explanation when non-plant / out-of-distribution image is provided', async () => {
    const assessment = await analyzeCropLeaf({ isNonPlant: true });
    expect(assessment.status).toBe('abstain');
    expect(assessment.condition).toBeUndefined();
    expect(assessment.explanation).toContain('out-of-distribution');
    expect(assessment.provenance.verified).toBe(true);
  });

  it('explicitly flags diagnostic assessment as preliminary unverified guidance rather than validated lab report', async () => {
    const assessment = await analyzeCropLeaf({});
    expect(assessment.status).toBe('diagnosed');
    expect(assessment.provenance.verified).toBe(false);
    expect(assessment.explanation).toContain('unverified');
  });

  it('rejects unauthenticated attempts to persist assessment record', async () => {
    const { saveAssessmentRecord } = await import('../lib/cropDiagnosisService');
    const assessment = await analyzeCropLeaf({});
    const res = await saveAssessmentRecord('', assessment);
    expect(res.success).toBe(false);
    expect(res.error).toContain('Authentication required');
  });

  it('getUserAssessmentHistory returns empty list safely when unauthenticated', async () => {
    const { getUserAssessmentHistory } = await import('../lib/cropDiagnosisService');
    const history = await getUserAssessmentHistory('');
    expect(history).toEqual([]);
  });
});
