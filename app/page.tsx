import MapWrapper from './components/MapWrapper';

export default function Home() {
  return (
    <main>
      <div className="mb-4">
        <h2 className="text-xl font-semibold mb-2">Train Status Overview</h2>
        <p className="text-gray-600">
          Track real-time train information for major German cities. The map displays train locations,
          statuses, and delay information.
        </p>
      </div>
      <MapWrapper />
    </main>
  );
}
