import SearchBar from '@/components/SearchBar';
import ThemeToggler from '@/components/ThemeToggler';
import WeatherOverview from '@/components/WeatherOverview';

export default function Home() {
    return (
        <main className="min-h-screen px-20 py-10 ">
            <div className="flex justify-between gap-3">
                <SearchBar />
                <ThemeToggler />
            </div>
            <WeatherOverview className="" />
        </main>
    );
}
