import './App.css';
import { Button } from '@mui/material';

function Section() {
  function me() {
    return alert('You clicked me');
  }
  return (
    <div className="flex">
      <div className="bg-blue-700 text-white border-4 border-purple-500 shadow-lg shadow-blue-500/50 w-3/5 h-40 text-center pt-6 mt-6">
        Welcome Aboard
        <Button variant="contained" color="primary">
          Hello World{' '}
        </Button>
      </div>
      <div className="bg-pink-700 text-white border-4 border-green-500 shadow-lg shadow-blue-500/50 w-2/5 h-40 text-center pt-6 mt-6">
        Welcome Aboard
      </div>
    </div>
  );
}
export default Section;
