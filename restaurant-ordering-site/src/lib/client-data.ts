export interface ClientTestimonial {
  id: string;
  name: string;
  company: string;
  role: string;
  testimonial: string;
  rating: number;
  logo: string;
  industry: string;
  source?: string;
}

export const clientTestimonials: ClientTestimonial[] = [
  {
    id: "1",
    name: "Yum Zone",
    company: "Yum Zone",
    role: "Restaurant",
    testimonial:
      "Yum Zone is a fast-food restaurant brand offering pizza, zinger items, pasta, wraps, and family meal deals.",
    rating: 5,
    logo: "/clients/yum-zone.png",
    industry: "Pizza & Fast Food",
  
  },
  {
    id: "2",
    name: "Mirch N Spicy",
    company: "Mirch N Spicy",
    role: "Restaurant",
    testimonial:
      "Mirch N Spicy serves a mixed menu that includes Pakistani food, burgers, wraps, Chinese dishes, and Western-style fast food.",
    rating: 5,
    logo: "/clients/mirch-n-spicy.png",
    industry: "Pakistani / Fast Food",
    
  },
  {
    id: "3",
    name: "Wok & Grill",
    company: "Wok & Grill",
    role: "Restaurant",
    testimonial:
      "Wok & Grill is a restaurant brand focused on grilled food, desi flavors, and delivery-friendly meals.",
    rating: 5,
    logo: "/clients/wok-and-grill.png",
    industry: "Grill / Desi Cuisine",
   
  },
  {
    id: "4",
    name: "Ash & Beans",
    company: "Ash & Beans",
    role: "Restaurant",
    testimonial:
      "Ash & Beans is a cafe-style food brand offering coffee, tea, snacks, desserts, and refreshing drinks.",
    rating: 5,
    logo: "/clients/ashandbeans.png",
    industry: "Cafe",
    
  },
  {
    id: "5",
    name: "Chill & Grill",
    company: "Chill & Grill",
    role: "Restaurant",
    testimonial:
      "Chill & Grill offers a broad restaurant menu with BBQ, burgers, shawarma, karahi, and fast-food options.",
    rating: 5,
    logo: "/clients/chill-and-grill.png",
    industry: "BBQ / Fast Food",
   
  },
  {
    id: "6",
    name: "The Spanish Pizza",
    company: "The Spanish Pizza",
    role: "Restaurant",
    testimonial:
      "The Spanish Pizza is a pizza-focused restaurant brand offering pizzas, burgers, and fast-food items.",
    rating: 5,
    logo: "/clients/the-spanish-pizza.png",
    industry: "Pizza",
  },
];