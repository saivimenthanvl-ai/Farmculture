import { describe, it, expect } from 'vitest';
import * as fs from 'fs';
import * as path from 'path';

describe('FC-21 Routing Verification', () => {
  it('App.tsx contains declared routes for core features and protected dashboard', () => {
    const appPath = path.resolve(__dirname, '../App.tsx');
    const content = fs.readFileSync(appPath, 'utf-8');

    expect(content).toContain('path="/crop-diagnosis"');
    expect(content).toContain('path="/market-prices"');
    expect(content).toContain('path="/weather"');
    expect(content).toContain('path="/schemes"');
    expect(content).toContain('path="/assistant"');
    expect(content).toContain('path="/dashboard"');
    expect(content).toContain('path="*"');
  });

  it('vercel.json contains SPA rewrites to index.html', () => {
    const vercelPath = path.resolve(__dirname, '../../vercel.json');
    expect(fs.existsSync(vercelPath)).toBe(true);
    const content = JSON.parse(fs.readFileSync(vercelPath, 'utf-8'));
    expect(content.rewrites).toBeDefined();
    expect(content.rewrites[0].destination).toBe('/index.html');
  });
});
