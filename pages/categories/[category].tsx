import NewsArticlesGrid from "@/components/NewsArticlesGrid";
import { NewsArticle, NewsResponse } from "@/models/NewsArticles";
import { GetStaticPaths, GetStaticProps } from "next";
import Head from "next/head";
import { useRouter } from "next/router";
import { Alert } from "react-bootstrap";
import styles from "@/styles/NewsArticleEntry.module.css";

interface CategoryNewsPageProps {
   newsArticles: NewsArticle[];
}

export const getStaticPaths: GetStaticPaths = async () => {
   const categorySlugs = ["business", "entertainment", "general", "health", "science", "sports", "technology"];

   const paths = categorySlugs.map((slug) => ({ params: { category: slug } }));

   return {
      paths,
      fallback: false,
   };
};

export const getStaticProps: GetStaticProps<CategoryNewsPageProps> = async ({ params }) => {
   const category = params?.category?.toString();
   const response = await fetch(`https://newsapi.org/v2/top-headlines?country=us&category=${category}&apiKey=${process.env.NEWS_API_KEY}`);
   const newsResponse: NewsResponse = await response.json();
   return {
      props: { newsArticles: newsResponse.articles },
      // revalidate: 5 * 60,
   };
};

const CategoryNewsPage = ({ newsArticles }: CategoryNewsPageProps) => {
   const router = useRouter();
   const categoryName = router.query.category?.toString();

   const title = "Category: " + categoryName;

   return (
      <>
         <Head>
            <title key="title">{`${title} - NextJS News App`}</title>
         </Head>
         <main>
            <h1>{title}</h1>
            <Alert className={`${styles.alert}`}>
               <p>
                  <strong>SSG ( Static Side Generation ) & ISR ( Incremental Static Regeneration )</strong>
               </p>
               Diese Seite nutzt <strong>&quot;getStaticProps&quot;</strong>. Eine Methode, die die Next-Komponente anweist, die Props aufzufüllen und
               zur Build-Time in eine statische HTML-Seite gerendert werden. Dadurch ist diese Seite optimiert für SEO and für sehr schnell page
               loading.
               <p></p>
               <p>
                  Zusätzlich haben wir hier<strong>&quot;Incremental Static Regeneration&quot;</strong> angewendet.
               </p>
               <p>
                  Dadurch können wir nur diese Seite aktualisieren - ohne die gesamte Website wieder aufbauen zu müssen. Alle 5 Minuten Next.js löst
                  im Backend eine Neugenerierung der Seite aus. Sobald die Seite erfolgreich generiert wurde, macht Next.js den Cache ungültig und
                  zeigt die aktualisierte Seite an. Wenn die Regenerierung im Backend fehlschlägt, bleibt die alte Seite unverändert.
               </p>
            </Alert>
            <NewsArticlesGrid articles={newsArticles} />
         </main>
      </>
   );
};

export default CategoryNewsPage;
