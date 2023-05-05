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
               <p>
                  <strong>SSR ( Server Side Rendering )</strong>
               </p>
               <p>
                  Diese Seite nutzt <strong>"getServerSideProps"</strong>. Eine Methode, die die Next-Komponente anweist, die Props aufzufüllen und
                  zur Runtime in eine statische HTML-Seite zu rendern. Dies bedeutet, dass die Seite live ist und mit React-Komponenten gehostet wird,
                  die auf dem Server sitzen und auf eine Anfrage warten.
               </p>
               <p>
                  Wenn jedoch eine Anfrage gestellt wird, sendet der Server die <strong>Javascript-React-Dateien nicht</strong> zum Rendern an den
                  Client. Stattdessen weist NextJs React an, diese Komponenten in Echtzeit in HTML zu rendern und <strong>dann den HTML-Code</strong>{" "}
                  an den Client zu senden.
               </p>
            </Alert>
            <NewsArticlesGrid articles={newsArticles} />
         </main>
      </>
   );
}
