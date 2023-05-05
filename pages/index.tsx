import NewsArticlesGrid from "@/components/NewsArticlesGrid";
import { NewsArticle, NewsResponse } from "@/models/NewsArticles";
import { GetServerSideProps } from "next";
import Head from "next/head"; //default from next
import { Alert } from "react-bootstrap";
import styles from "@/styles/NewsArticleEntry.module.css";

interface SpaceFlightNewsPageProps {
   newsArticles: NewsArticle[];
}

export const getServerSideProps: GetServerSideProps<SpaceFlightNewsPageProps> = async () => {
   const response = await fetch("https://newsapi.org/v2/top-headlines?country=us&apiKey=" + process.env.NEWS_API_KEY);

   const newsResponse: NewsResponse = await response.json();
   return {
      props: { newsArticles: newsResponse.articles },
   };
};

export default function BreakingNewsPage({ newsArticles }: SpaceFlightNewsPageProps) {
   // console.log(newsArticles);
   return (
      <>
         <Head>
            <title key="title">Schlagzeilen aus aller Welt - NextJS + TypeScript + Bootstrap</title>
         </Head>
         <main>
            <h1>Schlagzeilen aus aller Welt</h1>
            <Alert className={`${styles.alert}`}>
               Diese Seite nutzt <strong>"getServerSideProps"</strong> to fetch data server-side on every request.{" "}
               <p>
                  This allows search engines to crawl the page content and
                  <strong> improves SEO</strong>.
               </p>
            </Alert>
            <NewsArticlesGrid articles={newsArticles} />
         </main>
      </>
   );
}
