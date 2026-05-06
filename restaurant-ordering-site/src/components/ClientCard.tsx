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
          <img
            src={testimonial.logo}
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

      {/* Rating Stars */}
      <div className="mb-4 flex gap-1">
        {[...Array(5)].map((_, i) => (
          <svg
            key={i}
            className={`h-5 w-5 ${
              i < testimonial.rating ? "text-[#F4A261]" : "text-gray-300"
            }`}
            fill="currentColor"
            viewBox="0 0 20 20"
            aria-hidden="true"
          >
            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
          </svg>
        ))}
      </div>

      {/* Testimonial Text */}
      <blockquote className="mb-6 leading-relaxed text-gray-700 italic">
        &quot;{testimonial.testimonial}&quot;
      </blockquote>

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