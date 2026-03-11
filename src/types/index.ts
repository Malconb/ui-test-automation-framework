export interface TestUser {
  username: string;
  password: string;
  email?: string;
  firstName?: string;
  lastName?: string;
  role?: string;
}

export interface TestEnvironment {
  baseUrl: string;
  apiBaseUrl: string;
  timeout: number;
  retries: number;
  headless: boolean;
}

export interface BrowserContext {
  viewport: {
    width: number;
    height: number;
  };
  userAgent?: string;
  locale?: string;
  timezoneId?: string;
}

export interface TestResult {
  status: 'passed' | 'failed' | 'skipped' | 'pending';
  duration: number;
  error?: string;
  screenshot?: string;
  video?: string;
  trace?: string;
}

export interface PageElement {
  selector: string;
  text?: string;
  visible?: boolean;
  enabled?: boolean;
  value?: string;
}

export interface StepDefinition {
  pattern: RegExp | string;
  implementation: Function;
  timeout?: number;
}

export interface FeatureFile {
  name: string;
  description?: string;
  scenarios: Scenario[];
  background?: Background;
}

export interface Scenario {
  name: string;
  tags?: string[];
  steps: Step[];
  examples?: Example[];
}

export interface Step {
  keyword: 'Given' | 'When' | 'Then' | 'And' | 'But';
  text: string;
  dataTable?: DataTable;
  docString?: string;
}

export interface Background {
  name?: string;
  steps: Step[];
}

export interface Example {
  name?: string;
  table: string[][];
}

export interface DataTable {
  raw: string[][];
  hashes?: Record<string, string>[];
}
