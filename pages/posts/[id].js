import Link from "next/link";
import { Layout } from "../../components/Layout";
import { getAllpostIds, getPostData } from "../../lib/posts";

const Post = ({ post }) => {
  if (!post) {
    return <div>Loading...</div>;
  }
  return (
    <Layout title={post.title}>
      <p className="m-4">
        {"id : "}
        {post.id}
      </p>
      <p className="mb-8 text-xl font-bold">{post.title}</p>
      <p className="px-10">{post.body}</p>
      <Link href="/blog-page" passHref>
        <div className="flex cursor-pointer mt-12">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6 mr-3"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M11 19l-7-7 7-7m8 14l-7-7 7-7"
            />
          </svg>
          <span>Back to blog-page</span>
        </div>
      </Link>
    </Layout>
  );
};

export default Post;

export const getStaticPaths = async () => {
  const paths = await getAllpostIds();
  return {
    paths,
    fallback: false,
  };
};

export const getStaticProps = async ({ params }) => {
  const { post: post } = await getPostData(params.id);
  return {
    props: {
      post,
    },
  };
};
