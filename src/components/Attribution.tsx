import type { PuzzleSource } from "../types";

interface Props {
  source: PuzzleSource;
  showReadLink?: boolean;
}

function Author({ source }: { source: PuzzleSource }) {
  if (source.author_url) {
    return (
      <a
        className="attribution-author"
        href={source.author_url}
        target="_blank"
        rel="noopener noreferrer"
      >
        {source.author}
      </a>
    );
  }
  return <span className="attribution-author">{source.author}</span>;
}

function Title({ source }: { source: PuzzleSource }) {
  const hasStoryLink = source.story_url && source.story_url !== "#";
  if (hasStoryLink) {
    return (
      <a
        className="attribution-title attribution-title-hover"
        href={source.story_url}
        target="_blank"
        rel="noopener noreferrer"
      >
        {source.title}
      </a>
    );
  }
  return (
    <span className="attribution-title attribution-title-hover">{source.title}</span>
  );
}

export function Attribution({ source, showReadLink }: Props) {
  return (
    <div className="attribution">
      <div className="attribution-title-line">
        <Title source={source} />
      </div>
      <div className="attribution-byline">
        By <Author source={source} />
      </div>
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
