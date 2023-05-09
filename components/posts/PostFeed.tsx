import usePosts from "@/hooks/usePosts";
import PostItem from "./PostItem";

interface PostFeedProps{

  userId?: string;

}



const PostFeed: React.FC<PostFeedProps> = ({ userId }) => {
    const { data: posts = [] } = usePosts(userId);
    return (
      <>
        {posts.map((post: Record<string, any>) => {
          return (
            <PostItem userId={post.userId} key={post.id} data={post}>
            </PostItem>
          );
        })}
      </>
    );
  };
  
  export default PostFeed;
  