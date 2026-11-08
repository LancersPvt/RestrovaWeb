import Image from "next/image";
import { ClientTestimonial } from "@/lib/client-data";

interface ClientCardProps {
  testimonial: ClientTestimonial;
}

export default function ClientCard({ testimonial }: ClientCardProps) {
  return (
    <div className="rounded-3xl border border-gray-200 bg-white p-8 shadow-lg transition-all hover-glow">
      {/* Logo + Restaurant Info */}
      <div className="mb-6 flex items-center gap-4">
        <div className="flex h-16 w-16 shrink-0 items-center justify-center overflow-hidden rounded-full border border-gray-200 bg-white p-2 shadow-sm">
          <Image
            src={testimonial.logo}
            width={64}
            height={64}
            sizes="64px"
            alt={`${testimonial.company} logo`}
            className="h-full w-full object-contain"
          />
        </div>

        <div>
          <p className="font-bold text-gray-900">{testimonial.name}</p>
          <p className="text-sm text-gray-600">
            {testimonial.role} · {testimonial.company}
          </p>
          <p className="mt-0.5 text-xs text-gray-500">
            {testimonial.industry}
          </p>
        </div>
      </div>

      {/* Factual restaurant description; no unverified quote or review rating. */}
      <p className="mb-6 leading-relaxed text-gray-700">{testimonial.testimonial}</p>

      {/* Source */}
      {testimonial.source && (
        <div className="border-t border-gray-100 pt-4">
          <p className="text-xs text-gray-400">
            Source: {testimonial.source}
          </p>
        </div>
      )}
    </div>
  );
}