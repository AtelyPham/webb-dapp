import { Post, Video } from '../../libs/notion';
import { Heading3, SubHeading1 } from '../../components';
import Link from 'next/link';
import { ExternalLinkIcon } from '@radix-ui/react-icons';

type FeaturedPostSectionProps = {
  featuredPost: Post;
  recentVideos: Video[];
};

export const FeaturedPostSection = ({
  featuredPost: {
    metadata: { title, cover, slug, description },
  },
  recentVideos,
}: FeaturedPostSectionProps) => {
  return (
    <div className="px-4 mt-[18px] grid lg:grid-cols-2 gap-x-6 gap-y-[72px] py-[72px]">
      {/* Featured Post */}
      <div className="break-words">
        <Link href={`/blog/posts/${slug}`}>
          <div
            style={{
              backgroundImage: `url(${cover})`,
              backgroundSize: 'cover',
            }}
            className="w-full h-[220px] md:h-[250px] rounded-lg"
          />
        </Link>
        <Link href={`/blog/posts/${slug}`}>
          <Heading3 className="featured-post-title mt-4 text-mono-200">
            {title}
          </Heading3>
        </Link>
        <SubHeading1 className="mt-4 featured-post-text text-mono-120">
          {description}
        </SubHeading1>
      </div>
      {/* Recent videos */}
      <div>
        <span className="card-tag text-mono-120">Recent Videos</span>
        <ul>
          {recentVideos.map((video) => {
            const { id, title, link } = video.metadata;

            return (
              <Link key={id} href={link} target="_blank" rel="noreferrer">
                <li className="flex items-center gap-2 border-b-2 border-mono-200 pb-6 mt-6">
                  <span className="recent-video-title text-mono-200">
                    {title}
                  </span>
                  <ExternalLinkIcon width={18} height={18} color="#1F1D2B" />
                </li>
              </Link>
            );
          })}
        </ul>
      </div>
    </div>
  );
};