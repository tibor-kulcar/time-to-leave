import { DepartureBoard } from '@/components/DepartureBoard';
import { SearchBar } from '@/components/SearchBar';

const Home = () => {
  return (
    <div className="h-full">
      <main className="flex flex-col items-center justify-center max-h-screen">
        <SearchBar />
        <DepartureBoard />
      </main>
    </div>
  );
};

export default Home;
