export interface Actor {
  name?: string | undefined;
  mbox?: string | undefined;
}

export interface Verb {
  id: string;
  display?: {
    [key: string]: string;
  };
}

export interface StatementObject {
  definition?: {
    name?: {
      [key: string]: string;
    };
  };
  id?: string;
}

export interface Statement {
  _id: string;
  actor: Actor;
  verb: Verb;
  object: StatementObject;
}

export interface StatementState {
  statements: Statement[];
  error: string | null;
  loading: boolean;
}
