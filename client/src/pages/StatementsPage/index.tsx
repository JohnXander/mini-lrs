import { useDispatch, useSelector } from 'react-redux';
import { 
  fetchStatementsStart,
  fetchStatementsSuccess,
  fetchStatementsFailure,
} from '../../redux/statement/statementSlice';
import { RootState } from '../../redux/store';
import { useEffect, useState } from 'react';
import { Statement } from './Statements.types';
import { StatementModal } from './components/StatementModal';
import { 
  getActor, 
  getObject, 
  getVerb, 
  getVerbEmoji 
} from './utils/statementUtils';
import { formatDistanceToNow } from 'date-fns';

export default function Statements() {
  const dispatch = useDispatch();
  const { statements, loading, error } = useSelector((state: RootState) => state.statement);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedStatement, setSelectedStatement] = useState<Statement | null>(null);

  const handleStatementsOverload = async () => {
    if (statements.length > 10) {
      const oldestStatements = Math.floor(statements.length / 2);
      const statementIdsToDelete = statements
        .slice(0, oldestStatements)
        .map((statement) => statement._id);
      
      try {
        const res = await fetch('/xAPI/statement', {
          method: 'DELETE',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ statementIds: statementIdsToDelete }),
        });

        if (!res.ok) {
          throw new Error(`HTTP error! Status: ${res.status}`);
        }

        await fetchStatements();
      } catch (error) {
        console.error('Error deleting statements:', error);
      }
    }
  };

  const fetchStatements = async () => {
    try {
      handleStatementsOverload();
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

  useEffect(() => {
    fetchStatements();
  }, [dispatch]);

  return (
    <div className="p-3 max-w-6xl mx-auto">
      <h1 className="text-3xl font-semibold text-center my-7">
        Statements
      </h1>
      {loading && <p>Loading statements...</p>}
      {error && <p>Error: {error}</p>}
      {!loading && !error && (
        <ul className='flex flex-col gap-1'>
          {statements.slice().reverse().map((statement, index) => (
            <li 
              className='flex justify-between gap-2 border border-slate-200 p-2 hover:cursor-pointer hover:bg-slate-200' 
              key={index}
              onClick={() => {
                setSelectedStatement(statement);
                setIsModalOpen(true);
              }}
            >
              <div className='flex gap-1.5 flex-wrap'>
                {getVerbEmoji(statement)}
                <p 
                  className='text-slate-700 max-w-[200px] overflow-hidden overflow-ellipsis whitespace-nowrap'
                  title={JSON.stringify(statement.actor, null, 2)}>
                  {getActor(statement)}
                </p>
                <p 
                  className='text-slate-700 font-bold max-w-[200px] overflow-hidden overflow-ellipsis whitespace-nowrap'
                  title={JSON.stringify(statement.verb, null, 2)}>
                  {getVerb(statement)}
                </p>
                <p 
                  className='text-blue-500 max-w-[200px] overflow-hidden overflow-ellipsis whitespace-nowrap'
                  title={JSON.stringify(statement.object, null, 2)}>
                  {getObject(statement)}
                </p>
              </div>
              <p 
                className='text-gray-500'
                title={new Date(statement.createdAt).toLocaleString()}>
                {formatDistanceToNow(new Date(statement.createdAt), { addSuffix: true })}
              </p>
            </li>
          ))}
        </ul>
      )}
      {isModalOpen && selectedStatement && (
        <StatementModal
          statement={selectedStatement}
          onRequestClose={() => setIsModalOpen(false)}
        />
      )}
    </div>
  );
}
