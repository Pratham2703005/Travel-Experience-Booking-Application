
import Image from 'next/image';
import Link from 'next/link';
import type { Experience } from '../lib/types';

interface ExperienceCardProps {
  experience: Experience;
}

export default function ExperienceCard({ experience }: ExperienceCardProps) {
  return (
    <Link href={`/experiences/${experience.id}`}>
      <div className="bg-[#f0f0f0] w-[280px] rounded-[12px] overflow-hidden shadow-sm hover:shadow-md transition-shadow">
        {/* Image */}
        <div className="relative h-[170px] w-[280px]">
          <Image
            src={experience.image}
            alt={experience.name}
            
            fill
            className="object-cover"
          />
        </div>

        {/* Content */}
        <div className="p-4">
          <div className="flex items-start justify-between mb-2">
            <div className="flex justify-between w-full">
              <h3 className="font-semibold text-[#161616] text-[16px]">
                {experience.name}
              </h3>
              <p className="text-sm text-[#161616] mt-1 rounded-[4px] bg-[#d6d6d6] py-[4px] px-[8px]">{experience.location}</p>
            </div>
          </div>

          <p className="text-sm text-[#6c6c6c] mb-4 line-clamp-2">
            {experience.description}
          </p>

          <div className="flex items-center justify-between">
            <div>
              <span className="text-[12px] text-[#161616]">From </span>
              <span className=" font-[500] text-[20px] text-[#161616]">
                ₹{experience.price}
              </span>
            </div>
            <button className="bg-yellow-400 hover:bg-yellow-500 px-6 py-2 rounded-md font-medium text-sm transition-colors">
              View Details
            </button>
          </div>
        </div>
      </div>
    </Link>
  );
}
