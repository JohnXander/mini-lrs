import { Statement } from "../Statements.types"

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
