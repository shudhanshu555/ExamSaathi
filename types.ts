
export interface FeatureCard {
  icon: string;
  title: string;
  description: string;
  color: string;
  demo?: string;
}

export interface Testimonial {
  name: string;
  role: string;
  content: string;
  translation?: string;
  avatar: string;
}

export interface ChatMessage {
  role: 'user' | 'model';
  text: string;
  timestamp: Date;
}
