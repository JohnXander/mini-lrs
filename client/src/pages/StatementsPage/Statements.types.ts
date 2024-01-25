export interface Statement {
  actor: {
    name?: string;
    mbox?: string;
  };
  verb: {
    display?: Record<string, string>;
    id?: string;
  };
  object: {
    definition?: {
      name?: Record<string, string>;
    };
    id?: string;
  };
  createdAt: string;
}
