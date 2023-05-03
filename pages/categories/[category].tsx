import NewsArticlesGrid from "@/components/NewsArticlesGrid";
import { NewsArticle, NewsResponse } from "@/models/NewsArticles";
import { GetStaticPaths, GetStaticProps } from "next";
import Head from "next/head";
import { useRouter } from "next/router";
import { Alert } from "react-bootstrap";

interface CategoryNewsPageProps {
   newsArticles: NewsArticle[];
}


export const getStaticProps: GetStaticProps<CategoryNewsPageProps> = async ({ params }) => {

}    const response = await fetch(`https://newsapi.org/v2/top-headlines?country=us&category=${category}&apiKey=${process.env.NEWS_API_KEY}`);

const CategoryNewsPage = ({ newsArticles }: CategoryNewsPageProps) => {
    return (
        <>
        
        </>
        )
    }







    export default CategoryNewsPage;