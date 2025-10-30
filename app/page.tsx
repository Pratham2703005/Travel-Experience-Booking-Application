'use client';

import { useEffect, useState } from 'react';
import ExperienceCard from './components/ExperienceCard';
import Header from './components/Header';
import { getExperiences } from './lib/api';
import type { Experience } from './lib/types';

export default function Home() {
  const [experiences, setExperiences] = useState<Experience[]>([]);
  const [filteredExperiences, setFilteredExperiences] = useState<Experience[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchExperiences() {
      try {
        setLoading(true);
        const data = await getExperiences();
        setExperiences(data);
        setFilteredExperiences(data);
        console.log('Fetched experiences:', data);
      } catch (err) {
        console.error('Error fetching experiences:', err);
        setError('Failed to load experiences. Please try again later.');
      } finally {
        setLoading(false);
      }
    }

    fetchExperiences();
  }, []);

  const handleSearch = (query: string) => {
    const searchTerm = query.toLowerCase();
    const filtered = experiences.filter(
      (exp) =>
        exp.name.toLowerCase().includes(searchTerm) ||
        exp.location.toLowerCase().includes(searchTerm) ||
        exp.description.toLowerCase().includes(searchTerm)
    );
    setFilteredExperiences(filtered);
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-yellow-400 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading experiences...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <div className="text-center">
          <p className="text-red-600 mb-4">{error}</p>
          <button
            onClick={() => window.location.reload()}
            className="bg-yellow-400 hover:bg-yellow-500 px-6 py-2 rounded-md font-medium transition-colors"
          >
            Retry
          </button>
        </div>
      </div>
    );
  }

  return (
    <>
      <Header onSearch={handleSearch} />
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Grid of Experience Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredExperiences.map((experience) => (
            <ExperienceCard key={experience.id} experience={experience} />
          ))}
        </div>

        {/* Empty State */}
        {filteredExperiences.length === 0 && !loading && (
          <div className="text-center py-16">
            <p className="text-gray-600 text-lg">
              {experiences.length === 0 
                ? 'No experiences available at the moment.' 
                : 'No experiences found matching your search.'}
            </p>
            {experiences.length > 0 && (
              <button
                onClick={() => setFilteredExperiences(experiences)}
                className="mt-4 bg-yellow-400 hover:bg-yellow-500 px-6 py-2 rounded-md font-medium transition-colors"
              >
                Clear Search
              </button>
            )}
          </div>
        )}
      </main>
    </>
  );
}
