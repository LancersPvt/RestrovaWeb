import topics from "@/data/blog-topics.json";
import { blogPosts } from "@/lib/blog-data";
export const blogTopics = topics;
export const getBlogTopic = (slug: string) => blogTopics.find(topic => topic.slug === slug);
export const getTopicArticles = (id: string) => blogPosts.filter(post => post.cluster === id);
