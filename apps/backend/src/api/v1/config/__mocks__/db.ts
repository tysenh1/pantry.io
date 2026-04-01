import { vi } from 'vitest';

const mockRun = vi.fn();
const mockGet = vi.fn();
const mockAll = vi.fn();

export const db = {
  prepare: vi.fn((sql: string) => ({
    run: mockRun,
    get: mockGet,
    all: mockAll,
  })),
};
