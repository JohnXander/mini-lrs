import { useDispatch, useSelector } from 'react-redux';
import { 
  fetchStatementsStart,
  fetchStatementsSuccess,
  fetchStatementsFailure,
} from '../../redux/statement/statementSlice';
import { RootState } from '../../redux/store';
import { useEffect, useState } from 'react';
import { Statement } from './Statements.types';
import StatementModal from './components/StatementModal';
import { getActor, getObject, getVerb } from './utils/statementUtils';
import { formatDistanceToNow } from 'date-fns';

export default function Statements() {
  const dispatch = useDispatch();
  const { statements, loading, error } = useSelector((state: RootState) => state.statement);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedStatement, setSelectedStatement] = useState<Statement | null>(null);

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

  return (
    <div className="p-3 max-w-6xl mx-auto">
      <h1 className="text-3xl font-semibold text-center my-7">
        Statements
      </h1>
      {loading && <p>Loading statements...</p>}
      {error && <p>Error: {error}</p>}
      {!loading && !error && (
        <ul className='flex flex-col gap-1'>
          {statements.map((statement, index) => (
            <li 
              className='flex justify-between gap-2 border border-slate-200 p-2 hover:cursor-pointer hover:bg-slate-200' 
              key={index}
              onClick={() => {
                setSelectedStatement(statement);
                setIsModalOpen(true);
              }}
            >
              <div className='flex gap-2'>
                <p className='text-slate-700'>
                  {getActor(statement)}
                </p>
                <p className='text-slate-700 font-bold'>
                  {getVerb(statement)}
                </p>
                <p className='text-blue-500'>
                  {getObject(statement)}
                </p>
              </div>
              <p className='text-gray-500'>
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
