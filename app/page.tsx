import { DepartureBoard } from '@/components/DepartureBoard';
import { StopSearch } from '@/components/StopSearch';

export default function Home() {
  return (
    <div className="h-full">
      <main className="flex flex-col h-full max-h-screen">
        <div className="fixed top-0 left-0 right-0 z-10 bg-white dark:bg-black">
          <StopSearch />
        </div>
        <div className="pt-(--search-bar-height)">
          <DepartureBoard />
        </div>
      </main>
    </div>
  );
}
