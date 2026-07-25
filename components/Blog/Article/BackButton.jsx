import Link from "next/link";
import { ArrowLeft } from "lucide-react";

const BackButton = ({ backUrl }) => {
  return (
    <Link href={backUrl} className="gap-button gap-button-primary my-8">
      <ArrowLeft color="#0a0a0a" size={24} strokeWidth={2} />
    </Link>
  );
};

export default BackButton;
