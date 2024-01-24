import { useDispatch, useSelector } from 'react-redux';
import { 
  fetchStatementsStart,
  fetchStatementsSuccess,
  fetchStatementsFailure,
} from '../../redux/statement/statementSlice';
import { RootState } from '../../redux/store';
import { useEffect } from 'react';
import { Statement } from './Statements.types';

export default function Statements() {
  const dispatch = useDispatch();
  const { statements, loading, error } = useSelector((state: RootState) => state.statement);

  useEffect(() => {
    const fetchStatements = async () => {
      try {
        dispatch(fetchStatementsStart());

        const res = await fetch('/xAPI/statement', {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
        });

        if (!res.ok) {
          throw new Error(`HTTP error! Status: ${res.status}`);
        }

        const data = await res.json();
        dispatch(fetchStatementsSuccess(data));
      } catch (error: unknown) {
        if (error instanceof Error) {
          dispatch(fetchStatementsFailure(error.message));
        } else {
          console.error('Unexpected error:', error);
        }
      }
    };

    fetchStatements();
  }, [dispatch]);

  const getActor = (statement: Statement) => (
    statement.actor?.name ||
    statement.actor?.mbox ||
    'Unknown Actor'
  )

  const getVerb = (statement: Statement) => (
    statement.verb?.display?.[Object.keys(statement.verb?.display || {})[0]] ||
    statement.verb?.id ||
    'Unknown Verb'
  )

  const getObject = (statement: Statement) => (
    statement.object?.definition?.name?.[Object.keys(statement.object?.definition?.name || {})[0]] ||
    statement.object?.id ||
    'Unknown Object'
  )

  return (
    <div className="p-3 max-w-6xl mx-auto">
      <h1 className="text-3xl font-semibold text-center my-7">
        Statements
      </h1>
      {loading && <p>Loading statements...</p>}
      {error && <p>Error: {error}</p>}
      {!loading && !error && (
        <ul>
          {statements.map((statement, index) => (
            <li className='flex gap-3' key={index}>
              <p>{getActor(statement)}</p>
              <p>{getVerb(statement)}</p>
              <p>{getObject(statement)}</p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
