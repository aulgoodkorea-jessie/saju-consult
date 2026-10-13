import Link from "next/link";
import { topicChoices } from "@/lib/topics";

export function TopicCards() {
  return (
    <div className="grid gap-3">
      {topicChoices.map((topic) => (
        <Link
          key={topic.id}
          href={`/consult?topic=${topic.id}`}
          className="rounded-card border border-line bg-paper/95 p-4"
        >
          <p className="text-xl font-semibold">{topic.emoji} {topic.title}</p>
          <p className="mt-1">{topic.body}</p>
        </Link>
      ))}
    </div>
  );
}
