import { Statement } from "../Statements.types"
import { verbEmojiMap } from "./verbEmojiMap";

export const getActor = (statement: Statement) => (
  statement.actor?.name ||
  statement.actor?.mbox ||
  'Unknown Actor'
)

export const getVerb = (statement: Statement) => (
  statement.verb?.display?.[Object.keys(statement.verb?.display || {})[0]] ||
  statement.verb?.id ||
  'Unknown Verb'
)

export const getObject = (statement: Statement) => (
  statement.object?.definition?.name?.[Object.keys(statement.object?.definition?.name || {})[0]] ||
  statement.object?.id ||
  'Unknown Object'
)

export const getVerbEmoji = (statement: Statement) => {
  const verb = statement.verb?.display?.[Object.keys(statement.verb?.display || {})[0]]?.toLowerCase();

  if (typeof verb === 'string') {
    return (
      <span role="img" aria-label={(verbEmojiMap as Record<string, string>)[verb] || 'book'}>
        {(verbEmojiMap as Record<string, string>)[verb] || '📚'}
      </span>
    );
  } else {
    return <span role="img" aria-label="book">📚</span>;
  }
};


