import { describe, it, expect } from 'vitest';
import * as fs from 'fs';
import * as path from 'path';

describe('FC-08 Firestore Security Rules Structure', () => {
  const rulesPath = path.resolve(__dirname, '../../firestore.rules');

  it('firestore.rules file exists and specifies version 2', () => {
    expect(fs.existsSync(rulesPath)).toBe(true);
    const content = fs.readFileSync(rulesPath, 'utf-8');
    expect(content).toContain("rules_version = '2'");
    expect(content).toContain("service cloud.firestore");
  });

  it('enforces UID-based ownership on users collection', () => {
    const content = fs.readFileSync(rulesPath, 'utf-8');
    // Ensure match /users/{userId} requires request.auth.uid == userId
    expect(content).toMatch(/match\s+\/users\/\{userId\}/);
    expect(content).toContain("request.auth.uid == userId");
  });

  it('prevents friendly-name document spoofing with default deny', () => {
    const content = fs.readFileSync(rulesPath, 'utf-8');
    // Ensure default deny exists for unlisted collections
    expect(content).toContain("allow read, write: if false;");
  });

  it('enforces owner restriction on /users/{userId}/assessments/{assessmentId}', () => {
    const content = fs.readFileSync(rulesPath, 'utf-8');
    expect(content).toContain("match /assessments/{assessmentId}");
    expect(content).toContain("request.auth.uid == userId");
  });

  it('storage.rules exists and restricts crop assessment uploads to authenticated owner', () => {
    const storageRulesPath = path.resolve(__dirname, '../../storage.rules');
    expect(fs.existsSync(storageRulesPath)).toBe(true);
    const storageContent = fs.readFileSync(storageRulesPath, 'utf-8');
    expect(storageContent).toContain("service firebase.storage");
    expect(storageContent).toContain("match /crop-assessments/{userId}/{allPaths=**}");
    expect(storageContent).toContain("request.auth.uid == userId");
    expect(storageContent).toContain("allow read, write: if false;");
  });
});
