import type { PuzzleSource } from "../types";

interface Props {
  source: PuzzleSource;
  showReadLink?: boolean;
}

export function Attribution({ source, showReadLink }: Props) {
  return (
    <div className="attribution">
      <span className="attribution-author">{source.author}</span>
      <span className="attribution-sep"> · </span>
      <span className="attribution-title attribution-title-hover">{source.title}</span>
      {showReadLink && source.story_url !== "#" && (
        <a
          className="attribution-link"
          href={source.story_url}
          target="_blank"
          rel="noopener noreferrer"
        >
          Read the full piece
        </a>
      )}
    </div>
  );
}
