import { TestimonialCard, TestimonialCardProps } from "./ui/testimonial-card";
import { cn } from "@/lib/utils";

const testimonials: TestimonialCardProps[] = [
  {
    author: {
      name: "John Doe",
      handle: "@john.doe",
      avatarUrl: "",
    },
    text: "This is the best service I have ever used. Highly recommended!",
  },
  {
    author: {
      name: "Jane Smith",
      handle: "@jane.smith",
      avatarUrl: "",
    },
    text: "Amazing experience! The team was very supportive and exceeded my expectations.",
  },
  {
    author: {
      name: "Peter Jones",
      handle: "@peter.jones",
      avatarUrl: "",
    },
    text: "A game-changer for our business. We've seen a significant improvement.",
  },
    {
    author: {
      name: "Sara Wilson",
      handle: "@sara.wilson",
      avatarUrl: "",
    },
    text: "Incredible value and top-notch quality. A very satisfied customer.",
  },
  {
    author: {
        name: "Mike Brown",
        handle: "@mike.brown",
        avatarUrl: "",
    },
    text: "The platform is intuitive and easy to use. It streamlined our workflow.",
  },
  {
    author: {
        name: "Emily Davis",
        handle: "@emily.davis",
        avatarUrl: "",
    },
    text: "I'm impressed by the level of innovation and continuous updates.",
  },
];

export function Testimonials() {
  return (
    <section className="py-10">
      <div className="container mx-auto flex flex-col items-center justify-center">
        <div
          className="relative flex overflow-x-hidden text-white w-full"
          style={{
            maskImage:
              "linear-gradient(to right, transparent, white 10%, white 90%, transparent)",
          }}
        >
          <div className="flex animate-marquee whitespace-nowrap">
            {testimonials.map((testimonial, i) => (
              <div key={i} className="mx-4">
                <TestimonialCard {...testimonial} />
              </div>
            ))}
          </div>
          <div className="absolute top-0 flex animate-marquee2 whitespace-nowrap">
            {testimonials.map((testimonial, i) => (
              <div key={i} className="mx-4">
                <TestimonialCard {...testimonial} />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
} 