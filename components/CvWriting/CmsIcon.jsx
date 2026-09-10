import {
  Briefcase, CheckCircle, Clock, CreditCard, Crown, Edit, FileText, Headphones,
  Lock, Package, Rocket, Send, ShieldCheck, Sparkles, Star, UserCheck, Users,
} from 'lucide-react';

const icons = {
  Briefcase, CheckCircle, Clock, CreditCard, Crown, Edit, FileText, Headphones,
  Lock, Package, Rocket, Send, ShieldCheck, Sparkles, Star, UserCheck, Users,
};

export default function CmsIcon({ name, size = 20, className = '' }) {
  const Icon = icons[name];
  if (!Icon) return null;
  return <Icon aria-hidden="true" size={size} className={className} />;
}
